import React, { useState } from 'react';
import { 
  Clock, 
  ArrowRight, 
  ExternalLink,
  BookOpen,
  Search,
  Tag
} from 'lucide-react';
import { supportArticles } from '../data/supportArticles';

interface ArticlesSectionProps {
  onOpenArticle: (slug: string) => void;
  onSelectTemplateBySlug: (slug: string) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ 
  onOpenArticle 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [articleSearch, setArticleSearch] = useState<string>('');

  // Extract unique categories
  const categories = ['Todos', ...Array.from(new Set(supportArticles.map(a => a.category)))];

  // Filtered articles
  const filteredArticles = supportArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    const query = articleSearch.toLowerCase().trim();
    const matchesSearch = !query || 
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      (article.keywords && article.keywords.some(k => k.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="artigos" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md mb-2 uppercase tracking-wide">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              Guias & Dicas de Carreira
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Artigos e Dicas Especializadas para o Seu Currículo
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Conteúdo aprofundado escrito por especialistas em Recursos Humanos para transformar seu perfil profissional, passar nos robôs ATS e garantir sua vaga.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full lg:w-72">
            <div className="relative">
              <input
                type="text"
                value={articleSearch}
                onChange={(e) => setArticleSearch(e.target.value)}
                placeholder="Buscar guias e dicas..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {articleSearch && (
                <button
                  onClick={() => setArticleSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Tag className="w-3.5 h-3.5" />
            Filtrar:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Articles Grid - Semantic links for 100% SEO indexing and new page navigation */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const articlePath = `/artigos/${article.slug}`;

              return (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between p-6 group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                      <a
                        href={articlePath}
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey) {
                            e.preventDefault();
                            onOpenArticle(article.slug);
                          }
                        }}
                        className="hover:underline focus:outline-hidden"
                      >
                        {article.title}
                      </a>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={articlePath}
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey) {
                          e.preventDefault();
                          onOpenArticle(article.slug);
                        }
                      }}
                      className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Ler página completa</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Secondary anchor for explicit new tab opening */}
                    <a
                      href={articlePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1 p-1 hover:bg-slate-50 rounded transition-colors"
                      title="Abrir artigo em uma nova aba"
                    >
                      <span>Nova aba</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <p className="text-sm font-bold text-slate-700 mb-1">Nenhum artigo encontrado</p>
            <p className="text-xs text-slate-500 mb-4">Tente buscar por outros termos ou selecione "Todos".</p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setArticleSearch('');
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 cursor-pointer"
            >
              Limpar Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
