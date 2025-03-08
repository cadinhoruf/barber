'use client'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'

export function BarberCalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const { appointments, isLoading } = useBarberAppointments(selectedDate)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div>
        <Calendar
          mode='single'
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
      </div>
      <div>
        <h2 className='text-xl font-semibold mb-4'>Agendamentos do Dia</h2>
        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          <AppointmentsList appointments={appointments} />
        )}
      </div>
    </div>
  )
}
