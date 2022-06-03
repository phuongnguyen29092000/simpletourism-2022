package com.example.simpletouristapp.api;

import com.example.simpletouristapp.model.FeedBackResponse;
import com.example.simpletouristapp.model.LoginResponse;
import com.example.simpletouristapp.model.TicketResponse;
import com.example.simpletouristapp.model.TourResponse;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.model.TypePlaceResponse;


import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
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
            ,@Query("sort") String sort,@Query("price[gte]") int priceMin,@Query("price[lte]") int priceMax,@Query("discount") String discount);

    @GET("tour/tour-noi-bat")
    Call<ToursResponse> getOutStandingTours();

    @GET("feedback/tour/{id}")
    Call<FeedBackResponse> getFeedBackById(@Path("id") String tourId);

    @POST("payment/create")
    Call<ResponseBody> postPaypal();

    @FormUrlEncoded
    @POST("auth/login")
    Call<LoginResponse> postFormLogin(@Field("googleId") String googleId, @Field("email") String email
            , @Field("givenName") String givenName, @Field("familyName") String familyName
            , @Field("photoUrl") String photoUrl, @Field("accessToken") String accessToken, @Field("id_token") String idToken,@Field("type")String type);

    @FormUrlEncoded
    @POST("ticket/create/{id}")
    Call<TicketResponse> bookTour(@Path("id") String id, @Field("customer") String customer, @Field("phone") String phone
            , @Field("numberPeople") int numberPeople);

}
