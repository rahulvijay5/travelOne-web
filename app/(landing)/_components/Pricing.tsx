

// components/Pricing.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for small hotels.',
      features: ['Basic booking management', 'Limited customer support'],
      price: '₹0/month',
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      description: 'Ideal for growing businesses.',
      features: ['Advanced booking management', 'Customer communication tools', 'Analytics'],
      price: '₹999/month',
      cta: 'Upgrade Now',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'Best for large hotel chains.',
      features: ['Multiple hotel management', 'Dedicated support', 'Custom integrations'],
      price: 'Contact us for pricing',
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <section className="px-6 py-12 bg-white dark:bg-gray-900 min-h-[70vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Pricing
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`border rounded-lg shadow p-6 flex flex-col ${
              plan.highlighted ? 'border-primary' : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {plan.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{plan.description}</p>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {plan.price}
            </div>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-300">
                  • {feature}
                </li>
              ))}
            </ul>
            <Button variant={plan.highlighted ? 'default' : 'outline'}>
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-green-600 dark:text-green-400">
        <p>
          For the first two hotels partnering with us, enjoy our solution completely free
          for one year!
        </p>
      </div>
    </section>
  );
}
