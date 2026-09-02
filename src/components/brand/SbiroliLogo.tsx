import React from 'react';

interface SbiroliLogoProps {
  className?: string;
  variant?: 'full' | 'badge-only' | 'monochrome-white';
  height?: number | string;
}

export const SbiroliLogo: React.FC<SbiroliLogoProps> = ({
  className = '',
  variant = 'full',
  height = 54,
}) => {
  if (variant === 'monochrome-white') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <svg
          viewBox="0 0 320 140"
          style={{ height }}
          className="w-auto select-none"
          aria-label="Pastas Sbiroli Desde 1938"
        >
          <polygon
            points="160,8 308,70 160,132 12,70"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
          />
          <polygon
            points="160,18 296,70 160,122 24,70"
            fill="#FFFFFF"
          />
          <text
            x="160"
            y="65"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="900"
            fontSize="44"
            fill="#182463"
            textAnchor="middle"
            fontStyle="italic"
            letterSpacing="-0.5"
          >
            Sbiroli
          </text>
          <path
            d="M 68 85 Q 160 76 252 85 Q 160 94 68 85"
            fill="#182463"
          />
          <text
            x="160"
            y="89"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="14"
            fill="#FFFFFF"
            textAnchor="middle"
            letterSpacing="2"
          >
            PASTAS
          </text>
          <text
            x="160"
            y="112"
            fontFamily="'Playfair Display', cursive, serif"
            fontStyle="italic"
            fontWeight="600"
            fontSize="16"
            fill="#182463"
            textAnchor="middle"
          >
            Desde 1938
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 140"
        style={{ height }}
        className="w-auto drop-shadow-sm transition-transform duration-200 hover:scale-[1.02]"
        aria-label="Pastas Sbiroli Desde 1938"
      >
        <defs>
          <linearGradient id="sbiroliNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1C276F" />
            <stop offset="100%" stopColor="#182463" />
          </linearGradient>
          <linearGradient id="sbiroliRossoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8342A" />
            <stop offset="50%" stopColor="#F04238" />
            <stop offset="100%" stopColor="#CE2118" />
          </linearGradient>
          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F163D" floodOpacity="0.25" />
          </filter>
        </defs>

        <polygon
          points="160,6 312,70 160,134 8,70"
          fill="url(#sbiroliNavyGrad)"
          stroke="#FFFFFF"
          strokeWidth="3"
        />
        <polygon
          points="160,12 302,70 160,128 18,70"
          fill="url(#sbiroliRossoGrad)"
        />
        <polygon
          points="160,18 288,70 160,122 32,70"
          fill="#FFFFFF"
          stroke="#182463"
          strokeWidth="2"
        />

        <text
          x="160"
          y="62"
          fontFamily="'Playfair Display', Georgia, serif"
          fontWeight="900"
          fontSize="46"
          fill="#182463"
          textAnchor="middle"
          fontStyle="italic"
          letterSpacing="-1"
          style={{ fontFeatureSettings: '"kern" 1' }}
        >
          Sbiroli
        </text>
        <circle cx="242" cy="38" r="3.5" fill="none" stroke="#182463" strokeWidth="1" />
        <text x="242" y="40.5" fontFamily="sans-serif" fontSize="5" fontWeight="bold" fill="#182463" textAnchor="middle">R</text>

        <path
          d="M 64 72 C 110 66, 210 66, 256 72 C 248 88, 240 92, 160 90 C 80 92, 72 88, 64 72 Z"
          fill="url(#sbiroliRossoGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        <text
          x="160"
          y="84"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="800"
          fontSize="13"
          fill="#FFFFFF"
          textAnchor="middle"
          letterSpacing="2.5"
        >
          PASTAS
        </text>

        <text
          x="160"
          y="110"
          fontFamily="'Playfair Display', cursive, serif"
          fontStyle="italic"
          fontWeight="700"
          fontSize="15"
          fill="#182463"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          Desde 1938
        </text>
      </svg>
    </div>
  );
};
