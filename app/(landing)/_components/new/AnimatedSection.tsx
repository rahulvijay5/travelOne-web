"use client"
import { ReactNode, useRef } from 'react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade-in' | 'fade-in-right' | 'fade-in-left';
  delay?: number;
  id?: string;
}

const AnimatedSection = ({
  children,
  className,
  animationType = 'fade-in',
  delay = 0,
  id,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref);

  const animationMap = {
    'fade-in': 'opacity-0 translate-y-8',
    'fade-in-right': 'opacity-0 -translate-x-8',
    'fade-in-left': 'opacity-0 translate-x-8',
  };

  return (
    <div
      id={id}
      ref={ref}
      className={cn(
        isInView
          ? `transform transition-all duration-1000 ease-out opacity-100 translate-x-0 translate-y-0`
          : animationMap[animationType],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;