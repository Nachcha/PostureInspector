package com.postureinspector;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class CalendarModule extends ReactContextBaseJavaModule {
    private int eventCount = 0;
    CalendarModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void createCalendarEvent(String name, String location) {
        Log.d("CalendarModule", "Create event called with name: " + name
                + " and location: " + location);
    }

    @ReactMethod
    public void createCalendarEventCallBack(Callback callback) {
        callback.invoke("Data returned from the native callback method");
    }

    @ReactMethod
    public void createCalendarPromise(String name, String location, Promise promise) {
        try {
            String eventId = name+" "+location;
            promise.resolve(eventId);
            eventCount++;
            sendEvent(getReactApplicationContext(),
                    "EventCount", eventCount);
        } catch(Exception e) {
            promise.reject("Create Event Error", e);
        }
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           int params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
