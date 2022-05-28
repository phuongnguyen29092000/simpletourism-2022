package com.example.simpletouristapp.api;

import com.example.simpletouristapp.model.FeedBackResponse;
import com.example.simpletouristapp.model.TourResponse;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.model.TypePlace;
import com.example.simpletouristapp.model.TypePlaceResponse;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.POST;
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

    @GET("tour")
    Call<ToursResponse> getToursFilter(@Query("continent") String continent,@Query("typeplace") String typePlace
            ,@Query("sort") String sort,@Query("price[gte]") int priceMin,@Query("price[lte]") int priceMax);

    @GET("tour/tour-noi-bat")
    Call<ToursResponse> getOutStandingTours();

    @GET("feedback/tour/{id}")
    Call<FeedBackResponse> getFeedBackById(@Path("id") String tourId);

    @POST("pay")
    Call<String> postPaypal();
}