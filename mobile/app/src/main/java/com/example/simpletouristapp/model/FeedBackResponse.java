package com.example.simpletouristapp.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class FeedBackResponse {

    @SerializedName("status")
    private int status;
    @SerializedName("data")
    private List<FeedBack> data;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
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

        public class Customer {
            @SerializedName("_id")
            private String id;
            @SerializedName("givenName")
            private String givenName;
            @SerializedName("familyName")
            private String familyName;
            @SerializedName("email")
            private String email;
            @SerializedName("role")
            private String role;

            @SerializedName("photoUrl")
            private String photoUrl;

            public String getId() {
                return id;
            }

            public void setId(String id) {
                this.id = id;
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

            public String getPhotoUrl() {
                return photoUrl;
            }

            public void setPhotoUrl(String photoUrl) {
                this.photoUrl = photoUrl;
            }
        }
    }

}
