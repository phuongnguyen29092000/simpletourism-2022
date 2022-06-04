package com.example.simpletouristapp.api;

import com.example.simpletouristapp.model.TokenResponse;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface LoginGoogleApi {
    @FormUrlEncoded
    @POST("token")
    Call<TokenResponse> getAccessToken(@Field("code") String code,@Field("client_id") String clientId
            ,@Field("client_secret") String clientSecret,@Field("redirect_uri") String redirectId
            ,@Field("grant_type") String grantType);

}
