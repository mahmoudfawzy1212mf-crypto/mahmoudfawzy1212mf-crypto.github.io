/* =====================================================================
   Ökoplan Landscaping — the home & the office profile (v2, 13 Oct 2026 — Mahmoud)
   Loaded after oekoplan.js. The office's own content from the company profile:
   · home (every role): the office in numbers under the greeting → your day → the engine's «From the projects gallery»
     strip (one slide per photo of the published gallery projects) → the partners strip (moving logos) → awards →
     international collaborations → the engine's cards (notice / shot / pulse).
   · «Projects Gallery» (menu) = the engine's portfolio module renamed (mk-oeko.py): add / edit / delete / publish projects,
     upload shots at full quality. The six profile projects are seeded into it once (`oekoSeedGallery`) as real entries
     (col portfolio + col files with URL shots), so they can be edited or deleted like any other.
   · «About the office» (menu): about · vision · mission · values · services · awards · collaborations.
   Photos: oekoplan/_src/portfolio/<project>/<n>.jpg (full) · <n>-m.jpg (phone / cards) · <n>-t.jpg (thumbs).
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

  /* ---------------------------------------------------------------- the profile projects (seeded into the gallery once) */
  const SCOPE = { concept: 'Concept Design', schem: 'Schematic Design', dd: 'Design Development', cd: 'Construction Drawings', tender: 'Tender Documents', super: 'Site Supervision' };
  const PROJECTS = [
    { id: 'telal-alamein', n: 6, title: 'Telal El-Alamein', location: 'North Coast, Egypt', client: 'Rooya for Real Estate Development', year: 2013, type: 'hotel', scope: [], cover: 1, about: 'Cityscape Best Touristic Resort Award 2015.' },
    { id: 'rixos-seagate', n: 4, title: 'Rixos Sea Gate', location: 'Sharm El-Sheikh, Egypt', client: 'Rixos Hotels', year: 2015, type: 'hotel', scope: [], cover: 1 },
    { id: 'xanadu', n: 2, title: 'Xanadu Makadi Bay', location: 'Hurghada, Egypt', client: 'Tia Makadi', year: 2019, type: 'hotel', scope: ['concept', 'schem', 'dd', 'cd', 'tender'], cover: 1 },
    { id: 'crowne-plaza', n: 7, title: 'Crowne Plaza — Sharm El-Sheikh', location: 'Sharm El-Sheikh, Egypt', client: 'Mr. Montasser Abu Ghaly', year: 1999, type: 'hotel', scope: ['concept', 'schem', 'dd', 'cd', 'tender', 'super'], cover: 1 },
    { id: 'rixos-sharm', n: 4, title: 'Rixos Sharm', location: 'Sharm El-Sheikh, Egypt', client: 'Radamis Blue Planet for Hotels and Touristic Resorts', year: 2009, type: 'hotel', scope: ['concept', 'schem', 'dd', 'cd', 'tender'], cover: 1 },
    { id: 'sokhna', n: 5, title: 'Telal El-Sokhna', location: 'Al-Ain Al-Sokhna, Egypt', client: 'Rooya for Real Estate Development', year: 2007, type: 'hotel', scope: ['concept', 'schem', 'dd', 'cd', 'tender', 'super'], cover: 5, about: 'Cityscape Second Best Touristic Resort Award 2015.' },
  ];
  const img = (p, i, s) => `${SRC}portfolio/${p.id}/${i}${s || ''}.jpg`;
  async function seedGallery(force) {
    if (typeof Store === 'undefined' || typeof list !== 'function') return 0;
    const have = list('portfolio').filter(e => e && !e.deleted); if (have.length && !force) return 0;
    const now = typeof nowISO === 'function' ? nowISO() : new Date().toISOString(); let n = 0;
    for (let k = 0; k < PROJECTS.length; k++) {
      const p = PROJECTS[k]; const pid = 'ok-' + p.id; if (byId('portfolio', pid)) continue;
      const order = [p.cover].concat(Array.from({ length: p.n }, (_, j) => j + 1).filter(i => i !== p.cover)); const ids = [];
      for (const i of order) {
        const fid = `okpf-${p.id}-${i}`;
        await Store.save('files', { id: fid, name: `${p.title} — ${i}.jpg`, kind: 'render', mime: 'image/jpeg', store: 'thumb', ref: null, enc: null, size: 0, thumb: img(p, i, '-m'), full: img(p, i), rev: 'Portfolio', portfolioId: pid, projectId: null, orderId: null, productId: null, note: '', byId: null, byName: 'Ökoplan profile', createdAt: now, updatedAt: now }, { silent: true });
        ids.push(fid);
      }
      await Store.save('portfolio', { id: pid, title: p.title, client: p.client, year: p.year, location: p.location, type: p.type, area: '', services: ['Landscape Design'].concat(p.scope.map(k => SCOPE[k])), about: p.about || '', behance: '', order: k + 1, shots: ids, coverId: ids[0], published: true, projectId: null, createdAt: now, updatedAt: now, by: (typeof me === 'function' && me()) || null }, { silent: true });
      n++;
    }
    if (n && typeof render === 'function') render(true);
    return n;
  }
  window.oekoSeedGallery = seedGallery;
  if (typeof ACTIONS === 'object') ACTIONS.oekoSeedGallery = async () => { const n = await seedGallery(true); if (typeof toast === 'function') toast(n ? L(`اتضاف ${n} مشاريع للمعرض`, `${n} projects added to the gallery`) : L('مشاريع البروفايل موجودة بالفعل', 'The profile projects are already there')); };
  /* the first admin to open the app with an empty gallery gets the six profile projects (once per system — flag in settings) */
  let seedTried = false;
  const trySeed = () => {
    if (seedTried || !S.session || typeof isAdmin !== 'function' || !isAdmin()) return; if (!S.settings || S.settings.oekoGallerySeeded) { seedTried = true; return; }
    if (typeof sbOn === 'function' && sbOn() && !S.staffReady) return; seedTried = true;
    setTimeout(async () => { try { const n = await seedGallery(false); if (typeof Store.saveSettings === 'function') await Store.saveSettings({ oekoGallerySeeded: true }); if (n && typeof toast === 'function') toast(L('مشاريع البروفايل اتضافت لمعرض المشاريع', 'The profile projects were added to the Projects Gallery')); } catch (e) { console.warn('oeko seed', e); } }, 1500);
  };

  /* ---------------------------------------------------------------- the office */
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
  const T = (o, k) => (o[k] && Array.isArray(o[k]) ? o[k][en() ? 1 : 0] : (o[k] || ''));
  const ICON = {
    team: '<circle cx="12" cy="7" r="3"/><circle cx="5" cy="10" r="2.2"/><circle cx="19" cy="10" r="2.2"/><path d="M8 20a4 4 0 0 1 8 0M1.5 18a3.5 3.5 0 0 1 5-3M22.5 18a3.5 3.5 0 0 0-5-3"/>',
    dedic: '<path d="M4 20l6-10 4 5 6-9"/><path d="M14 6h6v6"/>', innov: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.5 1 2.5h6c0-1 .4-1.9 1-2.5A6 6 0 0 0 12 3z"/>',
    transp: '<circle cx="12" cy="12" r="8"/><path d="M12 4v16" /><path d="M12 4a8 8 0 0 1 0 16" fill="currentColor" stroke="none" opacity=".35"/>', belong: '<path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z"/>', excel: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5"/>',
    site: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5M11 7v4l3 2"/>', land: '<path d="M3 20c3-4 6-5 9-2 2-3 5-4 9-1"/><circle cx="7" cy="8" r="3"/><path d="M7 11v5"/><circle cx="16" cy="6" r="3"/><path d="M16 9v6"/>',
    hard: '<path d="M3 9l5-5 5 4-5 5zM13 8l5-4 3 5-5 3zM3 14l5 2 1 5-6-1zM10 17l5-3 5 3-4 4z"/>', light: '<path d="M12 3v2M9 5h6l1 5H8zM12 10v10M8 20h8"/>',
    water: '<path d="M4 14h16M6 14a6 6 0 0 0 12 0M12 3v4M8 6c1 1 2 2 4 1M16 6c-1 1-2 2-4 1M12 7c-2 2-2 4 0 6 2-2 2-4 0-6z"/>', plant: '<path d="M12 21v-8M12 13c-5 0-7-4-7-8 4 0 7 2 7 8zM12 13c5 0 7-4 7-8-4 0-7 2-7 8z"/>',
    art: '<path d="M8 21h8M10 21v-4h4v4M12 3c-3 0-4 3-3 5s3 3 3 5c0-2 2-3 3-5s0-5-3-5z"/>', sign: '<path d="M12 3v18M6 6h11l2 2-2 2H6zM18 13H7l-2 2 2 2h11z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  };
  const ic = (k, s = 18) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k] || ''}</svg>`;
  if (typeof ICONS === 'object' && !ICONS.okinfo) ICONS.okinfo = ICON.info;

  /* ---------------------------------------------------------------- styles */
  document.head.insertAdjacentHTML('beforeend', `<style id="oeko-home">
.okh{display:flex;flex-direction:column;gap:16px}
.oksec{display:flex;align-items:baseline;gap:10px;margin:6px 2px 0}.oksec h3{margin:0;font-size:16px;font-weight:650;letter-spacing:-.01em}.oksec small{color:var(--muted);font-size:12px}.oksec .grow{flex:1}.oksec a{font-size:12.5px;color:var(--accent);text-decoration:none;font-weight:600}
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
.okmq .trk{display:flex;gap:12px;width:max-content;animation:okmq 150s linear infinite;direction:ltr}.okmq:hover .trk{animation-play-state:paused}
@keyframes okmq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.okmq .lg{flex:0 0 auto;height:58px;width:132px;background:#fff;border:1px solid var(--line);border-radius:12px;display:grid;place-items:center;padding:8px 12px;box-sizing:border-box}.okmq .lg img{width:108px;height:40px;object-fit:contain;filter:grayscale(1);opacity:.78;transition:.3s}.okmq .lg:hover img{filter:none;opacity:1}
html[data-theme="dark"] .okmq .lg{border-color:transparent}
@media (prefers-reduced-motion:reduce){.okmq .trk{animation:none;flex-wrap:wrap;width:auto}}
/* awards & collaborations */
.okaw{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.okaw .a{display:flex;gap:12px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:12px 14px}.okaw .a img{width:56px;height:64px;object-fit:contain;flex:0 0 auto;background:#fff;border-radius:10px;padding:4px;box-sizing:border-box}.okaw .a b{display:block;font-size:13px;line-height:1.35}.okaw .a small{display:block;color:var(--muted);font-size:11.5px;margin-top:2px}.okaw .a em{font-style:normal;color:var(--accent);font-weight:700;font-size:11.5px}
.okmq.okcb{height:70px;animation-duration:60s}.okcb .lg{width:150px;height:62px}.okcb .lg img{width:126px;height:44px}.okcb .trk{animation-duration:70s}
/* about page */
.okpage{display:flex;flex-direction:column;gap:14px}.okpage .head h2{margin:0;font-size:22px;letter-spacing:-.02em}.okpage .head small{color:var(--muted)}
/* phones */
@media (max-width:1000px){.okaw{grid-template-columns:1fr 1fr}.okabout{grid-template-columns:1fr}}
@media (max-width:760px){.okmq{height:58px}.okmq.okcb{height:62px}.okmq .lg{height:50px;width:112px}.okmq .lg img{width:88px;height:34px}.okstats{grid-template-columns:repeat(2,1fr)}.okst b{font-size:26px}.okaw{display:flex;overflow-x:auto;gap:10px;scroll-snap-type:x mandatory;padding:2px 2px 8px;margin-inline:-2px;-webkit-overflow-scrolling:touch;scrollbar-width:none}.okaw::-webkit-scrollbar{display:none}.okaw .a{flex:0 0 232px;scroll-snap-align:start;align-items:flex-start;padding:10px 12px;gap:10px}.okaw .a img{width:40px;height:46px}.okaw .a em{font-size:12px}.okaw .a b{font-size:12.5px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.okaw .a small{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;font-size:11px}.okserv{grid-template-columns:repeat(2,1fr)}.okvals{grid-template-columns:repeat(2,1fr)}}
/* the gallery strip: small grey dots on a soft dark fade instead of the bars (Mahmoud, 13 Oct) */
.shhero .shdots{top:14px;inset-inline-end:16px;gap:5px;padding:6px 9px;border-radius:999px;background:linear-gradient(180deg,rgba(0,0,0,.28),rgba(0,0,0,.12));backdrop-filter:blur(3px);align-items:center}
.shhero .shdots i{width:6px!important;height:6px!important;border-radius:50%!important;background:rgba(255,255,255,.42)!important;box-shadow:0 0 0 0 rgba(255,255,255,0);transition:background .3s,transform .3s,box-shadow .3s}
.shhero .shdots i.on{background:#fff!important;width:6px!important;transform:scale(1.35);box-shadow:0 0 0 3px rgba(255,255,255,.18)}
.shhero .shdots i:hover{background:rgba(255,255,255,.8)!important}
/* the slides: a fixed grey screen with a fine dot pattern (Mahmoud, 13 Oct — no colour on hover) */
.shhero .shslide img{filter:grayscale(.55) contrast(.98);transition:transform 7s linear,filter .5s ease}
.shhero .shslide::after{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background-image:radial-gradient(rgba(20,26,30,.5) 0.55px,transparent 0.8px);background-size:3px 3px;mix-blend-mode:multiply;opacity:.25;transition:opacity .5s ease}
.shhero .shslide::before{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:rgba(14,22,28,.07);transition:opacity .5s ease}
/* the caption: the office profile's typography — light geometric caps title in the logo blue, category line above, bold-label details under it */
.shhero .sht{bottom:30px;inset-inline:40px;gap:6px;max-width:70%;z-index:2}
.shhero .sht::after{content:'';position:absolute;inset:-26px -30px -20px;z-index:-1;border-radius:18px;background:linear-gradient(180deg,rgba(5,12,18,0),rgba(5,12,18,.62));filter:blur(16px)}
.shhero .sht small{display:none}
.shhero .sht .okcat{font-size:15px;font-weight:400;color:#7fd0f5;letter-spacing:.02em;text-transform:none}
.shhero .sht h2{font-size:clamp(30px,4.2vw,54px);font-weight:300;letter-spacing:.07em;text-transform:uppercase;line-height:1.05;color:#8ad6f7;text-shadow:0 2px 22px rgba(0,0,0,.45)}
.shhero .sht .okdet{display:grid;grid-template-columns:auto auto;gap:3px 26px;margin-top:6px;font-size:13px;line-height:1.35;color:#eef4f7;max-width:640px}
.shhero .sht .okdet div{display:flex;gap:6px;align-items:baseline}.shhero .sht .okdet div::before{content:'•';color:#8ad6f7;font-size:12px}
.shhero .sht .okdet b{font-weight:600;color:#fff}
.shhero .sht .shm{display:none}
@media (max-width:760px){.shhero .sht{inset-inline:18px;bottom:18px;max-width:92%}.shhero .sht h2{font-size:clamp(24px,6.4vw,34px)}.shhero .sht .okdet{grid-template-columns:1fr;font-size:12px}}
.stuhome .smgal,.stuhome .smempty{display:none!important}
.pfpage .pfyear{display:none!important}
</style>`);

  /* ---------------------------------------------------------------- pieces */
  const statsHTML = () => `<div class="okstats">${OFFICE.stats.map(([n, plus, ar, enl]) => `<div class="okst"><b><span class="shn" data-n="${n}">0</span>${plus ? `<i>${plus}</i>` : ''}</b><span>${E(L(ar, enl))}</span></div>`).join('')}</div>`;
  const aboutHTML = () => `<div class="okabout">
    <div><h4>${E(L('عن المكتب', 'About the office'))}</h4><p>${E(T(OFFICE, 'about'))}</p><h4>${E(L('رؤيتنا', 'Our vision'))}</h4><p>${E(T(OFFICE, 'vision'))}</p><h4>${E(L('مهمتنا', 'Our mission'))}</h4><p>${E(T(OFFICE, 'mission'))}</p></div>
    <div><h4>${E(L('قيمنا', 'Our values'))}</h4><div class="okvals">${OFFICE.values.map(([k, a, b]) => `<div class="okval">${ic(k, 18)}${E(L(a, b))}</div>`).join('')}</div></div>
    <div class="okserv">${OFFICE.services.map(([k, a, b]) => `<div class="oksv">${ic(k, 26)}<span>${E(L(a, b))}</span></div>`).join('')}</div>
  </div>`;
  const mq = (items, cls) => { const row = items.join(''); return `<div class="okmq ${cls || ''}"><div class="trk">${row}${row}</div></div>`; };
  const partnersHTML = () => { const tile = f => `<span class="lg"><img src="${SRC}partners/${f}.png" alt="" decoding="async"></span>`; return `<div class="oksec"><h3>${E(L('شركاء النجاح', 'Our partners'))}</h3><small>${E(L('عملاء وجهات وثقت في المكتب', 'Clients and institutions who trusted the office'))}</small></div>${mq(OFFICE.partners.map(tile))}`; };
  const awardsHTML = () => `<div class="oksec"><h3>${E(L('جوايز وتكريمات', 'Awards'))}</h3></div><div class="okaw">${OFFICE.awards.map(([f, y, a, b, da, db]) => `<div class="a"><img src="${SRC}awards/${f}.png" alt="" loading="lazy"><div><em>${y}</em><b>${E(L(a, b))}</b><small>${E(L(da, db))}</small></div></div>`).join('')}</div>`;
  const collabHTML = () => `<div class="oksec"><h3>${E(L('تعاون دولي', 'International collaborations'))}</h3><small>${E(L('مكاتب عالمية اشتغلنا معاها', 'Global practices we have worked with'))}</small></div>${mq(OFFICE.collab.map(([f, nm, a, b]) => `<span class="lg" title="${E(nm)} — ${E(L(a, b))}"><img src="${SRC}collab/${f}.png" alt="${E(nm)}" decoding="async"></span>`), 'okcb')}`;

  /* ---------------------------------------------------------------- the home: numbers under the greeting; partners / awards / collaborations after the gallery strip */
  const wrapDash = () => {
    if (typeof vDashboard !== 'function' || vDashboard.__oeko) return;
    vDashboard = (base => { const f = function () {
      let html = base.apply(this, arguments);
      if (!S.session || typeof html !== 'string' || html.indexOf('class="stuhome') < 0) return html;
      /* the gallery strip: the engine puts it right under the greeting when no showreel is uploaded → it goes after «your day», with its heading */
      let strip = ''; const i = html.indexOf('<div class="shhero'); const k2 = i >= 0 ? html.indexOf('<div class="shsec"><h3>', i) : -1;
      if (i >= 0 && k2 > i) { strip = html.slice(i, k2); html = html.slice(0, i) + html.slice(k2); }
      const k = html.indexOf('<div class="shsec"><h3>'); if (k >= 0) html = html.slice(0, k) + `<div class="okh">${statsHTML()}</div>` + html.slice(k);
      const j = html.indexOf('<div class="shgrid">'); if (j >= 0) html = html.slice(0, j) + (strip ? `<div class="shsec pfsec"><h3>${E(L('من معرض المشاريع', 'From the projects gallery'))}</h3><a class="btn xs" href="#/portfolio">${E(L('الكل', 'All'))}</a></div>${strip}` : '') + `<div class="okh">${partnersHTML()}${awardsHTML()}${collabHTML()}</div>` + html.slice(j);
      return html;
    }; f.__oeko = 1; return f; })(vDashboard);
  };
  wrapDash(); document.addEventListener('nf:ready', wrapDash);

  /* ---------------------------------------------------------------- «About the office» page + menu entry */
  const aboutPage = () => `<div class="okpage"><div class="head"><h2>${E(L('عن المكتب', 'About the office'))}</h2><small>${E(L('أوكوبلان لتنسيق المواقع — من البروفايل الرسمي', 'Ökoplan Landscaping — from the official profile'))}</small></div>
    <div class="okh">${statsHTML()}${aboutHTML()}${partnersHTML()}${awardsHTML()}${collabHTML()}</div></div>`;
  const hookViews = () => {
    if (typeof EXTRA_VIEWS !== 'object' || EXTRA_VIEWS.okabout) return;
    EXTRA_VIEWS.okabout = () => aboutPage();
    if (typeof EXTRA_TITLES === 'object') EXTRA_TITLES.okabout = () => ({ title: L('عن المكتب', 'About the office'), sub: L('البروفايل', 'The profile') });
    if (Array.isArray(NAV) && !NAV.some(n => n.id === 'okabout')) { const at = NAV.findIndex(n => n.id === 'portfolio'); NAV.splice(at >= 0 ? at + 1 : 1, 0, { id: 'okabout', label: 'عن المكتب', short: 'المكتب', icon: 'okinfo' }); }
    if (typeof ROLE_VIEWS === 'object') Object.keys(ROLE_VIEWS).forEach(r => { if (Array.isArray(ROLE_VIEWS[r]) && !ROLE_VIEWS[r].includes('okabout')) ROLE_VIEWS[r] = ROLE_VIEWS[r].concat(['okabout']); });
  };
  hookViews(); document.addEventListener('nf:ready', hookViews);
  if (typeof OEKO_I18N === 'object') Object.assign(OEKO_I18N, { 'عن المكتب': 'About the office' });

  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => {
    document.querySelectorAll('.okh .shn:not(.done)').forEach(el => { if (el.closest('.stuhome')) return; el.classList.add('done'); el.textContent = el.dataset.n; });
    trySeed();
  });
  /* Dr. Tarek's portrait (Mahmoud, 13 Oct) goes on his account by itself the first time he opens the home without a picture */
  const TAREK = SRC + 'brand/tarek.jpg'; let tarekTried = false;
  const tarekData = async () => { const r = await fetch(TAREK); const bl = await r.blob(); return new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(bl); }); };
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(() => {
    if (tarekTried || !S.session || !(S.route && S.route.view === 'dashboard')) return; tarekTried = true;
    setTimeout(async () => { try {
      const nm = String(S.session.name || ''); if (!/طارق|Tarek/i.test(nm) || !(typeof isAdmin === 'function' && isAdmin())) return;
      if (typeof myAvatarSrc === 'function' && myAvatarSrc()) return;
      if (typeof saveMyPhoto === 'function') { await saveMyPhoto(await tarekData()); if (typeof render === 'function') render(true); }
    } catch (e) { console.warn('tarek photo', e); } }, 1200);
  });
  if (typeof ACTIONS === 'object') ACTIONS.oekoTarekPhoto = async () => { try { await saveMyPhoto(await tarekData()); toast(L('اتحطت صورة د. طارق', "Dr. Tarek's photo is set")); render(true); } catch (e) { toast(L('تعذّر', 'Could not'), 'err'); } };

  /* the hero caption: hairline + location · services under the title (the engine prints client, title, type and shot count) */
  const okCaption = () => {
    document.querySelectorAll('.shhero .shslide').forEach(a => {
      const t = a.querySelector('.sht'); if (!t || t.querySelector('.okdet')) return;
      const id = (a.getAttribute('href') || '').split('/portfolio/')[1]; const e = id && typeof byId === 'function' ? byId('portfolio', id) : null; if (!e) return;
      const h2 = t.querySelector('h2'); if (!h2) return;
      const cat = (t.querySelector('.shst') || {}).textContent || '';
      const rows = [[L('الموقع', 'Location'), e.location], [L('العميل', 'Client'), e.client], [L('الخدمات', 'Services'), Array.isArray(e.services) ? e.services.join(', ') : e.services], [L('نطاق العمل', 'Scope of work'), e.scope]].filter(r => r[1]);
      if (cat) h2.insertAdjacentHTML('beforebegin', `<div class="okcat">${E(cat)}</div>`);
      h2.insertAdjacentHTML('afterend', `<div class="okdet notr">${rows.map(([k, v]) => `<div><b>${E(k)}:</b><span dir="auto">${E(String(v))}</span></div>`).join('')}</div>`);
    });
  };
  if (Array.isArray(RENDER_HOOKS)) RENDER_HOOKS.push(okCaption);
  setInterval(okCaption, 1500);
  window.oekoHome = { PROJECTS, OFFICE, seedGallery };
})();
