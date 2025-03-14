"use client"
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Building, BarChart3, Globe, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useInView } from '@/lib/animations';
import { ModeToggle } from '@/components/ModeToggle';
import Link from 'next/link';
import { appUrl } from '@/lib/constants';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { threshold: 0.1 });
  
  return (
    <div ref={heroRef} className="relative pt-20 overflow-hidden animated-gradient">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070')] bg-cover bg-center opacity-[0.03]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6">
            {/* Tiny indicator */}
            <div 
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-6 transition-all duration-700 ",
                isInView ? "opacity-100" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "100ms" }}
            >
              <span className="flex h-2 w-2 rounded-full animate-pulse bg-emerald-500 mr-2"></span>
              Introducing <Link href={appUrl} className='ml-1'>GetYourStay.in</Link>
            </div>
            
            {/* Main headline */}
            <h1 
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance transition-all duration-700",
                isInView ? "opacity-100" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "200ms" }}
            >
              Revolutionize Your Hotel Management
            </h1>
            
            {/* Subheadline */}
            <p 
              className={cn(
                "text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance transition-all duration-700",
                isInView ? "opacity-100" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              All-in-One Platform for Owners, Managers & Guests — Boost Direct Bookings Without OTA Middlemen
            </p>
            
            {/* CTA Buttons */}
            <div 
              className={cn(
                "flex flex-col sm:flex-row justify-center gap-4 pt-4 transition-all duration-700",
                isInView ? "opacity-100" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "400ms" }}
            >
              <Button className="bg-primary hover:bg-primary/90 dark:text-black text-lg h-12 px-6 rounded-lg button-hover">
                Get Started — Free for 1 Year
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="h-12 text-lg px-6 rounded-lg button-hover">
                Watch Demo
              </Button>
              <ModeToggle/>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div 
            className={cn(
              "mt-16 md:mt-20 relative transition-all duration-1000",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="relative mx-auto rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
                alt="Hotel management dashboard"
                width={400}
                height={400}
                className="w-full h-auto object-cover rounded-xl transform transition-transform duration-700 hover:scale-[1.02]"
                style={{ 
                  aspectRatio: '16/9',
                  filter: 'contrast(1.05) brightness(1.05)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none"></div>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 px-4">
              {[
                { icon: Building, text: "Multi-Property Management" },
                { icon: BarChart3, text: "Real-Time Analytics" },
                { icon: Globe, text: "Custom Branded Websites" },
                { icon: MessageSquare, text: "Direct Guest Engagement" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-white/70 dark:bg-black/10 dark:border-white/10 backdrop-blur-lg border border-white/20 shadow-lg flex flex-col items-center text-center p-4 rounded-lg transition-all duration-700",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <feature.icon className="h-6 w-6 text-primary mb-2" />
                  <p className="text-sm font-medium">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;