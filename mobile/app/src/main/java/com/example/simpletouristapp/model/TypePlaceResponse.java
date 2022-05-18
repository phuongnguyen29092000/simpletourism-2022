package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class TypePlaceResponse {
    @SerializedName("status")
    private String status;

    @SerializedName("message")
    private String message;
    @SerializedName("typePlaces")
    private List<TypePlace> typePlaces;

    public TypePlaceResponse(String status, String message, List<TypePlace> typePlaces) {
        this.status = status;
        this.message = message;
        this.typePlaces = typePlaces;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<TypePlace> getTypePlaces() {
        return typePlaces;
    }

    public void setTypePlaces(List<TypePlace> typePlaces) {
        this.typePlaces = typePlaces;
    }
}
