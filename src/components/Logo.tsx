import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light';
}

export function Logo({ className, variant = 'default' }: LogoProps) {
  // Use local logo files instead of PocketBase URLs
  const logoUrl = variant === 'light' 
    ? '/karigai-logo-white.svg'
    : '/karigai-logo.svg';

  // Set loaded to true by default since we're using local files
  const [error, setError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(true);

  // Fallback handling if the local file fails to load
  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  if (error) {
    return <Loader2 className={cn("h-6 w-6 animate-spin", variant === 'light' ? "text-white" : "", className)} />;
  }

  return (
    <div className={cn("relative", className)}>
      <img 
        src={logoUrl} 
        alt="Karigai Logo" 
        className={cn("h-8 w-auto", "opacity-100", "transition-opacity")}
        loading="eager"
        onError={handleError}
      />
    </div>
  );
} 