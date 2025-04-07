"use client"

import { useState } from "react"
import Home from "./components/home"
import VendorDashboard from "./components/vendor-dashboard"
import CustomerDashboard from "./components/customer-dashboard"
import SimulationDashboard from "./components/simulation-dashboard"
import { useToast } from "./components/ui/use-toast"

export default function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const { toast } = useToast()

  // Add a log message with timestamp
  const addLog = (message: string) => {
    const newLog = `${new Date().toLocaleTimeString()}: ${message}`
    setLogs((prevLogs) => [newLog, ...prevLogs])
    toast({
      title: "Activity Log",
      description: message,
      duration: 3000,
    })
  }

  // Handle role selection
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    addLog(`Selected role: ${role}`)
  }

  // Reset role selection
  const handleBack = () => {
    setSelectedRole(null)
  }

  // Get the dashboard title based on selected role
  const getDashboardTitle = () => {
    switch (selectedRole) {
      case "vendor":
        return "Vendor Dashboard"
      case "customer":
        return "Customer Dashboard"
      case "simulation":
        return "Simulation Dashboard"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {!selectedRole ? (
          <Home onRoleSelect={handleRoleSelect} />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to Home
              </button>
              <div className="text-xl font-semibold text-gray-800">{getDashboardTitle()}</div>
            </div>

            {selectedRole === "vendor" && (
              <VendorDashboard
                onTicketAdded={(ticket) => addLog(`Added ticket: ${ticket.name} - $${ticket.price}`)}
                onAction={(action) => addLog(action)}
              />
            )}

            {selectedRole === "customer" && <CustomerDashboard onAction={(action) => addLog(action)} />}

            {selectedRole === "simulation" && <SimulationDashboard onAction={(action) => addLog(action)} />}

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Activity Log</h2>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {logs.length === 0 ? (
                  <p className="text-gray-500 italic">No activity yet</p>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="text-sm text-gray-600 py-1 border-b border-gray-100">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

