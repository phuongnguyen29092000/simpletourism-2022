package com.example.simpletouristapp.service;

import com.example.simpletouristapp.api.ToursApi;
import com.example.simpletouristapp.model.FeedBackResponse;
import com.example.simpletouristapp.model.LoginResponse;
import com.example.simpletouristapp.model.TicketResponse;
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
import retrofit2.http.Field;

import retrofit2.http.GET;
import retrofit2.http.Path;

public class ToursApiService {
    public static final String BASE_URL = "http://192.168.1.49:4000/";
    private ToursApi toursApi;

    public ToursApiService(){
                Gson gson = new GsonBuilder().setLenient().create();
                toursApi = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build()
                .create(ToursApi.class);
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

    public Call<ToursResponse> getToursFilter(String continent, String typePlace, String sort, int priceMin, int priceMax, String discount){
        return toursApi.getToursFilter(continent, typePlace, sort, priceMin, priceMax, discount);
    }

    public Call<ToursResponse> getOutStandingTours(){
        return toursApi.getOutStandingTours();
    }



    public Call<ResponseBody> postPaypal(String name, String sku, int price, int quantity){
        return toursApi.postPaypal(name, sku, price, quantity);
    }

    public Call<LoginResponse> postFormLogin(String googleId, String email
            , String givenName, String familyName
            , String photoUrl, String accessToken, String idToken){
        return toursApi.postFormLogin(googleId,email,givenName,familyName,photoUrl,accessToken,idToken,"mobile");
    }

    public Call<TicketResponse> bookTour(String auth,String id,String customer,String phone,int numberPeople){
        return toursApi.bookTour(auth, id,customer,phone,numberPeople);
    }

    public Call<ToursResponse> searchTour(String search){
        return toursApi.searchTour(search);
    }
}
