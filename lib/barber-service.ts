import type { BarberShopInfo, AvailableSlot } from "./types"
import { addDays } from "date-fns"

// Mock data for barber shop information
export async function getBarberInfo(): Promise<BarberShopInfo> {
  // Simulate API call
  return {
    name: "Barbearia Estilo",
    description: "Especializada em cortes modernos e tradicionais",
    address: "Rua das Barbas, 123 - Centro, São Paulo",
    phone: "(11) 99999-9999",
    hours: ["Seg-Sex: 9h às 19h", "Sáb: 9h às 18h"],
    image: "/placeholder.svg?height=400&width=600",
    services: [
      {
        name: "Corte de Cabelo",
        price: 50,
        duration: 30,
      },
      {
        name: "Barba",
        price: 30,
        duration: 20,
      },
      {
        name: "Corte + Barba",
        price: 70,
        duration: 45,
      },
    ],
  }
}

// Mock data for available time slots
export async function getAvailableSlots(): Promise<AvailableSlot[]> {
  // Simulate API call
  const today = new Date()
  const slots: AvailableSlot[] = []

  // Generate slots for the next 14 days
  for (let i = 0; i < 14; i++) {
    const date = addDays(today, i)

    // Skip Sundays (0 is Sunday in JavaScript)
    if (date.getDay() === 0) continue

    // Generate random available times
    const times = []
    const isShortDay = date.getDay() === 6 // Saturday
    const startHour = 9
    const endHour = isShortDay ? 18 : 19

    for (let hour = startHour; hour < endHour; hour++) {
      // Add slots every 30 minutes
      if (Math.random() > 0.3) times.push(`${hour}:00`)
      if (Math.random() > 0.3) times.push(`${hour}:30`)
    }

    slots.push({
      date: date.toISOString(),
      times,
    })
  }

  return slots
}

