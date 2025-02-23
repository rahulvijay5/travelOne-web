// components/Testimonials.tsx
import React from 'react';
import { User } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Aisha Khan',
      role: 'Traveler',
      feedback:
        'Booking my stays has never been easier. The seamless check-ins and in-app services make traveling hassle-free!',
    },
    {
      name: 'Rajesh Sharma',
      role: 'Hotel Owner',
      feedback:
        'Managing multiple hotels on one platform has transformed our operations. The customer support is exceptional!',
    },
  ];

  return (
    <section className="px-6 py-12 bg-white dark:bg-gray-900 min-h-[70vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        What Our Users Say
      </h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex items-start space-x-4">
            <User className="h-12 w-12 text-primary" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {testimonial.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 italic">&quot;{testimonial.feedback}&quot;</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}