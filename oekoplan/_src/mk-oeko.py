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
    f'<meta name="description" content="نظام إدارة مكتب {NAME} — الحضور والإجازات واللائحة والمشاريع">', 1)
rep('<meta name="apple-mobile-web-app-title" content="Ninety Studioz">', f'<meta name="apple-mobile-web-app-title" content="{NAME}">', 1)

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

# --- language: Ökoplan is not the (English-only) studio — Arabic by default, the device / person choice is kept (nf.lang)
rep("const I18N_STU = (() => { try { return (window.NF_CONFIG && window.NF_CONFIG.company === 'studioz') || window.NF_CO === 'studioz'; } catch (e) { return false; } })();",
    "const I18N_STU = false; /* Ökoplan: Arabic by default, choice kept per device (mk-oeko.py) */", 1)

# --- the add-on, loaded after the app and after the QR attendance add-on
rep('<script src="./qrp-v1.js" defer></script>\n</body>',
    '<script src="./qrp-v1.js" defer></script>\n<!-- Ökoplan brand & office layer (loaded after the app) - keep this line on rebuilds -->\n<script src="./oekoplan.js" defer></script>\n</body>', 1)

import hashlib, datetime
STU_BUILD = open(os.path.join(SRC, 'BUILD.txt'), encoding='utf-8').read().strip()
h = hashlib.sha1((html + open(os.path.join(DST, 'oekoplan.js'), encoding='utf-8').read()).encode('utf-8')).hexdigest()[:6]
BUILD = f"{STU_BUILD}-o{h}"
rep(f'NF_BUILD="{STU_BUILD}"', f'NF_BUILD="{BUILD}"', 1)
open(os.path.join(DST, 'index.html'), 'w', encoding='utf-8').write(html)
open(os.path.join(DST, 'BUILD.txt'), 'w', encoding='utf-8').write(BUILD + '\n')

# --- en.json: the pack is aligned BY POSITION with the Arabic strings extracted from index.html (i18nBuildDict); our text
#     replacements change some Arabic keys, so the pack is rebuilt for the derived page with node (the page's own extractor + checksum),
#     carrying the English over with the same name replacements. Add-on strings (oekoplan.js) carry their own English at runtime.
EN_REPL = [('Ninety Degree Studio', NAME), ('Ninety Studioz', NAME), ('ninetystudioz.com', DOMAIN), ('A story in every frame', 'Designing landscapes that live'), ('the studio', 'the office'), ('The studio', 'The office'), ('art director', 'design manager'), ('Art director', 'Design manager'), ('Art Director', 'Design Manager'), ('Studio work', 'Office work'), ('studio work', 'office work')]
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
r = subprocess.run(['node', jsp, os.path.join(SRC, 'index.html'), os.path.join(DST, 'index.html'), os.path.join(SRC, 'en.json'), os.path.join(DST, 'en.json'), json.dumps(EN_REPL), json.dumps(AR_REPL)], capture_output=True, text=True)
print(r.stdout.strip(), r.stderr.strip()[:300])
if r.returncode: sys.exit('!! en.json rebuild failed')

# --- service worker: add the add-on to the shell list
sw = open(os.path.join(SRC, 'sw.js'), encoding='utf-8').read()
sw = sw.replace('"./en.json"]', '"./en.json", "./oekoplan.js", "./qrp-v1.js"]', 1)
sw = sw.replace(f"const BUILD = '{STU_BUILD}';", f"const BUILD = '{BUILD}';", 1)
open(os.path.join(DST, 'sw.js'), 'w', encoding='utf-8').write(sw)
for f in ('qrp-v1.js', 'qrdec-v1.js', 'qrgen-v1.js'):
    shutil.copy(os.path.join(SRC, f), os.path.join(DST, f))
print('ok', n0, '->', len(html), 'build', BUILD)
