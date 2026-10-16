#!/usr/bin/env python3
"""Ökoplan Landscaping — derive the oekoplan/ build from the live studioz/ build.

The engine is the same file as the factory / studio / construction (one index.html built from parts/).
Like the construction build (lightpub.py), this is a list of replace() calls on the studio index
plus one add-on script (oekoplan/oekoplan.js) loaded after the app. Re-run after every studio publish:

    python3 oekoplan/_src/mk-oeko.py            # from the repo root

Inputs : studioz/index.html, studioz/en.json, studioz/sw.js, studioz/BUILD.txt, oekoplan/_src/brand/*.png
Outputs: oekoplan/index.html, oekoplan/en.json, oekoplan/sw.js, oekoplan/BUILD.txt (config.js / manifest / icons / oekoplan.js are kept)
"""
import base64, json, os, re, sys, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, 'studioz')
DST = os.path.join(ROOT, 'oekoplan')
BRAND = os.path.join(DST, '_src', 'brand')

def b64(name):
    with open(os.path.join(BRAND, name), 'rb') as f:
        return 'data:image/png;base64,' + base64.b64encode(f.read()).decode()

NAME = 'Ökoplan Landscaping'
DOMAIN = 'oekoplanlandscaping.com'

html = open(os.path.join(SRC, 'index.html'), encoding='utf-8').read()
# v7.66+: the studio ships its code in app.js — put it back inline (exactly as the studio's own nfAppSource() does) so every
# replacement below sees one page; the derived page is split again at the end with Ökoplan's build tag.
_m = re.search(r'<script src="([^"]+)" data-nf-app></script>', html)
if _m:
    _js = open(os.path.join(SRC, _m.group(1).split('?')[0]), encoding='utf-8').read()
    html = html.replace(_m.group(0), '<script>\n' + _js + '</script>', 1)
STU_FULL = html
n0 = len(html)

AR_REPL = []
def rep(old, new, count=None, must=True):
    global html
    if '<' not in old and '\n' not in old: AR_REPL.append((old, new))
    c = html.count(old)
    if must and c == 0:
        sys.exit(f'!! pattern not found: {old[:80]!r}')
    if count is not None and c != count:
        sys.exit(f'!! expected {count} of {old[:60]!r}, found {c}')
    html = html.replace(old, new)
    return c

# --- head
rep('<title>Ninety Studioz</title>', f'<title>{NAME}</title>', 1)
rep('<meta name="description" content="نظام إدارة مكتب Ninety Studioz — الحضور والإجازات واللائحة والمشاريع">',
    f'<meta name="description" content="{NAME} office system — attendance, leave, projects and deliverables">\n<meta property="og:title" content="{NAME}">\n<meta property="og:description" content="{NAME} office system — attendance, leave, projects and deliverables">\n<meta property="og:image" content="https://mahmoudfawzy1212mf-crypto.github.io/oekoplan/icons/icon-512.png">\n<meta property="og:locale" content="en_US">', 1)
rep('<html lang="ar" dir="rtl">', '<html lang="en" dir="ltr">', 1)

# ---- Ökoplan menu modules (Mahmoud, 16 Oct): Projects · Intelligence · Design · Communication · Business development · HR · Accounts · Management
rep("""      add: [{ key: 'design', ar: 'التصميم', en: 'Design', ids: ['concept', 'studio'], before: 'clients' }, { key: 'comm', ar: 'التواصل', en: 'Communication', ids: ['tasks', 'pchats', 'meetings', 'ai'], before: 'clients' }],
      into: [{ near: 'projects', ids: ['projects', 'pm', 'studioos'] }, { near: 'settings', ids: ['reports', 'org', 'stuorg', 'audit', 'regulation', 'settings'] }],
      rename: [],""",
"""      add: [{ key: 'intel', ar: 'الذكاء', en: 'Intelligence', ids: ['oksmart', 'ai', 'oklearn', 'okrules'], before: 'clients' }, { key: 'design', ar: 'التصميم', en: 'Design', ids: ['concept', 'studio'], before: 'clients' }, { key: 'comm', ar: 'التواصل', en: 'Communication', ids: ['tasks', 'pchats', 'meetings', 'mail'], before: 'clients' }],
      into: [{ near: 'projects', ids: ['projects', 'pm', 'studioos', 'oktimeline', 'portfolio', 'okpipeedit'] }, { near: 'clients', ids: ['enquiries', 'clients', 'quotes'] }, { near: 'settings', ids: ['reports', 'org', 'stuorg', 'audit', 'regulation', 'okabout', 'rdesk', 'settings'] }],
      rename: [{ near: 'clients', ar: 'تطوير الأعمال', en: 'Business development' }],""", 1)
rep('<meta name="apple-mobile-web-app-title" content="Ninety Studioz">', '<meta name="apple-mobile-web-app-title" content="Ökoplan">', 1)  # iOS shows ~11 characters under the icon

# --- logos: the NINETY wordmark / mark become the Ökoplan lockup / square mark (data URIs, like the originals)
html = re.sub(r"const LOGO_SRC = 'data:image/png;base64,[^']*'", lambda m: "const LOGO_SRC = '" + b64('lockup.png') + "'", html, count=1)
html = re.sub(r"const LOGO_MARK = 'data:image/png;base64,[^']*'", lambda m: "const LOGO_MARK = '" + b64('mark.png') + "'", html, count=1)
rep("const BRAND_TAGLINE = 'STUDIO MANAGEMENT';", "const BRAND_TAGLINE = '';", 1)

# --- internal login e-mail domain (auth users are <phone>@domain)
rep("SB_EMAIL_DOMAIN = 'ninetystudioz.com'", f"SB_EMAIL_DOMAIN = '{DOMAIN}'", 1)

# --- names everywhere (UI strings, defaults, titles)
rep('Ninety Degree Studio', NAME)
rep('Ninety Studioz', NAME)
rep('ninetystudioz.com', DOMAIN)
rep('A story in every frame', 'Designing landscapes that live')
rep('Architectural visualization studio', 'Landscape architecture · consulting · site supervision')
rep('النشاط الأساسي: الإظهار المعماري (ArchViz) والتصميم', 'النشاط الأساسي: تصميم اللاند سكيب والاستشارات والإشراف على التنفيذ')
rep('الشريك المؤسس والآرت دايركتور', 'مدير التصميم')
rep('الآرت دايركتور', 'مدير التصميم')
rep('المالك والمدير التنفيذي', 'صاحب المكتب')
rep('بشركة نينتي ديجري', 'بشركة أوكوبلان لتنسيق المواقع', must=False)
rep('نينتي ديجري', 'أوكوبلان', must=False)
rep('الاستوديو', 'المكتب')
rep('the studio', 'the office')
rep('The studio', 'The office')
# --- «Projects Gallery»: the engine's portfolio module (add / edit / delete / publish, shots at full quality) is the office's gallery
rep("'شغل المكتب'", "'معرض المشاريع'")
rep("short: 'شغلنا'", "short: 'المعرض'", 1)
rep("'من شغل المكتب'", "'من معرض المشاريع'")
rep("'Studio work'", "'Projects Gallery'")
rep("'From the studio\\'s work'", "'From the projects gallery'", must=False)
rep("'From the office\\'s work'", "'From the projects gallery'", must=False)
rep("'المشاريع اللي خلصناها', 'The projects we finished'", "'مشاريع المكتب', 'The office\\'s projects'", 1)
rep("'مشروع قديم', 'Old project'", "'إضافة مشروع', 'Add project'")
# the home strip: landscape types, no year, no file name
rep("({ ext: L('خارجي', 'Exterior'), int: L('داخلي', 'Interior'), master: L('ماستر بلان', 'Masterplan'), video: L('فيديو', 'Video'), anim: L('أنيميشن', 'Animation') })[e.type]",
    "({ hotel: L('فنادق ومنتجعات', 'Hotels & Resorts'), res: L('سكني', 'Residential'), urban: L('تخطيط عمراني', 'Urban Planning'), com: L('تجاري وترفيهي', 'Retail & Entertainment'), edu: L('تعليمي وثقافي', 'Educational & Cultural'), gov: L('حكومي', 'Governmental'), park: L('حدائق عامة', 'Public Parks') })[e.type]", 1)
rep("${e.year ? `<span class=\"shd\">${esc(String(e.year))}</span>` : ''}${n ? `<span class=\"shd\">${nShots(n)}</span>` : ''}${f ? `<span class=\"shd shfn notr\" dir=\"auto\">${esc(shotName(f))}</span>` : ''}",
    "${n ? `<span class=\"shd\">${nShots(n)}</span>` : ''}", 1)
# landscape project types instead of archviz ones
rep("const TYPES = { ext: ['خارجي', 'Exterior'], int: ['داخلي', 'Interior'], master: ['ماستر بلان', 'Masterplan'], video: ['فيديو', 'Video'], anim: ['أنيميشن', 'Animation'] };",
    "const TYPES = { hotel: ['فنادق ومنتجعات', 'Hotels & Resorts'], res: ['سكني', 'Residential'], urban: ['تخطيط عمراني', 'Urban Planning'], com: ['تجاري وترفيهي', 'Retail & Entertainment'], edu: ['تعليمي وثقافي', 'Educational & Cultural'], gov: ['حكومي', 'Governmental'], park: ['حدائق عامة', 'Public Parks'] };", 1)
# no year on the gallery (Mahmoud, 13 Oct) — the field stays in the form for the record
rep("const metaLine = e => [e.client, e.year, e.location].filter(Boolean).join(' · ');", "const metaLine = e => [e.client, e.location].filter(Boolean).join(' · ');", 1)
rep("[L('السنة', 'Year'), e.year], ", "", 1)
# shots kept as URLs (the profile photos) open at full size in the show
rep("src: HQ.get(f.id) || (f.store === 'sb' ? '' : f.thumb || ''), load: () => hqUrl(f)", "src: HQ.get(f.id) || (f.store === 'sb' ? '' : f.full || f.thumb || ''), load: () => hqUrl(f)", 1)

# --- language: Ökoplan is not the (English-only) studio — English by default (Mahmoud, 14 Oct), the device / person choice is kept (nf.lang)
rep("const I18N_STU = (() => { try { return (window.NF_CONFIG && window.NF_CONFIG.company === 'studioz') || window.NF_CO === 'studioz'; } catch (e) { return false; } })();",
    "const I18N_STU = false; /* Ökoplan: English by default, choice kept per device (mk-oeko.py) */", 1)
rep("const I18N_KEY = I18N_STU ? 'nf.lang.stu' : 'nf.lang', I18N_DEF = I18N_STU ? 'en' : 'ar';", "const I18N_KEY = I18N_STU ? 'nf.lang.stu' : 'nf.lang', I18N_DEF = 'en';", 1)

# --- Projects & Tasks (PM) templates: the landscape pipeline instead of the ArchViz / Interior boards
_t0 = html.index("  const TPL = {\n    stills:"); _t1 = html.index("  const defaultRules = groups =>", _t0)
TPL_JS = """  const TPL = {
    full: { l: 'لاند سكيب — تصميم كامل', d: 'من رفع الموقع والكونسبت لحد مستندات الطرح والإشراف — مراحل المكتب السبعة.', groups: [
      ['Site Survey & Data', '#6b7f99', [['Client brief & scope meeting', 1, 4], ['Site visit, survey & photos', 2, 12], ['Base map, levels & existing trees', 2, 10]]],
      ['Concept Design', '#7d6f9c', [['Design narrative & mood board', 2, 10], ['Zoning & preliminary master plan', 4, 24], ['Circulation, axes & entrances', 2, 10], ['Preliminary plant & material palette', 2, 8], ['Concept 3D views', 3, 20], ['Concept presentation & client approval', 1, 6]]],
      ['Schematic Design', '#8a7a63', [['Developed master plan', 4, 24], ['Hardscape layout & levels', 3, 18], ['Softscape layout & planting zones', 3, 18], ['Water features & lighting concept', 2, 10], ['Schematic presentation & approval', 1, 6]]],
      ['Design Development', '#b07d48', [['Grading & drainage plan', 3, 18], ['Hardscape details & materials', 4, 24], ['Planting plan & plant schedule', 4, 24], ['Irrigation concept', 2, 10], ['Landscape lighting plan', 2, 10], ['Coordination with architecture & MEP', 2, 8]]],
      ['Tender / Detailed Drawings', '#5f8f7a', [['Hardscape construction drawings', 5, 36], ['Softscape & planting drawings', 4, 28], ['Irrigation drawings', 3, 20], ['Lighting & electrical drawings', 3, 18], ['Details & sections', 4, 24]]],
      ['BOQ & Specifications', '#4f86a8', [['Bill of quantities', 3, 18], ['Technical specifications', 2, 12], ['Tender package issue', 1, 4]]],
      ['Site Supervision', '#3aa874', [['Shop drawings & material approvals', 5, 20], ['Site visits & reports', 10, 40], ['Planting inspection & handover', 2, 10]]]] },
    concept: { l: 'لاند سكيب — كونسبت وتمهيدي', d: 'رفع الموقع، الكونسبت والتصميم التمهيدي لحد اعتماد العميل.', groups: [
      ['Site Survey & Data', '#6b7f99', [['Client brief & scope meeting', 1, 4], ['Site visit, survey & photos', 2, 12], ['Base map & existing conditions', 2, 10]]],
      ['Concept Design', '#7d6f9c', [['Design narrative & mood board', 2, 10], ['Zoning & preliminary master plan', 4, 24], ['Preliminary plant & material palette', 2, 8], ['Concept 3D views', 3, 20], ['Concept presentation & approval', 1, 6]]],
      ['Schematic Design', '#8a7a63', [['Developed master plan', 4, 24], ['Hardscape & softscape layouts', 4, 24], ['Schematic presentation & approval', 1, 6]]]] },
    tender: { l: 'لاند سكيب — رسومات تنفيذية ومستندات طرح', d: 'تطوير التصميم، الرسومات التنفيذية (هارد سكيب · سوفت سكيب · ري · إضاءة) والمقايسة.', groups: [
      ['Design Development', '#b07d48', [['Grading & drainage plan', 3, 18], ['Hardscape details & materials', 4, 24], ['Planting plan & plant schedule', 4, 24], ['Irrigation & lighting concepts', 3, 16]]],
      ['Tender / Detailed Drawings', '#5f8f7a', [['Hardscape construction drawings', 5, 36], ['Softscape & planting drawings', 4, 28], ['Irrigation drawings', 3, 20], ['Lighting & electrical drawings', 3, 18], ['Details & sections', 4, 24]]],
      ['BOQ & Specifications', '#4f86a8', [['Bill of quantities', 3, 18], ['Technical specifications', 2, 12], ['Tender package issue', 1, 4]]]] },
    super: { l: 'إشراف على التنفيذ', d: 'اعتماد الشوب دروينج والعينات، زيارات الموقع والتقارير، واستلام الزراعة.', groups: [
      ['Site Supervision', '#3aa874', [['Shop drawings review', 4, 16], ['Material & plant samples approval', 3, 12], ['Weekly site visits & reports', 10, 40], ['Irrigation testing', 2, 8], ['Planting inspection & snag list', 2, 10], ['Final handover', 1, 4]]]] },
    roundabout: { l: 'ميدان / شارع', d: 'مشروع صغير سريع: رفع، كونسبت، رسومات تنفيذية وإشراف.', groups: [
      ['Site Survey & Data', '#6b7f99', [['Site visit & measurements', 1, 6]]],
      ['Concept Design', '#7d6f9c', [['Concept layout & 3D view', 3, 16], ['Client approval', 1, 3]]],
      ['Tender / Detailed Drawings', '#5f8f7a', [['Hardscape, planting & irrigation drawings', 4, 24], ['BOQ', 1, 6]]],
      ['Site Supervision', '#3aa874', [['Site visits & handover', 5, 16]]]] }
  };
"""
html = html[:_t0] + TPL_JS + html[_t1:]
rep('TPL[tk] || TPL.stills', 'TPL[tk] || TPL.full', 1)
rep("Ökoplan Landscaping — an architectural visualisation & interior design studio in Cairo (modellers, render artists, an art director, video editors).", "Ökoplan Landscaping — a landscape architecture office in Cairo (landscape architects, planting and irrigation designers, a technical office, site engineers).", 1)
rep("Studio stage vocabulary (reuse when it fits): Brief & survey, Script & storyboard, Concept & mood board, Modeling, Texturing, Lighting, Lighting & animation, Render, Post, Client Review, Delivery.", "Office stage vocabulary (reuse when it fits): Site Survey & Data, Concept Design, Schematic Design, Design Development, Tender / Detailed Drawings, BOQ & Specifications, Site Supervision, Handover.", 1)

# --- the office owner's name everywhere the engine falls back to «محمود» (org chart root, owner labels)
rep("const OWNER_NAME = () => (S.settings.ownerName || '').trim() || 'محمود';", "const OWNER_NAME = () => (S.settings.ownerName || '').trim() || 'د. طارق صبحي';", 1)

# --- deliverables moved into a task board: landscape gate names + they land in the construction-documents group
rep("const GATES = [['comp', 'Composition'], ['light', 'Concept lighting'], ['detail', 'Detailing + AI'], ['post', 'Final post']];", "const GATES = [['comp', 'Drafting'], ['light', 'Team lead review'], ['detail', 'Design manager review'], ['post', 'Issued']];", 1)
rep("const rg = b.groups.find(g => /render/i.test(g.name)) || b.groups[Math.max(0, b.groups.length - 3)];", "const rg = b.groups.find(g => /tender|construction|detailed|render/i.test(g.name)) || b.groups[Math.max(0, b.groups.length - 3)];", 1)

# --- the office typeface: Jost (geometric, like the profile's Century Gothic) for Latin and numbers; IBM Plex Sans Arabic stays for Arabic
rep('family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap', 'family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700&display=swap', 1)

# --- the home «pulse» and «shot of the week»: landscape deliverables instead of shots / renders
rep("L('نبض المكتب', 'Studio pulse')", "L('نبض المكتب', 'Office pulse')", 1)
rep("L('لقطات اتعتمدت الأسبوع ده', 'shots approved this week')", "L('مخرجات اتعتمدت الأسبوع ده', 'deliverables approved this week')", 1)
rep("L('ريندرات الشهر ده', 'renders this month')", "L('لوحات اتصدرت الشهر ده', 'drawings issued this month')", 1)
rep("L('مشاريع اتسلمت السنة دي', 'delivered this year')", "L('مشاريع اتسلّمت للعميل السنة دي', 'projects handed over this year')", 1)
# issued drawings = deliverables that reached «Issued» this month + drawing versions uploaded to task boards this month (not photo files)
rep("let renders = list('files').filter(f => f.kind === 'render' && String(f.createdAt || '').startsWith(m0)).length;", "let renders = list('shots').filter(s => s.state === 'done' && String(s.doneAt || '').startsWith(m0)).length;", 1)
rep("L('اختار لقطة الأسبوع', 'Pick the shot of the week')", "L('اختار صورة الأسبوع', 'Pick the picture of the week')", 1)
rep("L('لقطة الأسبوع', 'Shot of the week')", "L('صورة الأسبوع', 'Picture of the week')")
rep("L('اختار أحلى ريندر الأسبوع ده عشان يظهر للفريق كله.', 'Pick the best render of the week to show it to the whole team.')", "L('اختار أحلى لوحة أو صورة الأسبوع ده عشان تظهر للفريق كله.', 'Pick the best drawing or photo of the week to show it to the whole team.')", 1)

# --- meetings: Ökoplan is the fourth system of the factory's «meet» function (sys 'oek') and has its own guest page
#     (oekoplan/meet.html, built below from the root meet.html). The sketches module keeps the studio's SYS (internal rules only).
rep("const SYS = (typeof STU_ON !== 'undefined' && STU_ON) ? 'stu' : (typeof CX_ON !== 'undefined' && CX_ON) ? 'cx' : 'fab';\n  const COL = 'meetings'; const MEET_URL = (location.protocol === 'https:' && /github\\.io$|ninety/i.test(location.hostname) ? location.origin : 'https://mahmoudfawzy1212mf-crypto.github.io') + '/meet.html';",
    "const SYS = 'oek';\n  const COL = 'meetings'; const MEET_URL = (location.protocol === 'https:' && /github\\.io$|oekoplan/i.test(location.hostname) ? location.origin : 'https://mahmoudfawzy1212mf-crypto.github.io') + '/oekoplan/meet.html';", 1)
OEK_ANON = re.search(r"eyJ[A-Za-z0-9_.-]+", open(os.path.join(DST, 'config.js'), encoding='utf-8').read()).group(0)
meet = open(os.path.join(ROOT, 'meet.html'), encoding='utf-8').read()
def mrep(old, new, count=1):
    global meet
    assert old in meet, 'meet.html: not found: ' + old[:80]
    meet = meet.replace(old, new, count)
mrep("    cx: { url: 'https://zustlqblklcsdphminwn.supabase.co', key: '", "    oek: { url: 'https://hwpffrjvwnbpzpzbpeml.supabase.co', key: '" + OEK_ANON + "' },\n    cx: { url: 'https://zustlqblklcsdphminwn.supabase.co', key: '")
mrep("/^(fab|stu|cx)\\.([A-Za-z0-9_-]{16,40})$/", "/^(fab|stu|cx|oek)\\.([A-Za-z0-9_-]{16,40})$/")
mrep('<title>Ninety — Meeting</title>', '<title>Ökoplan — Meeting</title>')
mrep('<html lang="ar" dir="rtl">', '<html lang="en" dir="ltr">')
mrep('<div class="gbrand"><i>90</i><span>Ninety</span></div>', '<div class="gbrand"><img src="./icons/icon-192.png" alt="" style="width:30px;height:30px;border-radius:8px"><span>Ökoplan</span></div>')
mrep("info.title || 'Ninety'", "info.title || 'Ökoplan'")
mrep("(info.title || 'Meeting') + ' — Ninety'", "(info.title || 'Meeting') + ' — Ökoplan'")
meet = meet.replace('href="/manifest', 'href="./manifest').replace("href='/manifest", "href='./manifest")
open(os.path.join(DST, 'meet.html'), 'w', encoding='utf-8').write(meet)


# --- remote computers (studio v7.66 note 9): the server side exists on Ökoplan (rd_* + Edge rdesk); the Windows side will be the
#     Ökoplan desktop app with the remote-access part (built from the studio app once that one is proven) — the page says so
rep("L('على الكمبيوتر نفسه: افتح برنامج Ökoplan Landscaping للويندوز (4.30 أو أحدث) ← الصفحة دي ← «اربط الكمبيوتر ده».', 'On the computer itself: open the Ökoplan Landscaping Windows app (4.30 or newer) → this page → «Link this computer».')",
    "L('على الكمبيوتر نفسه: افتح برنامج Ökoplan للويندوز (النسخة اللي فيها «الوصول عن بُعد» — جاية قريب) ← الصفحة دي ← «اربط الكمبيوتر ده».', 'On the computer itself: open the Ökoplan Windows app (the version with «Remote access» — coming soon) → this page → «Link this computer».')", 1)


# --- a consultancy, not a render studio (Mahmoud, 15 Oct): the Project Owner form, the deliverables wording, the project types
rep("const OS_TYPES = { archviz: 'ArchViz', interior: 'Interior', film: 'Film', mixed: 'Mixed' };",
    "const OS_TYPES = { archviz: 'Landscape design', interior: 'Masterplan / Urban', film: 'Site supervision only', mixed: 'Design + supervision' };", 1)
rep("${field('موافقة العميل على الكاميرات', `<select id=\"f-camReq\" name=\"camReq\">${pairOpts([['req', 'مطلوبة قبل الإنتاج'], ['opt', 'اختيارية (العميل معتمد رؤية المكتب)']], p.camReq || 'req')}</select>`, 'full')}",
    "${field('اعتماد العميل للكونسبت', `<select id=\"f-camReq\" name=\"camReq\">${pairOpts([['req', 'مطلوب قبل تطوير التصميم (DD)'], ['opt', 'مش مطلوب — العميل معتمد اتجاه المكتب']], p.camReq || 'req')}</select>`, 'full')}", 1)
rep("مشروع واحد = Owner واحد. الـOwner بيعمل الـMaster Schedule ويوزع الشغل ويراجع أولًا. موعد العميل ثابت — التأخير الداخلي مايحركوش.",
    "مشروع واحد = Project Owner واحد. الـOwner بيعمل جدول التسليمات، يوزّع الشغل على الفريق، ويراجع المخرجات قبل مدير التصميم. موعد العميل ثابت — التأخير الداخلي مايحركوش.", 1)
rep("`موعد العميل ${fmtDate(d.clientDeadline)} — اعمل الـMaster Schedule` : 'اعمل الـMaster Schedule'", "`موعد العميل ${fmtDate(d.clientDeadline)} — اعمل جدول التسليمات` : 'اعمل جدول التسليمات'", 1)
for a, b in [("'لقطات المشروع'", "'مخرجات المشروع'"), ("ضيف لقطات'", "ضيف مخرجات'"), ("'لقطاتي'", "'مخرجاتي'"), ("مفيش لقطات عليك دلوقتي", "مفيش مخرجات عليك دلوقتي"), ("كود اللقطة", "كود المخرج"),
             ("موعد التسليم النهائي للقطة", "موعد التسليم النهائي للمخرج"), ("كلمة عن اللقطة (اختياري)", "كلمة عن المخرج (اختياري)"), ("لسه مفيش لقطات", "لسه مفيش مخرجات"), ("محتاج لقطات", "محتاج مخرجات"),
             ("تعذّر حفظ اللقطة", "تعذّر حفظ المخرج"), ("<th>اللقطة</th>", "<th>المخرج</th>"), ("<th>Artist</th>", "<th>المسؤول</th>"), ("اعتماد الكاميرات", "اعتماد الكونسبت"),
             ("'مراجعة الريندر'", "'مراجعة اللوحة'"), ("ملاحظة جديدة على الريندر", "ملاحظة جديدة على اللوحة"), ("معرض الريندرات", "معرض اللوحات"), ("مفيش ريندرات لسه", "مفيش لوحات لسه"),
             ("لوحات المشاريع · المهام · الريندرات · الوقت", "لوحات المشاريع · المهام · المخرجات · الوقت")]:
    rep(a, b, must=False)

# --- the add-on, loaded after the app and after the QR attendance add-on
rep('<script src="./qrp-v1.js" defer></script>\n</body>',
    '<script src="./qrp-v1.js" defer></script>\n<!-- Ökoplan brand & office layer (loaded after the app) - keep these lines on rebuilds -->\n<script src="./oekoplan.js" defer></script>\n<script src="./oeko-home.js" defer></script>\n</body>', 1)

import hashlib, datetime
STU_BUILD = open(os.path.join(SRC, 'BUILD.txt'), encoding='utf-8').read().strip()
h = hashlib.sha1((html + open(os.path.join(DST, 'oekoplan.js'), encoding='utf-8').read() + open(os.path.join(DST, 'oeko-home.js'), encoding='utf-8').read()).encode('utf-8')).hexdigest()[:6]
BUILD = f"{STU_BUILD}-o{h}"
rep(f'NF_BUILD="{STU_BUILD}"', f'NF_BUILD="{BUILD}"', 1)
FULL = html  # the page with the code inline — only for the English-pack extractor below
_i = html.index("<script>\n'use strict';"); _j = html.index('</script>', _i)
APP_JS = html[_i + len('<script>\n'):_j]
assert '</script' not in APP_JS, 'app code contains </script'
html = html[:_i] + f'<script src="app.js?v={BUILD}" data-nf-app></script>' + html[_j + len('</script>'):]
open(os.path.join(DST, 'app.js'), 'w', encoding='utf-8').write(APP_JS)
open(os.path.join(DST, 'index.html'), 'w', encoding='utf-8').write(html)
open(os.path.join(DST, 'BUILD.txt'), 'w', encoding='utf-8').write(BUILD + '\n')

# --- en.json: the pack is aligned BY POSITION with the Arabic strings extracted from index.html (i18nBuildDict); our text
#     replacements change some Arabic keys, so the pack is rebuilt for the derived page with node (the page's own extractor + checksum),
#     carrying the English over with the same name replacements. Add-on strings (oekoplan.js) carry their own English at runtime.
EN_REPL = [('Project shots', 'Project deliverables'), ('project shots', 'project deliverables'), ('Add shots', 'Add deliverables'), ('My shots', 'My deliverables'), ('No shots', 'No deliverables'), ('no shots', 'no deliverables'), ('Shot code', 'Deliverable code'), ('the shot', 'the deliverable'), ('Needs shots', 'Needs deliverables'), ('Camera approval', 'Concept approval'), ('camera approval', 'concept approval'), ('Client camera approval', 'Client concept approval'), ('Required before production', 'Required before Design Development (DD)'), ('Render review', 'Drawing review'), ('Renders gallery', 'Drawings gallery'), ('No renders yet', 'No drawings yet'), ('Master Schedule', 'Deliverables schedule'), ('Ninety Degree Studio', NAME), ('Ninety Studioz', NAME), ('ninetystudioz.com', DOMAIN), ('A story in every frame', 'Designing landscapes that live'), ('the studio', 'the office'), ('The studio', 'The office'), ('art director', 'design manager'), ('Art director', 'Design manager'), ('Art Director', 'Design Manager'), ('Studio work', 'Projects Gallery'), ('studio work', 'projects gallery'), ('Office work', 'Projects Gallery'), ("From the office's work", 'From the projects gallery'), ("From the studio's work", 'From the projects gallery')]
import subprocess, tempfile
js = r"""
const fs = require('fs'); const [,, srcHtml, dstHtml, packPath, outPath, replJson] = process.argv;
const grab = (html, startRe, endMarker) => { const i = html.search(startRe); if (i < 0) throw new Error('extractor not found'); const j = html.indexOf(endMarker, i); return html.slice(i, j + endMarker.length); };
const a = fs.readFileSync(srcHtml, 'utf8'), b = fs.readFileSync(dstHtml, 'utf8');
const ext = grab(a, /\(function \(root\) \{[\s\S]{0,200}?nfI18nExtract|\(function \(root\) \{/, "})(typeof window !== 'undefined' ? window : globalThis);");
const chk = a.slice(a.indexOf('function i18nChk(k)'), a.indexOf('\n', a.indexOf('function i18nChk(k)')));
const g = {}; new Function('globalThis', 'window', ext + '\n' + chk + '\nglobalThis.i18nChk = i18nChk;')(g, g);
const M = '\u0001';
const ka = g.nfI18nExtract(a).map(k => k.replace(/\{\{[^}]+\}\}/g, M)), kb = g.nfI18nExtract(b).map(k => k.replace(/\{\{[^}]+\}\}/g, M));
const pack = JSON.parse(fs.readFileSync(packPath, 'utf8')); const repl = JSON.parse(replJson);
if (ka.length !== kb.length) { console.error('key count differs', ka.length, kb.length); }
const tr = s => { let t = s; for (const [x, y] of repl) t = t.split(x).join(y); return t; };
const AR = JSON.parse(process.argv[7] || '[]'); // [[old, new]] Arabic replacements, applied in reverse to find the original key
const byOld = new Map(); ka.forEach((k, i) => { const e = pack.v[i]; if (e && e[0] === g.i18nChk(k) && !byOld.has(k)) byOld.set(k, e[1]); });
const inv = s => { let t = s; for (const [x, y] of AR.slice().reverse()) if (y) t = t.split(y).join(x); return t; };
let direct = 0, fixed = 0, miss = 0; const v = kb.map(k => { if (byOld.has(k)) { direct++; return [g.i18nChk(k), tr(byOld.get(k))]; } const o = inv(k); if (byOld.has(o)) { fixed++; return [g.i18nChk(k), tr(byOld.get(o))]; } miss++; return ['00', '']; });
const out = Object.assign({}, pack, { v }); if (pack.x) { out.x = {}; for (const k of Object.keys(pack.x)) out.x[k] = tr(pack.x[k]); }
fs.writeFileSync(outPath, JSON.stringify(out)); console.log('pack', v.length, 'direct', direct, 'via replacement', fixed, 'missing', miss);
"""
with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as f: f.write(js); jsp = f.name
with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf-8') as f: f.write(FULL); fullp = f.name
with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf-8') as f: f.write(STU_FULL); stup = f.name
r = subprocess.run(['node', jsp, stup, fullp, os.path.join(SRC, 'en.json'), os.path.join(DST, 'en.json'), json.dumps(EN_REPL), json.dumps(AR_REPL)], capture_output=True, text=True)
print(r.stdout.strip(), r.stderr.strip()[:300])
if r.returncode: sys.exit('!! en.json rebuild failed')

# --- service worker: add the add-on to the shell list
sw = open(os.path.join(SRC, 'sw.js'), encoding='utf-8').read()
sw = sw.replace('"./en.json"]', '"./en.json", "./oekoplan.js", "./oeko-home.js", "./qrp-v1.js"]', 1)
sw = re.sub(r'"\./app\.js\?v=[^"]+"', '"./app.js?v=' + BUILD + '"', sw, count=1)
# the page: this build's cached copy first (instant open) — a new build arrives through sw.js (new cache, skipWaiting → reload), not through the page fetch
_o = "e.respondWith(fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)).catch(() => { }); return r; }).catch(() => caches.match('./index.html')));"
assert _o in sw, 'sw page handler not found'
sw = sw.replace(_o, "e.respondWith(caches.open(CACHE).then(c => c.match('./index.html')).then(hit => hit || fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)).catch(() => { }); return r; })).catch(() => caches.match('./index.html')));", 1)
sw = sw.replace(f"const BUILD = '{STU_BUILD}';", f"const BUILD = '{BUILD}';", 1)
open(os.path.join(DST, 'sw.js'), 'w', encoding='utf-8').write(sw)
for f in ('qrp-v1.js', 'qrdec-v1.js', 'qrgen-v1.js'):
    shutil.copy(os.path.join(SRC, f), os.path.join(DST, f))
print('ok', n0, '->', len(html), 'build', BUILD)
