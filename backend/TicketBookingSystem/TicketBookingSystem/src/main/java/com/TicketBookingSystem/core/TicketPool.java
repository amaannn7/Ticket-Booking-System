package com.TicketBookingSystem.core;

import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.TicketBookingSystem.exception.TicketCapacityExceededException;
import com.TicketBookingSystem.model.Ticket;

@Component
public class TicketPool {
    private final ConcurrentLinkedDeque<Ticket> tickets = new ConcurrentLinkedDeque<>();  // container that keeps track of tickets and allows many users or processes to work with it at the same time without causing problems.
    private final ReentrantLock lock = new ReentrantLock(); // Lock to ensure thread safety during add/remove operations

    @Value("${ticket.pool.max-capacity}")
    private int maxCapacity;  // Max ticket capacity set via configuration

    public void addTicket(Ticket ticket) throws TicketCapacityExceededException{
        lock.lock();  // Lock to prevent concurrent modification
        try{
            if (tickets.size() >= maxCapacity) {
                throw new TicketCapacityExceededException("Ticket pool is at maximum capacity");
            }
            tickets.offer(ticket);  // Add ticket to the pool
        } finally {
            lock.unlock(); // Release lock
        }
    }

    public boolean removeTicket(Ticket ticket) {
        return tickets.remove(ticket);  // Remove from pool if required after purchase
    }


}
