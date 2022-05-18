package com.example.simpletouristapp.ui.login;


import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.simpletouristapp.MainActivityLogged;
import com.example.simpletouristapp.databinding.LoginFragmentBinding;

public class LoginFragment extends Fragment {

    private LoginFragmentBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = LoginFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

//        final TextView textView = binding.textForeign;
//        domesticViewModel.getText().observe(getViewLifecycleOwner(), textView::setText);
        return root;
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        binding.btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                performLogin();
            }
        });
    }
    private void performLogin(){
        String email = binding.edtEmailLogin.getText().toString();
        String password = binding.edtPasswordLogin.getText().toString();
        Log.d("email", email);
        Log.d("password", password);
        if(!email.equals("") && !password.equals("")){
            Toast.makeText(getContext(), "Login Success",Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(getActivity().getApplicationContext(), MainActivityLogged.class);
            startActivity(intent);
        }else {
            Toast.makeText(getContext(), "Please enter email and password",Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}