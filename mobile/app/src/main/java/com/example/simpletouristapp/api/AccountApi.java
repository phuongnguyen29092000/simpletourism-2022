package com.example.simpletouristapp.api;

import com.example.simpletouristapp.model.HistoryTicketResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

public interface AccountApi {
    @GET("ticket/history/{id}")
    Call<HistoryTicketResponse> getHistoryTicket(@Header("Authorization") String auth, @Path("id") String idCustomer);
}
