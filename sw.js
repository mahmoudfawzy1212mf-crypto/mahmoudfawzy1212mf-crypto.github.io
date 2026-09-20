/* Ninety Fabrication — service worker (app shell cache). Data never lives here: it is on the server. */
const BUILD = '20260920-0921-c359e9';
const CACHE = 'nf-shell-' + BUILD;
const SHELL = ["./index.html", "./config.js", "./manifest.json", "./vendor/supabase.js", "./vendor/three.bundle.js", "./vendor/pdf.min.js", "./vendor/pdf.worker.min.js", "./vendor/leaflet.js", "./icons/icon-192.png", "./icons/icon-512.png", "./laeha.pdf", "./lof-c01.pdf"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))).catch(() => { })));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('nf-shell-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
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
