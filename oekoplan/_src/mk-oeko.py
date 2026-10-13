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

def rep(old, new, count=None, must=True):
    global html
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

open(os.path.join(DST, 'index.html'), 'w', encoding='utf-8').write(html)

# --- en.json: same name replacements in the English dictionary
en = open(os.path.join(SRC, 'en.json'), encoding='utf-8').read()
for a, b in [('Ninety Degree Studio', NAME), ('Ninety Studioz', NAME), ('ninetystudioz.com', DOMAIN), ('A story in every frame', 'Designing landscapes that live'), ('the studio', 'the office'), ('The studio', 'The office')]:
    en = en.replace(a, b)
open(os.path.join(DST, 'en.json'), 'w', encoding='utf-8').write(en)

# --- service worker: add the add-on to the shell list
sw = open(os.path.join(SRC, 'sw.js'), encoding='utf-8').read()
sw = sw.replace('"./en.json"]', '"./en.json", "./oekoplan.js", "./qrp-v1.js"]', 1)
open(os.path.join(DST, 'sw.js'), 'w', encoding='utf-8').write(sw)
shutil.copy(os.path.join(SRC, 'BUILD.txt'), os.path.join(DST, 'BUILD.txt'))
for f in ('qrp-v1.js', 'qrdec-v1.js', 'qrgen-v1.js'):
    shutil.copy(os.path.join(SRC, f), os.path.join(DST, f))
print('ok', n0, '->', len(html), 'build', open(os.path.join(DST, 'BUILD.txt')).read().strip())
