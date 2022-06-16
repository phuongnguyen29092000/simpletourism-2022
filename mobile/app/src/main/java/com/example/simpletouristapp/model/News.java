package com.example.simpletouristapp.model;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

@Entity(tableName = "news")
public class News {
    @SerializedName("_id")
    @PrimaryKey
    @NonNull
    private String id;

    @SerializedName("owner")
    @ColumnInfo(name = "owner")
    private String owner;

    @SerializedName("title")
    @ColumnInfo(name = "title")
    private String title;

    @SerializedName("description")
    @ColumnInfo(name = "description")
    private String description;

    @SerializedName("imageUrl")
    @ColumnInfo(name = "imageUrl")
    private String imageUrl;

    @SerializedName("viewer")
    @Ignore
    private int viewer;
    @SerializedName("createdAt")
    @Ignore
    private Date dateSubmitted;

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

    public int getViewer() {
        return viewer;
    }

    public void setViewer(int viewer) {
        this.viewer = viewer;
    }

    public Date getDateSubmitted() {
        return dateSubmitted;
    }

    public void setDateSubmitted(Date dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }
}
