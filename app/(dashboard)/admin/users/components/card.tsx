'use client'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Search, UserCog } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const UserCard = ({ users }: { users: User[] }) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      setUpdating(userId)
      const response = await fetch(`/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      })

      if (!response.ok) throw new Error('Falha ao atualizar função')

      toast.success('Função atualizada com sucesso')
    } catch (error) {
      toast.error('Erro ao atualizar função')
      console.error(error)
    } finally {
      setUpdating(null)
    }
  }

  const filteredUsers = users.filter(
    user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-bold flex items-center gap-2'>
          <UserCog className='h-6 w-6' />
          Gerenciamento de Usuários
        </CardTitle>
        <CardDescription>
          Gerencie as funções e permissões dos usuários do sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center space-x-2 mb-6'>
          <Search className='h-5 w-5 text-muted-foreground' />
          <Input
            placeholder='Buscar por nome ou email...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='max-w-sm'
          />
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Data de Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className='font-medium'>
                    <div className='flex items-center space-x-3'>
                      {user.image && (
                        <Image
                          src={user.image}
                          alt={user.name || ''}
                          className='h-8 w-8 rounded-full'
                          width={32}
                          height={32}
                        />
                      )}
                      <span>{user.name || 'Sem nome'}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      disabled={updating === user.id}
                      value={user.role}
                      onValueChange={value => updateUserRole(user.id, value)}
                    >
                      <SelectTrigger className='w-32'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='USER'>Cliente</SelectItem>
                        <SelectItem value='BARBER'>Barbeiro</SelectItem>
                        <SelectItem value='ADMIN'>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
