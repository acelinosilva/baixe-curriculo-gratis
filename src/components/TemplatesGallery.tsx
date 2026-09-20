import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Sparkles, 
  FileText, 
  Check, 
  Eye, 
  CheckCircle2, 
  Filter, 
  SlidersHorizontal,
  X,
  Star
} from 'lucide-react';
import { TemplateCardInfo, TemplateStyle } from '../types';
import { templatesCatalog } from '../data/templatesCatalog';

interface TemplatesGalleryProps {
  searchQuery: string;
  selectedCategoryFilter: string;
  onSelectCategoryFilter: (filter: string) => void;
  onUseTemplateInEditor: (style: TemplateStyle, templateTitle: string) => void;
  onInstantDownloadTemplate: (template: TemplateCardInfo, format: 'pdf' | 'word') => void;
}

export const TemplatesGallery: React.FC<TemplatesGalleryProps> = ({
  searchQuery,
  selectedCategoryFilter,
  onSelectCategoryFilter,
  onUseTemplateInEditor,
  onInstantDownloadTemplate
}) => {
  const [selectedStyleFilter, setSelectedStyleFilter] = useState<string>('todos');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateCardInfo | null>(null);

  const styleFilterOptions = [
    { id: 'todos', label: 'Todos os Estilos' },
    { id: 'classico', label: 'Clássico / Simples' },
    { id: 'moderno', label: 'Moderno' },
    { id: 'criativo', label: 'Criativo' },
    { id: 'minimalista', label: 'Minimalista' },
    { id: 'profissional', label: 'Profissional' },
  ];

  const categoryFilterOptions = [
    { id: 'todos', label: 'Todas as Áreas' },
    { id: 'primeiro-emprego', label: 'Primeiro Emprego' },
    { id: 'ti', label: 'Tecnologia / TI' },
    { id: 'administrativo', label: 'Administrativo' },
    { id: 'saude', label: 'Saúde & Enfermagem' },
    { id: 'vendas', label: 'Vendas & Comercial' },
    { id: 'word', label: 'Compatível Word' },
  ];

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templatesCatalog.filter((item) => {
      // Search query matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch = 
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.idealFor.toLowerCase().includes(q) ||
          item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Style filter
      if (selectedStyleFilter !== 'todos' && item.style !== selectedStyleFilter) {
        return false;
      }

      // Category filter
      if (selectedCategoryFilter !== 'todos') {
        if (selectedCategoryFilter === 'word') {
          return item.format.toLowerCase().includes('word');
        }
        if (selectedCategoryFilter === 'primeiro-emprego') {
          return item.level === 'primeiro-emprego' || item.slug.includes('primeiro') || item.slug.includes('sem-experiencia');
        }
        if (selectedCategoryFilter === 'lideranca') {
          return item.level === 'lideranca';
        }
        if (selectedCategoryFilter === 'simples') {
          return item.style === 'classico' || item.slug.includes('simples');
        }
        return item.category === selectedCategoryFilter;
      }

      return true;
    });
  }, [searchQuery, selectedStyleFilter, selectedCategoryFilter]);

  return (
    <section id="modelos" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md mb-2 uppercase tracking-wide">
              Catálogo Oficial BCG
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Modelos de Currículo Prontos para Preencher e Baixar
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Modelos estruturados conforme padrões de RH e compatíveis com leitores automáticos (ATS). 
              Edite diretamente online ou baixe o arquivo em Word e PDF.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs shrink-0">
            Mostrando <span className="font-bold text-slate-800">{filteredTemplates.length}</span> de <span className="font-bold text-slate-800">{templatesCatalog.length}</span> modelos
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs mb-8 space-y-3">
          {/* Style Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Estilo Visual:
            </span>
            {styleFilterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedStyleFilter(opt.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedStyleFilter === opt.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Area / Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" />
              Área ou Perfil:
            </span>
            {categoryFilterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onSelectCategoryFilter(opt.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedCategoryFilter === opt.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}

            {(selectedStyleFilter !== 'todos' || selectedCategoryFilter !== 'todos' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedStyleFilter('todos');
                  onSelectCategoryFilter('todos');
                }}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 ml-auto flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Limpar Filtros
              </button>
            )}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum modelo encontrado</h3>
            <p className="text-sm text-slate-500 mt-1">
              Tente buscar por termos mais genéricos como "simples", "word" ou clique em limpar filtros.
            </p>
            <button
              onClick={() => {
                setSelectedStyleFilter('todos');
                onSelectCategoryFilter('todos');
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold cursor-pointer"
            >
              Ver todos os modelos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
              >
                {/* Visual Thumbnail Card Simulation */}
                <div 
                  onClick={() => setPreviewTemplate(template)}
                  className="relative h-56 bg-slate-100 border-b border-slate-100 p-4 flex items-center justify-center cursor-pointer overflow-hidden group-hover:bg-slate-200/60 transition-colors"
                >
                  {/* Floating badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                    <span className="bg-white/95 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {template.atsScore}% ATS
                    </span>
                    {template.popular && (
                      <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-current" />
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-slate-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {template.format}
                    </span>
                  </div>

                  {/* Realistic Miniature A4 preview rendering */}
                  <div className="w-36 h-48 bg-white rounded-sm shadow-md border border-slate-200 p-2.5 flex flex-col justify-between transform group-hover:scale-105 transition-transform duration-200">
                    <div>
                      {/* Simulated Header */}
                      <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b" style={{ borderColor: template.thumbnailColor }}>
                        {template.style === 'criativo' && (
                          <div className="w-4 h-4 rounded-full bg-slate-200 shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="h-1.5 w-16 bg-slate-800 rounded-xs mb-0.5" />
                          <div className="h-1 w-10 bg-slate-400 rounded-xs" />
                        </div>
                      </div>

                      {/* Simulated Sections */}
                      <div className="space-y-2 mt-2">
                        <div>
                          <div className="h-1 w-8 rounded-xs mb-1" style={{ backgroundColor: template.thumbnailColor }} />
                          <div className="h-1 w-full bg-slate-200 rounded-xs mb-0.5" />
                          <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
                        </div>

                        <div>
                          <div className="h-1 w-10 rounded-xs mb-1" style={{ backgroundColor: template.thumbnailColor }} />
                          <div className="h-1 w-full bg-slate-200 rounded-xs mb-0.5" />
                          <div className="h-1 w-3/4 bg-slate-200 rounded-xs" />
                        </div>

                        <div className="flex gap-1 pt-1">
                          <div className="h-1.5 w-6 bg-slate-200 rounded-xs" />
                          <div className="h-1.5 w-6 bg-slate-200 rounded-xs" />
                          <div className="h-1.5 w-6 bg-slate-200 rounded-xs" />
                        </div>
                      </div>
                    </div>

                    <div className="text-[8px] text-slate-400 text-right font-mono border-t pt-1 border-slate-100">
                      A4 • 1 pág
                    </div>
                  </div>

                  {/* Hover Overlay preview button */}
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      Visualizar Detalhes
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-1 mb-2">
                      {template.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                      {template.seo?.searchVolumeEstimate && (
                        <span className="text-[9.5px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                          {template.seo.searchVolumeEstimate.split('•')[0].trim()}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {template.subtitle}
                    </p>

                    <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600">
                      <strong className="text-slate-800">Ideal para:</strong> {template.idealFor}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onUseTemplateInEditor(template.style, template.title)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                      Personalizar Online
                    </button>

                    <button
                      onClick={() => setPreviewTemplate(template)}
                      title="Visualizar e Baixar"
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Template Detail Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                  Estilo {previewTemplate.style}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {previewTemplate.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{previewTemplate.subtitle}</p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-4 text-sm text-slate-600">
              <p>{previewTemplate.description}</p>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                <div>
                  <strong className="text-slate-800">Público Recomendado:</strong> {previewTemplate.idealFor}
                </div>
                <div>
                  <strong className="text-slate-800">Compatibilidade ATS:</strong> {previewTemplate.atsScore}% (Aprovado para Gupy, Kenoby e triagem automática).
                </div>
                <div>
                  <strong className="text-slate-800">Formatos de Saída:</strong> PDF de Alta Resolução e Word (.doc) editável.
                </div>
              </div>

              {/* Otimização de SEO & Palavras-Chave */}
              {previewTemplate.seo && (
                <div className="bg-emerald-50/60 border border-emerald-200/80 p-3.5 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Otimização SEO & Palavras-Chave de Busca
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {previewTemplate.seo.searchVolumeEstimate}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-700">
                    <div>
                      <span className="font-semibold text-slate-900">Meta-Título: </span>
                      <span className="font-mono text-[11px] text-emerald-900">{previewTemplate.seo.metaTitle}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">Meta-Descrição: </span>
                      <span className="text-[11.5px] text-slate-600">{previewTemplate.seo.metaDescription}</span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-emerald-200/50">
                    <span className="font-semibold text-slate-900 block mb-1">Palavras-Chave Indexadas:</span>
                    <div className="flex flex-wrap gap-1">
                      {previewTemplate.seo.keywords.map((kw, i) => (
                        <span key={i} className="text-[10.5px] bg-white border border-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-bold text-slate-700">Tags do Modelo:</span>
                <div className="flex flex-wrap gap-1">
                  {previewTemplate.tags.map((t, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  onInstantDownloadTemplate(previewTemplate, 'word');
                  setPreviewTemplate(null);
                }}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4 text-slate-500" />
                Baixar Modelo Word (.doc)
              </button>

              <button
                onClick={() => {
                  onUseTemplateInEditor(previewTemplate.style, previewTemplate.title);
                  setPreviewTemplate(null);
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                Abrir e Personalizar no Editor Online
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
