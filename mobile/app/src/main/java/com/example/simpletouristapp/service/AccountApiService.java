package com.example.simpletouristapp.service;

import com.example.simpletouristapp.api.AccountApi;
import com.example.simpletouristapp.model.HistoryTicketResponse;
import com.example.simpletouristapp.model.RefreshTokenResponse;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class AccountApiService {
    private AccountApi accountApi;

    public AccountApiService(){
        accountApi = new Retrofit.Builder()
                .baseUrl(ToursApiService.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(AccountApi.class);
    }
    public Call<HistoryTicketResponse> getHistoryTicket(String auth,String idCustomer){
        return accountApi.getHistoryTicket(auth, idCustomer);
    }

    public Call<RefreshTokenResponse> getAccessInfo(String refreshToken){
        return accountApi.getAccessInfo(refreshToken);
    }
}
