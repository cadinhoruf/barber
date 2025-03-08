'use client'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { User, Role } from '@prisma/client'

interface UserManagementProps {
  users: User[]
  onUpdateRole: (userId: string, role: Role) => Promise<void>
}

export function UserManagement({ users, onUpdateRole }: UserManagementProps) {
  const [updating, setUpdating] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      setUpdating(userId)
      await onUpdateRole(userId, newRole)
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Data de Cadastro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  disabled={updating === user.id}
                  value={user.role}
                  onValueChange={(value: Role) =>
                    handleRoleChange(user.id, value)
                  }
                >
                  <SelectTrigger className='w-32'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='CLIENT'>Cliente</SelectItem>
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
  )
}
