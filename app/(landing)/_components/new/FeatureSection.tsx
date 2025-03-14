"use client"
import { useRef } from 'react';

import { 
  Building, BarChart3, Globe, CreditCard, MessageSquare,
  CheckSquare, Settings, UserRound, QrCode, InfoIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useInView } from '@/lib/animations';
import FeatureCard from './FeatureCard';
import AnimatedSection from './AnimatedSection';

const FeatureSection = () => {
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featureSectionRef, { threshold: 0.1 });

  const ownerFeatures = [
    {
      title: "Multi-Property Management",
      description: "Easily add and manage several properties from a single intuitive platform.",
      icon: Building
    },
    {
      title: "Real-Time Analytics",
      description: "Access comprehensive reports on bookings, revenue, and customer behavior instantly.",
      icon: BarChart3
    },
    {
      title: "Custom Branded Websites",
      description: "Each property gets its own dedicated URL for increased visibility and direct bookings.",
      icon: Globe
    },
    {
      title: "Direct Payment Integration",
      description: "Receive payments straight to your account with no hidden commissions.",
      icon: CreditCard
    },
    {
      title: "Guest Engagement",
      description: "Direct messaging for immediate feedback and issue resolution.",
      icon: MessageSquare
    }
  ];

  const managerFeatures = [
    {
      title: "Easy Booking Management",
      description: "Approve, create, or cancel bookings swiftly with complete visibility.",
      icon: CheckSquare
    },
    {
      title: "Uniform Service Standards",
      description: "Set up standardized rates and policies to ensure consistency across properties.",
      icon: Settings
    },
    {
      title: "Direct Communication",
      description: "Get in touch with guests for immediate issue resolution and customer service.",
      icon: MessageSquare
    },
    {
      title: "Error-Free Operations",
      description: "Minimize risks of miscommunication, unauthorized charges, and billing errors.",
      icon: CheckSquare
    }
  ];

  const travelerFeatures = [
    {
      title: "Single Sign-On",
      description: "One profile for all bookings, making the process streamlined and convenient.",
      icon: UserRound
    },
    {
      title: "QR-Based Check-Ins",
      description: "Skip long queues and enjoy a smooth arrival process with digital check-in.",
      icon: QrCode
    },
    {
      title: "Direct Information Access",
      description: "View detailed hotel amenities, read genuine feedback, and book with full transparency.",
      icon: InfoIcon
    }
  ];

  return (
    <div ref={featureSectionRef} className="py-20" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Owner Features */}
        <div className="mb-32">
          <AnimatedSection className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Hotel Owners</h2>
            <p className="text-xl font-semibold mb-4 text-primary">Total Control at Your Fingertips</p>
            <p className="text-lg text-muted-foreground">
              Take charge of your hotel business with tools designed specifically for owners.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ownerFeatures.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={index}
                />
              </AnimatedSection>
            ))}
          </div>

          <div 
            className={cn(
              "mt-16 relative rounded-xl overflow-hidden shadow-xl transition-all duration-1000",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "500ms" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=2070"
              alt="Owner dashboard"
              fill
              className="w-full h-auto rounded-xl transform transition-transform duration-700 hover:scale-[1.02]"
              style={{ 
                aspectRatio: '16/9',
                filter: 'contrast(1.05) brightness(1.05)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl pointer-events-none"></div>
          </div>
        </div>

        {/* Manager Features */}
        <div className="mb-32">
          <AnimatedSection className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Managers</h2>
            <p className="text-xl font-semibold mb-4 text-primary">Streamline Your Daily Operations</p>
            <p className="text-lg text-muted-foreground">
              Simplify your day-to-day responsibilities with efficient management tools.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {managerFeatures.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={index}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Traveler Features */}
        <div>
          <AnimatedSection className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Travelers</h2>
            <p className="text-xl font-semibold mb-4 text-primary">Effortless Booking, Seamless Check-Ins</p>
            <p className="text-lg text-muted-foreground">
              Enhance the guest experience with intuitive booking and check-in processes.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelerFeatures.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={index}
                />
              </AnimatedSection>
            ))}
          </div>

          <div 
            className={cn(
              "mt-16 relative rounded-xl overflow-hidden shadow-xl transition-all duration-1000",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "500ms" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070"
              alt="Traveler check-in experience"
              fill
              className="w-full h-auto rounded-xl transform transition-transform duration-700 hover:scale-[1.02]"
              style={{ 
                aspectRatio: '16/9',
                filter: 'contrast(1.05) brightness(1.05)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;