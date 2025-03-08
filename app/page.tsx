import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getBarberInfo } from './data-access/barber/get-barber-info'

export default async function Home({ params }: { params: { id: string } }) {
  const session = await auth()
  const { barberInfo } = await getBarberInfo(params.id)

  if (session && session.user.role === 'ADMIN') {
    return
  } else if (session && session.user.role === 'BARBER') {
    redirect(`/barber/${barberInfo.id}/dashboard`)
  } else if (session && session.user.role === 'USER') {
    redirect('/dashboard')
  }

  return redirect('/login')
}
