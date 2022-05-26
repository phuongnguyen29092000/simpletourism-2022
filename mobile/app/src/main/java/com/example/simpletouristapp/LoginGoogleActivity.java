package com.example.simpletouristapp;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.Nullable;

import androidx.appcompat.app.AppCompatActivity;

import com.example.simpletouristapp.databinding.LoginGoogleActivityBinding;

import com.example.simpletouristapp.service.ToursApiService;


public class LoginGoogleActivity extends AppCompatActivity {
    private LoginGoogleActivityBinding binding;
    private ToursApiService toursApiService;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = LoginGoogleActivityBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        binding.webView.getSettings().setJavaScriptEnabled(true);
        binding.webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        binding.webView.getSettings().setUserAgentString("Chrome/56.0.0 Mobile");
        binding.webView.setWebViewClient(new WebViewClient()
             {
                 @Override
                 public void onPageStarted(WebView view, String url, Bitmap favicon) {
                     binding.webView.setVisibility(View.GONE);
                     binding.progressBar.setVisibility(View.VISIBLE);

                 }

                 @Override
                 public void onPageFinished(WebView view, String url) {
                     binding.webView.setVisibility(View.VISIBLE);
                     binding.progressBar.setVisibility(View.GONE);
                 }
             }
        );
        binding.webView.loadUrl("https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&approval_prompt=force&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth%2Fgoogle%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=532225885079-87pe29jp4nn410gt6ipmmk5nbo8j1g74.apps.googleusercontent.com&flowName=GeneralOAuthFlow");

    }
}
