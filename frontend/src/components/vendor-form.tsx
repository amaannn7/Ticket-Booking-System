"use client"

import type React from "react"

import { useState } from "react"
import { createTicket } from "../services/ticket-service"
import type { Ticket } from "../types/ticket"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useToast } from "./ui/use-toast"

interface VendorFormProps {
  onTicketAdded: (ticket: Ticket) => void
}

export default function VendorForm({ onTicketAdded }: VendorFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.price.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const ticket = await createTicket({
        id: "",
        name: formData.name,
        price: Number.parseFloat(formData.price),
      })

      onTicketAdded(ticket)
      setFormData({ name: "", price: "" })

      toast({
        title: "Success",
        description: "Ticket added successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Ticket</CardTitle>
        <CardDescription>Create a new ticket for an event</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              placeholder="Enter event name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Ticket"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

