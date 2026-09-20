import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Heart, 
  FileText, 
  ArrowUp, 
  Share2, 
  Check, 
  HelpCircle, 
  MessageSquare 
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectCategoryFilter: (filter: string) => void;
  onOpenFeedback: () => void;
  onOpenArticle?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategoryFilter,
  onOpenFeedback,
  onOpenArticle
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = 'Baixe Currículo Grátis – Modelos Profissionais e Editáveis';
    const text = 'Encontrei este site com modelos de currículo gratuitos, editor online e verificador ATS:';

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        // Fallback
      }
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Confira este site gratuito para criar e baixar currículos profissionais compatíveis com ATS (Word e PDF): ');
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Branding & Mission & Share */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo 
              onClick={() => onNavigate('hero')} 
              size="lg" 
              theme="dark" 
              showSubtitle={true} 
              showBadge={true} 
            />

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Nossa missão é democratizar o acesso a currículos de alto padrão e compatíveis com robôs de triagem (ATS). 
              Sem cadastro, sem custos e com privacidade total de dados garantida no seu navegador.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-slate-900 border border-slate-800 p-2.5 rounded-xl max-w-sm">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Conformidade total com a LGPD: Seus dados não são enviados a nenhum servidor.</span>
            </div>

            {/* Compartilhar no Rodapé */}
            <div className="pt-2 max-w-sm">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compartilhar com quem busca emprego:</span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copiar link ou compartilhar"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Link Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Compartilhar Link</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-emerald-100 border border-emerald-800/70 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Enviar por WhatsApp"
                >
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Col 3: Estilos de Modelos */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              Modelos por Estilo
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { onSelectCategoryFilter('simples'); onNavigate('modelos'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Currículo Simples Tradicional
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategoryFilter('moderno'); onNavigate('modelos'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Currículo Moderno Executivo
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategoryFilter('criativo'); onNavigate('modelos'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Currículo Criativo com Barra Lateral
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategoryFilter('minimalista'); onNavigate('modelos'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Currículo Minimalista Preto & Branco
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategoryFilter('word'); onNavigate('modelos'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Modelos Compatíveis com Word (.doc)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Áreas e Perfis */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              Áreas & Níveis
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { onSelectCategoryFilter('primeiro-emprego'); onNavigate('modelos'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Primeiro Emprego & Jovem Aprendiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategoryFilter('ti'); onNavigate('modelos'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Tecnologia & TI (Dev / Dados)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategoryFilter('administrativo'); onNavigate('modelos'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Administrativo & Financeiro
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategoryFilter('saude'); onNavigate('modelos'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Enfermagem & Saúde (Coren)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSelectCategoryFilter('lideranca'); onNavigate('modelos'); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Cargos de Gestão & Liderança
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Ferramentas & Apoio */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              Recursos Gratuitos
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('editor')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Editor de Currículo Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('simulador-ats')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Verificador de Compatibilidade ATS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('entrevistas')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Dicas de Entrevista & Método STAR
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('artigos')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Artigos & Dicas de RH
                </button>
              </li>
              <li>
                <a
                  href="/artigos/como-fazer-curriculo-sem-experiencia"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && onOpenArticle) {
                      e.preventDefault();
                      onOpenArticle('como-fazer-curriculo-sem-experiencia');
                    }
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer block"
                >
                  Guia: 1º Emprego & Sem Experiência
                </a>
              </li>
              <li>
                <a
                  href="/artigos/palavras-chave-para-curriculo"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && onOpenArticle) {
                      e.preventDefault();
                      onOpenArticle('palavras-chave-para-curriculo');
                    }
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer block"
                >
                  Guia: Palavras-Chave no ATS
                </a>
              </li>
              <li>
                <a
                  href="/artigos/como-se-preparar-para-entrevistas-de-emprego"
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && onOpenArticle) {
                      e.preventDefault();
                      onOpenArticle('como-se-preparar-para-entrevistas-de-emprego');
                    }
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer block"
                >
                  Guia: Método STAR na Entrevista
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre-nos')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer font-semibold text-white"
                >
                  Sobre Nós & Nossa Missão
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contato')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer font-semibold text-white"
                >
                  Contato & Fale Conosco
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dúvidas Frequentes (FAQ)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFeedback}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-semibold"
                >
                  Sugerir Novo Modelo →
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 text-center sm:text-left">
            <span>© 2026 Baixe Currículo Grátis (BCG) — Todos os direitos reservados.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span>
              Criado por{' '}
              <a
                href="https://www.acewebsites.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors underline-offset-2 hover:underline"
              >
                Acewebsites
              </a>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('sobre-nos')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Sobre Nós
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('contato')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Contato
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('faq')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Perguntas Frequentes (FAQ)
            </button>
            <span>•</span>
            <button
              onClick={onOpenFeedback}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Feedback
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Voltar ao Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
