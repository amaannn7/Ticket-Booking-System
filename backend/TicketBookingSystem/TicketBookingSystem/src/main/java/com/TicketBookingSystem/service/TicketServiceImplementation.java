package com.TicketBookingSystem.service;

import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TicketBookingSystem.exception.TicketCapacityExceededException;
import com.TicketBookingSystem.model.Ticket;
import com.TicketBookingSystem.Repository.TicketRepository;
import com.TicketBookingSystem.core.CustomerThread;
import com.TicketBookingSystem.core.TicketPool;
import com.TicketBookingSystem.core.VendorThread;

import java.util.NoSuchElementException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class TicketServiceImplementation implements TicketService {

    private static final Logger logger = LoggerFactory.getLogger(TicketServiceImplementation.class);

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketPool ticketPool;

    @Override
    public Ticket addTicket(Ticket ticket) {
        try {
            logger.info("Adding ticket: {}", ticket.getEventName());
            ticketPool.addTicket(ticket);
            return ticketRepository.save(ticket);
        } catch (TicketCapacityExceededException e) {
            logger.error("Failed to add ticket: {}", e.getMessage());
            throw new RuntimeException("Failed to add ticket: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public Ticket purchaseTicket(Long id) throws Exception {
        logger.info("Attempting to purchase ticket with ID: {}", id);
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Ticket not found with id: " + id));
        
        logger.info("Deleting ticket with ID: {}", ticket.getId());
        ticketRepository.delete(ticket);
        ticketPool.removeTicket(ticket);
        logger.info("Successfully deleted ticket with ID: {}", ticket.getId());
        
        return ticket;
    }

    @Override
    public List<Ticket> getAllTickets() {
        logger.info("Fetching all tickets");
        return ticketRepository.findAll();
    }

    @Override
    public void simulateTicketOperations(int numVendors, int numCustomers, int operationsPerThread) {
        logger.info("Starting simulation with {} vendors, {} customers, {} operations per thread", 
                numVendors, numCustomers, operationsPerThread);
                
        ExecutorService executorService = Executors.newFixedThreadPool(numVendors + numCustomers);

        for (int i = 0; i < numVendors; i++) {
            executorService.submit(new VendorThread(this, operationsPerThread));
        }
        for (int i = 0; i < numCustomers; i++) {
            executorService.submit(new CustomerThread(this, operationsPerThread));
        }

        executorService.shutdown();
        logger.info("Simulation threads submitted and executor service shutdown initiated");
    }
}