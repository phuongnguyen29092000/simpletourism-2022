package com.example.simpletouristapp.service;

import com.example.simpletouristapp.api.ToursApi;
import com.example.simpletouristapp.model.FeedBackResponse;
import com.example.simpletouristapp.model.TourResponse;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.model.TypePlaceResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ToursApiService {
    private static final String BASE_URL = "http://192.168.1.49:4000/";
    private ToursApi toursApi;

    public ToursApiService(){
                Gson gson = new GsonBuilder().setLenient().create();
                toursApi = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create(gson))
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

    public Call<TypePlaceResponse> getTypePlacesApi(){
        return toursApi.getTypePlace();
    }

    public Call<ToursResponse> getToursByTypePlace(String typePlace){
        return toursApi.getToursByTypePlace(typePlace);
    }

    public Call<ToursResponse> getToursFilter(String continent, String typePlace, String sort, int priceMin, int priceMax){
        return toursApi.getToursFilter(continent, typePlace, sort, priceMin, priceMax);
    }

    public Call<ToursResponse> getOutStandingTours(){
        return toursApi.getOutStandingTours();
    }

    public Call<FeedBackResponse> getFeedBackById(String tourId){
        return toursApi.getFeedBackById(tourId);
    }

    public Call<ResponseBody> getPaypal(){
        return toursApi.getPaypal();
    }
}
