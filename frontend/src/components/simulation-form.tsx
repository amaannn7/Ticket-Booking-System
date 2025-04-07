"use client"

import type React from "react"

import { useState } from "react"
import { simulateTicketOperations } from "../services/ticket-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useToast } from "../components/ui/use-toast"
import { Slider } from "../components/ui/slider"
import { AlertCircle, Play, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

interface SimulationFormProps {
  onAction: (action: string) => void
}

export default function SimulationForm({ onAction }: SimulationFormProps) {
  const [formData, setFormData] = useState({
    numVendors: 5,
    numCustomers: 10,
    operationsPerThread: 20,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await simulateTicketOperations(formData.numVendors, formData.numCustomers, formData.operationsPerThread)

      setIsSimulating(true)
      onAction(`Started simulation with ${formData.numVendors} vendors and ${formData.numCustomers} customers`)

      toast({
        title: "Simulation Started",
        description: `Running with ${formData.numVendors} vendors and ${formData.numCustomers} customers`,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to start simulation",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className={isSimulating ? "animate-spin text-emerald-500" : ""} />
          Automated Ticket Simulation
        </CardTitle>
        <CardDescription>
          Run a background process that simulates concurrent ticket operations with multiple vendors and customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>How simulation works</AlertTitle>
          <AlertDescription>
            This will start a background process where:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Virtual vendors will randomly create new tickets</li>
              <li>Virtual customers will randomly purchase available tickets</li>
              <li>All operations happen concurrently to simulate real-world load</li>
              <li>You can continue using the application while simulation runs</li>
            </ul>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="numVendors">Number of Vendor Threads: {formData.numVendors}</Label>
              </div>
              <Slider
                id="numVendors"
                min={1}
                max={20}
                step={1}
                value={[formData.numVendors]}
                onValueChange={(value) => setFormData({ ...formData, numVendors: value[0] })}
                className="mb-6"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="numCustomers">Number of Customer Threads: {formData.numCustomers}</Label>
              </div>
              <Slider
                id="numCustomers"
                min={1}
                max={30}
                step={1}
                value={[formData.numCustomers]}
                onValueChange={(value) => setFormData({ ...formData, numCustomers: value[0] })}
                className="mb-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="operationsPerThread">Operations Per Thread</Label>
              <Input
                id="operationsPerThread"
                type="number"
                min="1"
                max="100"
                value={formData.operationsPerThread}
                onChange={(e) =>
                  setFormData({ ...formData, operationsPerThread: Number.parseInt(e.target.value) || 1 })
                }
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">
                Number of operations each virtual vendor and customer will perform
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full gap-2" disabled={isLoading || isSimulating}>
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Starting Simulation...
              </>
            ) : isSimulating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Simulation Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start Simulation
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {isSimulating && (
        <CardFooter className="bg-emerald-50 border-t border-emerald-100">
          <div className="w-full text-center text-sm text-emerald-700 py-2">
            <p className="flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Simulation is running in the background
            </p>
            <p className="text-xs mt-1">You can continue using the application while the simulation runs</p>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

