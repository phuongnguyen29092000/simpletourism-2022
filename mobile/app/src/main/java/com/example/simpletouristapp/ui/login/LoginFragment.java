package com.example.simpletouristapp.ui.login;


import static android.content.Context.MODE_PRIVATE;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.NonNull;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.simpletouristapp.MainActivityLogged;
import com.example.simpletouristapp.R;
import com.example.simpletouristapp.databinding.LoginFragmentBinding;
import com.example.simpletouristapp.model.LoginResponse;
import com.example.simpletouristapp.model.TokenResponse;
import com.example.simpletouristapp.service.LoginGoogleApiService;
import com.example.simpletouristapp.service.ToursApiService;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.Scopes;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.Scope;
import com.google.android.gms.tasks.Task;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginFragment extends Fragment {

    private LoginFragmentBinding binding;
    private GoogleSignInOptions gso;
    private GoogleSignInClient gsc;
    private LoginGoogleApiService googleService;
    private ToursApiService toursApiService;
    private SharedPreferences preferences;

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

        toursApiService = new ToursApiService();

        googleService = new LoginGoogleApiService();

        String email = binding.edtEmailLogin.getText().toString().trim();

        String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.[a-z]+";

        binding.btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(!binding.edtEmailLogin.getText().toString().equals("") && !binding.edtPasswordLogin.getText().toString().equals("")){
                    if (!isEmailValid(binding.edtEmailLogin.getText().toString()))
                    {
                        binding.validateEmail.setText("Email phải đúng định dạng abc@abc.abc");
                        binding.validateEmail.setVisibility(View.VISIBLE);
                    }
                    else
                    {
                        performLogin();
                    }

                }else {
                    if(!binding.edtEmailLogin.getText().toString().equals("") && binding.edtPasswordLogin.getText().toString().equals("")){
                        if (!isEmailValid(binding.edtEmailLogin.getText().toString()))
                        {
                            binding.validateEmail.setText("Email phải đúng định dạng abc@abc.abc");
                            binding.validateEmail.setVisibility(View.VISIBLE);
                        }else {
                            binding.validateEmail.setVisibility(View.GONE);
                        }
                        binding.validatePassword.setText("Bạn phải nhập password");
                        binding.validatePassword.setVisibility(View.VISIBLE);
                    }else {
                        if(binding.edtEmailLogin.getText().toString().equals("") && !binding.edtPasswordLogin.getText().toString().equals("")){
                            binding.validateEmail.setText("Bạn phải nhập email");
                            binding.validateEmail.setVisibility(View.VISIBLE);
                            binding.validatePassword.setVisibility(View.GONE);
                        }else {
                            binding.validateEmail.setText("Bạn phải nhập email");
                            binding.validateEmail.setVisibility(View.VISIBLE);
                            binding.validatePassword.setText("Bạn phải nhập password");
                            binding.validatePassword.setVisibility(View.VISIBLE);
                        }
                    }

                }


            }
        });
        binding.register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Navigation.findNavController(view).navigate(R.id.action_nav_login_to_nav_register);
            }
        });

        gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestScopes(new Scope(Scopes.DRIVE_APPFOLDER))
                .requestServerAuthCode(getString(R.string.server_client_id))
                .requestIdToken(getString(R.string.server_client_id))
                .requestEmail()
                .build();

        gsc = GoogleSignIn.getClient(getActivity(), gso);

        binding.signInGoogle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                signIn();
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
    public static boolean isEmailValid(String email) {
        boolean isValid = false;

        String expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,4}$";
        CharSequence inputStr = email;

        Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(inputStr);
        if (matcher.matches()) {
            isValid = true;
        }
        return isValid;
    }

    private void signIn(){
        Intent intent = gsc.getSignInIntent();
        startActivityForResult(intent,1000);
    }



    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 1000){
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);
                Log.d("auth_code",account.getServerAuthCode());
                Call<TokenResponse> call = googleService.getAccessToken(account.getServerAuthCode()
                        ,getString(R.string.server_client_id),getString(R.string.server_client_secret)
                        ,"","authorization_code");

                call.enqueue(new Callback<TokenResponse>() {
                    @Override
                    public void onResponse(Call<TokenResponse> call, Response<TokenResponse> response) {
                        if(response.code() == 200){
                            TokenResponse tokenResponse = response.body();
                            Log.d("access_token",tokenResponse.getAccessToken());
                            Log.d("expires_in", String.valueOf(tokenResponse.getExpiresIn()));
//                            Log.d("refresh_token",tokenResponse.getRefreshToken());
                            Log.d("scope",tokenResponse.getScope());
                            Log.d("token_type",tokenResponse.getTokenType());
                            Log.d("id_token",tokenResponse.getIdToken());
                        }
                    }

                    @Override
                    public void onFailure(Call<TokenResponse> call, Throwable t) {
                        Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();
                        Log.d("TAG",t.getMessage());
                    }
                });

                Call<LoginResponse> call1 = toursApiService.postFormLogin("","","","","","", account.getIdToken(), "");
                call1.enqueue(new Callback<LoginResponse>() {
                    @Override
                    public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                        if(response.code() == 200){
                            LoginResponse loginResponse = response.body();
                            Toast.makeText(getActivity(), loginResponse.getMessage(), Toast.LENGTH_SHORT).show();
                            preferences = getActivity().getSharedPreferences("Token", MODE_PRIVATE);
                            SharedPreferences.Editor editor = preferences.edit();
                            editor.putString("access_token",loginResponse.getTokenAuth().getAccess().getToken());
                            editor.putString("refresh_token",loginResponse.getTokenAuth().getRefresh().getToken());
                            editor.commit();
                            Log.d("Access",loginResponse.getTokenAuth().getAccess().getToken());
                            Log.d("Refresh",loginResponse.getTokenAuth().getRefresh().getToken());
                            getActivity().finish();
                            Intent intent = new Intent(getActivity().getApplicationContext(), MainActivityLogged.class);
                            startActivity(intent);
                        }
                    }
                    @Override
                    public void onFailure(Call<LoginResponse> call, Throwable t) {
                        Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();
                        Log.d("TAG",t.getMessage());
                    }
                });

            } catch (ApiException e) {
                e.printStackTrace();
                Toast.makeText(getActivity(), "signInResult:failed code=" + e.getStatusCode(), Toast.LENGTH_SHORT).show();
            }
        }
    }
//    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
//        try {
//            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
//
//
//            Intent intent = new Intent(getActivity().getApplicationContext(), MainActivityLogged.class);
//            startActivity(intent);
//            Toast.makeText(getContext(), "Login Successful", Toast.LENGTH_SHORT).show();
//        } catch (ApiException e) {
//            // The ApiException status code indicates the detailed failure reason.
//            // Please refer to the GoogleSignInStatusCodes class reference for more information.
//            Log.w("TAG", "signInResult:failed code=" + e.getStatusCode());
//        }
//    }
}