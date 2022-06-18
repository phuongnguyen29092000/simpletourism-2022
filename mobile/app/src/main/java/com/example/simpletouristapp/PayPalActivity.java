package com.example.simpletouristapp;


import android.content.Context;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;


import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.simpletouristapp.api.ToursApi;
import com.example.simpletouristapp.databinding.PaypalBinding;
import com.example.simpletouristapp.model.HistoryTicketResponse;
import com.example.simpletouristapp.model.TicketResponse;
import com.example.simpletouristapp.service.ToursApiService;

import com.example.simpletouristapp.ui.account.HistoryFragment;
import com.example.simpletouristapp.ui.domestic.PaymentMethodFragment;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.ResponseBody;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PayPalActivity extends AppCompatActivity {
    private PaypalBinding binding;
    private AlertDialog.Builder builder;
    private AlertDialog alertDialog;
    private ToursApiService toursApiService;
    private HistoryTicketResponse.Ticket ticket;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = PaypalBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        OkHttpClient client = new OkHttpClient();
        final String[] message = new String[1];
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
                             Request request = new Request.Builder().url(ToursApiService.BASE_URL + url.substring(22)).build();
                             client.newCall(request).enqueue(new okhttp3.Callback() {
                                 @Override
                                 public void onFailure(@NonNull okhttp3.Call call, @NonNull IOException e) {
                                 }
                                 @Override
                                 public void onResponse(@NonNull okhttp3.Call call, @NonNull okhttp3.Response response) throws IOException {
                                    if (response.code() == 200){
                                        message[0] = response.message();
                                    }
                                 }
                             });
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
        ticket = (HistoryTicketResponse.Ticket) getIntent().getExtras().getSerializable("ticket");
        toursApiService = new ToursApiService();
        Call<ResponseBody> call = toursApiService.postPaypal(ticket.getTourName(),ticket.getId(),ticket.getPaymentPrice(),ticket.getNumberPeople());
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                Log.d("code", String.valueOf(response.code()));
                if(response.code() == 200){
                    try {
                    binding.webView.loadUrl(response.body().string());
                        Log.d("Url",response.body().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Toast.makeText(getApplicationContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("Error",t.getMessage());
            }
        });


    }
    public void showAlertDialog(int myLayout){
        builder = new AlertDialog.Builder(HistoryFragment.context);
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
