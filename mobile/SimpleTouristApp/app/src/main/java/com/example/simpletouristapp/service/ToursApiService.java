package com.example.simpletouristapp.service;

import com.example.simpletouristapp.api.ToursApi;
import com.example.simpletouristapp.model.TourResponse;

import hu.akarnokd.rxjava3.retrofit.RxJava3CallAdapterFactory;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ToursApiService {
    private static final String BASE_URL = "http://192.168.1.12:4000/";
    private ToursApi toursApi;

    public ToursApiService(){
        toursApi = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(ToursApi.class);
    }
    public Call<TourResponse> getToursApi(){
        return toursApi.getTours();
    }

}
