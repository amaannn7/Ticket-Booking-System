package com.TicketBookingSystem.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.TicketBookingSystem.model.Ticket;
import com.TicketBookingSystem.service.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping
    public ResponseEntity<Ticket> addTicket(@RequestBody Map<String, Object> ticketData) {
        // Create a new ticket from the frontend data format
        Ticket ticket = new Ticket();
        ticket.SetEventName((String) ticketData.get("eventName"));
        
        // Handle price as either Double or Integer from frontend
        Object priceObj = ticketData.get("price");
        double price;
        if (priceObj instanceof Integer) {
            price = ((Integer) priceObj).doubleValue();
        } else {
            price = (Double) priceObj;
        }
        ticket.setPrice(price);
        
        return ResponseEntity.ok(ticketService.addTicket(ticket));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> purchaseTicket(@PathVariable Long id) {
        try {
            ticketService.purchaseTicket(id);
            return ResponseEntity.ok("Ticket purchased successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @PostMapping("/simulate")
    public ResponseEntity<String> simulateTicketOperations(@RequestBody Map<String, Object> simulationData) {
        int numVendors = (Integer) simulationData.get("numVendors");
        int numCustomers = (Integer) simulationData.get("numCustomers");
        int operationsPerThread = (Integer) simulationData.get("operationsPerThread");
        
        ticketService.simulateTicketOperations(numVendors, numCustomers, operationsPerThread);
        return ResponseEntity.ok("Simulation started.");
    }
}