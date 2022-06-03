package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class SendFeedbackResponse {
    @SerializedName("status")
    private int status;
    @SerializedName("data")
    private FeedBackResponse.FeedBack data;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public FeedBackResponse.FeedBack getData() {
        return data;
    }

    public void setData(FeedBackResponse.FeedBack data) {
        this.data = data;
    }
}
