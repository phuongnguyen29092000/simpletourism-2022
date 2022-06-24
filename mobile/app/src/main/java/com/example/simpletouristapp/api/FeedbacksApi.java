package com.example.simpletouristapp.api;

import com.example.simpletouristapp.model.FeedBackResponse;
import com.example.simpletouristapp.model.SendFeedbackResponse;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.DELETE;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface FeedbacksApi {
    @GET("feedback/tour/{id}")
    Call<FeedBackResponse> getFeedBackById(@Path("id") String tourId);

    @FormUrlEncoded
    @POST("feedback")
    Call<SendFeedbackResponse> sendFeedback(@Header("Authorization") String auth, @Field("tour") String tour
            , @Field("customer") String customer, @Field("comment") String comment, @Field("rating") int rating);

    @DELETE("feedback/{id}")
    Call<ResponseBody> deleteFeedback(@Header("Authorization") String auth, @Path("id") String id);
}
