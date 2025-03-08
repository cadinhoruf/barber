'use client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Appointment } from '@prisma/client'

interface AppointmentsListProps {
  appointments: Appointment[]
}

const statusMap = {
  SCHEDULED: { label: 'Agendado', variant: 'default' },
  COMPLETED: { label: 'Concluído', variant: 'success' },
  CANCELLED: { label: 'Cancelado', variant: 'destructive' }
} as const

export function AppointmentsList({ appointments }: AppointmentsListProps) {
  if (!appointments.length) {
    return (
      <div className='text-center text-muted-foreground'>
        Nenhum agendamento para este dia
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {appointments.map(appointment => (
        <Card key={appointment.id} className='p-4'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='font-medium'>{appointment.client.name}</p>
              <p className='text-sm text-muted-foreground'>
                {format(appointment.date, "HH:mm 'hrs'", { locale: ptBR })}
              </p>
              <p className='text-sm'>{appointment.service.name}</p>
            </div>
            <Badge variant={statusMap[appointment.status].variant}>
              {statusMap[appointment.status].label}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  )
}
