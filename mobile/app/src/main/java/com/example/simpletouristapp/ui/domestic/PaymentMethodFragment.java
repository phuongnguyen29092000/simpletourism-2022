package com.example.simpletouristapp.ui.domestic;

import android.app.Activity;
import android.content.Context;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.browser.customtabs.CustomTabsServiceConnection;
import androidx.fragment.app.Fragment;

import com.example.simpletouristapp.MainActivityLogged;
import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.PaymentMethodBinding;
import com.example.simpletouristapp.model.TicketResponse;
import com.example.simpletouristapp.service.ToursApiService;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.paypal.checkout.PayPalCheckout;
import com.paypal.checkout.approve.Approval;
import com.paypal.checkout.approve.OnApprove;
import com.paypal.checkout.cancel.OnCancel;
import com.paypal.checkout.config.CheckoutConfig;
import com.paypal.checkout.config.Environment;
import com.paypal.checkout.config.SettingsConfig;
import com.paypal.checkout.createorder.CreateOrder;
import com.paypal.checkout.createorder.CreateOrderActions;
import com.paypal.checkout.createorder.CurrencyCode;
import com.paypal.checkout.createorder.OrderIntent;
import com.paypal.checkout.createorder.UserAction;
import com.paypal.checkout.error.ErrorInfo;
import com.paypal.checkout.error.OnError;
import com.paypal.checkout.order.Amount;
import com.paypal.checkout.order.AppContext;
import com.paypal.checkout.order.CaptureOrderResult;
import com.paypal.checkout.order.OnCaptureComplete;
import com.paypal.checkout.order.Order;
import com.paypal.checkout.order.PurchaseUnit;
import com.paypal.pyplcheckout.BuildConfig;


import org.jetbrains.annotations.NotNull;
import org.json.JSONException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PaymentMethodFragment extends Fragment {
    private PaymentMethodBinding binding;
    public static Context context;
    private ToursApiService toursApiService;
    private HashMap<String ,String> informationBookTour;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            informationBookTour = (HashMap<String ,String>) getArguments().getSerializable("information");
        }
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = PaymentMethodBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        context = getActivity();

        toursApiService = new ToursApiService();
        SharedPreferences sharedPref = getActivity().getSharedPreferences("Token",Context.MODE_PRIVATE);

        binding.tvNameTour.setText(informationBookTour.get("nameTour"));
        binding.tvAmount.setText(informationBookTour.get("Amount"));
        binding.tvPrice.setText(informationBookTour.get("Price"));
        binding.tvPhoneNumber.setText(informationBookTour.get("Phone"));
        MaterialAlertDialogBuilder builder = new MaterialAlertDialogBuilder(getContext());

        binding.btnPaymentLater.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                MainActivityLogged.getAccessInfo(getContext());
                Call<TicketResponse> call = toursApiService.bookTour("Bearer " + sharedPref.getString("access_token",""),informationBookTour.get("idTour")
                        ,sharedPref.getString("id_customer",""),binding.tvPhoneNumber.getText().toString()
                        , Integer.parseInt(binding.tvAmount.getText().toString()));
                call.enqueue(new Callback<TicketResponse>() {
                    @Override
                    public void onResponse(Call<TicketResponse> call, Response<TicketResponse> response) {
                        if(response.code() == 201){
                            TicketResponse ticketResponse = response.body();
                            builder.setTitle("Thành công");
                            builder.setMessage("Bạn đã đặt tour thành công");
                            builder.setPositiveButton(R.string.accept, new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialogInterface, int i) {
                                    getActivity().onBackPressed();
                                    getActivity().onBackPressed();
                                }
                            });
                            builder.show();
                        }else {
                            builder.setTitle("Thất bại");
                            builder.setMessage("Bạn đã đặt tour thất bại");
                            builder.setPositiveButton(R.string.accept, new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialogInterface, int i) {
                                    dialogInterface.dismiss();
                                }
                            });
                        }
                    }

                    @Override
                    public void onFailure(Call<TicketResponse> call, Throwable t) {
                        builder.setTitle("Thất bại");
                        builder.setMessage("Bạn đã đặt tour thất bại");
                        builder.setPositiveButton(R.string.accept, new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                dialogInterface.dismiss();
                            }
                        });
                        Log.d("TAG",t.getMessage());
                    }
                });
            }
        });
        return root;
    }


    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}
