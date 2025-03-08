'use client'

import { type LucideIcon } from 'lucide-react'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavMain({
  data
}: {
  data: {
    title: string
    items?: {
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
    }[]
  }[]
}) {
  const pathname = usePathname()
  return (
    <>
      {data.map(item => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarMenu>
            {item.items?.map(subItem => {
              const isActive = subItem.url === pathname
              return (
                <SidebarMenuItem key={subItem.title}>
                  <Link href={subItem.url}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={subItem.title}
                    >
                      {subItem.icon && <subItem.icon />}
                      {subItem.title}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
