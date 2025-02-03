import { SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import React from 'react'

const CustomSignInButton = () => {
  return (
    <SignInButton fallbackRedirectUrl="/dashboard">
      <Button>Sign In</Button>
    </SignInButton>
  )
}

export default CustomSignInButton