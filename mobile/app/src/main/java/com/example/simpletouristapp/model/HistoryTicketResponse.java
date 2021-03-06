package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class HistoryTicketResponse {
    @SerializedName("status")
    private int status;
    @SerializedName("message")
    private String message;
    @SerializedName("tickets")
    private List<Ticket> tickets;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public class Ticket implements Serializable {
        @SerializedName("_id")
        private String id;
        @SerializedName("phone")
        private String phone;
        @SerializedName("paymentPrice")
        private int paymentPrice;
        @SerializedName("numberPeople")
        private int numberPeople;
        @SerializedName("status")
        private int status;
        @SerializedName("idTour")
        private String idTour;
        @SerializedName("tourName")
        private String tourName;
        @SerializedName("imageAvatar")
        private String imageAvatar;
        @SerializedName("createdAt")
        private Date bookingDate;
        @SerializedName("hotelName")
        private String hotelName;

        public String getHotelName() {
            return hotelName;
        }

        public void setHotelName(String hotelName) {
            this.hotelName = hotelName;
        }

        public String getImageAvatar() {
            return imageAvatar;
        }

        public void setImageAvatar(String imageAvatar) {
            this.imageAvatar = imageAvatar;
        }

        public Date getBookingDate() {
            return bookingDate;
        }

        public void setBookingDate(Date bookingDate) {
            this.bookingDate = bookingDate;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public int getPaymentPrice() {
            return paymentPrice;
        }

        public void setPaymentPrice(int paymentPrice) {
            this.paymentPrice = paymentPrice;
        }

        public int getNumberPeople() {
            return numberPeople;
        }

        public void setNumberPeople(int numberPeople) {
            this.numberPeople = numberPeople;
        }

        public int getStatus() {
            return status;
        }

        public void setStatus(int status) {
            this.status = status;
        }

        public String getIdTour() {
            return idTour;
        }

        public void setIdTour(String idTour) {
            this.idTour = idTour;
        }

        public String getTourName() {
            return tourName;
        }

        public void setTourName(String tourName) {
            this.tourName = tourName;
        }

    }


}
