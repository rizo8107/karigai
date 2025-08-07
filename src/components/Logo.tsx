import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light';
}

export function Logo({ className, variant = 'default' }: LogoProps) {
  // Use direct paths to the logo files in the public directory
  const logoUrl = variant === 'light' 
    ? '/karigai-logo-white.webp'
    : '/karigai-logo.webp';

  const [error, setError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(true);

  // Fallback handling if the logo fails to load
  const handleError = () => {
    console.error('Logo failed to load:', logoUrl);
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