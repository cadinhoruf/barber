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
    return <></>
  }

  return (
    <div className="mx-auto py-6 container">
      <h1 className="mb-6 font-bold text-3xl">Agendamentos</h1>
      <div className="gap-6 grid md:grid-cols-2">
        <BarberInfo barberInfo={barberInfo} />
        <AppointmentCalendar availableSlots={availableSlots} />
      </div>
    </div>
  )
}

