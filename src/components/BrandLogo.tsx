import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  showSubtitle?: boolean;
  showBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  theme = 'light',
  showSubtitle = true,
  showBadge = true,
  className = '',
  onClick,
}) => {
  // Dimensions & scaling based on size
  const iconSizes = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 sm:w-11 sm:h-11 rounded-2xl',
    lg: 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl'
  };

  const titleSizes = {
    sm: 'text-sm font-extrabold',
    md: 'text-base sm:text-xl font-extrabold',
    lg: 'text-xl sm:text-2xl font-extrabold'
  };

  const isDark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Dynamic Vector Icon / Insignia */}
      <div 
        className={`${iconSizes[size]} relative shrink-0 shadow-md transition-transform duration-200 group-hover:scale-105 flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-800 border border-white/20`}
      >
        {/* Subtle Ambient Light Flare */}
        <div className="absolute top-0 left-0 w-8 h-8 bg-white/20 rounded-full blur-xs pointer-events-none -translate-x-2 -translate-y-2" />

        {/* SVG Resume Sheet Glyph */}
        <svg 
          viewBox="0 0 44 48" 
          className="w-[62%] h-[62%] drop-shadow-sm" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Paper with Folded Corner */}
          <path 
            d="M 4 2 
               L 26 2 
               L 38 14 
               L 38 42 
               A 4 4 0 0 1 34 46 
               L 4 46 
               A 4 4 0 0 1 0 42 
               L 0 6 
               A 4 4 0 0 1 4 2 Z" 
            fill="#FFFFFF" 
          />

          {/* Folded Corner flap */}
          <path 
            d="M 26 2 
               L 26 10 
               A 4 4 0 0 0 30 14 
               L 38 14 Z" 
            fill="#CBD5E1" 
          />

          {/* Micro Header Badge */}
          <rect x="6" y="8" width="8" height="8" rx="2" fill="#059669" />
          <rect x="16" y="9" width="10" height="3" rx="1.5" fill="#0F172A" />
          <rect x="16" y="13" width="7" height="2" rx="1" fill="#10B981" />

          {/* Divider */}
          <line x1="6" y1="20" x2="32" y2="20" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />

          {/* Resume Lines */}
          <rect x="6" y="24" width="12" height="2.5" rx="1.2" fill="#059669" />
          <rect x="6" y="29" width="26" height="2" rx="1" fill="#64748B" />
          <rect x="6" y="33" width="20" height="2" rx="1" fill="#94A3B8" />

          {/* ATS Verification Star / Dot */}
          <circle cx="30" cy="38" r="5" fill="#10B981" />
          <path d="M 28 38 L 29.5 39.5 L 32.5 36.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Outer Ring Glow */}
        <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20 pointer-events-none" />
      </div>

      {/* Wordmark Typography */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 leading-none">
          <span 
            className={`${titleSizes[size]} tracking-tight truncate ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Baixe Currículo <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Grátis</span>
          </span>

          {showBadge && (
            <span 
              className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider hidden md:inline-flex items-center gap-1 shrink-0 ${
                isDark 
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80' 
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              OFICIAL
            </span>
          )}
        </div>

        {showSubtitle && (
          <div className="mt-1 flex items-center gap-1.5">
            <span 
              className={`text-[11px] font-medium tracking-normal truncate ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Modelos Profissionais • 100% Editáveis & ATS
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
