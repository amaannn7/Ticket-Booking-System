package com.TicketBookingSystem.exception;

public class TicketCapacityExceededException extends RuntimeException {
    public TicketCapacityExceededException(String message) {
        super(message);  // Custom exception to handle ticket not found scenario
    }

}
