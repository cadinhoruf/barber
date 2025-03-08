'use client'

import {
  Clock,
  Notebook,
  PanelLeftOpen,
  PanelRightOpen,
  UserRound
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavMain } from './nav-main'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { NavUser } from './nav-user'
import { useParams } from 'next/navigation'
export function AppSidebar({ ...props }: { id?: string }) {
  const { id } = useParams()
  const { data: session } = useSession()
  const data = {
    navMain: [
      {
        title: 'Agendamentos',
        items: [
          {
            title: 'Horários',
            icon: Clock,
            url: `/barber/${id}/schedules`
          },
          {
            title: 'Agendamentos',
            icon: Notebook,
            url: `/barber/${id}/appointments`
          }
        ]
      },

      {
        title: 'Administração',
        items: [
          {
            title: 'Usuários',
            icon: UserRound,
            url: '/admin/users'
          }
        ]
      }
    ]
  }
  const [navMain, setNavMain] = useState(data.navMain)
  const { toggleSidebar, open } = useSidebar()
  useEffect(() => {
    let filteredNavMain = data.navMain

    if (session?.user?.role !== 'ADMIN') {
      filteredNavMain = filteredNavMain.filter(
        item => item.title !== 'Administração'
      )
    }

    setNavMain(filteredNavMain)
  }, [session])

  useEffect(() => {
    document.cookie = `sidebar:state=${open}; path=/`
  }, [open])

  return (
    <Sidebar collapsible='icon' variant='inset' {...props}>
      {open ? (
        <Button
          onClick={() => toggleSidebar()}
          variant='outline'
          className='bg-sidebar'
        >
          <PanelRightOpen />
        </Button>
      ) : (
        <Button
          onClick={() => toggleSidebar()}
          variant='outline'
          className='bg-sidebar'
        >
          <PanelLeftOpen />
        </Button>
      )}
      <SidebarContent>
        <NavMain data={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
