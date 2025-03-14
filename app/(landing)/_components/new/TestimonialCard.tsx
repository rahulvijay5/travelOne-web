
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  image?: string;
  className?: string;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  company,
  image,
  className,
}: TestimonialCardProps) => {
  return (
    <div className={cn(
      "bg-white/70 dark:bg-black/10 dark:border-white/10 backdrop-blur-lg border border-white/20 shadow-lg  rounded-xl p-8 transition-all duration-300 hover:shadow-xl h-full flex flex-col",
      className
    )}>
      <svg className="h-8 w-8 text-primary/40 mb-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      
      <p className="text-lg italic mb-6 flex-grow">{quote}</p>
      
      <div className="flex items-center mt-auto">
        {image && (
          <div className="mr-4">
            <Image 
              src={image} 
              alt={author} 
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">
            {role}{company ? `, ${company}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;