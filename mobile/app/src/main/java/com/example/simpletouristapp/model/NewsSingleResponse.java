package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

public class NewsSingleResponse {
    @SerializedName("message")
    private String message;
    @SerializedName("newsSingle")
    private News news;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }
}
