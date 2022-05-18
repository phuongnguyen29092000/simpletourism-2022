package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class ToursResponse {
    @SerializedName("totalResult")
    public Integer totalResult;
    @SerializedName("data")
    public List<Tour> data;

    public ToursResponse(Integer totalResult, List<Tour> data) {
        this.totalResult = totalResult;
        this.data = data;
    }

    public Integer getTotalResult() {
        return totalResult;
    }

    public void setTotalResult(Integer totalResult) {
        this.totalResult = totalResult;
    }

    public List<Tour> getData() {
        return data;
    }

    public void setData(List<Tour> data) {
        this.data = data;
    }
}
