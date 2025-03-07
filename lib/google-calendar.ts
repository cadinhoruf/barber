'use server'
import { auth } from '@/auth'
import { format } from 'date-fns'

export async function bookAppointment(
  date: Date,
  time: string,
  serviceTime: number // em minutos
) {
  const formattedDate = format(date, 'yyyy-MM-dd')
  const startTime = new Date(formattedDate + 'T' + time) // Definir a hora de início
  const endTime = new Date(startTime) // Copiar o horário de início para a variável de tempo final
  endTime.setMinutes(startTime.getMinutes() + serviceTime) // Adicionar o tempo de serviço em minutos ao horário final

  const session = await auth()
  const token = session?.accessToken

  // Enviar os dados para o Google Calendar
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        summary: 'Corte de cabelo - Barbearia Estilo',
        description: 'Corte de cabelo com John Doe',
        start: {
          dateTime: startTime.toISOString(), // Usar o horário de início no formato ISO
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: endTime.toISOString(), // Usar o horário de término no formato ISO
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      })
    }
  )

  if (!response.ok) {
    console.error('Failed to book appointment', response)
    return {
      status: 'error',
      message: 'Failed to book appointment'
    }
  }

  return {
    status: 'success',
    message: 'Appointment booked successfully'
  }
}
