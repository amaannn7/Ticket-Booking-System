package com.TicketBookingSystem.core;

import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.TicketBookingSystem.model.Ticket;
import com.TicketBookingSystem.service.TicketService;

public class VendorThread implements Runnable {
    private static final Logger logger = LoggerFactory.getLogger(VendorThread.class);
    private final TicketService ticketService;
    private final int operationsCount;
    private final Random random = new Random();

    public VendorThread(TicketService ticketService, int operationsCount) {
        this.ticketService = ticketService;
        this.operationsCount = operationsCount;
    }

    @Override
    public void run() {
        logger.info("Vendor thread started with {} operations", operationsCount);
        for (int i = 0; i < operationsCount; i++) {
            String eventName = "Event " + random.nextInt(100);
            double price = 50 + random.nextDouble() * 150;
            Ticket ticket = new Ticket(eventName, price);
            
            try {
                ticketService.addTicket(ticket);
                logger.info("Vendor added ticket: {}, price: ${}", eventName, String.format("%.2f", price));
                Thread.sleep(random.nextInt(100));
            } catch (Exception e) {
                logger.error("Error adding ticket: {}", e.getMessage());
            }
        }
        logger.info("Vendor thread completed");
    }
}