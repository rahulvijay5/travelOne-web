// components/CTA.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className="px-6 py-12 mb-4 bg-gray-100 dark:bg-gray-800 min-h-[40vh] flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-bold">Join the Future of Hotel Management and Travel Today!</h2>
        <p className="text-lg">
          Sign up now and be among the first to experience the ultimate platform for travelers and hotel owners.
        </p>
        <div className="flex justify-center space-x-4">
          <Button>
            <Link href="/signup">Get Started for Free</Link>
          </Button>
          <Button variant="outline" className="bg-white text-black">
            <Link href="/demo">Request a Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}