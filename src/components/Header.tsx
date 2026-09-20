import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck, 
  HelpCircle,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenFeedback: () => void;
  currentSection?: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenFeedback }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Modelos de Currículo', id: 'modelos' },
    { label: 'Editor Online', id: 'editor' },
    { label: 'Verificador ATS', id: 'simulador-ats' },
    { label: 'Guias & Artigos', id: 'artigos' },
    { label: 'Sobre Nós', id: 'sobre-nos' },
    { label: 'Contato', id: 'contato' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-200 shadow-xs">
      {/* Top trust bar - fully responsive on mobile */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium truncate">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">100% Gratuito & Seguro</span>
            <span className="text-slate-500 hidden md:inline">• Sem Cadastro (LGPD)</span>
            <span className="text-slate-500 hidden lg:inline">• Compatível com ATS</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-slate-300 shrink-0 text-[11px] sm:text-xs font-medium">
            <button 
              onClick={() => onNavigate('sobre-nos')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sobre Nós
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => onNavigate('contato')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contato
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button 
              onClick={onOpenFeedback}
              className="hover:text-white transition-colors cursor-pointer hidden sm:inline"
            >
              Sugerir Modelo
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo with BCG Abbreviation and Full SEO Name */}
          <div 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0"
          >
            {/* BCG Badge Icon */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white font-black tracking-tight text-sm sm:text-lg shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
              BCG
            </div>
            
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl text-slate-900 tracking-tight leading-none truncate">
                  Baixe Currículo Grátis
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider hidden md:inline-block shrink-0">
                  OFICIAL
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium tracking-normal mt-0.5 truncate hidden sm:block">
                Modelos Profissionais, Editáveis & ATS Friendly
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-normal sm:hidden truncate">
                Modelos Editáveis & ATS
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Primary CTA */}
            <button
              onClick={() => onNavigate('editor')}
              className="flex items-center gap-1.5 sm:gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200 shrink-0" />
              <span className="hidden xs:inline">Criar no Editor</span>
              <span className="xs:hidden">Editor</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="text-slate-400">→</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenFeedback();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-slate-800 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Sugerir novo modelo ou feedback
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
