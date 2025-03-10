import NextAuth, { DefaultSession } from 'next-auth'
import { UserRole } from '@prisma/client'
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      name?: string | null
      email?: string | null
      image?: string | null
    }
    accessToken: string
  }

  interface User {
    id: string
    role: UserRole
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
    accessToken?: string
  }
}
