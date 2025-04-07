package com.TicketBookingSystem.core;

import com.TicketBookingSystem.model.Ticket;
import com.TicketBookingSystem.service.TicketService;

import java.util.List;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CustomerThread implements Runnable {
    private static final Logger logger = LoggerFactory.getLogger(CustomerThread.class);
    private final TicketService ticketService;
    private final int operationsCount;
    private final Random random = new Random();

    public CustomerThread(TicketService ticketService, int operationsCount) {
        this.ticketService = ticketService;
        this.operationsCount = operationsCount;
    }

    @Override
    public void run() {
        logger.info("Customer thread started with {} operations", operationsCount);
        for (int i = 0; i < operationsCount; i++) {
            try {
                List<Ticket> tickets = ticketService.getAllTickets();
                if (!tickets.isEmpty()) {
                    int randomIndex = random.nextInt(tickets.size());
                    Ticket selectedTicket = tickets.get(randomIndex);
                    ticketService.purchaseTicket(selectedTicket.getId());
                    logger.info("Customer purchased ticket: {}, price: ${}", 
                            selectedTicket.getEventName(), 
                            String.format("%.2f", selectedTicket.getPrice()));
                } else {
                    logger.info("No tickets available for purchase");
                }
                Thread.sleep(random.nextInt(100));
            } catch (Exception e) {
                logger.error("Error purchasing ticket: {}", e.getMessage());
            }
        }
        logger.info("Customer thread completed");
    }
}