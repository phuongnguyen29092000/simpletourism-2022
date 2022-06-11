package com.example.simpletouristapp.model;

public class HistoryTicketResponse {
    private int status;
    private String message;
    private TicketHistory tickets;
    
    public class TicketHistory {
        private String id;
        private String phone;
        private int paymentPrice;
        private int numberPeople;
    }
}
