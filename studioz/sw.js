/* Ninety Fabrication — service worker (app shell cache). Data never lives here: it is on the server. */
const BUILD = '20260923-2014-d8732c';
/* v4.17: several Ninety apps share one origin (/ = factory, /studioz/ = office) — each service worker keeps to its own scope and its own cache prefix */
const SCOPE = new URL(self.registration.scope).pathname;
const TAG = SCOPE.replace(/^\/|\/$/g, '').replace(/\//g, '-');
const CACHE = 'nf-shell-' + (TAG ? TAG + '-' : '') + BUILD;
const SHELL = ["./index.html", "./config.js", "./manifest.json", "./vendor/supabase.js", "./vendor/three.bundle.js", "./vendor/pdf.min.js", "./vendor/pdf.worker.min.js", "./vendor/leaflet.js", "./icons/icon-192.png", "./icons/icon-512.png", "./en.json"];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))).catch(() => { })));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('nf-shell-' + (TAG ? TAG + '-' : '')) && !(TAG ? false : /^nf-shell-[^\d]/.test(k)) && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (same && !url.pathname.startsWith(SCOPE)) return; // another Ninety app on this origin — not ours
  if (same && SCOPE === '/' && /^\/(studioz|construction)\//.test(url.pathname)) return; // the root app never handles a sibling app's files
  if (same && (req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html'))) {
    // app page: network first (so updates arrive), cached copy when offline
    // (cache: 'no-cache' revalidates with the host even when it sends a max-age, e.g. GitHub Pages)
    e.respondWith(fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)).catch(() => { }); return r; }).catch(() => caches.match('./index.html')));
    return;
  }
  if (same && url.pathname.endsWith('/config.js')) {
    // backend settings: network first so a changed key reaches devices without a new build
    e.respondWith(fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => { }); return r; }).catch(() => caches.match(req)));
    return;
  }
  if (same || /cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com/.test(url.host)) {
    // shell files, vendor libraries, face models: cache first
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => { }); } return r; })));
  }
});
/* ---------- Web Push (chat messages, approvals, alerts) ---------- */
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  const title = String(d.title || 'Ninety Fabrication'); const body = String(d.body || ''); const tag = String(d.tag || 'nf-' + Date.now()); const url = d.url || './';
  // iOS Safari: keep the options minimal (renotify / vibrate are not supported there and can make the whole call fail → generic "Notification")
  const show = self.registration.showNotification(title, { body, tag, icon: './icons/icon-192.png', badge: './icons/icon-192.png', data: { url } })
    .catch(() => self.registration.showNotification(title, { body }));
  const badge = (async () => { try { if (!('setAppBadge' in navigator)) return; const c = await caches.open('nf-badge'); const r = await c.match('count'); let n = r ? parseInt(await r.text(), 10) || 0 : 0; n++; await c.put('count', new Response(String(n))); await navigator.setAppBadge(n); } catch (x) { /* ignore */ } })();
  e.waitUntil(Promise.all([show, badge]).catch(() => { }));
});
self.addEventListener('message', e => { const d = e.data || {}; if (d.nfBadge != null) { (async () => { try { const c = await caches.open('nf-badge'); await c.put('count', new Response(String(d.nfBadge))); if ('setAppBadge' in navigator) { if (d.nfBadge > 0) await navigator.setAppBadge(d.nfBadge); else await navigator.clearAppBadge(); } } catch (x) { /* ignore */ } })(); } });
self.addEventListener('notificationclick', e => {
  e.notification.close(); try { caches.open('nf-badge').then(c => c.put('count', new Response('0'))); if ('clearAppBadge' in navigator) navigator.clearAppBadge(); } catch (x) { /* ignore */ } const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => { for (const c of cs) { if ('focus' in c) { c.focus(); try { c.navigate(url); } catch (x) { c.postMessage({ nfOpen: url }); } return; } } return self.clients.openWindow(url); }));
});
