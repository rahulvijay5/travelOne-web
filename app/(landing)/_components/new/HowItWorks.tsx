"use client"
import { useRef } from 'react';

import { useInView } from '@/lib/animations';
import { Globe, MousePointer, Bell, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSection from './AnimatedSection';

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const steps = [
    {
      icon: Globe,
      title: "Custom Website & App",
      description: "Your hotel gets its dedicated online space with personalized branding and features.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MousePointer,
      title: "Traveler Books Directly",
      description: "Whether via website or QR code, booking is fast, secure, and commission-free.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Bell,
      title: "Real-Time Confirmation",
      description: "Instant notifications and streamlined check-ins create a seamless experience.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: BarChart3,
      title: "Manage & Analyze",
      description: "All details recorded in one place for effortless management and data-driven decisions.",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-secondary/50" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Simple, transparent, and effective — our platform streamlines the entire hotel management process.
          </p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          {/* Process steps with connecting lines */}
          <div className="relative">
            {/* Connecting line */}
            <div 
              className={cn(
                "absolute top-24 left-1/2 h-[calc(100%-6rem)] w-1 -translate-x-1/2 transition-all duration-1000 md:hidden",
                isInView ? "bg-primary/30" : "bg-transparent"
              )}
              style={{ transitionDelay: "500ms" }}
            ></div>
            
            <div 
              className={cn(
                "absolute top-1/2 left-[4.5rem] right-[4.5rem] h-1 -translate-y-1/2 transition-all duration-1000 hidden md:block",
                isInView ? "bg-primary/30" : "bg-transparent"
              )}
              style={{ transitionDelay: "500ms" }}
            ></div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "flex flex-col items-center text-center transition-all duration-700 relative z-10",
                      isInView 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: `${300 + index * 200}ms` }}
                  >
                    <div 
                      className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-500",
                        step.color
                      )}
                    >
                      <span className="relative">
                        <span className={cn(
                          "absolute inset-0 rounded-full animate-pulse-soft",
                          step.color.split(' ')[0] + "/50"
                        )}></span>
                        <Icon className="h-10 w-10 relative z-10" />
                      </span>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 bg-white/70 dark:bg-black/10 dark:border-white/10 backdrop-blur-lg border border-white/20 shadow-lg  h-full w-full">
                      <h3 className="text-xl font-semibold mb-3 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    
                    <div className="hidden md:flex absolute -bottom-8 left-1/2 -translate-x-1/2 text-lg font-bold text-primary/70">
                      {index < steps.length - 1 && "→"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;