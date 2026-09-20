import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Users, 
  Lock, 
  Award, 
  Mail,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateToContact: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigateToContact,
  onNavigateToSection,
}) => {
  // Dynamic SEO Injection for About Page
  useEffect(() => {
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute('content') || '';
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const originalOgTitle = ogTitle?.getAttribute('content') || '';
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const originalOgDesc = ogDesc?.getAttribute('content') || '';

    const pageTitle = 'Sobre Nós | Baixe Currículo Grátis – Nossa Missão e Compromisso';
    const pageDesc = 'Conheça o Baixe Currículo Grátis (BCG): plataforma 100% gratuita criada para democratizar o acesso a modelos de currículo profissionais e compatíveis com robôs ATS.';

    document.title = pageTitle;
    if (metaDesc) metaDesc.setAttribute('content', pageDesc);
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    if (ogDesc) ogDesc.setAttribute('content', pageDesc);

    // Schema.org AboutPage
    const scriptId = 'about-structured-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const currentUrl = typeof window !== 'undefined' 
      ? window.location.origin + '/sobre-nos' 
      : 'https://baexecurriculogratis.com.br/sobre-nos';

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'Sobre o Baixe Currículo Grátis',
      'description': pageDesc,
      'url': currentUrl,
      'mainEntity': {
        '@type': 'Organization',
        'name': 'Baixe Currículo Grátis',
        'alternateName': 'BCG',
        'email': 'acewebdf@gmail.com',
        'url': 'https://baexecurriculogratis.com.br',
        'description': 'Plataforma brasileira gratuita de modelos de currículo editáveis em Word e PDF com editor online sem necessidade de cadastro.'
      }
    };
    scriptTag.text = JSON.stringify(schemaData);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDesc);
      if (ogTitle) ogTitle.setAttribute('content', originalOgTitle);
      if (ogDesc) ogDesc.setAttribute('content', originalOgDesc);
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, []);

  return (
    <article className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <li>
              <button 
                onClick={onNavigateHome}
                className="hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Início
              </button>
            </li>
            <li className="text-slate-300">/</li>
            <li className="text-emerald-700 font-semibold">
              Sobre Nós
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
            <span>Voltar para a Página Inicial</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-10">
          
          {/* Header */}
          <header className="border-b border-slate-100 pb-6 mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md mb-3 uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-emerald-700" />
              Nossa Missão & História
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Democratizando o Acesso a Currículos Profissionais de Alto Padrão
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              O <strong>Baixe Currículo Grátis (BCG)</strong> nasceu de uma constatação simples e indignada: quem está procurando emprego muitas vezes não tem dinheiro para pagar assinaturas caras de sites que prometem currículos "gratuitos", mas cobram no momento do download.
            </p>
          </header>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <h2 className="text-base font-bold text-slate-900 mb-1.5">
                  100% Gratuito de Verdade
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sem testes de 7 dias com cobrança automática surpresa, sem recursos bloqueados e sem marcas d'água no seu documento final. Você personaliza e baixa em PDF ou Word (.doc) sem desembolsar nenhum centavo.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                  <Lock className="w-5 h-5 text-emerald-700" />
                </div>
                <h2 className="text-base font-bold text-slate-900 mb-1.5">
                  Privacidade Total (LGPD)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Não salvamos seu telefone, e-mail ou histórico de empregos em nenhum banco de dados central. Todo o processamento e a geração do PDF acontecem localmente dentro do seu próprio navegador.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                  <Award className="w-5 h-5 text-emerald-700" />
                </div>
                <h2 className="text-base font-bold text-slate-900 mb-1.5">
                  Compatibilidade Real com ATS
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Nossos modelos seguem a risca as diretrizes dos sistemas de triagem mais usados no Brasil (Gupy, Kenoby, Workday, Solides). Estrutura semântica, sem caixas flutuantes que quebram a leitura dos robôs.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                  <Users className="w-5 h-5 text-emerald-700" />
                </div>
                <h2 className="text-base font-bold text-slate-900 mb-1.5">
                  Para Todos os Momentos de Carreira
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Desde quem busca o Primeiro Emprego e Jovem Aprendiz até profissionais de TI, saúde, áreas administrativas e cargos de gerência e liderança executiva.
                </p>
              </div>
            </div>

          </div>

          {/* Detailed Narrative */}
          <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">
              Como o Baixe Currículo Grátis se Sustenta?
            </h2>
            <p>
              Acreditamos em transparência absoluta com nossos usuários. Para manter os servidores no ar e continuar desenvolvendo novos modelos e guias educativos gratuitos, exibimos pequenos blocos de anúncios publicitários discretos e não invasivos.
            </p>
            <p>
              Dessa forma, os anunciantes financiam a infraestrutura técnica, permitindo que candidatos desempregados ou em busca de melhores oportunidades profissionais tenham acesso às mesmas ferramentas de ponta que antes só estavam disponíveis mediante pagamento.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">
              Nossa Equipe e Contato
            </h2>
            <p>
              O projeto é mantido com carinho pela equipe editorial de especialistas em Recursos Humanos e desenvolvedores web. Estamos constantemente ouvindo sugestões da comunidade de usuários para desenhar novos modelos de currículos e expandir nossos guias.
            </p>
            <p>
              Dúvidas, sugestões de novos formatos de currículo ou parcerias institucionais? Fale diretamente conosco pelo e-mail oficial: <a href="mailto:acewebdf@gmail.com" className="text-emerald-700 font-bold hover:underline">acewebdf@gmail.com</a>.
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-linear-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mt-10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black text-white mb-1.5">
                Pronto para Criar seu Currículo Vencedor?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                Escolha entre nossos modelos clássicos, modernos ou minimalistas e baixe em menos de 5 minutos.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateToSection('modelos')}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Explorar Modelos</span>
              </button>

              <button
                onClick={onNavigateToContact}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Fale Conosco</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </article>
  );
};
