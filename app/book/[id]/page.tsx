import { AppointmentCalendar } from '@/components/appointment-calendar'
import { BarberInfo } from '@/components/barber-info'
import { getBarberInfo } from '@/app/data-access/barber/get-barber-info'
import { getAppointments } from '@/app/data-access/barber/appointments/get-appointments'

export default async function BookPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { barberInfo } = await getBarberInfo(id)
  const { appointments } = await getAppointments(id)

  return (
    <div className='mx-auto py-6 container'>
      <h1 className='mb-6 font-bold text-3xl'>Agendamentos</h1>
      <div className='gap-6 grid md:grid-cols-2'>
        <BarberInfo barberInfo={barberInfo} appointments={appointments} />
        <AppointmentCalendar appointments={appointments} />
      </div>
    </div>
  )
}
