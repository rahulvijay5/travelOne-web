"use client"
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';
import AnimatedSection from './AnimatedSection';
import Link from 'next/link';

const ContactCTA = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contactRef, { threshold: 0.1 });
  
  return (
    <section 
      ref={contactRef} 
      className="py-24 bg-gradient-to-b from-white dark:from-black to-secondary/30" 
      id="contact"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animationType="fade-in-right">
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Hotel Operations?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of hotel owners and managers who have revolutionized 
                their business with GetYourStay.in
              </p>
              
              <ul 
                className={cn(
                  "space-y-4 mb-8 transition-all duration-1000",
                  isInView ? "opacity-100" : "opacity-0 translate-y-4"
                )}
              >
                {[
                  "Start with one hotel completely free for a full year",
                  "No credit card required for your free trial",
                  "Full access to all premium features from day one",
                  "Dedicated support to help you get started"
                ].map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-center"
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <svg 
                      className="h-5 w-5 text-primary mr-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            
            <AnimatedSection animationType="fade-in-left">
              <div className="bg-white/70 dark:bg-black/10 dark:border-white/10 backdrop-blur-lg border border-white/20 shadow-lg  rounded-2xl overflow-hidden shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Sign Up for Your Free Trial</h3>
                
                <form className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      id="name"
                      className="w-full h-12 dark:bg-white/30 text-white"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      id="email"
                      className="w-full h-12 dark:bg-white/30 text-white"
                      placeholder="Your Email"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="tel"
                      id="phone"
                      className="w-full h-12 dark:bg-white/30 text-white"
                      placeholder="Phone Number"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="text"
                      id="hotel"
                      className="w-full h-12 dark:bg-white/30 text-white"
                      placeholder="Hotel Name"
                    />
                  </div>
                  
                  <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white dark:text-black text-lg button-hover"
                  >
                    Get Started Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    By signing up, you agree to our{' '}
                    <Link href="/tnc" className="text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;