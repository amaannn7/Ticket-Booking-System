"use client"

import { useState } from "react"
import { purchaseTicket } from "../services/ticket-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useToast } from "./ui/use-toast"

interface CustomerFormProps {
  onTicketPurchased: () => void
}

export default function CustomerForm({ onTicketPurchased }: CustomerFormProps) {
  const [ticketId, setTicketId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ticketId.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a ticket ID",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await purchaseTicket(ticketId)
      onTicketPurchased()
      setTicketId("")

      toast({
        title: "Success",
        description: "Ticket purchased successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to purchase ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Ticket</CardTitle>
        <CardDescription>Enter ticket ID to complete purchase</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticketId">Ticket ID</Label>
            <Input
              id="ticketId"
              placeholder="Enter ticket ID"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Purchasing..." : "Purchase Ticket"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}