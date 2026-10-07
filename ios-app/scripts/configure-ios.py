# Ninety iOS — applies the app settings to the freshly generated Capacitor iOS project (run after `npx cap add ios`).
import plistlib
INFO = 'ios/App/App/Info.plist'; PBX = 'ios/App/App.xcodeproj/project.pbxproj'; DELEGATE = 'ios/App/App/AppDelegate.swift'
TEAM = 'UF4QLJ9AY9'
d = plistlib.load(open(INFO, 'rb'))
d.update({
    'CFBundleDisplayName': 'Ninety',
    'CFBundleDevelopmentRegion': 'ar', 'CFBundleLocalizations': ['ar', 'en'],
    'NSCameraUsageDescription': 'Ninety uses the camera to take work photos, receipts and your profile picture.',
    'NSPhotoLibraryUsageDescription': 'Ninety lets you attach photos from your library to tasks and requests.',
    'NSPhotoLibraryAddUsageDescription': 'Ninety saves files you export (reports, PDFs) to your photo library.',
    'NSLocationWhenInUseUsageDescription': 'Ninety checks your location when you punch in or out, confirm arrival at an errand, and records the route of a delivery trip you started.',
    'NSLocationAlwaysAndWhenInUseUsageDescription': 'During a delivery trip you started, Ninety keeps recording the route while the phone is locked, so the fleet manager sees the truck live. Recording stops when you finish the trip.',
    'NSMicrophoneUsageDescription': 'Ninety uses the microphone for team calls and voice notes.',
    'NSFaceIDUsageDescription': 'Ninety uses Face ID to confirm it is you when you punch in.',
    'NFCReaderUsageDescription': 'Ninety reads the office door NFC sticker to open the door.',
    'ITSAppUsesNonExemptEncryption': False,
    'UIBackgroundModes': ['remote-notification', 'location'],
    'UIRequiredDeviceCapabilities': ['arm64'],
    'UISupportedInterfaceOrientations': ['UIInterfaceOrientationPortrait'],
})
plistlib.dump(d, open(INFO, 'wb'))
open('ios/App/App/App.entitlements', 'w').write('''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>aps-environment</key>
	<string>production</string>
	<key>com.apple.developer.nfc.readersession.formats</key>
	<array>
		<string>TAG</string>
	</array>
</dict>
</plist>
''')
s = open(PBX).read()
s = s.replace('TARGETED_DEVICE_FAMILY = "1,2";', 'TARGETED_DEVICE_FAMILY = 1;')
if 'CODE_SIGN_ENTITLEMENTS' not in s:
    s = s.replace('PRODUCT_BUNDLE_IDENTIFIER = app.ninety.fabrication;', 'PRODUCT_BUNDLE_IDENTIFIER = app.ninety.fabrication;\n\t\t\t\tCODE_SIGN_ENTITLEMENTS = App/App.entitlements;\n\t\t\t\tDEVELOPMENT_TEAM = %s;' % TEAM)
open(PBX, 'w').write(s)
a = open(DELEGATE).read()
if 'capacitorDidRegisterForRemoteNotifications' not in a:
    a = a.rstrip().rstrip('}') + '''
    // push: hand the APNs token to the Capacitor push plugin
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    }
}
'''
    open(DELEGATE, 'w').write(a)
print('ios configured')
