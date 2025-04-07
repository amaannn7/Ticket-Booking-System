"use client"

import { useState, useEffect, useCallback } from "react"
import type { Ticket } from "../types/ticket"
import { getAllTickets } from "../services/ticket-service"

export function useTickets(refreshInterval = 5000) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  const fetchTickets = useCallback(async () => {
    try {
      const data = await getAllTickets()
      setTickets(data)
      setError("")
    } catch (err) {
      setError("Failed to load tickets")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTickets()

    const interval = setInterval(fetchTickets, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchTickets, refreshInterval])

  return { tickets, error, loading, refetch: fetchTickets }
}

