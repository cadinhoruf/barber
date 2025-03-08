import { prisma } from '@/lib/prisma'
import { addMinutes, format, parse } from 'date-fns'
import { DayOfWeek } from '@prisma/client'

interface CheckAvailabilityParams {
  date: Date
  time: string
  barberShopId: string
  serviceId: string
}

export async function checkAvailability({
  date,
  time,
  barberShopId,
  serviceId
}: CheckAvailabilityParams) {
  try {
    // 1. Buscar duração do serviço
    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
        barberShopId
      }
    })

    if (!service) {
      return {
        available: false,
        message: 'Serviço não encontrado'
      }
    }

    // 2. Mapear o dia da semana para o enum DayOfWeek
    const dayOfWeekMap: Record<number, DayOfWeek> = {
      0: 'DOMINGO',
      1: 'SEGUNDA',
      2: 'TERCA',
      3: 'QUARTA',
      4: 'QUINTA',
      5: 'SEXTA',
      6: 'SABADO'
    }

    const dayOfWeek = dayOfWeekMap[date.getDay()]

    // 3. Buscar horário de trabalho para o dia específico
    const workingHours = await prisma.workingHours.findFirst({
      where: {
        barberShopId,
        dayOfWeek
      }
    })

    if (!workingHours) {
      return {
        available: false,
        message: 'Barbearia não funciona neste dia'
      }
    }

    // 4. Verificar se o horário está dentro do horário de trabalho
    const requestedTime = parse(time, 'HH:mm', date)
    const startWorkTime = parse(workingHours.startTime, 'HH:mm', date)
    const endWorkTime = parse(workingHours.endTime, 'HH:mm', date)

    if (requestedTime < startWorkTime || requestedTime >= endWorkTime) {
      return {
        available: false,
        message: 'Horário fora do período de funcionamento'
      }
    }

    // 6. Verificar intervalo de almoço/descanso
    if (workingHours.breakStart && workingHours.breakEnd) {
      const breakStart = parse(workingHours.breakStart, 'HH:mm', date)
      const breakEnd = parse(workingHours.breakEnd, 'HH:mm', date)
      const serviceEndTime = addMinutes(requestedTime, service.duration)

      if (
        (requestedTime >= breakStart && requestedTime < breakEnd) ||
        (serviceEndTime > breakStart && serviceEndTime <= breakEnd)
      ) {
        return {
          available: false,
          message: 'Horário durante o intervalo'
        }
      }
    }

    // 7. Verificar agendamentos existentes
    const serviceEndTime = addMinutes(requestedTime, service.duration)
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        barberShopId,
        dateTime: {
          gte: requestedTime,
          lt: serviceEndTime
        },
        status: {
          in: ['SCHEDULED', 'CONFIRMED']
        }
      }
    })

    if (conflictingAppointment) {
      return {
        available: false,
        message: 'Horário já ocupado'
      }
    }

    // 8. Verificar se o serviço cabe no horário de trabalho
    if (serviceEndTime > endWorkTime) {
      return {
        available: false,
        message: 'Duração do serviço ultrapassa o horário de funcionamento'
      }
    }

    // Se passou por todas as verificações, o horário está disponível
    return {
      available: true,
      message: 'Horário disponível',
      slot: {
        startTime: format(requestedTime, 'HH:mm'),
        endTime: format(serviceEndTime, 'HH:mm'),
        duration: service.duration
      }
    }
  } catch (error) {
    console.error('Erro ao verificar disponibilidade:', error)
    return {
      available: false,
      message: 'Erro ao verificar disponibilidade'
    }
  }
}

// Função auxiliar para buscar todos os horários disponíveis
export async function getAvailableTimeSlots({
  date,
  barberShopId,
  serviceId
}: Omit<CheckAvailabilityParams, 'time'>) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    })

    if (!service) {
      return {
        success: false,
        message: 'Serviço não encontrado'
      }
    }

    const dayOfWeekMap: Record<number, DayOfWeek> = {
      0: 'DOMINGO',
      1: 'SEGUNDA',
      2: 'TERCA',
      3: 'QUARTA',
      4: 'QUINTA',
      5: 'SEXTA',
      6: 'SABADO'
    }

    const workingHours = await prisma.workingHours.findFirst({
      where: {
        barberShopId,
        dayOfWeek: dayOfWeekMap[date.getDay()]
      }
    })

    if (!workingHours) {
      return {
        success: false,
        message: 'Barbearia não funciona neste dia'
      }
    }

    const startTime = parse(workingHours.startTime, 'HH:mm', date)
    const endTime = parse(workingHours.endTime, 'HH:mm', date)
    const slots = []

    let currentTime = startTime
    while (currentTime < endTime) {
      const timeString = format(currentTime, 'HH:mm')
      const availability = await checkAvailability({
        date,
        time: timeString,
        barberShopId,
        serviceId
      })

      if (availability.available) {
        slots.push({
          time: timeString,
          endTime: format(addMinutes(currentTime, service.duration), 'HH:mm')
        })
      }

      currentTime = addMinutes(currentTime, 30) // Intervalos de 30 minutos
    }

    return {
      success: true,
      slots
    }
  } catch (error) {
    console.error('Erro ao buscar horários disponíveis:', error)
    return {
      success: false,
      message: 'Erro ao buscar horários disponíveis'
    }
  }
}
