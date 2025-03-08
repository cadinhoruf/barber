'use server'
import { auth } from '@/auth'
import { format, addMinutes, parse } from 'date-fns'

export async function bookAppointment(
  date: Date,
  time: string,
  serviceTime: number
) {
  const dateTimeString = `${format(date, 'yyyy-MM-dd')}T${time}`
  const startDateTime = parse(dateTimeString, "yyyy-MM-dd'T'HH:mm", new Date())
  const endDateTime = addMinutes(startDateTime, serviceTime)

  const session = await auth()
  const token = session?.accessToken

  console.log(token)

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
          dateTime: format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss"),
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
