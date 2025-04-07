package com.TicketBookingSystem.service;
import java.util.List;
import com.TicketBookingSystem.model.Ticket;

public interface TicketService {
    Ticket addTicket(Ticket ticket);  // Method to add a ticket
    Ticket purchaseTicket(Long id) throws Exception;  // Method to remove a ticket
    List<Ticket> getAllTickets();  // Method to get all tickets
    void simulateTicketOperations(int numVendors, int numCustomers, int operationsPerThread);  // Method to simulate ticket operations
}