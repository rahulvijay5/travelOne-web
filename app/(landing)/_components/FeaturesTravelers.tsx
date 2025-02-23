    // components/FeaturesTravelers.tsx
import React from 'react';
import { CheckCircle, Scan, PhoneCall, Shield } from 'lucide-react';

export default function FeaturesTravelers() {
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: 'Hassle-Free Check-ins',
      description: 'Reduce check-in time by creating your account once and making bookings effortlessly.',
    },
    {
      icon: <Scan className="h-6 w-6 text-primary" />,
      title: 'Unified Booking Platform',
      description: 'Book your stay with confidence without submitting details at every hotel.',
    },
    {
      icon: <PhoneCall className="h-6 w-6 text-primary" />,
      title: 'In-App Room Service',
      description: 'Order room service directly through the app without the need to contact the help desk.',
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: 'Trusted Bookings',
      description: 'Your bookings are always in the right hands, ensuring reliability and trust.',
    },
  ];

  return (
    <section className="px-6 py-12 bg-white dark:bg-gray-900 min-h-[55vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Features for Travelers
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