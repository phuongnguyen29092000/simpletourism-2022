package com.example.simpletouristapp.service;

import com.example.simpletouristapp.api.LoginGoogleApi;
import com.example.simpletouristapp.model.TokenResponse;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginGoogleApiService {
    private static final String BASE_URL = "https://oauth2.googleapis.com/";
    private LoginGoogleApi googleApi;

    public LoginGoogleApiService() {
        googleApi = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(LoginGoogleApi.class);
    }

    public Call<TokenResponse> getAccessToken(String code, String clientId, String clientSecret, String redirectId, String grantType) {
        return googleApi.getAccessToken(code, clientId, clientSecret, redirectId, grantType);
    }
}
