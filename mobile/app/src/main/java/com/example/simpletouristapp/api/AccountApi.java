package com.example.simpletouristapp.api;

import com.example.simpletouristapp.model.HistoryTicketResponse;
import com.example.simpletouristapp.model.RefreshTokenResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface AccountApi {
    @GET("ticket/history/{id}")
    Call<HistoryTicketResponse> getHistoryTicket(@Path("id") String idCustomer);

    @FormUrlEncoded
    @POST("auth/refresh-tokens")
    Call<RefreshTokenResponse> getAccessInfo(@Field("refreshToken") String refreshToken);
}
