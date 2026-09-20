/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TemplatesGallery } from './components/TemplatesGallery';
import { EditorContainer } from './components/OnlineEditor/EditorContainer';
import { AtsSimulatorModal } from './components/AtsSimulatorModal';
import { InterviewTipsSection } from './components/InterviewTipsSection';
import { ArticlesSection } from './components/ArticlesSection';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FeedbackModal } from './components/FeedbackModal';
import { AdBanner } from './components/AdBanner';
import { ResumeData, TemplateStyle, TemplateCardInfo } from './types';
import { sampleTechDeveloper } from './data/sampleResumes';
import { templatesCatalog } from './data/templatesCatalog';
import { supportArticles } from './data/supportArticles';
import { exportResumeToWord } from './utils/pdfExport';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

interface RouteState {
  page: 'home' | 'sobre-nos' | 'contato' | 'artigo';
  articleSlug: string | null;
}

/**
 * Parses URL path, search params or hash to determine the active page/route.
 * Ensures consistent page navigation in iframe preview and new tabs.
 */
function getCurrentRoute(): RouteState {
  if (typeof window === 'undefined') return { page: 'home', articleSlug: null };

  const pathname = window.location.pathname.toLowerCase();

  if (pathname === '/sobre-nos' || pathname === '/sobre') {
    return { page: 'sobre-nos', articleSlug: null };
  }

  if (pathname === '/contato' || pathname === '/fale-conosco') {
    return { page: 'contato', articleSlug: null };
  }

  const matchArticle = pathname.match(/^\/artigos\/([a-z0-9-]+)/i);
  if (matchArticle && matchArticle[1]) {
    return { page: 'artigo', articleSlug: matchArticle[1] };
  }

  // Query parameter fallback
  const searchParams = new URLSearchParams(window.location.search);
  const pagina = searchParams.get('pagina');
  if (pagina === 'sobre-nos' || pagina === 'sobre') {
    return { page: 'sobre-nos', articleSlug: null };
  }
  if (pagina === 'contato') {
    return { page: 'contato', articleSlug: null };
  }
  const queryArtigo = searchParams.get('artigo');
  if (queryArtigo) {
    return { page: 'artigo', articleSlug: queryArtigo };
  }

  // Hash fallback
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('sobre-nos') || hash.includes('sobre')) {
    return { page: 'sobre-nos', articleSlug: null };
  }
  if (hash.includes('contato')) {
    return { page: 'contato', articleSlug: null };
  }
  const hashArticleMatch = hash.match(/^#\/?artigos\/([a-z0-9-]+)/i);
  if (hashArticleMatch && hashArticleMatch[1]) {
    return { page: 'artigo', articleSlug: hashArticleMatch[1] };
  }

  return { page: 'home', articleSlug: null };
}

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleTechDeveloper);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('todos');
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dedicated page routing state
  const [route, setRoute] = useState<RouteState>(() => getCurrentRoute());

  // Listen to browser navigation history (back / forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setRoute(getCurrentRoute());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Route navigators
  const handleOpenArticle = (slug: string) => {
    setRoute({ page: 'artigo', articleSlug: slug });
    window.history.pushState({ page: 'artigo', articleSlug: slug }, '', `/artigos/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAbout = () => {
    setRoute({ page: 'sobre-nos', articleSlug: null });
    window.history.pushState({ page: 'sobre-nos' }, '', '/sobre-nos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToContact = () => {
    setRoute({ page: 'contato', articleSlug: null });
    window.history.pushState({ page: 'contato' }, '', '/contato');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setRoute({ page: 'home', articleSlug: null });
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // General navigation handler from Header, Footer or internal links
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'simulador-ats') {
      setIsAtsModalOpen(true);
      return;
    }

    if (sectionId === 'sobre-nos') {
      handleNavigateToAbout();
      return;
    }

    if (sectionId === 'contato') {
      handleNavigateToContact();
      return;
    }

    // If currently on a subpage (About, Contact or Article), return to home first then scroll
    if (route.page !== 'home') {
      setRoute({ page: 'home', articleSlug: null });
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        if (sectionId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 50);
      return;
    }

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Direct template load into editor
  const handleUseTemplateInEditor = (style: TemplateStyle, templateTitle: string) => {
    setResumeData(prev => ({
      ...prev,
      selectedTemplate: style
    }));
    showToast(`Modelo "${templateTitle}" aplicado ao editor!`);
    handleNavigate('editor');
  };

  // Instant download handler
  const handleInstantDownloadTemplate = (template: TemplateCardInfo, format: 'pdf' | 'word') => {
    if (format === 'word') {
      exportResumeToWord(resumeData);
      showToast(`Download de "${template.title}" em formato Word (.doc) iniciado!`);
    } else {
      setResumeData(prev => ({
        ...prev,
        selectedTemplate: template.style
      }));
      handleNavigate('editor');
      showToast(`Prévia de "${template.title}" carregada. Clique em "Baixar PDF" para gerar.`);
    }
  };

  // Select template by slug from articles
  const handleSelectTemplateBySlug = (slug: string) => {
    const found = templatesCatalog.find(t => t.slug === slug);
    if (found) {
      setRoute({ page: 'home', articleSlug: null });
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        handleUseTemplateInEditor(found.style, found.title);
      }, 50);
    } else {
      handleNavigate('modelos');
    }
  };

  const currentArticle = route.page === 'artigo' && route.articleSlug 
    ? supportArticles.find(a => a.slug === route.articleSlug) 
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header 
        onNavigate={handleNavigate}
        onOpenFeedback={() => setIsFeedbackModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {route.page === 'sobre-nos' && (
          <AboutPage 
            onNavigateHome={handleNavigateHome}
            onNavigateToContact={handleNavigateToContact}
            onNavigateToSection={handleNavigate}
          />
        )}

        {route.page === 'contato' && (
          <ContactPage 
            onNavigateHome={handleNavigateHome}
            onNavigateToSection={handleNavigate}
          />
        )}

        {route.page === 'artigo' && (
          currentArticle ? (
            <ArticleDetailPage
              article={currentArticle}
              onNavigateHome={handleNavigateHome}
              onNavigateToArticle={handleOpenArticle}
              onUseTemplate={handleSelectTemplateBySlug}
            />
          ) : (
            <div className="py-24 text-center max-w-xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Artigo não encontrado</h2>
              <p className="text-sm text-slate-600 mb-6">
                O artigo que você procurava não foi encontrado ou mudou de endereço.
              </p>
              <button
                onClick={handleNavigateHome}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para a Página Inicial</span>
              </button>
            </div>
          )
        )}

        {route.page === 'home' && (
          <>
            {/* Hero Section */}
            <Hero 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNavigate={handleNavigate}
              onSelectCategoryFilter={setSelectedCategoryFilter}
            />

            {/* Top AdSense Placement */}
            <AdBanner slotId="top-ad" />

            {/* Templates Gallery Hub (PRD 5) */}
            <TemplatesGallery 
              searchQuery={searchQuery}
              selectedCategoryFilter={selectedCategoryFilter}
              onSelectCategoryFilter={setSelectedCategoryFilter}
              onUseTemplateInEditor={handleUseTemplateInEditor}
              onInstantDownloadTemplate={handleInstantDownloadTemplate}
            />

            {/* 3-Step Online Editor with Live A4 Preview */}
            <EditorContainer 
              resumeData={resumeData}
              setResumeData={setResumeData}
              onOpenAtsSimulator={() => setIsAtsModalOpen(true)}
            />

            {/* Middle AdSense Placement */}
            <AdBanner slotId="mid-ad" />

            {/* Interview Tips & STAR Method Guide (Explicit User Request) */}
            <InterviewTipsSection />

            {/* Satellite Support Articles (PRD 5.6) */}
            <ArticlesSection 
              onOpenArticle={handleOpenArticle}
              onSelectTemplateBySlug={handleSelectTemplateBySlug}
            />

            {/* FAQ Section */}
            <FaqSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onSelectCategoryFilter={setSelectedCategoryFilter}
        onOpenFeedback={() => setIsFeedbackModalOpen(true)}
        onOpenArticle={handleOpenArticle}
      />

      {/* Modals */}
      <AtsSimulatorModal 
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
        resumeData={resumeData}
      />

      <FeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />

    </div>
  );
}
