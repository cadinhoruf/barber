import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../../globals.css'
import { Header } from '@/components/header'
import { AuthProvider } from '@/components/auth-provider'
import { Toaster } from 'sonner'
import { AppSidebar } from '../../components/sidebar/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getSidebarState } from '@/hooks/use-sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Barbearia Estilo - Agendamentos',
  description: 'Sistema de agendamentos para a Barbearia Estilo'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='flex gap-2 dark:bg-sidebar/80 p-10 w-full overflow-y-scroll'>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
