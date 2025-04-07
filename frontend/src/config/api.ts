export const API_BASE_URL = "http://localhost:8086/api"

export const ENDPOINTS = {
  tickets: `${API_BASE_URL}/tickets`,
  ticketById: (id: string) => `${API_BASE_URL}/tickets/${id}`,
  simulate: `${API_BASE_URL}/tickets/simulate`,
}

