"use client"

import { useState } from "react"
import type { Ticket } from "../types/ticket"
import VendorForm from "./vendor-form"
import TicketList from "./ticket-list"

interface VendorDashboardProps {
  onTicketAdded: (ticket: Ticket) => void
  onAction: (action: string) => void
}

export default function VendorDashboard({ onTicketAdded, onAction }: VendorDashboardProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Function to refresh ticket list
  const refreshTickets = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <VendorForm
            onTicketAdded={(ticket) => {
              onTicketAdded(ticket)
              refreshTickets()
            }}
          />
        </div>
        <div className="md:col-span-2">
          <TicketList role="vendor" onAction={onAction} refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  )
}

