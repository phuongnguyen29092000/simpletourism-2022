package com.example.simpletouristapp.service;

import com.example.simpletouristapp.api.NewsApi;
import com.example.simpletouristapp.model.News;
import com.example.simpletouristapp.model.NewsResponse;
import com.example.simpletouristapp.model.NewsSingleResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class NewsApiService {

    private NewsApi newsApi;

    public NewsApiService (){

        Gson gson = new GsonBuilder().setLenient().create();
        newsApi = new Retrofit.Builder()
                .baseUrl(ToursApiService.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build()
                .create(NewsApi.class);

    }
    public Call<NewsResponse> getAllNews(){
        return newsApi.getAllNews();
    }
    public Call<NewsSingleResponse> getNewsById(String id){
        return newsApi.getNewsById(id);
    }
}
