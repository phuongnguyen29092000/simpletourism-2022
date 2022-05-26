package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class FeedBackResponse{

    @SerializedName("status")
    private int status;
    @SerializedName("totalResult")
    private int totalResult;
    @SerializedName("data")
    private List<FeedBack> data;

    public FeedBackResponse(int status, int totalResult, List<FeedBack> data) {
        this.status = status;
        this.totalResult = totalResult;
        this.data = data;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getTotalResult() {
        return totalResult;
    }

    public void setTotalResult(int totalResult) {
        this.totalResult = totalResult;
    }

    public List<FeedBack> getData() {
        return data;
    }

    public void setData(List<FeedBack> data) {
        this.data = data;
    }

    public class FeedBack {

        @SerializedName("_id")
        private String id;
        @SerializedName("tour")
        private String tour;
        @SerializedName("customer")
        private Customer customer;
        @SerializedName("rating")
        private int rating;
        @SerializedName("comment")
        private String comment;

        public FeedBack(String id, String tour, Customer customer, int rating, String comment) {
            this.id = id;
            this.tour = tour;
            this.customer = customer;
            this.rating = rating;
            this.comment = comment;
        }

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

        public Customer getCustomer() {
            return customer;
        }

        public void setCustomer(Customer customer) {
            this.customer = customer;
        }

        public int getRating() {
            return rating;
        }

        public void setRating(int rating) {
            this.rating = rating;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }

        public class Customer{
            @SerializedName("_id")
            private String id;
            @SerializedName("name")
            private String name;
            @SerializedName("email")
            private String email;
            @SerializedName("role")
            private String role;

            public Customer(String id, String name, String email, String role) {
                this.id = id;
                this.name = name;
                this.email = email;
                this.role = role;
            }

            public String getId() {
                return id;
            }

            public void setId(String id) {
                this.id = id;
            }

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public String getEmail() {
                return email;
            }

            public void setEmail(String email) {
                this.email = email;
            }

            public String getRole() {
                return role;
            }

            public void setRole(String role) {
                this.role = role;
            }
        }
    }

}
