import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './lib/prisma'
import { UserRole } from '@prisma/client'
import { Adapter } from 'next-auth/adapters'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            'openid email profile https://www.googleapis.com/auth/calendar.events'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
        token.role = user?.role
      }
      return token
    },
    async session({ session, token }) {
      if (!token.accessToken) {
        console.error('Erro: accessToken não encontrado no token JWT.')
      }
      session.accessToken = token.accessToken as string
      session.user.id = token.id as string
      session.user.role = token.role as UserRole
      return session
    }
  },
  session: {
    strategy: 'jwt'
  }
})
