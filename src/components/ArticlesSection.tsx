import React from 'react';
import { 
  Clock, 
  ArrowRight, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { supportArticles } from '../data/supportArticles';

interface ArticlesSectionProps {
  onOpenArticle: (slug: string) => void;
  onSelectTemplateBySlug: (slug: string) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ 
  onOpenArticle 
}) => {
  return (
    <section id="artigos" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md mb-2 uppercase tracking-wide">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              Guias & Dicas de Carreira
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Artigos e Dicas Especializadas para o Seu Currículo
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Conteúdo aprofundado escrito por especialistas em Recursos Humanos para transformar seu perfil profissional e garantir sua vaga.
            </p>
          </div>
        </div>

        {/* Articles Grid - Semantic links for 100% SEO indexing and new page navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportArticles.map((article) => {
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

      </div>
    </section>
  );
};
