import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getUsers } from '@/app/data-access/users/get-users'
import { UserCard } from './components/card'

export default async function AdminUsersPage() {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }
  const { users } = await getUsers()
  return (
    <div className='container mx-auto py-6 space-y-6'>
      <UserCard users={users} />
    </div>
  )
}
