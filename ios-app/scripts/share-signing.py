# Ninety iOS — provisioning profile for the «Share» extension (app.ninety.fabrication.share), through the App Store Connect API
# with the Codemagic integration key (env APP_STORE_CONNECT_*; nothing secret is printed or stored in the repo).
# Creates the bundle ID once, reuses a valid App Store profile for the distribution certificate installed on this build Mac
# (or creates one), installs it, and writes /tmp/share-ext-ok. Any problem → the app is built without the extension.
import base64, hashlib, json, os, subprocess, sys, time, urllib.request, urllib.error
BID = 'app.ninety.fabrication.share'
API = 'https://api.appstoreconnect.apple.com/v1'
OK = '/tmp/share-ext-ok'

def skip(why):
    print('share extension skipped:', why)
    sys.exit(0)

iss = os.environ.get('APP_STORE_CONNECT_ISSUER_ID', ''); kid = os.environ.get('APP_STORE_CONNECT_KEY_IDENTIFIER', ''); key = os.environ.get('APP_STORE_CONNECT_PRIVATE_KEY', '')
if not (iss and kid and key):
    skip('App Store Connect credentials not in the environment')
try:
    import jwt  # PyJWT
except Exception:
    subprocess.run([sys.executable, '-m', 'pip', 'install', '--quiet', '--break-system-packages', 'pyjwt[crypto]'], check=False)
    subprocess.run([sys.executable, '-m', 'pip', 'install', '--quiet', 'pyjwt[crypto]'], check=False)
    try:
        import jwt
    except Exception as e:
        skip('PyJWT not available (%s)' % e)

def token():
    now = int(time.time())
    return jwt.encode({'iss': iss, 'iat': now, 'exp': now + 1100, 'aud': 'appstoreconnect-v1'}, key.replace('\\n', '\n'), algorithm='ES256', headers={'kid': kid, 'typ': 'JWT'})

def call(method, path, body=None):
    req = urllib.request.Request(API + path, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={'Authorization': 'Bearer ' + token(), 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read() or b'{}')
    except urllib.error.HTTPError as e:
        raise RuntimeError('%s %s → %s %s' % (method, path.split('?')[0], e.code, e.read()[:300].decode('utf-8', 'replace')))

try:
    found = call('GET', '/bundleIds?filter[identifier]=%s&limit=20' % BID)
    bid = next((b for b in found.get('data', []) if b['attributes']['identifier'] == BID), None)
    if not bid:
        bid = call('POST', '/bundleIds', {'data': {'type': 'bundleIds', 'attributes': {'identifier': BID, 'name': 'Ninety Share', 'platform': 'IOS'}}})['data']
        print('bundle id created')
    # the distribution certificate(s) installed on this Mac by Codemagic (serial numbers)
    pem = subprocess.run(['security', 'find-certificate', '-a', '-p'], capture_output=True, text=True).stdout
    serials = set()
    for blk in pem.split('-----END CERTIFICATE-----'):
        if 'BEGIN CERTIFICATE' not in blk: continue
        out = subprocess.run(['openssl', 'x509', '-noout', '-serial'], input=blk + '-----END CERTIFICATE-----\n', capture_output=True, text=True).stdout
        if '=' in out: serials.add(out.strip().split('=', 1)[1].upper().lstrip('0'))
    certs = []
    for ty in ('DISTRIBUTION', 'IOS_DISTRIBUTION'):
        try: certs += call('GET', '/certificates?filter[certificateType]=%s&limit=50' % ty).get('data', [])
        except Exception as e: print('certificates', ty, e)
    mine = [c for c in certs if str(c['attributes'].get('serialNumber', '')).upper().lstrip('0') in serials]
    if not mine:
        skip('no matching distribution certificate on this Mac')
    cert = sorted(mine, key=lambda c: c['attributes'].get('expirationDate', ''))[-1]
    profs = call('GET', '/bundleIds/%s/profiles?limit=50' % bid['id']).get('data', [])
    prof = None
    for p in profs:
        a = p['attributes']
        if a.get('profileType') != 'IOS_APP_STORE' or a.get('profileState') != 'ACTIVE': continue
        rel = call('GET', '/profiles/%s/certificates?limit=50' % p['id']).get('data', [])
        if any(c['id'] == cert['id'] for c in rel): prof = p; break
    if not prof:
        prof = call('POST', '/profiles', {'data': {'type': 'profiles', 'attributes': {'name': 'Ninety Share AppStore %s' % time.strftime('%Y%m%d%H%M'), 'profileType': 'IOS_APP_STORE'},
                                           'relationships': {'bundleId': {'data': {'type': 'bundleIds', 'id': bid['id']}}, 'certificates': {'data': [{'type': 'certificates', 'id': cert['id']}]}}}})['data']
        print('profile created')
    content = base64.b64decode(prof['attributes']['profileContent'])
    d = os.path.expanduser('~/Library/MobileDevice/Provisioning Profiles'); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, prof['attributes']['uuid'] + '.mobileprovision'), 'wb').write(content)
    open(OK, 'w').write(prof['attributes']['uuid'])
    print('share extension profile installed:', prof['attributes']['name'])
except Exception as e:
    skip(str(e)[:400])
