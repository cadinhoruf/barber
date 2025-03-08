'use client'
import { Bell, Calendar, CalendarClock, Check, CheckCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return <></>
  }

  return (
    <div className='flex min-h-screen w-full'>
      <div className='hidden w-1/2 flex-col justify-between bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 text-white lg:flex relative overflow-hidden'>
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-white blur-3xl'></div>
          <div className='absolute bottom-[30%] right-[20%] w-40 h-40 rounded-full bg-white blur-3xl'></div>
        </div>

        <div className='flex items-center gap-2 text-xl font-bold relative z-10'>
          <CalendarClock size={28} />
          <span>AgendaAi</span>
        </div>

        <div className='space-y-6 relative z-10'>
          <h1 className='text-5xl font-bold leading-tight text-gray-100'>
            Simplifique seu agendamento
          </h1>
          <p className='text-xl text-gray-400'>
            Gerencie sua agenda de forma inteligente e eficiente com o AgendaAi.
          </p>

          <div className='flex flex-col gap-3 pt-8'>
            <div className='flex items-center gap-2'>
              <div className='rounded-full bg-gray-700/50 p-1'>
                <Check size={16} />
              </div>
              <span className='text-gray-300'>Agendamento simplificado</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='rounded-full bg-gray-700/50 p-1'>
                <Bell size={16} />
              </div>
              <span className='text-gray-300'>Notificações automáticas</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='rounded-full bg-gray-700/50 p-1'>
                <Calendar size={16} />
              </div>
              <span className='text-gray-300'>Integração com calendários</span>
            </div>
          </div>
        </div>

        <div className='text-sm text-gray-500'>
          © {new Date().getFullYear()} AgendaAi. Todos os direitos reservados.
        </div>
      </div>

      <div className='flex w-full flex-col justify-center p-4 bg-gray-50 dark:bg-gray-900 sm:p-8 md:p-12 lg:w-1/2 lg:p-16'>
        <div className='mx-auto w-full max-w-md space-y-8'>
          <div className='space-y-2 text-center lg:text-left'>
            <div className='flex items-center justify-center gap-2 text-xl font-bold lg:hidden'>
              <CalendarClock
                size={28}
                className='text-gray-700 dark:text-gray-300'
              />
              <span>AgendaAi</span>
            </div>
            <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100'>
              Bem-vindo de volta
            </h2>
            <p className='text-gray-600 dark:text-gray-400'>
              Entre com suas credenciais para acessar sua conta
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
