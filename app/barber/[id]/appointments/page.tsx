import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AppointmentsPage() {
  return (
    <div className='container mx-auto py-6 max-w-5xl'>
      <div>
        <h1 className='text-2xl font-bold'> Agendamentos </h1>
        <p className='text-muted-foreground'>
          Defina seus dias e horários de atendimento
        </p>
      </div>
    </div>
  )
}
