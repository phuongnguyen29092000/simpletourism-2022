package com.example.simpletouristapp.model;

import com.example.simpletouristapp.databinding.InternationalFragmentBinding;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Tour {
    @SerializedName("_id")
    private String id;
    @SerializedName("tourName")
    private String nameTour;
    @SerializedName("countryName")
    private String nameCountry;
    @SerializedName("continent")
    private String continent;
    @SerializedName("description")
    private String description;
    @SerializedName("imageAvatar")
    private String imageAvatar;
    @SerializedName("price")
    private int price;
    @SerializedName("timeStart")
    private Date timeStart;
    @SerializedName("timeEnd")
    private Date timeEnd;
    @SerializedName("amount")
    private int amount;
    @SerializedName("hotelName")
    private String nameHotel;
    @SerializedName("schedule")
    private String schedule;
    @SerializedName("ratingsAverage")
    private float rating;
    @SerializedName("imageSlide")
    private ArrayList<String> imageSlide;
    @SerializedName("typePlace")
    private TypePlace typePlace;

    public Tour(String id, String nameTour, String nameCountry, String continent, String description, String imageAvatar
            , int price, Date timeStart, Date timeEnd, int amount, String nameHotel, String schedule
            , float rating, ArrayList<String> imageSlide, TypePlace typePlace) {
        this.id = id;
        this.nameTour = nameTour;
        this.nameCountry = nameCountry;
        this.continent = continent;
        this.description = description;
        this.imageAvatar = imageAvatar;
        this.price = price;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.amount = amount;
        this.nameHotel = nameHotel;
        this.schedule = schedule;
        this.rating = rating;
        this.imageSlide = imageSlide;
        this.typePlace = typePlace;
    }

//    public Tour(String id, String nameTour, String nameCountry, String continent, String description, String imageAvatar, int price
//            , Date timeStart, Date timeEnd, int amount, String nameHotel, String schedule, ArrayList<String> imageSlide, TypePlace typePlace) {
//        this.id = id;
//        this.nameTour = nameTour;
//        this.nameCountry = nameCountry;
//        this.continent = continent;
//        this.description = description;
//        this.imageAvatar = imageAvatar;
//        this.price = price;
//        this.timeStart = timeStart;
//        this.timeEnd = timeEnd;
//        this.amount = amount;
//        this.nameHotel = nameHotel;
//        this.schedule = schedule;
//        this.imageSlide = imageSlide;
//        this.typePlace = typePlace;
//    }


    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public ArrayList<String> getImageSlide() {
        return imageSlide;
    }

    public void setImageSlide(ArrayList<String> imageSlide) {
        this.imageSlide = imageSlide;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public TypePlace getTypePlace() {
        return typePlace;
    }

    public void setTypePlace(TypePlace typePlace) {
        this.typePlace = typePlace;
    }

    public String getImageAvatar() {
        return imageAvatar;
    }

    public void setImageAvatar(String imageAvatar) {
        this.imageAvatar = imageAvatar;
    }

    public String getNameTour() {
        return nameTour;
    }

    public void setNameTour(String nameTour) {
        this.nameTour = nameTour;
    }

    public String getNameCountry() {
        return nameCountry;
    }

    public void setNameCountry(String nameCountry) {
        this.nameCountry = nameCountry;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
    public Date getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(Date timeStart) {
        this.timeStart = timeStart;
    }

    public Date getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(Date timeEnd) {
        this.timeEnd = timeEnd;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getNameHotel() {
        return nameHotel;
    }

    public void setNameHotel(String nameHotel) {
        this.nameHotel = nameHotel;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public String getContinent() {
        return continent;
    }

    public void setContinent(String continent) {
        this.continent = continent;
    }
}
