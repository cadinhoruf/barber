import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parse, format, addMinutes } from 'date-fns'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const barberId = searchParams.get('barberId')
    const date = searchParams.get('date')

    if (!barberId || !date) {
      return new NextResponse('Missing parameters', { status: 400 })
    }

    // Buscar horário de trabalho do barbeiro
    const workingHours = await prisma.workingHours.findFirst({
      where: { barberShopId: barberId },
      include: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
      }
    })

    if (!workingHours) {
      return new NextResponse('Barber working hours not found', { status: 404 })
    }

    // Buscar agendamentos existentes
    const appointments = await prisma.appointment.findMany({
      where: {
        barberShopId: {
          equals: barberId
        },
        dateTime: {
          gte: new Date(date),
          lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
        }
      }
    })

    // Gerar slots disponíveis
    const dayOfWeek = new Date(date).getDay()
    const daySchedule = [
      workingHours.sunday,
      workingHours.monday,
      workingHours.tuesday,
      workingHours.wednesday,
      workingHours.thursday,
      workingHours.friday,
      workingHours.saturday
    ][dayOfWeek]

    if (!daySchedule) {
      return NextResponse.json({ slots: [] })
    }

    const slots = []
    let currentTime = parse(daySchedule.startTime, 'HH:mm', new Date(date))
    const endTime = parse(daySchedule.endTime, 'HH:mm', new Date(date))

    while (currentTime < endTime) {
      const timeString = format(currentTime, 'HH:mm')
      const isAvailable = !appointments.some(
        apt => format(apt.dateTime, 'HH:mm') === timeString
      )

      if (isAvailable) {
        slots.push(timeString)
      }

      currentTime = addMinutes(currentTime, 30) // intervalo de 30 minutos
    }

    return NextResponse.json({ slots })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
