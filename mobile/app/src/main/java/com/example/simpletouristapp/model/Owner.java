package com.example.simpletouristapp.model;

import androidx.room.ColumnInfo;

import com.google.gson.annotations.SerializedName;

public class Owner {
    @SerializedName("_id")
    private String id;
    @SerializedName("givenName")
    private String givenName;
    @SerializedName("familyName")
    private String familyName;
    @SerializedName("companyName")
    private String companyName;
    @SerializedName("active")
    private boolean active;

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
