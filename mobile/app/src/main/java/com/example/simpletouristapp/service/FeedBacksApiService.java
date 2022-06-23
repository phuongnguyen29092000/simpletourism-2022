package com.example.simpletouristapp.service;

import com.example.simpletouristapp.api.FeedbacksApi;
import com.example.simpletouristapp.model.FeedBackResponse;
import com.example.simpletouristapp.model.SendFeedbackResponse;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class FeedBacksApiService {
    private final FeedbacksApi feedbacksApi;

    public FeedBacksApiService() {
        feedbacksApi = new Retrofit.Builder()
                .baseUrl(ToursApiService.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(FeedbacksApi.class);
    }

    public Call<FeedBackResponse> getFeedBackById(String tourId) {
        return feedbacksApi.getFeedBackById(tourId);
    }

    public Call<SendFeedbackResponse> sendFeedback(String auth, String tour, String customer, String comment, int rating) {
        return feedbacksApi.sendFeedback(auth, tour, customer, comment, rating);
    }

    public Call<ResponseBody> deleteFeedback(String auth, String id) {
        return feedbacksApi.deleteFeedback(auth, id);
    }
}
