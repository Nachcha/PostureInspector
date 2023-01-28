package com.postureinspector.rnCustomUI;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.os.Looper;
import android.util.Log;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactMethod;
import com.postureinspector.R;

public class CustomView extends FrameLayout {
    ImageView imageView;
    Bitmap bitmap;

    public CustomView(@NonNull Context context) {
        super(context);
        // set padding and background color
        this.setPadding(16,16,16,16);
        this.setBackgroundColor(Color.parseColor("#5FD3F3"));

        // add default text view
        TextView text = new TextView(context);
        imageView = new ImageView(context);
        text.setText("Welcome to Android Fragments with React Native.");
        bitmap = BitmapFactory.decodeResource(getResources(), R.mipmap.foots);
        imageView.setImageBitmap(bitmap);
        setImage();
        this.addView(imageView);
    }

    public void setImage(){
        this.imageView.setImageBitmap(bitmap);
        new android.os.Handler(Looper.getMainLooper()).postDelayed(
                new Runnable() {
                    public void run() {
                        Log.i("tag", "This'll run 300 milliseconds later");
                    }
                },
                300);
    }


}
