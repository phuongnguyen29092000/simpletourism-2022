package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class TourResponse {
    @SerializedName("data")
    public Tour data;

    public TourResponse(Tour data) {
        this.data = data;
    }

    public Tour getData() {
        return data;
    }

    public void setData(Tour data) {
        this.data = data;
    }
}
