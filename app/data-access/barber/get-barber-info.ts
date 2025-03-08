import 'server-only'
import { prisma } from '@/lib/prisma'

export async function getBarberInfo(id: string) {
  const info = await prisma.barberShop.findUnique({
    where: {
      id
    }
  })

  if (!info) {
    throw new Error('Barbearia não encontrada')
  }

  return {
    barberInfo: info
  }
}
