package com.example.simpletouristapp.api;

import com.example.simpletouristapp.model.TourResponse;
import com.example.simpletouristapp.model.TypePlace;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface ToursApi {
    @GET("tour")
    Call<TourResponse> getTours();
    @GET("typeplace")
    Call<List<TypePlace>> getTypePlace();
}
