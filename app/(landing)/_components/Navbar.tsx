// components/Navbar.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appName } from "@/lib/constants";
import { ModeToggle } from "@/components/ModeToggle";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

export default async function Navbar() {
  const { userId } = await auth();
  return (
    <nav className="flex items-center justify-between px-6 py-6 sticky top-0 bg-white dark:bg-gray-900">
      <div>
        <Link href="/" className="text-2xl font-bold text-primary">
          {appName}
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/features"
          className="text-gray-700 dark:text-gray-300 hover:text-primary"
        >
          Features
        </Link>
        <Link
          href="/pricing"
          className="text-gray-700 dark:text-gray-300 hover:text-primary"
        >
          Pricing
        </Link>
        <Link
          href="/about"
          className="text-gray-700 dark:text-gray-300 hover:text-primary"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-gray-700 dark:text-gray-300 hover:text-primary"
        >
          Contact
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <div>
          {userId ? (
            <Button>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
}
