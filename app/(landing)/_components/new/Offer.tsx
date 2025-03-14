"use client"
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import AnimatedSection from './AnimatedSection';

const Offer = () => {
  const offerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(offerRef, { threshold: 0.1 });
  
  const benefits = [
    "One year free for your first hotel",
    "Pro Plan for 4 months on your next two properties",
    "No commission fees on bookings, unlike OTAs",
    "Unlimited users and technical support",
    "Data migration assistance at no extra cost"
  ];

  return (
    <section 
      ref={offerRef} 
      className="py-24 relative overflow-hidden" 
      id="offer"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <AnimatedSection animationType="fade-in-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Unlock Exclusive Benefits</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join GetYourStay.in today and enjoy our special introductory offers designed to 
                maximize your return on investment and help your properties thrive.
              </p>
              
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li 
                    key={index} 
                    className={cn(
                      "flex items-start transition-all duration-500",
                      isInView 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 translate-x-4"
                    )}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white dark:text-black h-12 px-6 text-lg rounded-lg button-hover"
                >
                  Claim Your Free Trial Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animationType="fade-in-left" className="lg:pl-8">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-0"></div>
                <div className="relative z-10 bg-white/70 dark:bg-black/10 dark:border-white/10 backdrop-blur-lg border border-white/20 shadow-lg  p-8 md:p-10">
                  <div className="dark:bg-black bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-8">
                    <h3 className="text-2xl font-bold text-center text-foreground mb-2">
                      Special Launch Offer
                    </h3>
                    <div className="text-center text-muted-foreground">
                      Limited time opportunity
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div 
                      className={cn(
                        "dark:bg-black bg-white/60 backdrop-blur-sm rounded-xl p-6 transition-all duration-500",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      )}
                      style={{ transitionDelay: "300ms" }}
                    >
                      <h4 className="text-xl font-semibold mb-2">Cost-Efficiency</h4>
                      <p className="text-muted-foreground">
                        Subscription-based payments that dramatically cut costs versus traditional 
                        OTA commissions, saving you up to 25% per booking.
                      </p>
                    </div>
                    
                    <div 
                      className={cn(
                        "dark:bg-black bg-white/60 backdrop-blur-sm rounded-xl p-6 transition-all duration-500",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      )}
                      style={{ transitionDelay: "400ms" }}
                    >
                      <h4 className="text-xl font-semibold mb-2">Scalability</h4>
                      <p className="text-muted-foreground">
                        From boutique inns to multi-property chains, GetYourStay.in grows with your 
                        business, with flexible plans for properties of all sizes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Offer;