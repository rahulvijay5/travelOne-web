// components/Hero.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-12 bg-gray-50 dark:bg-gray-800 min-h-[70vh]">
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Empower Your Travels and Manage Your Hotels with Ease
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          One platform for seamless check-ins and efficient hotel management.
        </p>
        <div className="flex space-x-4">
          <Button>
            <Link href="/book">Book Your Stay</Link>
          </Button>
          <Button variant="outline">
            <Link href="/manage">Manage Your Hotels</Link>
          </Button>
        </div>
      </div>
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image
          src="https://images.unsplash.com/photo-1735825764457-ffdf0b5aa5dd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
          alt="Hotel Management Illustration"
          width={500}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}