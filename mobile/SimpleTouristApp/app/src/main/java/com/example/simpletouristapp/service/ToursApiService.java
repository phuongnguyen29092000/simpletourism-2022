package com.example.simpletouristapp.service;

import com.example.simpletouristapp.api.ToursApi;
import com.example.simpletouristapp.model.TourResponse;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.model.TypePlace;

import java.util.List;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ToursApiService {
    private static final String BASE_URL = "http://192.168.1.49:4000/";
    private ToursApi toursApi;

    public ToursApiService(){
        toursApi = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(ToursApi.class);
    }
    public Call<ToursResponse> getToursApi(){
        return toursApi.getTours();
    }

    public Call<TourResponse> getTourByIdAPi(String tourId){ return toursApi.getTourById(tourId); }

    public Call<ToursResponse> getDomesticToursApi(){
        return toursApi.getDomesticTours();
    }

    public Call<ToursResponse> getInternationalToursApi(){
        return toursApi.getInternationalTours();
    }

    public Call<List<TypePlace>> getTypePlacesApi(){
        return toursApi.getTypePlace();
    }

    public Call<ToursResponse> getToursByTypePlace(String typePlace){
        return toursApi.getToursByTypePlace(typePlace);
    }

}
