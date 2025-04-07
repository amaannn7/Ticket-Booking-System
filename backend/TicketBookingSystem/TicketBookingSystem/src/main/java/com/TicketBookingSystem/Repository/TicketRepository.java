package com.TicketBookingSystem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TicketBookingSystem.model.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

}
