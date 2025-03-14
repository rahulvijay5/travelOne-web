"use client"
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSection from './AnimatedSection';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How does multi-property management work?",
      answer: "Our platform provides a unified dashboard where you can seamlessly manage multiple properties. Add unlimited properties, customize each one's details, rates, and policies, and monitor all bookings from a single interface. Each property gets its own dedicated website while still being connected to your central management system."
    },
    {
      question: "What kind of analytics can I expect?",
      answer: "GetYourStay.in offers comprehensive analytics including booking trends, occupancy rates, revenue forecasts, customer demographics, and feedback metrics. You'll get visual charts and exportable data to track performance across daily, weekly, monthly, or custom time periods. These insights help you make data-driven decisions to optimize pricing and marketing strategies."
    },
    {
      question: "How secure is the payment process?",
      answer: "We use bank-grade encryption and comply with PCI-DSS standards to ensure all transactions are secure. Our system integrates with trusted payment gateways, allowing direct deposits to your bank account. We don't hold your funds, and you receive real-time notifications for all transactions, ensuring complete transparency and security."
    },
    {
      question: "What support is available after onboarding?",
      answer: "We provide 24/7 customer support via chat, email, and phone. Our team offers comprehensive onboarding, including personalized training sessions for you and your staff. We also provide regular system updates, a detailed knowledge base, and ongoing technical assistance to ensure you're getting the most from our platform."
    },
    {
      question: "Can I customize the booking website for my brand?",
      answer: "Absolutely! You'll get a fully customizable website that reflects your brand identity. You can personalize colors, logos, fonts, and layout. We also support custom domain integration, allowing you to use your own domain name for a seamless brand experience. Our team can assist with the customization process if needed."
    },
    {
      question: "How long does it take to implement the system?",
      answer: "Most hotels are up and running within 48-72 hours of signing up. The basic setup with your branding and property details can be completed in just a few hours. For more complex setups with multiple properties or custom integrations, our team works closely with you to ensure a smooth implementation process, typically completed within one week."
    }
  ];
  
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Have Questions? We&apos;ve Got Answers</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to commonly asked questions about GetYourStay.in
          </p>
        </AnimatedSection>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AnimatedSection 
              key={index}
              delay={index * 100}
              className="mb-4"
            >
              <div className="border rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full text-left p-6 focus:outline-none"
                  onClick={() => handleToggle(index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span className={cn(
                    "flex items-center justify-center rounded-full p-1 transition-all duration-300",
                    openIndex === index ? "bg-primary/10 rotate-180" : "bg-secondary"
                  )}>
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-primary" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </span>
                </button>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openIndex === index ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="p-6 pt-0 text-muted-foreground">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;