import type { Ticket, CreateTicketDto } from "../types/ticket"
import { API_BASE_URL } from "../config/api"

// Get all tickets
export async function getAllTickets(): Promise<Ticket[]> {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch tickets")
  }

  const data = await response.json()

  return data.map((ticket: any) => ({
    id: ticket.id.toString(),
    name: ticket.eventName || ticket.name,
    price: ticket.price,
  }))
}

// Create a new ticket
export async function createTicket(ticket: CreateTicketDto): Promise<Ticket> {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventName: ticket.name,
      price: ticket.price,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to create ticket")
  }

  const data = await response.json()

  return {
    id: data.id.toString(),
    name: data.eventName || data.name,
    price: data.price,
  }
}

// Purchase a ticket
export async function purchaseTicket(ticketId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to purchase ticket with ID: ${ticketId}`)
  }
}

// Run simulation
export async function simulateTicketOperations(
  numVendors: number,
  numCustomers: number,
  operationsPerThread: number,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tickets/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      numVendors,
      numCustomers,
      operationsPerThread,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to start simulation")
  }
}

// Get simulation logs
export async function getSimulationLogs(since?: string): Promise<any[]> {
  const url = since ? `${API_BASE_URL}/tickets/simulate/logs?since=${since}` : `${API_BASE_URL}/tickets/simulate/logs`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch simulation logs")
  }

  return await response.json()
}

