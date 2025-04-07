package com.TicketBookingSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String eventName;
    private double price;

    public Ticket() {}

    public Ticket(String eventName, double price) {
        this.eventName = eventName;
        this.price = price;
    }

    // Standard getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void SetEventName(String eventName) {
        this.eventName = eventName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    
    // Add these methods for frontend compatibility
    @JsonProperty("name")
    public String getName() {
        return eventName;
    }
    
    @JsonProperty("name")
    public void setName(String name) {
        this.eventName = name;
    }
}