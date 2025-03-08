import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()

  console.log(session?.user.role)
  if (session && session.user.role === 'ADMIN') {
    redirect('/admin/users')
  } else if (session && session.user.role === 'BARBER') {
    redirect('/barber/dashboard')
  } else if (session && session.user.role === 'USER') {
    redirect('/dashboard')
  }

  return redirect('/login')
}
