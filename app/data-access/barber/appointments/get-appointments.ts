import 'server-only'
import { prisma } from '@/lib/prisma'

export const getAppointments = async (id: string) => {
  const appointments = await prisma.appointment.findMany({
    where: { barberShopId: id }
  })

  if (!appointments) {
    throw new Error('Nenhum agendamento encontrado')
  }

  return { appointments }
}
