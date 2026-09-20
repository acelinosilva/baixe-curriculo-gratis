import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Globe, 
  Calendar, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  Languages,
  FolderGit2,
  HeartHandshake,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ResumeData } from '../../types';

interface ResumePreviewA4Props {
  data: ResumeData;
  scale?: number;
}

export const ResumePreviewA4: React.FC<ResumePreviewA4Props> = ({ data, scale = 1 }) => {
  const { 
    personalInfo, 
    summary, 
    experiences, 
    education, 
    skills, 
    languages, 
    certifications, 
    projects = [],
    volunteer = [],
    customSections = [],
    selectedTemplate, 
    primaryColor = '#0f766e', 
    fontFamily = 'sans', 
    fontSize = 'standard',
    spacing = 'normal',
    pageMargin = 'normal',
    lineHeight = 'normal',
    headerAlignment = 'left',
    contentAlignment = 'left'
  } = data;

  // Typography font class
  const fontClass = 
    fontFamily === 'serif' ? 'font-serif' : 
    fontFamily === 'mono' ? 'font-mono' : 
    fontFamily === 'display' ? 'font-serif tracking-tight' : 
    fontFamily === 'geometric' ? 'font-sans tracking-wide' : 'font-sans';

  // Base font size
  const baseSizeClass = 
    fontSize === 'compact' ? 'text-[11.5px]' : 
    fontSize === 'large' ? 'text-[14px]' : 'text-[12.5px]';

  // Section Spacing
  const spacingClass = 
    spacing === 'compact' ? 'space-y-2.5' : 
    spacing === 'spacious' ? 'space-y-4.5' : 'space-y-3.5';

  // Margins
  const marginClass = 
    pageMargin === 'compact' ? 'p-8' : 
    pageMargin === 'spacious' ? 'p-14' : 'p-11';

  // Line Height
  const leadClass = 
    lineHeight === 'compact' ? 'leading-snug' : 
    lineHeight === 'relaxed' ? 'leading-relaxed' : 'leading-normal';

  // Content alignment
  const textAlignClass = contentAlignment === 'justify' ? 'text-justify' : 'text-left';

  // Header alignment helper
  const headerAlignStyle = 
    headerAlignment === 'center' ? 'text-center items-center justify-center' :
    headerAlignment === 'right' ? 'text-right items-end justify-end' :
    'text-left items-start justify-start';

  const headerFlexJustify = 
    headerAlignment === 'center' ? 'justify-center' :
    headerAlignment === 'right' ? 'justify-end' :
    'justify-start';

  // ====================================================
  // TEMPLATE 1: CLÁSSICO / TRADICIONAL (100% ATS)
  // ====================================================
  if (selectedTemplate === 'classico') {
    return (
      <div 
        id="resume-a4-document"
        className={`w-[794px] min-h-[1123px] bg-white text-slate-900 ${marginClass} shadow-xl mx-auto ${fontClass} ${baseSizeClass} ${leadClass} flex flex-col break-words [overflow-wrap:anywhere]`}
      >
        <div className={spacingClass}>
          {/* Header */}
          <div className={`pb-3.5 border-b-2 border-slate-900 flex flex-col ${headerAlignStyle}`}>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-slate-900">
              {personalInfo.fullName || 'Seu Nome Completo'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-700 mt-1 uppercase">
                {personalInfo.jobTitle}
              </p>
            )}
            
            <div className={`flex flex-wrap ${headerFlexJustify} gap-x-3.5 gap-y-1 text-xs text-slate-600 mt-2`}>
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.email && <span>• {personalInfo.email}</span>}
              {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
              {personalInfo.website && <span>• {personalInfo.website}</span>}
            </div>
          </div>

          {/* Resumo */}
          {summary && (
            <div className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                Objetivo & Síntese Profissional
              </h2>
              <p className={`text-slate-700 ${textAlignClass}`}>
                {summary}
              </p>
            </div>
          )}

          {/* Experiência */}
          {experiences && experiences.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                Experiência Profissional
              </h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{exp.role}</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {exp.startDate} – {exp.current ? 'Presente' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 italic">
                    <span>{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.description && <p className={`text-slate-700 mt-0.5 ${textAlignClass}`}>{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 mt-1 pl-1">
                      {exp.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Formação */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                Formação Acadêmica
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">
                      {edu.degree} em {edu.fieldOfStudy}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {edu.startDate} – {edu.current ? 'Em andamento' : edu.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{edu.institution}</p>
                  {edu.description && <p className="text-xs text-slate-500">{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Habilidades */}
          {skills && skills.length > 0 && (
            <div className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                Competências & Habilidades
              </h2>
              <p className="text-slate-700 leading-normal">
                {skills.join('  •  ')}
              </p>
            </div>
          )}

          {/* Projetos Personalizados */}
          {projects && projects.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                Projetos Relevantes
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    {proj.startDate && (
                      <span className="text-xs text-slate-500">{proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}</span>
                    )}
                  </div>
                  {proj.roleOrTech && <p className="text-xs text-slate-600 italic">{proj.roleOrTech}</p>}
                  {proj.description && <p className={`text-slate-700 ${textAlignClass}`}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Voluntariado */}
          {volunteer && volunteer.length > 0 && (
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                Trabalho Voluntário & Causas
              </h2>
              {volunteer.map((vol) => (
                <div key={vol.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{vol.role} • {vol.organization}</span>
                    <span className="text-xs text-slate-500">{vol.startDate} {vol.endDate ? `– ${vol.endDate}` : ''}</span>
                  </div>
                  {vol.cause && <span className="text-xs text-slate-500 italic">Causa: {vol.cause}</span>}
                  {vol.description && <p className={`text-slate-700 ${textAlignClass}`}>{vol.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Seções Customizadas Adicionais */}
          {customSections && customSections.filter(s => s.enabled).map((sec) => (
            <div key={sec.id} className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5">
                {sec.title}
              </h2>
              {sec.items && sec.items.map((it) => (
                <div key={it.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{it.title}</span>
                    {it.date && <span className="text-xs text-slate-500">{it.date}</span>}
                  </div>
                  {it.subtitle && <p className="text-xs text-slate-600 italic">{it.subtitle}</p>}
                  {it.description && <p className={`text-slate-700 ${textAlignClass}`}>{it.description}</p>}
                </div>
              ))}
            </div>
          ))}

          {/* Idiomas & Certificações */}
          {(languages.length > 0 || certifications.length > 0) && (
            <div className="grid grid-cols-2 gap-4 pt-1">
              {languages.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Idiomas
                  </h3>
                  <ul className="text-xs text-slate-700 space-y-0.5">
                    {languages.map((l) => (
                      <li key={l.id}>• {l.language}: <span className="font-medium text-slate-600">{l.proficiency}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              {certifications.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-1">
                    Certificações
                  </h3>
                  <ul className="text-xs text-slate-700 space-y-0.5">
                    {certifications.map((c) => (
                      <li key={c.id}>• {c.name} ({c.issuer}, {c.year})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    );
  }

  // ====================================================
  // TEMPLATE 2: MODERNO EXECUTIVO (COM ACENTOS DE COR)
  // ====================================================
  if (selectedTemplate === 'moderno') {
    return (
      <div 
        id="resume-a4-document"
        className={`w-[794px] min-h-[1123px] bg-white text-slate-900 ${marginClass} shadow-xl mx-auto ${fontClass} ${baseSizeClass} ${leadClass} flex flex-col break-words [overflow-wrap:anywhere]`}
      >
        <div className={spacingClass}>
          {/* Header */}
          <div className={`pb-4 border-b-2 flex flex-col ${headerAlignStyle}`} style={{ borderColor: primaryColor }}>
            <div className={`w-full flex items-start gap-4 ${headerAlignment === 'center' ? 'flex-col items-center' : headerAlignment === 'right' ? 'flex-row-reverse justify-between' : 'justify-between'}`}>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {personalInfo.fullName || 'Seu Nome Completo'}
                </h1>
                <p className="text-sm sm:text-base font-semibold mt-0.5" style={{ color: primaryColor }}>
                  {personalInfo.jobTitle || 'Cargo / Especialidade Alvo'}
                </p>
              </div>

              {personalInfo.showPhoto && personalInfo.photoUrl && (
                <img 
                  src={personalInfo.photoUrl} 
                  alt={personalInfo.fullName} 
                  className="w-18 h-18 rounded-xl object-cover border-2 border-slate-200 shadow-xs"
                />
              )}
            </div>

            <div className={`flex flex-wrap ${headerFlexJustify} gap-x-4 gap-y-1.5 text-xs text-slate-600 mt-2.5`}>
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {personalInfo.website}
                </span>
              )}
            </div>
          </div>

          {/* Resumo */}
          {summary && (
            <div className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: primaryColor }}></span>
                Resumo Profissional
              </h2>
              <p className={`text-slate-700 ${textAlignClass}`}>
                {summary}
              </p>
            </div>
          )}

          {/* Experiência */}
          {experiences && experiences.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: primaryColor }}></span>
                Experiência Profissional
              </h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{exp.role}</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {exp.startDate} – {exp.current ? 'Presente' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-medium" style={{ color: primaryColor }}>
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-slate-500 font-normal">{exp.location}</span>}
                  </div>
                  {exp.description && <p className={`text-slate-700 mt-0.5 ${textAlignClass}`}>{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1 mt-1">
                      {exp.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projetos Realizados */}
          {projects && projects.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: primaryColor }}></span>
                Projetos & Entregas Destacadas
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    {proj.startDate && (
                      <span className="text-xs text-slate-500">{proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}</span>
                    )}
                  </div>
                  {proj.roleOrTech && <p className="text-xs font-medium" style={{ color: primaryColor }}>{proj.roleOrTech}</p>}
                  {proj.description && <p className={`text-slate-700 ${textAlignClass}`}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Formação */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: primaryColor }}></span>
                Formação Acadêmica
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{edu.degree} em {edu.fieldOfStudy}</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {edu.startDate} – {edu.current ? 'Em andamento' : edu.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          )}

          {/* Voluntariado */}
          {volunteer && volunteer.length > 0 && (
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: primaryColor }}></span>
                Trabalho Voluntário
              </h2>
              {volunteer.map((vol) => (
                <div key={vol.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{vol.role} • {vol.organization}</span>
                    <span className="text-xs text-slate-500">{vol.startDate} {vol.endDate ? `– ${vol.endDate}` : ''}</span>
                  </div>
                  {vol.description && <p className={`text-slate-700 ${textAlignClass}`}>{vol.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Seções Customizadas */}
          {customSections && customSections.filter(s => s.enabled).map((sec) => (
            <div key={sec.id} className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: primaryColor }}></span>
                {sec.title}
              </h2>
              {sec.items && sec.items.map((it) => (
                <div key={it.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{it.title}</span>
                    {it.date && <span className="text-xs text-slate-500">{it.date}</span>}
                  </div>
                  {it.subtitle && <p className="text-xs font-medium" style={{ color: primaryColor }}>{it.subtitle}</p>}
                  {it.description && <p className={`text-slate-700 ${textAlignClass}`}>{it.description}</p>}
                </div>
              ))}
            </div>
          ))}

          {/* Habilidades & Tecnologias */}
          {skills && skills.length > 0 && (
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: primaryColor }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: primaryColor }}></span>
                Competências & Ferramentas
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-2 py-0.5 rounded-md font-medium border"
                    style={{ 
                      borderColor: `${primaryColor}40`,
                      backgroundColor: `${primaryColor}10`,
                      color: primaryColor
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas & Cursos */}
          {(languages.length > 0 || certifications.length > 0) && (
            <div className="grid grid-cols-2 gap-4 pt-1 border-t border-slate-100">
              {languages.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>Idiomas</h3>
                  <ul className="text-xs text-slate-700 space-y-0.5">
                    {languages.map((l) => (
                      <li key={l.id}>• {l.language}: <span className="font-semibold text-slate-900">{l.proficiency}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {certifications.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: primaryColor }}>Certificações</h3>
                  <ul className="text-xs text-slate-700 space-y-0.5">
                    {certifications.map((c) => (
                      <li key={c.id}>• {c.name} ({c.issuer})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    );
  }

  // ====================================================
  // TEMPLATE 3: CRIATIVO COM BARRA LATERAL (2 COLUNAS)
  // ====================================================
  if (selectedTemplate === 'criativo') {
    return (
      <div 
        id="resume-a4-document"
        className={`w-[794px] min-h-[1123px] bg-white text-slate-900 shadow-xl mx-auto ${fontClass} ${baseSizeClass} ${leadClass} flex break-words [overflow-wrap:anywhere]`}
      >
        {/* Coluna Lateral */}
        <div 
          className="w-[260px] p-8 text-white flex flex-col"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="space-y-5">
            {/* Foto opcional */}
            {personalInfo.showPhoto && personalInfo.photoUrl && (
              <div className="flex justify-center">
                <img 
                  src={personalInfo.photoUrl} 
                  alt={personalInfo.fullName} 
                  className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-md"
                />
              </div>
            )}

            {/* Contato */}
            <div className="space-y-2 text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1">
                Contato
              </h3>
              <div className="space-y-1.5 text-white/90">
                {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-white/70" /> {personalInfo.phone}</div>}
                {personalInfo.email && <div className="flex items-center gap-1.5 break-all"><Mail className="w-3 h-3 text-white/70" /> {personalInfo.email}</div>}
                {personalInfo.location && <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-white/70" /> {personalInfo.location}</div>}
                {personalInfo.linkedin && <div className="flex items-center gap-1.5 break-all"><Linkedin className="w-3 h-3 text-white/70" /> {personalInfo.linkedin}</div>}
                {personalInfo.website && <div className="flex items-center gap-1.5 break-all"><Globe className="w-3 h-3 text-white/70" /> {personalInfo.website}</div>}
              </div>
            </div>

            {/* Competências */}
            {skills && skills.length > 0 && (
              <div className="space-y-2 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1">
                  Habilidades
                </h3>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-white/20 text-white text-[11px] px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <div className="space-y-2 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1">
                  Idiomas
                </h3>
                <ul className="space-y-1 text-white/90">
                  {languages.map((l) => (
                    <li key={l.id}>• {l.language}: <span className="font-semibold text-white">{l.proficiency}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cursos */}
            {certifications && certifications.length > 0 && (
              <div className="space-y-2 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/70 border-b border-white/20 pb-1">
                  Certificados
                </h3>
                <ul className="space-y-1 text-white/80 text-[11px]">
                  {certifications.map((c) => (
                    <li key={c.id}>• {c.name} ({c.issuer})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Coluna Principal */}
        <div className={`flex-1 p-9 flex flex-col ${spacingClass}`}>
          <div className={spacingClass}>
            {/* Header da Coluna Principal */}
            <div className={`pb-3 border-b border-slate-200 flex flex-col ${headerAlignStyle}`}>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {personalInfo.fullName || 'Seu Nome'}
              </h1>
              <p className="text-sm font-semibold tracking-wide mt-0.5 uppercase" style={{ color: primaryColor }}>
                {personalInfo.jobTitle || 'Cargo Pretendido'}
              </p>
            </div>

            {/* Resumo */}
            {summary && (
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Perfil Profissional
                </h2>
                <p className={`text-slate-700 ${textAlignClass}`}>
                  {summary}
                </p>
              </div>
            )}

            {/* Experiências */}
            {experiences && experiences.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Experiência Profissional
                </h2>
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{exp.role}</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {exp.startDate} – {exp.current ? 'Presente' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{exp.company} {exp.location && `• ${exp.location}`}</p>
                    {exp.description && <p className={`text-slate-700 mt-0.5 ${textAlignClass}`}>{exp.description}</p>}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1 mt-0.5">
                        {exp.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Projetos */}
            {projects && projects.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Projetos Relevantes
                </h2>
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{proj.title}</span>
                      {proj.startDate && <span className="text-xs text-slate-500">{proj.startDate}</span>}
                    </div>
                    {proj.roleOrTech && <p className="text-xs font-medium" style={{ color: primaryColor }}>{proj.roleOrTech}</p>}
                    {proj.description && <p className={`text-slate-700 ${textAlignClass}`}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Formação */}
            {education && education.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Formação Acadêmica
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{edu.degree} em {edu.fieldOfStudy}</span>
                      <span className="text-xs text-slate-500">{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <p className="text-xs text-slate-600">{edu.institution}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Voluntariado */}
            {volunteer && volunteer.length > 0 && (
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Voluntariado
                </h2>
                {volunteer.map((vol) => (
                  <div key={vol.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{vol.role} • {vol.organization}</span>
                      <span className="text-xs text-slate-500">{vol.startDate}</span>
                    </div>
                    {vol.description && <p className={`text-slate-700 ${textAlignClass}`}>{vol.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Seções Customizadas */}
            {customSections && customSections.filter(s => s.enabled).map((sec) => (
              <div key={sec.id} className="space-y-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {sec.title}
                </h2>
                {sec.items && sec.items.map((it) => (
                  <div key={it.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{it.title}</span>
                      {it.date && <span className="text-xs text-slate-500">{it.date}</span>}
                    </div>
                    {it.subtitle && <p className="text-xs text-slate-600 italic">{it.subtitle}</p>}
                    {it.description && <p className={`text-slate-700 ${textAlignClass}`}>{it.description}</p>}
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // ====================================================
  // TEMPLATE 4: MINIMALISTA SUÍÇO (100% P&B E ESPAÇOSO)
  // ====================================================
  if (selectedTemplate === 'minimalista') {
    return (
      <div 
        id="resume-a4-document"
        className={`w-[794px] min-h-[1123px] bg-white text-slate-900 ${marginClass} shadow-xl mx-auto font-sans ${baseSizeClass} ${leadClass} flex flex-col break-words [overflow-wrap:anywhere]`}
      >
        <div className={spacingClass}>
          {/* Minimalist Header */}
          <div className={`pb-5 border-b border-slate-200 flex flex-col ${headerAlignStyle}`}>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">
              {personalInfo.fullName || 'Seu Nome'}
            </h1>
            <p className="text-xs font-medium tracking-widest text-slate-500 mt-1 uppercase">
              {personalInfo.jobTitle || 'Cargo Pretendido'}
            </p>
            <div className={`flex flex-wrap ${headerFlexJustify} gap-x-4 gap-y-1 text-xs text-slate-500 mt-2 font-mono`}>
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>/ {personalInfo.phone}</span>}
              {personalInfo.location && <span>/ {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>/ {personalInfo.linkedin}</span>}
            </div>
          </div>

          {/* Resumo */}
          {summary && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Sobre
              </div>
              <div className={`col-span-9 text-slate-700 ${textAlignClass}`}>
                {summary}
              </div>
            </div>
          )}

          {/* Experiência */}
          {experiences && experiences.length > 0 && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Carreira
              </div>
              <div className="col-span-9 space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-slate-900">{exp.role}</span>
                      <span className="text-xs text-slate-400 font-mono">
                        {exp.startDate} – {exp.current ? 'Hoje' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{exp.company} {exp.location && `• ${exp.location}`}</p>
                    {exp.description && <p className={`text-slate-700 mt-0.5 ${textAlignClass}`}>{exp.description}</p>}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 mt-0.5 pl-1">
                        {exp.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projetos */}
          {projects && projects.length > 0 && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Projetos
              </div>
              <div className="col-span-9 space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-slate-900">{proj.title}</span>
                      {proj.startDate && <span className="text-xs text-slate-400 font-mono">{proj.startDate}</span>}
                    </div>
                    {proj.roleOrTech && <p className="text-xs text-slate-500 font-mono">{proj.roleOrTech}</p>}
                    {proj.description && <p className={`text-slate-700 ${textAlignClass}`}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formação */}
          {education && education.length > 0 && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Educação
              </div>
              <div className="col-span-9 space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <span className="font-semibold text-slate-900">{edu.degree} em {edu.fieldOfStudy}</span>
                      <p className="text-xs text-slate-500">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Voluntariado */}
          {volunteer && volunteer.length > 0 && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Voluntariado
              </div>
              <div className="col-span-9 space-y-1.5">
                {volunteer.map((vol) => (
                  <div key={vol.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-slate-900">{vol.role} • {vol.organization}</span>
                      <span className="text-xs text-slate-400 font-mono">{vol.startDate}</span>
                    </div>
                    {vol.description && <p className={`text-slate-700 ${textAlignClass}`}>{vol.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seções Customizadas */}
          {customSections && customSections.filter(s => s.enabled).map((sec) => (
            <div key={sec.id} className="grid grid-cols-12 gap-4">
              <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                {sec.title}
              </div>
              <div className="col-span-9 space-y-1.5">
                {sec.items && sec.items.map((it) => (
                  <div key={it.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-slate-900">{it.title}</span>
                      {it.date && <span className="text-xs text-slate-400 font-mono">{it.date}</span>}
                    </div>
                    {it.subtitle && <p className="text-xs text-slate-500">{it.subtitle}</p>}
                    {it.description && <p className={`text-slate-700 ${textAlignClass}`}>{it.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Skills
              </div>
              <div className="col-span-9 text-slate-700 leading-normal">
                {skills.join('  /  ')}
              </div>
            </div>
          )}

          {/* Idiomas & Cursos */}
          {(languages.length > 0 || certifications.length > 0) && (
            <div className="grid grid-cols-12 gap-4 pt-2 border-t border-slate-100">
              <div className="col-span-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Outros
              </div>
              <div className="col-span-9 grid grid-cols-2 gap-4 text-xs text-slate-600">
                {languages.length > 0 && (
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">Idiomas:</span>
                    {languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}
                  </div>
                )}
                {certifications.length > 0 && (
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">Certificações:</span>
                    {certifications.map(c => `${c.name} - ${c.issuer}`).join('; ')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    );
  }

  // ====================================================
  // TEMPLATE 5: PROFISSIONAL / GESTÃO EXECUTIVA
  // ====================================================
  return (
    <div 
      id="resume-a4-document"
      className={`w-[794px] min-h-[1123px] bg-white text-slate-900 ${marginClass} shadow-xl mx-auto font-serif ${baseSizeClass} ${leadClass} flex flex-col break-words [overflow-wrap:anywhere]`}
    >
      <div className={spacingClass}>
        {/* Header nobre com faixa colorida */}
        <div className={`border-b-2 pb-4 flex flex-col ${headerAlignStyle}`} style={{ borderColor: primaryColor }}>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {personalInfo.fullName || 'Seu Nome Completo'}
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase mt-1" style={{ color: primaryColor }}>
            {personalInfo.jobTitle || 'Cargo Executivo Pretendido'}
          </p>
          <div className={`flex flex-wrap ${headerFlexJustify} gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-sans`}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            {personalInfo.website && <span>• {personalInfo.website}</span>}
          </div>
        </div>

        {/* Resumo */}
        {summary && (
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Perfil & Escopo Executivo
            </h2>
            <p className={`text-slate-700 ${textAlignClass}`}>
              {summary}
            </p>
          </div>
        )}

        {/* Experiência */}
        {experiences && experiences.length > 0 && (
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Trajetória Profissional
            </h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{exp.role}</span>
                  <span className="text-xs text-slate-500 font-sans">
                    {exp.startDate} – {exp.current ? 'Presente' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 italic">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                {exp.description && <p className={`text-slate-700 mt-0.5 ${textAlignClass}`}>{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 mt-1 pl-1">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projetos */}
        {projects && projects.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Projetos & Liderança
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{proj.title}</span>
                  {proj.startDate && <span className="text-xs text-slate-500 font-sans">{proj.startDate}</span>}
                </div>
                {proj.roleOrTech && <p className="text-xs text-slate-600 italic">{proj.roleOrTech}</p>}
                {proj.description && <p className={`text-slate-700 ${textAlignClass}`}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Formação */}
        {education && education.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Formação Acadêmica & Pós-Graduações
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree} em {edu.fieldOfStudy}</span>
                  <p className="text-slate-600">{edu.institution}</p>
                </div>
                <span className="text-slate-500 font-sans">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        )}

        {/* Voluntariado */}
        {volunteer && volunteer.length > 0 && (
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Atuação Comunitária & Voluntariado
            </h2>
            {volunteer.map((vol) => (
              <div key={vol.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{vol.role} • {vol.organization}</span>
                  <span className="text-xs text-slate-500 font-sans">{vol.startDate}</span>
                </div>
                {vol.description && <p className={`text-slate-700 ${textAlignClass}`}>{vol.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Seções Customizadas */}
        {customSections && customSections.filter(s => s.enabled).map((sec) => (
          <div key={sec.id} className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              {sec.title}
            </h2>
            {sec.items && sec.items.map((it) => (
              <div key={it.id} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{it.title}</span>
                  {it.date && <span className="text-xs text-slate-500 font-sans">{it.date}</span>}
                </div>
                {it.subtitle && <p className="text-xs text-slate-600 italic">{it.subtitle}</p>}
                {it.description && <p className={`text-slate-700 ${textAlignClass}`}>{it.description}</p>}
              </div>
            ))}
          </div>
        ))}

        {/* Competências Estratégicas */}
        {skills && skills.length > 0 && (
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Competências & Tecnologias
            </h2>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium font-sans"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Cursos & Idiomas */}
        {(certifications.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-2 gap-4 text-xs pt-1 border-t border-slate-100">
            {certifications.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-slate-800 mb-1">Certificações</h3>
                <ul className="space-y-0.5 text-slate-700 font-sans">
                  {certifications.map(c => (
                    <li key={c.id}>• {c.name} ({c.issuer})</li>
                  ))}
                </ul>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-slate-800 mb-1">Idiomas</h3>
                <ul className="space-y-0.5 text-slate-700 font-sans">
                  {languages.map(l => (
                    <li key={l.id}>• {l.language}: {l.proficiency}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
