package com.example.simpletouristapp.api;

import com.example.simpletouristapp.model.TourResponse;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.model.TypePlace;
import com.example.simpletouristapp.model.TypePlaceResponse;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ToursApi {
    @GET("tour")
    Call<ToursResponse> getTours();
    @GET("tour/trong-nuoc")
    Call<ToursResponse> getDomesticTours();
    @GET("tour/quoc-te")
    Call<ToursResponse> getInternationalTours();
    @GET("tour/{id}")
    Call<TourResponse> getTourById(@Path("id") String tourId);
    @GET("typeplace")
    Call<TypePlaceResponse> getTypePlace();
    @GET("tour")
    Call<ToursResponse> getToursByTypePlace(@Query("typePlace") String typePlace);
}
