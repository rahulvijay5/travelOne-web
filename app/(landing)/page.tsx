"use client"
import { useEffect } from 'react';
import Navbar from './_components/new/Navbar';
import AboutSection from './_components/new/AboutSection';
import FeatureSection from './_components/new/FeatureSection';
import HowItWorks from './_components/new/HowItWorks';
import Offer from './_components/new/Offer';
import Testimonials from './_components/new/Testimonials';
import FAQ from './_components/new/FAQ';
import ContactCTA from './_components/new/ContactCTA';
import Footer from './_components/new/Footer';
import Hero from './_components/new/Hero';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Smooth scroll functionality for anchor links
  useEffect(() => {
    const handleScrollToElement = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        
        const elementId = href.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };
    
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleScrollToElement);
    });
    
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleScrollToElement);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AboutSection />
      <FeatureSection />
      <HowItWorks />
      <Offer />
      <Testimonials />
      <FAQ />
      <ContactCTA />
      <Footer />
      
      {/* Back to top button */}
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white dark:text-black shadow-lg hover:bg-primary/90 transition-all duration-300 z-50 button-hover"
        aria-label="Back to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </Button>
    </div>
  );
};

export default Index;