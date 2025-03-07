"use client"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Calendar, LogOut, User } from "lucide-react"

export function Header() {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  if (pathname === "/login") return null

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          <span className="text-xl font-bold">Barbearia Estilo</span>
        </div>

        {status === "authenticated" && session && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{session.user?.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/login" })}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

