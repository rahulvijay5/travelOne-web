
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  index?: number;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
  iconClassName,
  index = 0,
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white/70 h-full dark:bg-black/10 dark:border-white/10 backdrop-blur-lg border border-white/20 shadow-lg  rounded-xl p-6 transition-all duration-300 hover:shadow-xl",
        className
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        transform: 'translateY(0)' 
      }}
    >
      <div className={cn(
        "w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-primary/10",
        iconClassName
      )}>
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;