import React from 'react'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { userIsSuperAdmin } from '@/hooks/getCurrentUser';

export default async function ManagerPage() {
    const user = await currentUser();
    if (!user) {
        redirect("/unauthenticated");
    }
    const email = user.emailAddresses[0]?.emailAddress;
    if (userIsSuperAdmin(email)) {
        redirect("/s");
    }
  return (
    <div>
        Manager Page
    </div>
  )
}