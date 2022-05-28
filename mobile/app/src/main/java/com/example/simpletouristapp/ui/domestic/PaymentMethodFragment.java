package com.example.simpletouristapp.ui.domestic;

import android.content.Context;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;

import com.example.simpletouristapp.PayPalActivity;
import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.FormBookTourBinding;
import com.example.simpletouristapp.databinding.PaymentMethodBinding;

public class PaymentMethodFragment extends Fragment {
    private PaymentMethodBinding binding;
    public static Context context;
//    @Override
//    public void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        if (getArguments() != null) {
//            tourName = (String) getArguments().getSerializable("tourName");
//        }
//    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = PaymentMethodBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        context = getActivity();
        return root;
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        binding.btnPaymentLater.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });
        binding.btnPaymentPaypal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getActivity(), PayPalActivity.class);
                startActivity(intent);
            }
        });
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}
