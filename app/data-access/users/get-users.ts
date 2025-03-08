import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const getUsers = async () => {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }
  const users = await prisma.user.findMany()
  return { users }
}
