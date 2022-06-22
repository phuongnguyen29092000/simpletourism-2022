package com.example.simpletouristapp.api;

import com.example.simpletouristapp.model.NewsResponse;
import com.example.simpletouristapp.model.NewsSingleResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface NewsApi {

    @GET("news")
    Call<NewsResponse> getAllNews();

    @GET("news/{id}")
    Call<NewsSingleResponse> getNewsById(@Path("id") String id);
}
