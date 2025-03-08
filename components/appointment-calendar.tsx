'use client'

import { useState } from 'react'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TimeSlots } from '@/components/time-slots'
import { AppointmentConfirmation } from '@/components/appointment-confirmation'
import type { Appointment } from '@prisma/client'

interface AppointmentCalendarProps {
  appointments: Appointment[]
}

export function AppointmentCalendar({
  appointments
}: AppointmentCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Filter slots for the selected date
  const slotsForSelectedDate = date
    ? appointments.filter(
        appointment =>
          new Date(appointment.dateTime).toDateString() === date.toDateString()
      )
    : []

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    setSelectedSlot(null)
  }

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time)
  }

  const handleBooking = () => {
    setShowConfirmation(true)
  }

  if (showConfirmation && date && selectedSlot) {
    return (
      <AppointmentConfirmation
        date={date}
        time={selectedSlot}
        onClose={() => {
          setShowConfirmation(false)
          setSelectedSlot(null)
        }}
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agende seu horário</CardTitle>
        <CardDescription>
          Selecione uma data e horário disponível
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4 w-full'>
        <Calendar
          className='w-full'
          mode='single'
          selected={date}
          onSelect={handleDateSelect}
          locale={ptBR}
          disabled={date => {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const hasSlots = appointments.some(
              appointment =>
                new Date(appointment.dateTime).toDateString() ===
                date.toDateString()
            )
            return date < today || !hasSlots
          }}
        />

        {date && (
          <TimeSlots
            slots={slotsForSelectedDate}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSlotSelect}
          />
        )}
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          disabled={!selectedSlot}
          onClick={handleBooking}
        >
          Agendar Horário
        </Button>
      </CardFooter>
    </Card>
  )
}
