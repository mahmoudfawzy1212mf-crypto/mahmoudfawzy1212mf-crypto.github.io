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
:root{--accent:${C.teal};--accent-ink:#fff;--accent-soft:#e3f4f1;--accent-2:${C.blue};--primary:#1d3d36;--primary-ink:#fff;
  --good:${C.green};--good-soft:#edf7e2;--good-ink:#3f7a12;--lof:${C.green};--elm:${C.blue};--alu:${C.teal};
  --side-bg:#16302b;--side-ink:#d6e6e2;--side-muted:#8fb0a9;--side-on:#fff;--side-on-bg:linear-gradient(135deg,${C.green},${C.teal} 60%,${C.blue});
  --chart-grid:#e3e8e4;--chart-axis:#c2cbc5}
:root[data-theme="dark"]{--accent:#5fc4b8;--accent-ink:#06211d;--accent-soft:#143530;--good-ink:#9ad66a;--side-bg:#0d1a17;--side-on-bg:linear-gradient(135deg,${C.green2},${C.teal})}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--accent:#5fc4b8;--accent-ink:#06211d;--accent-soft:#143530;--good-ink:#9ad66a;--side-bg:#0d1a17}}
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
html.apple[data-theme="dark"] .side,html.apple[data-theme="dark"] .nhome .nside,html.apple:not([data-theme="light"]) .side{background:#0e1f1b!important}
html.apple[data-theme="dark"] .side .nav a.on{background:linear-gradient(135deg,#3ca13c,#38a599)!important;color:#fff!important}
html.apple[data-theme="dark"] .side .nav a.on svg{color:#fff!important}
html[data-theme="dark"] .tb-logo img,html[data-theme="dark"] .brand img{filter:none}
/* ---- the side bar's top block: logo · person · language/look · view-as/password/sign-out/guide — one width (the menu's), one rhythm ---- */
.side .brand,html.apple .side .brand{margin:8px 8px 2px!important;padding:6px 0 8px!important;border-bottom:0!important;display:flex;justify-content:center;align-items:center}
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
/* ---- day / night surfaces ---- */
html[data-theme="light"] body{background:#f3f7f5}
html[data-theme="light"] .topbar{background:#f3f7f5!important}
:root[data-theme="dark"]{--bg:#0b1513;--surface:#13201d;--surface-2:#1a2b27;--surface-3:#223732;--line:#223732;--line-2:#2f4740;--ink:#e9f1ee;--ink-2:#c0d1cb;--muted:#86a39b}
html[data-theme="dark"] body{background:#0b1513}
html[data-theme="dark"] .topbar{background:#0b1513!important}
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
      if (!saved) { s.shifts = clone(OEKO_DEFAULTS.shifts); s.leaveTypes = clone(OEKO_DEFAULTS.leaveTypes); s.policy = Object.assign({}, s.policy || {}, clone(OEKO_DEFAULTS.policy)); s.regulation = clone(OEKO_DEFAULTS.regulation); s.trades = OEKO_DEFAULTS.trades.slice(); s.company = NAME; s.brands = clone(OEKO_DEFAULTS.brands); s.stuLogin = Object.assign({}, clone(OEKO_DEFAULTS.stuLogin), s.stuLogin || {}); }
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
  if (typeof canSee === 'function') canSee = (base => view => (/^ninety/.test(String(view || '')) || view === 'door' ? false : base(view)))(canSee);
  if (Array.isArray(NAV)) for (let i = NAV.length - 1; i >= 0; i--) if (NAV[i].id === 'door') NAV.splice(i, 1);
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
  const STAGES = [
    { id: 'concept', name: 'Concept Design', ar: 'التصور المبدئي', pct: 15 },
    { id: 'schem', name: 'Schematic Design', ar: 'التصميم التمهيدي', pct: 20 },
    { id: 'dd', name: 'Design Development', ar: 'تطوير التصميم', pct: 25 },
    { id: 'tender', name: 'Tender / Detailed Drawings', ar: 'رسومات تنفيذية ومستندات طرح (سوفت سكيب · هارد سكيب · ري · إضاءة)', pct: 30 },
    { id: 'boq', name: 'BOQ & Specifications', ar: 'المقايسة والمواصفات', pct: 5 },
    { id: 'super', name: 'Site Supervision', ar: 'الإشراف على التنفيذ', pct: 5 },
  ];
  if (typeof DEFAULT_SETTINGS === 'object') DEFAULT_SETTINGS.pmStages = STAGES;
  if (typeof PM_STAGES !== 'undefined' && Array.isArray(PM_STAGES)) { PM_STAGES.length = 0; STAGES.forEach(s => PM_STAGES.push(s)); }
  if (typeof STU_STAGES !== 'undefined' && Array.isArray(STU_STAGES)) { STU_STAGES.length = 0; STAGES.forEach(s => STU_STAGES.push(s)); }

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
  window.OEKO_I18N = OEKO_I18N;
  const oekoI18nApply = () => { try { if (!I18N || !I18N.exact) return; const norm = typeof i18nNorm === 'function' ? i18nNorm : (x => String(x).trim()); Object.keys(OEKO_I18N).forEach(k => { I18N.exact.set(norm(k), OEKO_I18N[k]); }); } catch (e) { /* ignore */ } };
  if (typeof i18nCompile === 'function') i18nCompile = (base => function () { const r = base.apply(this, arguments); oekoI18nApply(); return r; })(i18nCompile);
  oekoI18nApply();
  /* every switch: the whole page re-renders in the chosen language (the engine re-renders; this covers texts painted outside render) */
  if (typeof i18nSet === 'function') i18nSet = (base => async function () { const r = await base.apply(this, arguments); oekoI18nApply(); try { if (typeof render === 'function') render(true); } catch (e) { /* ignore */ } return r; })(i18nSet);

  /* AI assistants talk about a landscape office */
  if (typeof aiInstructionsBase === 'function') aiInstructionsBase = (base => () => base().replace(/مكتب التصميم المعماري/g, 'مكتب تصميم اللاند سكيب والإشراف على التنفيذ').replace(/الإظهار المعماري/g, 'تصميم اللاند سكيب'))(aiInstructionsBase);
})();
