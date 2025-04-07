"use client"

import { useEffect, useState } from "react"
import { useTickets } from "../hooks/use-tickets"
import { purchaseTicket } from "../services/ticket-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { Loader2, RefreshCw } from "lucide-react"

interface TicketListProps {
  role: string
  onAction: (action: string) => void
  refreshTrigger?: number
  simulationView?: boolean
}

export default function TicketList({ role, onAction, refreshTrigger = 0, simulationView = false }: TicketListProps) {
  const { tickets, error, loading, refetch } = useTickets(simulationView ? 2000 : 5000) // Faster refresh for simulation view
  const { toast } = useToast()
  const [ticketChanges, setTicketChanges] = useState<{ added: number; removed: number }>({ added: 0, removed: 0 })
  const [prevTicketCount, setPrevTicketCount] = useState<number>(0)

  useEffect(() => {
    if (refreshTrigger > 0) {
      refetch()
    }
  }, [refreshTrigger, refetch])

  // Track ticket changes for simulation view
  useEffect(() => {
    if (simulationView && tickets.length !== prevTicketCount) {
      if (tickets.length > prevTicketCount) {
        setTicketChanges((prev) => ({ ...prev, added: prev.added + (tickets.length - prevTicketCount) }))
      } else if (tickets.length < prevTicketCount) {
        setTicketChanges((prev) => ({ ...prev, removed: prev.removed + (prevTicketCount - tickets.length) }))
      }
      setPrevTicketCount(tickets.length)
    }
  }, [tickets.length, prevTicketCount, simulationView])

  const handlePurchase = async (ticketId: string, ticketName: string) => {
    try {
      await purchaseTicket(ticketId)
      onAction(`Purchased ticket: ${ticketName}`)
      refetch()

      toast({
        title: "Success",
        description: `Ticket "${ticketName}" purchased successfully`,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to purchase ticket",
        variant: "destructive",
      })
      onAction("Failed to purchase ticket")
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Available Tickets</CardTitle>
            <CardDescription>
              {simulationView
                ? "Watch tickets being added and purchased by the simulation"
                : role === "customer"
                  ? "Browse all available tickets for purchase"
                  : "Manage your available tickets"}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={refetch} className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No tickets available</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{ticket.name}</h3>
                      <p className="text-emerald-600 font-semibold">${ticket.price.toFixed(2)}</p>
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">ID: {ticket.id}</div>
                  </div>

                  <div className="mt-4">
                    {role === "customer" ? (
                      <Button size="sm" onClick={() => handlePurchase(ticket.id, ticket.name)} className="w-full">
                        Purchase
                      </Button>
                    ) : role === "simulation" ? (
                      <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded text-center">
                        Automated simulation in progress
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded text-center">Available for sale</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {simulationView && (
        <CardFooter className="bg-gray-50 border-t text-sm">
          <div className="w-full flex justify-between items-center">
            <div className="text-emerald-600">
              <span className="font-medium">{ticketChanges.added}</span> tickets added by simulation
            </div>
            <div className="text-amber-600">
              <span className="font-medium">{ticketChanges.removed}</span> tickets purchased by simulation
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

