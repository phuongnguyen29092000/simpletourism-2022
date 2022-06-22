package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

public class TicketResponse {

    @SerializedName("status")
    private int status;
    @SerializedName("message")
    private String message;
    @SerializedName("ticket")
    private Ticket ticket;

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

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    private class Ticket {
        @SerializedName("_id")
        private String id;
        @SerializedName("tour")
        private String tour;
        @SerializedName("customer")
        private String customer;
        @SerializedName("phone")
        private String phone;
        @SerializedName("numberPeople")
        private int numberPeople;
        @SerializedName("status")
        private int status;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getTour() {
            return tour;
        }

        public void setTour(String tour) {
            this.tour = tour;
        }

        public String getCustomer() {
            return customer;
        }

        public void setCustomer(String customer) {
            this.customer = customer;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
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
    }
}
