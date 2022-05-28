package com.example.simpletouristapp;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.simpletouristapp.api.ToursApi;
import com.example.simpletouristapp.databinding.PaypalBinding;
import com.example.simpletouristapp.service.ToursApiService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PayPalActivity extends AppCompatActivity {
    private PaypalBinding binding;
    private AlertDialog.Builder builder;
    private AlertDialog alertDialog;
    private ToursApiService toursApiService;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = PaypalBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        binding.webView.getSettings().setJavaScriptEnabled(true);
        binding.webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        binding.webView.setWebViewClient(new WebViewClient()
             {
                 @Override
                 public void onPageStarted(WebView view, String url, Bitmap favicon) {
                     binding.webView.setVisibility(View.GONE);
                     binding.progressBar.setVisibility(View.VISIBLE);
                     if(url.contains("failure")){
                         finish();
                         showAlertDialog(R.layout.dialog_failed);
                     }else {
                         if(url.contains("success")){
                             finish();
                             showAlertDialog(R.layout.dialog_successful);
                         }
                     }
                 }

                 @Override
                 public void onPageFinished(WebView view, String url) {
                     binding.webView.setVisibility(View.VISIBLE);
                     binding.progressBar.setVisibility(View.GONE);
                 }
             }
        );
        toursApiService = new ToursApiService();
        Call<String> call = toursApiService.postPaypal();
        call.enqueue(new Callback<String>() {
            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                binding.webView.loadUrl(response.body());
            }

            @Override
            public void onFailure(Call<String> call, Throwable t) {

            }
        });

    }
    public void showAlertDialog(int myLayout){
        builder = new AlertDialog.Builder(getApplicationContext());
        View layoutView = getLayoutInflater().inflate(myLayout,null);

        Button dialogButton = layoutView.findViewById(R.id.buttonOk);
        builder.setView(layoutView);
        alertDialog = builder.create();
        alertDialog.show();

        dialogButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                alertDialog.dismiss();
            }
        });
    }
}