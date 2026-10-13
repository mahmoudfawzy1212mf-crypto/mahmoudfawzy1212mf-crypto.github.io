/* =====================================================================
   Ökoplan Landscaping — the home screen & the office profile (v1, 13 Oct 2026 — Mahmoud: «حط بيانات المكتب فوق والمشاريع تحتها ودلّع الدنيا»)
   Loaded after oekoplan.js. Everything here is the office's own content from the company profile:
   · home (every role): the project-photo slideshow (engine hero) → the office in numbers → your day →
     about the office (vision · values · services) → the partners strip (moving logos) → the projects with
     their data → awards · international collaborations → the engine's cards (notice / shot / pulse).
   · «شغل المكتب» (menu): the projects grid + a project page (data + photos + full-screen show).
   Photos: oekoplan/_src/portfolio/<project>/<n>.jpg (computer) · <n>-m.jpg (phone) · <n>-t.jpg (cards).
   Arabic + English (L()). No money anywhere.
   ===================================================================== */
(() => {
  const CFG = window.NF_CONFIG || {};
  if (CFG.brand !== 'oekoplan') return;
  if (window.__OEKO_HOME__) return; window.__OEKO_HOME__ = 1;
  const en = () => typeof I18N !== 'undefined' && I18N.lang === 'en';
  const L = (a, b) => (en() ? b : a);
  const BASE = (() => { try { const s = document.currentScript && document.currentScript.src; return s ? s.replace(/[^/]*$/, '') : './'; } catch (e) { return './'; } })();
  const SRC = BASE + '_src/';
  const E = s => (typeof esc === 'function' ? esc(s) : String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));

  /* ---------------------------------------------------------------- the content */
  const SCOPE = { concept: ['التصور المبدئي', 'Concept Design'], schem: ['التصميم التمهيدي', 'Schematic Design'], dd: ['تطوير التصميم', 'Design Development'], cd: ['الرسومات التنفيذية', 'Construction Drawings'], tender: ['مستندات الطرح', 'Tender Documents'], super: ['الإشراف على التنفيذ', 'Site Supervision'] };
  const CAT = { hotel: ['فنادق ومنتجعات', 'Hotels & Resorts'], res: ['سكني', 'Residential'], urban: ['تخطيط عمراني', 'Urban Planning'], com: ['تجاري وترفيهي', 'Retail & Entertainment'], edu: ['تعليمي وثقافي', 'Educational & Cultural'] };
  const PROJECTS = [
    { id: 'telal-alamein', n: 6, name: ['تلال العلمين', 'Telal El-Alamein'], loc: ['الساحل الشمالي', 'North Coast, Egypt'], client: ['رؤية للتنمية العقارية', 'Rooya for Real Estate Development'], year: 2013, cat: 'hotel', services: ['تصميم اللاند سكيب', 'Landscape Design'], scope: [], cover: 1, award: ['أفضل منتجع سياحي — Cityscape 2015', 'Cityscape Best Touristic Resort 2015'] },
    { id: 'rixos-seagate', n: 4, name: ['ريكسوس سي جيت', 'Rixos Sea Gate'], loc: ['شرم الشيخ', 'Sharm El-Sheikh, Egypt'], client: ['فنادق ريكسوس', 'Rixos Hotels'], year: 2015, cat: 'hotel', services: ['تصميم اللاند سكيب', 'Landscape Design'], scope: [], cover: 1 },
    { id: 'xanadu', n: 2, name: ['زانادو مكادي باي', 'Xanadu Makadi Bay'], loc: ['الغردقة', 'Hurghada, Egypt'], client: ['تيا مكادي', 'Tia Makadi'], year: 2019, cat: 'hotel', services: ['تصميم اللاند سكيب', 'Landscape Design'], scope: ['concept', 'schem', 'dd', 'cd', 'tender'], cover: 1 },
    { id: 'crowne-plaza', n: 7, name: ['كراون بلازا — شرم الشيخ', 'Crowne Plaza — Sharm El-Sheikh'], loc: ['شرم الشيخ', 'Sharm El-Sheikh, Egypt'], client: ['م. منتصر أبو غالي', 'Mr. Montasser Abu Ghaly'], year: 1999, cat: 'hotel', services: ['تصميم اللاند سكيب', 'Landscape Design'], scope: ['concept', 'schem', 'dd', 'cd', 'tender', 'super'], cover: 1 },
    { id: 'rixos-sharm', n: 4, name: ['ريكسوس شرم', 'Rixos Sharm'], loc: ['شرم الشيخ', 'Sharm El-Sheikh, Egypt'], client: ['رادامس بلو بلانت للفنادق والمنتجعات السياحية', 'Radamis Blue Planet for Hotels and Touristic Resorts'], year: 2009, cat: 'hotel', services: ['تصميم اللاند سكيب', 'Landscape Design'], scope: ['concept', 'schem', 'dd', 'cd', 'tender'], cover: 1 },
    { id: 'sokhna', n: 5, name: ['تلال السخنة', 'Telal El-Sokhna'], loc: ['العين السخنة', 'Al-Ain Al-Sokhna, Egypt'], client: ['رؤية للتنمية العقارية', 'Rooya for Real Estate Development'], year: 2007, cat: 'hotel', services: ['تصميم اللاند سكيب', 'Landscape Design'], scope: ['concept', 'schem', 'dd', 'cd', 'tender', 'super'], cover: 5, award: ['ثاني أفضل منتجع سياحي — Cityscape 2015', 'Cityscape Second Best Touristic Resort 2015'] },
  ];
  const img = (p, i, s) => `${SRC}portfolio/${p.id}/${i}${s || ''}.jpg`;
  const photos = p => Array.from({ length: p.n }, (_, k) => k + 1);
  const ordered = p => [p.cover].concat(photos(p).filter(i => i !== p.cover));
  const pic = (p, i, cls, lazy) => `<img class="${cls || ''}" src="${img(p, i, '-m')}" srcset="${img(p, i, '-t')} 520w, ${img(p, i, '-m')} 1100w, ${img(p, i)} 2000w" sizes="(max-width:760px) 100vw, 50vw" alt="" ${lazy ? 'loading="lazy"' : ''} decoding="async">`;
  const T = (p, k) => (p[k] && Array.isArray(p[k]) ? p[k][en() ? 1 : 0] : (p[k] || ''));
  const scopeText = p => (p.scope || []).map(k => L(SCOPE[k][0], SCOPE[k][1])).join(L('، ', ', '));

  const OFFICE = {
    stats: [[30, '', 'سنة في السوق', 'years in the market'], [90, '+', 'موظف', 'employees'], [400, '+', 'مشروع', 'projects'], [12, '', 'جائزة وتكريم', 'awards']],
    about: ['أوكوبلان لتنسيق المواقع مكتب استشاري حائز على جوائز، بيعيد تشكيل مشهد عمارة اللاند سكيب في مصر من قرابة تلاتين سنة. هدفنا مساحات خارجية مستدامة وبتكلفة مناسبة، الإنسان في مركزها، وبتوصل بين الداخل والخارج بأفكار خارج الصندوق — عملية وجميلة في نفس الوقت.',
      'Ökoplan Landscaping is an award-winning, pioneering consultancy that has been reshaping the landscape architecture scene in Egypt for nearly three decades. Our goal is sustainable, cost-effective outdoor spaces with people at their centre — bridging indoor and outdoor with ideas that are both functional and captivating.'],
    vision: ['نطمح نكون مكتب تصميم عالمي بيحدد الاتجاه، يقود السوق ويرفع جودة الحياة للجيل الحالي والأجيال الجاية.', 'We aspire to be a global, trendsetting design firm, leading the market and enhancing the quality of life for present and future generations.'],
    mission: ['مهمتنا نزرع أفكار مبتكرة للبيئة المبنية — بفريق شغوف، قريب من العميل، وبيتبنى أساليب تصميم متقدمة.', 'Our mission is to cultivate innovative ideas for the built environment through a passionate, client-oriented team that embraces progressive design approaches.'],
    values: [['team', 'العمل الجماعي', 'Teamwork'], ['dedic', 'الالتزام', 'Dedication'], ['innov', 'الابتكار', 'Innovation'], ['transp', 'الشفافية', 'Transparency'], ['belong', 'الانتماء', 'Belonging'], ['excel', 'التميّز', 'Excellence']],
    services: [['site', 'تحليل الموقع', 'Site analysis'], ['land', 'تصميم اللاند سكيب', 'Landscape design'], ['hard', 'تصميم الهارد سكيب', 'Hardscape design'], ['light', 'تصميم الإضاءة', 'Lighting design'], ['water', 'تصميم العناصر المائية', 'Water feature design'], ['plant', 'اختيار النباتات', 'Plants selection'], ['art', 'اختيار الأعمال الفنية', 'Artwork & sculpture'], ['sign', 'تصميم اللافتات', 'Signage design']],
    awards: [
      ['a1', 2019, 'جائزة الإنجاز مدى الحياة — Landscape Middle East', 'Lifetime Achievement Award — Landscape Middle East', 'د. طارق صبحي — أول جائزة إنجاز مدى الحياة للاند سكيب في الشرق الأوسط، دبي', 'Dr. Tarek Sobhy — the first Landscape Middle East Lifetime Achievement Award, Dubai'],
      ['a2', 2018, 'أفضل منتجع في المتوسط — MR&H', 'Top Mediterranean Resort — MR&H', 'فوكا باي', 'Fouka Bay'],
      ['a3', 2018, 'African Property Awards — أفضل مشروع سكني في مصر', 'African Property Awards — Best Residential Project in Egypt', 'إل مونتي جالالا — السخنة (تطوير مصر)', 'IL Monte Galala — Sokhna (Tatweer Misr)'],
      ['a4', 2016, 'Cityscape Residential Global Award', 'Cityscape Residential Global Award', 'إل مونتي جالالا — أول شركة مصرية تفوز بها', 'IL Monte Galala — the first Egyptian company to win it'],
      ['a5', 2015, 'Cityscape — أفضل منتجع سياحي', 'Cityscape — Best Touristic Resort', 'تلال العلمين (رؤية) · وثاني أفضل منتجع: تلال السخنة', 'Telal El-Alamein (Rooya) · second best resort: Telal El-Sokhna'],
      ['a6', 2013, 'Cityscape — أفضل مشروع سكني', 'Cityscape — Best Residential', 'ستون بارك (رؤية)', 'Stone Park (Rooya)'],
    ],
    collab: [['c1', 'CSCEC', 'أبراج العلمين', 'Al Alamein Towers'], ['c2', 'EDSA · !melk', 'كايرو كابيتال', 'Cairo Capital'], ['c3', 'Zaha Hadid Architects', 'ستون تاورز', 'Stone Towers'], ['c4', 'Gianluca Peluffo & Partners', 'فوكا باي · إل مونتي جالالا · بلومفيلدز', 'Fouka Bay · IL Monte Galala · Bloomfields'], ['c5', 'SASAKI', 'NJIT — مدينة المستقبل', 'NJIT, Mostakbal City'], ['c6', 'GROSS. MAX.', 'ستون ستريت', 'Stone Street'], ['c7', 'GB Design', 'سكاي ووك', 'Skywalk'], ['c8', 'WATG', 'ون ناينتي · سكاي ووك', 'One Ninety · Skywalk'], ['c9', 'SWA', 'نور — كايرو كابيتال', 'Noor, Cairo Capital']],
    partners: 'l01 l02 l03 l04 l05 l06 l07 l08 l09 l10 l11 l12 l13 l14 l15 l16 l17 l18 l19 l21 l22 l23 l24 l25 l26 l27 l28 l29 l30 l31 l32 l33 l34 l35 l37 l38 l39 l40 l41 l42 l43 l44 l46 l47 l48 l49 l51 l53 l101 l103 l104 l106 l107 l108 l110 l111 l112 l113 l115 l116'.split(' '),
  };
  const ICON = {
    team: '<circle cx="12" cy="7" r="3"/><circle cx="5" cy="10" r="2.2"/><circle cx="19" cy="10" r="2.2"/><path d="M8 20a4 4 0 0 1 8 0M1.5 18a3.5 3.5 0 0 1 5-3M22.5 18a3.5 3.5 0 0 0-5-3"/>',
    dedic: '<path d="M4 20l6-10 4 5 6-9"/><path d="M14 6h6v6"/>', innov: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.5 1 2.5h6c0-1 .4-1.9 1-2.5A6 6 0 0 0 12 3z"/>',
    transp: '<circle cx="12" cy="12" r="8"/><path d="M12 4v16" /><path d="M12 4a8 8 0 0 1 0 16" fill="currentColor" stroke="none" opacity=".35"/>', belong: '<path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z"/>', excel: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5"/>',
    site: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5M11 7v4l3 2"/>', land: '<path d="M3 20c3-4 6-5 9-2 2-3 5-4 9-1"/><circle cx="7" cy="8" r="3"/><path d="M7 11v5"/><circle cx="16" cy="6" r="3"/><path d="M16 9v6"/>',
    hard: '<path d="M3 9l5-5 5 4-5 5zM13 8l5-4 3 5-5 3zM3 14l5 2 1 5-6-1zM10 17l5-3 5 3-4 4z"/>', light: '<path d="M12 3v2M9 5h6l1 5H8zM12 10v10M8 20h8"/>',
    water: '<path d="M4 14h16M6 14a6 6 0 0 0 12 0M12 3v4M8 6c1 1 2 2 4 1M16 6c-1 1-2 2-4 1M12 7c-2 2-2 4 0 6 2-2 2-4 0-6z"/>', plant: '<path d="M12 21v-8M12 13c-5 0-7-4-7-8 4 0 7 2 7 8zM12 13c5 0 7-4 7-8-4 0-7 2-7 8z"/>',
    art: '<path d="M8 21h8M10 21v-4h4v4M12 3c-3 0-4 3-3 5s3 3 3 5c0-2 2-3 3-5s0-5-3-5z"/>', sign: '<path d="M12 3v18M6 6h11l2 2-2 2H6zM18 13H7l-2 2 2 2h11z"/>',
    pin: '<path d="M12 21s-6-5.4-6-11a6 6 0 0 1 12 0c0 5.6-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>', cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    play: '<path d="M8 5v14l11-7z"/>', back: '<path d="M15 6l-6 6 6 6"/>', award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5"/>', globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  };
  const ic = (k, s = 18) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k] || ''}</svg>`;

  /* ---------------------------------------------------------------- styles */
  document.head.insertAdjacentHTML('beforeend', `<style id="oeko-home">
.okh{display:flex;flex-direction:column;gap:16px}
.oksec{display:flex;align-items:baseline;gap:10px;margin:6px 2px 0}.oksec h3{margin:0;font-size:16px;font-weight:650;letter-spacing:-.01em}.oksec small{color:var(--muted);font-size:12px}.oksec .grow{flex:1}.oksec a{font-size:12.5px;color:var(--accent);text-decoration:none;font-weight:600}
/* the hero */
.okhero{position:relative;border-radius:22px;overflow:hidden;aspect-ratio:21/8;min-height:300px;background:#17302b;color:#fff;border:1px solid var(--line);isolation:isolate}
.okhero .sl{position:absolute;inset:0;opacity:0;transition:opacity 1.4s ease;text-decoration:none;color:inherit}.okhero .sl.on{opacity:1;z-index:1}.okhero .sl img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.04);transition:transform 7s linear}.okhero .sl.on img{transform:scale(1)}
.okhero .v{position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.08) 0%,rgba(0,0,0,0) 35%,rgba(8,26,22,.78) 100%)}
.okhero .g{position:absolute;z-index:3;top:22px;inset-inline-start:26px;pointer-events:none}.okhero .g small{display:block;font-size:13px;opacity:.9;text-shadow:0 1px 6px rgba(0,0,0,.5)}.okhero .g h1{margin:2px 0 0;font-size:clamp(24px,3vw,38px);font-weight:700;letter-spacing:-.02em;text-shadow:0 2px 12px rgba(0,0,0,.5)}
.okhero .stuav{position:absolute;z-index:3;top:22px;inset-inline-end:24px;width:44px!important;height:44px!important;border:2px solid #fff;box-shadow:0 4px 14px rgba(0,0,0,.3)}
.okhero .sl .cap{position:absolute;z-index:2;inset-inline-start:26px;bottom:24px;display:flex;flex-direction:column;gap:2px;pointer-events:none}.okhero .sl .cap b{font-size:20px;font-weight:700;text-shadow:0 1px 10px rgba(0,0,0,.5)}.okhero .sl .cap small{font-size:12.5px;opacity:.9}
.okhero .dots{position:absolute;z-index:3;inset-inline-end:22px;bottom:26px;display:flex;gap:5px}.okhero .dots i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.45);cursor:pointer;transition:.3s}.okhero .dots i.on{background:#fff;width:18px;border-radius:3px}
@media (max-width:760px){.okhero{aspect-ratio:4/3;min-height:0;border-radius:18px}.okhero .g{top:16px;inset-inline-start:16px}.okhero .g h1{font-size:22px}.okhero .sl .cap{inset-inline-start:16px;bottom:18px}.okhero .sl .cap b{font-size:16px}.okhero .dots{display:none}.okhero .stuav{top:16px;inset-inline-end:16px}}
/* the office in numbers */
.okstats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.okst{position:relative;overflow:hidden;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:16px 18px;display:flex;flex-direction:column;gap:2px}
.okst b{font-size:30px;font-weight:700;letter-spacing:-.03em;line-height:1;background:linear-gradient(135deg,#3ca13c,#38a599 55%,#50b1e7);-webkit-background-clip:text;background-clip:text;color:transparent;display:inline-flex;align-items:baseline;gap:2px}.okst b i{font-style:normal;font-size:20px}
.okst span{font-size:12.5px;color:var(--muted)}.okst b .shn{font:inherit;color:inherit;background:inherit;-webkit-background-clip:text;background-clip:text}
/* about */
.okabout{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:18px 20px;display:grid;grid-template-columns:1.1fr 1fr;gap:18px 24px}
.okabout p{margin:0 0 10px;font-size:13.5px;line-height:1.7}.okabout p:last-child{margin:0}.okabout h4{margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--accent);font-weight:700}
.okvals{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:4px}.okval{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;padding:8px 10px;border-radius:12px;background:var(--accent-soft);color:var(--ink)}.okval svg{color:var(--accent);flex:0 0 auto}
.okserv{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;grid-column:1/-1}.oksv{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 8px;border:1px solid var(--line);border-radius:14px;font-size:12px;text-align:center;background:var(--surface-2,var(--bg));transition:.25s}.oksv svg{color:#38a599;width:26px;height:26px}.oksv:hover{transform:translateY(-2px);border-color:#38a599}
/* moving strips */
.okmq{overflow:hidden;direction:ltr;flex:none;height:66px;padding:3px 0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
.okmq .trk{display:flex;gap:12px;width:max-content;animation:okmq 70s linear infinite;direction:ltr}.okmq.rev .trk{animation-direction:reverse;animation-duration:84s}.okmq:hover .trk{animation-play-state:paused}
@keyframes okmq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.okmq .lg{flex:0 0 auto;height:58px;width:132px;background:#fff;border:1px solid var(--line);border-radius:12px;display:grid;place-items:center;padding:8px 12px;box-sizing:border-box}.okmq .lg img{width:108px;height:40px;object-fit:contain;filter:grayscale(1);opacity:.78;transition:.3s}.okmq .lg:hover img{filter:none;opacity:1}
html[data-theme="dark"] .okmq .lg{border-color:transparent}
@media (prefers-reduced-motion:reduce){.okmq .trk{animation:none;flex-wrap:wrap;width:auto}}
/* projects */
.okpf{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.okpc{position:relative;display:block;border-radius:18px;overflow:hidden;aspect-ratio:4/3;background:#17302b;color:#fff;text-decoration:none;isolation:isolate;border:1px solid var(--line)}
.okpc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1)}.okpc:hover img{transform:scale(1.06)}
.okpc .v{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(8,26,22,.82) 100%)}
.okpc .t{position:absolute;inset-inline-start:16px;inset-inline-end:84px;bottom:14px;display:flex;flex-direction:column;gap:3px}.okpc .t b{font-size:17px;font-weight:700;letter-spacing:-.01em;text-shadow:0 1px 8px rgba(0,0,0,.4)}.okpc .t small{font-size:12px;opacity:.9;display:flex;gap:8px;flex-wrap:wrap}.okpc .t small span{display:inline-flex;align-items:center;gap:4px}
.okpc .y{position:absolute;top:12px;inset-inline-start:12px;background:rgba(255,255,255,.9);color:#17302b;font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px}
.okpc .aw{position:absolute;top:12px;inset-inline-end:12px;background:linear-gradient(135deg,#f6c453,#e49a1a);color:#3d2a00;font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;display:flex;align-items:center;gap:4px}
.okpc .n{position:absolute;bottom:14px;inset-inline-end:14px;font-size:11.5px;background:rgba(0,0,0,.35);padding:3px 8px;border-radius:999px;backdrop-filter:blur(4px)}
/* awards & collaborations */
.okaw{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.okaw .a{display:flex;gap:12px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:12px 14px}.okaw .a img{width:56px;height:64px;object-fit:contain;flex:0 0 auto;background:#fff;border-radius:10px;padding:4px;box-sizing:border-box}.okaw .a b{display:block;font-size:13px;line-height:1.35}.okaw .a small{display:block;color:var(--muted);font-size:11.5px;margin-top:2px}.okaw .a em{font-style:normal;color:var(--accent);font-weight:700;font-size:11.5px}
.okmq.okcb{height:70px}.okcb .lg{width:150px;height:62px}.okcb .lg img{filter:none;opacity:1;width:126px;height:44px}
/* the project page */
.okpp{display:flex;flex-direction:column;gap:16px}
.okpp .hero{position:relative;border-radius:22px;overflow:hidden;aspect-ratio:21/9;background:#17302b;color:#fff;border:1px solid var(--line)}.okpp .hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.okpp .hero .v{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 30%,rgba(8,26,22,.85) 100%)}
.okpp .hero .t{position:absolute;inset-inline:24px;bottom:22px;display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap}.okpp .hero h1{margin:0;font-size:clamp(22px,3vw,36px);font-weight:700;letter-spacing:-.02em;text-shadow:0 2px 12px rgba(0,0,0,.4)}.okpp .hero .t small{display:block;font-size:13px;opacity:.9;margin-bottom:4px}.okpp .hero .t .grow{flex:1}
.okpp .show{background:#fff;color:#17302b;border:0;border-radius:999px;padding:9px 16px;font-weight:700;font-size:13px;display:inline-flex;align-items:center;gap:6px;cursor:pointer}
.okpp .back{display:inline-flex;align-items:center;gap:4px;color:var(--accent);text-decoration:none;font-size:13px;font-weight:600}
.okpp dl{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin:0;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:16px 18px}.okpp dl div{display:flex;flex-direction:column;gap:3px}.okpp dt{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:700}.okpp dd{margin:0;font-size:14px;font-weight:600;line-height:1.45}
.okpp .okgrid{columns:3;column-gap:10px}.okpp .okgrid button{display:block;width:100%;border:0;padding:0;margin:0 0 10px;border-radius:14px;overflow:hidden;cursor:pointer;background:#17302b;break-inside:avoid}.okpp .okgrid img{display:block;width:100%;height:auto;transition:transform .6s}.okpp .okgrid button:hover img{transform:scale(1.03)}
.okpp .more{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
/* «شغل المكتب» page */
.okpl{display:flex;flex-direction:column;gap:14px}.okpl .head{display:flex;align-items:flex-end;gap:12px}.okpl .head h2{margin:0;font-size:22px;letter-spacing:-.02em}.okpl .head small{color:var(--muted)}
/* phones */
@media (max-width:1000px){.okpf{grid-template-columns:repeat(2,1fr)}.okaw{grid-template-columns:1fr 1fr}.okabout{grid-template-columns:1fr}.okpp .okgrid{columns:2}}
@media (max-width:760px){.okmq{height:58px}.okmq.okcb{height:62px}.okstats{grid-template-columns:repeat(2,1fr)}.okst b{font-size:26px}.okpf{grid-template-columns:1fr}.okaw{grid-template-columns:1fr}.okserv{grid-template-columns:repeat(2,1fr)}.okvals{grid-template-columns:repeat(2,1fr)}.okpp .hero{aspect-ratio:4/3;border-radius:18px}.okpp .hero .t{inset-inline:16px;bottom:14px}.okpp .okgrid{columns:1}.okpp .more{grid-template-columns:1fr}.okmq .lg{height:50px;width:112px}.okmq .lg img{width:88px;height:34px}}
.stuhome .pfsec,.stuhome .shhero,.stuhome .smgal,.stuhome .smempty{display:none!important}
</style>`);

  /* ---------------------------------------------------------------- pieces */
  const statsHTML = () => `<div class="okstats">${OFFICE.stats.map(([n, plus, ar, enl]) => `<div class="okst"><b><span class="shn" data-n="${n}">0</span>${plus ? `<i>${plus}</i>` : ''}</b><span>${E(L(ar, enl))}</span></div>`).join('')}</div>`;
  const aboutHTML = () => `<div class="okabout">
    <div><h4>${E(L('عن المكتب', 'About the office'))}</h4><p>${E(T(OFFICE, 'about'))}</p><h4>${E(L('رؤيتنا', 'Our vision'))}</h4><p>${E(T(OFFICE, 'vision'))}</p><h4>${E(L('مهمتنا', 'Our mission'))}</h4><p>${E(T(OFFICE, 'mission'))}</p></div>
    <div><h4>${E(L('قيمنا', 'Our values'))}</h4><div class="okvals">${OFFICE.values.map(([k, a, b]) => `<div class="okval">${ic(k, 18)}${E(L(a, b))}</div>`).join('')}</div></div>
    <div class="okserv">${OFFICE.services.map(([k, a, b]) => `<div class="oksv">${ic(k, 26)}<span>${E(L(a, b))}</span></div>`).join('')}</div>
  </div>`;
  const mq = (items, cls) => { const row = items.join(''); return `<div class="okmq ${cls || ''}"><div class="trk">${row}${row}</div></div>`; };
  const partnersHTML = () => { const half = Math.ceil(OFFICE.partners.length / 2); const tile = f => `<span class="lg"><img src="${SRC}partners/${f}.png" alt="" decoding="async"></span>`; return `<div class="oksec"><h3>${E(L('شركاء النجاح', 'Our partners'))}</h3><small>${E(L('عملاء وجهات وثقت في المكتب', 'Clients and institutions who trusted the office'))}</small></div>${mq(OFFICE.partners.slice(0, half).map(tile))}${mq(OFFICE.partners.slice(half).map(tile), 'rev')}`; };
  const card = p => `<a class="okpc" href="#/portfolio/ok-${p.id}">${pic(p, p.cover, '', false)}<div class="v"></div>${p.award ? `<span class="aw">${ic('award', 12)}${E(L('جائزة', 'Award'))}</span>` : ''}<div class="t"><b class="notr" dir="auto">${E(T(p, 'name'))}</b><small><span>${ic('pin', 12)}${E(T(p, 'loc'))}</span><span>${ic('user', 12)}${E(T(p, 'client'))}</span></small></div><span class="n">${p.n} ${E(L('صور', 'photos'))}</span></a>`;
  const projectsHTML = (all) => `<div class="oksec"><h3>${E(L('من شغل المكتب', 'From the office\'s work'))}</h3><small>${E(L('مشاريع مختارة', 'Selected projects'))}</small><div class="grow"></div>${all ? '' : `<a href="#/portfolio">${E(L('الكل', 'All'))}</a>`}</div><div class="okpf">${PROJECTS.map(card).join('')}</div>`;
  const awardsHTML = () => `<div class="oksec"><h3>${E(L('جوايز وتكريمات', 'Awards'))}</h3></div><div class="okaw">${OFFICE.awards.map(([f, y, a, b, da, db]) => `<div class="a"><img src="${SRC}awards/${f}.png" alt="" loading="lazy"><div><em>${y}</em><b>${E(L(a, b))}</b><small>${E(L(da, db))}</small></div></div>`).join('')}</div>`;
  const collabHTML = () => `<div class="oksec"><h3>${E(L('تعاون دولي', 'International collaborations'))}</h3><small>${E(L('مكاتب عالمية اشتغلنا معاها', 'Global practices we have worked with'))}</small></div>${mq(OFFICE.collab.map(([f, nm, a, b]) => `<span class="lg" title="${E(nm)} — ${E(L(a, b))}"><img src="${SRC}collab/${f}.png" alt="${E(nm)}" decoding="async"></span>`), 'okcb')}`;

  /* ---------------------------------------------------------------- the home: office data on top, the projects under it */
  /* the hero: the project photos crossfading under the greeting (used when the office has not uploaded its own showreel / stills) */
  const HERO = { i: 0, t: null };
  const heroSlides = () => { const out = []; PROJECTS.forEach(p => ordered(p).slice(0, 3).forEach(i => out.push({ p, i }))); return out; };
  function heroHTML(greetInner, av) {
    const sl = heroSlides();
    return `<div class="okhero" id="okhero" data-n="${sl.length}">${sl.map((x, k) => `<a class="sl ${k === HERO.i % sl.length ? 'on' : ''}" href="#/portfolio/ok-${x.p.id}">${pic(x.p, x.i, '', k > 0)}<span class="cap"><b class="notr" dir="auto">${E(T(x.p, 'name'))}</b><small>${E(T(x.p, 'loc'))}</small></span></a>`).join('')}<div class="v"></div>
      <div class="g">${greetInner}</div>${av || ''}<div class="dots">${sl.map((_, k) => `<i class="${k === HERO.i % sl.length ? 'on' : ''}" data-action="okHero" data-arg="${k}"></i>`).join('')}</div></div>`;
  }
  function heroTick(force) { const h = document.getElementById('okhero'); if (!h) return; const n = +h.dataset.n || 1; if (!force) HERO.i = (HERO.i + 1) % n; else HERO.i = ((HERO.i % n) + n) % n; h.querySelectorAll('.sl').forEach((e, k) => e.classList.toggle('on', k === HERO.i)); h.querySelectorAll('.dots i').forEach((e, k) => e.classList.toggle('on', k === HERO.i)); }
  const heroArm = () => { clearInterval(HERO.t); HERO.t = setInterval(() => { if (document.hidden) return; heroTick(); }, 5500); };
  if (typeof ACTIONS === 'object') ACTIONS.okHero = k => { HERO.i = +k || 0; heroTick(true); heroArm(); };
  function homeExtras() {
    return `<div class="okh">${statsHTML()}</div>`;
  }
  function homeLower() {
    return `<div class="okh">${aboutHTML()}${partnersHTML()}${projectsHTML()}${awardsHTML()}${collabHTML()}</div>`;
  }
  const wrapDash = () => {
    if (typeof vDashboard !== 'function' || vDashboard.__oeko) return;
    vDashboard = (base => { const f = function () {
      let html = base.apply(this, arguments);
      if (!S.session || typeof html !== 'string' || html.indexOf('class="stuhome') < 0) return html;
      /* no showreel uploaded yet → our slideshow carries the greeting */
      html = html.replace(/<div class="shgreet"><div>([\s\S]*?)<\/div>(<span class="stuav[\s\S]*?<\/span>)?<\/div>/, (m, inner, av) => heroHTML(inner, av));
      /* the office in numbers right under the slideshow (before «your day») */
      const k = html.indexOf('<div class="shsec"><h3>'); if (k >= 0) html = html.slice(0, k) + homeExtras() + html.slice(k);
      /* the engine's portfolio strip + stills gallery go; ours come before the notice / shot / pulse cards */
      const i = html.indexOf('<div class="shsec pfsec">'); const j = html.indexOf('<div class="shgrid">', Math.max(0, i));
      if (j >= 0) html = (i >= 0 ? html.slice(0, i) : html.slice(0, j)) + homeLower() + html.slice(j);
      return html;
    }; f.__oeko = 1; return f; })(vDashboard);
  };
  wrapDash(); document.addEventListener('nf:ready', wrapDash);

  /* ---------------------------------------------------------------- «شغل المكتب»: our projects first, the engine's published entries (if any) under them */
  const listPage = () => `<div class="okpl"><div class="head"><h2>${E(L('شغل المكتب', 'Office work'))}</h2><small>${E(L(`${PROJECTS.length} مشاريع مختارة من بروفايل المكتب`, `${PROJECTS.length} selected projects from the office profile`))}</small></div>${projectsHTML(true)}${awardsHTML()}${collabHTML()}</div>`;
  function projPage(p) {
    const rows = [[L('المكان', 'Location'), T(p, 'loc')], [L('العميل', 'Client'), T(p, 'client')], [L('النوع', 'Type'), L(CAT[p.cat][0], CAT[p.cat][1])], [L('الخدمات', 'Services'), T(p, 'services')], [L('نطاق العمل', 'Scope of work'), scopeText(p)], [L('الجوايز', 'Awards'), T(p, 'award')]].filter(r => r[1]);
    const ps = ordered(p); const others = PROJECTS.filter(x => x.id !== p.id).slice(0, 3);
    return `<div class="okpp">
      <a class="back" href="#/portfolio">${ic('back', 16)}${E(L('شغل المكتب', 'Office work'))}</a>
      <div class="hero">${pic(p, p.cover)}<div class="v"></div><div class="t"><div><small>${E(T(p, 'client'))}</small><h1 class="notr" dir="auto">${E(T(p, 'name'))}</h1></div><div class="grow"></div><button type="button" class="show" data-action="okShow" data-arg="${p.id}:0">${ic('play', 16)}${E(L('عرض ملء الشاشة', 'Full-screen show'))}</button></div></div>
      <dl>${rows.map(r => `<div><dt>${E(r[0])}</dt><dd class="notr" dir="auto">${E(String(r[1]))}</dd></div>`).join('')}</dl>
      <div class="okgrid">${ps.map((i, k) => `<button type="button" data-action="okShow" data-arg="${p.id}:${k}">${pic(p, i, '', k > 2)}</button>`).join('')}</div>
      <div class="oksec"><h3>${E(L('مشاريع تانية', 'More projects'))}</h3></div><div class="more">${others.map(card).join('')}</div>
    </div>`;
  }
  const hookViews = () => {
    if (typeof EXTRA_VIEWS !== 'object' || EXTRA_VIEWS.__oekoPf) return;
    const base = EXTRA_VIEWS.portfolio; EXTRA_VIEWS.__oekoPf = 1;
    EXTRA_VIEWS.portfolio = () => { const id = S.route && S.route.id; if (id && /^ok-/.test(id)) { const p = PROJECTS.find(x => 'ok-' + x.id === id); if (p) return projPage(p); } if (id && base) return base(); return listPage(); };
  };
  hookViews(); document.addEventListener('nf:ready', hookViews);
  if (typeof ACTIONS === 'object') {
    ACTIONS.okShow = arg => { const [id, k] = String(arg || '').split(':'); const p = PROJECTS.find(x => x.id === id); if (!p) return; const ps = ordered(p);
      const items = ps.map(i => ({ thumb: img(p, i, '-t'), src: img(p, i), caption: T(p, 'name') + ' · ' + T(p, 'loc'), name: T(p, 'name') }));
      if (window.nfView && nfView.open) nfView.open(items, +k || 0); else if (typeof lightbox === 'function') lightbox(items[+k || 0].src, items[+k || 0].caption); };
  }
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => { const h = document.getElementById('okhero'); if (h && !h.__on) { h.__on = 1; heroTick(true); heroArm(); let x0 = null; h.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true }); h.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) { HERO.i += dx < 0 ? 1 : -1; heroTick(true); heroArm(); } }); } else if (!h) clearInterval(HERO.t); });
  /* count-up for our numbers when the engine's hydrate is not around (it handles .shn inside .stuhome) */
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => { document.querySelectorAll('.okh .shn:not(.done)').forEach(el => { if (el.closest('.stuhome')) return; el.classList.add('done'); el.textContent = el.dataset.n; }); });

  /* team photos: the engine's own flow (upload / camera → crop with zoom & move) — everyone sets their own picture (Mahmoud, 13 Oct) */
  window.oekoHome = { PROJECTS, OFFICE };
})();
