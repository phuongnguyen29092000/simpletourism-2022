package com.example.simpletouristapp.ui.account;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;


import com.example.simpletouristapp.MainActivity;
import com.example.simpletouristapp.MainActivityLogged;
import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.FragmentAccountBinding;
import com.example.simpletouristapp.databinding.NavHeaderMainBinding;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.squareup.picasso.Picasso;


public class AccountFragment extends Fragment {

    private FragmentAccountBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentAccountBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
//        final TextView textView = binding.textForeign;
//        domesticViewModel.getText().observe(getViewLifecycleOwner(), textView::setText);
        return root;
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);



        binding.btnProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("IdTour", "123");
                Navigation.findNavController(view).navigate(R.id.action_nav_account_to_nav_profile,bundle);
            }
        });
        binding.btnChangePassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("IdTour", "123");
                Navigation.findNavController(view).navigate(R.id.action_nav_account_to_nav_change_password,bundle);
            }
        });
        binding.btnHistory.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("IdTour", "123");
                Navigation.findNavController(view).navigate(R.id.action_nav_account_to_nav_history,bundle);
            }
        });
        binding.btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                signOut();
            }
        });
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    private void signOut(){
        MainActivityLogged.gsc.signOut().addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                SharedPreferences sharedPref = getActivity().getSharedPreferences("Token",Context.MODE_PRIVATE);
                sharedPref.edit().clear();
                getActivity().finish();
                startActivity(new Intent(getActivity(), MainActivity.class));
                Toast.makeText(getContext(), "Logout Successful", Toast.LENGTH_SHORT).show();
            }
        });
    }
}