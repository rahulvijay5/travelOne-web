
import { useEffect, useState, RefObject } from 'react';

// Hook to check if element is in viewport
export function useInView(ref: RefObject<HTMLDivElement | null>, options = { threshold: 0.1 }): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      options
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isIntersecting;
}

// Calculate delay for staggered animations
export function getStaggerDelay(index: number, baseDelay: number = 0.1): string {
  return `${baseDelay * index}s`;
}

// Animation class names
export function getAnimationClass(type: 'fade-in' | 'fade-in-right' | 'fade-in-left' | 'float' | 'pulse-soft'): string {
  const animationMap = {
    'fade-in': 'opacity-0 animate-fade-in',
    'fade-in-right': 'opacity-0 animate-fade-in-right',
    'fade-in-left': 'opacity-0 animate-fade-in-left',
    'float': 'animate-float',
    'pulse-soft': 'animate-pulse-soft',
  };
  
  return animationMap[type];
}
