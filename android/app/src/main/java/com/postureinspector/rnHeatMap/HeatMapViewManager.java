package com.postureinspector.rnHeatMap;

import android.widget.FrameLayout;

import com.facebook.react.uimanager.ThemedReactContext;

public class HeatMapViewManager extends FrameLayout {
    public static final String REACT_CLASS = "HeatMapViewManager";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public FrameLayout createViewInstance(ThemedReactContext reactContext) {
        return new FrameLayout(reactContext);
    }
}
