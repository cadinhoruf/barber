import { useState, useEffect } from 'react'
import { User, UserRole } from '@prisma/client'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Falha ao carregar usuários')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  async function updateUserRole(userId: string, role: UserRole) {
    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      })

      if (!response.ok) throw new Error('Falha ao atualizar função do usuário')

      // Atualizar lista local
      setUsers(
        users.map(user => (user.id === userId ? { ...user, role } : user))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      throw err
    }
  }

  return { users, isLoading, error, updateUserRole }
}
