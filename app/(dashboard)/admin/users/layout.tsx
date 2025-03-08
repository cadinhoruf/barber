import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../../globals.css'
import { Header } from '@/components/header'
import { AuthProvider } from '@/components/auth-provider'
import { Toaster } from 'sonner'
import { AppSidebar } from '../../components/sidebar/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

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
      <Toaster />
      <SidebarProvider>
        <AppSidebar />
        <main>{children}</main>
      </SidebarProvider>
    </>
  )
}
