/* =====================================================================
   Ökoplan Landscaping — brand & office layer (v1, 13 Oct 2026)
   Loaded after the app (studio engine, company:'studioz') when config.js says brand:'oekoplan'.
   Same code base as Ninety Studioz; different: identity (logo / colours / login screen) · the office
   structure (departments, titles, roles, approval chain) · the regulation of
   شركة أوكوبلان لتنسيق المواقع (work hours, leave, penalties) · attendance by work mode
   (office QR · home · hybrid · part time · site supervision) · the team import (57 people) ·
   no Ninety hub / no Ninety companies. Arabic + English.
   ===================================================================== */
(() => {
  const CFG = window.NF_CONFIG || {};
  if (CFG.brand !== 'oekoplan') return;
  if (window.__OEKO__) return; window.__OEKO__ = 1;
  const en = () => typeof I18N !== 'undefined' && I18N.lang === 'en';
  const L = (a, b) => (en() ? b : a);
  const BASE = (() => { try { const s = document.currentScript && document.currentScript.src; return s ? s.replace(/[^/]*$/, '') : './'; } catch (e) { return './'; } })();
  const IMG = { lockup: BASE + '_src/brand/lockup.png', lockupDark: BASE + '_src/brand/lockup-dark.png', full: BASE + '_src/brand/full.png', fullDark: BASE + '_src/brand/full-dark.png', mark: BASE + '_src/brand/mark.png', icon: BASE + 'icons/icon-192.png', sig: BASE + '_src/brand/sig.png' };
  const C = { green: '#70b62e', green2: '#3ca13c', lime: '#92cb4e', blue: '#50b1e7', sky: '#9cdff7', teal: '#38a599', ink: '#17191c' };
  const NAME = 'Ökoplan Landscaping';
  const NAME_AR = 'أوكوبلان لتنسيق المواقع';
  /* the office's project photos (oekoplan/_src/portfolio/<project>/<n>.jpg, with <n>-t.jpg previews) — the login / home slideshow; oeko-home.js draws the projects */
  const PHOTOS = { xanadu: 2, 'rixos-seagate': 4, 'rixos-sharm': 4, sokhna: 5, 'telal-alamein': 6, 'crowne-plaza': 7 };
  const STILLS = []; { const best = { 'telal-alamein': [1, 6, 2], 'rixos-seagate': [1, 4], 'crowne-plaza': [1, 2, 4], xanadu: [1], 'rixos-sharm': [1, 2], sokhna: [5, 4] }; Object.keys(best).forEach(k => best[k].forEach(n => STILLS.push(BASE + '_src/portfolio/' + k + '/' + n + '.jpg'))); }
  window.OEKO_PHOTOS = PHOTOS; window.OEKO_STILLS = STILLS;

  /* ---------------------------------------------------------------- identity: colours, theme, logos */
  document.head.insertAdjacentHTML('beforeend', `<style id="oeko-theme">
:root,html.apple,html.apple[data-theme="dark"],html.apple[data-theme="light"]{--font:'Jost','IBM Plex Sans Arabic',-apple-system,BlinkMacSystemFont,'SF Arabic','Segoe UI','Noto Sans Arabic',system-ui,sans-serif}
body,button,input,select,textarea{font-family:var(--font)}
:root{--accent:${C.teal};--accent-ink:#fff;--accent-soft:#e3f4f1;--accent-2:${C.blue};--primary:#1d3d36;--primary-ink:#fff;
  --good:${C.green};--good-soft:#edf7e2;--good-ink:#3f7a12;--lof:${C.green};--elm:${C.blue};--alu:${C.teal};
  --side-bg:#16302b;--side-ink:#d6e6e2;--side-muted:#8fb0a9;--side-on:#fff;--side-on-bg:linear-gradient(135deg,${C.green},${C.teal} 60%,${C.blue});
  --chart-grid:#e3e8e4;--chart-axis:#c2cbc5}
:root[data-theme="dark"],html.apple[data-theme="dark"]{--accent:#50b1e7;--accent-ink:#04121c;--accent-soft:rgba(80,177,231,.16);--good-ink:#9ad66a;--side-bg:#0a1b28;--side-on-bg:linear-gradient(135deg,${C.green2},${C.teal})}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--accent:#5fc4b8;--accent-ink:#06211d;--accent-soft:#143530;--good-ink:#9ad66a;--side-bg:#0a1b28}}
.brandstack .lockup:empty{display:none}
.wordmark{filter:none!important}
/* ---- the side bar: light = white with the coloured lockup · dark = deep green with the white lockup ---- */
.brand .brandstack .wordmark,.side .brand .wordmark,html.apple .side .brand .wordmark{height:74px!important;max-height:none!important;width:auto!important}
.side .brand{padding:6px 4px 10px;justify-content:center}
.nfback{display:none!important}
/* the opening splash is always dark → white-letter lockup, bigger */
.nfsplash img.wordmark{content:url("_src/brand/lockup-dark.png");height:96px!important;max-height:none!important;width:auto!important;filter:none!important}
.nfsplash .brand{margin-bottom:10px}
html.apple[data-theme="light"] .side,html.apple[data-theme="light"] .nhome .nside{background:#ffffff!important;border-inline-start:1px solid #e1e8e5}
html.apple[data-theme="light"] .side .nav .ngh,html.apple[data-theme="light"] .side .nav a,html.apple[data-theme="light"] .side .userchip .n,html.apple[data-theme="light"] .side .acct.nfstrip>.nfst,html.apple[data-theme="light"] .side .nftogs>.nfst{color:#1d3d36!important}
html.apple[data-theme="light"] .side .userchip .r{color:#5b7a73}
html.apple[data-theme="light"] .side .nav .ngh:hover,html.apple[data-theme="light"] .side .nav a:hover{background:rgba(29,61,54,.06)!important}
html.apple[data-theme="light"] .side .nav .ngh > svg:first-child{color:#5b7a73!important}
html.apple[data-theme="light"] .side .nav .ngc{background:#e3f4f1!important;color:#1f7a6f!important}
html.apple[data-theme="light"] .side .nav .ngc.hot{background:#ff453a!important;color:#fff!important}
html.apple[data-theme="light"] .side .nav .ngrp.open > .ngh,html.apple[data-theme="light"] .side .nav .ngrp.fly > .ngh{background:rgba(29,61,54,.05)!important}
html.apple[data-theme="light"] .side .nav a.on,html.apple[data-theme="light"] .side .nav .ngrp.open > .ngh.on{background:linear-gradient(135deg,#70b62e,#38a599)!important;color:#fff!important;box-shadow:0 6px 16px -8px rgba(56,165,153,.6)!important}
html.apple[data-theme="light"] .side .nav a.on svg{color:#fff!important}
html.apple[data-theme="light"] .side .acct.nfstrip>.nfst,html.apple[data-theme="light"] .side .nftogs>.nfst{background:#eef4f2!important}
html.apple[data-theme="light"] .side .acct.nfstrip>.nfst.logout{color:#b42318!important}
html.apple[data-theme="light"] .side .userchip{border-bottom-color:#e1e8e5}
html.apple[data-theme="light"] .side .avatar{background:linear-gradient(135deg,#70b62e,#38a599);color:#fff}
html.apple[data-theme="dark"] .side,html.apple[data-theme="dark"] .nhome .nside,html.apple:not([data-theme="light"]) .side{background:#0a1b28!important;border-color:#1b3a4f!important}
html.apple[data-theme="dark"] .side .nav a.on{background:linear-gradient(135deg,#3ca13c,#38a599)!important;color:#fff!important}
html[data-theme="dark"] .side .userchip{background:rgba(255,255,255,.06)}
html body .nfd-main,html.apple.apple .nfd-main,html body .fab,html.apple.apple .fab,html body .nq-fab,html.apple.apple .nq-fab{background:linear-gradient(135deg,#70b62e,#38a599 60%,#50b1e7)!important;color:#fff!important;box-shadow:0 10px 26px -8px rgba(56,165,153,.6)!important;border:0!important}
.nfd-main:hover,.fab:hover,.nq-fab:hover{filter:brightness(1.06)}
html body .nfd-main svg,html body .nfd-main{color:#fff!important}
html.apple[data-theme="dark"] .side .nav a.on svg{color:#fff!important}
html[data-theme="dark"] .tb-logo img,html[data-theme="dark"] .brand img{filter:none}
/* ---- the side bar's top block: logo · person · language/look · view-as/password/sign-out/guide — one width (the menu's), one rhythm ---- */
.side .brand,html.apple .side .brand{margin:10px 8px 4px!important;padding:4px 2px 6px!important;border-bottom:0!important;display:flex;justify-content:flex-start;align-items:center}
.side .brand .brandstack{width:100%}
.side .brand .wordmark,html.apple .side .brand .wordmark{width:100%!important;height:auto!important;max-height:124px!important;object-fit:contain;object-position:left center}
.side .nav>a,.side .nav .ngh,html.apple .side .nav>a,html.apple .side .nav .ngh{margin:1px 8px!important;width:calc(100% - 16px)!important;padding:10px 12px!important;box-sizing:border-box}
.side .nav>a>svg:first-child,.side .nav .ngh>svg:first-child{width:18px!important;height:18px!important;flex:none}
.side .nav .ngh>span,.side .nav>a>span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex:1}
@media (max-width:1000px){.side .nav .ngh,.side .nav>a{font-size:13.5px!important;letter-spacing:0}}
.side .userchip,html.apple .side .userchip{margin:0 8px 6px!important;padding:10px 10px!important;border-bottom:0!important;border-radius:12px;background:rgba(255,255,255,.07);display:flex;align-items:center;gap:10px}
html.apple[data-theme="light"] .side .userchip{background:#eef4f2!important}
.side .nftogs,html.apple .side .nftogs{margin:0 8px 6px!important;gap:6px!important;display:flex;flex-wrap:nowrap}
.side .nftogs>.nfst,html.apple .side .nftogs>.nfst{flex:1 1 0!important;min-width:0;margin:0!important}
.side .acct.nfstrip,html.apple .side .acct.nfstrip{margin:0 8px 10px!important;gap:6px!important;flex-wrap:nowrap!important}
.side .acct.nfstrip>.nfst,html.apple .side .acct.nfstrip>.nfst{flex:1 1 0!important;min-width:0;margin:0!important}
.side .langrow.inside,.side .viewbtn{margin:0 8px 6px}
/* the showreel hero: the square mark (rounded, like the top bar), big enough to read */
.smhero .smmark,.smmark{height:44px!important;width:44px!important;border-radius:12px!important;object-fit:cover!important;opacity:1!important;box-shadow:0 4px 14px rgba(0,0,0,.35);top:20px!important;inset-inline-start:22px!important}
@media (max-width:760px){.smhero .smmark,.smmark{height:36px!important;width:36px!important;border-radius:10px!important;top:14px!important;inset-inline-start:14px!important}}
/* no avatar badge in the showreel hero (it sat on the logo's corner on phones) — the person is in the side bar */
.smhero .smav{display:none!important}
/* the live-attendance dock lives in the side bar on computers (Mahmoud, 13 Oct), above the footer line */
@media (min-width:1001px){.topbar .tb-actions .nq-dock{position:static!important;transform:none!important;box-shadow:none!important;padding:4px 6px!important;border-radius:12px!important;gap:6px!important;flex-wrap:nowrap!important;max-width:none!important;font-size:12px;margin-inline-end:4px;order:-1}
  .topbar .tb-actions .nq-dock button{padding:5px 9px;border-radius:9px;white-space:nowrap}
  .topbar .tb-actions .nq-dock .nq-st{padding:0 4px}}
/* ---- day / night surfaces ---- */
html[data-theme="light"] body{background:#f3f7f5}
html[data-theme="light"] .topbar{background:#f3f7f5!important}
html:root[data-theme="dark"],html.apple[data-theme="dark"],html.apple.apple[data-theme="dark"]{--bg:#081620;--surface:#0d2130;--surface-2:#122a3c;--surface-3:#173448;--line:#1b3a4f;--line-2:#255069;--ink:#e9f1f2;--ink-2:#c0d3d6;--muted:#86a5ab;--glass:rgba(13,33,48,.72);--glass-solid:rgba(13,33,48,.95);--glass-brd:rgba(255,255,255,.08);--nf-side:rgba(10,27,40,.93);--wall:radial-gradient(1100px 620px at 108% -10%,rgba(80,177,231,.14),transparent 62%),radial-gradient(900px 560px at -12% 112%,rgba(60,160,90,.12),transparent 60%),#081620}
@media (prefers-color-scheme: dark){html.apple.apple:not([data-theme="light"]){--bg:#081620;--surface:#0d2130;--surface-2:#122a3c;--surface-3:#173448;--line:#1b3a4f;--line-2:#255069;--ink:#e9f1f2;--ink-2:#c0d3d6;--muted:#86a5ab;--glass:rgba(13,33,48,.72);--glass-solid:rgba(13,33,48,.95);--glass-brd:rgba(255,255,255,.08);--nf-side:rgba(10,27,40,.93);--wall:radial-gradient(1100px 620px at 108% -10%,rgba(80,177,231,.14),transparent 62%),radial-gradient(900px 560px at -12% 112%,rgba(60,160,90,.12),transparent 60%),#081620}}
html[data-theme="dark"] body{background:#081620}
html[data-theme="dark"] .topbar{background:#081620!important}
html.apple.apple[data-theme="dark"] .side,html.apple.apple[data-theme="dark"] .nhome .nside{background:#0a1b28!important}
/* no office door / no other companies — the «Ninety — three companies» button goes too */
.nfhomebtn,[data-action="ninetyHome"]{display:none!important}
.side .nav a[href="#/door"],.side .nav a[data-view="door"],.sptile.door{display:none!important}
html.apple .tb-logo,.tb-logo{width:auto!important;height:40px;padding:0 4px!important;background:transparent!important;border:0!important;box-shadow:none!important}
html.apple .tb-logo,.tb-logo{overflow:visible!important}
html.apple .tb-logo img,.tb-logo img{filter:none!important;width:auto!important;height:36px!important;max-width:none!important;object-fit:contain!important;border-radius:8px;display:block}
@media (max-width:760px){html.apple .tb-logo img,.tb-logo img{height:32px!important}
  html.apple .topbar,.topbar{padding-inline-end:6px!important}
  .topbar .tb-actions{margin-inline-end:0!important;gap:6px!important}
  .topbar .tb-actions > *:last-child{margin-inline-end:0!important}}
/* the home hero: Ökoplan colours until the office's own photos are published (no studio stills) */
.shhero{background:linear-gradient(160deg,#9cdff7 0%,#50b1e7 38%,#38a599 70%,#3ca13c 100%)!important}
.shhero:not(:has(img[src]))::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#9cdff7 0 28%,transparent 28.1%),linear-gradient(225deg,#92cb4e 0 22%,transparent 22.1%),linear-gradient(45deg,#70b62e 0 26%,transparent 26.1%);opacity:.9}
html[data-theme="light"] .kpi,html[data-theme="light"] .ahm,html[data-theme="light"] .nfw{background:rgba(255,255,255,.85)!important;color:var(--ink)!important}
.sptile.ideas .ic{background:#e8f5d9;color:#3f7a12}.sptile.design .ic{background:#dff3f0;color:#1f7a6f}
/* ---- login ---- */
.oklogin{min-height:100dvh;display:grid;grid-template-columns:1.1fr .9fr;background:#fff;color:${C.ink}}
.okscene{position:relative;overflow:hidden;background:linear-gradient(160deg,${C.sky} 0%,${C.blue} 38%,${C.teal} 70%,${C.green2} 100%)}
.okscene .shape{position:absolute;inset:0;background:
  linear-gradient(135deg,${C.sky} 0 28%,transparent 28.1%),
  linear-gradient(225deg,${C.lime} 0 22%,transparent 22.1%),
  linear-gradient(45deg,${C.green} 0 26%,transparent 26.1%);mix-blend-mode:normal;opacity:.9}
.okscene img.still{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.6s}
.okscene img.still.on{opacity:1}
.okscene .veil{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(10,30,26,.55) 100%)}
.okscene .cap{position:absolute;left:40px;right:40px;bottom:40px;color:#fff;direction:ltr;text-align:left}
.okscene .cap h1{font-size:clamp(26px,3.2vw,44px);line-height:1.1;margin:0 0 8px;font-weight:600;letter-spacing:-.01em}
.okscene .cap p{margin:0;opacity:.9;font-size:15px}
.okside{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;gap:18px}
.okcard{width:min(420px,100%);background:#fff;border:1px solid #e4e9e6;border-radius:18px;padding:26px 24px;box-shadow:0 20px 50px -30px rgba(23,25,28,.35)}
.okcard .lg{display:block;width:230px;max-width:80%;margin:0 auto 6px}
.okcard .sig{display:block;width:120px;margin:0 auto 18px;opacity:.95}
.okcard h2{font-size:17px;margin:0 0 14px;text-align:center;color:#1d3d36}
.okcard .slf{position:relative;margin:0 0 12px}
.okcard .slf input{width:100%;height:48px;border:1px solid #d8e0dc;border-radius:12px;padding:0 14px;font-size:16px;background:#fbfcfb;color:${C.ink}}
.okcard .slf input:focus{outline:none;border-color:${C.teal};box-shadow:0 0 0 3px #38a59922}
.okcard .slf label{display:none}
.okcard .slchk{display:flex;gap:8px;align-items:center;font-size:13px;color:#4b5853;margin:4px 0 10px}
.okcard .slerr{color:#b42318;font-size:13px;min-height:16px;margin:0 0 8px;text-align:center}
.okcard .slbtn{width:100%;height:48px;border:0;border-radius:12px;background:linear-gradient(135deg,${C.green},${C.teal});color:#fff;font-size:16px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;margin-top:4px}
.okcard .slbtn:hover{filter:brightness(1.05)}
.okcard .slalt{display:flex;justify-content:space-between;gap:10px;margin-top:12px}
.okcard .slalt button{background:none;border:0;color:${C.teal};font-size:13px;cursor:pointer;padding:4px 0}
.okfoot{font-size:12px;color:#7b8783;text-align:center;direction:ltr}
.okfoot a{color:${C.teal};text-decoration:none}
.oklogin .langrow{display:flex;justify-content:center}
.oklogin .themebtn{display:none}
.oklogin ~ .nq-dock, body:has(.oklogin) .nq-dock{left:auto;right:16px;transform:none;bottom:16px}
html[dir=ltr] body:has(.oklogin) .nq-dock{right:auto;left:16px}
html[data-theme="dark"] .oklogin{background:#0f1614;color:#eef2f0}
html[data-theme="dark"] .okcard{background:#151f1c;border-color:#24322e}
html[data-theme="dark"] .okcard h2{color:#cfe6e0}
html[data-theme="dark"] .okcard .slf input{background:#0f1614;border-color:#2b3b36;color:#eef2f0}
@media (max-width:1000px){.oklogin{grid-template-columns:1fr;grid-template-rows:38vh 1fr}.okscene .cap{left:22px;right:22px;bottom:22px}.okside{padding:24px 16px 40px;margin-top:-28px}.okcard{border-radius:22px}}
@media (max-width:600px){body:has(.oklogin) .nq-dock{display:none}}
@media (max-width:520px){.oklogin{grid-template-rows:28vh 1fr}.okscene .cap h1{font-size:22px}.okscene .cap p{display:none}}
/* ---- login, polished (13 Oct): no stripe between photo and panel, calmer panel, labelled fields, one strong button ---- */
.okscene{background:#0e1f1b}
.okscene .shape{display:none}
.okscene img.still{width:calc(100% + 2px);height:100%;left:0;top:0}
.okscene .veil{background:linear-gradient(180deg,rgba(0,0,0,.08) 0%,rgba(0,0,0,0) 30%,rgba(8,26,22,.72) 100%)}
.okscene .cap h1{font-size:clamp(26px,3vw,42px);font-weight:600;letter-spacing:-.015em;text-shadow:0 2px 18px rgba(0,0,0,.45)}
.okscene .cap p{font-size:14px;letter-spacing:.02em;opacity:.85;margin-top:6px}
.okside{gap:22px;padding:48px 32px}
.okcard{width:min(440px,100%);padding:36px 34px 30px;border-radius:22px;border:1px solid #e6ebe8;box-shadow:0 30px 70px -40px rgba(23,25,28,.35)}
.okcard .lg{width:250px;margin:0 auto 4px}
.okcard .sig{width:104px;opacity:.9;margin:0 auto 26px}
.okcard h2{font-size:15px;font-weight:500;color:#5b6b66;margin:0 0 22px;letter-spacing:.01em}
.okcard .slf{display:flex;flex-direction:column;margin:0 0 14px}
.okcard .slf label{display:block!important;order:-1;font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:#7b8783;margin:0 0 6px}
.okcard .slf input{height:50px;border-radius:12px;padding:0 14px;font-size:15px}
.okcard .slf input::placeholder{color:#a4b0ab}
.okcard .slchk{margin:2px 0 10px;color:#5b6b66}
.okcard .slerr{min-height:0;margin:0}.okcard .slerr:not(:empty){margin:0 0 10px}
.okcard .slbtn{height:52px;border-radius:12px;font-size:15.5px;letter-spacing:.01em;box-shadow:0 12px 24px -14px rgba(56,165,153,.7)}
.okcard .slalt{margin-top:16px}.okcard .slalt button{font-size:12.5px;color:#4b7f78}
.okfoot{font-size:11.5px;line-height:1.7}
.oklogin .slsoc a,.oklogin .slsoc button{opacity:.75}
html[data-theme="dark"] .oklogin{background:linear-gradient(180deg,#0a1b28,#050e16)}
html[data-theme="dark"] .okcard{background:#0d2130;border-color:rgba(255,255,255,.06);box-shadow:0 30px 70px -40px rgba(0,0,0,.8)}
html[data-theme="dark"] .okcard h2{color:#a9bbb5}
html[data-theme="dark"] .okcard .slf label{color:#7f948d}
html[data-theme="dark"] .okcard .slf input{background:#081620;border-color:#1b3a4f;color:#eef2f0}
html[data-theme="dark"] .okcard .slf input:focus{border-color:#50b1e7;box-shadow:0 0 0 3px #50b1e726}
html[data-theme="dark"] .okcard .slchk{color:#a9bbb5}
html[data-theme="dark"] .okcard .slalt button{color:#6fcbbf}
@media (max-width:1000px){.okside{padding:24px 16px 40px}.okcard{padding:28px 22px 24px}}
/* ---- footer / welcome ---- */
.stufoot img{height:40px!important;width:auto!important;max-width:none;filter:none!important;opacity:1!important}
/* ---- settings tab ---- */
.oko-team{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px;margin-top:10px}
.oko-team .p{border:1px solid var(--line);border-radius:10px;padding:8px 10px;display:flex;gap:10px;align-items:center;background:var(--surface)}
.oko-team .p i{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent);font-weight:700;font-size:13px;flex:0 0 auto}
.oko-team .p b{display:block;font-size:13px}.oko-team .p small{color:var(--muted);font-size:11px}
</style>`);

  /* light unless the person chose dark (the logo is drawn for white) */
  if (typeof themeLoad === 'function') {
    themeLoad = function () { let v = null; try { v = localStorage.getItem(THEME_KEY()) || localStorage.getItem('nf.theme.guest'); } catch (e) { /* private mode */ } themeApply(v || 'light'); };
    themeCurrent = () => { const a = document.documentElement.getAttribute('data-theme'); return a === 'dark' ? 'dark' : 'light'; };
    themeLoad();
  }
  /* the wordmark in the side bar / reports: white text version in dark mode */
  const swapLogos = () => { const dark = typeof themeCurrent === 'function' && themeCurrent() === 'dark'; document.querySelectorAll('img.wordmark, img.rlogo, .tb-logo img').forEach(i => { const inTb = !!i.closest('.tb-logo'); const want = i.closest('.nfsplash') ? IMG.lockupDark : inTb && window.innerWidth <= 760 ? IMG.icon : (dark ? IMG.lockupDark : IMG.lockup); if (i.getAttribute('src') !== want) i.setAttribute('src', want); }); };

  /* ---------------------------------------------------------------- office structure */
  const DEPTS = [
    { id: 'tech', name: 'المكتب الفني', en: 'Technical Office' },
    { id: 'ds1', name: 'استوديو التصميم 1', en: 'Design Studio 1' },
    { id: 'ds2', name: 'استوديو التصميم 2', en: 'Design Studio 2' },
    { id: 'coord', name: 'تنسيق أعمال اللاند سكيب', en: 'Landscape Coordination' },
    { id: 'pmo', name: 'إدارة المشروعات (PMO)', en: 'PMO' },
    { id: 'bd', name: 'تطوير الأعمال', en: 'Business Development' },
    { id: 'super', name: 'الإشراف على التنفيذ', en: 'Site Supervision' },
    { id: 'mgmt', name: 'إدارة المكتب', en: 'Office Management', admin: true },
    { id: 'acct', name: 'الحسابات والموارد البشرية', en: 'Accounts & HR', admin: true },
  ];
  const TITLES = ['Associate Partner', 'Landscape Design Manager', 'Lead Landscape Architect', 'Senior Landscape Architect', 'Landscape Architect', 'Junior Landscape Architect', 'Senior Lead Irrigation Engineer', 'Irrigation Engineer', 'Agricultural Engineer', 'Senior 3D Visualizing Architect', 'PMO Coordinator', 'Site Engineer', 'Senior Site Engineer', 'Office Manager', 'Accountant', 'HR Specialist', 'Office Boy', 'Driver'];
  /* shifts = the regulation: office 8 h effective + 30 min break, flexible arrival 08:00–11:00 (grace 180 min from 08:00; the day
     ends 8.5 h after the punch-in — see policy.flexEnd) · site 09:00–17:00 six days · home / hybrid punch from anywhere · part time */
  const SHIFTS = [
    { id: 'main', name: 'دوام المكتب — حضور من 8:00 إلى 11:00، 8 ساعات فعلية + نص ساعة راحة', en: 'Office — arrive 08:00–11:00, 8 h + 30 min break', start: '08:00', end: '16:30', breakMinutes: 30, graceMinutes: 180, otAfterMinutes: 0, offDays: [5, 6], flexEnd: true },
    { id: 'remote', name: 'عمل من البيت — بصمة من أي مكان', en: 'From home — punch from anywhere', start: '08:00', end: '16:30', breakMinutes: 30, graceMinutes: 180, otAfterMinutes: 0, offDays: [5, 6], remote: true, flexEnd: true },
    { id: 'hybrid', name: 'هايبرد — أيام مكتب (QR) وأيام من البيت', en: 'Hybrid — office days (QR) and home days', start: '08:00', end: '16:30', breakMinutes: 30, graceMinutes: 180, otAfterMinutes: 0, offDays: [5, 6], remote: true, flexEnd: true },
    { id: 'part', name: 'بارت تايم من المكتب — 4 ساعات', en: 'Part time at the office — 4 h', start: '09:00', end: '13:00', breakMinutes: 0, graceMinutes: 60, otAfterMinutes: 0, offDays: [5, 6], hours: 4 },
    { id: 'partremote', name: 'بارت تايم من البيت — 4 ساعات', en: 'Part time from home — 4 h', start: '09:00', end: '13:00', breakMinutes: 0, graceMinutes: 60, otAfterMinutes: 0, offDays: [5, 6], remote: true, hours: 4 },
    { id: 'site', name: 'الإشراف على التنفيذ — المواقع 9:00 إلى 5:00، 6 أيام (بصمة من الموقع)', en: 'Site supervision — 09:00–17:00, 6 days (punch at the site)', start: '09:00', end: '17:00', breakMinutes: 30, graceMinutes: 15, otAfterMinutes: 0, offDays: [5], otMultiplier: 1.5, site: true },
    { id: 'siteaway', name: 'مواقع خارج القاهرة الكبرى — 12 يوم شغل + 3 راحة', en: 'Sites outside Greater Cairo — 12 days on, 3 off', start: '09:00', end: '17:00', breakMinutes: 30, graceMinutes: 15, otAfterMinutes: 0, offDays: [], otMultiplier: 1.5, site: true, rotation: { on: 12, off: 3 } },
  ];
  const LEAVES = [
    { id: 'annual', name: 'إجازة سنوية — 21 يوم بعد سنة خدمة (30 يوم بعد 10 سنين أو فوق الخمسين)', days: 21, paid: true, afterMonths: 12, carry: false, noticeDays: 1, seniorDays: 30, seniorAfterYears: 10, seniorAge: 50 },
    { id: 'casual', name: 'إجازة عارضة — 6 أيام متفرقة في السنة من رصيد السنوية', days: 6, paid: true, fromAnnual: true, afterMonths: 3 },
    { id: 'sick', name: 'إجازة مرضية (بشهادة طبية)', days: 0, paid: false, noBalance: true },
    { id: 'maternity', name: 'إجازة وضع — 120 يوم بأجر كامل (حتى 3 مرات)', days: 120, paid: true, noBalance: true, maxTimes: 3 },
    { id: 'marriage', name: 'إجازة زواج — 5 أيام', days: 5, paid: true, noBalance: true, once: true },
    { id: 'bereave', name: 'إجازة وفاة قريب من الدرجة الأولى — 3 أيام', days: 3, paid: true, noBalance: true },
    { id: 'newborn', name: 'إجازة مولود — يوم واحد', days: 1, paid: true, noBalance: true },
    { id: 'hajj', name: 'إجازة حج — شهر كامل لمن أمضى 5 سنوات', days: 30, paid: true, noBalance: true, afterMonths: 60, once: true },
    { id: 'unpaid', name: 'إجازة بدون أجر', days: 0, paid: false, noBalance: true },
    { id: 'mission', name: 'مأمورية عمل / زيارة موقع', days: 0, paid: true, noBalance: true },
  ];
  /* penalties from the regulation table (per occurrence in the month): late ≤15 min → warning · ¼ · ½ · 1 day;
     late 16–60 min → ¼ · ½ · 1 · 2 days; absence without leave → 1 · 2 · 3 days · referral; cap 5 days / month */
  const POLICY = {
    lateTiers: [{ from: 1, to: 15, days: 0 }, { from: 16, to: 60, days: 0.25 }, { from: 61, to: 1440, days: 0.5 }],
    lateRepeat: { upto15: [0, 0.25, 0.5, 1], upto60: [0.25, 0.5, 1, 2] },
    earlyTiers: [{ from: 1, to: 60, days: 0.25 }, { from: 61, to: 1440, days: 0.5 }],
    graceTimesPerMonth: 999, graceExceedDays: 0, absencePenaltyDays: 1, absenceRepeat: [1, 2, 3], missingPunchDays: 0, missingPunchRepeatDays: 0.25,
    permissionsPerMonth: 2, permissionMaxHours: 2, permissionBeforeDay: true, otHolidayMultiplier: 2, siteOtMultiplier: 1.5, monthDays: 30, dailyPaidLeave: true, otNeedsApproval: true,
    maxPenaltyDaysPerMonth: 5, earlyAssignmentMultiplier: 1, mealCost: 0, mealBreakMinutes: 0, bonusOtHours: 0, bonusAmount: 0, travelMultiplier: 1, advanceMaxPct: 50, advanceFromDay: 10, advanceSplitOncePerYear: true, healthInsCompanyPct: 0, payDay: 1,
    thuSatEnabled: false, teamApproval: false, punchStrict: true, passwordResetApproval: true, escalateMinutes: 15, maxLeaveDaysPerMonth: 0, noticeMonths: 2, noticeMonthsLead: 3, noticeAbsenceDays: 3, probationMonths: 3, freshGradNoOtMonths: 0, freshGradNoLeaveMonths: 12,
    annualRaisePct: 7, nursingMinutesPerDay: 60, nursingMonths: 24, womenNightBan: ['19:00', '07:00'],
    flexArrival: ['08:00', '11:00'], flexHours: 8, flexBreakMinutes: 30,
    chains: { leave: ['head'], permission: ['head'], advance: ['head', 'hr'], punch: ['head'], leaveThuSat: ['head'], penalty_cancel: ['head', 'admin'] },
  };
  const REG_AR = `## أولًا: التعيين والتعاقد
- يُعيَّن الموظف في وظيفة وبمرتب طبقًا للهيكل التنظيمي وجدول المرتبات المعتمد من مجلس الإدارة، مع تقديم مسوغات التعيين (صحيفة الحالة الجنائية باسم الشركة، شهادة الخدمة العسكرية أو الإعفاء، أصل المؤهل، صورة الرقم القومي، شهادة الميلاد، 6 صور شخصية).
- يقر الموظف باستلام العمل بالتوقيع على نموذج الاستلام لدى الموارد البشرية.
- فترة الاختبار 3 شهور من تاريخ الاستلام، ولا توضع أكثر من مرة واحدة لدى الشركة.
- يُحرَّر عقد عمل محدد المدة سنويًا من نسختين، ويُفتح ملف لكل موظف يضم مسوغاته وقراراته وإجازاته ومكاتباته.
- يلتزم الموظف بتحديث أي تغيير في بياناته الشخصية خلال 15 يومًا؛ وتقديم بيانات أو شهادات غير صحيحة يُبطل التعيين.
## ثانيًا: الوظائف والأجور والعلاوات
- يعتمد مجلس الإدارة الهيكل التنظيمي شاملًا التوصيف الوظيفي والسلالم المالية.
- علاوة دورية سنوية لا تقل عن 7% من الأجر الأساسي وفقًا للتقييم السنوي وأداء الشركة المالي.
- تؤدى المرتبات شهريًا وتُستقطع منها الضرائب والتأمينات والالتزامات القانونية.
## ثالثًا: مواعيد العمل والعمل الإضافي
- المكتب الرئيسي: الحضور من 8:00 إلى 11:00 صباحًا، والانصراف بعد 8 ساعات عمل فعلية + نصف ساعة راحة (12:30 – 1:00 ظهرًا)؛ أي من 4:30 إلى 7:30 مساءً حسب ساعة الحضور.
- المواقع: من 9:00 صباحًا حتى 5:00 مساءً، 6 أيام أسبوعيًا داخل القاهرة الكبرى، أو 12 يوم عمل متواصلة مقابل 3 أيام راحة للمواقع خارج القاهرة الكبرى.
- الأجر الإضافي: المكتب ساعة من الأجر الأساسي عن كل ساعة إضافية (ساعتان في العطلات الرسمية)؛ المواقع ساعة ونصف عن كل ساعة إضافية — بتكليف من المدير المباشر وبعد اعتماده في السيستم.
## رابعًا: نظام الإجازات
- الإجازة السنوية: 21 يومًا بأجر كامل لمن أمضى سنة في الخدمة، وتزداد إلى 30 يومًا لمن أمضى 10 سنوات أو تجاوز سن الخمسين.
- الإجازة العارضة: بحد أقصى 6 أيام متقطعة في السنة تُخصم من الإجازة السنوية.
- إجازة الوضع: 120 يومًا (أربعة أشهر) بأجر كامل، وتُستحق حتى ثلاث مرات طوال مدة الخدمة.
- الإجازات الخاصة: 5 أيام زواج، 3 أيام وفاة قريب من الدرجة الأولى، يوم واحد للمولود، وشهر كامل للحج لمن أمضى 5 سنوات بالشركة.
- تُقدَّم طلبات الإجازة من التطبيق وتُعتمد من المدير المباشر (الشريك / رئيس القسم).
## خامسًا: تشغيل النساء
- تسري على النساء كافة أحكام تشغيل العمال دون تمييز متى تماثلت أوضاع العمل.
- يُحظر تشغيل النساء من 7:00 مساءً حتى 7:00 صباحًا أو في الأعمال الضارة صحيًا أو أخلاقيًا وفقًا للقرارات الوزارية.
- للعاملة المرضعة خلال 24 شهرًا من الوضع فترتا رضاعة لا تقل كل منهما عن نصف ساعة (أو ساعة واحدة يوميًا) تُحسبان من ساعات العمل بلا خصم.
## سادسًا: انتهاء الخدمة
- تنتهي الخدمة بالاستقالة، أو بلوغ سن الستين، أو العجز الكلي، أو الوفاة، أو انتهاء مدة العقد/المشروع.
- مهلة الإخطار شهران لمن خدمته أقل من 10 سنوات و3 أشهر لمن تجاوزها، مع استيفاء نموذج إخلاء الطرف والمخالصة المالية.
## سابعًا: الجزاءات التأديبية
- الجزاءات: الإنذار، الخصم من الأجر (بحد أقصى أجر 5 أيام في الشهر الواحد إجمالًا)، تأجيل/الحرمان من العلاوة، خفض الوظيفة/الأجر، والفصل بعد العرض على المحكمة العمالية المختصة.
- التأخير حتى 15 دقيقة دون إذن: إنذار ← ربع يوم ← نصف يوم ← يوم.
- التأخير من 15 إلى 60 دقيقة دون إذن: ربع يوم ← نصف يوم ← يوم ← يومان.
- الانقطاع عن العمل دون إذن أو عذر مقبول: يوم ← يومان ← ثلاثة أيام ← العرض على المحكمة العمالية لطلب الفصل.
- عدم ارتداء الزي أو إبراز الشارة: يوم ← يومان ← ثلاثة أيام ← خمسة أيام.
- استعمال تليفونات أو مهمات الشركة لأغراض شخصية دون إذن: نصف يوم ← يوم ← يومان ← ثلاثة أيام.
- إفشاء أسرار العمل أو الامتناع عن أداء واجبات الوظيفة: يومان ← أربعة أيام ← حرمان من العلاوة ← العرض على المحكمة العمالية لطلب الفصل.
- المرجعية القانونية: قانون العمل رقم 12 لسنة 2003 وتعديلاته والقرارات الوزارية المنفذة.`;
  const REG_EN = `## 1. Hiring and contracts
- Appointment to a position and salary per the organisation structure and the pay scale approved by the board, with the hiring documents (criminal record certificate in the company's name, military service certificate or exemption, original degree, national ID copy, birth certificate, 6 photos).
- The employee signs the work-receipt form at HR.
- Probation 3 months from the start date, once only.
- A fixed-term contract is drawn up yearly in two copies; a personal file holds the documents, decisions, leave and correspondence.
- Personal data changes are reported within 15 days; false documents void the appointment.
## 2. Positions, pay and raises
- The board approves the structure with job descriptions and pay grades.
- A yearly raise of at least 7% of the basic salary per the annual appraisal and the company's results.
- Salaries are paid monthly net of taxes, insurance and legal deductions.
## 3. Working hours and overtime
- Head office: arrive between 08:00 and 11:00; leave after 8 effective hours + a 30-minute break (12:30–13:00), i.e. between 16:30 and 19:30 depending on arrival.
- Sites: 09:00 to 17:00, 6 days a week inside Greater Cairo, or 12 consecutive days on / 3 off for sites outside Greater Cairo.
- Overtime: office — one hour of basic pay per extra hour (two on public holidays); sites — one and a half hours per extra hour; assigned by the direct manager and approved in the system.
## 4. Leave
- Annual leave: 21 paid days after one year of service; 30 days after 10 years of service or past the age of 50.
- Casual leave: up to 6 separate days a year, deducted from the annual balance.
- Maternity leave: 120 days (four months) at full pay, up to three times during service.
- Special leave: 5 days marriage, 3 days death of a first-degree relative, 1 day newborn, one month Hajj after 5 years of service.
- Leave is requested from the app and approved by the direct manager (partner / department head).
## 5. Women at work
- All provisions apply to women without discrimination where working conditions are the same.
- No work between 19:00 and 07:00 or in work harmful to health or morals per the ministerial decrees.
- A nursing mother has two breaks of at least 30 minutes (or one hour a day) for 24 months after birth, counted as working time with no deduction.
## 6. End of service
- Service ends by resignation, reaching 60, total disability, death or the end of the contract/project.
- Notice: two months under 10 years of service, three months above; clearance and final settlement forms apply.
## 7. Disciplinary measures
- Measures: warning, pay deduction (at most 5 days' pay in one month in total), deferring/withholding the raise, demotion, and dismissal after referral to the competent labour court.
- Late up to 15 min without permission: warning → ¼ day → ½ day → 1 day.
- Late 15–60 min without permission: ¼ day → ½ day → 1 day → 2 days.
- Absence without permission or acceptable excuse: 1 day → 2 days → 3 days → referral to the labour court for dismissal.
- Not wearing the uniform / badge: 1 → 2 → 3 → 5 days.
- Using company phones or equipment for personal purposes without permission: ½ day → 1 → 2 → 3 days.
- Disclosing work secrets or refusing to perform duties: 2 days → 4 days → withholding the raise → referral to the labour court for dismissal.
- Legal basis: Labour Law 12/2003 as amended and its ministerial decrees.`;

  const OEKO_DEFAULTS = {
    company: NAME,
    companyAr: NAME_AR,
    legal: { company: 'شركة أوكوبلان لتنسيق المواقع (ÖKOPLAN Landscaping)', address: 'مساكن شيراتون — هليوبوليس — مصر الجديدة — القاهرة', activity: 'تنسيق المواقع', headcount: 60, law: 'قانون العمل رقم 12 لسنة 2003', phone: '', email: 'info@oekoplanlandscaping.com', site: 'https://oekoplan.com' },
    hoursPerDay: 8, otMultiplier: 1, weekStart: 0,
    shiftStart: '08:00', shiftEnd: '16:30', breakMinutes: 30, graceMinutes: 180,
    brands: [{ id: 'oek', name: NAME, desc: 'تصميم لاند سكيب · استشارات · إشراف على التنفيذ', code: 'OEK', color: C.teal, route: [] }],
    departments: DEPTS.map(d => ({ id: d.id, name: d.name, admin: !!d.admin })),
    trades: TITLES.slice(),
    shifts: SHIFTS.map(s => Object.assign({}, s)),
    leaveTypes: LEAVES.map(l => Object.assign({}, l)),
    policy: POLICY,
    regulation: { version: 1, title: 'لائحة العمل والنظام الأساسي ولائحة الجزاءات — شركة أوكوبلان لتنسيق المواقع', text: REG_AR, textEn: REG_EN, updatedAt: null },
    regParams: { annualAfterMonths: 12, probationMonths: 3 },
    stuLogin: { video: '', videoM: '', poster: STILLS[0], logo: IMG.icon, stills: STILLS, slogan: 'Designing landscapes that live', sub: 'Landscape architecture · consulting · site supervision', site: 'https://oekoplan.com', ig: 'https://www.instagram.com/oekoplan.landscapers', fb: 'https://www.facebook.com/OekoplanLandscapers', li: '', be: '', vm: '' },
  };

  if (typeof DEFAULT_SETTINGS === 'object') {
    Object.assign(DEFAULT_SETTINGS, clone(OEKO_DEFAULTS));
    /* the studio merge keeps only the studio departments unless saved — rewrap it for Ökoplan's departments */
    if (typeof mergeSettings === 'function') mergeSettings = (base => saved => {
      const s = base(saved ? clone(saved) : saved);
      const keep = new Set(OEKO_DEFAULTS.departments.map(d => d.id).concat(((saved || {}).departments || []).map(d => d.id)));
      s.departments = (s.departments || []).filter(d => keep.has(d.id)); OEKO_DEFAULTS.departments.forEach(d => { if (!s.departments.find(x => x.id === d.id)) s.departments.push(clone(d)); });
      if (!saved) { s.shifts = clone(OEKO_DEFAULTS.shifts); s.leaveTypes = clone(OEKO_DEFAULTS.leaveTypes); s.policy = Object.assign({}, s.policy || {}, clone(OEKO_DEFAULTS.policy)); s.regulation = clone(OEKO_DEFAULTS.regulation); s.trades = OEKO_DEFAULTS.trades.slice(); s.company = NAME; s.ownerName = 'د. طارق صبحي'; s.brands = clone(OEKO_DEFAULTS.brands); s.stuLogin = Object.assign({}, clone(OEKO_DEFAULTS.stuLogin), s.stuLogin || {}); }
      else { s.stuLogin = Object.assign({}, clone(OEKO_DEFAULTS.stuLogin), s.stuLogin || {}); if (!Array.isArray(s.stuLogin.stills) || s.stuLogin.stills.length <= 1) { s.stuLogin.stills = STILLS.slice(); s.stuLogin.poster = STILLS[0]; } if (!s.stuLogin.logo || /brand\/(full|lockup)(-dark)?\.png$/.test(String(s.stuLogin.logo))) s.stuLogin.logo = IMG.icon; if (!(s.regulation && s.regulation.text) || /Ninety|نينتي/.test(s.regulation.title || '')) s.regulation = clone(OEKO_DEFAULTS.regulation); }
      return s;
    })(mergeSettings);
    if (!(S.loaded && S.loaded.settings)) S.settings = mergeSettings(null);
  }
  /* «تطبيق بنود اللائحة» writes Ökoplan's regulation */
  if (typeof applyRegulationSettings === 'function') applyRegulationSettings = async silent => {
    const s = Object.assign({}, S.settings); const d = clone(OEKO_DEFAULTS);
    s.shifts = d.shifts.concat((s.shifts || []).filter(x => !d.shifts.find(y => y.id === x.id))); s.leaveTypes = d.leaveTypes; s.policy = Object.assign({}, s.policy || {}, d.policy); s.hoursPerDay = 8; s.otMultiplier = 1; s.trades = d.trades; s.regulation = Object.assign({}, s.regulation || {}, { text: d.regulation.text, textEn: d.regulation.textEn, title: d.regulation.title }); s.regPolicyApplied = (s.regulation && s.regulation.version) || 1;
    await Store.saveSettings(s); if (!silent) toast(L('تم تطبيق لائحة أوكوبلان على الإعدادات', 'Ökoplan regulation applied to the settings'));
  };

  /* roles of the office (the studio keys stay; the names change) */
  if (typeof ROLES === 'object') Object.assign(ROLES, {
    admin: 'صاحب المكتب', manager: 'مدير التصميم — Landscape Design Manager', hr: 'مدير المكتب — الشؤون الإدارية والموارد البشرية', acc: 'الحسابات',
    head: 'شريك / رئيس قسم — Associate Partner', office: 'مهندس — Landscape Architect', employee: 'موظف — بوابة الموبايل', viewer: 'مشاهد',
  });
  if (typeof ROLE_HINTS === 'object') Object.assign(ROLE_HINTS, {
    admin: 'صاحب المكتب (د. طارق صبحي): يرى كل شيء ويعتمد نهائيًا — المشاريع، الفريق، الحضور، الإجازات، المرتبات، العملاء وعروض الأسعار.',
    head: 'الشريك / رئيس القسم: يدير قسمه وفرقه — يوزّع المهام ويتابع المشاريع ويعتمد إجازات وأذونات وبصمات فريقه (الاعتماد النهائي).',
    manager: 'مدير التصميم: يتابع كل مشاريع التصميم ومراحلها والمهام والفريق والحضور — بدون أرقام مالية.',
    hr: 'مدير المكتب: الفريق والحضور والجزاءات والإجازات والمرتبات والمصروفات والشؤون الإدارية.',
    office: 'المهندس: مشاريعه ومهامه وبوردات التصميم وبصمته وطلباته.',
    employee: 'موظف: يبصم ويقدّم طلباته من موبايله فقط.',
  });
  if (typeof ROLE_VIEWS === 'object') Object.assign(ROLE_VIEWS, {
    head: ['dashboard', 'projects', 'tasks', 'workers', 'attendance', 'requests', 'penalties', 'kpi', 'clients', 'ai', 'reports'],
    manager: ['dashboard', 'projects', 'tasks', 'workers', 'attendance', 'requests', 'kpi', 'clients', 'ai', 'reports', 'org'],
    office: ['dashboard', 'projects', 'tasks', 'clients', 'ai'],
  });
  if (typeof DEFAULT_CHAINS === 'object') Object.assign(DEFAULT_CHAINS, POLICY.chains);
  if (typeof CONTRACTS === 'object') Object.assign(CONTRACTS, { monthly: 'راتب شهري', daily: 'يومية', part: 'بارت تايم' });
  if (typeof PUNCH_AT === 'object') Object.assign(PUNCH_AT, { auto: 'تلقائي — المكتب، ومواقع المشاريع لمهندسي الإشراف', factory: 'المكتب فقط (QR)', sites: 'مواقع المشاريع المخصصة له فقط (الإشراف على التنفيذ)', both: 'المكتب أو مواقع المشاريع', any: 'بدون قيد موقع (من البيت)' });

  /* navigation: Ökoplan words, no Ninety hub */
  const relabel = { projects: 'المشاريع ومراحلها', workers: 'فريق المكتب', sites: 'مواقع البصمة (المكتب والمشاريع)', kpi: 'التقييم ربع السنوي', org: 'الهيكل التنظيمي' };
  if (Array.isArray(NAV)) {
    NAV.forEach(n => { if (n.id && relabel[n.id]) n.label = relabel[n.id]; });
    for (let i = NAV.length - 1; i >= 0; i--) { const n = NAV[i]; if (n.id && /^ninety/.test(String(n.id))) NAV.splice(i, 1); }
  }
  if (typeof VIEW_TITLES === 'object') Object.assign(VIEW_TITLES, { workers: 'فريق المكتب', sites: 'مواقع البصمة' });
  /* not in Ökoplan: the NFC door (remote computers: server side ready — rd_* + Edge rdesk) */
  const HIDDEN = ['door'];
  if (typeof canSee === 'function') canSee = (base => view => (/^ninety/.test(String(view || '')) || HIDDEN.includes(view) ? false : base(view)))(canSee);
  if (Array.isArray(NAV)) for (let i = NAV.length - 1; i >= 0; i--) if (HIDDEN.includes(NAV[i].id)) NAV.splice(i, 1);
  if (typeof NINETY_COS === 'object') Object.keys(NINETY_COS).forEach(k => { NINETY_COS[k].url = ''; });
  if (typeof ACTIONS === 'object') { ACTIONS.ninetyGo = () => go('dashboard'); ACTIONS.goHome = () => go('dashboard'); ACTIONS.ninetyHome = () => go('dashboard'); }
  /* no Ninety owner hub: the owner lands on the dashboard (the hub is skipped while sessionStorage says a company is open) */
  try { sessionStorage.setItem('nf.ninety.co', 'factory'); } catch (e) { /* ignore */ }
  if (typeof ninetySet === 'function') ninetySet = () => { try { sessionStorage.setItem('nf.ninety.co', 'factory'); } catch (e) { /* ignore */ } };
  if (/^#\/?ninety$/.test(location.hash || '')) { try { history.replaceState(null, '', '#/dashboard'); } catch (e) { /* ignore */ } }
  window.addEventListener('hashchange', () => { if (/^#\/?ninety$/.test(location.hash || '')) location.hash = '#/dashboard'; });
  /* the hub may already be on screen from the first render (this file loads after the app) — redraw */
  const unhub = () => { if (document.getElementById('nhome') && typeof render === 'function') { try { render(true); } catch (e) { /* ignore */ } } };
  setTimeout(unhub, 0); setTimeout(unhub, 400); document.addEventListener('nf:ready', () => setTimeout(unhub, 50)); document.addEventListener('nf:login', () => setTimeout(unhub, 50));
  /* landscape stages instead of the ArchViz stages (the PM module reads its stage list from settings when present) */
  /* the office pipeline — RIBA Plan of Work 2020 / Landscape Institute stages mapped to the office's seven, each with its steps and approval gate */
  const PIPELINE = [
    { id: 'data', name: 'Inception & Site Analysis', ar: 'البداية وتحليل الموقع', pct: 5, riba: 'RIBA 0–1', gate: ['التيم ليدر', 'Team lead'], items: [
      ['اجتماع البريف: متطلبات العميل والميزانية والبرنامج الزمني والتعاقد', 'Client brief, requirements, budget, schedule and contract kick-off'],
      ['زيارة الموقع ورفع مساحي (توبوغرافي · أشجار قائمة · مياه) وتصوير', 'Site visit, topographic survey (existing trees · water) and photo record'],
      ['تحليل الموقع: مناخ · تربة · مياه · مناسيب · رؤى · حركة', 'Site analysis: climate · soil · water · levels · views · circulation'],
      ['مراجعة الاشتراطات والكود المحلي', 'Local regulations and code review'],
      ['تقرير تحليل الموقع — الفرص والمحددات', 'Site analysis report — opportunities & constraints'],
      ['برنامج المتطلبات وجدول المشروع', 'Program of requirements and project schedule']] },
    { id: 'concept', name: 'Concept Design', ar: 'التصور المبدئي', pct: 15, riba: 'RIBA 2', gate: ['مدير التصميم ← د. طارق ← العميل', 'Design Manager → Dr. Tarek → Client'], items: [
      ['السرد التصميمي والمراجع (Mood board)', 'Design narrative and references (mood board)'],
      ['زوننج وماستر بلان مبدئي', 'Preliminary master plan and zoning'],
      ['المحاور والحركة والمداخل', 'Axes, circulation and entrances'],
      ['باليتة مبدئية للخامات والنباتات', 'Preliminary materials and plant palette'],
      ['اسكتشات / لقطات 3D', 'Concept sketches / 3D views'],
      ['عرض الكونسبت واعتماد العميل', 'Concept presentation and client approval']] },
    { id: 'schem', name: 'Schematic Design', ar: 'التصميم التمهيدي', pct: 20, riba: 'RIBA 2', gate: ['مدير التصميم ← العميل', 'Design Manager → Client'], items: [
      ['ماستر بلان بالأبعاد', 'Dimensioned master plan'],
      ['مخططات مبدئية للهاردسكيب والسوفت سكيب', 'Preliminary hardscape and softscape plans'],
      ['عناصر المياه والإضاءة والإشارات (مبدئي)', 'Water features, lighting and signage (preliminary)'],
      ['شبكة ري مبدئية وحساب الاحتياج المائي', 'Preliminary irrigation layout and water demand'],
      ['قايمة نباتات مبدئية', 'Preliminary plant list (plant palette)'],
      ['كميات ومساحات مبدئية', 'Preliminary quantities / area schedule'],
      ['اعتماد التصميم التمهيدي', 'Schematic design approval']] },
    { id: 'dd', name: 'Design Development', ar: 'تطوير التصميم', pct: 25, riba: 'RIBA 3', gate: ['التيم ليدر ← مدير التصميم', 'Team lead → Design Manager'], items: [
      ['تفاصيل الهاردسكيب: أرضيات · حوائط · درج · فرش خارجي', 'Hardscape details: paving · walls · steps · outdoor furniture'],
      ['مخطط زراعة تفصيلي وجداول النباتات', 'Detailed planting plan and plant schedules'],
      ['تصميم ري تفصيلي (شبكات · محابس · كنترولر)', 'Detailed irrigation design (networks · valves · controllers)'],
      ['إضاءة وعناصر مياه تفصيلي', 'Detailed lighting and water-feature design'],
      ['أعمال فنية ومنحوتات وإشارات', 'Artwork, sculpture and signage selection'],
      ['تنسيق مع الاستشاريين (معماري · إنشائي · MEP)', 'Coordination with consultants (architect · structural · MEP)'],
      ['اعتماد تطوير التصميم', 'Design development approval']] },
    { id: 'tender', name: 'Construction Documents & Tender (IFC)', ar: 'الرسومات التنفيذية ومستندات الطرح', pct: 25, riba: 'RIBA 4', gate: ['المكتب الفني ← مدير التصميم', 'Technical Office → Design Manager'], items: [
      ['رسومات تنفيذية كاملة (IFC) لكل التخصصات', 'Full construction drawings (IFC) for all disciplines'],
      ['تفاصيل الإنشاء', 'Construction details'],
      ['المواصفات الفنية', 'Technical specifications'],
      ['المقايسة (BOQ)', 'Bill of quantities (BOQ)'],
      ['مستندات الطرح والرد على استفسارات المقاولين', 'Tender documents and contractor queries'],
      ['مراجعة QA/QC قبل الإصدار', 'QA/QC review before issue']] },
    { id: 'super', name: 'Site Supervision', ar: 'الإشراف على التنفيذ', pct: 5, riba: 'RIBA 5', gate: ['مهندس الموقع ← التيم ليدر', 'Site engineer → Team lead'], items: [
      ['زيارات دورية وتقارير موقع', 'Periodic site visits and site reports'],
      ['اعتماد العينات والخامات والنباتات (Submittals)', 'Samples, materials and plant approvals (submittals)'],
      ['الرد على RFIs واعتماد الشوب دروينج', 'RFI responses and shop-drawing approvals'],
      ['متابعة أعمال الري والزراعة والإضاءة', 'Follow-up of irrigation, planting and lighting works'],
      ['قايمة الملاحظات والتسليم الابتدائي', 'Snag list and initial handover']] },
    { id: 'delivered', name: 'Handover & Maintenance', ar: 'التسليم والصيانة', pct: 5, riba: 'RIBA 6–7', gate: ['د. طارق ← العميل', 'Dr. Tarek → Client'], items: [
      ['التسليم النهائي وشهادة الاستلام', 'Final handover and acceptance certificate'],
      ['دليل التشغيل والصيانة (O&M)', 'Operation & maintenance manual'],
      ['رسومات As-built', 'As-built drawings'],
      ['برنامج صيانة وسنة ضمان العيوب', 'Maintenance program and defects-liability year'],
      ['توثيق المشروع بالتصوير للمعرض', 'Project documentation (photography) for the gallery']] },
  ];
  window.OEKO_PIPELINE = PIPELINE; window.OEKO_PIPELINE_DEFAULT = JSON.parse(JSON.stringify(PIPELINE));
  const STAGES = PIPELINE.map(st => ({ id: st.id, name: st.name, ar: st.ar, pct: st.pct }));
  if (typeof DEFAULT_SETTINGS === 'object') DEFAULT_SETTINGS.pmStages = STAGES;
  const syncStages = () => {
    STAGES.length = 0; PIPELINE.forEach(st => STAGES.push({ id: st.id, name: st.name, ar: st.ar, pct: st.pct }));
    if (typeof PM_STAGES !== 'undefined' && Array.isArray(PM_STAGES)) { PM_STAGES.length = 0; STAGES.forEach(s => PM_STAGES.push(s)); }
    if (typeof STU_STAGES !== 'undefined' && Array.isArray(STU_STAGES)) { STU_STAGES.length = 0; STAGES.forEach(s => STU_STAGES.push(s)); }
    if (Array.isArray(window.OS_STATUSES)) { const list = PIPELINE.map(st => ({ id: st.id, en: st.name, ar: st.ar })).concat([{ id: 'closed', en: 'Closed', ar: 'اتقفل' }]); OS_STATUSES.length = 0; list.forEach(x => OS_STATUSES.push(x)); }
  };
  syncStages();
  /* the office may edit the pipeline (settings.okPipeline — the editor page): the arrays are replaced in place so every module sees it */
  let pipeSig = '';
  window.okApplyPipeline = custom => {
    const src = Array.isArray(custom) && custom.length ? custom : window.OEKO_PIPELINE_DEFAULT; const sig = JSON.stringify(src); if (sig === pipeSig) return false; pipeSig = sig;
    PIPELINE.length = 0; JSON.parse(sig).forEach(st => PIPELINE.push(st)); syncStages(); return true;
  };
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => { try { if (window.okApplyPipeline(S.settings && S.settings.okPipeline)) setTimeout(() => rerender(), 0); } catch (e) { /* */ } });

  /* ---------------------------------------------------------------- login screen (light, the Ökoplan lockup + signature) */
  const cfgL = () => Object.assign({}, OEKO_DEFAULTS.stuLogin, (S.settings && S.settings.stuLogin) || {});
  function formHTML() {
    const sb = typeof sbOn === 'function' && sbOn();
    return `${!S.staffReady ? `<p class="muted" style="text-align:center">${L('جارٍ تحميل المستخدمين…', 'Loading users…')}</p>` : `
    <form id="loginform" autocomplete="on" class="slform">
      <h2>${L('ادخل على سيستم أوكوبلان', 'Sign in to Ökoplan')}</h2>
      <div class="slf"><input id="lg-user" name="username" class="ltr" autocomplete="username" inputmode="tel" required placeholder="${L('رقم الموبايل أو اسم المستخدم', 'Mobile number or username')}" value="${esc(S.ui.loginPrefill || '')}"><label for="lg-user">${L('رقم الموبايل', 'Mobile')}</label></div>
      <div class="slf"><input id="lg-pass" name="password" type="password" class="ltr" autocomplete="current-password" required placeholder="${L('كلمة السر', 'Password')}"><label for="lg-pass">${L('كلمة السر', 'Password')}</label></div>
      <label class="slchk"><input type="checkbox" id="lg-remember" name="remember" checked> ${L('افتكرني على الجهاز ده', 'Remember me on this device')}</label>
      <p id="lg-err" class="slerr"></p>
      <button type="submit" class="slbtn">${L('دخول', 'Sign in')}</button>
      <div class="slalt"><button type="button" data-action="activate">${L('أول مرة؟ فعّل حسابك', 'First time? Activate your account')}</button><button type="button" data-action="forgotPw">${L('نسيت كلمة السر', 'Forgot password')}</button></div>
    </form>`}
    ${sb && S.sbBootstrap ? `<button type="button" class="slbtn" data-action="sbBootstrap">${icon('star')}${L('إنشاء حساب المدير الأول (مرة واحدة)', 'Create the first admin account (once)')}</button>` : ''}
    ${!sb && S.staffReady && !loginPeople().length && S.canWrite !== false ? `<button type="button" class="slbtn" data-action="firstAdmin">${L('الدخول كمدير لإعداد النظام', 'Enter as admin to set up')}</button>` : ''}`;
  }
  let slide = null;
  function okLogin() {
    const c = cfgL(); const stills = (c.stills || []).filter(Boolean); const dark = typeof themeCurrent === 'function' && themeCurrent() === 'dark';
    return `<div class="oklogin" dir="${en() ? 'ltr' : 'rtl'}">
      <div class="okscene" id="okscene"><div class="shape"></div>${stills.map(u => `<img class="still" src="${esc(u)}" alt="" loading="lazy">`).join('')}<div class="veil"></div>
        <div class="cap"><h1>${esc(c.slogan)}</h1><p>${esc(c.sub)}</p></div></div>
      <div class="okside">
        <div class="okcard"><img class="lg" src="${dark ? IMG.lockupDark : IMG.lockup}" alt="ÖKOPLAN"><img class="sig" src="${IMG.sig}" alt="Tarek Sobhy">${formHTML()}</div>
        <div class="langrow">${typeof i18nToggleHTML === 'function' ? i18nToggleHTML() : ''}</div>
        ${window.stuSocialsHTML ? `<div class="slsoc">${stuSocialsHTML(c)}</div>` : ''}
        <div class="okfoot">© ${new Date().getFullYear()} ${NAME} · <a href="${esc(c.site)}" target="_blank" rel="noopener">${esc(String(c.site).replace(/^https?:\/\//, ''))}</a><br><span class="muted">${esc(APP.build || '')}</span></div>
      </div></div><div id="modalroot"></div><div class="toasts" id="toasts"></div>`;
  }
  if (typeof loginScreen === 'function') loginScreen = (base => function () {
    if (typeof nfRestoring === 'function' && nfRestoring()) return base.apply(this, arguments);
    setTimeout(() => { const sc = document.getElementById('okscene'); if (!sc || sc.__on) return; sc.__on = 1; const st = [...sc.querySelectorAll('.still')]; if (!st.length) return; let i = 0; st[0].classList.add('on'); clearInterval(slide); slide = setInterval(() => { if (!sc.isConnected) { clearInterval(slide); return; } st[i].classList.remove('on'); i = (i + 1) % st.length; st[i].classList.add('on'); }, 5000); }, 0);
    return okLogin();
  })(loginScreen);

  /* footer: Ökoplan lockup instead of the studio wordmark; logos follow the theme */
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => {
    swapLogos(); if (/Ninety/.test(document.title) || document.title === 'Ninety') document.title = NAME;
    document.querySelectorAll('.stufoot img').forEach(i => { const want = typeof themeCurrent === 'function' && themeCurrent() === 'dark' ? IMG.lockupDark : IMG.lockup; if (i.getAttribute('src') !== want) i.setAttribute('src', want); });
    document.querySelectorAll('.co[data-action="ninetyGo"], .ninetyhub, [data-view="ninety"], .nfhomebtn, [data-action="ninetyHome"]').forEach(e => e.remove());
  });
  document.addEventListener('DOMContentLoaded', () => { document.title = NAME; swapLogos(); });

  /* local / preview mode (no server yet): the engine seeds factory demo data — wipe it once, the owner account is Dr. Tarek */
  const oekoCleanStart = async () => {
    try {
      if (typeof sbOn === 'function' && sbOn()) return; if (!S || S.mode !== 'local') return;
      let done = ''; try { done = localStorage.getItem('oeko.clean') || ''; } catch (e) { /* ignore */ }
      if (done) return;
      for (const c of COLS) { if (c === 'staff' || c === 'backups') continue; for (const d of list(c)) { try { await Store.remove(c, d.id); } catch (e) { /* ignore */ } } }
      for (const st of list('staff')) { if (/تجريبي/.test(st.name || '') && st.role !== 'admin') { try { await Store.remove('staff', st.id); } catch (e) { /* ignore */ } continue; } if (st.role === 'admin' && /محمود|Mahmoud/.test(st.name || '')) { try { await Store.save('staff', Object.assign({}, st, { name: 'طارق صبحي' })); if (S.session && S.session.id === st.id) S.session.name = 'طارق صبحي'; } catch (e) { /* ignore */ } } }
      try { localStorage.setItem('oeko.clean', '1'); } catch (e) { /* ignore */ }
      if (typeof render === 'function') render(true);
    } catch (e) { /* ignore */ }
  };
  document.addEventListener('nf:ready', oekoCleanStart); if (typeof S !== 'undefined' && S._readyFired) setTimeout(oekoCleanStart, 0);
  /* the owner's line in the org chart / about: Dr. Tarek Sobhy */
  if (typeof OEKO_DEFAULTS === 'object') OEKO_DEFAULTS.owner = 'د. طارق صبحي';

  /* ---------------------------------------------------------------- the team (from «Ökoplan Landscaping — Team Database», 13 Oct 2026) */
  /* [name, graduation year, title, e-mail, phone, mode, remark, dept, role] — dept/role from the structure; '' = to be confirmed */
  const TEAM = [
    ['Dalia Hassan', 2004, 'Associate Partner | Head of Technical Office', 'dalia.farahat@oekoplanlandscaping.com', '01006882632', 'full', '', 'tech', 'head'],
    ['Samah Hassan Wafa', 2005, 'Associate Partner | Head Design Studio 1', 'samah.wafa@oekoplanlandscaping.com', '01066180489', 'full', '', 'ds1', 'head'],
    ['Haidy Ehab', 2007, 'Associate Partner | Head Design Studio 2', 'haidy.ehab@oekoplanlandscaping.com', '01001136947', 'full', '', 'ds2', 'head'],
    ['Manal Hussien', 2007, 'Associate Partner | Head of Landscape Coordination', 'manal.hussein@oekoplanlandscaping.com', '0100378228', 'full', 'رقم الموبايل ناقص رقم — يُراجع', 'coord', 'head'],
    ['Rawan Kamal El-Dein', 2009, 'Associate Partner | Head of PMO', 'rawan.kamal@oekoplanlandscaping.com', '01002490111', 'home', '', 'pmo', 'head'],
    ['Reem Elsayed', 2010, 'Associate Partner | Head of Business Development', 'reem.elsayed@oekoplanlandscaping.com', '01068505773', 'home', '', 'bd', 'head'],
    ['Asmaa Hassan', 2012, 'Landscape Design Manager', 'asmaa.hassan@oekoplanlandscaping.com', '01099377479', 'full', '', 'tech', 'manager'],
    ['Aya Yasser', 2014, 'Lead Landscape Architect', 'aya.yasser@oekoplanlandscaping.com', '01116999103', 'home', '', '', 'office'],
    ['Sarah El Sayed', 2014, 'Lead Landscape Architect', 'sarah.elsayed@oekoplanlandscaping.com', '01011922386', 'home', 'إجازة وضع', '', 'office'],
    ['Hoda Abdelrahim', 2017, 'Senior Lead Irrigation Engineer', 'hoda.abdelrahim@oekoplanlandscaping.com', '01001298246', 'full', '', 'coord', 'office'],
    ['Ahmed El Sayed', 2001, 'Office Manager', 'ahmed.elsayed@oekoplanlandscaping.com', '01278888066', 'full', '', 'mgmt', 'hr'],
    ['Eslam Abdelkareem Abdel Fattah', 2016, 'Senior 3D Visualizing Architect', 'eslam.abdelkareem@oekoplanlandscaping.com', '0100049978', 'home', 'رقم الموبايل ناقص رقم — يُراجع', 'tech', 'office'],
    ['Kholod Gamal Mohamed', 2019, 'PMO Coordinator', 'kholod.mohamed@oekoplanlandscaping.com', '01114426064', 'hybrid', '', 'pmo', 'office'],
    ['Rana Essam Mohamed', 2018, 'Senior Landscape Architect', 'rana.essam@oekoplanlandscaping.com', '01148263533', 'full', '', '', 'office'],
    ['Maria Fayiz Metry', 2018, 'Senior Landscape Architect', 'maria.fayiz@oekoplanlandscaping.com', '01276655189', 'full', '', '', 'office'],
    ['Patricia Edwar Alber', 2019, 'Senior Landscape Architect', 'patricia.alber@oekoplanlandscaping.com', '01278788544', 'full', '', '', 'office'],
    ['Salam Albeik', 2019, 'Senior Landscape Architect', 'salam.albeik@oekoplanlandscaping.com', '01142777490', 'home', '', '', 'office'],
    ['Haidy Alaa El-Din Amer', 2019, 'Senior Landscape Architect', 'haidy.alaa@oekoplanlandscaping.com', '01126570248', 'home', '', '', 'office'],
    ['Abdelrahman Amal Sousa', 2021, 'Senior Landscape Architect', 'abdelrahman.sousa@oekoplanlandscaping.com', '01005999483', 'full', '', '', 'office'],
    ['Shahenda Sherif Diab', 2020, 'Senior Landscape Architect', 'shahenda.diab@oekoplanlandscaping.com', '01159137776', 'full', '', '', 'office'],
    ['Injy Mohamed Metwally', 2019, 'Senior Landscape Architect', 'injy.mohamed@oekoplanlandscaping.com', '01092817179', 'full', 'إجازة وضع', '', 'office'],
    ['Eman Ahmed Mohamed', 2020, 'Senior Landscape Architect', 'eman.ahmed@oekoplanlandscaping.com', '01009590116', 'part', '', '', 'office'],
    ['Dina Mohsen Hanafy', 2020, 'Senior Landscape Architect', 'dina.mohsen@oekoplanlandscaping.com', '01119129799', 'home', 'إجازة وضع', '', 'office'],
    ['Merna Atef Mohamed', 2021, 'Senior Landscape Architect', 'merna.atef@oekoplanlandscaping.com', '011544441175', 'hybrid', 'رقم الموبايل فيه رقم زيادة — يُراجع', '', 'office'],
    ['Mohamed Saeed', 2021, 'Senior Landscape Architect', 'mohamed.saeed@oekoplanlandscaping.com', '01557827988', 'full', '', '', 'office'],
    ['Samar Atef', 2016, 'Landscape Architect', 'samar.atef@oekoplanlandscaping.com', '01156235717', 'partremote', '', '', 'office'],
    ['Nada Mohamed Selim', 2022, 'Landscape Architect', 'nada.selim@oekoplanlandscaping.com', '01221134628', 'full', '', '', 'office'],
    ['Alaa Walid Abdallah', 2022, 'Landscape Architect', 'alaa.waleed@oekoplanlandscaping.com', '01002734754', 'partremote', '', '', 'office'],
    ['Sara Sherreen Yehia', 2022, 'Landscape Architect', 'sara.sherreen@oekoplanlandscaping.com', '01119700056', 'full', '', '', 'office'],
    ['Laila Saleh', 2022, 'Landscape Architect', 'laila.saleh@oekoplanlandscaping.com', '01110222234', 'full', '', 'bd', 'office'],
    ['Menna Allah Youssef', 2022, 'Landscape Architect', 'menna.youssef@oekoplanlandscaping.com', '01142900293', 'full', '', '', 'office'],
    ['Sarah Waleed El Gendy', 2022, 'Landscape Architect', 'sara.waleed@oekoplanlandscaping.com', '01118599637', 'full', '', 'bd', 'office'],
    ['Mariam Osama', 2022, 'Landscape Architect', 'mariam.osama@oekoplanlandscaping.com', '01202624789', 'full', '', '', 'office'],
    ['Alaa Farouk', 2022, 'Landscape Architect', 'alaa.farouk@oekoplanlandscaping.com', '01000665010', 'full', '', '', 'office'],
    ['Nada Mohamed Ali', 2023, 'Landscape Architect', 'nada.ali@oekoplanlandscaping.com', '01013605669', 'full', '', '', 'office'],
    ['Nada Essam Farouk', 2023, 'Landscape Architect', 'nada.essam@oekoplanlandscaping.com', '01156016468', 'full', '', '', 'office'],
    ['Nadra Tarek', 2023, 'Landscape Architect', 'nadra.tarek@oekoplanlandscaping.com', '01098450446', 'hybrid', '', '', 'office'],
    ['Ammar Bassem Mohamed', 2023, 'Landscape Architect', 'ammar.bassem@oekoplanlandscaping.com', '01145582323', 'full', '', '', 'office'],
    ['Eyad Bassem Mohamed', 2023, 'Landscape Architect', 'eyad.bassem@oekoplanlandscaping.com', '01121831839', 'full', '', '', 'office'],
    ['Nancy Ahmed', 2023, 'Landscape Architect', 'nancy.ahmed@oekoplanlandscaping.com', '01125970401', 'full', '', '', 'office'],
    ['Salma Amr Shalaby', 2020, 'Landscape Architect', 'salma.shalaby@oekoplanlandscaping.com', '01062397065', 'full', '', '', 'office'],
    ['Farah Nabil', 2024, 'Junior Landscape Architect', 'farah.nabil@oekoplanlandscaping.com', '01121106489', 'full', '', '', 'office'],
    ['Sherouk Ashraf', 2024, 'Junior Landscape Architect', 'sherouk.ashraf@oekoplanlandscaping.com', '01141108848', 'full', '', '', 'office'],
    ['Hayam Soliman', 2024, 'Junior Landscape Architect', 'hayam.soliman@oekoplanlandscaping.com', '01272000793', 'full', '', '', 'office'],
    ['Yara Mohamed Abdelsalam', 2025, 'Junior Landscape Architect', 'yara.eltahawi@oekoplanlandscaping.com', '01156704638', 'full', '', '', 'office'],
    ['Sally Sadek', 2025, 'Junior Landscape Architect', 'sally.sadek@oekoplanlandscaping.com', '01289979166', 'full', '', '', 'office'],
    ['Mohamed Amr El Gazzar', 2025, 'Junior Landscape Architect', 'mohamed.elgazzar@oekoplanlandscaping.com', '01206553319', 'full', '', '', 'office'],
    ['Menna Allah Galal', 2025, 'Junior Landscape Architect', 'menna.galal@oekoplanlandscaping.com', '01551531150', 'full', '', '', 'office'],
    ['Sama Abdelhamid', 2025, 'Junior Landscape Architect', 'sama.abdelhamid@oekoplanlandscaping.com', '01100903500', 'full', '', '', 'office'],
    ['Salma Abdelhamid', 2025, 'Junior Landscape Architect', 'salma.abdelhamid@oekoplanlandscaping.com', '01100902500', 'full', '', '', 'office'],
    ['Amal Magdy', 2025, 'Junior Landscape Architect', 'amal.magdy@oekoplanlandscaping.com', '01032002888', 'full', '', '', 'office'],
    ['Moreen Boshra', 2025, 'Junior Landscape Architect', 'moreen.boshra@oekoplanlandscaping.com', '01208390383', 'full', '', '', 'office'],
    ['Mena Ebrahim Habib', 2025, 'Junior Landscape Architect', 'menna.ibrahim@oekoplanlandscaping.com', '01002902816', 'full', '', '', 'office'],
    ['Alaa Mahmoud Abbas', 2025, 'Junior Landscape Architect', 'alaa.mahmoud@oekoplanlandscaping.com', '01152344047', 'full', '', '', 'office'],
    ['Mariette George', 2025, 'Junior Landscape Architect', 'mariette.george@oekoplanlandscaping.com', '01222209550', 'full', '', '', 'office'],
    ['Salma Magdy', 2026, 'Landscape Architect', 'salma.magdy@oekoplanlandscaping.com', '01080368636', 'full', '', '', 'office'],
    ['Clara Safwat', 2026, 'Junior Landscape Architect', 'clara.safwat@oekoplanlandscaping.com', '01202592124', 'full', '', '', 'office'],
  ];
  /* teams named in the sheet (members from the colour legend where it was readable; the rest are assigned from the screen) */
  const TEAMS = {
    'Team Dalia & Asmaa': ['Dalia Hassan', 'Asmaa Hassan'], 'Team Samah': ['Samah Hassan Wafa'], 'Team Haidy': ['Haidy Ehab', 'Nada Mohamed Selim', 'Alaa Farouk', 'Sherouk Ashraf'], 'Team Manal': ['Manal Hussien', 'Hoda Abdelrahim'],
    'Team Rawan': ['Rawan Kamal El-Dein', 'Kholod Gamal Mohamed'], 'Team Reem': ['Reem Elsayed', 'Laila Saleh', 'Sarah Waleed El Gendy'], 'Team Aya': ['Aya Yasser', 'Sama Abdelhamid', 'Mariette George'],
    'Team Patricia': ['Patricia Edwar Alber'], 'Team Rana': ['Rana Essam Mohamed', 'Salma Amr Shalaby', 'Farah Nabil', 'Mohamed Amr El Gazzar'], 'Team Sousa': ['Abdelrahman Amal Sousa', 'Nadra Tarek'],
    'Team Menna Youssef': ['Menna Allah Youssef', 'Menna Allah Galal'], 'Team Salam': ['Salam Albeik', 'Salma Abdelhamid'], 'Team Sara Elhariry': [],
  };
  const MODE = { full: { shiftId: 'main', workplace: 'office', contract: 'monthly' }, home: { shiftId: 'remote', workplace: 'home', contract: 'monthly' }, hybrid: { shiftId: 'hybrid', workplace: 'home', contract: 'monthly' }, part: { shiftId: 'part', workplace: 'office', contract: 'part' }, partremote: { shiftId: 'partremote', workplace: 'home', contract: 'part' } };
  const MODE_AR = { full: 'دوام كامل من المكتب', home: 'من البيت', hybrid: 'هايبرد', part: 'بارت تايم من المكتب', partremote: 'بارت تايم من البيت' };
  const teamOf = name => Object.keys(TEAMS).find(t => TEAMS[t].includes(name)) || '';
  const leadOf = name => { const t = teamOf(name); if (!t) return ''; const lead = TEAMS[t][0]; return lead === name ? '' : lead; };
  window.OEKO_TEAM = TEAM;

  async function importTeam() {
    if (typeof isAdmin !== 'function' || !isAdmin()) return;
    const existing = list('workers'); const byPhone = new Map(existing.map(w => [String(w.phone || '').replace(/\D/g, ''), w])); const byName = new Map(existing.map(w => [w.name, w]));
    let code = 1; const used = new Set(existing.map(w => w.code)); const nextCode = () => { while (used.has('OEK-' + String(code).padStart(3, '0'))) code++; const c = 'OEK-' + String(code).padStart(3, '0'); used.add(c); return c; };
    const ids = new Map(); let added = 0, kept = 0;
    const docs = TEAM.map(r => {
      const [name, grad, title, email, phone, mode, remark, dept, role] = r; const key = String(phone).replace(/\D/g, '');
      const old = byPhone.get(key) || byName.get(name); if (old) { kept++; ids.set(name, old.id); return null; }
      const m = MODE[mode] || MODE.full; const id = uid(); ids.set(name, id); added++;
      const notes = [title, 'تخرج ' + grad, MODE_AR[mode] || '', teamOf(name), remark].filter(Boolean).join(' · ');
      return { id, code: nextCode(), name, deptId: dept || 'ds1', trade: title.replace(/^Associate Partner \| /, 'Associate Partner — '), title, gradYear: grad, team: teamOf(name), email, phone, role, workplace: m.workplace, shiftId: m.shiftId, contract: m.contract, joined: '', status: 'active', punchAt: m.workplace === 'home' ? 'any' : 'auto', punchMethods: { face: false, pin: false, device: true, selfie: m.workplace === 'home' }, offDays: [], notes, deptPending: !dept, maternity: /وضع/.test(remark) };
    }).filter(Boolean);
    docs.forEach(d => { const lead = leadOf(d.name); if (lead && ids.get(lead)) d.managerId = ids.get(lead); });
    for (const d of docs) await Store.save('workers', d);
    toast(L(`اتضاف ${added} — موجود من قبل ${kept}`, `${added} added — ${kept} already there`)); render(false);
  }
  ACTIONS.oekoImportTeam = async () => { if (!(await confirmDlg(L('إضافة فريق أوكوبلان (57 شخص) من ملف الفريق؟ اللي موجود بنفس الموبايل مش هيتكرر.', 'Add the Ökoplan team (57 people) from the team file? People already there (same mobile) are skipped.'), L('إضافة', 'Add')))) return; await importTeam(); };
  window.oekoImportTeam = importTeam;

  /* ---------------------------------------------------------------- the 2026 projects list (Mahmoud, 13 Oct — «Projects List 2026.xlsx», sheet «Ongoing Projects») */
  /* [name, latest stage completed ('' = none), [responsible...], 'On Hold' | ''] — from «Projects List 2026», 13 Oct 2026 */
  const PROJECTS_2026 = [["El-Narges Extension Compound", "dd", ["Gina Seila"], ""], ["Boardwalk", "dd", ["Gina Seila"], ""], ["Peerage Residence", "schem", ["Gina Seila"], ""], ["South Of Gardenia Compound", "concept", ["Gina Seila"], ""], ["AJWAN", "concept", ["Gina Seila"], ""], ["LUMIA", "concept", ["Gina Seila"], "On Hold"], ["The Rift", "concept", ["Gina Seila"], ""], ["Rivers", "schem", ["Gina Seila"], ""], ["Raville", "schem", ["Gina Seila"], ""], ["Boho Hotel And Beach", "concept", ["Gina Seila"], ""], ["Valore", "concept", ["Gina Seila"], ""], ["IL MONTE GALALA Phase 2", "schem", ["Noura Saeed"], ""], ["One Ninety", "tender", ["Noura Saeed"], ""], ["KSP", "schem", ["Noura Saeed"], ""], ["IL BOSCO", "concept", ["Samah Wafa"], ""], ["Felo Resort", "dd", ["Samah Wafa"], "On Hold"], ["STAFF HOUSE", "tender", ["Samah Wafa"], ""], ["STEI8HT RESIDENTIAL", "schem", ["Samah Wafa"], ""], ["STEI8HT COMMERCIAL", "schem", ["Samah Wafa"], ""], ["SWAN LAKE PARCEL 5", "concept", ["Samah Wafa", "Asmaa Hassan"], ""], ["MEDIAN", "schem", ["Samah Wafa"], ""], ["Villa Mr. Othman", "concept", ["Samah Wafa"], ""], ["Fouka-Bay Phase 4", "tender", ["Samah Wafa"], ""], ["D-Bay", "concept", ["Asmaa Hassan"], ""], ["Palm Hills New Cairo", "tender", ["Asmaa Hassan"], ""], ["Elsabaa Mixed Use", "schem", ["Asmaa Hassan", "Dalia Hassan"], ""], ["Azha", "schem", ["Asmaa Hassan"], ""], ["Garden City Hurghada", "concept", ["Asmaa Hassan"], ""], ["Beta Egypt", "concept", ["Asmaa Hassan"], ""], ["Naia West", "dd", ["Asmaa Hassan"], ""], ["Nest", "concept", ["Asmaa Hassan"], "On Hold"], ["Bloomfields Phase 2", "tender", ["Rana Essam"], ""], ["Bloomfields Phase 1", "tender", ["Rana Essam"], ""], ["AVELIN /MASS", "schem", ["Rana Essam"], ""], ["El-Qamzy Eastshire", "tender", ["Maria Fayez"], ""], ["Creek Town", "schem", ["Maria Fayez"], ""], ["Mangroovy", "dd", ["Maria Fayez"], ""], ["Masaya", "concept", ["Maria Fayez"], ""], ["Boutique Hotel", "dd", ["Maria Fayez"], "On Hold"], ["Seazen", "tender", ["Patricia Edwar"], ""], ["Naia Bay", "tender", ["Patricia Edwar"], ""], ["Skywalk", "tender", ["Youstina Ghaly"], ""], ["Sharks Bay", "dd", ["Youstina Ghaly"], "On Hold"], ["Skywalk Oasis", "", ["Youstina Ghaly"], ""], ["AL-ZOHRIYA GARDEN", "concept", ["Youstina Ghaly"], ""], ["Salt", "concept", ["Aya Yasser"], ""], ["The Marq", "concept", ["Aya Yasser"], ""], ["GIZA ZOO", "dd", ["Salam Al Baik"], ""], ["YELLOW", "concept", ["Salam Al Baik"], ""], ["El MARABET", "concept", ["Nada TagEldien"], ""], ["EVORA / ASTER", "schem", ["Nada TagEldien"], ""], ["BETA", "concept", ["Nada TagEldien"], ""], ["EL MOSTAKBAL CITY", "tender", ["Haidy Alaa"], ""], ["SOLARE", "schem", ["Haidy Alaa"], ""], ["Masa Libiya", "tender", ["Haidy Alaa"], ""], ["Regent Hotel - Jeddah", "concept", ["Haidy Ehab"], ""], ["Zoya- North coast", "schem", ["Haidy Ehab"], ""], ["Raville 77", "concept", ["Haidy Ehab"], ""], ["Estates club house - Sodic", "concept", ["Haidy Ehab"], ""], ["El-marabet - Street", "concept", ["Haidy Ehab"], ""], ["El-marabet - roundabout", "concept", ["Haidy Ehab"], ""], ["Cornish el mokattam", "schem", ["Haidy Ehab"], ""], ["Mostakbal city", "concept", ["Haidy Ehab"], ""], ["Mesca Residence", "tender", ["Haidy Ehab"], ""], ["City Stars", "concept", ["Haidy Ehab"], ""], ["Benghazi - Libya", "concept", ["Haidy Ehab"], ""], ["Masa hotel - Tarablous", "concept", ["Haidy Ehab"], ""], ["Paradise - Ras Sedr phase 5", "dd", ["Haidy Ehab"], ""], ["Ever Roundabout", "concept", ["Haidy Ehab"], ""], ["ACA Roundabouts", "concept", ["Haidy Ehab"], ""], ["LMD roundabout", "concept", ["Haidy Ehab"], ""], ["Icity", "concept", ["Haidy Ehab"], ""]];

  /* the sheet's names → the team file's names */
  const WHO = { 'Haidy Ehab': 'Haidy Ehab', 'Haidy Alaa': 'Haidy Alaa El-Din Amer', 'Maria Fayez': 'Maria Fayiz Metry', 'Salam Al Baik': 'Salam Albeik', 'Samah Wafa': 'Samah Hassan Wafa', 'Rana Essam': 'Rana Essam Mohamed', 'Patricia Edwar': 'Patricia Edwar Alber', 'Asmaa Hassan': 'Asmaa Hassan', 'Aya Yasser': 'Aya Yasser', 'Dalia Hassan': 'Dalia Hassan' };
  /* latest stage completed → the stage the project is in now (the office's stages: concept → schem → dd → tender → boq → super) */
  const NEXT_STAGE = { '': 'concept', concept: 'schem', schem: 'dd', dd: 'tender', tender: 'super' };
  const STAGE_AR = { concept: 'التصور المبدئي', schem: 'التصميم التمهيدي', dd: 'تطوير التصميم', tender: 'مستندات الطرح', super: 'الإشراف على التنفيذ' };
  async function importProjects() {
    if (typeof isAdmin !== 'function' || !isAdmin()) return { added: 0, kept: 0, unmatched: [] };
    const workers = list('workers'); const findW = n => { const t = WHO[n] || n; return workers.find(w => w.name === t) || workers.find(w => String(w.name || '').toLowerCase().startsWith(String(n).split(' ')[0].toLowerCase() + ' ') && String(w.name || '').toLowerCase().includes(String(n).split(' ').pop().toLowerCase())) || null; };
    const norm = x => String(x || '').toLowerCase().replace(/[^a-z0-9]/g, ''); const have = new Map(list('projects').map(p => [norm(p.name), p]));
    let n = list('projects').length, added = 0, kept = 0; const unmatched = new Set();
    for (const [name, done, who, hold] of PROJECTS_2026) {
      if (have.has(norm(name))) { kept++; continue; }
      const leads = who.map(x => ({ x, w: findW(x) })); leads.forEach(l => { if (!l.w) unmatched.add(l.x); });
      const lead = (leads.find(l => l.w) || {}).w || null; const team = leads.filter(l => l.w).map(l => l.w.id);
      const stage = NEXT_STAGE[done] || 'concept'; n++;
      const desc = [done ? `آخر مرحلة مكتملة: ${STAGE_AR[done]}` : 'لسه مفيش مرحلة مكتملة', `المسؤول: ${who.join(' و ')}`, hold ? 'الحالة في القائمة: متوقف (On Hold)' : '', 'من قائمة مشاريع 2026'].filter(Boolean).join(' · ');
      const doc = { id: uid(), name, client: '', code: 'OK-' + String(n).padStart(3, '0'), stage, dueDate: null, leadId: lead ? lead.id : null, area: '', team, desc, status: 'active', createdBy: (S.session && S.session.id) || null, leadName: who.join(' & '), importedFrom: 'projects-list-2026' };
      if (hold) { doc.blocked = true; doc.blockLog = [{ at: nowISO(), cause: 'client', note: 'On Hold — قائمة مشاريع 2026', by: (S.session && S.session.id) || null }]; }
      await Store.save('projects', doc); added++;
      try { if (window.stuEnsureBoards) await window.stuEnsureBoards(doc.id); } catch (e) { /* boards are optional */ }
    }
    if (typeof render === 'function') render(false);
    return { added, kept, unmatched: [...unmatched] };
  }
  ACTIONS.oekoImportProjects = async () => { if (!(await confirmDlg(L(`إضافة ${PROJECTS_2026.length} مشروع من قائمة 2026 بمسؤوليها؟ الموجود بنفس الاسم مش هيتكرر.`, `Add the ${PROJECTS_2026.length} projects of the 2026 list with their leads? Existing names are kept.`), L('أضف', 'Add')))) return; const r = await importProjects(); toast(L(`اتضاف ${r.added} — موجود من قبل ${r.kept}${r.unmatched.length ? ` — مش في ملف الفريق: ${r.unmatched.join('، ')}` : ''}`, `${r.added} added — ${r.kept} already there${r.unmatched.length ? ` — not in the team file: ${r.unmatched.join(', ')}` : ''}`)); };
  window.oekoImportProjects = importProjects;
  /* the first admin to open the home with the team in and no projects gets the 2026 list by itself (once per system — flag in settings) */
  let projSeedTried = false;
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => {
    if (projSeedTried || !S.session || typeof isAdmin !== 'function' || !isAdmin() || !(S.route && S.route.view === 'dashboard')) return;
    if (!S.settings || S.settings.oekoProjectsSeeded) { projSeedTried = true; return; }
    if (typeof sbOn === 'function' && sbOn() && !S.staffReady) return; if (!list('workers').length || list('projects').length) return; projSeedTried = true;
    setTimeout(async () => { try { const r = await importProjects(); if (typeof Store.saveSettings === 'function') await Store.saveSettings({ oekoProjectsSeeded: true }); if (r.added) toast(L(`اتضاف ${r.added} مشروع من قائمة 2026`, `${r.added} projects added from the 2026 list`)); } catch (e) { console.warn('oeko projects seed', e); } }, 1800);
  });

  /* ---------------------------------------------------------------- settings: the Ökoplan tab */
  if (typeof EXTRA_SETTINGS === 'object') EXTRA_SETTINGS.oekoplan = { label: 'أوكوبلان — المكتب', render: () => {
    const w = list('workers').filter(x => x.status !== 'inactive'); const have = new Set(w.map(x => String(x.phone || '').replace(/\D/g, '')));
    const missing = TEAM.filter(r => !have.has(String(r[4]).replace(/\D/g, ''))).length; const pend = w.filter(x => x.deptPending).length;
    const dn = id => { const d = DEPTS.find(x => x.id === id); return d ? L(d.name, d.en) : id; };
    return `<div class="card"><h3>${L('مكتب أوكوبلان', 'The Ökoplan office')}</h3>
      <div class="grid2">
        <div><b>${L('الشركة', 'Company')}</b><div class="small">${esc(OEKO_DEFAULTS.legal.company)}</div><div class="small muted">${esc(OEKO_DEFAULTS.legal.address)}</div></div>
        <div><b>${L('اللائحة', 'Regulation')}</b><div class="small">${L('لائحة العمل والجزاءات (قانون 12/2003) — مطبّقة على الورديات والإجازات والسياسة', 'Work & penalties regulation (Law 12/2003) — applied to shifts, leave and policy')}</div><button type="button" class="btn ghost" style="margin-top:6px" data-action="regApply">${L('إعادة تطبيق بنود اللائحة', 'Re-apply the regulation')}</button></div>
      </div></div>
      <div class="card"><h3>${L('الأقسام والأدوار', 'Departments and roles')}</h3>
      <div class="oko-team">${DEPTS.map(d => `<div class="p"><i>${esc(L(d.name, d.en)).slice(0, 2)}</i><div><b>${esc(L(d.name, d.en))}</b><small>${w.filter(x => x.deptId === d.id).length} ${L('شخص', 'people')}</small></div></div>`).join('')}</div>
      <p class="small muted" style="margin-top:10px">${L('الشريك / رئيس القسم يعتمد إجازات وأذونات فريقه نهائيًا؛ السلف: رئيس القسم ثم مدير المكتب. صاحب المكتب يرى كل شيء.', 'The partner / department head gives the final approval on the team\'s leave and permissions; advances: head then office manager. The owner sees everything.')}</p></div>
      <div class="card"><h3>${L('فريق أوكوبلان', 'The Ökoplan team')}</h3>
      <p class="small">${L(`ملف الفريق فيه ${TEAM.length} شخص — ${missing ? `${missing} لسه ماتضافوش` : 'كلهم متضافين'}${pend ? ` · ${pend} قسمهم مستني تأكيد` : ''}.`, `The team file has ${TEAM.length} people — ${missing ? `${missing} not added yet` : 'all added'}${pend ? ` · ${pend} with the department to confirm` : ''}.`)}</p>
      ${missing ? `<button type="button" class="btn" data-action="oekoImportTeam">${icon('plus')} ${L('إضافة الفريق من الملف', 'Add the team from the file')}</button>` : ''}
      <p class="small" style="margin-top:12px">${L(`قائمة مشاريع 2026 فيها ${PROJECTS_2026.length} مشروع بمسؤوليها — الموجود منهم في «المشاريع»: ${PROJECTS_2026.filter(([nm]) => list('projects').some(p => String(p.name || '').toLowerCase().replace(/[^a-z0-9]/g, '') === nm.toLowerCase().replace(/[^a-z0-9]/g, ''))).length}.`, `The 2026 projects list has ${PROJECTS_2026.length} projects with their leads — already in «Projects»: ${PROJECTS_2026.filter(([nm]) => list('projects').some(p => String(p.name || '').toLowerCase().replace(/[^a-z0-9]/g, '') === nm.toLowerCase().replace(/[^a-z0-9]/g, ''))).length}.`)}</p>
      <button type="button" class="btn" data-action="oekoImportProjects">${icon('plus')} ${L('إضافة مشاريع 2026 من القائمة', 'Add the 2026 projects from the list')}</button>
      <p class="small" style="margin-top:12px">${L('مشروع تجريبي للشرح', 'Demo project for training')} — ${L('مشروع كامل بمراحله وخطواته ومخرجاته ولوحة مهامه، علشان تشرح للفريق إزاي الدنيا بتمشي.', 'a complete project with its stages, steps, deliverables and task board, to walk the team through how things run.')}</p>
      ${list('projects').some(p => p.code === 'OK-DEMO') ? `<button type="button" class="btn" data-action="oekoDemo">${icon('layers')} ${L('افتح المشروع التجريبي', 'Open the demo project')}</button> <button type="button" class="btn ghost" data-action="oekoDemoDelete">${L('حذف المشروع التجريبي', 'Delete the demo project')}</button>` : `<button type="button" class="btn p" data-action="oekoDemo">${icon('plus')} ${L('إنشاء مشروع تجريبي', 'Create the demo project')}</button>`}
      <div class="oko-team" style="margin-top:12px">${Object.keys(TEAMS).map(t => `<div class="p"><i>${esc(t.replace(/^Team /, '').slice(0, 2))}</i><div><b>${esc(t)}</b><small>${TEAMS[t].length ? TEAMS[t].slice(0, 3).join(' · ') + (TEAMS[t].length > 3 ? ' …' : '') : L('الأعضاء يتحددوا من الشاشة', 'members assigned from the screen')}</small></div></div>`).join('')}</div></div>
      <div class="card"><h3>${L('الحضور حسب نمط العمل', 'Attendance by work mode')}</h3>
      <table class="tbl"><thead><tr><th>${L('النمط', 'Mode')}</th><th>${L('البصمة', 'Punch')}</th><th>${L('المواعيد', 'Hours')}</th></tr></thead><tbody>
        <tr><td>${L('دوام كامل من المكتب', 'Full time at the office')}</td><td>${L('QR من كمبيوتر المكتب', 'QR on the office computer')}</td><td>${L('حضور 8:00–11:00، انصراف بعد 8.5 ساعة', 'Arrive 08:00–11:00, leave after 8.5 h')}</td></tr>
        <tr><td>${L('من البيت', 'From home')}</td><td>${L('من التطبيق بالموقع + سيلفي', 'From the app with location + selfie')}</td><td>${L('نفس ساعات المكتب', 'Same office hours')}</td></tr>
        <tr><td>${L('هايبرد', 'Hybrid')}</td><td>${L('QR في أيام المكتب، التطبيق في أيام البيت', 'QR on office days, the app on home days')}</td><td>${L('نفس ساعات المكتب', 'Same office hours')}</td></tr>
        <tr><td>${L('بارت تايم', 'Part time')}</td><td>${L('مكتب (QR) أو بيت (التطبيق)', 'Office (QR) or home (app)')}</td><td>${L('4 ساعات', '4 hours')}</td></tr>
        <tr><td>${L('الإشراف على التنفيذ', 'Site supervision')}</td><td>${L('من موقع المشروع المسجّل على الخريطة', 'At the project site registered on the map')}</td><td>${L('9:00–5:00 · 6 أيام، أو 12 يوم + 3 راحة خارج القاهرة الكبرى · إضافي ×1.5', '09:00–17:00 · 6 days, or 12 on + 3 off outside Greater Cairo · OT ×1.5')}</td></tr>
      </tbody></table></div>`;
  } };


  /* ---------------------------------------------------------------- language: the add-on's Arabic ↔ English (the page pack covers the engine) */
  const OEKO_I18N = {
    'معرض المشاريع': 'Projects Gallery', 'المعرض': 'Gallery', 'من معرض المشاريع': 'From the projects gallery', 'عن المكتب': 'About the office', 'البروفايل': 'The profile', 'مشاريع المكتب': 'The office\'s projects', 'إضافة مشروع': 'Add project',
    'صاحب المكتب': 'Office owner', 'مدير التصميم — Landscape Design Manager': 'Landscape Design Manager', 'مدير المكتب — الشؤون الإدارية والموارد البشرية': 'Office Manager — Admin & HR', 'الحسابات': 'Accounts',
    'شريك / رئيس قسم — Associate Partner': 'Associate Partner — Head of Department', 'مهندس — Landscape Architect': 'Landscape Architect', 'موظف — بوابة الموبايل': 'Employee — mobile portal', 'مشاهد': 'Viewer', 'كشك الحضور': 'Attendance kiosk',
    'صاحب المكتب (د. طارق صبحي): يرى كل شيء ويعتمد نهائيًا — المشاريع، الفريق، الحضور، الإجازات، المرتبات، العملاء وعروض الأسعار.': 'Office owner (Dr. Tarek Sobhy): sees everything and gives the final approval — projects, team, attendance, leave, payroll, clients and fee proposals.',
    'الشريك / رئيس القسم: يدير قسمه وفرقه — يوزّع المهام ويتابع المشاريع ويعتمد إجازات وأذونات وبصمات فريقه (الاعتماد النهائي).': 'Associate partner / head of department: runs the department and its teams — assigns tasks, follows projects and gives the final approval on the team\'s leave, permissions and punches.',
    'مدير التصميم: يتابع كل مشاريع التصميم ومراحلها والمهام والفريق والحضور — بدون أرقام مالية.': 'Design manager: follows every design project and stage, tasks, team and attendance — no financial figures.',
    'مدير المكتب: الفريق والحضور والجزاءات والإجازات والمرتبات والمصروفات والشؤون الإدارية.': 'Office manager: team, attendance, penalties, leave, payroll, expenses and administration.',
    'المهندس: مشاريعه ومهامه وبوردات التصميم وبصمته وطلباته.': 'Engineer: own projects, tasks, design boards, punches and requests.', 'موظف: يبصم ويقدّم طلباته من موبايله فقط.': 'Employee: punches and sends requests from the phone only.',
    'المكتب الفني': 'Technical Office', 'استوديو التصميم 1': 'Design Studio 1', 'استوديو التصميم 2': 'Design Studio 2', 'تنسيق أعمال اللاند سكيب': 'Landscape Coordination', 'إدارة المشروعات (PMO)': 'PMO', 'تطوير الأعمال': 'Business Development', 'الإشراف على التنفيذ': 'Site Supervision', 'إدارة المكتب': 'Office Management', 'الحسابات والموارد البشرية': 'Accounts & HR',
    'المشاريع ومراحلها': 'Projects & stages', 'فريق المكتب': 'Office team', 'مواقع البصمة (المكتب والمشاريع)': 'Punch locations (office & sites)', 'التقييم ربع السنوي': 'Quarterly appraisal', 'الهيكل التنظيمي': 'Org chart', 'مواقع البصمة': 'Punch locations',
    'راتب شهري': 'Monthly salary', 'يومية': 'Daily wage', 'بارت تايم': 'Part time',
    'تلقائي — المكتب، ومواقع المشاريع لمهندسي الإشراف': 'Automatic — the office, and project sites for supervision engineers', 'المكتب فقط (QR)': 'Office only (QR)', 'مواقع المشاريع المخصصة له فقط (الإشراف على التنفيذ)': 'Assigned project sites only (site supervision)', 'المكتب أو مواقع المشاريع': 'Office or project sites', 'بدون قيد موقع (من البيت)': 'No location limit (from home)',
    'أوكوبلان — المكتب': 'Ökoplan — the office', 'دوام كامل من المكتب': 'Full time at the office', 'من البيت': 'From home', 'هايبرد': 'Hybrid', 'بارت تايم من المكتب': 'Part time at the office', 'بارت تايم من البيت': 'Part time from home',
    'رقم الموبايل ناقص رقم — يُراجع': 'Mobile number is one digit short — to check', 'رقم الموبايل فيه رقم زيادة — يُراجع': 'Mobile number has an extra digit — to check', 'إجازة وضع': 'Maternity leave', 'تخرج': 'Graduated',
    'لائحة العمل والنظام الأساسي ولائحة الجزاءات — شركة أوكوبلان لتنسيق المواقع': 'Work regulation, basic statute and disciplinary code — Ökoplan Landscaping',
    'شركة أوكوبلان لتنسيق المواقع (ÖKOPLAN Landscaping)': 'Ökoplan Landscaping Co. (ÖKOPLAN)', 'مساكن شيراتون — هليوبوليس — مصر الجديدة — القاهرة': 'Sheraton Residences — Heliopolis — Cairo', 'تصميم لاند سكيب · استشارات · إشراف على التنفيذ': 'Landscape design · consulting · site supervision',
    'د. طارق صبحي': 'Dr. Tarek Sobhy',
  };
  /* shifts, leave types and the regulation: line by line */
  SHIFTS.forEach(sh => { OEKO_I18N[sh.name] = sh.en; });
  const LEAVE_EN = { annual: 'Annual leave — 21 days after one year of service (30 after 10 years or past 50)', casual: 'Casual leave — 6 separate days a year from the annual balance', sick: 'Sick leave (medical certificate)', maternity: 'Maternity leave — 120 days at full pay (up to 3 times)', marriage: 'Marriage leave — 5 days', bereave: 'Bereavement leave (first-degree relative) — 3 days', newborn: 'Newborn leave — 1 day', hajj: 'Hajj leave — one month after 5 years of service', unpaid: 'Unpaid leave', mission: 'Work errand / site visit' };
  LEAVES.forEach(l => { if (LEAVE_EN[l.id]) OEKO_I18N[l.name] = LEAVE_EN[l.id]; });
  (() => { const a = REG_AR.split('\n'), e = REG_EN.split('\n'); if (a.length === e.length) a.forEach((ln, i) => { const strip = t => t.replace(/^(## |- )/, ''); OEKO_I18N[ln] = e[i]; OEKO_I18N[strip(ln)] = strip(e[i]); }); })();

  /* ---------------------------------------------------------------- project covers (Projects & stages)
     · one consistent look: every cover is shown in grey (colour on hover); the developer's logo stands in until a photo is chosen
     · anyone who can edit the project sets the picture: upload a photo (kept as a `files` doc → coverFileId, the engine's own field)
       or pick a client logo from the partners list (coverLogo) */
  const PARTNERS = 'l01 l02 l03 l04 l05 l06 l07 l08 l09 l10 l11 l12 l13 l14 l15 l16 l17 l18 l19 l21 l22 l23 l24 l25 l26 l27 l28 l29 l30 l31 l32 l33 l34 l35 l37 l38 l39 l40 l41 l42 l43 l44 l46 l47 l48 l49 l51 l53 l101 l103 l104 l106 l107 l108 l110 l111 l112 l113 l115 l116'.split(' ');
  /* developer per project (the office's 2026 list; checked on the web, Oct 2026) — a partner logo when we have the file, else the developer's name */
  const DEV = { tatweer: ['l01', 'Tatweer Misr'], lmd: ['l104', 'LMD'], mv: ['l34', 'Mountain View'], qamzi: ['l35', 'Al Qamzi Developments'], mangroovy: ['l33', 'Mangroovy'], skywalk: ['l18', 'Skywalk'], sodic: ['l10', 'SODIC'], sabbour: ['l21', 'Al Ahly Sabbour'],
    atric: ['', 'Atric Developments'], riyadh: ['', 'Al Riyadh Misr'], igi: ['', 'IGI Developments'], shurooq: ['', 'Shurooq'], dubaidev: ['', 'Dubai Developments'], lud: ['', 'LUD'], mda: ['', 'MDA Developments'], misritalia: ['', 'Misr Italia Properties'], hassanallam: ['', 'Hassan Allam Properties'], ezan: ['', 'EZAN Developments'], palmhills: ['', 'Palm Hills Developments'], madaar: ['', 'Madaar Development'], beta: ['', 'Beta Egypt'], jumeirah: ['', 'Jumeirah Egypt'], ndev: ['', 'N Developments'], ilcazar: ['', 'Il Cazar Developments'], marq: ['', 'The Marq Communities'], landmark: ['', 'Landmark Sabbour'], somabay: ['', 'Somabay'], citystars: ['', 'City Stars Properties'], cred: ['', 'Cred'], mostakbal: ['', 'El Mostakbal for Urban Development'], regent: ['', 'Regent Hotels & Resorts'] };
  const DEV_OF = { 'D-Bay': 'tatweer', 'Salt': 'tatweer', 'Bloomfields Phase 1': 'tatweer', 'Bloomfields Phase 2': 'tatweer', 'Rivers': 'tatweer', 'Fouka-Bay Phase 4': 'tatweer', 'IL MONTE GALALA Phase 2': 'tatweer',
    'STEI8HT RESIDENTIAL': 'lmd', 'STEI8HT COMMERCIAL': 'lmd', 'One Ninety': 'lmd', 'LMD roundabout': 'lmd', 'Icity': 'mv', 'El-Qamzy Eastshire': 'qamzi', 'Seazen': 'qamzi', 'Mangroovy': 'mangroovy', 'Skywalk': 'skywalk', 'Skywalk Oasis': 'skywalk', 'Estates club house - Sodic': 'sodic', 'Masaya': 'sabbour',
    'Boardwalk': 'atric', 'Peerage Residence': 'riyadh', 'South Of Gardenia Compound': 'igi', 'AJWAN': 'shurooq', 'LUMIA': 'dubaidev', 'The Rift': 'lud', 'Raville': 'mda', 'Raville 77': 'mda', 'IL BOSCO': 'misritalia', 'SOLARE': 'misritalia', 'SWAN LAKE PARCEL 5': 'hassanallam', 'MEDIAN': 'ezan', 'Palm Hills New Cairo': 'palmhills', 'Azha': 'madaar', 'Beta Egypt': 'beta', 'BETA': 'beta', 'Naia West': 'jumeirah', 'Naia Bay': 'jumeirah', 'Nest': 'ndev', 'Creek Town': 'ilcazar', 'The Marq': 'marq', 'Zoya- North coast': 'landmark', 'Mesca Residence': 'somabay', 'City Stars': 'citystars', 'Ever Roundabout': 'cred', 'EL MOSTAKBAL CITY': 'mostakbal', 'Mostakbal city': 'mostakbal', 'Regent Hotel - Jeddah': 'regent' };
  const devOf = p => { if (!p) return null; if (p.coverLogo) return [p.coverLogo, '']; const k = DEV_OF[String(p.name || '').trim()]; return k ? DEV[k] : null; };
  const logoSrc = k => BASE + '_src/partners/' + k + '.png';
  const coverLogo = p => { const d = devOf(p); return d && d[0] ? d[0] : ''; };
  document.head.insertAdjacentHTML('beforeend', `<style id="oeko-cover">
.spcard .cov img,.sphead .cov img{filter:grayscale(1);opacity:.9;transition:filter .25s,opacity .25s}
.spcard:hover .cov img,.sphead:hover .cov img{filter:none;opacity:1}
.spcard .cov.oklogo,.sphead .cov.oklogo{background:#e9eef0!important}
html[data-theme="dark"] .spcard .cov.oklogo,html[data-theme="dark"] .sphead .cov.oklogo{background:#d7dde0!important}
.spcard .cov.oklogo img,.sphead .cov.oklogo img{object-fit:contain!important;padding:14%;box-sizing:border-box;filter:grayscale(1) contrast(.9);opacity:.85;mix-blend-mode:multiply}
.spcard:hover .cov.oklogo img{filter:none;opacity:1}
.spcard .cov.okmark{background:linear-gradient(135deg,var(--surface-2),var(--surface-3))!important}
.spcard .cov.okmark img,.sphead .cov.okmark img{width:34%!important;height:auto!important;object-fit:contain!important;filter:grayscale(1);opacity:.35}
.spcard .cov.okdev,.sphead .cov.okdev{background:#e9eef0!important;color:#5c6b72!important;padding:12%}
html[data-theme="dark"] .spcard .cov.okdev,html[data-theme="dark"] .sphead .cov.okdev{background:#d7dde0!important}
.okdevnm{font-family:Inter,system-ui,sans-serif;font-weight:600;font-size:clamp(13px,1.3vw,19px);letter-spacing:.14em;text-transform:uppercase;text-align:center;line-height:1.35;filter:grayscale(1)}
.sphead .cov.okdev .okdevnm{font-size:13px}
.okcovgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px;max-height:46vh;overflow:auto;padding:2px}
.okcovgrid button{border:1px solid var(--line);border-radius:10px;background:#fff;aspect-ratio:4/3;display:grid;place-items:center;padding:8px;cursor:pointer}
.okcovgrid button img{max-width:100%;max-height:100%;object-fit:contain}
.okcovgrid button.on{outline:2px solid var(--accent)}</style>`);
  const paintCover = (cov, p) => {
    if (!cov || !p) return;
    const img = cov.querySelector('img');
    if (img && !cov.classList.contains('oklogo') && !cov.classList.contains('okmark') && !cov.classList.contains('okdev')) return; // a real photo (engine cover)
    const d = devOf(p); const lg = d && d[0]; const nm = d && !lg ? d[1] : '';
    const want = lg ? logoSrc(lg) : nm ? 'dev:' + nm : IMG.mark; const cls = lg ? 'oklogo' : nm ? 'okdev' : 'okmark';
    if (cov.dataset.okcov === want && cov.classList.contains(cls)) return;
    cov.dataset.okcov = want; cov.classList.remove('oklogo', 'okmark', 'okdev'); cov.classList.add(cls);
    cov.innerHTML = nm ? `<span class="okdevnm">${esc(nm)}</span>` : `<img src="${want}" alt="" decoding="async">`;
  };
  const paintCovers = () => {
    document.querySelectorAll('.spcard[href^="#/projects/"] .cov').forEach(cov => { const id = cov.closest('.spcard').getAttribute('href').slice('#/projects/'.length); paintCover(cov, byId('projects', id)); });
    if (S.route && S.route.view === 'projects' && S.route.id) {
      const p = byId('projects', S.route.id); const head = document.querySelector('.sphead'); if (!p || !head) return;
      paintCover(head.querySelector('.cov'), p);
      if (typeof stuCanEdit === 'function' && stuCanEdit() && !head.querySelector('[data-action="oekoCover"]')) { const ed = head.querySelector('[data-action="stuProjectEdit"]'); if (ed) ed.insertAdjacentHTML('beforebegin', `<button class="btn sm ghost" data-action="oekoCover" data-arg="${p.id}">${typeof icon === 'function' ? icon('image') : ''}${L('صورة المشروع', 'Project picture')}</button>`); }
    }
  };
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(paintCovers);
  const shrink = (src, max) => new Promise((res, rej) => { const im = new Image(); im.onload = () => { const k = Math.min(1, max / Math.max(im.width, im.height)); const c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', 0.8)); }; im.onerror = rej; im.src = src; });
  ACTIONS.oekoCover = id => {
    const p = byId('projects', id); if (!p || !(typeof stuCanEdit === 'function' && stuCanEdit())) return;
    const cur = coverLogo(p);
    openModal({
      title: L('صورة المشروع', 'Project picture'),
      body: `<div class="form"><div class="field full"><label>${L('صورة من الجهاز', 'A photo from this device')}</label><input type="file" id="okcov-file" accept="image/*"><div class="tiny muted" style="margin-top:4px">${L('بتتحفظ بحجم مناسب للكروت وبتظهر بالرمادي زي باقي المشاريع.', 'Stored at card size and shown in grey like the other projects.')}</div></div>
        <div class="field full"><label>${L('أو لوجو الجهة صاحبة المشروع', "Or the project owner's logo")}</label><div class="okcovgrid">${PARTNERS.map(k => `<button type="button" data-logo="${k}" class="${k === cur ? 'on' : ''}"><img src="${logoSrc(k)}" alt=""></button>`).join('')}</div></div></div>`,
      footer: `<button type="button" class="btn ghost" data-action="closemodal">${L('إلغاء', 'Cancel')}</button>${(p.coverFileId || p.coverLogo) ? `<button type="button" class="btn ghost" id="okcov-clear">${L('إزالة الصورة', 'Remove picture')}</button>` : ''}`,
      onOpen: m => {
        m.querySelector('#okcov-file').addEventListener('change', async ev => { const f = ev.target.files[0]; if (!f) return; try { const url = await shrink(await fileToDataURL(f), 900); const fid = uid(); await Store.save('files', { id: fid, name: `${p.code || p.name} — cover.jpg`, kind: 'photo', mime: 'image/jpeg', size: 0, projectId: p.id, ownerKind: 'project', ownerId: p.id, thumb: url, note: L('صورة المشروع', 'Project picture'), at: new Date().toISOString() }); await Store.update('projects', p.id, { coverFileId: fid, coverLogo: '' }); closeModal(); toast(L('اتحفظت ✓', 'Saved ✓')); render(); } catch (e) { toast(L('الصورة ماتقريتش', 'Could not read the picture'), 'err'); } });
        m.querySelectorAll('[data-logo]').forEach(b => b.addEventListener('click', async () => { await Store.update('projects', p.id, { coverLogo: b.dataset.logo, coverFileId: null }); closeModal(); render(); }));
        const cl = m.querySelector('#okcov-clear'); if (cl) cl.addEventListener('click', async () => { await Store.update('projects', p.id, { coverLogo: '', coverFileId: null }); closeModal(); render(); });
      },
    });
  };
  Object.assign(OEKO_I18N, { 'صورة المشروع': 'Project picture', 'صورة من الجهاز': 'A photo from this device', 'أو لوجو الجهة صاحبة المشروع': "Or the project owner's logo", 'إزالة الصورة': 'Remove picture' });

  /* ---------------------------------------------------------------- «Project operations» panel: the landscape stages, not the ArchViz ones
     · the status strip = the office's stages (same ids as the project stage, so both stay in step) + handover + closed
     · the shot gates become deliverable gates (ids kept: the engine's logic reads them)
     · wording: shots → deliverables, Artist → responsible, Art Director → design manager */
  if (Array.isArray(window.OS_STATUSES)) {
    const list = PIPELINE.map(st => ({ id: st.id, en: st.name, ar: st.ar })).concat([{ id: 'closed', en: 'Closed', ar: 'اتقفل' }]);
    OS_STATUSES.length = 0; list.forEach(x => OS_STATUSES.push(x));
  }
  if (Array.isArray(window.OS_GATES)) {
    const g = [{ id: 'comp', en: 'Drafting', ar: 'الرسم' }, { id: 'light', en: 'Team Lead Review', ar: 'مراجعة التيم ليدر' }, { id: 'detail', en: 'Design Manager Review', ar: 'مراجعة مدير التصميم' }, { id: 'post', en: 'Issued', ar: 'إصدار' }];
    OS_GATES.length = 0; g.forEach(x => OS_GATES.push(x));
  }
  /* the stage chip and the operations status move together */
  if (ACTIONS.osStatus) ACTIONS.osStatus = (base => async function (arg) { const r = await base.apply(this, arguments); try { const [pid, st] = String(arg).split(':'); const p = byId('projects', pid); if (p && p.osStatus === st && STAGES.some(x => x.id === st) && p.stage !== st) await Store.update('projects', pid, { stage: st }); } catch (e) { /* ignore */ } return r; })(ACTIONS.osStatus);
  /* once: projects imported with a stage but no operations status start at that stage */
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => {
    try {
      if (!S.session || role() !== 'admin' || !(S.settings && S.settings.oekoProjectsSeeded) || (S.settings && S.settings.oekoOsSynced) || window.__okOsSync) return;
      const ps = list('projects').filter(p => p.stage && (!p.osStatus || p.osStatus === 'data') && p.stage !== p.osStatus); if (!ps.length) return; window.__okOsSync = 1;
      (async () => { for (const p of ps) await Store.update('projects', p.id, { osStatus: p.stage, flow: p.flow || 'os' }); await Store.saveSettings(Object.assign({}, S.settings, { oekoOsSynced: true })); })().catch(() => { });
    } catch (e) { /* ignore */ }
  });
  const OS_WORDS = [['Deliverables schedule — Deliverables', 'Deliverables schedule'], ['Master Schedule — Shots', 'Deliverables schedule'], ['الـMaster Schedule — اللقطات', 'جدول التسليمات'], ['لقطات', 'مخرجات'], ['Master Schedule — shots', 'Deliverables schedule'], ['Master Schedule', 'جدول التسليمات'], ['اللقطات', 'المخرجات'], ['اللقطة', 'المخرج'], ['لقطة جديدة', 'مخرج جديد'], ['لقطة', 'مخرج'], ['Shots', 'Deliverables'], ['shots', 'deliverables'], ['shot', 'deliverable'], ['Artist', 'المسؤول'], ['Project Owner', 'Project Manager'], ['الآرت دايركتور', 'مدير التصميم'], ['Art Director', 'Design Manager'], ['الـOwner والموعد', 'المدير والموعد'], ['Owner & deadline', 'Manager & deadline'], ['Owner:', 'PM:'], ['Composition → Lighting → Detailing + AI → Final Post', 'Drafting → Team lead review → Design manager review → Issued'], ['الكومبوزيشن → الإضاءة → التفاصيل + AI → البوست النهائي', 'الرسم → مراجعة التيم ليدر → مراجعة مدير التصميم → الإصدار'], ['تشغيل المشروع', 'إدارة المشروع'], ['(مرحلة Render)', '(مرحلة الرسومات التنفيذية)'], ['(Render stage)', '(construction documents stage)'], ['مرحلة Render', 'مرحلة الرسومات التنفيذية'], ['Render stage', 'construction documents stage']];
  const OS_HINT_AR = 'ضيف مخرجات المشروع (لوحات · تقارير · مقايسات): كل مخرج بيعدي الرسم ← مراجعة التيم ليدر ← مراجعة مدير التصميم ← الإصدار، وكل مرحلة محتاجة اعتماد.', OS_HINT_EN = 'Add the project deliverables (drawings · reports · BOQs): each one goes Drafting → Team lead review → Design manager review → Issued, and every gate needs approval.';
  const osWord = h => { if (typeof h !== 'string') return h; h = h.replace(/ضيف لقطات المشروع[^<]{0,200}?اعتماد\./g, () => en() ? OS_HINT_EN : OS_HINT_AR).replace(/Add the project shots[^<]{0,200}?approval\./g, () => en() ? OS_HINT_EN : OS_HINT_AR).replace(/(اللقطات|المخرجات)\s+\S+\s+لمهام[^<]{0,200}?\)\./g, () => en() ? 'The deliverables moved to the project tasks — tracking and approvals now happen on the task board (construction documents stage).' : 'المخرجات اتنقلت لمهام المشروع — المتابعة والاعتمادات بقت من لوحة المهام (مرحلة الرسومات التنفيذية).'); OS_WORDS.forEach(([a, b]) => { h = h.split(a).join(b); }); return h; };
  if (typeof vProjects === 'function') vProjects = (base => function () { const h = base.apply(this, arguments); return S.route && S.route.id ? osWord(h) : h; })(vProjects);
  if (EXTRA_TITLES && EXTRA_TITLES.projects) EXTRA_TITLES.projects = (base => function () { const t = base.apply(this, arguments); if (t && t.sub) t.sub = osWord(t.sub); return t; })(EXTRA_TITLES.projects);
  Object.assign(OEKO_I18N, { 'استلام الداتا ورفع الموقع': 'Site Survey & Data', 'التسليم': 'Handover', 'الرسم': 'Drafting', 'مراجعة التيم ليدر': 'Team Lead Review', 'مراجعة مدير التصميم': 'Design Manager Review', 'إصدار': 'Issued', 'جدول التسليمات': 'Deliverables schedule', 'المخرجات': 'Deliverables', 'المخرج': 'Deliverable', 'مخرج': 'Deliverable', 'مخرج جديد': 'New deliverable', 'المسؤول': 'Responsible', 'المدير والموعد': 'Manager & deadline', 'إدارة المشروع': 'Project operations' });
  Object.assign(OEKO_I18N, { 'لاند سكيب — تصميم كامل': 'Landscape — Full design', 'من رفع الموقع والكونسبت لحد مستندات الطرح والإشراف — مراحل المكتب السبعة.': "From site survey and concept to tender documents and supervision — the office's seven stages.", 'لاند سكيب — كونسبت وتمهيدي': 'Landscape — Concept & schematic', 'رفع الموقع، الكونسبت والتصميم التمهيدي لحد اعتماد العميل.': 'Site survey, concept and schematic design up to client approval.', 'لاند سكيب — رسومات تنفيذية ومستندات طرح': 'Landscape — Tender package', 'تطوير التصميم، الرسومات التنفيذية (هارد سكيب · سوفت سكيب · ري · إضاءة) والمقايسة.': 'Design development, detailed drawings (hardscape · softscape · irrigation · lighting) and the BOQ.', 'إشراف على التنفيذ': 'Site supervision', 'اعتماد الشوب دروينج والعينات، زيارات الموقع والتقارير، واستلام الزراعة.': 'Shop drawing and sample approvals, site visits and reports, planting handover.', 'ميدان / شارع': 'Roundabout / street', 'مشروع صغير سريع: رفع، كونسبت، رسومات تنفيذية وإشراف.': 'A small fast project: survey, concept, detailed drawings and supervision.' });

  /* ---------------------------------------------------------------- the stage steps on the project page (checklist per stage, approval gate) */
  document.head.insertAdjacentHTML('beforeend', `<style id="oeko-pipe">
.okpipe{margin-top:14px;border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:var(--surface)}
.okpipe .okph{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px}.okpipe .okph b{font-size:14px}.okpipe .okph .okn{font-variant-numeric:tabular-nums;font-weight:700;color:var(--accent)}.okpipe .okph small{color:var(--muted)}
.okpipe .okbar{height:6px;border-radius:999px;background:var(--line);overflow:hidden;margin:4px 0 10px}.okpipe .okbar i{display:block;height:100%;background:var(--accent);border-radius:999px;transition:width .3s}
.okstep{display:flex;gap:10px;align-items:flex-start;padding:7px 4px;border-top:1px solid var(--line);font-size:13.5px;cursor:pointer}.okstep:first-of-type{border-top:0}.okstep input{margin-top:3px;accent-color:var(--accent)}.okstep.done span{color:var(--muted);text-decoration:line-through}
.okpipe details{margin-top:10px}.okpipe summary{cursor:pointer;color:var(--muted);font-size:12.5px}.okpipe .okall{display:grid;gap:8px;margin-top:8px}.okpipe .okall>div{border:1px solid var(--line);border-radius:10px;padding:8px 10px;font-size:12.5px}.okpipe .okall b{display:block;margin-bottom:2px}.okpipe .okall .ok{color:var(--good-ink,#3f7a12)}.okpipe .okall small{color:var(--muted)}
.okgate{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:999px;padding:2px 10px;font-size:12px;color:var(--muted)}</style>`);
  const stepsDone = (p, id) => Array.isArray((p.okSteps || {})[id]) ? p.okSteps[id] : [];
  const stageOf = p => PIPELINE.find(st => st.id === (p.osStatus || p.stage)) || PIPELINE[0];
  const pipeHTML = p => {
    const st = stageOf(p); const done = stepsDone(p, st.id); const can = typeof stuCanEdit === 'function' && stuCanEdit();
    const row = (it, i) => `<label class="okstep ${done.includes(i) ? 'done' : ''}"><input type="checkbox" data-okstep="${p.id}:${st.id}:${i}" ${done.includes(i) ? 'checked' : ''} ${can ? '' : 'disabled'}><span>${esc(L(it[0], it[1]))}</span></label>`;
    const all = PIPELINE.map(x => { const d = stepsDone(p, x.id).length, n = x.items.length; return `<div><b>${esc(L(x.ar, x.name))} <small>· ${x.riba}</small> <span class="${d === n ? 'ok' : ''}" style="float:inline-end">${d}/${n}</span></b><small>${esc(L('الاعتماد', 'Gate'))}: ${esc(L(x.gate[0], x.gate[1]))}</small></div>`; }).join('');
    return `<div class="okpipe"><div class="okph"><b>${esc(L('خطوات المرحلة', 'Stage steps'))} — ${esc(L(st.ar, st.name))}</b><span class="okn">${done.length}/${st.items.length}</span><small>${st.riba}</small><div class="grow"></div><span class="okgate">${esc(L('الاعتماد', 'Approval gate'))}: ${esc(L(st.gate[0], st.gate[1]))}</span></div>
      <div class="okbar"><i style="width:${Math.round(done.length / st.items.length * 100)}%"></i></div>${st.items.map(row).join('')}
      <details><summary>${esc(L('كل مراحل المشروع السبعة', 'All seven project stages'))}</summary><div class="okall">${all}</div></details></div>`;
  };
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => {
    if (!(S.route && S.route.view === 'projects' && S.route.id)) return; const p = byId('projects', S.route.id); if (!p) return;
    const flow = document.querySelector('.osp .osflow'); if (!flow || flow.parentElement.querySelector('.okpipe')) return;
    flow.insertAdjacentHTML('afterend', pipeHTML(p));
  });
  document.addEventListener('change', async ev => {
    const el = ev.target.closest && ev.target.closest('[data-okstep]'); if (!el) return;
    const [pid, sid, idx] = el.dataset.okstep.split(':'); const p = byId('projects', pid); if (!p || !(typeof stuCanEdit === 'function' && stuCanEdit())) return;
    const cur = new Set(stepsDone(p, sid)); if (el.checked) cur.add(+idx); else cur.delete(+idx);
    const okSteps = Object.assign({}, p.okSteps || {}, { [sid]: Array.from(cur).sort((a, b) => a - b) });
    const log = (p.okLog || []).concat([{ at: nowISO(), by: S.session && S.session.id, stage: sid, step: +idx, on: !!el.checked }]).slice(-200);
    await Store.update('projects', pid, { okSteps, okLog: log });
  });

  /* ---------------------------------------------------------------- a demo project to explain the system (stages · steps · deliverables · task board) */
  const DEMO_NAME = 'مشروع تجريبي — حديقة كمبوند (Demo)';
  const demoProject = () => list('projects').find(p => p.code === 'OK-DEMO');
  ACTIONS.oekoDemo = async () => {
    if (demoProject()) { if (typeof go === 'function') go('projects/' + demoProject().id); return; }
    if (!(await confirmDlg(L('إنشاء مشروع تجريبي كامل (مراحل وخطوات ومخرجات ولوحة مهام) علشان الشرح؟', 'Create a complete demo project (stages, steps, deliverables and a task board) for training?'), L('إنشاء', 'Create')))) return;
    const ws = list('workers').filter(w => w.active !== false); if (!ws.length) { toast(L('ضيف الفريق الأول', 'Add the team first'), 'err'); return; }
    const pick = re => ws.find(w => re.test(w.name || '')) || null;
    const lead = pick(/Samah|سماح/) || ws[0]; const team = [lead, pick(/Asmaa|أسماء/), pick(/Haidy|هايدي/), pick(/Dalia|داليا/), pick(/Maria|ماريا/)].filter(Boolean).filter((w, i, a) => a.indexOf(w) === i).slice(0, 5);
    const tid = team.map(w => w.id); const today = todayISO(); const pid = uid(); const me = S.session && S.session.id;
    const steps = { data: [0, 1, 2, 3, 4, 5], concept: [0, 1, 2, 3, 4, 5], schem: [0, 1, 2, 3, 4, 5, 6], dd: [0, 1, 2] };
    await Store.save('projects', { id: pid, name: DEMO_NAME, code: 'OK-DEMO', client: 'Demo Developer', stage: 'dd', osStatus: 'dd', flow: 'os', camReq: 'opt', ownerId: lead.id, leadId: lead.id, team: tid, area: 42000, dueDate: addDays(today, 75), clientDeadline: addDays(today, 75), okSteps: steps, status: 'active', createdAt: nowISO(),
      desc: L('مشروع للشرح والتدريب: حديقة مركزية لكمبوند سكني 4.2 فدان — بحيرة، ممشى، ملاعب أطفال، مناطق جلوس وزراعة محلية. المشروع في مرحلة تطوير التصميم؛ الكونسبت والتمهيدي معتمدين من العميل.', 'A training project: the central park of a residential compound (4.2 feddan) — lake, promenade, playgrounds, seating and native planting. In Design Development; concept and schematic approved by the client.') });
    try { if (typeof stuEnsureBoards === 'function') await stuEnsureBoards(pid); } catch (e) { /* ignore */ }
    const at = d => new Date(Date.now() + d * 864e5).toISOString();
    const dl = (code, name, assignee, gate, state, extra) => Object.assign({ id: uid(), projectId: pid, code, name, kind: 'still', assigneeId: assignee ? assignee.id : null, gate, state, log: [], createdAt: at(-40), createdBy: me, updatedAt: nowISO() }, extra || {});
    const dls = [
      dl('L-001', L('تقرير تحليل الموقع', 'Site analysis report'), team[1] || lead, 'post', 'done', { doneAt: at(-34) }),
      dl('L-101', L('ماستر بلان الكونسبت', 'Concept master plan'), lead, 'post', 'done', { doneAt: at(-22) }),
      dl('L-201', L('ماستر بلان تمهيدي بالأبعاد', 'Schematic master plan (dimensioned)'), team[2] || lead, 'post', 'done', { doneAt: at(-9) }),
      dl('L-301', L('حزمة تفاصيل الهاردسكيب', 'Hardscape details package'), team[1] || lead, 'detail', 'ad', { submittedAt: at(-2), ok1At: at(-1), due: addDays(today, 6) }),
      dl('L-302', L('مخطط الزراعة وجداول النباتات', 'Planting plan & plant schedule'), team[3] || lead, 'light', 'owner', { submittedAt: at(-0.3), due: addDays(today, 9) }),
      dl('L-303', L('تصميم الري التفصيلي', 'Detailed irrigation design'), team[4] || team[0], 'comp', 'work', { due: addDays(today, 14) }),
    ];
    for (const d of dls) await Store.save('shots', d);
    const tasks = [
      [L('تنسيق مناسيب الممشى مع المعماري', 'Coordinate promenade levels with the architect'), lead, 'doing', 3, 'high'],
      [L('اعتماد عينات بلاط الهاردسكيب من العميل', 'Client approval of hardscape paving samples'), team[1] || lead, 'open', 7, 'normal'],
      [L('حساب الاحتياج المائي للبحيرة والري', 'Water demand calculation (lake + irrigation)'), team[4] || team[0], 'open', 10, 'normal'],
    ];
    for (const [title, w, status, due, pri] of tasks) await Store.save('tasks', { id: uid(), title, projectId: pid, assigneeId: w.id, status, dueDate: addDays(today, due), priority: pri, kind: 'task', createdBy: me, createdAt: nowISO() });
    try {
      if (typeof pmBuildBoard === 'function') {
        await pmBuildBoard(pid, 'full', { start: addDays(today, -45), allowed: 2 });
        const ts = list('pmtasks').filter(t => t.boardId === pid).sort((a, b) => String(a.start).localeCompare(String(b.start)));
        for (let i = 0; i < ts.length; i++) { try { await Store.save('pmtasks', Object.assign({}, ts[i], { owner: tid[i % tid.length] }), { silent: true }); } catch (e) { /* ignore */ } }
        for (const t of ts.slice(0, 14)) { try { await pmSetStatus(t.id, 'done'); } catch (e) { /* ignore */ } }
        for (const t of ts.slice(14, 16)) { try { await pmSetStatus(t.id, 'work'); } catch (e) { /* ignore */ } }
      }
    } catch (e) { console.warn('demo board', e); }
    toast(L('المشروع التجريبي جاهز ✓', 'Demo project ready ✓')); if (typeof go === 'function') go('projects/' + pid); else render();
  };
  ACTIONS.oekoDemoDelete = async () => {
    const p = demoProject(); if (!p) return; if (!(await confirmDlg(L('حذف المشروع التجريبي وكل اللي عليه؟', 'Delete the demo project and everything on it?'), L('حذف', 'Delete')))) return;
    const pid = p.id;
    for (const [col, key] of [['shots', 'projectId'], ['tasks', 'projectId'], ['pmtasks', 'boardId'], ['pmnotifs', 'boardId'], ['bitems', 'projectId'], ['boards', 'projectId']]) for (const d of list(col).filter(x => x[key] === pid)) { try { await Store.remove(col, d.id); } catch (e) { /* ignore */ } }
    for (const col of ['pmboards', 'pmfin']) { if (byId(col, pid)) { try { await Store.remove(col, pid); } catch (e) { /* ignore */ } } }
    try { await Store.remove('projects', pid); } catch (e) { /* ignore */ }
    toast(L('اتمسح', 'Deleted')); if (typeof go === 'function') go('projects'); else render();
  };
  Object.assign(OEKO_I18N, { 'المخرجات انتقلت لمهام المشروع — المتابعة والاعتمادات بقت من لوحة المهام (مرحلة الرسومات التنفيذية).': 'The deliverables moved to the project tasks — tracking and approvals now happen on the task board (construction documents stage).', 'خطوات المرحلة': 'Stage steps', 'الاعتماد': 'Approval gate', 'كل مراحل المشروع السبعة': 'All seven project stages', 'مشروع تجريبي للشرح': 'Demo project for training', 'إنشاء مشروع تجريبي': 'Create the demo project', 'افتح المشروع التجريبي': 'Open the demo project', 'حذف المشروع التجريبي': 'Delete the demo project' });

  /* ---------------------------------------------------------------- the office structure as a live org chart (drag a person onto a new manager; ✕ = out of the chart) */
  document.head.insertAdjacentHTML('beforeend', `<style id="oeko-org">
.okorg{overflow:auto;padding:18px 8px 26px;direction:ltr}
.okorg ul{list-style:none;margin:0;padding:0;display:flex;justify-content:center;align-items:flex-start;position:relative}
.okorg>ul{width:max-content;min-width:100%}
.okorg li{position:relative;padding:22px 7px 0;text-align:center;display:flex;flex-direction:column;align-items:center;margin:0}.okorg li>.okn{flex:none}.okorg li>ul{margin-top:0;padding-top:0}
.okorg li::before,.okorg li::after{content:'';position:absolute;top:0;right:50%;width:50%;height:22px;border-top:1.5px solid var(--line-2,var(--line))}
.okorg li::after{right:auto;left:50%;border-left:1.5px solid var(--line-2,var(--line))}
.okorg li:only-child::before,.okorg li:only-child::after{display:none}.okorg li:only-child{padding-top:0}
.okorg li:first-child::before,.okorg li:last-child::after{border:0}
.okorg li:last-child::before{border-right:1.5px solid var(--line-2,var(--line));border-radius:0 8px 0 0}
.okorg li:first-child::after{border-radius:8px 0 0 0}
.okorg ul ul::before{content:'';position:absolute;top:0;left:50%;width:0;height:22px;border-left:1.5px solid var(--line-2,var(--line))}
.okorg>ul>li{padding-top:0}.okorg>ul>li::before,.okorg>ul>li::after{display:none}
.okn{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:128px;max-width:160px;padding:10px 10px 9px;margin-bottom:14px;border:1px solid var(--line);border-radius:14px;background:var(--surface);position:relative;cursor:grab;transition:box-shadow .15s,transform .15s,border-color .15s;direction:rtl;box-sizing:border-box}
.okn:hover{box-shadow:0 8px 22px -12px rgba(0,0,0,.35);transform:translateY(-1px)}
.okn.over{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.okn.drag{opacity:.45}.okn.root{cursor:default;border-color:transparent;background:linear-gradient(135deg,#70b62e,#38a599 60%,#50b1e7);color:#fff}
.okn.root .okt{color:rgba(255,255,255,.85)}.okn.root .okav{border-color:#fff}
.okn.dept{border-style:dashed;background:transparent;cursor:default;min-width:150px}
.okn .okav{width:44px;height:44px;border-radius:50%;object-fit:cover;background:var(--surface-2);border:2px solid var(--line);display:grid;place-items:center;font-weight:600;font-size:14px;color:var(--muted)}
.okn .okm{font-weight:600;font-size:12.5px;line-height:1.25;color:inherit;text-decoration:none}.okn .okt{font-size:10.5px;line-height:1.3;color:var(--muted);letter-spacing:.02em}
.okn .okx{position:absolute;top:-7px;inset-inline-end:-7px;width:20px;height:20px;border-radius:50%;border:1px solid var(--line);background:var(--surface);color:var(--muted);font-size:12px;line-height:18px;display:none;cursor:pointer}
.okn:hover .okx{display:block}.okn .okx:hover{color:#d9534f;border-color:#d9534f}
.okn .okc{position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);font-size:10px;background:var(--surface-2);border:1px solid var(--line);border-radius:999px;padding:0 6px;color:var(--muted)}
.okorg-bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:6px}.okorg-bar .okpool{display:flex;gap:6px;flex-wrap:wrap}
.okorg-bar .okn{min-width:0;flex-direction:row;padding:5px 10px 5px 6px;gap:8px;border-radius:999px}.okorg-bar .okn .okav{width:26px;height:26px;font-size:11px}.okorg-bar .okn .okt{display:none}
html[data-theme="dark"] .okn{background:var(--surface-2)}
@media (max-width:760px){.okn{min-width:104px;max-width:124px;padding:8px}.okn .okav{width:36px;height:36px}.okn .okm{font-size:11.5px}}</style>`);
  const okOrgCan = () => !!S.session && (typeof writable !== 'function' || writable()) && ['admin', 'hr', 'manager'].includes(typeof role === 'function' ? role() : '');
  const okOrgPhoto = w => { const u = (w && (w.avatar || w.photo)) || (typeof nfPhoto === 'function' ? nfPhoto(w.id) : null); return u; };
  const okIni = n => String(n || '').trim().split(/\s+/).slice(0, 2).map(x => x[0] || '').join('').toUpperCase();
  const okDept = id => { const d = DEPTS.find(x => x.id === id); return d ? L(d.name, d.en) : ''; };
  const okOrgChart = () => {
    const ws = list('workers').filter(w => w.status !== 'inactive' && w.active !== false);
    const byIdW = new Map(ws.map(w => [w.id, w]));
    const kids = new Map(); const seen = new Set();
    /* a person hangs under their manager; a manager chain that loops, or points at nobody, hangs under the owner */
    const rootOf = w => { let x = w, hops = 0; const path = new Set([w.id]); while (x.managerId && byIdW.has(x.managerId) && hops++ < 20) { if (path.has(x.managerId)) return null; x = byIdW.get(x.managerId); path.add(x.id); } return x; };
    ws.forEach(w => { const m = w.managerId && byIdW.has(w.managerId) && !rootOf(w) ? null : (w.managerId && byIdW.has(w.managerId) ? w.managerId : 'owner'); if (w.role === 'manager' && w.managerId && (byIdW.get(w.managerId) || {}).managerId === w.id) { kids.set('owner', (kids.get('owner') || []).concat([w])); return; } kids.set(m || 'owner', (kids.get(m || 'owner') || []).concat([w])); });
    const rank = w => w.role === 'manager' ? 0 : w.role === 'admin' ? 1 : w.role === 'head' ? 2 : w.role === 'hr' ? 3 : 5;
    const sortK = arr => arr.slice().sort((a, b) => rank(a) - rank(b) || String(a.name).localeCompare(String(b.name)));
    const can = okOrgCan();
    const card = (w, depth) => { const ph = okOrgPhoto(w); const n = (kids.get(w.id) || []).length; return `<div class="okn" draggable="${can ? 'true' : 'false'}" data-okp="${w.id}">${can ? `<span class="okx" data-okout="${w.id}" title="${L('شيله من تحت مديره', 'Take out from under this manager')}">✕</span>` : ''}${ph ? `<img class="okav" src="${esc(ph)}" alt="">` : `<span class="okav">${esc(okIni(w.name))}</span>`}<a class="okm" href="#/workers/${w.id}">${esc(w.name)}</a><span class="okt">${esc(w.trade || w.title || '')}${w.deptId ? `<br>${esc(okDept(w.deptId))}` : ''}</span>${n ? `<span class="okc">${n}</span>` : ''}</div>`; };
    const tree = (id, depth) => { if (seen.has(id)) return ''; seen.add(id); const ks = sortK(kids.get(id) || []); if (!ks.length) return ''; if (depth >= 4) return `<ul><li><div class="okn dept"><span class="okt">${ks.length} ${L('أشخاص', 'people')}</span></div></li></ul>`; return `<ul>${ks.map(k => `<li>${card(k, depth)}${tree(k.id, depth + 1)}</li>`).join('')}</ul>`; };
    const ownerName = (S.settings && S.settings.ownerName) || 'د. طارق صبحي'; const ownerPh = typeof nfPhoto === 'function' ? nfPhoto('owner') : null;
    const root = `<div class="okn root" data-okp="owner">${ownerPh ? `<img class="okav" src="${esc(ownerPh)}" alt="">` : `<span class="okav">${esc(okIni(ownerName))}</span>`}<span class="okm">${esc(ownerName)}</span><span class="okt">${L('صاحب المكتب', 'Office owner')}</span></div>`;
    const pool = ws.filter(w => !w.managerId && !['manager', 'head', 'admin', 'hr'].includes(w.role) && (kids.get(w.id) || []).length === 0);
    return `<div class="card"><div class="cardhead"><h3>${L('هيكل Ökoplan Landscaping', 'Ökoplan Landscaping structure')}</h3><span class="muted small">${can ? L('اسحب أي شخص وحطه على مديره الجديد · ✕ تشيله من تحت مديره · الحفظ تلقائي', 'Drag anyone onto their new manager · ✕ takes them out from under their manager · saves automatically') : L('الهيكل حسب المدير المباشر في ملف كل موظف', "The structure follows each person's direct manager")}</span></div>
      ${can && pool.length ? `<div class="okorg-bar"><span class="small muted">${L('من غير مدير مباشر:', 'No direct manager yet:')}</span><div class="okpool">${pool.map(w => `<div class="okn" draggable="true" data-okp="${w.id}">${okOrgPhoto(w) ? `<img class="okav" src="${esc(okOrgPhoto(w))}" alt="">` : `<span class="okav">${esc(okIni(w.name))}</span>`}<a class="okm" href="#/workers/${w.id}">${esc(w.name)}</a></div>`).join('')}</div></div>` : ''}
      <div class="okorg"><ul><li>${root}${(() => { seen.add('owner'); const ks = sortK((kids.get('owner') || []).filter(w => !pool.includes(w))); return ks.length ? `<ul>${ks.map(k => `<li>${card(k, 1)}${tree(k.id, 2)}</li>`).join('')}</ul>` : ''; })()}</li></ul></div></div>`;
  };
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => { const org = document.querySelector('.okorg'); const root = org && org.querySelector('.okn.root'); if (!org || !root || org.dataset.okc) return; org.dataset.okc = 1; const r = root.getBoundingClientRect(), o = org.getBoundingClientRect(); org.scrollLeft += (r.left + r.width / 2) - (o.left + o.width / 2); });
  if (typeof vOrg === 'function') vOrg = (base => function () {
    let h = base.apply(this, arguments);
    const i = h.indexOf('<div class="card"><div class="cardhead"><h3>هيكل'); const j = h.indexOf('<div class="card"><div class="cardhead"><h3>سلاسل الاعتماد');
    if (i >= 0 && j > i) h = h.slice(0, i) + okOrgChart() + h.slice(j);
    return h;
  })(vOrg);
  const okMove = async (pid, toId) => {
    const w = byId('workers', pid); if (!w || !okOrgCan()) return;
    if (toId === pid) return;
    if (toId !== 'owner') { let x = byId('workers', toId), hops = 0; while (x && hops++ < 30) { if (x.id === pid) { toast(L('مينفعش — ده تحت نفس الشخص', 'Not possible — that person reports to them'), 'err'); return; } x = x.managerId ? byId('workers', x.managerId) : null; } }
    const m = toId === 'owner' ? null : byId('workers', toId);
    const patch = { managerId: m ? m.id : null }; if (m && m.deptId && m.deptId !== w.deptId && !['mgmt', 'acct'].includes(m.deptId)) patch.deptId = m.deptId;
    await Store.update('workers', pid, patch);
    toast(m ? L(`${w.name} بقى تحت ${m.name}`, `${w.name} now reports to ${m.name}`) : L(`${w.name} بقى تحت صاحب المكتب مباشرة`, `${w.name} now reports to the owner`)); render();
  };
  let okDragId = null;
  document.addEventListener('dragstart', e => { const n = e.target.closest && e.target.closest('.okn[draggable="true"]'); if (!n) return; okDragId = n.dataset.okp; n.classList.add('drag'); try { e.dataTransfer.setData('text/plain', okDragId); e.dataTransfer.effectAllowed = 'move'; } catch (x) { /* ignore */ } });
  document.addEventListener('dragend', e => { document.querySelectorAll('.okn.drag,.okn.over').forEach(n => n.classList.remove('drag', 'over')); okDragId = null; });
  document.addEventListener('dragover', e => { const n = e.target.closest && e.target.closest('.okorg .okn[data-okp]'); if (!n || !okDragId || n.dataset.okp === okDragId) return; e.preventDefault(); document.querySelectorAll('.okn.over').forEach(x => x.classList.remove('over')); n.classList.add('over'); });
  document.addEventListener('drop', e => { const n = e.target.closest && e.target.closest('.okorg .okn[data-okp]'); if (!n || !okDragId) return; e.preventDefault(); const to = n.dataset.okp, from = okDragId; okDragId = null; okMove(from, to); });
  document.addEventListener('click', e => { const x = e.target.closest && e.target.closest('[data-okout]'); if (!x) return; e.preventDefault(); e.stopPropagation(); okMove(x.dataset.okout, 'owner'); }, true);
  /* phones: tap a person, then tap the new manager */
  let okPick = null;
  document.addEventListener('click', e => { if (!('ontouchstart' in window)) return; const n = e.target.closest && e.target.closest('.okorg .okn[data-okp]'); if (!n || e.target.closest('a,[data-okout]') || !okOrgCan()) return; if (!okPick) { if (n.dataset.okp === 'owner') return; okPick = n.dataset.okp; n.classList.add('drag'); toast(L('دلوقتي دوس على المدير الجديد', 'Now tap the new manager')); } else { const from = okPick; okPick = null; document.querySelectorAll('.okn.drag').forEach(x => x.classList.remove('drag')); if (n.dataset.okp !== from) okMove(from, n.dataset.okp); } });
  Object.assign(OEKO_I18N, { 'هيكل Ökoplan Landscaping': 'Ökoplan Landscaping structure', 'صاحب المكتب': 'Office owner', 'من غير مدير مباشر:': 'No direct manager yet:' });

  /* the sidebar chip: the person's own job title (from their file) instead of the access role; the owner keeps «Office owner» */
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => {
    try {
      const r = typeof myRecordRef === 'function' ? myRecordRef() : null; const w = r && r.col === 'workers' ? r.rec : null; if (!w) return;
      const t = (w.trade || w.title || '').trim(); if (!t) return; const d = w.deptId ? okDept(w.deptId) : '';
      document.querySelectorAll('.userchip .r').forEach(el => { const want = t + (d ? ' · ' + d : ''); if (el.textContent !== want) el.textContent = want; });
    } catch (e) { /* ignore */ }
  });
  window.OEKO_I18N = OEKO_I18N;
  const oekoI18nApply = () => { try { if (!I18N || !I18N.exact) return; const norm = typeof i18nNorm === 'function' ? i18nNorm : (x => String(x).trim()); Object.keys(OEKO_I18N).forEach(k => { I18N.exact.set(norm(k), OEKO_I18N[k]); }); } catch (e) { /* ignore */ } };
  if (typeof i18nCompile === 'function') i18nCompile = (base => function () { const r = base.apply(this, arguments); oekoI18nApply(); return r; })(i18nCompile);
  oekoI18nApply();
  /* every switch: the whole page re-renders in the chosen language (the engine re-renders; this covers texts painted outside render) */
  if (typeof i18nSet === 'function') i18nSet = (base => async function () { const r = await base.apply(this, arguments); oekoI18nApply(); try { if (typeof render === 'function') render(true); } catch (e) { /* ignore */ } return r; })(i18nSet);

  /* AI assistants talk about a landscape office */
  if (typeof aiInstructionsBase === 'function') aiInstructionsBase = (base => () => base().replace(/مكتب التصميم المعماري/g, 'مكتب تصميم اللاند سكيب والإشراف على التنفيذ').replace(/الإظهار المعماري/g, 'تصميم اللاند سكيب'))(aiInstructionsBase);
})();

;(function(){try{setInterval(function(){try{if(innerWidth<1001)return;var d=document.getElementById('nq-dock'),a=document.querySelector('.topbar .tb-actions');if(d&&a&&d.parentElement!==a)a.insertBefore(d,a.firstChild)}catch(e){}},700)}catch(e){}})();

/* =====================================================================
   Ökoplan — project state lights + personal order (Mahmoud, 15 Oct):
   · every project card / page carries a state light: Active = green glow, On hold = amber, Stopped = red, Delivered = quiet grey.
     The state is set from the project page (managers, the team lead, the project owner); without one it is derived
     (blocked → on hold, delivered / closed → delivered, else active).
   · the list is ordered per person: the projects he opens most (and most recently) come first, inside «my projects» and «the rest».
     Counted on this device (localStorage) and, when his record allows it, kept on his own worker record (okUse) so it follows him.
   ===================================================================== */
(() => {
  if (window.__OK_PSTATE__) return; window.__OK_PSTATE__ = 1;
  const en = () => typeof I18N !== 'undefined' && I18N.lang === 'en';
  const L = (a, b) => (en() ? b : a);
  const STATES = { active: { ar: 'شغّال', en: 'Active', c: '34,197,94' }, hold: { ar: 'متوقف مؤقتًا', en: 'On hold', c: '245,179,1' }, stopped: { ar: 'واقف', en: 'Stopped', c: '239,68,68' }, done: { ar: 'اتسلّم', en: 'Delivered', c: '148,163,184' } };
  const ORDER = ['active', 'hold', 'stopped', 'done'];
  const stateOf = p => { if (!p || p.status === 'archived') return null; if (p.okState && STATES[p.okState]) return p.okState; if (p.osStatus === 'delivered' || p.osStatus === 'closed' || p.stage === 'delivered') return 'done'; if (p.blocked) return 'hold'; return 'active'; };
  const me = () => (typeof stuMe === 'function' ? stuMe() : '');
  const canSet = p => !!p && typeof stuCanEdit === 'function' && stuCanEdit() && ((typeof stuManager === 'function' && stuManager()) || p.leadId === me() || p.ownerId === me());
  document.head.insertAdjacentHTML('beforeend', `<style>
.spcard.ok-active{border-color:rgba(34,197,94,.55)!important;box-shadow:0 0 0 1px rgba(34,197,94,.22),0 0 22px rgba(34,197,94,.30)}
.spcard.ok-hold{border-color:rgba(245,179,1,.6)!important;box-shadow:0 0 0 1px rgba(245,179,1,.22),0 0 22px rgba(245,179,1,.30)}
.spcard.ok-stopped{border-color:rgba(239,68,68,.6)!important;box-shadow:0 0 0 1px rgba(239,68,68,.22),0 0 22px rgba(239,68,68,.32)}
.spcard.ok-done{opacity:.72;filter:saturate(.7)}
.spcard.ok-active:hover{box-shadow:0 0 0 1px rgba(34,197,94,.3),0 0 30px rgba(34,197,94,.42)}
.spcard.ok-hold:hover{box-shadow:0 0 0 1px rgba(245,179,1,.3),0 0 30px rgba(245,179,1,.42)}
.spcard.ok-stopped:hover{box-shadow:0 0 0 1px rgba(239,68,68,.3),0 0 30px rgba(239,68,68,.45)}
.okpst{position:absolute;top:10px;inset-inline-end:10px;z-index:2;display:inline-flex;align-items:center;gap:7px;padding:4px 11px 4px 9px;border-radius:999px;font:600 11.5px/1 var(--font);letter-spacing:.02em;background:rgba(8,18,26,.74);color:#fff;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:0;cursor:default;white-space:nowrap}
.okpst i{width:8px;height:8px;border-radius:50%;background:rgb(var(--okc));box-shadow:0 0 8px rgb(var(--okc))}
.okpst.ok-active i{animation:okpulse 1.6s ease-out infinite}
@keyframes okpulse{0%{box-shadow:0 0 0 0 rgba(var(--okc),.75),0 0 8px rgb(var(--okc))}100%{box-shadow:0 0 0 9px rgba(var(--okc),0),0 0 8px rgb(var(--okc))}}
.okpst.okbtn{position:static;cursor:pointer;background:var(--surface-2);color:var(--ink);border:1px solid var(--line)}
.okpst.okbtn:hover{border-color:rgb(var(--okc))}
.okpstlist{display:grid;gap:8px}.okpstlist label{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--line);border-radius:12px;cursor:pointer}
.okpstlist label.on{border-color:rgb(var(--okc));box-shadow:0 0 0 1px rgba(var(--okc),.35)}.okpstlist label i{width:10px;height:10px;border-radius:50%;background:rgb(var(--okc));box-shadow:0 0 8px rgb(var(--okc))}
.okpstlist label small{color:var(--muted);margin-inline-start:auto}
html[data-theme="dark"] .okpst{background:rgba(5,14,22,.82)}
.okown{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted)}.okown svg{width:13px;height:13px}.okown b{color:var(--ink);font-weight:600}
</style>`);
  const ownerName = p => { if (!p) return ''; const id = p.ownerId || p.leadId; const w = id && typeof byId === 'function' && (byId('workers', id) || byId('staff', id)); return (w && w.name) || p.leadName || ''; };
  const badge = (st, p, asBtn) => { const s = STATES[st]; const note = p && p.okStateNote ? ` title="${esc(p.okStateNote)}"` : ''; return `<${asBtn ? 'button type="button"' : 'span'} class="okpst ok-${st}${asBtn ? ' okbtn' : ''}" style="--okc:${s.c}"${asBtn ? ` data-action="okState" data-arg="${esc(p.id)}"` : ''}${note}><i></i>${esc(L(s.ar, s.en))}${asBtn ? ' ▾' : ''}</${asBtn ? 'button' : 'span'}>`; };

  /* ---- personal use count ---- */
  const KEY = 'ok.puse'; let use = {}; try { use = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { use = {}; }
  const merged = () => { const r = typeof myRecordRef === 'function' ? myRecordRef() : null; const w = r && r.col === 'workers' ? r.rec : null; const srv = (w && w.okUse) || {}; const out = Object.assign({}, use); Object.keys(srv).forEach(k => { const a = out[k] || { n: 0, at: 0 }, b = srv[k] || {}; out[k] = { n: Math.max(a.n || 0, b.n || 0), at: Math.max(a.at || 0, b.at || 0) }; }); return out; };
  const score = (u, now) => { if (!u) return 0; const age = now - (u.at || 0); return (u.n || 0) + (age < 7 * 864e5 ? 3 : age < 30 * 864e5 ? 1 : 0); };
  let lastRoute = '', lastPush = 0, pushT = null;
  const persist = () => { clearTimeout(pushT); pushT = setTimeout(async () => { try { const r = typeof myRecordRef === 'function' ? myRecordRef() : null; const w = r && r.col === 'workers' ? r.rec : null; if (!w || !S.session || Date.now() - lastPush < 60e3) return; lastPush = Date.now(); const keep = {}; Object.entries(merged()).sort((a, b) => (b[1].at || 0) - (a[1].at || 0)).slice(0, 60).forEach(([k, v]) => { keep[k] = v; }); await Store.update('workers', w.id, { okUse: keep }, { silent: true }); } catch (e) { /* the record may be read-only for him — the device copy still works */ } }, 4000); };
  const track = () => {
    const r = S.route || {}; const key = r.view === 'projects' && r.id ? r.id : '';
    if (!key || key === lastRoute) { if (!key) lastRoute = ''; return; } lastRoute = key;
    const u = use[key] || { n: 0, at: 0 }; u.n = (u.n || 0) + 1; u.at = Date.now(); use[key] = u;
    try { localStorage.setItem(KEY, JSON.stringify(use)); } catch (e) { /* private mode */ }
    persist();
  };

  /* ---- paint: cards, page head, order ---- */
  const decorate = () => {
    track();
    const v = document.getElementById('view'); if (!v) return;
    v.querySelectorAll('.spcard[href^="#/projects/"]').forEach(a => {
      const id = a.getAttribute('href').slice('#/projects/'.length); const p = byId('projects', id); const st = stateOf(p);
      ORDER.forEach(s => a.classList.toggle('ok-' + s, st === s));
      let b = a.querySelector(':scope > .okpst'); if (!st) { if (b) b.remove(); return; }
      if (!b || b.dataset.okpst !== st + '|' + I18N.lang) { if (b) b.remove(); a.insertAdjacentHTML('afterbegin', badge(st, p, false)); b = a.querySelector(':scope > .okpst'); b.dataset.okpst = st + '|' + I18N.lang; }
      /* the project owner (from the 2026 list): the person's record, or the name as written when he is not on the team list */
      const own = ownerName(p); let o = a.querySelector('.okown');
      if (own && (!o || o.dataset.n !== own + '|' + I18N.lang)) { if (o) o.remove(); const cl = a.querySelector('.bd .cl'); if (cl) { cl.insertAdjacentHTML('afterend', `<div class="okown" data-n="${esc(own + '|' + I18N.lang)}">${icon('user')}<span>${esc(L('المسؤول', 'Owner'))}</span><b>${esc(own)}</b></div>`); } }
    });
    if (S.route && S.route.view === 'projects' && !S.route.id) {
      const u = merged(), now = Date.now();
      v.querySelectorAll('.spgrid').forEach(g => {
        const cards = Array.from(g.children); const sc = c => { const h = c.getAttribute('href') || ''; return score(u[h.slice('#/projects/'.length)], now); };
        const sorted = cards.map((c, i) => ({ c, i, s: sc(c) })).sort((a, b) => b.s - a.s || a.i - b.i).map(x => x.c);
        if (sorted.some((c, i) => c !== cards[i])) sorted.forEach(c => g.appendChild(c));
      });
    }
    if (S.route && S.route.view === 'projects' && S.route.id) {
      const p = byId('projects', S.route.id); const head = v.querySelector('.sphead'); const st = stateOf(p); if (!p || !head || !st) return;
      const row = head.querySelector('.row'); if (!row) return; const stg = row.querySelector('.stg');
      let b = head.querySelector('.okpst'); const sig = st + '|' + I18N.lang + '|' + (canSet(p) ? 1 : 0) + '|' + (p.okStateNote || '');
      if (b && b.dataset.okpst === sig) return; if (b) b.remove();
      (stg || row.querySelector('h2')).insertAdjacentHTML('afterend', badge(st, p, canSet(p))); b = head.querySelector('.okpst'); if (b) { b.classList.add('okbtn'); b.dataset.okpst = sig; if (!canSet(p)) b.style.cursor = 'default'; }
    }
  };
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(decorate);

  /* ---- set the state (managers, team lead, project owner) ---- */
  ACTIONS.okState = pid => {
    const p = byId('projects', pid); if (!p || !canSet(p)) return; const cur = stateOf(p);
    const opts = ['active', 'hold', 'stopped', 'done'].map(s => `<label class="${cur === s ? 'on' : ''}" style="--okc:${STATES[s].c}"><input type="radio" name="st" value="${s}" ${cur === s ? 'checked' : ''} hidden><i></i><b>${esc(L(STATES[s].ar, STATES[s].en))}</b><small>${esc(s === 'active' ? L('الفريق شغّال فيه', 'the team is working on it') : s === 'hold' ? L('مستني حاجة — داتا / قرار / دفعة', 'waiting — data, a decision, a payment') : s === 'stopped' ? L('اتوقف — مش هنكمّل دلوقتي', 'stopped — not continuing for now') : L('اتسلّم للعميل', 'handed over to the client'))}</small></label>`).join('');
    openModal({ title: L(`حالة مشروع «${p.name}»`, `State of «${p.name}»`), submitLabel: L('حفظ', 'Save'),
      body: `<div class="form"><div class="field full"><div class="okstlist" id="okstl">${opts}</div></div><div class="field full"><label>${esc(L('ملاحظة (اختياري) — السبب يظهر لما حد يقف على الحالة', 'Note (optional) — shown when someone hovers the state'))}</label><input name="note" maxlength="140" dir="auto" value="${esc(p.okStateNote || '')}"></div></div>`,
      onOpen: f => { const l = f.querySelector('#okstl'); if (l) l.addEventListener('change', () => { l.querySelectorAll('label').forEach(x => x.classList.toggle('on', x.querySelector('input').checked)); }); },
      onSubmit: async f => {
        const st = (f.querySelector('input[name=st]:checked') || {}).value; if (!st) return false; const note = f.querySelector('[name=note]').value.trim();
        const log = (p.okStateLog || []).slice(-30); log.push({ st, note, at: new Date().toISOString(), by: me() });
        await Store.save('projects', Object.assign({}, byId('projects', pid) || p, { okState: st, okStateNote: note, okStateAt: new Date().toISOString(), okStateBy: me(), okStateLog: log }));
        toast(L('اتحفظت حالة المشروع', 'Project state saved')); return true;
      } });
  };
  window.okProjectState = stateOf;
})();

/* =====================================================================
   Ökoplan (Mahmoud, 15 Oct): the projects list layout is his to choose — a list (one under the other), two or three side by side.
   A small switch above the list; the choice is kept on the device (ok.pcols). «Auto» = the engine's own fit.
   ===================================================================== */
(() => {
  if (window.__OK_PCOLS__) return; window.__OK_PCOLS__ = 1;
  const en = () => typeof I18N !== 'undefined' && I18N.lang === 'en';
  const L = (a, b) => (en() ? b : a);
  const KEY = 'ok.pcols'; let cols = ''; try { cols = localStorage.getItem(KEY) || ''; } catch (e) { cols = ''; }
  /* no choice yet: on a phone three side by side (Mahmoud), on a computer the engine's own fit */
  const eff = () => cols || (innerWidth <= 760 ? '3' : '');
  document.head.insertAdjacentHTML('beforeend', `<style>
.okcols{display:inline-flex;gap:2px;padding:3px;border:1px solid var(--line);border-radius:999px;background:var(--surface-2);margin-inline-end:8px}
.okcols button{border:0;background:transparent;color:var(--muted);width:34px;height:30px;border-radius:999px;display:grid;place-items:center;cursor:pointer;font:600 12px var(--font)}
.okcols button.on{background:var(--ink);color:var(--surface)}
.okcols button svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round}
.spgrid[data-okcols="1"]{grid-template-columns:1fr!important;gap:10px}
.spgrid[data-okcols="2"]{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.spgrid[data-okcols="3"]{grid-template-columns:repeat(3,minmax(0,1fr))!important}
/* the list: a row — cover on the side, text next to it */
.spgrid[data-okcols="1"] .spcard{flex-direction:row;min-height:0;align-items:stretch}
.spgrid[data-okcols="1"] .spcard .cov{aspect-ratio:auto;width:112px;min-width:112px;font-size:18px}
.spgrid[data-okcols="1"] .spcard .cov img{object-fit:contain;padding:8px}
.spgrid[data-okcols="1"] .spcard .cov.oklogo img,.spgrid[data-okcols="1"] .spcard .cov.okmark img{object-fit:contain}
.spgrid[data-okcols="1"] .spcard .bd{padding:10px 12px;gap:4px;min-width:0}
.spgrid[data-okcols="1"] .spcard .nm{font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.spgrid[data-okcols="1"] .spcard .okpst{top:auto;bottom:8px;inset-inline-end:auto;inset-inline-start:8px;padding:3px 8px 3px 7px;font-size:10.5px;max-width:96px;overflow:hidden;text-overflow:ellipsis}
.spgrid[data-okcols="1"] .spcard .okpst i{width:6px;height:6px}
#nf-install{background:var(--surface)!important;color:var(--ink)!important;border:1px solid var(--line)}#nf-install .txt span{opacity:.75}
.okown{flex-wrap:wrap;row-gap:0}
@media (max-width:700px){.spgrid[data-okcols="3"] .spcard .nm,.spgrid[data-okcols="2"] .spcard .nm{font-size:13px}.spgrid[data-okcols="3"] .spcard .bd,.spgrid[data-okcols="2"] .spcard .bd{padding:8px 10px;gap:4px}.spgrid[data-okcols="3"] .spcard .cl,.spgrid[data-okcols="3"] .tiny,.spgrid[data-okcols="3"] .okown{font-size:10.5px}.spgrid[data-okcols="3"] .stg{font-size:10px;padding:2px 6px}.spgrid[data-okcols="3"] .stuavs{display:none}.spgrid[data-okcols="3"] .okpst,.spgrid[data-okcols="2"] .okpst{font-size:10px;padding:3px 8px 3px 7px}}
</style>`);
  const ICO = { 1: '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>', 2: '<svg viewBox="0 0 24 24"><rect x="3.5" y="4" width="7" height="16" rx="1.5"/><rect x="13.5" y="4" width="7" height="16" rx="1.5"/></svg>', 3: '<svg viewBox="0 0 24 24"><rect x="2.5" y="4" width="5" height="16" rx="1.2"/><rect x="9.5" y="4" width="5" height="16" rx="1.2"/><rect x="16.5" y="4" width="5" height="16" rx="1.2"/></svg>', '': '<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>' };
  const TITLE = { 1: ['قائمة — واحد تحت التاني', 'List — one under the other'], 2: ['اتنين جنب بعض', 'Two side by side'], 3: ['تلاتة جنب بعض', 'Three side by side'], '': ['تلقائي', 'Auto'] };
  const apply = () => {
    if (!(S.route && S.route.view === 'projects' && !S.route.id)) return;
    const v = document.getElementById('view'); if (!v) return;
    const c = eff(); v.querySelectorAll('.spgrid').forEach(g => { if (c) g.dataset.okcols = c; else delete g.dataset.okcols; });
    const head = v.querySelector('.card > .cardhead'); if (!head) return;
    let sw = head.querySelector('.okcols');
    if (!sw) { sw = document.createElement('div'); sw.className = 'okcols'; const grow = head.querySelector('.grow'); (grow || head).insertAdjacentElement(grow ? 'afterend' : 'beforeend', sw); }
    const want = ['', '1', '2', '3'].map(c => `<button type="button" data-okcols="${c}" class="${eff() === c ? 'on' : ''}" title="${esc(L(TITLE[c][0], TITLE[c][1]))}" aria-label="${esc(L(TITLE[c][0], TITLE[c][1]))}">${ICO[c]}</button>`).join('');
    if (sw.dataset.sig !== eff() + I18N.lang) { sw.innerHTML = want; sw.dataset.sig = eff() + I18N.lang; }
  };
  document.addEventListener('click', ev => {
    const b = ev.target.closest && ev.target.closest('.okcols button'); if (!b) return;
    cols = b.dataset.okcols; try { if (cols) localStorage.setItem(KEY, cols); else localStorage.removeItem(KEY); } catch (e) { /* private */ }
    const sw = b.closest('.okcols'); if (sw) sw.dataset.sig = ''; apply();
  });
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(apply);
})();

/* =====================================================================
   Ökoplan (Mahmoud, 15 Oct): in English, no Arabic on the screen. The engine shows some labels in both languages
   («Design Development · تطوير التصميم», the stage steps) — in English mode the Arabic half is dropped.
   People's own text (names, notes) is left as written.
   ===================================================================== */
(() => {
  if (window.__OK_ENONLY__) return; window.__OK_ENONLY__ = 1;
  const AR = /[؀-ۿ]/;
  const strip = root => {
    if (!root) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const nodes = []; let n; while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(t => {
      const s = t.nodeValue; if (!s || !AR.test(s)) return;
      const el = t.parentElement; if (!el || el.closest('input,textarea,[contenteditable],.notr,.okown,.nm,.sht,h2.notr')) return;
      /* «English · عربي» (one text node) → English */
      const m = /^(\s*[^؀-ۿ·]*[A-Za-z0-9)][^؀-ۿ·]*)\s*·\s*[؀-ۿ][^·]*$/.exec(s);
      if (m) { t.nodeValue = m[1].replace(/\s+$/, ''); return; }
      /* the stage steps: <b>English</b>عربي → the Arabic tail goes */
      if (el.classList.contains('spstep') && t.previousSibling && t.previousSibling.nodeName === 'B' && !/[A-Za-z]/.test(s)) { t.nodeValue = ''; return; }
      /* a chip whose English twin sits right before it (engine stage pills) */
      if (el.classList.contains('stg') && /[A-Za-z]/.test(el.textContent) && !/[A-Za-z]/.test(s)) t.nodeValue = s.replace(/[؀-ۿ\s·،]+/g, ' ').trim() ? s : '';
    });
  };
  const run = () => { if (!(typeof I18N !== 'undefined' && I18N.lang === 'en')) return; strip(document.getElementById('view')); strip(document.querySelector('.topbar')); strip(document.querySelector('.modal')); };
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(run); setInterval(run, 1200);
})();

/* =====================================================================
   Ökoplan — the consultancy pipeline, end to end (Mahmoud, 15 Oct, «ابدأ»):
   A) Enquiries (#/enquiries): Lead → Brief review (Go / No-Go) → Proposal → Negotiation → Won (becomes a project) / Lost.
      Seen by the owner, managers and the people in settings.okEnqViewers (server: nf_enq_vis). No money anywhere.
   B) On every project, under the stage steps, the «Project pipeline» card:
      Setup (mobilisation checklist + kick-offs) · Client (submission → comments → response → approval, per stage) ·
      Site (visits · submittals · RFIs · site instructions · variations · snag list — can be switched off per project) ·
      Close-out (handover, as-built, O&M, defects period, lessons learned, gallery) · Logs (decisions · changes · risks).
   C) Stage gate: the Project Owner (or a manager) approves the gate → the project moves to the next stage; logged in okGates.
   Standards behind it: RIBA Plan of Work 2020 (stages), ISO 9001 (gate reviews / records), ISO 19650 (document naming), FIDIC (site records).
   ===================================================================== */
(() => {
  if (window.__OK_FLOW__) return; window.__OK_FLOW__ = 1;
  const en = () => typeof I18N !== 'undefined' && I18N.lang === 'en';
  const L = (a, b) => (en() ? b : a);
  const me = () => (typeof stuMe === 'function' ? stuMe() : '');
  const isMgr = () => isAdmin() || role() === 'manager';
  const PIPE = window.OEKO_PIPELINE || [];
  const stageIdx = p => Math.max(0, PIPE.findIndex(s => s.id === (p.osStatus || p.stage)));
  const canEdit = p => !!p && typeof stuCanEdit === 'function' && stuCanEdit() && (isMgr() || p.ownerId === me() || p.leadId === me());
  const onTeam = p => !!p && typeof stuCanEdit === 'function' && stuCanEdit() && (canEdit(p) || (p.team || []).includes(me()));
  const who = id => { const w = id && (byId('workers', id) || byId('staff', id)); return (w && w.name) || (id === me() && S.session && S.session.name) || ''; };
  const myName = () => (S.session && S.session.name) || '';
  const d10 = iso => (iso ? fmtDate(String(iso).slice(0, 10)) : '—');
  const up = async (pid, patch) => { await Store.update('projects', pid, patch); if (typeof rerender === 'function') rerender(); };
  const people = () => list('workers').filter(w => w.status !== 'left' && w.status !== 'inactive').sort((a, b) => String(a.name).localeCompare(String(b.name)));
  const TYPES = { hotel: ['فنادق ومنتجعات', 'Hotels & Resorts'], res: ['سكني', 'Residential'], urban: ['تخطيط عمراني', 'Urban Planning'], com: ['تجاري وترفيهي', 'Commercial & Leisure'], edu: ['تعليمي', 'Education'], gov: ['حكومي', 'Government'], park: ['حدائق عامة', 'Public Parks'] };

  document.head.insertAdjacentHTML('beforeend', `<style>
.okflow{margin-top:14px;border:1px solid var(--line);border-radius:14px;background:var(--surface);overflow:hidden}
.okflow .okfh{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--line);flex-wrap:wrap}.okflow .okfh b{font-size:14px}
.okflow .oktabs{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding:8px 10px 0}.okflow .oktabs::-webkit-scrollbar{display:none}
.okflow .oktabs button{flex:none;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:999px;padding:6px 12px;font:600 12.5px var(--font);cursor:pointer;display:inline-flex;gap:6px;align-items:center}
.okflow .oktabs button.on{background:var(--ink);color:var(--surface);border-color:transparent}.okflow .oktabs button i{font-style:normal;font-size:11px;opacity:.75}
.okflow .okfb{padding:12px}
.okflow .okck{display:flex;gap:10px;align-items:flex-start;padding:7px 2px;border-top:1px solid var(--line);font-size:13.5px;cursor:pointer}.okflow .okck:first-child{border-top:0}.okflow .okck input{margin-top:3px;accent-color:var(--accent)}.okflow .okck.done span{text-decoration:line-through;color:var(--muted)}
.okflow .okrow{display:flex;align-items:center;gap:8px;padding:8px 0;border-top:1px solid var(--line);font-size:13px;flex-wrap:wrap}.okflow .okrow:first-child{border-top:0}.okflow .okrow .muted{color:var(--muted)}.okflow .okrow .grow{flex:1}
.okflow .okpill{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:2px 9px;font-size:11.5px;font-weight:600;border:1px solid var(--line);background:var(--surface-2)}
.okflow .okpill.g{background:rgba(34,197,94,.14);border-color:rgba(34,197,94,.4);color:#15803d}.okflow .okpill.y{background:rgba(245,179,1,.14);border-color:rgba(245,179,1,.45);color:#9a6700}.okflow .okpill.r{background:rgba(239,68,68,.12);border-color:rgba(239,68,68,.4);color:#b91c1c}.okflow .okpill.b{background:rgba(80,177,231,.14);border-color:rgba(80,177,231,.45);color:#0c6aa0}
html[data-theme="dark"] .okflow .okpill.g{color:#86efac}html[data-theme="dark"] .okflow .okpill.y{color:#fcd34d}html[data-theme="dark"] .okflow .okpill.r{color:#fca5a5}html[data-theme="dark"] .okflow .okpill.b{color:#8ad6f7}
.okflow .oksec{margin-top:12px;border:1px solid var(--line);border-radius:12px;padding:8px 12px}.okflow .oksec h4{margin:0;font-size:13px;display:flex;align-items:center;gap:8px}.okflow .oksec h4 .n{font-weight:700;color:var(--accent)}
.okflow .okempty{color:var(--muted);font-size:12.5px;padding:6px 0}
.okflow .okgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px}
.okflow .okst2{border:1px solid var(--line);border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}.okflow .okst2 b{font-size:13px}.okflow .okst2 small{color:var(--muted)}
.okflow .okst2.cur{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent) inset}
.okgatebtn{margin-inline-start:auto}
/* enquiries */
.okenq{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}@media (max-width:1000px){.okenq{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:600px){.okenq{grid-template-columns:1fr}}
.okenq .okcol{background:var(--surface-2);border:1px solid var(--line);border-radius:14px;padding:10px;min-height:120px}.okenq .okcol h4{margin:0 0 8px;font-size:13px;display:flex;align-items:center;gap:8px}.okenq .okcol h4 .n{color:var(--muted);font-weight:600}
.okenq .okcard{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin-bottom:8px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:transform .15s,box-shadow .15s}.okenq .okcard:hover{transform:translateY(-1px);box-shadow:var(--shadow-lg)}
.okenq .okcard b{font-size:14px}.okenq .okcard small{color:var(--muted);font-size:12px}.okenq .okcard .late{color:#b91c1c;font-weight:600}
.okenqsum{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}.okenqsum .okpill{padding:6px 12px;font-size:12.5px;border-radius:999px;border:1px solid var(--line);background:var(--surface);display:inline-flex;gap:6px;align-items:center}.okenqsum .okpill b{color:var(--accent)}
.okenqdone{margin-top:14px}.okenqdone summary{cursor:pointer;color:var(--muted);font-size:13px}
.okenqdone .okrow{display:flex;gap:8px;align-items:center;padding:8px 0;border-top:1px solid var(--line);font-size:13px;flex-wrap:wrap}.okenqdone .okrow .grow{flex:1}
.okstepbar{display:flex;gap:4px;margin:6px 0 10px}.okstepbar i{flex:1;height:5px;border-radius:999px;background:var(--line)}.okstepbar i.on{background:var(--accent)}
</style>`);

  /* ==================================================================== A) ENQUIRIES */
  const COL = 'enquiries';
  if (typeof COLS !== 'undefined' && !COLS.includes(COL)) COLS.push(COL); S.data[COL] = S.data[COL] || new Map();
  if (typeof Store === 'object' && Store.subscribeAll) Store.subscribeAll = (base => function () { base.call(this); const db = S.db; if (!db) return; try { S.unsub.push(db.collection(COL).onSnapshot(snap => { S.data[COL] = new Map(snap.docs.map(d => [d.id, d.data()])); S.loaded[COL] = true; rerender(); }, e => console.warn('snapshot', COL, e))); } catch (e) { /* local */ } })(Store.subscribeAll);
  const ESTAGES = [
    { id: 'lead', ar: 'طلب جديد', en: 'Lead / Enquiry', hint: ['مصدر الطلب · المطوّر · الموقع · نوع المشروع', 'source · developer · location · project type'] },
    { id: 'brief', ar: 'مراجعة البريف', en: 'Brief review', hint: ['فهم المطلوب · زيارة أولية · قرار Go / No-Go', 'understand the ask · first visit · Go / No-Go'] },
    { id: 'proposal', ar: 'العرض الفني', en: 'Proposal', hint: ['نطاق الخدمات · الجدول · المخرجات · الفريق', 'scope of services · schedule · deliverables · team'] },
    { id: 'nego', ar: 'التفاوض والتعاقد', en: 'Negotiation & contract', hint: ['Scope matrix · التعاقد · Notice to Proceed', 'scope matrix · contract · notice to proceed'] },
  ];
  const SOURCES = { ref: ['ترشيح', 'Referral'], repeat: ['عميل قائم', 'Repeat client'], tender: ['مناقصة / دعوة', 'Tender / invitation'], web: ['الموقع / السوشيال', 'Website / social'], other: ['أخرى', 'Other'] };
  const enqVis = () => !!S.session && (isMgr() || ((S.settings && S.settings.okEnqViewers) || []).includes(me()));
  const enqs = () => list(COL).filter(e => !e.deleted);
  const nextCode = () => { let n = 0; list('projects').forEach(p => { const m = /^OK-(\d{3,})$/.exec(p.code || ''); if (m) n = Math.max(n, +m[1]); }); return 'OK-' + String(n + 1).padStart(3, '0'); };
  const late = e => e.next && e.next < todayISO() && !['won', 'lost'].includes(e.stage);
  const card = e => `<div class="okcard" data-action="okEnqOpen" data-arg="${e.id}"><b>${esc(e.name)}</b><small>${esc([e.developer, e.location].filter(Boolean).join(' · ') || '—')}</small><small>${esc(TYPES[e.type] ? L(TYPES[e.type][0], TYPES[e.type][1]) : '')}${e.ownerId ? ' · ' + esc(who(e.ownerId)) : ''}</small>${e.next ? `<small class="${late(e) ? 'late' : ''}">${esc(L('الخطوة الجاية', 'Next'))}: ${esc(e.nextWhat || '')} · ${d10(e.next)}</small>` : ''}${e.gonogo && e.gonogo.decision ? `<small>${e.gonogo.decision === 'go' ? '✅ Go' : '⛔ No-Go'}</small>` : ''}</div>`;
  const enqPage = () => {
    if (!enqVis()) return `<div class="banner warn">${esc(L('الصفحة دي لإدارة المكتب', 'This page is for the office management'))}</div>`;
    const all = enqs(); const open = all.filter(e => !['won', 'lost'].includes(e.stage)); const done = all.filter(e => ['won', 'lost'].includes(e.stage)).sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
    const sum = `<div class="okenqsum">${ESTAGES.map(s => `<span class="okpill"><b>${open.filter(e => e.stage === s.id).length}</b>${esc(L(s.ar, s.en))}</span>`).join('')}<span class="okpill"><b>${done.filter(e => e.stage === 'won').length}</b>${esc(L('اتحوّلت لمشاريع', 'won → projects'))}</span><span class="okpill"><b>${open.filter(late).length}</b>${esc(L('متأخرة', 'overdue'))}</span></div>`;
    const cols = `<div class="okenq">${ESTAGES.map(s => { const xs = open.filter(e => e.stage === s.id).sort((a, b) => String(a.next || '9').localeCompare(String(b.next || '9'))); return `<div class="okcol"><h4>${esc(L(s.ar, s.en))}<span class="n">${xs.length}</span></h4><div class="tiny muted" style="margin:-4px 0 8px">${esc(L(s.hint[0], s.hint[1]))}</div>${xs.map(card).join('') || `<div class="okempty">—</div>`}</div>`; }).join('')}</div>`;
    const doneH = done.length ? `<details class="okenqdone"><summary>${esc(L('المحسومة', 'Closed'))} · ${done.length}</summary>${done.map(e => `<div class="okrow"><span class="okpill ${e.stage === 'won' ? 'g' : 'r'}">${e.stage === 'won' ? esc(L('اتحوّل لمشروع', 'Won')) : esc(L('خسران / No-Go', 'Lost / No-Go'))}</span><b>${esc(e.name)}</b><span class="muted">${esc(e.developer || '')}</span><div class="grow"></div>${e.projectId ? `<a class="btn sm ghost" href="#/projects/${esc(e.projectId)}">${esc(L('المشروع', 'Project'))}</a>` : ''}<button type="button" class="btn sm ghost" data-action="okEnqOpen" data-arg="${e.id}">${esc(L('تفاصيل', 'Details'))}</button></div>`).join('')}</details>` : '';
    return `<div class="card"><div class="cardhead"><h2 style="margin:0">${esc(L('الفرص والعروض', 'Enquiries & proposals'))}</h2><div class="grow"></div><button class="btn p" data-action="okEnqNew">${icon('plus')}<span>${esc(L('طلب جديد', 'New enquiry'))}</span></button></div>${sum}${cols}${doneH}</div>`;
  };
  const enqForm = e => `<div class="form">${field(L('اسم المشروع / الطلب', 'Project / enquiry name'), inp('name', e.name || '', 'required'), 'full')}${field(L('المطوّر / العميل', 'Developer / client'), inp('developer', e.developer || ''))}${field(L('الموقع', 'Location'), inp('location', e.location || ''))}
    ${field(L('نوع المشروع', 'Project type'), `<select name="type">${Object.keys(TYPES).map(k => `<option value="${k}" ${e.type === k ? 'selected' : ''}>${esc(L(TYPES[k][0], TYPES[k][1]))}</option>`).join('')}</select>`)}${field(L('المصدر', 'Source'), `<select name="source">${Object.keys(SOURCES).map(k => `<option value="${k}" ${e.source === k ? 'selected' : ''}>${esc(L(SOURCES[k][0], SOURCES[k][1]))}</option>`).join('')}</select>`)}
    ${field(L('المسؤول عن الفرصة', 'Owner'), `<select name="ownerId"><option value="">—</option>${opts(people(), e.ownerId || me(), x => x.name)}</select>`)}${field(L('جهة الاتصال', 'Contact person'), inp('contact', e.contact || ''))}
    ${field(L('الخطوة الجاية', 'Next action'), inp('nextWhat', e.nextWhat || ''))}${field(L('موعدها', 'Due'), inp('next', e.next || '', 'type="date"'))}
    ${field(L('ملاحظات (من غير أرقام مالية)', 'Notes (no money figures)'), `<textarea name="notes" rows="3">${esc(e.notes || '')}</textarea>`, 'full')}</div>`;
  const enqSave = async (f, e) => {
    const d = formData(f); if (!d.name) { toast(L('اكتب اسم الطلب', 'Write the enquiry name'), 'err'); return false; }
    const doc = Object.assign({}, e, { name: d.name, developer: d.developer, location: d.location, type: d.type, source: d.source, ownerId: d.ownerId || null, contact: d.contact, nextWhat: d.nextWhat, next: d.next || null, notes: typeof nfUnmaskMoney === 'function' ? d.notes : d.notes, updatedAt: nowISO() });
    if (!doc.id) { doc.id = uid(); doc.stage = 'lead'; doc.createdAt = nowISO(); doc.createdBy = me(); doc.log = [{ at: nowISO(), by: myName(), text: L('اتسجّل الطلب', 'Enquiry logged') }]; }
    await Store.save(COL, doc); return doc;
  };
  ACTIONS.okEnqNew = () => { if (!enqVis()) return; openModal({ title: L('طلب جديد', 'New enquiry'), wide: true, body: enqForm({}), submitLabel: L('تسجيل', 'Log it'), onSubmit: async f => { const r = await enqSave(f, {}); if (!r) return false; toast(L('اتسجّل', 'Logged')); rerender(); return true; } }); };
  ACTIONS.okEnqEdit = id => { const e = byId(COL, id); if (!e || !enqVis()) return; openModal({ title: L('تعديل الطلب', 'Edit enquiry'), wide: true, body: enqForm(e), onSubmit: async f => { const r = await enqSave(f, e); if (!r) return false; rerender(); return true; } }); };
  const enqLog = async (e, text, patch) => { const log = (e.log || []).concat([{ at: nowISO(), by: myName(), text }]).slice(-100); await Store.save(COL, Object.assign({}, e, patch || {}, { log, updatedAt: nowISO() })); rerender(); };
  ACTIONS.okEnqOpen = id => {
    const e = byId(COL, id); if (!e || !enqVis()) return; const si = ESTAGES.findIndex(s => s.id === e.stage); const closed = ['won', 'lost'].includes(e.stage);
    const bar = `<div class="okstepbar">${ESTAGES.map((s, i) => `<i class="${i <= si || e.stage === 'won' ? 'on' : ''}" title="${esc(L(s.ar, s.en))}"></i>`).join('')}</div>`;
    const rows = [[L('المطوّر', 'Developer'), e.developer], [L('الموقع', 'Location'), e.location], [L('النوع', 'Type'), TYPES[e.type] ? L(TYPES[e.type][0], TYPES[e.type][1]) : ''], [L('المصدر', 'Source'), SOURCES[e.source] ? L(SOURCES[e.source][0], SOURCES[e.source][1]) : ''], [L('المسؤول', 'Owner'), who(e.ownerId)], [L('جهة الاتصال', 'Contact'), e.contact], [L('الخطوة الجاية', 'Next action'), e.nextWhat ? `${e.nextWhat} · ${d10(e.next)}` : (e.next ? d10(e.next) : '')]].filter(r => r[1]);
    const acts = closed ? '' : `<div class="row" style="gap:6px;flex-wrap:wrap;margin-top:10px">
      ${si > 0 ? `<button type="button" class="btn sm ghost" data-okenq="back:${e.id}">← ${esc(L(ESTAGES[si - 1].ar, ESTAGES[si - 1].en))}</button>` : ''}
      ${e.stage === 'brief' && !(e.gonogo && e.gonogo.decision) ? `<button type="button" class="btn sm p" data-okenq="go:${e.id}">✅ Go</button><button type="button" class="btn sm d" data-okenq="nogo:${e.id}">⛔ No-Go</button>` : ''}
      ${si < ESTAGES.length - 1 ? `<button type="button" class="btn sm p" data-okenq="next:${e.id}">${esc(L(ESTAGES[si + 1].ar, ESTAGES[si + 1].en))} →</button>` : ''}
      ${['proposal', 'nego'].includes(e.stage) ? `<button type="button" class="btn sm p" data-okenq="win:${e.id}">${esc(L('اتعاقدنا — حوّله لمشروع', 'Won — make it a project'))}</button>` : ''}
      <button type="button" class="btn sm ghost" data-okenq="lost:${e.id}">${esc(L('خسران / اتلغى', 'Lost / cancelled'))}</button></div>`;
    openModal({ title: e.name, wide: true, footer: `<button type="button" class="btn" data-action="closemodal">${esc(L('إغلاق', 'Close'))}</button>${closed ? '' : `<button type="button" class="btn ghost" data-action="okEnqEdit" data-arg="${e.id}">${icon('edit')}<span>${esc(L('تعديل', 'Edit'))}</span></button>`}`,
      body: `<div>${bar}<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:8px"><span class="okpill ${e.stage === 'won' ? 'g' : e.stage === 'lost' ? 'r' : 'b'}" style="display:inline-flex;border-radius:999px;padding:3px 10px;border:1px solid var(--line);font-size:12px;font-weight:600">${esc(e.stage === 'won' ? L('اتحوّل لمشروع', 'Won') : e.stage === 'lost' ? L('خسران / No-Go', 'Lost / No-Go') : L(ESTAGES[si].ar, ESTAGES[si].en))}</span>${e.gonogo && e.gonogo.decision ? `<span class="small muted">${e.gonogo.decision === 'go' ? 'Go' : 'No-Go'} · ${esc(e.gonogo.by || '')} · ${d10(e.gonogo.at)}${e.gonogo.why ? ' · ' + esc(e.gonogo.why) : ''}</span>` : ''}${e.projectId ? `<a class="btn sm ghost" href="#/projects/${esc(e.projectId)}" data-action="closemodal">${esc(L('افتح المشروع', 'Open the project'))}</a>` : ''}</div>
      <div class="tablewrap"><table><tbody>${rows.map(r => `<tr><th style="width:140px">${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join('')}</tbody></table></div>
      ${e.notes ? `<p class="small" style="white-space:pre-wrap;margin:10px 0 0">${esc(e.notes)}</p>` : ''}${acts}
      <details style="margin-top:10px"><summary class="small muted">${esc(L('السجل', 'History'))} · ${(e.log || []).length}</summary>${(e.log || []).slice().reverse().map(l => `<div class="small" style="padding:4px 0;border-top:1px solid var(--line)">${esc(d10(l.at))} · ${esc(l.by || '')} — ${esc(l.text)}</div>`).join('')}</details></div>` });
  };
  document.addEventListener('click', async ev => {
    const b = ev.target.closest && ev.target.closest('[data-okenq]'); if (!b) return; const [op, id] = b.dataset.okenq.split(':'); const e = byId(COL, id); if (!e || !enqVis()) return;
    const si = ESTAGES.findIndex(s => s.id === e.stage);
    if (op === 'next' && si < ESTAGES.length - 1) { const s = ESTAGES[si + 1]; closeModal(); await enqLog(e, L(`اتنقل لـ«${s.ar}»`, `Moved to «${s.en}»`), { stage: s.id }); }
    if (op === 'back' && si > 0) { const s = ESTAGES[si - 1]; closeModal(); await enqLog(e, L(`رجع لـ«${s.ar}»`, `Back to «${s.en}»`), { stage: s.id }); }
    if (op === 'go' || op === 'nogo') {
      closeModal();
      openModal({ title: op === 'go' ? 'Go' : 'No-Go', body: `<div class="form"><div class="field full"><label>${esc(L('السبب / الملاحظة', 'Reason / note'))}</label><input name="why" maxlength="200" dir="auto"></div></div>`, submitLabel: L('تأكيد', 'Confirm'),
        onSubmit: async f => { const why = f.querySelector('[name=why]').value.trim(); const g = { decision: op, by: myName(), at: nowISO(), why }; await enqLog(e, (op === 'go' ? 'Go' : 'No-Go') + (why ? ' — ' + why : ''), op === 'go' ? { gonogo: g, stage: 'proposal' } : { gonogo: g, stage: 'lost', lostWhy: why }); return true; } });
    }
    if (op === 'lost') { if (!(await confirmDlg(L(`تقفل «${e.name}» كخسران / ملغي؟`, `Close «${e.name}» as lost / cancelled?`), L('اقفل', 'Close it')))) return; closeModal(); await enqLog(e, L('اتقفل: خسران / ملغي', 'Closed: lost / cancelled'), { stage: 'lost' }); }
    if (op === 'win') {
      closeModal();
      openModal({ title: L('تحويل لمشروع', 'Make it a project'), body: `<div class="form">${field(L('اسم المشروع', 'Project name'), inp('name', e.name, 'required'), 'full')}${field(L('الكود', 'Code'), inp('code', nextCode(), 'class="ltr"'))}${field(L('Project Owner', 'Project Owner'), `<select name="ownerId">${opts(people(), e.ownerId || me(), x => x.name)}</select>`)}${field(L('تاريخ التعاقد / NTP', 'Contract / NTP date'), inp('ntp', todayISO(), 'type="date"'))}${field(L('موعد التسليم للعميل (لو اتحدد)', 'Client deadline (if set)'), inp('dueDate', '', 'type="date"'))}</div>`, submitLabel: L('أنشئ المشروع', 'Create the project'),
        onSubmit: async f => {
          const d = formData(f); if (!d.name) return false; const pid = uid();
          const p = { id: pid, name: d.name, client: e.developer || '', code: d.code || nextCode(), stage: 'data', osStatus: 'data', flow: 'os', osStatusAt: { data: nowISO() }, ownerId: d.ownerId || e.ownerId || null, leadId: d.ownerId || e.ownerId || null, team: [d.ownerId || e.ownerId].filter(Boolean), dueDate: d.dueDate || null, area: '', desc: [e.location ? L('الموقع: ', 'Location: ') + e.location : '', e.notes || ''].filter(Boolean).join('\n'), okEnq: e.id, okState: 'active', okNtp: d.ntp || null, status: 'active', createdAt: nowISO(), createdBy: S.session && S.session.id };
          await Store.save('projects', p); if (typeof stuEnsureBoards === 'function') { try { await stuEnsureBoards(pid); } catch (x) { /* later */ } }
          await enqLog(e, L(`اتحوّل لمشروع ${p.code}`, `Became project ${p.code}`), { stage: 'won', projectId: pid, wonAt: nowISO() });
          toast(L('اتعمل المشروع', 'Project created')); go('projects/' + pid); return true;
        } });
    }
  });
  const hookEnq = () => {
    if (typeof EXTRA_VIEWS !== 'object' || EXTRA_VIEWS.enquiries) return;
    EXTRA_VIEWS.enquiries = () => enqPage();
    if (typeof EXTRA_TITLES === 'object') EXTRA_TITLES.enquiries = () => ({ title: L('الفرص والعروض', 'Enquiries & proposals'), sub: L('من أول طلب العميل لحد التعاقد — وبعدها يبقى مشروع', 'From the first enquiry to the contract — then it becomes a project') });
    if (typeof VIEW_TITLES === 'object') VIEW_TITLES.enquiries = 'الفرص والعروض';
    if (Array.isArray(NAV) && !NAV.some(n => n.id === 'enquiries')) { const at = NAV.findIndex(n => n.id === 'projects'); NAV.splice(at >= 0 ? at : 1, 0, { id: 'enquiries', label: 'الفرص والعروض', short: 'الفرص', icon: 'quote', count: () => (enqVis() ? enqs().filter(late).length : 0), countCls: 'warn' }); }
    if (typeof ROLE_VIEWS === 'object') Object.keys(ROLE_VIEWS).forEach(r => { if (Array.isArray(ROLE_VIEWS[r]) && !ROLE_VIEWS[r].includes('enquiries')) ROLE_VIEWS[r] = ROLE_VIEWS[r].concat(['enquiries']); });
    if (typeof canSee === 'function') canSee = (base => function (v) { if (v === 'enquiries') return enqVis(); return base.apply(this, arguments); })(canSee);
  };
  hookEnq(); document.addEventListener('nf:ready', hookEnq);
  if (typeof OEKO_I18N === 'object') Object.assign(OEKO_I18N, { 'الفرص والعروض': 'Enquiries & proposals', 'الفرص': 'Enquiries' });

  /* ==================================================================== B) THE PROJECT PIPELINE CARD */
  const SETUP0 = [['كود المشروع وهيكل الملفات بتسمية ISO 19650 (المشروع-المرحلة-النوع-الرقم-النسخة)', 'Project code and folder structure, ISO 19650 naming (project-stage-type-number-revision)'], ['Project Owner والفريق واللقب لكل واحد', 'Project Owner, team and role of each'], ['خطة المراحل والمواعيد (D-2 داخلي · D-1 أقصى · موعد العميل ثابت)', 'Stage plan and dates (internal D-2 · maximum D-1 · fixed client deadline)'], ['Scope matrix: المخرجات المتعاقد عليها لكل مرحلة', 'Scope matrix: contracted deliverables per stage'], ['Kick-off داخلي (الفريق)', 'Internal kick-off (team)'], ['Kick-off مع العميل (جهات الاتصال · طريقة التسليم · دورة المراجعة)', 'Client kick-off (contacts · submission channel · review cycle)'], ['استلام الداتا: المساحي · التربة · المخططات المعمارية · البنية التحتية', 'Data received: survey · soil · architectural drawings · infrastructure']];
  const CLOSE0 = [['Practical Completion / محضر استلام ابتدائي', 'Practical completion certificate'], ['As-built drawings مستلمة ومراجعة', 'As-built drawings received and checked'], ['دليل التشغيل والصيانة: الري · النباتات · الصيانة الموسمية', 'O&M manual: irrigation · planting · seasonal maintenance'], ['بداية فترة الضمان (Defects Liability Period)', 'Defects liability period started'], ['إقفال ملاحظات الضمان / الاستلام النهائي', 'Defects closed / final handover'], ['Lessons learned مع الفريق', 'Lessons learned with the team'], ['أرشفة الملفات وإقفال المشروع', 'Files archived and project closed'], ['إضافة المشروع لمعرض المشاريع', 'Added to the projects gallery']];
  const SETUPI = () => (S.settings && Array.isArray(S.settings.okSetupItems) && S.settings.okSetupItems.length ? S.settings.okSetupItems : SETUP0);
  const CLOSEI = () => (S.settings && Array.isArray(S.settings.okCloseItems) && S.settings.okCloseItems.length ? S.settings.okCloseItems : CLOSE0);
  const SUBK = { sub: ['اتسلّم للعميل', 'Submitted to client', 'b'], cmt: ['تعليقات العميل وصلت', 'Client comments received', 'y'], res: ['رد المكتب على التعليقات', 'Response sheet sent', 'b'], app: ['اعتماد العميل', 'Client approval', 'g'], rej: ['مرفوض — إعادة تقديم', 'Rejected — resubmit', 'r'] };
  const SITE = { visits: ['زيارات الموقع', 'Site visits'], subm: ['Shop drawings & Material submittals', 'Shop drawings & material submittals'], rfis: ['RFIs', 'RFIs'], instr: ['تعليمات الموقع', 'Site instructions'], vars: ['التعديلات (Variations)', 'Variations'], snags: ['ملاحظات التسليم (Snag list)', 'Snag list'] };
  const SUBST = { sub: ['مقدَّم', 'Submitted', 'b'], appr: ['معتمد', 'Approved', 'g'], noted: ['معتمد بملاحظات', 'Approved as noted', 'g'], rev: ['يُعاد تقديمه', 'Revise & resubmit', 'y'], rej: ['مرفوض', 'Rejected', 'r'] };
  const OPEN = { open: ['مفتوح', 'Open', 'y'], closed: ['مقفول', 'Closed', 'g'] };
  const LOGS = { decisions: ['القرارات', 'Decisions'], changes: ['التعديلات على النطاق (Change control)', 'Change control'], risks: ['المخاطر', 'Risks'] };
  const TABS = ['setup', 'client', 'site', 'close', 'logs'];
  const TABL = { setup: ['التجهيز', 'Setup'], client: ['العميل', 'Client'], site: ['الموقع', 'Site'], close: ['الإقفال', 'Close-out'], logs: ['السجلات', 'Logs'] };
  let tab = 'setup'; try { tab = localStorage.getItem('ok.ftab') || 'setup'; } catch (e) { /* */ }
  const ck = (p, key, items, idxs, can) => items.map((it, i) => `<label class="okck ${idxs.includes(i) ? 'done' : ''}"><input type="checkbox" data-okck="${p.id}:${key}:${i}" ${idxs.includes(i) ? 'checked' : ''} ${can ? '' : 'disabled'}><span>${esc(L(it[0], it[1]))}</span></label>`).join('');
  const pill = (k, map) => { const m = map[k]; return m ? `<span class="okpill ${m[2]}">${esc(L(m[0], m[1]))}</span>` : ''; };
  const addBtn = (p, kind, can) => (can ? `<button type="button" class="btn sm ghost" data-okadd="${p.id}:${kind}">${icon('plus')}<span>${esc(L('إضافة', 'Add'))}</span></button>` : '');
  const tabSetup = (p, can) => { const d = p.okSetup || []; return `<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:6px"><b class="small">${d.length}/${SETUPI().length}</b>${p.okNtp ? `<span class="okpill b">NTP · ${d10(p.okNtp)}</span>` : ''}${p.okKick && p.okKick.internal ? `<span class="okpill">${esc(L('Kick-off داخلي', 'Internal kick-off'))} · ${d10(p.okKick.internal)}</span>` : ''}${p.okKick && p.okKick.client ? `<span class="okpill">${esc(L('Kick-off العميل', 'Client kick-off'))} · ${d10(p.okKick.client)}</span>` : ''}<div class="grow"></div>${can ? `<button type="button" class="btn sm ghost" data-okadd="${p.id}:kick">${icon('calendar')}<span>${esc(L('التواريخ', 'Dates'))}</span></button>` : ''}</div>${ck(p, 'okSetup', SETUPI(), d, can)}`; };
  const tabClient = (p, can) => { const S2 = p.okSub || {}; const cur = stageIdx(p); return `<div class="okgrid">${PIPE.map((s, i) => { const ev = (S2[s.id] && S2[s.id].events) || []; const last = ev[ev.length - 1]; return `<div class="okst2 ${i === cur ? 'cur' : ''}"><b>${esc(L(s.ar, s.name))}</b>${last ? `${pill(last.k, SUBK)}<small>${d10(last.at)}${last.rev ? ' · Rev ' + esc(last.rev) : ''}${last.note ? ' · ' + esc(last.note) : ''}</small>` : `<small>${esc(L('لسه ماتقدّمش', 'Not submitted yet'))}</small>`}${ev.length > 1 ? `<details><summary class="tiny muted">${esc(L('كل الحركات', 'All events'))} · ${ev.length}</summary>${ev.slice().reverse().map(x => `<div class="tiny" style="padding:3px 0">${d10(x.at)} · ${esc(L(SUBK[x.k][0], SUBK[x.k][1]))}${x.rev ? ' · Rev ' + esc(x.rev) : ''}${x.note ? ' — ' + esc(x.note) : ''}</div>`).join('')}</details>` : ''}${can ? `<button type="button" class="btn sm ghost" data-okadd="${p.id}:sub:${s.id}">${icon('plus')}<span>${esc(L('حركة', 'Record'))}</span></button>` : ''}</div>`; }).join('')}</div>`; };
  const siteRow = (kind, x, p, can) => {
    const st = kind === 'subm' ? pill(x.status, SUBST) : kind === 'visits' ? '' : pill(x.status || 'open', OPEN);
    const main = kind === 'visits' ? `<b>${d10(x.at)}</b><span>${esc(x.by || '')}</span><span class="muted">${esc(x.text || '')}</span>` : `<b>${esc(x.no || '')}</b><span>${esc(x.text || '')}</span><span class="muted">${x.rev ? 'Rev ' + esc(x.rev) + ' · ' : ''}${d10(x.at)}${x.by ? ' · ' + esc(x.by) : ''}</span>`;
    const cyc = can && kind !== 'visits' ? `<button type="button" class="btn sm ghost" data-okcyc="${p.id}:${kind}:${x.id}" title="${esc(L('غيّر الحالة', 'Change status'))}">${icon('edit')}</button>` : '';
    return `<div class="okrow">${main}<div class="grow"></div>${st}${cyc}</div>`;
  };
  const tabSite = (p, can, team) => {
    if (p.okSiteOn === false) return `<div class="okempty">${esc(L('الإشراف على الموقع مقفول للمشروع ده.', 'Site supervision is switched off for this project.'))} ${canEdit(p) ? `<button type="button" class="btn sm ghost" data-oksite="${p.id}:1">${esc(L('فعّله', 'Switch on'))}</button>` : ''}</div>`;
    const d = p.okSite || {}; return `<div class="row" style="justify-content:flex-end">${canEdit(p) ? `<button type="button" class="btn sm ghost" data-oksite="${p.id}:0">${esc(L('اقفل الإشراف للمشروع ده', 'Switch site supervision off'))}</button>` : ''}</div>` + Object.keys(SITE).map(k => { const xs = (d[k] || []).slice().sort((a, b) => String(b.at || '').localeCompare(String(a.at || ''))); const open = k === 'visits' ? xs.length : k === 'subm' ? xs.filter(x => ['sub', 'rev'].includes(x.status)).length : xs.filter(x => (x.status || 'open') === 'open').length; return `<div class="oksec"><h4>${esc(L(SITE[k][0], SITE[k][1]))}<span class="n">${xs.length}</span>${k !== 'visits' && open ? `<span class="okpill y">${open} ${esc(L('مفتوح', 'open'))}</span>` : ''}<div class="grow"></div>${addBtn(p, k, team)}</h4>${xs.length ? `<details ${open || k === 'visits' ? 'open' : ''}><summary class="tiny muted">${esc(L('القائمة', 'List'))}</summary>${xs.slice(0, 50).map(x => siteRow(k, x, p, team)).join('')}</details>` : `<div class="okempty">—</div>`}</div>`; }).join('');
  };
  const tabClose = (p, can) => { const d = p.okClose || []; const dlp = p.okDlp || {}; return `<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:6px"><b class="small">${d.length}/${CLOSEI().length}</b>${dlp.start ? `<span class="okpill">DLP · ${d10(dlp.start)} → ${d10(dlp.end)}</span>` : ''}<div class="grow"></div>${can ? `<button type="button" class="btn sm ghost" data-okadd="${p.id}:dlp">${icon('calendar')}<span>${esc(L('فترة الضمان', 'Defects period'))}</span></button><button type="button" class="btn sm ghost" data-okadd="${p.id}:lessons">${icon('edit')}<span>Lessons learned</span></button>` : ''}<a class="btn sm ghost" href="#/portfolio">${esc(L('معرض المشاريع', 'Projects gallery'))}</a></div>${ck(p, 'okClose', CLOSEI(), d, can)}${p.okLessons ? `<div class="oksec"><h4>Lessons learned</h4><p class="small" style="white-space:pre-wrap;margin:6px 0 0">${esc(p.okLessons)}</p></div>` : ''}`; };
  const tabLogs = (p, team) => { const d = p.okLogs || {}; return Object.keys(LOGS).map(k => { const xs = (d[k] || []).slice().reverse(); return `<div class="oksec"><h4>${esc(L(LOGS[k][0], LOGS[k][1]))}<span class="n">${xs.length}</span><div class="grow"></div>${addBtn(p, k, team)}</h4>${xs.length ? xs.map(x => `<div class="okrow"><span>${esc(x.text)}</span><div class="grow"></div>${k === 'risks' ? pill(x.status || 'open', OPEN) + (team ? `<button type="button" class="btn sm ghost" data-okcyc="${p.id}:${k}:${x.id}">${icon('edit')}</button>` : '') : ''}<span class="muted">${d10(x.at)} · ${esc(x.by || '')}</span></div>`).join('') : `<div class="okempty">—</div>`}</div>`; }).join(''); };
  const flowHTML = p => {
    const can = canEdit(p), team = onTeam(p);
    const cnt = { setup: `${(p.okSetup || []).length}/${SETUPI().length}`, client: String(Object.values(p.okSub || {}).filter(x => (x.events || []).some(e => e.k === 'app')).length) + '/' + PIPE.length, site: p.okSiteOn === false ? 'off' : String(Object.values(p.okSite || {}).reduce((n, a) => n + (a || []).length, 0)), close: `${(p.okClose || []).length}/${CLOSEI().length}`, logs: String(Object.values(p.okLogs || {}).reduce((n, a) => n + (a || []).length, 0)) };
    const body = tab === 'setup' ? tabSetup(p, can) : tab === 'client' ? tabClient(p, can) : tab === 'site' ? tabSite(p, can, team) : tab === 'close' ? tabClose(p, can) : tabLogs(p, team);
    return `<div class="okflow" data-pid="${p.id}"><div class="okfh"><b>${esc(L('بايب لاين المشروع', 'Project pipeline'))}</b><small class="muted">RIBA 2020 · ISO 9001 · ISO 19650 · FIDIC</small>${p.okEnq ? `<span class="okpill b">${esc(L('من الفرص', 'From enquiries'))}</span>` : ''}</div>
      <div class="oktabs">${TABS.map(t => `<button type="button" data-oktab="${t}" class="${tab === t ? 'on' : ''}">${esc(L(TABL[t][0], TABL[t][1]))}<i>${cnt[t]}</i></button>`).join('')}</div><div class="okfb">${body}</div></div>`;
  };
  /* ---- C) the stage gate button on the stage-steps card */
  const gateBtn = p => {
    const i = stageIdx(p); const st = PIPE[i]; if (!st || i >= PIPE.length - 1) return '';
    const done = ((p.okSteps || {})[st.id] || []).length, n = st.items.length; const g = (p.okGates || {})[st.id];
    if (!canEdit(p)) return g ? `<span class="okgatebtn small muted">${esc(L('اعتمد', 'Approved'))} · ${esc(g.by || '')} · ${d10(g.at)}</span>` : '';
    return `<button type="button" class="btn sm ${done === n ? 'p' : 'ghost'} okgatebtn" data-okgate="${p.id}">${icon('check')}<span>${esc(L('اعتماد البوابة ← ', 'Approve gate → '))}${esc(L(PIPE[i + 1].ar, PIPE[i + 1].name))}</span></button>`;
  };
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => {
    if (!(S.route && S.route.view === 'projects' && S.route.id)) return; const p = byId('projects', S.route.id); if (!p) return;
    const pipe = document.querySelector('.okpipe'); if (!pipe) return;
    const head = pipe.querySelector('.okph'); if (head && !head.querySelector('.okgatebtn')) head.insertAdjacentHTML('beforeend', gateBtn(p));
    const old = pipe.parentElement.querySelector('.okflow'); const html = flowHTML(p);
    if (!old) pipe.insertAdjacentHTML('afterend', html); else if (old.dataset.sig !== html.length + ':' + tab + ':' + (p.updatedAt || '')) { old.outerHTML = html; }
    const el = pipe.parentElement.querySelector('.okflow'); if (el) el.dataset.sig = html.length + ':' + tab + ':' + (p.updatedAt || '');
  });
  const field2 = (l, i) => `<div class="field full"><label>${esc(l)}</label>${i}</div>`;
  document.addEventListener('click', async ev => {
    const t = ev.target.closest && ev.target.closest('[data-oktab],[data-okadd],[data-okcyc],[data-oksite],[data-okgate]'); if (!t) return;
    if (t.dataset.oktab) { tab = t.dataset.oktab; try { localStorage.setItem('ok.ftab', tab); } catch (e) { /* */ } const card = t.closest('.okflow'); const p = byId('projects', card && card.dataset.pid); if (p) card.outerHTML = flowHTML(p); return; }
    if (t.dataset.oksite) { const [pid, on] = t.dataset.oksite.split(':'); const p = byId('projects', pid); if (!p || !canEdit(p)) return; await up(pid, { okSiteOn: on === '1' }); return; }
    if (t.dataset.okgate) {
      const p = byId('projects', t.dataset.okgate); if (!p || !canEdit(p)) return; const i = stageIdx(p); const st = PIPE[i], nx = PIPE[i + 1]; if (!nx) return;
      const done = ((p.okSteps || {})[st.id] || []).length, n = st.items.length;
      openModal({ title: L(`اعتماد بوابة «${st.ar}»`, `Approve the «${st.name}» gate`), submitLabel: L('اعتمد وانقل المرحلة', 'Approve and move on'),
        body: `<div class="form"><div class="full small">${done === n ? `✅ ${esc(L('كل خطوات المرحلة متعلّمة', 'All stage steps are ticked'))}` : `⚠️ ${esc(L(`${n - done} خطوة لسه ماتعلمتش — تقدر تعتمد مع كتابة السبب`, `${n - done} step(s) not ticked — you can still approve with a reason`))}`}</div>${field2(L('ملاحظة الاعتماد', 'Approval note'), `<input name="note" maxlength="200" dir="auto" ${done === n ? '' : 'required'}>`)}<div class="full small muted">${esc(L('المرحلة الجاية: ', 'Next stage: '))}<b>${esc(L(nx.ar, nx.name))}</b> · ${esc(L('البوابة: ', 'Gate: '))}${esc(L(nx.gate[0], nx.gate[1]))}</div></div>`,
        onSubmit: async f => { const note = f.querySelector('[name=note]').value.trim(); if (done !== n && !note) { toast(L('اكتب السبب', 'Write the reason'), 'err'); return false; }
          const okGates = Object.assign({}, p.okGates || {}, { [st.id]: { by: myName(), byId: me(), at: nowISO(), note, steps: `${done}/${n}` } });
          await up(p.id, { okGates, stage: nx.id, osStatus: nx.id, osStatusAt: Object.assign({}, p.osStatusAt || {}, { [nx.id]: nowISO() }), stageAt: Object.assign({}, p.stageAt || {}, { [nx.id]: nowISO() }) });
          toast(L(`اتعتمدت — المشروع في «${nx.ar}»`, `Approved — the project is now in «${nx.name}»`)); return true; } });
      return;
    }
    if (t.dataset.okcyc) {
      const [pid, kind, id] = t.dataset.okcyc.split(':'); const p = byId('projects', pid); if (!p || !onTeam(p)) return;
      const isLog = kind in LOGS; const arr = ((isLog ? p.okLogs : p.okSite) || {})[kind] || []; const x = arr.find(y => y.id === id); if (!x) return;
      const order = kind === 'subm' ? ['sub', 'appr', 'noted', 'rev', 'rej'] : ['open', 'closed']; const cur = x.status || order[0]; x.status = order[(order.indexOf(cur) + 1) % order.length]; x.statusAt = nowISO();
      await up(pid, isLog ? { okLogs: Object.assign({}, p.okLogs || {}, { [kind]: arr }) } : { okSite: Object.assign({}, p.okSite || {}, { [kind]: arr }) }); return;
    }
    if (t.dataset.okadd) {
      const [pid, kind, sid] = t.dataset.okadd.split(':'); const p = byId('projects', pid); if (!p) return;
      if (kind === 'kick') { if (!canEdit(p)) return; const k = p.okKick || {}; openModal({ title: L('تواريخ التجهيز', 'Setup dates'), body: `<div class="form">${field(L('تاريخ التعاقد / NTP', 'Contract / NTP'), inp('ntp', p.okNtp || '', 'type="date"'))}${field(L('Kick-off داخلي', 'Internal kick-off'), inp('internal', k.internal || '', 'type="date"'))}${field(L('Kick-off مع العميل', 'Client kick-off'), inp('client', k.client || '', 'type="date"'))}</div>`, onSubmit: async f => { const d = formData(f); await up(pid, { okNtp: d.ntp || null, okKick: { internal: d.internal || null, client: d.client || null } }); return true; } }); return; }
      if (kind === 'dlp') { if (!canEdit(p)) return; const d0 = p.okDlp || {}; openModal({ title: L('فترة الضمان (Defects Liability Period)', 'Defects liability period'), body: `<div class="form">${field(L('من', 'From'), inp('start', d0.start || '', 'type="date"'))}${field(L('إلى', 'To'), inp('end', d0.end || '', 'type="date"'))}</div>`, onSubmit: async f => { const d = formData(f); await up(pid, { okDlp: { start: d.start || null, end: d.end || null } }); return true; } }); return; }
      if (kind === 'lessons') { if (!canEdit(p)) return; openModal({ title: 'Lessons learned', body: `<div class="form">${field2(L('إيه اللي نعمله أحسن المرة الجاية؟', 'What do we do better next time?'), `<textarea name="t" rows="6">${esc(p.okLessons || '')}</textarea>`)}</div>`, onSubmit: async f => { await up(pid, { okLessons: f.querySelector('[name=t]').value.trim() }); return true; } }); return; }
      if (kind === 'sub') { if (!canEdit(p)) return; const st = PIPE.find(s => s.id === sid); openModal({ title: L(`حركة مع العميل — ${st.ar}`, `Client event — ${st.name}`), body: `<div class="form">${field(L('النوع', 'Event'), `<select name="k">${Object.keys(SUBK).map(k => `<option value="${k}">${esc(L(SUBK[k][0], SUBK[k][1]))}</option>`).join('')}</select>`)}${field(L('التاريخ', 'Date'), inp('at', todayISO(), 'type="date"'))}${field(L('النسخة (Rev)', 'Revision'), inp('rev', '', 'class="ltr" maxlength="10"'))}${field2(L('ملاحظة', 'Note'), `<input name="note" maxlength="200" dir="auto">`)}</div>`, onSubmit: async f => { const d = formData(f); const S2 = Object.assign({}, p.okSub || {}); const cur = Object.assign({ events: [] }, S2[sid] || {}); cur.events = (cur.events || []).concat([{ k: d.k, at: d.at, rev: d.rev, note: d.note, by: myName() }]); S2[sid] = cur; await up(pid, { okSub: S2 }); return true; } }); return; }
      if (kind in SITE) { if (!onTeam(p) || p.okSiteOn === false) return; const d0 = (p.okSite || {})[kind] || []; const no = kind === 'visits' ? '' : `${{ subm: 'SUB', rfis: 'RFI', instr: 'SI', vars: 'VO', snags: 'SN' }[kind]}-${String(d0.length + 1).padStart(3, '0')}`;
        openModal({ title: L(SITE[kind][0], SITE[kind][1]), body: `<div class="form">${kind === 'visits' ? '' : field(L('الرقم', 'No.'), inp('no', no, 'class="ltr"'))}${field(L('التاريخ', 'Date'), inp('at', todayISO(), 'type="date"'))}${kind === 'subm' ? field(L('النوع', 'Type'), `<select name="t"><option value="shop">Shop drawing</option><option value="mat">Material</option></select>`) + field('Rev', inp('rev', '0', 'class="ltr" maxlength="10"')) : ''}${field2(kind === 'visits' ? L('تقرير الزيارة (ملاحظات · اللي اتعمل · اللي مطلوب)', 'Visit report (observations · done · required)') : L('الموضوع', 'Subject'), `<textarea name="text" rows="${kind === 'visits' ? 5 : 2}" required></textarea>`)}</div>`,
          onSubmit: async f => { const d = formData(f); if (!d.text) return false; const row = { id: uid(), no: d.no, at: d.at, text: d.text, by: myName(), byId: me(), rev: d.rev, type: d.t, status: kind === 'subm' ? 'sub' : kind === 'visits' ? undefined : 'open' }; await up(pid, { okSite: Object.assign({}, p.okSite || {}, { [kind]: d0.concat([row]) }) }); return true; } }); return; }
      if (kind in LOGS) { if (!onTeam(p)) return; const d0 = (p.okLogs || {})[kind] || []; openModal({ title: L(LOGS[kind][0], LOGS[kind][1]), body: `<div class="form">${field2(L('النص', 'Text'), `<textarea name="text" rows="3" required></textarea>`)}${field(L('التاريخ', 'Date'), inp('at', todayISO(), 'type="date"'))}</div>`, onSubmit: async f => { const d = formData(f); if (!d.text) return false; await up(pid, { okLogs: Object.assign({}, p.okLogs || {}, { [kind]: d0.concat([{ id: uid(), text: d.text, at: d.at, by: myName(), byId: me(), status: kind === 'risks' ? 'open' : undefined }]) }) }); return true; } }); return; }
    }
  });
  document.addEventListener('change', async ev => {
    const el = ev.target.closest && ev.target.closest('[data-okck]'); if (!el) return;
    const [pid, key, idx] = el.dataset.okck.split(':'); const p = byId('projects', pid); if (!p || !canEdit(p)) { el.checked = !el.checked; return; }
    const cur = new Set(p[key] || []); if (el.checked) cur.add(+idx); else cur.delete(+idx);
    await up(pid, { [key]: Array.from(cur).sort((a, b) => a - b) });
  });
  window.okFlow = { ESTAGES, SETUP0, CLOSE0, SITE, LOGS };
})();

/* =====================================================================
   Ökoplan — Pipeline editor (Mahmoud, 15 Oct): the office changes its own pipeline — add / remove / rename / reorder stages and
   their steps, the setup checklist and the close-out checklist — from one page (#/okpipeedit), no code. For the owner and the
   managers (Dr. Tarek, Mahmoud, Rawan) until the way of working settles. Saved in settings (okPipeline · okSetupItems · okCloseItems);
   every project reads the live version. A stage that still has projects in it cannot be deleted. «Reset» brings the Ökoplan default back.
   ===================================================================== */
(() => {
  if (window.__OK_PIPEEDIT__) return; window.__OK_PIPEEDIT__ = 1;
  const en = () => typeof I18N !== 'undefined' && I18N.lang === 'en';
  const L = (a, b) => (en() ? b : a);
  const canEd = () => !!S.session && (isAdmin() || role() === 'manager');
  const DEF = () => window.OEKO_PIPELINE_DEFAULT || [];
  const cur = () => JSON.parse(JSON.stringify((S.settings && Array.isArray(S.settings.okPipeline) && S.settings.okPipeline.length) ? S.settings.okPipeline : DEF()));
  const F = window.okFlow || {};
  const curSetup = () => JSON.parse(JSON.stringify((S.settings && Array.isArray(S.settings.okSetupItems) && S.settings.okSetupItems.length) ? S.settings.okSetupItems : (F.SETUP0 || [])));
  const curClose = () => JSON.parse(JSON.stringify((S.settings && Array.isArray(S.settings.okCloseItems) && S.settings.okCloseItems.length) ? S.settings.okCloseItems : (F.CLOSE0 || [])));
  let draft = null, dSetup = null, dClose = null, dirty = false;
  const load = () => { draft = cur(); dSetup = curSetup(); dClose = curClose(); dirty = false; };
  const inUse = id => list('projects').filter(p => p.status !== 'archived' && (p.osStatus || p.stage) === id).length;
  document.head.insertAdjacentHTML('beforeend', `<style>
.okpe .okpes{border:1px solid var(--line);border-radius:14px;background:var(--surface);margin-bottom:12px;overflow:hidden}
.okpe .okpeh{display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--surface-2);border-bottom:1px solid var(--line);flex-wrap:wrap}
.okpe .okpeh .num{width:26px;height:26px;border-radius:50%;background:var(--ink);color:var(--surface);display:grid;place-items:center;font-size:12px;font-weight:700;flex:none}
.okpe .okpeh input{height:32px;border:1px solid var(--line);border-radius:8px;padding:0 10px;background:var(--surface);color:var(--ink);font:inherit;font-size:13px;min-width:0}
.okpe .okpeh .nm{flex:2 1 220px;font-weight:600}.okpe .okpeh .ar{flex:2 1 200px}.okpe .okpeh .sm{flex:0 1 110px}.okpe .okpeh .gt{flex:1 1 170px}
.okpe .okpeb{padding:6px 12px 10px}
.okpe .okper{display:flex;align-items:center;gap:6px;padding:4px 0}.okpe .okper input{flex:1;height:30px;border:1px solid var(--line);border-radius:8px;padding:0 10px;background:var(--surface);color:var(--ink);font:inherit;font-size:13px;min-width:0}
.okpe .okper .ix{width:22px;color:var(--muted);font-size:11.5px;text-align:center;flex:none}
.okpe .okib{width:28px;height:28px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--muted);display:grid;place-items:center;cursor:pointer;font-size:13px;flex:none;line-height:1}.okpe .okib:hover{color:var(--ink);border-color:var(--ink)}.okpe .okib.del:hover{color:#b91c1c;border-color:#b91c1c}
.okpe .okadd{margin-top:6px}
.okpe .okpebar{position:sticky;bottom:0;background:var(--surface);border-top:1px solid var(--line);padding:10px 12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:0 -12px -12px;border-radius:0 0 var(--radius) var(--radius)}
.okpe .okhint{font-size:12.5px;color:var(--muted);margin:0 0 10px}
.okpe .okused{font-size:11.5px;color:var(--muted)}
@media (max-width:700px){.okpe .okpeh .sm{flex-basis:46%}.okpe .okpeh .gt{flex-basis:100%}}
</style>`);
  const stepRow = (si, i, it) => `<div class="okper" data-step="${si}:${i}"><span class="ix">${i + 1}</span><input data-f="ar" value="${esc(it[0] || '')}" placeholder="${esc(L('الخطوة بالعربي', 'Step in Arabic'))}" dir="rtl"><input data-f="en" value="${esc(it[1] || '')}" placeholder="Step in English" dir="ltr"><button type="button" class="okib" data-pe="sup:${si}:${i}" title="↑">↑</button><button type="button" class="okib" data-pe="sdown:${si}:${i}" title="↓">↓</button><button type="button" class="okib del" data-pe="sdel:${si}:${i}" title="${esc(L('حذف', 'Delete'))}">✕</button></div>`;
  const stageCard = (st, si) => { const used = inUse(st.id); return `<div class="okpes" data-stage="${si}"><div class="okpeh"><span class="num">${si + 1}</span>
      <input class="nm" data-f="name" value="${esc(st.name || '')}" placeholder="Stage name (English)" dir="ltr"><input class="ar" data-f="ar" value="${esc(st.ar || '')}" placeholder="${esc(L('اسم المرحلة بالعربي', 'Stage name in Arabic'))}" dir="rtl">
      <input class="sm" data-f="riba" value="${esc(st.riba || '')}" placeholder="RIBA 2" dir="ltr"><input class="sm" data-f="pct" type="number" min="0" max="100" value="${esc(st.pct ?? 0)}" title="${esc(L('وزن المرحلة % (للتقدم)', 'Stage weight % (progress)'))}">
      <input class="gt" data-f="gate_ar" value="${esc((st.gate || [])[0] || '')}" placeholder="${esc(L('بوابة الاعتماد (عربي)', 'Approval gate (Arabic)'))}" dir="rtl"><input class="gt" data-f="gate_en" value="${esc((st.gate || [])[1] || '')}" placeholder="Approval gate (English)" dir="ltr">
      <span class="okused">${used ? esc(L(`${used} مشروع في المرحلة دي`, `${used} project(s) in this stage`)) : ''}</span>
      <span class="grow"></span><button type="button" class="okib" data-pe="up:${si}" title="↑">↑</button><button type="button" class="okib" data-pe="down:${si}" title="↓">↓</button><button type="button" class="okib del" data-pe="del:${si}" title="${esc(L('حذف المرحلة', 'Delete stage'))}" ${used ? 'disabled' : ''}>✕</button></div>
      <div class="okpeb">${(st.items || []).map((it, i) => stepRow(si, i, it)).join('')}<button type="button" class="btn sm ghost okadd" data-pe="sadd:${si}">${icon('plus')}<span>${esc(L('خطوة', 'Step'))}</span></button></div></div>`; };
  const listCard = (key, title, items) => `<div class="okpes" data-list="${key}"><div class="okpeh"><b>${esc(title)}</b><span class="grow"></span><span class="okused">${items.length}</span></div><div class="okpeb">${items.map((it, i) => `<div class="okper" data-li="${key}:${i}"><span class="ix">${i + 1}</span><input data-f="ar" value="${esc(it[0] || '')}" dir="rtl"><input data-f="en" value="${esc(it[1] || '')}" dir="ltr"><button type="button" class="okib" data-pe="lup:${key}:${i}">↑</button><button type="button" class="okib" data-pe="ldown:${key}:${i}">↓</button><button type="button" class="okib del" data-pe="ldel:${key}:${i}">✕</button></div>`).join('')}<button type="button" class="btn sm ghost okadd" data-pe="ladd:${key}">${icon('plus')}<span>${esc(L('بند', 'Item'))}</span></button></div></div>`;
  const page = () => {
    if (!canEd()) return `<div class="banner warn">${esc(L('الصفحة دي للمالك والمديرين', 'This page is for the owner and the managers'))}</div>`;
    if (!draft) load(); else if (document.querySelector('.okpe')) pull(); /* a re-render must not lose what is being typed */
    const custom = !!(S.settings && Array.isArray(S.settings.okPipeline) && S.settings.okPipeline.length);
    return `<div class="card okpe"><p class="okhint">${esc(L('عدّل المراحل وخطواتها زي ما المكتب شغّال فعلًا. التغيير بيظهر في كل المشاريع فورًا بعد الحفظ. المرحلة اللي فيها مشاريع ما تتمسحش — انقل مشاريعها الأول.', 'Edit the stages and their steps the way the office really works. Changes show on every project right after saving. A stage with projects in it cannot be deleted — move its projects first.'))} ${custom ? `<span class="okpill" style="border:1px solid var(--line);border-radius:999px;padding:2px 8px;font-size:11.5px">${esc(L('نسخة المكتب', 'Office version'))}</span>` : `<span class="okpill" style="border:1px solid var(--line);border-radius:999px;padding:2px 8px;font-size:11.5px">${esc(L('الافتراضي (RIBA)', 'Default (RIBA)'))}</span>`}</p>
      <h3 style="margin:0 0 8px;font-size:14px">${esc(L('مراحل المشروع وخطوات كل مرحلة', 'Project stages and their steps'))}</h3>
      ${draft.map(stageCard).join('')}<button type="button" class="btn ghost" data-pe="add">${icon('plus')}<span>${esc(L('مرحلة جديدة', 'New stage'))}</span></button>
      <h3 style="margin:18px 0 8px;font-size:14px">${esc(L('قوائم بايب لاين المشروع', 'Project pipeline checklists'))}</h3>
      ${listCard('setup', L('التجهيز (Setup)', 'Setup'), dSetup)}${listCard('close', L('الإقفال (Close-out)', 'Close-out'), dClose)}
      <div class="okpebar"><button type="button" class="btn p" data-pe="save">${icon('check')}<span>${esc(L('حفظ', 'Save'))}</span></button><button type="button" class="btn ghost" data-pe="reload">${esc(L('تراجع عن التعديلات', 'Discard changes'))}</button><span class="grow"></span><button type="button" class="btn ghost" data-pe="reset">${esc(L('رجّع الافتراضي (RIBA)', 'Reset to default (RIBA)'))}</button></div></div>`;
  };
  /* read what is typed back into the draft before any move / add / delete / save */
  const pull = () => {
    const v = document.getElementById('view'); if (!v) return;
    v.querySelectorAll('.okpes[data-stage]').forEach(card => { const si = +card.dataset.stage; const st = draft[si]; if (!st) return; const g = f => { const i = card.querySelector(`.okpeh [data-f="${f}"]`); return i ? i.value.trim() : ''; }; st.name = g('name'); st.ar = g('ar'); st.riba = g('riba'); st.pct = +g('pct') || 0; st.gate = [g('gate_ar'), g('gate_en')]; st.items = Array.from(card.querySelectorAll('.okper[data-step]')).map(r => [r.querySelector('[data-f=ar]').value.trim(), r.querySelector('[data-f=en]').value.trim()]); });
    const rd = key => Array.from(v.querySelectorAll(`.okpes[data-list="${key}"] .okper`)).map(r => [r.querySelector('[data-f=ar]').value.trim(), r.querySelector('[data-f=en]').value.trim()]);
    if (v.querySelector('.okpes[data-list="setup"]')) dSetup = rd('setup'); if (v.querySelector('.okpes[data-list="close"]')) dClose = rd('close');
  };
  const mv = (arr, i, d) => { const j = i + d; if (j < 0 || j >= arr.length) return; const t = arr[i]; arr[i] = arr[j]; arr[j] = t; };
  document.addEventListener('click', async ev => {
    const b = ev.target.closest && ev.target.closest('[data-pe]'); if (!b || !canEd() || !(S.route && S.route.view === 'okpipeedit')) return;
    const [op, a, c] = b.dataset.pe.split(':'); pull(); dirty = true;
    if (op === 'add') draft.push({ id: 'st_' + uid().slice(-6), name: 'New stage', ar: 'مرحلة جديدة', pct: 0, riba: '', gate: ['', ''], items: [] });
    if (op === 'del') { const st = draft[+a]; if (st && !inUse(st.id) && (await confirmDlg(L(`تمسح مرحلة «${st.ar || st.name}» وخطواتها؟`, `Delete the «${st.name || st.ar}» stage and its steps?`), L('امسح', 'Delete')))) draft.splice(+a, 1); }
    if (op === 'up') mv(draft, +a, -1); if (op === 'down') mv(draft, +a, 1);
    if (op === 'sadd') draft[+a].items.push(['', '']); if (op === 'sdel') draft[+a].items.splice(+c, 1); if (op === 'sup') mv(draft[+a].items, +c, -1); if (op === 'sdown') mv(draft[+a].items, +c, 1);
    const LST = a === 'setup' ? dSetup : dClose;
    if (op === 'ladd') LST.push(['', '']); if (op === 'ldel') LST.splice(+c, 1); if (op === 'lup') mv(LST, +c, -1); if (op === 'ldown') mv(LST, +c, 1);
    if (op === 'reload') { load(); toast(L('اترجعت للنسخة المحفوظة', 'Back to the saved version')); }
    if (op === 'reset') { if (!(await confirmDlg(L('ترجّع بايب لاين أوكوبلان الافتراضي (RIBA) وتشيل تعديلات المكتب؟ المشاريع مش هتتأثر — المراحل نفس الأكواد.', 'Reset to the default Ökoplan pipeline (RIBA) and drop the office edits? Projects are not affected — same stage ids.'), L('رجّع الافتراضي', 'Reset')))) { rerender(); return; } const s = Object.assign({}, S.settings); delete s.okPipeline; delete s.okSetupItems; delete s.okCloseItems; await Store.saveSettings(s); load(); toast(L('رجع الافتراضي', 'Default restored')); }
    if (op === 'save') {
      const clean = draft.map(st => Object.assign({}, st, { name: st.name || st.ar || 'Stage', ar: st.ar || st.name || 'مرحلة', items: (st.items || []).filter(it => it[0] || it[1]).map(it => [it[0] || it[1], it[1] || it[0]]) })).filter(st => st.name);
      if (!clean.length) { toast(L('لازم مرحلة واحدة على الأقل', 'At least one stage is needed'), 'err'); return; }
      const ids = new Set(); for (const st of clean) { if (ids.has(st.id)) { toast(L('مرحلتين بنفس الكود', 'Two stages share an id'), 'err'); return; } ids.add(st.id); }
      const setup = dSetup.filter(it => it[0] || it[1]).map(it => [it[0] || it[1], it[1] || it[0]]), close = dClose.filter(it => it[0] || it[1]).map(it => [it[0] || it[1], it[1] || it[0]]);
      await Store.saveSettings(Object.assign({}, S.settings, { okPipeline: clean, okSetupItems: setup, okCloseItems: close, okPipelineAt: nowISO(), okPipelineBy: (S.session && S.session.name) || '' }));
      try { window.okApplyPipeline(clean); } catch (e) { /* */ } load(); toast(L('اتحفظ — كل المشاريع بتقرا النسخة الجديدة', 'Saved — every project now reads the new version')); return;
    }
    rerender();
  });
  const hook = () => {
    if (typeof EXTRA_VIEWS !== 'object' || EXTRA_VIEWS.okpipeedit) return;
    EXTRA_VIEWS.okpipeedit = () => page();
    if (typeof EXTRA_TITLES === 'object') EXTRA_TITLES.okpipeedit = () => ({ title: L('تعديل البايب لاين', 'Pipeline editor'), sub: L('مراحل المكتب وخطواتها — تتعدّل من هنا من غير كود', 'The office stages and steps — edited here, no code'), actions: `<a class="btn ghost" href="#/projects">${icon('back')}<span>${esc(L('المشاريع', 'Projects'))}</span></a>` });
    if (typeof VIEW_TITLES === 'object') VIEW_TITLES.okpipeedit = 'تعديل البايب لاين';
    if (Array.isArray(NAV) && !NAV.some(n => n.id === 'okpipeedit')) { const at = NAV.findIndex(n => n.id === 'settings'); NAV.splice(at >= 0 ? at : NAV.length, 0, { id: 'okpipeedit', label: 'تعديل البايب لاين', short: 'البايب لاين', icon: 'settings' }); }
    if (typeof ROLE_VIEWS === 'object') ['admin', 'manager'].forEach(r => { if (Array.isArray(ROLE_VIEWS[r]) && !ROLE_VIEWS[r].includes('okpipeedit')) ROLE_VIEWS[r] = ROLE_VIEWS[r].concat(['okpipeedit']); });
    if (typeof canSee === 'function') canSee = (base => function (v) { if (v === 'okpipeedit') return canEd(); return base.apply(this, arguments); })(canSee);
  };
  hook(); document.addEventListener('nf:ready', hook);
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => { if (!(S.route && S.route.view === 'okpipeedit')) { draft = null; } });
  if (typeof OEKO_I18N === 'object') Object.assign(OEKO_I18N, { 'تعديل البايب لاين': 'Pipeline editor', 'البايب لاين': 'Pipeline' });
})();
