package com.example.simpletouristapp.ui.domestic;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.FormBookTourBinding;
import com.example.simpletouristapp.databinding.PaymentMethodBinding;

public class PaymentMethodFragment extends Fragment {
    private PaymentMethodBinding binding;
    private AlertDialog.Builder builder;
    private AlertDialog alertDialog;
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

        return root;
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        binding.btnPaymentLater.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showAlertDialog(R.layout.dialog_successful);
            }
        });
        binding.btnPaymentPaypal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showAlertDialog(R.layout.dialog_failed);
            }
        });
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
    public void showAlertDialog(int myLayout){
        builder = new AlertDialog.Builder(getActivity());
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
