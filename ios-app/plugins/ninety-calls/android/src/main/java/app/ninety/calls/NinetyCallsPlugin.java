package app.ninety.calls;

import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Ninety — the app side of the native call screen (JS name «NinetyCalls»).
 * pending() / «callAction» event: what was pressed on the call screen while the page was not there (answer / open).
 * endCall(): the in-app call took over → stop the ringing screen. startWork()/stopWork(): the work-mode foreground service.
 */
@CapacitorPlugin(name = "NinetyCalls")
public class NinetyCallsPlugin extends Plugin {

    @Override
    public void load() {
        if (getActivity() != null && getActivity().getIntent() != null) takeIntent(getActivity().getIntent());
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);
        if (intent != null) takeIntent(intent);
    }

    private void takeIntent(Intent intent) {
        String action = intent.getStringExtra(CallUI.EXTRA_ACTION);
        if (action == null) return;
        String callId = intent.getStringExtra(CallUI.EXTRA_CALL_ID);
        String url = intent.getStringExtra(CallUI.EXTRA_URL);
        intent.removeExtra(CallUI.EXTRA_ACTION);
        if (callId != null) CallUI.stop(getContext(), callId);
        CallUI.setPending(getContext(), action, callId, url);
        JSObject o = new JSObject();
        o.put("action", action);
        o.put("callId", callId == null ? "" : callId);
        o.put("url", url == null ? "" : url);
        notifyListeners("callAction", o, true);
    }

    @PluginMethod
    public void voipToken(PluginCall call) {
        JSObject o = new JSObject();
        o.put("token", "");
        call.resolve(o);
    }

    @PluginMethod
    public void pending(PluginCall call) {
        call.resolve(CallUI.takePending(getContext()));
    }

    @PluginMethod
    public void endCall(PluginCall call) {
        String id = call.getString("callId", "");
        if (id != null && !id.isEmpty()) CallUI.stop(getContext(), id);
        call.resolve();
    }

    @PluginMethod
    public void startWork(PluginCall call) {
        Context c = getContext();
        Intent i = new Intent(c, WorkService.class);
        i.putExtra("title", call.getString("title", "Ninety"));
        i.putExtra("text", call.getString("text", ""));
        Double until = call.getDouble("until");
        i.putExtra("until", until == null ? 0L : until.longValue());
        try {
            if (Build.VERSION.SDK_INT >= 26) c.startForegroundService(i); else c.startService(i);
            call.resolve();
        } catch (Exception e) {
            call.reject("start_failed", e);
        }
    }

    @PluginMethod
    public void stopWork(PluginCall call) {
        getContext().stopService(new Intent(getContext(), WorkService.class));
        call.resolve();
    }

    @PluginMethod
    public void permState(PluginCall call) {
        Context c = getContext();
        boolean battery = true;
        PowerManager pm = (PowerManager) c.getSystemService(Context.POWER_SERVICE);
        if (pm != null) battery = pm.isIgnoringBatteryOptimizations(c.getPackageName());
        boolean fullScreen = true;
        if (Build.VERSION.SDK_INT >= 34) {
            NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null) fullScreen = nm.canUseFullScreenIntent();
        }
        JSObject o = new JSObject();
        o.put("battery", battery);
        o.put("fullScreen", fullScreen);
        call.resolve(o);
    }

    @PluginMethod
    public void requestIgnoreBattery(PluginCall call) {
        Context c = getContext();
        try {
            Intent i = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, Uri.parse("package:" + c.getPackageName()));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            c.startActivity(i);
        } catch (Exception e) {
            try {
                Intent j = new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS);
                j.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                c.startActivity(j);
            } catch (Exception ignored) { }
        }
        call.resolve();
    }

    @PluginMethod
    public void openFullScreenSettings(PluginCall call) {
        Context c = getContext();
        try {
            Intent i;
            if (Build.VERSION.SDK_INT >= 34) {
                i = new Intent(Settings.ACTION_MANAGE_APP_USE_FULL_SCREEN_INTENT, Uri.parse("package:" + c.getPackageName()));
            } else {
                i = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
                i.putExtra(Settings.EXTRA_APP_PACKAGE, c.getPackageName());
            }
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            c.startActivity(i);
        } catch (Exception ignored) { }
        call.resolve();
    }
}
