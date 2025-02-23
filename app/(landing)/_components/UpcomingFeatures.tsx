// components/UpcomingFeatures.tsx
import React from 'react';
import { Truck, AlertCircle, BarChart2, Puzzle } from 'lucide-react';

export default function UpcomingFeatures() {
  const features = [
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: 'In-App Food Ordering',
      description: 'Order meals directly through the app without waiting or contacting room service.',
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-primary" />,
      title: 'Direct Complaint System',
      description: "Raise complaints directly with managers through the app, ensuring your voice is heard.",
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      title: 'Enhanced Analytics',
      description: 'Gain deeper insights into your hotel operations with advanced analytics tools.',
    },
    {
      icon: <Puzzle className="h-6 w-6 text-primary" />,
      title: 'Custom Integrations',
      description: 'Integrate with your existing systems seamlessly for a unified experience.',
    },
  ];

  return (
    <section className="px-6 py-12 bg-gray-50 dark:bg-gray-800 min-h-[70vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Upcoming Features
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