import 'server-only'
import { prisma } from '@/lib/prisma'

export const getSchedules = async (id: string) => {
  const schedules = await prisma.schedule.findMany({
    where: { barberShopId: id }
  })

  if (!schedules) {
    throw new Error('Nenhum horário encontrado')
  }

  return { schedules }
}
