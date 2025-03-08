import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { MapPin, Phone, Clock } from 'lucide-react'
import { Appointment, BarberShop } from '@prisma/client'

interface BarberInfoProps {
  barberInfo: BarberShop
  appointments: Appointment[]
}

export function BarberInfo({ barberInfo, appointments }: BarberInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{barberInfo.name}</CardTitle>
        <CardDescription>{barberInfo.description}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='relative h-48 w-full overflow-hidden rounded-md'>
          <Image
            src='https://placehold.co/600x400'
            alt={barberInfo.name}
            className='object-cover'
            fill
          />
        </div>

        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>{barberInfo.address}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Phone className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>{barberInfo.phone}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>
              {appointments
                .map(appointment => appointment.dateTime)
                .join(' • ')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
