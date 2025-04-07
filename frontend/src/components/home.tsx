"use client"

import type React from "react"

import { motion } from "framer-motion"

interface HomeProps {
  onRoleSelect: (role: string) => void
}

export default function Home({ onRoleSelect }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Ticket Booking System</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A secure and efficient platform for vendors to list tickets and customers to purchase them.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl"
      >
        <RoleCard
          title="Vendor"
          description="Add and manage tickets for various events"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-ticket"
            >
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <path d="M13 5v2" />
              <path d="M13 17v2" />
              <path d="M13 11v2" />
            </svg>
          }
          onClick={() => onRoleSelect("vendor")}
        />

        <RoleCard
          title="Customer"
          description="Browse and purchase tickets for events"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          }
          onClick={() => onRoleSelect("customer")}
        />

        <RoleCard
          title="Run Simulation"
          description="Simulate concurrent ticket operations"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-refresh-cw"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
          }
          onClick={() => onRoleSelect("simulation")}
          highlight={true}
        />
      </motion.div>
    </div>
  )
}

interface RoleCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  highlight?: boolean
}

function RoleCard({ title, description, icon, onClick, highlight = false }: RoleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`${highlight ? "bg-emerald-50 border-emerald-200" : "bg-white"} rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border`}
      onClick={onClick}
    >
      <div className="p-6 flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 rounded-full ${highlight ? "bg-emerald-100 text-emerald-700" : "bg-emerald-50 text-emerald-600"} flex items-center justify-center mb-4`}
        >
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

