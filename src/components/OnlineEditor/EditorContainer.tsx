import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Sparkles, 
  FileText, 
  FileCheck, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  ShieldCheck, 
  Palette, 
  Type, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Smartphone, 
  Monitor, 
  Layers,
  Sparkle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { 
  ResumeData, 
  TemplateStyle, 
  ExperienceItem, 
  EducationItem, 
  LanguageItem, 
  CertificationItem 
} from '../../types';
import { ResumePreviewA4 } from './ResumePreviewA4';
import { DesignCustomizer } from './DesignCustomizer';
import { CustomSectionsManager } from './CustomSectionsManager';
import { 
  sampleTechDeveloper, 
  sampleFirstJob, 
  sampleAdministrative, 
  sampleHealthcare, 
  blankResume 
} from '../../data/sampleResumes';
import { exportResumeToPdf, exportResumeToWord, generateCleanAtsText } from '../../utils/pdfExport';
import { evaluateResumeATS } from '../../utils/atsChecker';

interface EditorContainerProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onOpenAtsSimulator: () => void;
}

export const EditorContainer: React.FC<EditorContainerProps> = ({
  resumeData,
  setResumeData,
  onOpenAtsSimulator
}) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(2);
  const [activeSection, setActiveSection] = useState<'pessoal' | 'resumo' | 'experiencia' | 'educacao' | 'habilidades' | 'extras'>('pessoal');
  const [zoomScale, setZoomScale] = useState<number>(0.85);
  const [fitScale, setFitScale] = useState<number>(0.85);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [viewMode, setViewMode] = useState<'form' | 'preview' | 'split'>('form');
  const [newSkillInput, setNewSkillInput] = useState('');

  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Calculate the optimal zoom scale to fit the A4 page (794px wide) inside container
  const calculateFitScale = () => {
    if (previewContainerRef.current) {
      const containerWidth = previewContainerRef.current.clientWidth;
      const availableWidth = containerWidth - 28; // container padding allowance
      if (availableWidth > 60) {
        const scale = Math.min(1.0, Math.max(0.30, availableWidth / 794));
        return Number(scale.toFixed(2));
      }
    }
    if (typeof window !== 'undefined') {
      const screenW = window.innerWidth;
      if (screenW < 480) return Number(Math.max(0.34, (screenW - 48) / 794).toFixed(2));
      if (screenW < 768) return Number(Math.max(0.48, (screenW - 64) / 794).toFixed(2));
      if (screenW < 1024) return 0.70;
    }
    return 0.85;
  };

  // Automatically recalculate and set zoom fit on mobile / screen resize
  useEffect(() => {
    const handleResize = () => {
      const optimalFit = calculateFitScale();
      setFitScale(optimalFit);
      // On mobile / tablet screens (< 1024px), automatically apply fit scale
      if (window.innerWidth < 1024) {
        setZoomScale(optimalFit);
      }
    };

    handleResize();
    const timer = setTimeout(handleResize, 150);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [viewMode, activeStep]);

  // Calculate live ATS score
  const atsEvaluation = evaluateResumeATS(resumeData);

  // Template Style options
  const templateStyles: { id: TemplateStyle; name: string; desc: string; ats: number }[] = [
    { id: 'classico', name: 'Clássico Tradicional', desc: 'Sóbrio e 100% formal', ats: 99 },
    { id: 'moderno', name: 'Executivo Moderno', desc: 'Cores sutis e alta legibilidade', ats: 98 },
    { id: 'criativo', name: 'Criativo (2 Colunas)', desc: 'Coluna lateral e foto opcional', ats: 96 },
    { id: 'minimalista', name: 'Minimalista Suíço', desc: 'Espaçamento clean monocromático', ats: 100 },
    { id: 'profissional', name: 'Profissional / Gestão', desc: 'Cabeçalho nobre e conquistas', ats: 98 },
  ];

  const colorPalettes = [
    { name: 'Esmeralda', hex: '#0f766e' },
    { name: 'Azul Executivo', hex: '#2563eb' },
    { name: 'Ardósia / Carvão', hex: '#1e293b' },
    { name: 'Índigo Moderno', hex: '#4f46e5' },
    { name: 'Céu / Saúde', hex: '#0284c7' },
    { name: 'Vinho Nobre', hex: '#881337' },
  ];

  // Helper updates
  const updatePersonalInfo = (field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  // Experiences handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: 'exp-' + Date.now(),
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    setResumeData(prev => ({
      ...prev,
      experiences: [newExp, ...prev.experiences]
    }));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }));
  };

  const addAchievement = (expId: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => {
        if (e.id === expId) {
          return { ...e, achievements: [...e.achievements, ''] };
        }
        return e;
      })
    }));
  };

  const updateAchievement = (expId: string, index: number, text: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => {
        if (e.id === expId) {
          const newAch = [...e.achievements];
          newAch[index] = text;
          return { ...e, achievements: newAch };
        }
        return e;
      })
    }));
  };

  const removeAchievement = (expId: string, index: number) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => {
        if (e.id === expId) {
          return { ...e, achievements: e.achievements.filter((_, i) => i !== index) };
        }
        return e;
      })
    }));
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: 'edu-' + Date.now(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false
    };
    setResumeData(prev => ({
      ...prev,
      education: [newEdu, ...prev.education]
    }));
  };

  const updateEducation = (id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(ed => ed.id === id ? { ...ed, [field]: value } : ed)
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(ed => ed.id !== id)
    }));
  };

  // Skills handlers
  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    if (!resumeData.skills.includes(newSkillInput.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkillInput.trim()]
      }));
    }
    setNewSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  // Languages handlers
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: 'lang-' + Date.now(),
      language: '',
      proficiency: 'Intermediário'
    };
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, newLang]
    }));
  };

  const updateLanguage = (id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(l => l.id === id ? { ...l, [field]: value } : l)
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l.id !== id)
    }));
  };

  // Certifications handlers
  const addCertification = () => {
    const newCert: CertificationItem = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      year: new Date().getFullYear().toString()
    };
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const updateCertification = (id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  // Download actions
  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    try {
      const success = await exportResumeToPdf('resume-a4-document', resumeData.personalInfo.fullName || 'meu-curriculo');
      if (!success) {
        console.warn('PDF export fallback triggered.');
      }
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportWord = () => {
    exportResumeToWord(resumeData);
  };

  const handleCopyAtsText = () => {
    const text = generateCleanAtsText(resumeData);
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <section id="editor" className="py-12 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & 3-Step Wizard Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider mb-1">
                Editor Online Gratuito • Sem Login
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Personalize seu Currículo em 3 Passos Rápidos
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Edite os dados com visualização em folha A4 em tempo real e exporte o PDF 100% no seu navegador.
              </p>
            </div>

            {/* ATS Health Score Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenAtsSimulator}
                className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer group shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                  {atsEvaluation.score}
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                    Nota ATS: <span className="text-emerald-700">{atsEvaluation.grade}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 group-hover:text-emerald-700 transition-colors">
                    Clique para ver diagnóstico →
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 3 Steps Navigation Bar */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveStep(1)}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer border ${
                activeStep === 1 
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold shadow-xs' 
                  : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="text-[10px] uppercase font-bold text-slate-400">Passo 1</div>
              <div className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 mt-0.5">
                <Palette className="w-4 h-4 text-emerald-600" />
                <span>Escolher Modelo & Cores</span>
              </div>
            </button>

            <button
              onClick={() => setActiveStep(2)}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer border ${
                activeStep === 2 
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold shadow-xs' 
                  : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="text-[10px] uppercase font-bold text-slate-400">Passo 2</div>
              <div className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 mt-0.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Preencher Seus Dados</span>
              </div>
            </button>

            <button
              onClick={() => setActiveStep(3)}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer border ${
                activeStep === 3 
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold shadow-xs' 
                  : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="text-[10px] uppercase font-bold text-slate-400">Passo 3</div>
              <div className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 mt-0.5">
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Baixar PDF & Word</span>
              </div>
            </button>
          </div>
        </div>

        {/* View mode toggle on smaller screens */}
        <div className="lg:hidden bg-white p-1.5 rounded-2xl border border-slate-200 mb-4 shadow-xs grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setViewMode('form')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === 'form' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Formulário de Edição</span>
          </button>
          <button
            onClick={() => {
              setViewMode('preview');
              setTimeout(() => {
                const fit = calculateFitScale();
                setFitScale(fit);
                setZoomScale(fit);
              }, 60);
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === 'preview' 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Prévia Folha A4</span>
          </button>
        </div>

        {/* Main Editor Grid (Form at left, Live A4 Sheet at right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Controls & Form Inputs (5 cols) */}
          <div className={`lg:col-span-5 space-y-4 ${viewMode === 'preview' ? 'hidden lg:block' : 'block'}`}>
            
            {/* Quick Sample Profile Selector bar */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Preencher com Exemplo Pronto:
                </span>
                <button
                  onClick={() => setResumeData(blankResume)}
                  className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                >
                  Limpar Tudo
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                <button
                  onClick={() => setResumeData(sampleFirstJob)}
                  className="text-[11px] py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  1º Emprego
                </button>
                <button
                  onClick={() => setResumeData(sampleTechDeveloper)}
                  className="text-[11px] py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  Dev / TI
                </button>
                <button
                  onClick={() => setResumeData(sampleAdministrative)}
                  className="text-[11px] py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  Administrativo
                </button>
                <button
                  onClick={() => setResumeData(sampleHealthcare)}
                  className="text-[11px] py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  Enfermagem
                </button>
              </div>
            </div>

            {/* STEP 1: TEMPLATE & STYLING CUSTOMIZER */}
            {activeStep === 1 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5 animate-in fade-in-50">
                <DesignCustomizer
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                  showTemplateSelector={true}
                />

                <button
                  onClick={() => setActiveStep(2)}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  Continuar para Preencher Dados (Passo 2) →
                </button>
              </div>
            )}

            {/* STEP 2: FORM DATA INPUT ACCORDION */}
            {activeStep === 2 && (
              <div className="space-y-3 animate-in fade-in-50">
                
                {/* 1. Dados Pessoais */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'pessoal' ? ('' as any) : 'pessoal')}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">1</span>
                      Dados Pessoais & Contato
                    </span>
                    {activeSection === 'pessoal' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {activeSection === 'pessoal' && (
                    <div className="p-4 pt-1 border-t border-slate-100 space-y-3 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Nome Completo *</label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                          placeholder="Ex: Carlos Eduardo Silveira"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Cargo Pretendido / Título *</label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.jobTitle}
                          onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                          placeholder="Ex: Assistente Administrativo | Excel Avançado"
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">E-mail *</label>
                          <input
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            placeholder="carlos.silveira@email.com"
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Telefone / WhatsApp *</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            placeholder="(11) 98765-4321"
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">Cidade e Estado</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.location}
                            onChange={(e) => updatePersonalInfo('location', e.target.value)}
                            placeholder="São Paulo, SP"
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">LinkedIn (Opcional)</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.linkedin}
                            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/carlos-silveira"
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="showPhotoCheck"
                          checked={resumeData.personalInfo.showPhoto}
                          onChange={(e) => updatePersonalInfo('showPhoto', e.target.checked)}
                          className="rounded text-emerald-600 focus:ring-emerald-500"
                        />
                        <label htmlFor="showPhotoCheck" className="text-slate-600 font-medium cursor-pointer">
                          Incluir foto no cabeçalho (Opcional)
                        </label>
                      </div>

                      {resumeData.personalInfo.showPhoto && (
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">URL da Foto ou Avatar</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.photoUrl || ''}
                            onChange={(e) => updatePersonalInfo('photoUrl', e.target.value)}
                            placeholder="https://exemplo.com/minha-foto.jpg"
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">Para maior compatibilidade ATS, a foto é opcional.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Resumo Profissional */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'resumo' ? ('' as any) : 'resumo')}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">2</span>
                      Resumo Profissional / Objetivo
                    </span>
                    {activeSection === 'resumo' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {activeSection === 'resumo' && (
                    <div className="p-4 pt-1 border-t border-slate-100 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-[11px]">Dica: 2 a 4 linhas objetivas com seus pontos fortes</span>
                        <span className="text-slate-400 text-[10px]">{(resumeData.summary || '').length} caracteres</span>
                      </div>
                      <textarea
                        rows={4}
                        value={resumeData.summary}
                        onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="Profissional com X anos de experiência em... Especialista em... Histórico comprovado de..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-xs leading-relaxed"
                      />
                    </div>
                  )}
                </div>

                {/* 3. Experiência Profissional */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'experiencia' ? ('' as any) : 'experiencia')}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">3</span>
                      Experiências Anteriores ({resumeData.experiences.length})
                    </span>
                    {activeSection === 'experiencia' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {activeSection === 'experiencia' && (
                    <div className="p-4 pt-1 border-t border-slate-100 space-y-4 text-xs">
                      <div className="flex justify-end">
                        <button
                          onClick={addExperience}
                          className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Adicionar Experiência
                        </button>
                      </div>

                      {resumeData.experiences.map((exp, idx) => (
                        <div key={exp.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-800 text-xs">Empresa #{idx + 1}</span>
                            <button
                              onClick={() => removeExperience(exp.id)}
                              className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                              title="Remover"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Cargo</label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                placeholder="Ex: Analista de Suporte"
                                className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Empresa</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                placeholder="Ex: Empresa X"
                                className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Início</label>
                              <input
                                type="text"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                placeholder="Jan 2023"
                                className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Término</label>
                              <input
                                type="text"
                                value={exp.current ? 'Presente' : exp.endDate}
                                disabled={exp.current}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                placeholder="Dez 2024"
                                className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs disabled:bg-slate-100"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <input
                              type="checkbox"
                              id={`curr-${exp.id}`}
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              className="rounded text-emerald-600"
                            />
                            <label htmlFor={`curr-${exp.id}`} className="text-[11px] text-slate-600 cursor-pointer">
                              Trabalho aqui atualmente
                            </label>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Descrição Geral</label>
                            <textarea
                              rows={2}
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              placeholder="Resumo das atividades e responsabilidades..."
                              className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs"
                            />
                          </div>

                          {/* Achievements / Conquistas em tópicos */}
                          <div className="space-y-1 pt-1">
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] font-semibold text-slate-600">Principais Conquistas com Números:</span>
                              <button
                                onClick={() => addAchievement(exp.id)}
                                className="text-[10px] text-emerald-700 font-bold hover:underline cursor-pointer"
                              >
                                + Adicionar Marcador
                              </button>
                            </div>
                            {exp.achievements?.map((ach, achIdx) => (
                              <div key={achIdx} className="flex gap-1 items-center">
                                <span className="text-slate-400">•</span>
                                <input
                                  type="text"
                                  value={ach}
                                  onChange={(e) => updateAchievement(exp.id, achIdx, e.target.value)}
                                  placeholder="Ex: Reduzi o tempo de resposta aos clientes em 20%"
                                  className="w-full p-1 bg-white border border-slate-200 rounded text-xs"
                                />
                                <button
                                  onClick={() => removeAchievement(exp.id, achIdx)}
                                  className="text-slate-400 hover:text-rose-500 p-1"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Formação Acadêmica */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'educacao' ? ('' as any) : 'educacao')}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">4</span>
                      Formação Acadêmica ({resumeData.education.length})
                    </span>
                    {activeSection === 'educacao' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {activeSection === 'educacao' && (
                    <div className="p-4 pt-1 border-t border-slate-100 space-y-3 text-xs">
                      <div className="flex justify-end">
                        <button
                          onClick={addEducation}
                          className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Adicionar Formação
                        </button>
                      </div>

                      {resumeData.education.map((edu, idx) => (
                        <div key={edu.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-800 text-xs">Curso #{idx + 1}</span>
                            <button
                              onClick={() => removeEducation(edu.id)}
                              className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Instituição / Escola</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                placeholder="Ex: USP, Senac, E.E. Carlos..."
                                className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Grau / Nível</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                placeholder="Bacharelado, Técnico, Ensino Médio"
                                className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Curso / Área</label>
                              <input
                                type="text"
                                value={edu.fieldOfStudy}
                                onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                                placeholder="Ex: Administração, TI..."
                                className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Ano Conclusão</label>
                              <input
                                type="text"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                placeholder="2025"
                                className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. Habilidades & Competências */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'habilidades' ? ('' as any) : 'habilidades')}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">5</span>
                      Habilidades & Palavras-Chave ({resumeData.skills.length})
                    </span>
                    {activeSection === 'habilidades' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {activeSection === 'habilidades' && (
                    <div className="p-4 pt-1 border-t border-slate-100 space-y-3 text-xs">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSkillInput}
                          onChange={(e) => setNewSkillInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                          placeholder="Digite uma competência (ex: Excel Avançado, React, Gestão de Pessoas)"
                          className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                        <button
                          onClick={handleAddSkill}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-2 rounded-lg text-xs cursor-pointer"
                        >
                          Adicionar
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {resumeData.skills.map((sk) => (
                          <span
                            key={sk}
                            className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md text-xs flex items-center gap-1 border border-slate-200/80"
                          >
                            <span>{sk}</span>
                            <button
                              onClick={() => removeSkill(sk)}
                              className="text-slate-400 hover:text-rose-600 ml-1 font-bold cursor-pointer"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Quick skill suggestions */}
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[10px] text-slate-500 font-semibold block mb-1">Sugestões rápidas para ATS:</span>
                        <div className="flex flex-wrap gap-1">
                          {['Comunicação Escrita', 'Pacote Office', 'Atendimento ao Cliente', 'Trabalho em Equipe', 'Resolução de Problemas', 'Inglês']
                            .filter(s => !resumeData.skills.includes(s))
                            .map(sug => (
                              <button
                                key={sug}
                                onClick={() => setResumeData(prev => ({ ...prev, skills: [...prev.skills, sug] }))}
                                className="text-[10px] bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-dashed border-slate-300 px-2 py-0.5 rounded cursor-pointer"
                              >
                                + {sug}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Extras (Idiomas e Cursos) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <button
                    onClick={() => setActiveSection(activeSection === 'extras' ? ('' as any) : 'extras')}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">6</span>
                      Idiomas & Cursos Complementares
                    </span>
                    {activeSection === 'extras' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {activeSection === 'extras' && (
                    <div className="p-4 pt-1 border-t border-slate-100 space-y-4 text-xs">
                      {/* Idiomas */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-slate-800">Idiomas</span>
                          <button
                            onClick={addLanguage}
                            className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
                          >
                            + Adicionar Idioma
                          </button>
                        </div>
                        {resumeData.languages.map((l) => (
                          <div key={l.id} className="flex gap-2 items-center mb-1.5">
                            <input
                              type="text"
                              value={l.language}
                              onChange={(e) => updateLanguage(l.id, 'language', e.target.value)}
                              placeholder="Idioma (ex: Inglês, Espanhol)"
                              className="flex-1 p-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                            />
                            <select
                              value={l.proficiency}
                              onChange={(e) => updateLanguage(l.id, 'proficiency', e.target.value)}
                              className="p-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                            >
                              <option value="Básico">Básico</option>
                              <option value="Intermediário">Intermediário</option>
                              <option value="Avançado">Avançado</option>
                              <option value="Fluente">Fluente</option>
                              <option value="Nativo">Nativo</option>
                            </select>
                            <button
                              onClick={() => removeLanguage(l.id)}
                              className="text-rose-500 p-1 cursor-pointer"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Cursos / Certificados */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-slate-800">Cursos Livres & Certificações</span>
                          <button
                            onClick={addCertification}
                            className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
                          >
                            + Adicionar Certificado
                          </button>
                        </div>
                        {resumeData.certifications.map((c) => (
                          <div key={c.id} className="grid grid-cols-12 gap-1.5 items-center mb-2">
                            <input
                              type="text"
                              value={c.name}
                              onChange={(e) => updateCertification(c.id, 'name', e.target.value)}
                              placeholder="Nome do Curso (ex: Excel do Básico ao Avançado)"
                              className="col-span-6 p-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                            />
                            <input
                              type="text"
                              value={c.issuer}
                              onChange={(e) => updateCertification(c.id, 'issuer', e.target.value)}
                              placeholder="Emissor (ex: Fundação Bradesco)"
                              className="col-span-4 p-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                            />
                            <input
                              type="text"
                              value={c.year}
                              onChange={(e) => updateCertification(c.id, 'year', e.target.value)}
                              placeholder="2025"
                              className="col-span-1 p-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                            />
                            <button
                              onClick={() => removeCertification(c.id)}
                              className="col-span-1 text-rose-500 p-1 text-center cursor-pointer"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Seções Adicionais & Personalizadas (Projetos, Voluntariado, Livres) */}
                <div className="pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
                    Seções Complementares & Personalizadas:
                  </div>
                  <CustomSectionsManager
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>

                {/* Advance to Step 3 */}
                <button
                  onClick={() => setActiveStep(3)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 mt-4"
                >
                  <Download className="w-4 h-4" />
                  Ir para Etapa de Download →
                </button>
              </div>
            )}

            {/* STEP 3: EXPORT & DOWNLOAD CENTER */}
            {activeStep === 3 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in-50">
                <div className="text-center pb-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2 font-bold">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Seu Currículo Está Pronto para Download!
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Geração 100% no seu navegador com privacidade total e sem cadastro.
                  </p>
                </div>

                {/* Mobile Quick Preview Action Banner */}
                <div className="lg:hidden bg-emerald-50/90 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <div className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Ver Folha A4 Formatada</span>
                    </div>
                    <div className="text-[11px] text-emerald-800/80 mt-0.5">
                      Confira a aparência final do seu currículo pronto.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setViewMode('preview');
                      setTimeout(() => {
                        const fit = calculateFitScale();
                        setFitScale(fit);
                        setZoomScale(fit);
                      }, 60);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    Ver Folha
                  </button>
                </div>

                {/* Export Options */}
                <div className="space-y-2.5">
                  {/* PDF Download Button */}
                  <button
                    onClick={handleExportPdf}
                    disabled={isExportingPdf}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-5 h-5" />
                    <span>{isExportingPdf ? 'Gerando PDF de Alta Resolução...' : 'Baixar Currículo em PDF (Recomendado)'}</span>
                  </button>

                  {/* Word DOC Download Button */}
                  <button
                    onClick={handleExportWord}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-blue-300" />
                    <span>Baixar Modelo Editável no Word (.doc)</span>
                  </button>

                  {/* Copy ATS Text Button */}
                  <button
                    onClick={handleCopyAtsText}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Texto Estruturado Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-600" />
                        <span>Copiar Texto Limpo para Portais de Vagas (Gupy/Kenoby)</span>
                      </>
                    )}
                  </button>

                  {/* Print directly */}
                  <button
                    onClick={() => window.print()}
                    className="w-full border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir Diretamente</span>
                  </button>
                </div>

                {/* LGPD Safety Notice */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-xs text-emerald-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Privacidade Garantida:</strong> Nenhum dado pessoal (nome, e-mail, telefone) foi enviado a servidores externos. Todo o processo foi gerado localmente na memória do seu dispositivo.
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                  >
                    ← Voltar para editar dados
                  </button>
                  <button
                    onClick={onOpenAtsSimulator}
                    className="text-xs text-emerald-700 font-semibold hover:underline"
                  >
                    Ver Relatório ATS completo →
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Real-Time A4 Sheet Preview Canvas (7 cols) */}
          <div className={`lg:col-span-7 ${viewMode === 'form' ? 'hidden lg:block' : 'block'}`}>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3 sm:p-4 sticky top-24">
              
              {/* Mobile back navigation & fit action */}
              <div className="lg:hidden flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                <button
                  onClick={() => setViewMode('form')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  ← {activeStep === 3 ? 'Opções de Download' : 'Voltar ao Formulário'}
                </button>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium">Zoom: {Math.round(zoomScale * 100)}%</span>
                  <button
                    onClick={() => {
                      const fit = calculateFitScale();
                      setFitScale(fit);
                      setZoomScale(fit);
                    }}
                    className="text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    Ajustar
                  </button>
                </div>
              </div>

              {/* Preview Bar Controls (Quick Customizer, Zoom, Fit, Label) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 text-xs gap-2.5">
                <div className="flex items-center justify-between sm:justify-start gap-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    Prévia em Tempo Real (Folha A4)
                  </span>
                  <span className="text-[10px] text-slate-400">
                    210mm × 297mm
                  </span>
                </div>

                {/* Quick Style Controls for instant tweaks */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <select
                    value={resumeData.fontFamily}
                    onChange={(e) => setResumeData(prev => ({ ...prev, fontFamily: e.target.value as any }))}
                    className="text-[11px] font-medium bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-700 cursor-pointer focus:outline-none"
                    title="Fonte do Currículo"
                  >
                    <option value="sans">Sans (Moderna)</option>
                    <option value="serif">Merriweather (Serifada)</option>
                    <option value="mono">JetBrains (Mono)</option>
                    <option value="display">Playfair (Display)</option>
                    <option value="geometric">Inter (Geométrica)</option>
                  </select>

                  <select
                    value={resumeData.fontSize}
                    onChange={(e) => setResumeData(prev => ({ ...prev, fontSize: e.target.value as any }))}
                    className="text-[11px] font-medium bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-700 cursor-pointer focus:outline-none"
                    title="Tamanho do Texto"
                  >
                    <option value="compact">Pequeno</option>
                    <option value="standard">Padrão</option>
                    <option value="large">Grande</option>
                  </select>

                  <div className="flex items-center border border-slate-200 rounded p-0.5 bg-slate-50">
                    <input
                      type="color"
                      value={resumeData.primaryColor}
                      onChange={(e) => setResumeData(prev => ({ ...prev, primaryColor: e.target.value }))}
                      title="Alterar cor principal"
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                    />
                  </div>

                  <div className="flex items-center gap-0.5 pl-1 border-l border-slate-200">
                    <button
                      onClick={() => setZoomScale(prev => Math.max(0.30, Number((prev - 0.08).toFixed(2))))}
                      title="Diminuir Zoom"
                      className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono font-semibold text-slate-600 px-0.5 min-w-[32px] text-center">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomScale(prev => Math.min(1.3, Number((prev + 0.08).toFixed(2))))}
                      title="Aumentar Zoom"
                      className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        const fit = calculateFitScale();
                        setFitScale(fit);
                        setZoomScale(fit);
                      }}
                      title="Ajustar à Tela"
                      className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 rounded text-slate-700 cursor-pointer ml-0.5 flex items-center gap-0.5"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>Ajustar</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable Viewport Wrapper for A4 Canvas with Zero-Clip Responsive Geometry */}
              <div 
                ref={previewContainerRef}
                className="bg-slate-200/80 rounded-xl p-2 sm:p-5 overflow-x-auto overflow-y-auto max-h-[720px] sm:max-h-[780px] shadow-inner border border-slate-300/80 mt-3"
              >
                <div 
                  className="mx-auto relative transition-all duration-150"
                  style={{ 
                    width: `${Math.round(794 * zoomScale)}px`, 
                    height: `${Math.round(1123 * zoomScale)}px`,
                    minWidth: `${Math.round(794 * zoomScale)}px`,
                  }}
                >
                  <div 
                    style={{ 
                      width: '794px',
                      minHeight: '1123px',
                      transform: `scale(${zoomScale})`, 
                      transformOrigin: 'top left',
                      transition: 'transform 0.15s ease-out'
                    }}
                    className="absolute top-0 left-0 drop-shadow-2xl"
                  >
                    <ResumePreviewA4 data={resumeData} scale={zoomScale} />
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">● Modelo:</span>
                  <span className="font-semibold text-slate-800 capitalize">{resumeData.selectedTemplate}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportPdf}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Baixar PDF
                  </button>
                  <button
                    onClick={handleExportWord}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Word .doc
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
