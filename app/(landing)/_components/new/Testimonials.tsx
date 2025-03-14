"use client"
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import AnimatedSection from './AnimatedSection';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  
  const testimonials = [
    {
      quote: "GetYourStay.in transformed our hotel operations. We've seen a 35% increase in direct bookings and our guests love how seamless the check-in process has become.",
      author: "Priya Sharma",
      role: "Owner",
      company: "Sunset Beach Resort, Goa"
    },
    {
      quote: "As a manager of three properties, this platform has been a game-changer. I can monitor everything from a single dashboard and the analytics help me make better decisions.",
      author: "Rajiv Kumar",
      role: "Operations Manager",
      company: "City Comfort Hotels"
    },
    {
      quote: "The custom branded website has given us a professional online presence and the direct booking feature has significantly reduced our commission costs.",
      author: "Anjali Patel",
      role: "Marketing Director",
      company: "Heritage Grand Hotels"
    },
    {
      quote: "The QR check-in system has eliminated queues at our reception desk. Our guests arrive, scan, and go straight to their rooms. It's been revolutionary.",
      author: "Vikram Singh",
      role: "Front Office Manager",
      company: "Mountain View Resorts"
    },
  ];
  
  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section ref={containerRef} className="py-24 bg-secondary/50" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Owners & Managers Nationwide</h2>
          <p className="text-lg text-muted-foreground">
            See what our clients have to say about their experience with GetYourStay.in
          </p>
        </AnimatedSection>
        
        <div className="max-w-6xl mx-auto">
          {/* Desktop View - Grid */}
          <div className="hidden lg:grid grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection 
                key={index} 
                delay={index * 100}
                className="h-full"
              >
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  company={testimonial.company}
                  className="h-full"
                />
              </AnimatedSection>
            ))}
          </div>
          
          {/* Mobile View - Carousel */}
          <div className="lg:hidden">
            <div className="relative">
              <div 
                className={cn(
                  "transition-all duration-500 h-full",
                  isInView ? "opacity-100" : "opacity-0"
                )}
              >
                <TestimonialCard
                  quote={testimonials[activeIndex].quote}
                  author={testimonials[activeIndex].author}
                  role={testimonials[activeIndex].role}
                  company={testimonials[activeIndex].company}
                />
              </div>
              
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full h-10 w-10"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="rounded-full h-10 w-10"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;