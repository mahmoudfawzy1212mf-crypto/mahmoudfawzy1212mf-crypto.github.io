/* Ökoplan Landscaping — public website (v1, 16 Oct 2026 — Mahmoud)
   One script for the five pages. English first, Arabic with the toggle (?lang=ar / remembered).
   Projects come live from the system (Edge function oeko-site → the published «Projects gallery»);
   the six profile projects are the fallback when the function is unreachable.
   The contact form becomes a Lead in the system's Enquiries (+ push to management). No money anywhere. */
(() => {
  'use strict';
  const API = 'https://hwpffrjvwnbpzpzbpeml.supabase.co/functions/v1/oeko-site';
  const SRC = '../_src/';
  const qs = new URLSearchParams(location.search);
  let LANG = qs.get('lang') || (() => { try { return localStorage.getItem('ok.lang'); } catch (e) { return null; } })() || 'en';
  if (LANG !== 'ar') LANG = 'en'; try { localStorage.setItem('ok.lang', LANG); } catch (e) { /* ignore */ }
  const ar = () => LANG === 'ar';
  const L = (a, b) => (ar() ? (b == null ? a : b) : a);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const withLang = href => { const u = new URL(href, location.href); if (ar()) u.searchParams.set('lang', 'ar'); else u.searchParams.delete('lang'); return u.pathname.replace(/^.*\//, '') + u.search + u.hash; };

  /* ------------------------------------------------------------------ content */
  const TYPES = { hotel: ['Hotels & Resorts', 'فنادق ومنتجعات'], res: ['Residential', 'سكني'], urban: ['Urban Planning', 'تخطيط عمراني'], com: ['Commercial & Leisure', 'تجاري وترفيهي'], edu: ['Education', 'تعليمي'], gov: ['Government', 'حكومي'], park: ['Public Parks', 'حدائق عامة'] };
  const typeL = k => (TYPES[k] ? L(TYPES[k][0], TYPES[k][1]) : '');
  const SCOPE_AR = { 'Landscape Design': 'تصميم اللاند سكيب', 'Concept Design': 'التصميم المبدئي', 'Schematic Design': 'التصميم التخطيطي', 'Design Development': 'تطوير التصميم', 'Construction Drawings': 'رسومات التنفيذ', 'Tender Documents': 'مستندات الطرح', 'Site Supervision': 'الإشراف على التنفيذ' };
  const svcL = s => (ar() && SCOPE_AR[s]) || s;
  const img = (p, i, s) => `${SRC}portfolio/${p}/${i}${s || ''}.jpg`;
  const shotsOf = (p, n, cover) => [cover].concat(Array.from({ length: n }, (_, j) => j + 1).filter(i => i !== cover)).map(i => ({ id: p + '-' + i, src: img(p, i, '-m'), full: img(p, i) }));
  const FALLBACK = [
    { id: 'ok-telal-alamein', title: 'Telal El-Alamein', client: 'Rooya for Real Estate Development', location: 'North Coast, Egypt', year: 2013, type: 'hotel', services: ['Landscape Design'], about: 'Cityscape Best Touristic Resort Award 2015.', shots: shotsOf('telal-alamein', 6, 1) },
    { id: 'ok-rixos-seagate', title: 'Rixos Sea Gate', client: 'Rixos Hotels', location: 'Sharm El-Sheikh, Egypt', year: 2015, type: 'hotel', services: ['Landscape Design'], about: '', shots: shotsOf('rixos-seagate', 4, 1) },
    { id: 'ok-xanadu', title: 'Xanadu Makadi Bay', client: 'Tia Makadi', location: 'Hurghada, Egypt', year: 2019, type: 'hotel', services: ['Landscape Design', 'Concept Design', 'Schematic Design', 'Design Development', 'Construction Drawings', 'Tender Documents'], about: '', shots: shotsOf('xanadu', 2, 1) },
    { id: 'ok-crowne-plaza', title: 'Crowne Plaza — Sharm El-Sheikh', client: 'Mr. Montasser Abu Ghaly', location: 'Sharm El-Sheikh, Egypt', year: 1999, type: 'hotel', services: ['Landscape Design', 'Concept Design', 'Schematic Design', 'Design Development', 'Construction Drawings', 'Tender Documents', 'Site Supervision'], about: '', shots: shotsOf('crowne-plaza', 7, 1) },
    { id: 'ok-rixos-sharm', title: 'Rixos Sharm', client: 'Radamis Blue Planet for Hotels and Touristic Resorts', location: 'Sharm El-Sheikh, Egypt', year: 2009, type: 'hotel', services: ['Landscape Design', 'Concept Design', 'Schematic Design', 'Design Development', 'Construction Drawings', 'Tender Documents'], about: '', shots: shotsOf('rixos-sharm', 4, 1) },
    { id: 'ok-sokhna', title: 'Telal El-Sokhna', client: 'Rooya for Real Estate Development', location: 'Al-Ain Al-Sokhna, Egypt', year: 2007, type: 'hotel', services: ['Landscape Design', 'Concept Design', 'Schematic Design', 'Design Development', 'Construction Drawings', 'Tender Documents', 'Site Supervision'], about: 'Cityscape Second Best Touristic Resort Award 2015.', shots: shotsOf('sokhna', 5, 5) },
  ];
  /* a short story per profile project (the website's own words; the system's «about» is appended when present) */
  const STORY = {
    'ok-telal-alamein': ['A hillside resort on the Mediterranean where terraces step down to lagoons and the planting is chosen to live with wind and salt. Awarded Cityscape Best Touristic Resort in 2015.', 'منتجع على تلال المتوسط، المدرّجات بتنزل على بحيرات، والزرع متختار يعيش مع الريح والملح. فاز بجايزة سيتي سكيب لأفضل منتجع سياحي سنة 2015.'],
    'ok-rixos-seagate': ['Generous pool gardens and shaded walks for a large family resort on the Red Sea — a landscape that keeps its calm at full occupancy.', 'حدايق حمّامات سباحة واسعة وممرات مظلّلة لمنتجع عائلي كبير على البحر الأحمر — لاند سكيب بيحافظ على هدوءه والمنتجع مليان.'],
    'ok-xanadu': ['A sequence of courtyards and water gardens leading from the arrival to the bay, carried from concept through tender documents.', 'سلسلة أفنية وحدايق مائية من الوصول لحد الخليج — اشتغلناها من التصميم المبدئي لحد مستندات الطرح.'],
    'ok-crowne-plaza': ['One of the office\'s early resort landscapes in Sharm El-Sheikh: streams, rock gardens and lush planting around the pools, designed and supervised on site to completion.', 'من أوايل مشاريع المكتب في شرم الشيخ: مجاري مياه، حدايق صخرية وزرع كثيف حوالين الحمّامات — تصميم وإشراف على التنفيذ لحد التسليم.'],
    'ok-rixos-sharm': ['Lagoon pools threaded through palm groves, with the levels and the lighting designed together so the gardens read as well at night as by day.', 'بحيرات سباحة ماشية وسط نخيل، المناسيب والإضاءة اتصمموا مع بعض علشان الحدايق تتقري بالليل زي النهار.'],
    'ok-sokhna': ['A resort landscape on the Gulf of Suez stepping from the mountains to the sea, from concept to site supervision. Cityscape Second Best Touristic Resort, 2015.', 'لاند سكيب منتجع على خليج السويس نازل من الجبل للبحر — من التصميم المبدئي لحد الإشراف على التنفيذ. ثاني أفضل منتجع سياحي في سيتي سكيب 2015.'],
  };
  const OFFICE = {
    stats: [[30, '', 'years of practice', 'سنة خبرة'], [90, '+', 'people in the studio', 'في فريق المكتب'], [400, '+', 'projects', 'مشروع'], [12, '', 'awards & honours', 'جايزة وتكريم']],
    about: ['Ökoplan Landscaping is an award-winning landscape architecture consultancy that has been shaping outdoor life in Egypt for nearly three decades. We design sustainable, cost-conscious landscapes with people at their centre — bridging indoor and outdoor with ideas that are both practical and captivating.',
      'أوكوبلان لتنسيق المواقع مكتب استشاري حائز على جوايز، بيشكّل الحياة في الهواء الطلق في مصر من قرابة تلاتين سنة. بنصمم لاند سكيب مستدام وبتكلفة واعية، الإنسان في مركزه — بيوصل بين الداخل والخارج بأفكار عملية وجميلة في نفس الوقت.'],
    vision: ['To be a global, trend-setting design practice that raises the quality of life for present and future generations.', 'نكون مكتب تصميم عالمي بيحدد الاتجاه، ويرفع جودة الحياة للجيل الحالي والأجيال الجاية.'],
    mission: ['To cultivate innovative ideas for the built environment through a passionate, client-focused team that embraces progressive design.', 'نزرع أفكار مبتكرة للبيئة المبنية — بفريق شغوف، قريب من العميل، وبيتبنى أساليب تصميم متقدمة.'],
    values: [['Teamwork', 'العمل الجماعي'], ['Dedication', 'الالتزام'], ['Innovation', 'الابتكار'], ['Transparency', 'الشفافية'], ['Belonging', 'الانتماء'], ['Excellence', 'التميّز']],
    specialisms: [
      ['site', 'Site analysis', 'تحليل الموقع', 'Climate, soil, water, views and the brief — read before the first line is drawn.', 'المناخ والتربة والمياه والمناظر والبرنامج — بنقراهم قبل أول خط.'],
      ['land', 'Landscape design', 'تصميم اللاند سكيب', 'The whole outdoor realm: character, movement, shade, and the spaces between buildings.', 'الفراغ الخارجي كله: الشخصية، الحركة، الظل، والمساحات ما بين المباني.'],
      ['hard', 'Hardscape design', 'تصميم الهارد سكيب', 'Paving, walls, steps and terraces detailed to be built well and to age well.', 'الأرضيات والحوائط والسلالم والمدرّجات — تفاصيل تتنفذ صح وتكبر بالعمر صح.'],
      ['light', 'Lighting design', 'تصميم الإضاءة', 'Gardens that read as well at night as by day, without glare or waste.', 'حدايق تتقري بالليل زي النهار — من غير إبهار ولا هدر.'],
      ['water', 'Water features', 'العناصر المائية', 'Lagoons, streams and pools designed with the levels, the planting and the engineering together.', 'بحيرات ومجاري وحمّامات مصممة مع المناسيب والزرع والهندسة في وقت واحد.'],
      ['plant', 'Planting design', 'اختيار النباتات', 'Palettes chosen for the place — wind, salt, heat and water — so they thrive, not just survive.', 'لوحات زرع متختارة للمكان — ريح وملح وحرارة ومياه — علشان تزدهر مش بس تعيش.'],
      ['art', 'Artwork & sculpture', 'الأعمال الفنية والنحت', 'Selecting and placing art so it belongs to the landscape rather than sits on it.', 'اختيار الأعمال الفنية ومكانها علشان تبقى جزء من اللاند سكيب مش حاجة فوقه.'],
      ['sign', 'Signage & wayfinding', 'اللافتات والإرشاد', 'Quiet, consistent wayfinding that lets guests find their way without noticing it.', 'إرشاد هادي ومتّسق يخلي الضيف يلاقي طريقه من غير ما يحس.'],
    ],
    steps: [
      ['Listening & site analysis', 'الاستماع وتحليل الموقع', 'We walk the land with you, read the climate, soil, water and views, and turn the brief into a shared ambition for the place.', 'بنمشي الأرض معاك، نقرا المناخ والتربة والمياه والمناظر، ونحوّل البرنامج لطموح مشترك للمكان.', 'Site visit · brief · opportunities and constraints'],
      ['Concept design', 'التصميم المبدئي', 'The big idea: character, zoning and movement, the first plans and images — enough to decide with confidence.', 'الفكرة الكبيرة: الشخصية والتقسيم والحركة، أول مخططات وصور — بما يكفي تاخد القرار بثقة.', 'Masterplan · character images · materials direction'],
      ['Schematic design', 'التصميم التخطيطي', 'The concept tested against reality: levels and drainage, planting palettes, water and lighting principles, coordination with the architects.', 'الفكرة بتتختبر على الواقع: المناسيب والصرف، لوحات الزرع، مبادئ المياه والإضاءة، والتنسيق مع المعماريين.', 'Plans and sections · palettes · coordination'],
      ['Design development', 'تطوير التصميم', 'Every element resolved and coordinated with structure, MEP and irrigation, so what is drawn can be built as drawn.', 'كل عنصر بيتحل ويتنسق مع الإنشائي والكهروميكانيك والري — علشان اللي اترسم يتنفذ زي ما اترسم.', 'Detailed plans · typical details · specifications'],
      ['Construction drawings', 'رسومات التنفيذ', 'The documents contractors build from: setting-out, grading, planting, irrigation, lighting and hardscape details.', 'المستندات اللي المقاول بيبني منها: التوقيع والمناسيب والزرع والري والإضاءة وتفاصيل الهارد سكيب.', 'Full drawing set · schedules · specifications'],
      ['Tender documents & support', 'مستندات الطرح والدعم', 'Bills of quantities and specifications ready for pricing, then clarifications and technical evaluation of the offers.', 'جداول الكميات والمواصفات جاهزة للتسعير، وبعدها الردود على الاستفسارات والتقييم الفني للعروض.', 'BOQ · specifications · technical evaluation'],
      ['Site supervision', 'الإشراف على التنفيذ', 'On site until the last tree is in and the first guest arrives — reviewing shop drawings, samples, mock-ups and the work itself.', 'في الموقع لحد ما آخر شجرة تتزرع وأول ضيف يوصل — مراجعة الرسومات التنفيذية والعينات والنماذج والشغل نفسه.', 'Site visits · shop drawings · samples and mock-ups · handover'],
    ],
    awards: [
      ['a1', 2019, 'Lifetime Achievement Award — Landscape Middle East', 'جايزة الإنجاز مدى الحياة — Landscape Middle East', 'Dr. Tarek Sobhy — the first Lifetime Achievement Award for landscape in the Middle East, Dubai', 'د. طارق صبحي — أول جايزة إنجاز مدى الحياة للاند سكيب في الشرق الأوسط، دبي'],
      ['a2', 2018, 'Top Mediterranean Resort — MR&H', 'أفضل منتجع في المتوسط — MR&H', 'Fouka Bay', 'فوكا باي'],
      ['a3', 2018, 'African Property Awards — Best Residential Project in Egypt', 'African Property Awards — أفضل مشروع سكني في مصر', 'IL Monte Galala, Sokhna (Tatweer Misr)', 'إل مونتي جالالا — السخنة (تطوير مصر)'],
      ['a4', 2016, 'Cityscape Residential Global Award', 'Cityscape Residential Global Award', 'IL Monte Galala — the first Egyptian company to win it', 'إل مونتي جالالا — أول شركة مصرية تفوز بيها'],
      ['a5', 2015, 'Cityscape — Best Touristic Resort', 'Cityscape — أفضل منتجع سياحي', 'Telal El-Alamein (Rooya) · second best resort: Telal El-Sokhna', 'تلال العلمين (رؤية) · وثاني أفضل منتجع: تلال السخنة'],
      ['a6', 2013, 'Cityscape — Best Residential', 'Cityscape — أفضل مشروع سكني', 'Stone Park (Rooya)', 'ستون بارك (رؤية)'],
    ],
    collab: [['c1', 'CSCEC', 'Al Alamein Towers', 'أبراج العلمين'], ['c2', 'EDSA · !melk', 'Cairo Capital', 'كايرو كابيتال'], ['c3', 'Zaha Hadid Architects', 'Stone Towers', 'ستون تاورز'], ['c4', 'Gianluca Peluffo & Partners', 'Fouka Bay · IL Monte Galala · Bloomfields', 'فوكا باي · إل مونتي جالالا · بلومفيلدز'], ['c5', 'SASAKI', 'NJIT, Mostakbal City', 'NJIT — مدينة المستقبل'], ['c6', 'GROSS. MAX.', 'Stone Street', 'ستون ستريت'], ['c7', 'GB Design', 'Skywalk', 'سكاي ووك'], ['c8', 'WATG', 'One Ninety · Skywalk', 'ون ناينتي · سكاي ووك'], ['c9', 'SWA', 'Noor, Cairo Capital', 'نور — كايرو كابيتال']],
    partners: 'l01 l02 l03 l04 l05 l06 l07 l08 l09 l10 l11 l12 l13 l14 l15 l16 l17 l18 l19 l21 l22 l23 l24 l25 l26 l27 l28 l29 l30 l31 l32 l33 l34 l35 l37 l38 l39 l40 l41 l42 l43 l44 l46 l47 l48 l49 l51 l53 l101 l103 l104 l106 l107 l108 l110 l111 l112 l113 l115 l116'.split(' '),
    team: Array.from({ length: 40 }, (_, i) => 'p' + String(i + 1).padStart(2, '0')),
    email: 'info@oekoplanlandscaping.com',
    address: ['Sheraton Heliopolis, Cairo, Egypt', 'مساكن شيراتون — مصر الجديدة — القاهرة'],
  };
  const ICON = {
    site: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5M11 7v4l3 2"/>', land: '<path d="M3 20c3-4 6-5 9-2 2-3 5-4 9-1"/><circle cx="7" cy="8" r="3"/><path d="M7 11v5"/><circle cx="16" cy="6" r="3"/><path d="M16 9v6"/>',
    hard: '<path d="M3 9l5-5 5 4-5 5zM13 8l5-4 3 5-5 3zM3 14l5 2 1 5-6-1zM10 17l5-3 5 3-4 4z"/>', light: '<path d="M12 3v2M9 5h6l1 5H8zM12 10v10M8 20h8"/>',
    water: '<path d="M4 14h16M6 14a6 6 0 0 0 12 0M12 3v4M8 6c1 1 2 2 4 1M16 6c-1 1-2 2-4 1M12 7c-2 2-2 4 0 6 2-2 2-4 0-6z"/>', plant: '<path d="M12 21v-8M12 13c-5 0-7-4-7-8 4 0 7 2 7 8zM12 13c5 0 7-4 7-8-4 0-7 2-7 8z"/>',
    art: '<path d="M8 21h8M10 21v-4h4v4M12 3c-3 0-4 3-3 5s3 3 3 5c0-2 2-3 3-5s0-5-3-5z"/>', sign: '<path d="M12 3v18M6 6h11l2 2-2 2H6zM18 13H7l-2 2 2 2h11z"/>',
  };
  const ic = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k] || ''}</svg>`;
  const NAVS = [['index.html', 'Home', 'الرئيسية'], ['work.html', 'Work', 'المشاريع'], ['services.html', 'Services', 'الخدمات'], ['studio.html', 'Studio', 'المكتب'], ['contact.html', 'Contact', 'تواصل معانا']];
  const UI = {
    selected: ['Selected work', 'مشاريع مختارة'], all: ['All work', 'كل المشاريع'], view: ['View project', 'شوف المشروع'], next: ['Next project', 'المشروع اللي بعده'], backWork: ['All projects', 'كل المشاريع'],
    client: ['Client', 'العميل'], location: ['Location', 'المكان'], year: ['Year', 'السنة'], sector: ['Sector', 'القطاع'], scope: ['Our scope', 'نطاق شغلنا'], gallery: ['The project', 'المشروع'],
    numbers: ['The studio in numbers', 'المكتب في أرقام'], how: ['How we work', 'إزاي بنشتغل'], special: ['What we design', 'إيه اللي بنصممه'], sectors: ['Where we work', 'القطاعات'],
    awards: ['Awards & honours', 'جوايز وتكريمات'], collab: ['International collaborations', 'تعاونات دولية'], partners: ['Clients & partners', 'عملاء وشركاء'], team: ['The team', 'الفريق'], leadership: ['Leadership', 'القيادة'],
    talk: ['Start a conversation', 'ابدأ الكلام معانا'], talkSub: ['Tell us about the site and the ambition — we reply within two working days.', 'احكي لنا عن الأرض والطموح — بنرد خلال يومين عمل.'],
    bandH: ['Have a site in mind? Let\'s walk it together.', 'عندك أرض في بالك؟ يلا نمشيها سوا.'], bandB: ['Get in touch', 'تواصل معانا'],
    fName: ['Your name', 'اسمك'], fEmail: ['Email', 'الإيميل'], fPhone: ['Phone', 'التليفون'], fCompany: ['Company / developer', 'الشركة / المطوّر'], fLocation: ['Site location', 'مكان الأرض'], fType: ['Project type', 'نوع المشروع'], fMsg: ['Tell us about the project', 'احكي لنا عن المشروع'], fSend: ['Send enquiry', 'ابعت الطلب'], fSending: ['Sending…', 'بيتبعت…'],
    fOk: ['Thank you — your enquiry reached the studio. We reply within two working days.', 'شكراً — طلبك وصل للمكتب. بنرد خلال يومين عمل.'], fErr: ['Something went wrong. Please email us directly.', 'حصلت مشكلة — ابعت لنا إيميل مباشرة.'], fMissing: ['Please add your name, a way to reach you, and a few words about the project.', 'من فضلك اكتب اسمك، وطريقة نتواصل بيها، وكلمتين عن المشروع.'],
    choose: ['Choose…', 'اختار…'], signin: ['Team sign-in', 'دخول الفريق'], rights: ['All rights reserved.', 'كل الحقوق محفوظة.'], loading: ['Loading the gallery…', 'بنحمّل المعرض…'],
    office: ['Studio', 'المكتب'], mail: ['Email', 'الإيميل'], visit: ['Visit', 'العنوان'], follow: ['Elsewhere', 'في أماكن تانية'],
  };
  const T = k => (UI[k] ? L(UI[k][0], UI[k][1]) : k);

  /* ------------------------------------------------------------------ data */
  let PROJECTS = FALLBACK.slice();
  async function loadProjects() {
    try {
      const r = await fetch(API + '?a=projects', { cache: 'default' }); if (!r.ok) throw new Error(r.status);
      const j = await r.json(); if (j && j.ok && Array.isArray(j.projects) && j.projects.length) PROJECTS = j.projects.filter(p => p.shots && p.shots.length);
    } catch (e) { /* the fallback stays */ }
    return PROJECTS;
  }
  const cover = p => (p.shots && p.shots[0]) || { src: '', full: '' };
  const story = p => { const s = STORY[p.id]; return s ? [L(s[0], s[1])] : [p.about].filter(Boolean); };

  /* ------------------------------------------------------------------ chrome */
  function nav() {
    const here = location.pathname.replace(/^.*\//, '') || 'index.html';
    const el = document.createElement('header'); el.className = 'nav'; el.id = 'nav';
    el.innerHTML = `<div class="wrap"><a class="brand" href="${withLang('index.html')}" aria-label="Ökoplan Landscaping"><img class="lk lkl" src="${SRC}brand/lockup-dark.png" alt="Ökoplan Landscaping"><img class="lk lkd" src="${SRC}brand/lockup.png" alt=""></a>
      <nav class="menu" id="menu">${NAVS.map(n => `<a href="${withLang(n[0])}" class="${here === n[0] ? 'on' : ''}">${esc(L(n[1], n[2]))}</a>`).join('')}<a class="lang" href="${langHref()}" hreflang="${ar() ? 'en' : 'ar'}">${ar() ? 'English' : 'العربية'}</a></nav>
      <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button></div>`;
    document.body.prepend(el);
    $('#burger').addEventListener('click', () => { const o = el.classList.toggle('open'); $('#burger').setAttribute('aria-expanded', o ? 'true' : 'false'); document.body.style.overflow = o ? 'hidden' : ''; });
    const hero = $('.hero, .pfh'); const onS = () => { el.classList.toggle('solid', window.scrollY > (hero ? Math.min(hero.offsetHeight - 80, window.innerHeight * .6) : 10)); }; onS(); addEventListener('scroll', onS, { passive: true });
    if (!hero) document.body.classList.add('light-nav');
  }
  const langHref = () => { const u = new URL(location.href); if (ar()) u.searchParams.delete('lang'); else u.searchParams.set('lang', 'ar'); return u.pathname.replace(/^.*\//, '') + u.search + u.hash; };
  function footer() {
    const el = document.createElement('footer'); const y = new Date().getFullYear();
    el.innerHTML = `<div class="wrap"><div class="cols"><div class="lk"><img src="${SRC}brand/lockup.png" alt="Ökoplan Landscaping"><p>${esc(L(OFFICE.about[0], OFFICE.about[1]).split(/(?<=\.)\s/)[0])}</p></div>
      <div><b>${esc(T('office'))}</b>${NAVS.slice(1).map(n => `<a href="${withLang(n[0])}">${esc(L(n[1], n[2]))}</a>`).join('')}</div>
      <div><b>${esc(T('mail'))}</b><a href="mailto:${OFFICE.email}">${OFFICE.email}</a><b style="margin-top:16px">${esc(T('visit'))}</b><span>${esc(L(OFFICE.address[0], OFFICE.address[1]))}</span></div>
      <div><b>${esc(T('sectors'))}</b>${Object.keys(TYPES).slice(0, 4).map(k => `<a href="${withLang('work.html')}">${esc(typeL(k))}</a>`).join('')}<a href="../" rel="nofollow" style="margin-top:14px;color:var(--moss)">${esc(T('signin'))} →</a></div></div>
      <div class="base"><span>© ${y} Ökoplan Landscaping. ${esc(T('rights'))}</span><span>Cairo · Egypt</span></div></div>`;
    document.body.appendChild(el);
  }
  function band() {
    const el = document.createElement('section'); el.className = 'band';
    el.innerHTML = `<div class="wrap"><h2 class="rv">${esc(T('bandH'))}</h2><a class="btn rv" href="${withLang('contact.html')}">${esc(T('bandB'))} <span aria-hidden="true">${ar() ? '←' : '→'}</span></a></div>`;
    return el;
  }
  function reveal() { const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' }) : null; $$('.rv').forEach(el => io ? io.observe(el) : el.classList.add('in')); }
  const lazy = root => $$('img[data-src]', root || document).forEach(im => { im.src = im.dataset.src; im.removeAttribute('data-src'); im.onload = () => im.classList.add('ok'); if (im.complete && im.naturalWidth) im.classList.add('ok'); });

  /* ------------------------------------------------------------------ pieces */
  const tile = (p, extra) => `<a class="tile ${extra || ''} rv" href="${withLang('work.html?p=' + encodeURIComponent(p.id))}"><div class="ph"><img data-src="${esc(cover(p).src)}" alt="${esc(p.title)}" loading="lazy"></div><div class="cap"><div><b>${esc(p.title)}</b><em>${esc([p.location, typeL(p.type)].filter(Boolean).join(' · '))}</em></div><small>${esc(p.year || '')}</small></div></a>`;
  const numbers = () => `<div class="nums">${OFFICE.stats.map(s => `<div class="num rv"><b><span data-count="${s[0]}">0</span><i>${s[1]}</i></b><span>${esc(L(s[2], s[3]))}</span></div>`).join('')}</div>`;
  function countUp() { const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; io.unobserve(e.target); const el = e.target, to = +el.dataset.count, t0 = performance.now(); const tick = t => { const k = Math.min(1, (t - t0) / 1400), v = Math.round(to * (1 - Math.pow(1 - k, 3))); el.textContent = v; if (k < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); })); $$('[data-count]').forEach(el => io.observe(el)); }
  const partnersMarquee = () => { const row = OFFICE.partners.map(k => `<img src="${SRC}partners/${k}.png" alt="" loading="lazy">`).join(''); return `<div class="marq" aria-label="${esc(T('partners'))}"><div class="tr">${row}${row}</div></div>`; };
  const awardsList = (n) => `<div class="awards">${OFFICE.awards.slice(0, n || 99).map(a => `<div class="aw rv"><img src="${SRC}awards/${a[0]}.png" alt=""><span class="y">${a[1]}</span><b>${esc(L(a[2], a[3]))}</b><small>${esc(L(a[4], a[5]))}</small></div>`).join('')}</div>`;
  const collabGrid = () => `<div class="collab">${OFFICE.collab.map(c => `<div class="rv"><img src="${SRC}collab/${c[0]}.png" alt="${esc(c[1])}"><div><b>${esc(c[1])}</b><small>${esc(L(c[2], c[3]))}</small></div></div>`).join('')}</div>`;
  const specGrid = () => `<div class="spec">${OFFICE.specialisms.map(s => `<div class="rv">${ic(s[0])}<div><b>${esc(L(s[1], s[2]))}</b><small>${esc(L(s[3], s[4]))}</small></div></div>`).join('')}</div>`;
  const stepsList = () => `<div class="steps">${OFFICE.steps.map(s => `<div class="step rv"><h3>${esc(L(s[0], s[1]))}</h3><p>${esc(L(s[2], s[3]))}<small>${esc(s[4])}</small></p></div>`).join('')}</div>`;
  const sectorsRow = () => `<div class="sectors">${Object.keys(TYPES).map(k => `<span class="rv">${esc(typeL(k))}</span>`).join('')}</div>`;
  const sechead = (eye, h, more, href) => `<div class="sechead"><div><div class="eyebrow rv">${esc(eye)}</div><h2 class="rv">${esc(h)}</h2></div>${more ? `<a class="more rv" href="${withLang(href)}">${esc(more)} ${ar() ? '←' : '→'}</a>` : ''}</div>`;

  /* ------------------------------------------------------------------ pages */
  const PAGES = {
    async home(main) {
      const heroP = PROJECTS[0] || FALLBACK[0];
      main.innerHTML = `<section class="hero"><img src="${esc(cover(heroP).full || cover(heroP).src)}" alt="" fetchpriority="high"><div class="wrap"><div><div class="eyebrow">${esc(L('Landscape architecture · Cairo', 'عمارة اللاند سكيب · القاهرة'))}</div><h1>${esc(L('Landscapes people return to.', 'لاند سكيب الناس بترجع له.'))}</h1></div><div><p>${esc(L('Three decades of resorts, residences and public places across Egypt — designed to be lived in, built well, and to grow more beautiful with time.', 'تلاتين سنة من المنتجعات والمجمعات السكنية والأماكن العامة في مصر — متصممة تتعاش، تتنفذ صح، وتبقى أجمل مع الوقت.'))}</p><a class="cta" href="${withLang('work.html')}">${esc(T('all'))} <span aria-hidden="true">${ar() ? '←' : '→'}</span></a></div></div><div class="scrolldown" aria-hidden="true"></div><span class="cap">${esc(heroP.title)}${heroP.location ? ' — ' + esc(heroP.location) : ''}</span></section>
      <section class="sec"><div class="wrap intro"><p class="lead rv">${esc(L('We design outdoor places with people at their centre — bridging indoor and outdoor with ideas that are practical and captivating.', 'بنصمم أماكن في الهواء الطلق الإنسان في مركزها — بنوصل بين الداخل والخارج بأفكار عملية وجميلة في نفس الوقت.'))}</p><div class="txt rv"><p>${esc(L(OFFICE.about[0], OFFICE.about[1]))}</p><p>${esc(L('From the first site walk to the last planted tree, one team carries the project: analysis, concept, detailed design, tender documents and supervision on site.', 'من أول مشية في الأرض لحد آخر شجرة تتزرع، فريق واحد شايل المشروع: التحليل والفكرة والتصميم التفصيلي ومستندات الطرح والإشراف في الموقع.'))}</p></div></div>
        <div class="wrap" style="margin-top:clamp(40px,6vw,80px)">${numbers()}</div></section>
      <section class="sec tight"><div class="wrap">${sechead(T('selected'), L('Resorts, residences and public places', 'منتجعات ومجمعات سكنية وأماكن عامة'), T('all'), 'work.html')}<div class="grid home">${PROJECTS.slice(0, 4).map(p => tile(p)).join('')}</div></div></section>
      <section class="sec alt"><div class="wrap">${sechead(T('how'), L('One team, from the brief to the site', 'فريق واحد من البرنامج لحد الموقع'), L('Our services', 'خدماتنا'), 'services.html')}${specGrid()}</div></section>
      <section class="sec"><div class="wrap">${sechead(T('awards'), L('Recognised at home and abroad', 'تكريم في مصر وبرّه'), L('The studio', 'المكتب'), 'studio.html')}${awardsList(3)}</div>
        <div class="wrap" style="margin-top:clamp(36px,5vw,64px)"><div class="eyebrow rv" style="margin-bottom:18px">${esc(T('partners'))}</div></div>${partnersMarquee()}</section>`;
      main.appendChild(band());
    },
    async work(main) {
      const id = qs.get('p'); const p = id && PROJECTS.find(x => x.id === id);
      if (p) return PAGES.project(main, p);
      const types = Array.from(new Set(PROJECTS.map(x => x.type).filter(Boolean)));
      const locs = Array.from(new Set(PROJECTS.map(x => (x.location || '').split(',')[0].trim()).filter(Boolean)));
      main.innerHTML = `<section class="sec" style="padding-top:calc(72px + clamp(40px,7vw,96px))"><div class="wrap"><div class="eyebrow rv">${esc(L('Work', 'المشاريع'))}</div><h1 class="rv" style="margin-top:14px;max-width:14ch">${esc(L('Places we have shaped', 'أماكن إحنا شكّلناها'))}</h1>
        <div class="filters rv" id="filters" style="margin-top:clamp(28px,4vw,48px)"><button class="on" data-f="">${esc(T('all'))}</button>${types.length > 1 ? '<span class="sep"></span>' + types.map(t => `<button data-f="t:${esc(t)}">${esc(typeL(t))}</button>`).join('') : ''}${locs.length > 1 ? '<span class="sep"></span>' + locs.map(l => `<button data-f="l:${esc(l)}">${esc(l)}</button>`).join('') : ''}</div>
        <div class="grid work" id="grid"></div></div></section>`;
      const grid = $('#grid'); const draw = f => { const xs = PROJECTS.filter(x => !f || (f.startsWith('t:') ? x.type === f.slice(2) : (x.location || '').startsWith(f.slice(2)))); grid.innerHTML = xs.map(x => tile(x)).join('') || `<div class="empty" style="grid-column:1/-1">—</div>`; lazy(grid); reveal(); };
      draw(''); $('#filters').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#filters button').forEach(x => x.classList.toggle('on', x === b)); draw(b.dataset.f); });
      main.appendChild(band());
    },
    async project(main, p) {
      document.title = `${p.title} — Ökoplan Landscaping`;
      const i = PROJECTS.indexOf(p); const nx = PROJECTS[(i + 1) % PROJECTS.length]; const c = cover(p); const st = story(p);
      const sizes = ['w', '', '', 't', 't', 't', 'w', '', ''];
      main.innerHTML = `<section class="pfh"><img src="${esc(c.full || c.src)}" alt=""><div class="wrap"><small>${esc([p.client, p.location].filter(Boolean).join(' · '))}</small><h1>${esc(p.title)}</h1></div></section>
      <section class="wrap"><div class="facts rv"><div><small>${esc(T('client'))}</small><b>${esc(p.client || '—')}</b></div><div><small>${esc(T('location'))}</small><b>${esc(p.location || '—')}</b></div><div><small>${esc(T('year'))}</small><b>${esc(p.year || '—')}</b></div><div><small>${esc(T('sector'))}</small><b>${esc(typeL(p.type) || '—')}</b></div></div>
        <div class="story"><p class="lead rv">${esc(st[0] || L('A landscape designed to be lived in and to grow more beautiful with time.', 'لاند سكيب متصمم يتعاش ويبقى أجمل مع الوقت.'))}</p><div class="txt rv">${st.slice(1).map(s => `<p>${esc(s)}</p>`).join('')}${p.area ? `<p>${esc(p.area)}</p>` : ''}${p.services && p.services.length ? `<div class="eyebrow" style="margin-top:${st.length > 1 || p.area ? 22 : 0}px">${esc(T('scope'))}</div><div class="tags">${p.services.map(s => `<span>${esc(svcL(s))}</span>`).join('')}</div>` : ''}${p.behance ? `<p style="margin-top:18px"><a class="back" style="margin:0" href="${esc(p.behance)}" target="_blank" rel="noopener">Behance →</a></p>` : ''}</div></div>
        <div class="shots">${p.shots.slice(1).map((s, k) => `<figure class="${sizes[k % sizes.length]} rv" data-i="${k + 1}"><img data-src="${esc(s.src)}" alt="${esc(p.title)} — ${k + 2}" loading="lazy"></figure>`).join('')}</div>
        <a class="back" href="${withLang('work.html')}">${ar() ? '→' : '←'} ${esc(T('backWork'))}</a></section>
      ${nx && nx !== p ? `<a class="nextp" href="${withLang('work.html?p=' + encodeURIComponent(nx.id))}"><img data-src="${esc(cover(nx).src)}" alt=""><div class="wrap"><small>${esc(T('next'))}</small><h2>${esc(nx.title)}</h2></div></a>` : ''}
      <div class="lb" id="lb" role="dialog" aria-modal="true"><button class="x" id="lbx">✕</button><button class="p" id="lbp">${ar() ? '→' : '←'}</button><button class="n" id="lbn">${ar() ? '←' : '→'}</button><img id="lbi" alt=""><div class="c" id="lbc"></div></div>`;
      let cur = 0; const lb = $('#lb'); const show = k => { cur = (k + p.shots.length) % p.shots.length; $('#lbi').src = p.shots[cur].full || p.shots[cur].src; $('#lbc').textContent = `${p.title} · ${cur + 1} / ${p.shots.length}`; lb.classList.add('on'); document.body.style.overflow = 'hidden'; };
      const hide = () => { lb.classList.remove('on'); document.body.style.overflow = ''; };
      $$('.shots figure').forEach(f => f.addEventListener('click', () => show(+f.dataset.i))); $('.pfh img').style.cursor = 'zoom-in'; $('.pfh').addEventListener('click', e => { if (e.target.tagName === 'IMG') show(0); });
      $('#lbx').onclick = hide; $('#lbp').onclick = () => show(cur - 1); $('#lbn').onclick = () => show(cur + 1); lb.addEventListener('click', e => { if (e.target === lb) hide(); });
      addEventListener('keydown', e => { if (!lb.classList.contains('on')) return; if (e.key === 'Escape') hide(); if (e.key === 'ArrowRight') show(cur + (ar() ? -1 : 1)); if (e.key === 'ArrowLeft') show(cur + (ar() ? 1 : -1)); });
      let tx = null; lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true }); lb.addEventListener('touchend', e => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); tx = null; });
    },
    async services(main) {
      const h = PROJECTS.find(x => x.id === 'ok-crowne-plaza') || PROJECTS[1] || FALLBACK[3];
      main.innerHTML = `<section class="hero short"><img src="${esc(cover(h).full || cover(h).src)}" alt=""><div class="wrap"><div><div class="eyebrow">${esc(L('Services', 'الخدمات'))}</div><h1>${esc(L('One team, from the brief to the last tree.', 'فريق واحد — من البرنامج لحد آخر شجرة.'))}</h1></div></div></section>
      <section class="sec"><div class="wrap intro"><p class="lead rv">${esc(L('We stay with a project from the first site walk to handover, so nothing is lost between the idea and the built place.', 'بنفضل مع المشروع من أول مشية في الأرض لحد التسليم — علشان مفيش حاجة تضيع ما بين الفكرة والمكان المبني.'))}</p><div class="txt rv"><p>${esc(L('Developers and hotel operators come to us for landscapes that work hard: easy to maintain, generous with shade and water where it matters, and built from documents that leave no guesswork on site.', 'المطوّرين ومشغّلي الفنادق بييجوا لنا علشان لاند سكيب بيشتغل بجد: سهل في الصيانة، كريم في الظل والمياه في المكان المناسب، ومبني من مستندات ما بتسيبش تخمين في الموقع.'))}</p><p>${esc(L('Every stage below can be commissioned on its own — most clients keep us for all seven.', 'كل مرحلة تحت ممكن تتطلب لوحدها — وأغلب العملا بيكملوا معانا السبعة.'))}</p></div></div></section>
      <section class="sec tight"><div class="wrap">${sechead(T('how'), L('Seven stages, one responsibility', 'سبع مراحل ومسؤولية واحدة'))}${stepsList()}</div></section>
      <section class="sec alt"><div class="wrap">${sechead(T('special'), L('The disciplines inside every project', 'التخصصات جوه كل مشروع'))}${specGrid()}</div></section>
      <section class="sec"><div class="wrap">${sechead(T('sectors'), L('Resorts first — and well beyond', 'المنتجعات أولاً — وأبعد منها بكتير'))}${sectorsRow()}</div></section>`;
      main.appendChild(band());
    },
    async studio(main) {
      main.innerHTML = `<section class="hero short"><img src="${SRC}brand/cover-1.jpg" alt=""><div class="wrap"><div><div class="eyebrow">${esc(L('The studio', 'المكتب'))}</div><h1>${esc(L('Nearly thirty years of outdoor life in Egypt.', 'قرابة تلاتين سنة من الحياة في الهواء الطلق في مصر.'))}</h1></div></div></section>
      <section class="sec"><div class="wrap intro"><p class="lead rv">${esc(L(OFFICE.about[0], OFFICE.about[1]))}</p><div class="txt rv"><div class="vm" style="border:0;padding:0;grid-template-columns:1fr"><div><h3>${esc(L('Vision', 'رؤيتنا'))}</h3><p>${esc(L(OFFICE.vision[0], OFFICE.vision[1]))}</p></div><div><h3>${esc(L('Mission', 'مهمتنا'))}</h3><p>${esc(L(OFFICE.mission[0], OFFICE.mission[1]))}</p></div><div><h3>${esc(L('Values', 'قيمنا'))}</h3><div class="vals">${OFFICE.values.map(v => `<span>${esc(L(v[0], v[1]))}</span>`).join('')}</div></div></div></div></div>
        <div class="wrap" style="margin-top:clamp(40px,6vw,80px)">${numbers()}</div></section>
      <section class="sec alt"><div class="wrap">${sechead(T('leadership'), L('Dr. Tarek Sobhy', 'د. طارق صبحي'))}<div class="split"><div class="ph rv"><img src="${SRC}brand/tarek.jpg" alt="Dr. Tarek Sobhy"></div><div class="txt rv"><p class="lead">${esc(L('Founder and principal. In 2019 he received the first Lifetime Achievement Award given by Landscape Middle East — a recognition of three decades shaping the discipline in Egypt and the region.', 'المؤسس ورئيس المكتب. سنة 2019 استلم أول جايزة إنجاز مدى الحياة بتمنحها Landscape Middle East — تقدير لتلاتين سنة من تشكيل المهنة في مصر والمنطقة.'))}</p><p>${esc(L('He leads every project personally from the first site walk, with a studio of more than ninety landscape architects, engineers and site supervisors behind him.', 'بيقود كل مشروع بنفسه من أول مشية في الأرض، ووراه مكتب فيه أكتر من تسعين مهندس لاند سكيب ومهندس ومشرف موقع.'))}</p><div class="name"><img src="${SRC}brand/sig.png" alt=""><div><b>Dr. Tarek Sobhy</b><small>${esc(L('Founder & Principal', 'المؤسس ورئيس المكتب'))}</small></div></div></div></div></div></section>
      <section class="sec"><div class="wrap">${sechead(T('team'), L('Ninety people, one studio', 'تسعين شخص ومكتب واحد'))}<div class="team rv">${OFFICE.team.map(k => `<img src="${SRC}team/${k}.jpg" alt="" loading="lazy">`).join('')}</div></div></section>
      <section class="sec alt"><div class="wrap">${sechead(T('awards'), L('Recognised at home and abroad', 'تكريم في مصر وبرّه'))}${awardsList()}</div></section>
      <section class="sec"><div class="wrap">${sechead(T('collab'), L('Alongside the world\'s studios', 'جنب مكاتب العالم'))}${collabGrid()}</div>
        <div class="wrap" style="margin-top:clamp(48px,7vw,96px)"><div class="eyebrow rv" style="margin-bottom:18px">${esc(T('partners'))}</div></div>${partnersMarquee()}</section>`;
      main.appendChild(band());
    },
    async contact(main) {
      main.innerHTML = `<section class="sec" style="padding-top:calc(72px + clamp(40px,7vw,96px))"><div class="wrap contact"><div class="info"><div class="eyebrow rv">${esc(L('Contact', 'تواصل معانا'))}</div><h1 class="rv" style="margin:14px 0 22px;font-size:clamp(36px,4.6vw,64px)">${esc(T('talk'))}</h1><p class="rv" style="font-size:17px;color:var(--ink-2)">${esc(T('talkSub'))}</p>
          <p class="rv" style="margin-top:36px"><small>${esc(T('mail'))}</small><a href="mailto:${OFFICE.email}">${OFFICE.email}</a></p><p class="rv"><small>${esc(T('visit'))}</small>${esc(L(OFFICE.address[0], OFFICE.address[1]))}</p></div>
        <form class="form rv" id="f" novalidate><div class="f"><label for="fn">${esc(T('fName'))}</label><input id="fn" name="name" required autocomplete="name"></div><div class="f"><label for="fc">${esc(T('fCompany'))}</label><input id="fc" name="company" autocomplete="organization"></div>
          <div class="f"><label for="fe">${esc(T('fEmail'))}</label><input id="fe" name="email" type="email" autocomplete="email" inputmode="email"></div><div class="f"><label for="fp">${esc(T('fPhone'))}</label><input id="fp" name="phone" type="tel" autocomplete="tel" inputmode="tel" dir="ltr"></div>
          <div class="f"><label for="fl">${esc(T('fLocation'))}</label><input id="fl" name="location"></div><div class="f"><label for="ft">${esc(T('fType'))}</label><select id="ft" name="type"><option value="">${esc(T('choose'))}</option>${Object.keys(TYPES).map(k => `<option value="${k}">${esc(typeL(k))}</option>`).join('')}</select></div>
          <div class="f full"><label for="fm">${esc(T('fMsg'))}</label><textarea id="fm" name="message" required></textarea></div><input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="full" style="display:flex;align-items:center;gap:18px;flex-wrap:wrap"><button class="btn" type="submit" id="send">${esc(T('fSend'))} <span aria-hidden="true">${ar() ? '←' : '→'}</span></button><span class="note" id="msg"></span></div></form></div></section>`;
      $('#f').addEventListener('submit', async e => {
        e.preventDefault(); const f = e.target; const d = Object.fromEntries(new FormData(f).entries()); const msg = $('#msg'); const btn = $('#send');
        if (!String(d.name || '').trim() || (!String(d.email || '').trim() && !String(d.phone || '').trim()) || !String(d.message || '').trim()) { msg.className = 'note err'; msg.textContent = T('fMissing'); return; }
        btn.disabled = true; btn.firstChild.textContent = T('fSending') + ' '; msg.className = 'note'; msg.textContent = '';
        try { const r = await fetch(API, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(Object.assign({ a: 'enquiry', lang: LANG }, d)) }); const j = await r.json(); if (!j.ok) throw new Error(j.error || 'x'); msg.className = 'note ok'; msg.textContent = T('fOk'); f.reset(); }
        catch (err) { msg.className = 'note err'; msg.innerHTML = `${esc(T('fErr'))} <a href="mailto:${OFFICE.email}" style="border-bottom:1px solid currentColor">${OFFICE.email}</a>`; }
        btn.disabled = false; btn.firstChild.textContent = T('fSend') + ' ';
      });
    },
  };

  /* ------------------------------------------------------------------ boot */
  async function boot() {
    document.documentElement.lang = ar() ? 'ar' : 'en'; document.documentElement.dir = ar() ? 'rtl' : 'ltr';
    const page = document.body.dataset.page || 'home'; const main = $('#main') || document.body.appendChild(Object.assign(document.createElement('main'), { id: 'main' }));
    nav();
    if (page === 'home' || page === 'work' || page === 'services') await loadProjects();
    await PAGES[page](main);
    footer(); lazy(); reveal(); if ($('[data-count]')) countUp();
    const tt = { home: ['Ökoplan Landscaping — Landscape architecture, Cairo', 'أوكوبلان لتنسيق المواقع — عمارة اللاند سكيب، القاهرة'], work: ['Work — Ökoplan Landscaping', 'المشاريع — أوكوبلان'], services: ['Services — Ökoplan Landscaping', 'الخدمات — أوكوبلان'], studio: ['The studio — Ökoplan Landscaping', 'المكتب — أوكوبلان'], contact: ['Contact — Ökoplan Landscaping', 'تواصل معانا — أوكوبلان'] };
    if (!qs.get('p') && tt[page] && ar()) document.title = tt[page][1];
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
