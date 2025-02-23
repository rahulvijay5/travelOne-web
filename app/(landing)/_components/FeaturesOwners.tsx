// components/FeaturesOwners.tsx
import React from 'react';
import { Building, ClipboardList, MessageCircle, BarChart, Smartphone } from 'lucide-react';

export default function FeaturesOwners() {
  const features = [
    {
      icon: <Building className="h-6 w-6 text-primary" />,
      title: 'Manage Multiple Hotels',
      description: 'Easily manage multiple hotels on a single, user-friendly platform.',
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-primary" />,
      title: 'Booking Management',
      description: 'Track and monitor all bookings effortlessly with our comprehensive booking management system.',
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      title: 'Customer Communication',
      description: 'Interact with your customers seamlessly, enhancing their experience and building trust.',
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: 'Room and Analytics Management',
      description: 'Easily manage all rooms, view detailed analytics, and gain insights to improve your services.',
    },
    {
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      title: 'Mobile and Web Support',
      description: 'Our platform is optimized for both mobile and web, ensuring flexibility and accessibility.',
    },
  ];

  return (
    <section className="px-6 py-12 bg-gray-50 dark:bg-gray-800 min-h-[70vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Features for Hotel Owners
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div>{feature.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}