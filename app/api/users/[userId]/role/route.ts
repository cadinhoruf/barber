import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { role } = body

    const user = await prisma.user.update({
      where: { id: params.userId },
      data: { role }
    })

    // Se o usuário for atualizado para BARBER, criar perfil de barbeiro
    if (role === 'BARBER') {
      await prisma.barberShop.create({
        data: {
          userId: user.id,
          name: 'Barbearia do Usuário',
          address: 'Endereço da Barbearia',
          phone: '1234567890',
          email: 'barbearia@example.com',
          website: 'https://example.com',
          logo: 'https://example.com/logo.png',
          images: [
            'https://example.com/image1.png',
            'https://example.com/image2.png'
          ]
        }
      })
    }

    return NextResponse.json(user)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
