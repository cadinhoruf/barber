import { useState, useEffect } from 'react'
import { format } from 'date-fns'

export function useAvailability(barberId: string, date: Date) {
  const [availableSlots, setAvailableSlots] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const response = await fetch(
          `/api/availability?barberId=${barberId}&date=${format(
            date,
            'yyyy-MM-dd'
          )}`
        )
        const data = await response.json()
        setAvailableSlots(data.slots)
      } catch (error) {
        console.error('Erro ao buscar disponibilidade:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailability()
  }, [barberId, date])

  return { availableSlots, isLoading }
}
