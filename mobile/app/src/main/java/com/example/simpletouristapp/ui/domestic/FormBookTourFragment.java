package com.example.simpletouristapp.ui.domestic;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.FormBookTourBinding;

import java.util.HashMap;

public class FormBookTourFragment extends Fragment {
    private FormBookTourBinding binding;
    private String tourName;
    private String idTour;
    private String price;
    private HashMap<String, String> informationBookTour;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            tourName = (String) getArguments().getSerializable("tourName");
            idTour = (String) getArguments().getSerializable("idTour");
            price = (String) getArguments().getSerializable("price");
        }
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FormBookTourBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        binding.nameTour.setText(tourName);
        binding.btnIncrease.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (binding.amount.getText().toString().equals("")) {
                    binding.amount.setText("1");
                } else {
                    binding.amount.setText(Integer.toString((Integer.parseInt(binding.amount.getText().toString()) + 1)));
                }
            }
        });
        binding.btnDecrease.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!binding.amount.getText().toString().equals("") && !binding.amount.getText().toString().equals("0")) {
                    binding.amount.setText(Integer.toString((Integer.parseInt(binding.amount.getText().toString()) - 1)));
                }
            }
        });

        binding.tvPriceDetail.setText(price);

        binding.btnBookTourForm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (binding.amount.getText().toString().trim().equals("")) {
                    binding.validateAmount.setVisibility(View.VISIBLE);
                    binding.validateAmount.setText("Bạn cần phải nhập số lượng");
                } else {
                    binding.validateAmount.setVisibility(View.GONE);
                }
                if (binding.phoneNumber.getText().toString().trim().equals("")) {
                    binding.validatePhoneNumber.setVisibility(View.VISIBLE);
                    binding.validatePhoneNumber.setText("Bạn cần phải nhập số điện thoại");
                } else {
                    binding.validatePhoneNumber.setVisibility(View.GONE);
                }
                if (!binding.amount.getText().toString().trim().equals("") && !binding.phoneNumber.getText().toString().trim().equals("")) {
                    informationBookTour = new HashMap<>();
                    informationBookTour.put("idTour", idTour);
                    informationBookTour.put("nameTour", tourName);
                    informationBookTour.put("Amount", binding.amount.getText().toString());
                    informationBookTour.put("Price", price);
                    informationBookTour.put("Phone", binding.phoneNumber.getText().toString());
                    Bundle bundle = new Bundle();
                    bundle.putSerializable("information", informationBookTour);
                    Navigation.findNavController(view).navigate(R.id.action_nav_book_tour_to_nav_payment, bundle);

                } else {
                    if (binding.amount.getText().toString().trim().equals("") && binding.phoneNumber.getText().toString().trim().equals("")) {
                        binding.validateAmount.setVisibility(View.VISIBLE);
                        binding.validateAmount.setText("Bạn cần phải nhập số lượng");
                        binding.validatePhoneNumber.setVisibility(View.VISIBLE);
                        binding.validatePhoneNumber.setText("Bạn cần phải nhập số điện thoại");
                    }

                }

            }
        });
        binding.btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                getActivity().onBackPressed();
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
