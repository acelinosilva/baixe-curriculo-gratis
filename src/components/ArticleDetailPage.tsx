import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  UserCheck, 
  CheckCircle2, 
  Share2, 
  Copy, 
  Check, 
  ArrowRight, 
  FileText, 
  Download, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { SupportArticle } from '../types';
import { supportArticles } from '../data/supportArticles';
import { templatesCatalog } from '../data/templatesCatalog';

interface ArticleDetailPageProps {
  article: SupportArticle;
  onNavigateHome: () => void;
  onNavigateToArticle: (slug: string) => void;
  onUseTemplate: (slug: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onNavigateHome,
  onNavigateToArticle,
  onUseTemplate,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic SEO Injection for this specific article page
  useEffect(() => {
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute('content') || '';
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const originalKeywords = metaKeywords?.getAttribute('content') || '';
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const originalOgTitle = ogTitle?.getAttribute('content') || '';
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const originalOgDesc = ogDesc?.getAttribute('content') || '';

    // Set page-specific title and meta description
    const pageTitle = article.metaTitle || `${article.title} | Baixe Currículo Grátis`;
    document.title = pageTitle;

    if (metaDesc) {
      metaDesc.setAttribute('content', article.metaDescription || article.summary);
    }
    if (metaKeywords && article.keywords) {
      metaKeywords.setAttribute('content', article.keywords.join(', '));
    }
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }
    if (ogDesc) {
      ogDesc.setAttribute('content', article.metaDescription || article.summary);
    }

    // Embed Schema.org Article Structured Data (JSON-LD) for rich search engine indexing
    const scriptId = 'article-structured-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const currentUrl = typeof window !== 'undefined' 
      ? window.location.origin + '/artigos/' + article.slug 
      : 'https://baixecurriculogratis.vercel.app/artigos/' + article.slug;

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': article.title,
      'description': article.summary,
      'articleSection': article.category,
      'datePublished': article.datePublished || '2026-01-15',
      'dateModified': article.datePublished || '2026-03-20',
      'author': {
        '@type': 'Organization',
        'name': article.author || 'Equipe Especialista em RH do Baixe Currículo Grátis',
        'url': 'https://baixecurriculogratis.vercel.app'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Baixe Currículo Grátis',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://baixecurriculogratis.vercel.app/logo.svg'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': currentUrl
      }
    };
    scriptTag.text = JSON.stringify(schemaData);

    // Smooth scroll to top on render
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      // Revert head tags when navigating away
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDesc);
      if (metaKeywords) metaKeywords.setAttribute('content', originalKeywords);
      if (ogTitle) ogTitle.setAttribute('content', originalOgTitle);
      if (ogDesc) ogDesc.setAttribute('content', originalOgDesc);
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [article]);

  // Related recommended template
  const relatedTemplate = templatesCatalog.find(t => t.slug === article.relatedTemplateSlug) 
    || templatesCatalog[0];

  // Other articles for internal link building & SEO crawl graph
  const otherArticles = supportArticles.filter(a => a.id !== article.id).slice(0, 3);

  const articleUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/artigos/${article.slug}`
    : `https://baixecurriculogratis.vercel.app/artigos/${article.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Confira este guia essencial sobre currículos: "${article.title}" no Baixe Currículo Grátis\n${articleUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation (Crucial for SEO Hierarchy & Crawler breadcrumb rich results) */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center flex-wrap gap-2 text-xs text-slate-500 font-medium">
            <li>
              <button 
                onClick={onNavigateHome}
                className="hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Início
              </button>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <button 
                onClick={onNavigateHome}
                className="hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Dicas & Artigos
              </button>
            </li>
            <li className="text-slate-300">/</li>
            <li className="text-emerald-700 font-semibold truncate max-w-xs sm:max-w-md">
              {article.category}
            </li>
          </ol>
        </nav>

        {/* Back Link Button */}
        <div className="mb-6">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer bg-white border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para todos os modelos e editor</span>
          </button>
        </div>

        {/* Main Article Container */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-10">
          
          {/* Header Metadata */}
          <header className="border-b border-slate-100 pb-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
              <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md uppercase tracking-wider">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readTime}
              </span>
              {article.datePublished && (
                <span className="flex items-center gap-1 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Atualizado em 2026
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            {/* Author and Social Share Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  BCG
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {article.author || 'Equipe Especialista em RH'}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-emerald-600" />
                    Revisado por recrutadores de grandes empresas
                  </div>
                </div>
              </div>

              {/* Social share buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Compartilhar pelo WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copiar URL deste artigo"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Link Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copiar Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Article Summary Box */}
          <div className="bg-emerald-50/60 border-l-4 border-emerald-600 p-4 sm:p-5 rounded-r-xl mb-8">
            <div className="text-xs uppercase font-extrabold tracking-wider text-emerald-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              Resumo Executivo do Artigo
            </div>
            <p className="text-sm sm:text-base text-emerald-950 font-medium leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Article Full Content */}
          <div className="space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="text-slate-700 leading-relaxed font-normal">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Takeaways Box (Crucial for high user retention & Google Featured Snippets) */}
          <section className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 my-10">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Pontos-Chave para Lembrar:
            </h3>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Direct Recommended Template CTA Card */}
          {relatedTemplate && (
            <div className="bg-linear-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mt-10 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/60 px-2.5 py-1 rounded mb-2">
                  Modelo Recomendado Para Este Artigo
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  {relatedTemplate.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mb-5 leading-relaxed">
                  Coloque em prática as orientações deste artigo agora mesmo. Este modelo já vem estruturado com seções ideais, compatibilidade total com robôs ATS e é 100% gratuito.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onUseTemplate(relatedTemplate.slug)}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Personalizar Este Modelo no Editor Online Grátis</span>
                  </button>

                  <button
                    onClick={onNavigateHome}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Ver Todos os Modelos
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LGPD and Transparency Notice */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-8 pt-6 border-t border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Conteúdo produzido de forma independente pela equipe editorial do <strong>Baixe Currículo Grátis</strong>. Todos os modelos recomendados são 100% gratuitos e livres de cadastros.
            </span>
          </div>

        </div>

        {/* Read More / Internal Linking Section for SEO Authority */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Outros Artigos e Guias de Carreira</span>
            </h2>
            <button
              onClick={onNavigateHome}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              Ver página principal →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherArticles.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-emerald-300 p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <a
                    href={`/artigos/${item.slug}`}
                    onClick={(e) => {
                      // Allow Ctrl/Cmd + click to open in real new tab, standard click navigates smoothly
                      if (!e.metaKey && !e.ctrlKey) {
                        e.preventDefault();
                        onNavigateToArticle(item.slug);
                      }
                    }}
                    className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center justify-between cursor-pointer"
                  >
                    <span>Ler artigo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </article>
  );
};
