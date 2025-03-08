'use client'

import { ChevronsUpDown, LogOut, Palette } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useTheme } from '@/hooks/use-theme'
import { useSession } from 'next-auth/react'

export function NavUser() {
  const { data: session } = useSession()
  const router = useRouter()
  const { isMobile } = useSidebar()
  const { toggleTheme } = useTheme()

  const handleLogout = () => {
    signOut()
    router.push('/')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='rounded-lg w-8 h-8'>
                <AvatarFallback className='rounded-lg'>
                  {session?.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 grid text-sm text-left leading-tight'>
                <span className='font-semibold truncate'>
                  {session?.user?.name}
                </span>
                <span className='text-xs truncate'>{session?.user?.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='rounded-lg w-[--radix-dropdown-menu-trigger-width] min-w-56'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuItem onClick={toggleTheme}>
              <Palette />
              Alterar tema
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
