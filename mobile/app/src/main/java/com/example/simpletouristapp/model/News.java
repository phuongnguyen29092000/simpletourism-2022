package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

public class News {
    @SerializedName("_id")
    private String id;
    @SerializedName("owner")
    private String owner;
    @SerializedName("title")
    private String title;
    @SerializedName("description")
    private String description;
    @SerializedName("imageUrl")
    private String imageUrl;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
