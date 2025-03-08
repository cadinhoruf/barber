import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Appointment } from '@prisma/client'

export function useBarberAppointments(date?: Date) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!date) return

    async function fetchAppointments() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/appointments/barber?date=${format(date, 'yyyy-MM-dd')}`
        )

        if (!response.ok) {
          throw new Error('Falha ao carregar agendamentos')
        }

        const data = await response.json()
        setAppointments(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [date])

  return { appointments, isLoading, error }
}
