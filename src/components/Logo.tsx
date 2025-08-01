import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light';
}

export function Logo({ className, variant = 'default' }: LogoProps) {
  // Get logo path from environment variable or use default
  const logoPath = import.meta.env.VITE_LOGO_PATH || '/karigai-logo.webp';
  
  // Use environment-specific logo files
  const logoUrl = variant === 'light' 
    ? logoPath.replace('.webp', '-white.webp').replace('.svg', '-white.svg')
    : logoPath;

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