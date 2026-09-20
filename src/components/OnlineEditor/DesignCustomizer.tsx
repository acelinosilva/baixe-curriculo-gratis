import React from 'react';
import { 
  Palette, 
  Type, 
  SlidersHorizontal, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Maximize2,
  Minimize2,
  Check
} from 'lucide-react';
import { ResumeData, TemplateStyle } from '../../types';

interface DesignCustomizerProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  showTemplateSelector?: boolean;
}

export const DesignCustomizer: React.FC<DesignCustomizerProps> = ({
  resumeData,
  setResumeData,
  showTemplateSelector = true
}) => {
  const templateStyles: { id: TemplateStyle; name: string; desc: string; ats: number }[] = [
    { id: 'classico', name: 'Clássico Tradicional', desc: '100% formal, ideal para setores tradicionais', ats: 99 },
    { id: 'moderno', name: 'Executivo Moderno', desc: 'Cores sutis e alta legibilidade', ats: 98 },
    { id: 'criativo', name: 'Criativo (2 Colunas)', desc: 'Coluna lateral e foto opcional', ats: 96 },
    { id: 'minimalista', name: 'Minimalista Suíço', desc: 'Espaçamento clean monocromático', ats: 100 },
    { id: 'profissional', name: 'Profissional / Gestão', desc: 'Cabeçalho nobre e conquistas', ats: 98 },
  ];

  const colorPalettes = [
    { name: 'Esmeralda BCG', hex: '#0f766e' },
    { name: 'Azul Safira', hex: '#2563eb' },
    { name: 'Azul Marinho', hex: '#1e3a8a' },
    { name: 'Ardósia / Carvão', hex: '#1e293b' },
    { name: 'Índigo Moderno', hex: '#4f46e5' },
    { name: 'Céu / Saúde', hex: '#0284c7' },
    { name: 'Vinho Bordô', hex: '#881337' },
    { name: 'Verde Floresta', hex: '#166534' },
    { name: 'Âmbar Executivo', hex: '#b45309' },
    { name: 'Grafite Nobre', hex: '#334155' },
  ];

  const fontOptions = [
    { id: 'sans', name: 'Plus Jakarta Sans', desc: 'Moderna e recomendada para telas e ATS' },
    { id: 'serif', name: 'Merriweather', desc: 'Serifada clássica e formal' },
    { id: 'mono', name: 'JetBrains / Mono', desc: 'Técnica, perfeita para desenvolvedores' },
    { id: 'display', name: 'Playfair Display', desc: 'Elegante e executiva de alto padrão' },
    { id: 'geometric', name: 'Inter Clean', desc: 'Neutra, geométrica e balanceada' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Escolha de Modelo */}
      {showTemplateSelector && (
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
            1. Modelo Base do Currículo
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {templateStyles.map((st) => (
              <div
                key={st.id}
                onClick={() => setResumeData(prev => ({ ...prev, selectedTemplate: st.id }))}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  resumeData.selectedTemplate === st.id
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">{st.name}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                    {st.ats}% ATS
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Cores Personalizadas */}
      <div className="pt-4 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-emerald-600" />
            Cor Principal do Documento
          </span>
          <span className="text-[11px] font-mono text-slate-500 lowercase">{resumeData.primaryColor}</span>
        </label>
        
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {colorPalettes.map(col => (
            <button
              key={col.hex}
              onClick={() => setResumeData(prev => ({ ...prev, primaryColor: col.hex }))}
              title={col.name}
              className={`w-7 h-7 rounded-full transition-transform cursor-pointer border-2 relative flex items-center justify-center ${
                resumeData.primaryColor.toLowerCase() === col.hex.toLowerCase()
                  ? 'scale-115 border-slate-900 shadow-xs' 
                  : 'border-white hover:scale-105'
              }`}
              style={{ backgroundColor: col.hex }}
            >
              {resumeData.primaryColor.toLowerCase() === col.hex.toLowerCase() && (
                <Check className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          ))}
          
          {/* Seletor Customizado Hex */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
            <input 
              type="color"
              value={resumeData.primaryColor}
              onChange={(e) => setResumeData(prev => ({ ...prev, primaryColor: e.target.value }))}
              title="Escolher qualquer cor personalizada"
              className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
            />
            <input 
              type="text"
              value={resumeData.primaryColor}
              onChange={(e) => setResumeData(prev => ({ ...prev, primaryColor: e.target.value }))}
              placeholder="#0f766e"
              className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-mono text-slate-700 uppercase"
            />
          </div>
        </div>
      </div>

      {/* 3. Tipografia (Família de Fonte) */}
      <div className="pt-4 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-emerald-600" />
          Família Tipográfica
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {fontOptions.map(font => (
            <button
              key={font.id}
              onClick={() => setResumeData(prev => ({ ...prev, fontFamily: font.id as any }))}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                resumeData.fontFamily === font.id
                  ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="font-semibold text-xs text-slate-900">{font.name}</div>
              <div className="text-[10.5px] text-slate-500">{font.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Tamanho da Fonte */}
      <div className="pt-4 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
          Tamanho do Texto (Escala Tipográfica)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'compact', label: 'Pequeno', sub: '11.5pt • Cabe mais texto' },
            { id: 'standard', label: 'Padrão', sub: '12.5pt • Equilibrado' },
            { id: 'large', label: 'Grande', sub: '14pt • Legibilidade alta' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setResumeData(prev => ({ ...prev, fontSize: opt.id as any }))}
              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                resumeData.fontSize === opt.id
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs">{opt.label}</div>
              <div className="text-[10px] text-slate-500 font-normal">{opt.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Alinhamentos (Cabeçalho & Texto) */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
            Alinhamento do Cabeçalho
          </label>
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            {[
              { id: 'left', label: 'Esquerda', icon: AlignLeft },
              { id: 'center', label: 'Centro', icon: AlignCenter },
              { id: 'right', label: 'Direita', icon: AlignRight }
            ].map(al => {
              const Icon = al.icon;
              return (
                <button
                  key={al.id}
                  onClick={() => setResumeData(prev => ({ ...prev, headerAlignment: al.id as any }))}
                  className={`flex-1 py-1.5 rounded-md text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    resumeData.headerAlignment === al.id
                      ? 'bg-white text-emerald-800 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{al.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
            Alinhamento dos Parágrafos
          </label>
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            {[
              { id: 'left', label: 'À Esquerda', icon: AlignLeft },
              { id: 'justify', label: 'Justificado', icon: AlignJustify }
            ].map(al => {
              const Icon = al.icon;
              return (
                <button
                  key={al.id}
                  onClick={() => setResumeData(prev => ({ ...prev, contentAlignment: al.id as any }))}
                  className={`flex-1 py-1.5 rounded-md text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    resumeData.contentAlignment === al.id
                      ? 'bg-white text-emerald-800 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{al.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. Espaçamentos, Margens & Altura de Linha */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Espaçamento entre Seções:
          </label>
          <select
            value={resumeData.spacing}
            onChange={(e) => setResumeData(prev => ({ ...prev, spacing: e.target.value as any }))}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none cursor-pointer"
          >
            <option value="compact">Compacto (Ideal p/ 1 página)</option>
            <option value="normal">Padrão Balanceado</option>
            <option value="spacious">Arejado / Espaçoso</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Margens da Folha A4:
          </label>
          <select
            value={resumeData.pageMargin}
            onChange={(e) => setResumeData(prev => ({ ...prev, pageMargin: e.target.value as any }))}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none cursor-pointer"
          >
            <option value="compact">Compacta (20mm)</option>
            <option value="normal">Padrão (28mm)</option>
            <option value="spacious">Ampla (35mm)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Entrelinhas (Line-Height):
          </label>
          <select
            value={resumeData.lineHeight}
            onChange={(e) => setResumeData(prev => ({ ...prev, lineHeight: e.target.value as any }))}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none cursor-pointer"
          >
            <option value="compact">Compacta (1.35x)</option>
            <option value="normal">Normal (1.55x)</option>
            <option value="relaxed">Confortável (1.75x)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
