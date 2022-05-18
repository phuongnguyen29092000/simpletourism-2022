package com.example.simpletouristapp.model;

public class PopularPlaces {

    private String namePlace;
    private String url_image;

    public PopularPlaces(String namePlace, String url_image) {
        this.namePlace = namePlace;
        this.url_image = url_image;
    }

    public String getNamePlace() {
        return namePlace;
    }

    public void setNamePlace(String namePlace) {
        this.namePlace = namePlace;
    }

    public String getUrl_image() {
        return url_image;
    }

    public void setUrl_image(String url_image) {
        this.url_image = url_image;
    }
}
