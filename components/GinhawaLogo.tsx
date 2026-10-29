'use client';

import React from 'react';

interface GinhawaLogoProps {
  variant?: 'gold-crimson' | 'gold-dark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export function GinhawaLogo({
  variant = 'gold-crimson',
  size = 'md',
  showSubtitle = true,
}: GinhawaLogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl sm:text-4xl',
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Golden Lotus / Cupped Hands Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(234,179,8,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle gold aura */}
          <circle cx="50" cy="50" r="46" fill="url(#goldGradientBg)" fillOpacity="0.12" stroke="url(#goldGradientStroke)" strokeWidth="1.5" />
          
          {/* Left cupped healing hand */}
          <path
            d="M 28 64 C 24 55 24 45 32 38 C 36 34 42 34 44 38 C 45 42 41 46 38 48 C 34 52 35 60 42 66 C 36 67 30 66 28 64 Z"
            fill="url(#goldGradient)"
          />
          {/* Right cupped healing hand */}
          <path
            d="M 72 64 C 76 55 76 45 68 38 C 64 34 58 34 56 38 C 55 42 59 46 62 48 C 66 52 65 60 58 66 C 64 67 70 66 72 64 Z"
            fill="url(#goldGradient)"
          />

          {/* Center flame / healing droplet */}
          <path
            d="M 50 24 C 50 24 40 38 40 46 C 40 52 44.5 56 50 56 C 55.5 56 60 52 60 46 C 60 38 50 24 50 24 Z"
            fill="url(#crimsonGradient)"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
          />

          {/* Inner golden kernel */}
          <ellipse cx="50" cy="46" rx="4" ry="6" fill="url(#goldGradient)" />

          {/* Gentle leaf base curve */}
          <path
            d="M 32 70 C 42 76 58 76 68 70 C 62 73 38 73 32 70 Z"
            fill="url(#goldGradient)"
          />

          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="45%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="goldGradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#A16207" />
            </linearGradient>
            <linearGradient id="goldGradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#713F12" />
            </linearGradient>
            <linearGradient id="crimsonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif font-black tracking-wider uppercase ${textSizes[size]} ${
            variant === 'gold-crimson'
              ? 'text-[#8A1111] drop-shadow-sm'
              : variant === 'gold-dark'
              ? 'bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent'
              : 'text-white'
          }`}
          style={{ letterSpacing: '0.08em' }}
        >
          GINHAWA
        </span>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 justify-center mt-0.5">
            <span className="h-[1px] w-3 bg-amber-500/70" />
            <span
              className={`text-[9px] font-sans font-bold tracking-[0.25em] uppercase ${
                variant === 'gold-crimson' ? 'text-[#8A1111]' : 'text-amber-400'
              }`}
            >
              APP
            </span>
            <span className="h-[1px] w-3 bg-amber-500/70" />
          </div>
        )}
      </div>
    </div>
  );
}
