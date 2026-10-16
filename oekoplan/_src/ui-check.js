#!/usr/bin/env node
/* Ninety / Ökoplan — daily UI check (Mahmoud, 16 Oct 2026).
   Opens the app locally (no server: config.js is replaced so the app runs in its local demo mode), signs in as the first admin,
   walks the main pages at phone / tablet / desktop widths in Arabic and English, and reports layout problems:
   · the page scrolls sideways (something wider than the screen)      · elements sticking out of the viewport
   · texts drawn on top of each other                                   · clipped text (cut without an ellipsis)
   · raw code shown as text (=> , undefined, NaN, [object …])           · tap targets smaller than 32px on the phone
   · fixed elements covering each other (FAB over the bottom bar)       · JavaScript errors
   Usage: node ui-check.js <repoRoot> <outDir> [app=oekoplan] [port=8765]   → writes <outDir>/report.json, report.md and screenshots. */
const { chromium } = (() => { for (const m of ['playwright', '/opt/npm-tools/node_modules/playwright', process.env.PW_PATH || '', (process.env.NODE_PATH || '').split(':')[0] + '/playwright']) { try { if (m) return require(m); } catch (e) { /* next */ } } throw new Error('playwright not found — run: npm i -g playwright'); })();
const fs = require('fs'); const path = require('path'); const http = require('http');
const [,, ROOT = process.cwd(), OUT = '/tmp/ui-check', APP = 'oekoplan', PORT = '8765'] = process.argv;
fs.mkdirSync(OUT, { recursive: true });
const BASE = `http://127.0.0.1:${PORT}/${APP === 'factory' ? '' : APP + '/'}`;
const CONFIG = { oekoplan: 'window.NF_CONFIG={supabaseUrl:"",supabaseAnonKey:"",company:"studioz",brand:"oekoplan",peers:[]};', studioz: 'window.NF_CONFIG={supabaseUrl:"",supabaseAnonKey:"",company:"studioz",peers:[]};', construction: 'window.NF_CONFIG={supabaseUrl:"",supabaseAnonKey:"",company:"construction",peers:[]};', factory: 'window.NF_CONFIG={supabaseUrl:"",supabaseAnonKey:"",company:"factory",peers:[]};' };
const PAGES = { oekoplan: ['dashboard', 'projects', 'pm', 'studioos', 'oktimeline', 'portfolio', 'enquiries', 'oksmart', 'ai', 'oklearn', 'okrules', 'tasks', 'pchats', 'meetings', 'clients', 'workers', 'attendance', 'requests', 'reports', 'settings', 'okpipeedit'], studioz: ['dashboard', 'projects', 'pm', 'studioos', 'tasks', 'workers', 'attendance', 'settings'], construction: ['dashboard', 'projects', 'tasks', 'workers', 'attendance', 'settings'], factory: ['dashboard', 'orders', 'tasks', 'workers', 'attendance', 'settings'] };
const VIEWS = [{ name: 'phone', w: 390, h: 844, mobile: true }, { name: 'tablet', w: 820, h: 1180, mobile: true }, { name: 'desktop', w: 1366, h: 900, mobile: false }];
const LANGS = ['ar', 'en'];

/* a tiny static server for the repo (python may not be there) */
const MIME = { html: 'text/html', js: 'application/javascript', json: 'application/json', css: 'text/css', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml', webp: 'image/webp', woff2: 'font/woff2', txt: 'text/plain', webmanifest: 'application/manifest+json' };
const server = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(ROOT, p); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'content-type': MIME[path.extname(f).slice(1)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });

/* in-page audit */
const AUDIT = `(() => {
  const out = []; const W = innerWidth, H = innerHeight; const vis = el => { const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false; const r = el.getBoundingClientRect(); if (!(r.width > 0 && r.height > 0)) return false; if (el.closest('.ngrp:not(.open) .ngb, details:not([open]) > :not(summary)')) return false; if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true, contentVisibilityAuto: true })) return false; let p = el.parentElement; while (p && p !== document.body) { const pc = getComputedStyle(p); if (+pc.opacity === 0 || pc.visibility === 'hidden') return false; if (pc.transform && pc.transform !== 'none' && /matrix\(1, 0, 0, 1, (-?\d+)/.test(pc.transform) && Math.abs(+RegExp.$1) > innerWidth) return false; if (/hidden|clip|auto|scroll/.test(pc.overflow + pc.overflowX + pc.overflowY)) { const pr = p.getBoundingClientRect(); if (pr.height < 2 || pr.width < 2 || r.bottom <= pr.top + 1 || r.top >= pr.bottom - 1 || r.right <= pr.left + 1 || r.left >= pr.right - 1) return false; } p = p.parentElement; } return true; };
  const skip = el => el.closest('#modalroot, .nfv, svg, canvas, script, style, [aria-hidden="true"], .okg');
  const name = el => (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '') + (el.textContent ? ' «' + el.textContent.trim().replace(/\\s+/g, ' ').slice(0, 40) + '»' : '');
  /* 1 sideways scroll */
  const sw = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth); if (sw > W + 2) out.push({ kind: 'hscroll', sev: 'high', msg: 'الصفحة بتتسحب عرضيًا (' + sw + 'px في شاشة ' + W + ')' });
  /* 2 sticking out + 6 small taps + 4 clipped + 5 raw code */
  const els = [...document.querySelectorAll('#view *, #nav *, header *, .fab, .tabbar *')].filter(el => !skip(el) && vis(el)).slice(0, 4000);
  const texts = [];
  els.forEach(el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    if ((r.right > W + 3 || r.left < -3) && r.width < W * 1.5 && cs.position !== 'fixed' && !el.closest('[style*="overflow"],.okscl,.oktabs,.seg,.tablewrap,.hscroll')) { const p = el.parentElement; const pcs = p && getComputedStyle(p); if (!(pcs && /auto|scroll/.test(pcs.overflowX))) out.push({ kind: 'overflow', sev: 'med', msg: 'عنصر طالع برّه الشاشة: ' + name(el), box: [r.left | 0, r.top | 0, r.width | 0, r.height | 0] }); }
    const own = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent).join(' ').trim();
    if (own) { texts.push({ el, r, t: own }); if (/=>|\\bundefined\\b|\\bNaN\\b|\\[object |function\\s*\\(/.test(own)) out.push({ kind: 'rawcode', sev: 'high', msg: 'نص فيه كود: ' + name(el) });
      if (cs.overflow === 'hidden' && cs.textOverflow !== 'ellipsis' && cs.whiteSpace === 'nowrap' && el.scrollWidth > el.clientWidth + 2) out.push({ kind: 'clipped', sev: 'med', msg: 'نص مقطوع من غير …: ' + name(el) }); }
    if (W <= 500 && (el.matches('button, a[href], [role=button], input[type=checkbox]')) && !el.closest('.okg')) { if (r.width < 28 || r.height < 28) { if (!(r.width < 6 || r.height < 6)) out.push({ kind: 'tap', sev: 'low', msg: 'زرار صغير (' + (r.width | 0) + '×' + (r.height | 0) + '): ' + name(el) }); } }
  });
  /* 3 texts on top of each other (siblings / unrelated elements whose text boxes overlap a lot) */
  const seen = new Set();
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) { const a = texts[i], b = texts[j]; if (a.el.contains(b.el) || b.el.contains(a.el)) continue; const x = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left), y = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top); if (x <= 2 || y <= 2) continue; const area = x * y, small = Math.min(a.r.width * a.r.height, b.r.width * b.r.height); if (area / small < 0.35) continue; const pa = getComputedStyle(a.el).position, pb = getComputedStyle(b.el).position; if (pa === 'fixed' || pb === 'fixed') continue; const key = name(a.el) + '|' + name(b.el); if (seen.has(key)) continue; seen.add(key); out.push({ kind: 'overlap', sev: 'high', msg: 'نصوص داخلة في بعض: ' + name(a.el) + ' + ' + name(b.el), box: [Math.min(a.r.left, b.r.left) | 0, Math.min(a.r.top, b.r.top) | 0, Math.max(a.r.right, b.r.right) - Math.min(a.r.left, b.r.left) | 0, Math.max(a.r.bottom, b.r.bottom) - Math.min(a.r.top, b.r.top) | 0] }); if (out.length > 60) break; }
  /* 7 fixed elements covering each other */
  const fixed = [...document.querySelectorAll('body *')].filter(el => vis(el) && getComputedStyle(el).position === 'fixed' && !skip(el) && !el.closest('#modalroot')).map(el => ({ el, r: el.getBoundingClientRect() })).filter(x => x.r.width < W * 0.95 && x.r.height < H * 0.6 && x.r.width > 20 && x.r.height > 20);
  for (let i = 0; i < fixed.length; i++) for (let j = i + 1; j < fixed.length; j++) { const a = fixed[i], b = fixed[j]; if (a.el.contains(b.el) || b.el.contains(a.el)) continue; const x = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left), y = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top); if (x > 8 && y > 8) out.push({ kind: 'fixed', sev: 'med', msg: 'عناصر ثابتة فوق بعض: ' + name(a.el) + ' + ' + name(b.el) }); }
  return out;
})()`;

(async () => {
  await new Promise(r => server.listen(+PORT, '127.0.0.1', r));
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const findings = []; const shots = []; let pagesTested = 0;
  for (const v of VIEWS) {
    const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h }, deviceScaleFactor: v.mobile ? 2 : 1, isMobile: v.mobile, hasTouch: v.mobile, serviceWorkers: 'block', locale: 'en-GB' });
    await ctx.route(`**/${APP === 'factory' ? '' : APP + '/'}config.js`, r => r.fulfill({ contentType: 'application/javascript', body: CONFIG[APP] || CONFIG.oekoplan }));
    const page = await ctx.newPage(); const jsErrors = []; page.on('pageerror', e => jsErrors.push(e.message.slice(0, 200)));
    try { await page.goto(BASE + 'index.html', { waitUntil: 'networkidle', timeout: 60000 }); } catch (e) { findings.push({ view: v.name, lang: '-', page: 'boot', kind: 'boot', sev: 'high', msg: 'الصفحة ماحمّلتش: ' + e.message.slice(0, 120) }); await ctx.close(); continue; }
    await page.waitForTimeout(1500);
    await page.evaluate(() => { const b = document.querySelector('[data-action=firstAdmin]'); if (b) b.click(); }); await page.waitForTimeout(1200);
    await page.evaluate(() => { if (typeof closeModal === 'function') closeModal(); });
    for (const lang of LANGS) {
      await page.evaluate(l => { try { I18N.lang = l; localStorage.setItem('nf.lang', l); document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; } catch (e) { /* */ } }, lang);
      for (const view of (PAGES[APP] || PAGES.oekoplan)) {
        const ok = await page.evaluate(vw => typeof canSee === 'function' && canSee(vw), view); if (!ok) continue;
        await page.evaluate(vw => { location.hash = '#/' + vw; }, view); await page.waitForTimeout(900);
        try { await page.evaluate(() => { if (typeof closeModal === 'function') closeModal(); }); } catch (e) { /* */ }
        pagesTested++;
        let res = []; try { res = await page.evaluate(AUDIT); } catch (e) { res = [{ kind: 'audit', sev: 'low', msg: 'الفحص وقع: ' + e.message.slice(0, 100) }]; }
        const errTxt = await page.evaluate(() => { const b = document.querySelector('.banner.err, .banner.danger'); return b ? b.textContent.trim().slice(0, 120) : ''; });
        if (errTxt) res.push({ kind: 'error', sev: 'high', msg: 'رسالة خطأ على الصفحة: ' + errTxt });
        if (res.length) { const file = `${APP}-${v.name}-${lang}-${view}.png`; try { await page.screenshot({ path: path.join(OUT, file), fullPage: false }); shots.push(file); } catch (e) { /* */ } res.forEach(f => findings.push(Object.assign({ view: v.name, lang, page: view, shot: file }, f))); }
        if (v.name === 'phone') { /* the drawer too */ try { await page.evaluate(() => { const b = document.querySelector('[data-action=openside]'); if (b) b.click(); }); await page.waitForTimeout(400); const r2 = await page.evaluate(AUDIT); r2.filter(f => f.kind !== 'hscroll').forEach(f => findings.push(Object.assign({ view: v.name, lang, page: view + ' (menu)' }, f))); await page.evaluate(() => { const b = document.querySelector('[data-action=closeside]'); if (b) b.click(); }); } catch (e) { /* */ } }
      }
    }
    jsErrors.slice(0, 10).forEach(m => findings.push({ view: v.name, lang: '-', page: '-', kind: 'jserror', sev: 'high', msg: 'JS error: ' + m }));
    await ctx.close();
  }
  await browser.close(); server.close();
  /* de-duplicate: same kind+msg across pages/languages collapses into one line with the places listed */
  const grouped = {}; findings.forEach(f => { const k = f.kind + '|' + f.msg; (grouped[k] = grouped[k] || { kind: f.kind, sev: f.sev, msg: f.msg, where: [], shot: f.shot }).where.push(`${f.page}@${f.view}/${f.lang}`); });
  const rows = Object.values(grouped).sort((a, b) => ({ high: 0, med: 1, low: 2 }[a.sev] - { high: 0, med: 1, low: 2 }[b.sev]) || b.where.length - a.where.length);
  const md = [`# UI check — ${APP} — ${new Date().toISOString().slice(0, 16)}`, `pages tested: ${pagesTested} (×${VIEWS.length} widths ×${LANGS.length} languages) · findings: ${rows.length} (${rows.filter(r => r.sev === 'high').length} high · ${rows.filter(r => r.sev === 'med').length} med · ${rows.filter(r => r.sev === 'low').length} low)`, ''].concat(rows.map(r => `- [${r.sev}] ${r.msg} — ${r.where.slice(0, 6).join(', ')}${r.where.length > 6 ? ` (+${r.where.length - 6})` : ''}${r.shot ? ` — ${r.shot}` : ''}`)).join('\n');
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify({ app: APP, at: new Date().toISOString(), pagesTested, rows }, null, 1));
  fs.writeFileSync(path.join(OUT, 'report.md'), md);
  console.log(md);
})().catch(e => { console.error(e); process.exit(1); });
