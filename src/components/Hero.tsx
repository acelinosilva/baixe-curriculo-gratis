import React from 'react';
import { 
  Download, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  Zap, 
  Award,
  Users
} from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (sectionId: string) => void;
  onSelectCategoryFilter: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onNavigate,
  onSelectCategoryFilter
}) => {
  const quickTags = [
    { label: 'Currículo Simples', filter: 'simples' },
    { label: 'Primeiro Emprego', filter: 'primeiro-emprego' },
    { label: 'Modelo Word (.doc)', filter: 'word' },
    { label: 'Tecnologia / TI', filter: 'ti' },
    { label: 'Administrativo', filter: 'administrativo' },
    { label: 'Enfermagem & Saúde', filter: 'saude' },
    { label: 'Executivo & Liderança', filter: 'lideranca' },
  ];

  return (
    <section id="hero" className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-8 pb-16 border-b border-slate-200/80">
      {/* Decorative subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Atualizado Setembro 2026: Modelos 100% Gratuitos e Compatíveis com ATS</span>
          </div>
        </div>

        {/* Main Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Baixe Currículo Grátis: <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
              Modelos Profissionais e Editáveis
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Escolha um modelo pronto, personalize no <strong>editor online intuitivo</strong> ou baixe direto em Word e PDF. 
            Sem necessidade de cadastro, com privacidade total e aprovado por recrutadores.
          </p>
        </div>

        {/* Search Bar & Quick Categories */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="relative flex items-center bg-white rounded-2xl shadow-md border border-slate-200 p-1.5 focus-within:border-emerald-500 focus-within:ring-3 focus-within:ring-emerald-500/10 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar modelos: ex: 'simples', 'primeiro emprego', 'word', 'ti'..."
              className="w-full px-3 py-2.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 mr-1 cursor-pointer font-medium"
              >
                Limpar
              </button>
            )}
            <button
              onClick={() => onNavigate('modelos')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              Ver Modelos
            </button>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs font-semibold text-slate-400 mr-1">Populares:</span>
            {quickTags.map((tag) => (
              <button
                key={tag.filter}
                onClick={() => {
                  onSelectCategoryFilter(tag.filter);
                  onNavigate('modelos');
                }}
                className="text-xs font-medium bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200/90 hover:border-emerald-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
          <button
            onClick={() => onNavigate('editor')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <span>Abrir Editor Online (3 Passos)</span>
          </button>

          <button
            onClick={() => onNavigate('modelos')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-6 py-3.5 rounded-xl font-semibold text-base shadow-xs hover:border-slate-400 transition-all cursor-pointer"
          >
            <Download className="w-5 h-5 text-slate-600" />
            <span>Explorar Galeria de Modelos</span>
          </button>
        </div>

        {/* 4 Trust Value Badges (Strict LGPD, ATS, Rapid, Zero Cost) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-10 border-t border-slate-200/80 max-w-5xl mx-auto">
          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-xs">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">Sem Cadastro & LGPD</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Seus dados nunca saem do seu navegador.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-xs">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">100% Aprovado em ATS</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Lido perfeitamente por Gupy e Kenoby.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-xs">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">Download Instantâneo</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Baixe em PDF de alta resolução e Word .doc.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-xs">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">Dicas de Entrevista</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Método STAR e respostas para perguntas chave.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
