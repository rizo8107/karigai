import React, { useEffect, useRef } from 'react';

interface OfferBannerProps {
  title: string;
  description?: string;
  imageUrl?: string;
  active: boolean;
  minValue?: number | null;
  currentAmount: number;
  onActivated?: () => void;
}

// Lightweight confetti burst without external deps
function useConfettiBurst(trigger: boolean) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!trigger || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'];
    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * W,
      y: -10 - Math.random() * 40,
      r: 3 + Math.random() * 4,
      vx: -1 + Math.random() * 2,
      vy: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 60 + Math.random() * 40,
    }));

    let frame = 0;
    let raf = 0 as unknown as number;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.life -= 1;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      if (frame < 120) {
        raf = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [trigger]);

  return canvasRef;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({
  title,
  description,
  imageUrl,
  active,
  minValue,
  currentAmount,
  onActivated,
}) => {
  // Trigger confetti once when active becomes true
  const [confettiOn, setConfettiOn] = React.useState(false);
  const prevActive = useRef<boolean>(false);

  useEffect(() => {
    if (active && !prevActive.current) {
      setConfettiOn(true);
      onActivated?.();
      const t = setTimeout(() => setConfettiOn(false), 1800);
      return () => clearTimeout(t);
    }
    prevActive.current = active;
  }, [active, onActivated]);

  const canvasRef = useConfettiBurst(confettiOn);

  const dullClasses = 'bg-gray-100 border border-gray-200 text-gray-700';
  const activeClasses = 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white ring-1 ring-indigo-300';

  return (
    <div className={`relative overflow-hidden rounded-xl mb-8 ${active ? activeClasses : dullClasses}`}>
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className={`pointer-events-none absolute inset-0 ${confettiOn ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 200ms ease' }}
      />

      <div className={`p-5 md:p-8 flex items-center gap-6`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className={`w-24 h-24 md:w-28 md:h-28 rounded object-cover flex-shrink-0 ${active ? '' : 'grayscale'} bg-white/20`}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : null}

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className={`inline-block px-2.5 py-1 rounded-full text-sm font-medium ${active ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
              SPECIAL OFFER
            </span>
            {typeof minValue === 'number' && minValue > 0 && (
              <span className={`text-sm ${active ? 'text-white/90' : 'text-gray-600'}`}>
                {active ? 'Eligible now' : `Add ₹${Math.max(0, (minValue || 0) - currentAmount).toFixed(2)} more to unlock`}
              </span>
            )}
          </div>
          <h3 className={`font-bold text-xl md:text-2xl mt-2 ${active ? '' : 'text-gray-800'}`}>{title}</h3>
          {description && (
            <p className={`text-base mt-2 ${active ? 'text-white/90' : 'text-gray-600'}`}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
