"use client"

import { useState } from "react"
import CustomerForm from "./customer-form"
import TicketList from "./ticket-list"

interface CustomerDashboardProps {
  onAction: (action: string) => void
}

export default function CustomerDashboard({ onAction }: CustomerDashboardProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Function to refresh ticket list after purchase
  const refreshTickets = () => {
    setRefreshTrigger((prev) => prev + 1)
    onAction("Ticket list refreshed")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CustomerForm
            onTicketPurchased={() => {
              refreshTickets()
              onAction("Ticket purchased successfully")
            }}
          />
        </div>
        <div className="md:col-span-2">
          <TicketList 
            role="customer" 
            onAction={onAction} 
            refreshTrigger={refreshTrigger} 
          />
        </div>
      </div>
    </div>
  )
}