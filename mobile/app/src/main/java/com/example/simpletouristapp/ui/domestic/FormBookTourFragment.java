package com.example.simpletouristapp.ui.domestic;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.FormBookTourBinding;
import com.example.simpletouristapp.databinding.NewsFragmentBinding;
import com.example.simpletouristapp.ui.news.NewsViewModel;

public class FormBookTourFragment extends Fragment {
    private FormBookTourBinding binding;
    private String tourName;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            tourName = (String) getArguments().getSerializable("tourName");
        }
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FormBookTourBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        return root;
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        binding.nameTour.setText(tourName);

        binding.btnIncrease.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(binding.amount.getText().toString().equals("")){
                    binding.amount.setText("1");
                }else {
                    binding.amount.setText(Integer.toString((Integer.parseInt(binding.amount.getText().toString())+1)));
                }

            }
        });
        binding.btnDecrease.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(!binding.amount.getText().toString().equals("") && !binding.amount.getText().toString().equals("0")){
                    binding.amount.setText(Integer.toString((Integer.parseInt(binding.amount.getText().toString())-1)));
                }
            }
        });

        binding.btnBookTourForm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Navigation.findNavController(view).navigate(R.id.action_nav_book_tour_to_nav_payment);
            }
        });
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}
