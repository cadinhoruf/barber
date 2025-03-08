'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { FcGoogle } from 'react-icons/fc'

export function LoginForm() {
  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardDescription>
          Faça login com sua conta Google para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant='outline' className='w-full' onClick={handleSignIn}>
          <FcGoogle className='mr-2 w-5 h-5' />
          Entrar com Google
        </Button>
      </CardContent>
      <CardFooter className='flex justify-center text-muted-foreground text-sm'>
        Ao fazer login, você concorda com nossos termos de serviço
      </CardFooter>
    </Card>
  )
}
