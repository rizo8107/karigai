import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  // Get logo path from environment variable or use default
  const logoPath = import.meta.env.VITE_LOGO_PATH || "/karigai-logo.webp";
  
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <img src={logoPath} alt="Karigai Logo" className="h-8 w-8" />
      <span className="font-bold text-xl">Karigai</span>
    </Link>
  )
}