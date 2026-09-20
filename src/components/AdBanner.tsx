import React from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle';
}

export const AdBanner: React.FC<AdBannerProps> = ({ slotId = 'default', format = 'horizontal' }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-slate-50/80 border border-dashed border-slate-300 rounded-xl p-3 text-center">
        <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
          Publicidade / Espaço Patrocinado
        </div>
        <div className="h-16 sm:h-20 bg-white/80 rounded-lg flex items-center justify-center text-xs text-slate-400 border border-slate-200/60 font-mono">
          <span>Anúncio AdSense • Formato Responsivo [728x90 / 320x100]</span>
        </div>
      </div>
    </div>
  );
};
