package com.example.simpletouristapp.api;

import com.example.simpletouristapp.model.TourResponse;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.model.TypePlace;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ToursApi {
    @GET("tour")
    Call<ToursResponse> getTours();
    @GET("tour/{id}")
    Call<TourResponse> getTourById(@Path("id") String tourId);
    @GET("typeplace")
    Call<List<TypePlace>> getTypePlace();
}
