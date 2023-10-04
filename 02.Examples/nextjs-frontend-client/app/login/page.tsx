import { LoginForm } from '@/components/ui/LoginForm'
import type { Metadata } from 'next'
import { getCsrfToken } from "next-auth/react"

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login desc'
}


export default async function Page() {
  const csrfToken = await getCsrfToken()
    return (
      <div className='max-w-xs mx-auto'>
      <LoginForm csrfToken={csrfToken} />
      </div>
    )
  }