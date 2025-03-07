"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { BarberInfo } from "@/components/barber-info"
import { getBarberInfo, getAvailableSlots } from "@/lib/barber-service"
import type { BarberShopInfo, AvailableSlot } from "@/lib/types"

export default function DashboardPage() {
  const { status } = useSession()
  const router = useRouter()
  const [barberInfo, setBarberInfo] = useState<BarberShopInfo | null>(null)
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      fetchData()
    }
  }, [status, router])

  async function fetchData() {
    const info = await getBarberInfo()
    const slots = await getAvailableSlots()
    setBarberInfo(info)
    setAvailableSlots(slots)
  }

  if (status === "loading" || !barberInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Agendamentos</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <BarberInfo barberInfo={barberInfo} />
        <AppointmentCalendar availableSlots={availableSlots} />
      </div>
    </div>
  )
}

