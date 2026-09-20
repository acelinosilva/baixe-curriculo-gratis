export type TemplateStyle = 'classico' | 'moderno' | 'criativo' | 'minimalista' | 'profissional';

export type ExperienceLevel = 'primeiro-emprego' | 'estagio' | 'junior' | 'pleno' | 'senior' | 'lideranca' | 'transicao';

export type ProfessionalArea = 'geral' | 'ti' | 'administrativo' | 'vendas' | 'saude' | 'educacao' | 'atendimento';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  photoUrl?: string;
  showPhoto: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  items: string[];
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Básico' | 'Intermediário' | 'Avançado' | 'Fluente' | 'Nativo';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  roleOrTech?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

export interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  cause?: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  enabled: boolean;
  items: CustomSectionItem[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  projects?: ProjectItem[];
  volunteer?: VolunteerItem[];
  customSections?: CustomSection[];
  selectedTemplate: TemplateStyle;
  primaryColor: string;
  accentColor?: string;
  fontFamily: 'sans' | 'serif' | 'mono' | 'display' | 'geometric';
  fontSize: 'compact' | 'standard' | 'large';
  spacing: 'compact' | 'normal' | 'spacious';
  pageMargin: 'compact' | 'normal' | 'spacious';
  lineHeight: 'compact' | 'normal' | 'relaxed';
  headerAlignment: 'left' | 'center' | 'right';
  contentAlignment: 'left' | 'justify';
}

export interface TemplateSeoInfo {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1Title: string;
  searchVolumeEstimate?: string;
}

export interface TemplateCardInfo {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  style: TemplateStyle;
  format: 'Word e PDF' | 'PDF e Word' | 'Online e PDF';
  category: ProfessionalArea;
  level: ExperienceLevel;
  atsScore: number;
  popular?: boolean;
  downloadsCount: number;
  description: string;
  idealFor: string;
  tags: string[];
  thumbnailColor: string;
  seo: TemplateSeoInfo;
}

export interface AtsEvaluation {
  score: number;
  grade: 'Excelente' | 'Bom' | 'Precisa de Ajustes' | 'Crítico';
  passedChecks: { title: string; detail: string }[];
  warningChecks: { title: string; detail: string; recommendation: string }[];
  actionVerbsFound: string[];
  missingKeywordsSuggestions: string[];
}

export interface InterviewQuestionTip {
  id: string;
  category: 'comportamental' | 'tecnica' | 'salario' | 'perguntas-recrutador';
  question: string;
  whyTheyAsk: string;
  howToAnswer: string;
  exampleAnswer: string;
  mistakesToAvoid: string[];
}

export interface SupportArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  relatedTemplateSlug: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  datePublished?: string;
  author?: string;
}
