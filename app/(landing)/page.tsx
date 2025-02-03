import React from 'react'
import { ModeToggle } from '@/components/ModeToggle'

import { SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <ModeToggle />
        <h1 className="text-4xl font-bold">LandingPage</h1>
        <p className="text-lg">Under Construction, will create this later</p>
        <div className="flex items-center justify-center gap-4">
          <SignInButton fallbackRedirectUrl="/dashboard">
            <Button>Sign In</Button>
          </SignInButton>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
