package com.example.simpletouristapp.model;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.Date;

@Entity(tableName = "tours")
public class Tour {
    @SerializedName("_id")
    @PrimaryKey
    @NonNull
    private String id;

    @SerializedName("tourName")
    @ColumnInfo(name = "nameTour")
    private String nameTour;

    @SerializedName("countryName")
    @ColumnInfo(name = "nameCountry")
    private String nameCountry;

    @SerializedName("continent")
    @ColumnInfo(name = "continent")
    private String continent;

    @SerializedName("description")
    @ColumnInfo(name = "description")
    private String description;

    @SerializedName("imageAvatar")
    @ColumnInfo(name = "imageAvatar")
    private String imageAvatar;

    @SerializedName("price")
    @ColumnInfo(name = "price")
    private int price;

    @SerializedName("timeStart")
    @Ignore
    private Date timeStart;

    @SerializedName("timeEnd")
    @Ignore
    private Date timeEnd;

    @SerializedName("amount")
    @Ignore
    private int amount;

    @SerializedName("remainingAmount")
    @Ignore
    private int remainingAmount;

    @SerializedName("hotelName")
    @Ignore
    private String nameHotel;

    @SerializedName("schedule")
    @Ignore
    private String schedule;

    @SerializedName("ratingsAverage")
    @ColumnInfo(name = "rating")
    private float rating;

    @SerializedName("discount")
    @ColumnInfo(name = "discount")
    private double discount;

    @SerializedName("imageSlide")
    @Ignore
    private ArrayList<String> imageSlide;

    @SerializedName("typePlace")
    @Ignore
    private TypePlace typePlace;

    @SerializedName("owner")
    @Ignore
    private Owner owner;

    @ColumnInfo(name = "companyName")
    private String companyName;

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public String getCompanyName() {
        return this.companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public int getRemainingAmount() {
        return remainingAmount;
    }

    public void setRemainingAmount(int remainingAmount) {
        this.remainingAmount = remainingAmount;
    }

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
