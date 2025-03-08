import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { checkAvailability } from '@/lib/availability'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { date, time, barberId, serviceId } = body

    // Verificar disponibilidade
    const availability = await checkAvailability({
      date: new Date(date),
      time,
      barberId,
      serviceId
    })

    if (!availability.available) {
      return new NextResponse(availability.message, { status: 400 })
    }

    // Criar o agendamento
    const appointment = await prisma.appointment.create({
      data: {
        dateTime: new Date(`${date}T${time}`),
        userId: session.user.id as string,
        barberShopId: barberId,
        services: {
          connect: {
            id: serviceId
          }
        },
        status: 'SCHEDULED'
      },
      include: {
        services: true,
        barberShop: {
          include: {
            User: true
          }
        }
      }
    })

    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
