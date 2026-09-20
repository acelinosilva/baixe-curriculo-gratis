import React, { useState } from 'react';
import { 
  FolderGit2, 
  HeartHandshake, 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers,
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';
import { ResumeData, ProjectItem, VolunteerItem, CustomSection } from '../../types';

interface CustomSectionsManagerProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const CustomSectionsManager: React.FC<CustomSectionsManagerProps> = ({
  resumeData,
  setResumeData
}) => {
  const [activeAccordion, setActiveAccordion] = useState<'projetos' | 'voluntariado' | 'livre' | null>('projetos');
  const [newCustomTitle, setNewCustomTitle] = useState('');

  // ----------------------------------------------------
  // HANDLERS: PROJETOS
  // ----------------------------------------------------
  const addProject = () => {
    const newProj: ProjectItem = {
      id: 'proj-' + Date.now(),
      title: '',
      roleOrTech: '',
      link: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProj]
    }));
  };

  const updateProject = (id: string, field: keyof ProjectItem, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: (prev.projects || []).map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(p => p.id !== id)
    }));
  };

  // ----------------------------------------------------
  // HANDLERS: VOLUNTARIADO
  // ----------------------------------------------------
  const addVolunteer = () => {
    const newVol: VolunteerItem = {
      id: 'vol-' + Date.now(),
      organization: '',
      role: '',
      cause: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      volunteer: [...(prev.volunteer || []), newVol]
    }));
  };

  const updateVolunteer = (id: string, field: keyof VolunteerItem, value: string) => {
    setResumeData(prev => ({
      ...prev,
      volunteer: (prev.volunteer || []).map(v => v.id === id ? { ...v, [field]: value } : v)
    }));
  };

  const removeVolunteer = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      volunteer: (prev.volunteer || []).filter(v => v.id !== id)
    }));
  };

  // ----------------------------------------------------
  // HANDLERS: SEÇÃO LIVRE PERSONALIZADA
  // ----------------------------------------------------
  const addCustomSection = () => {
    if (!newCustomTitle.trim()) return;
    const newSection: CustomSection = {
      id: 'sec-' + Date.now(),
      title: newCustomTitle.trim(),
      enabled: true,
      items: [
        {
          id: 'sec-item-' + Date.now(),
          title: '',
          subtitle: '',
          date: '',
          description: ''
        }
      ]
    };
    setResumeData(prev => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSection]
    }));
    setNewCustomTitle('');
  };

  const toggleCustomSection = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    }));
  };

  const removeCustomSection = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: (prev.customSections || []).filter(s => s.id !== id)
    }));
  };

  const addCustomSectionItem = (sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            items: [
              ...s.items,
              {
                id: 'sec-item-' + Date.now(),
                title: '',
                subtitle: '',
                date: '',
                description: ''
              }
            ]
          };
        }
        return s;
      })
    }));
  };

  const updateCustomSectionItem = (sectionId: string, itemId: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            items: s.items.map(it => it.id === itemId ? { ...it, [field]: value } : it)
          };
        }
        return s;
      })
    }));
  };

  const removeCustomSectionItem = (sectionId: string, itemId: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            items: s.items.filter(it => it.id !== itemId)
          };
        }
        return s;
      })
    }));
  };

  return (
    <div className="space-y-4">
      {/* 1. Projetos Realizados & Portfólio */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          onClick={() => setActiveAccordion(activeAccordion === 'projetos' ? null : 'projetos')}
          className="w-full px-4 py-3.5 text-left flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
              <FolderGit2 className="w-3.5 h-3.5" />
            </span>
            <span>Projetos Realizados & Portfólio</span>
            <span className="text-[10px] text-slate-500 font-normal">
              ({(resumeData.projects || []).length} adicionado{(resumeData.projects || []).length !== 1 ? 's' : ''})
            </span>
          </span>
          {activeAccordion === 'projetos' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeAccordion === 'projetos' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <p className="text-slate-500 text-[11px]">
                Excelente para profissionais de TI, design, engenharia ou quem tem portfólio.
              </p>
              <button
                onClick={addProject}
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Projeto
              </button>
            </div>

            {(!resumeData.projects || resumeData.projects.length === 0) && (
              <div className="text-center py-5 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <p className="text-slate-500 mb-2">Nenhum projeto adicionado ainda.</p>
                <button
                  onClick={addProject}
                  className="text-xs bg-white text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg font-semibold cursor-pointer shadow-2xs hover:bg-blue-50"
                >
                  + Adicionar Primeiro Projeto
                </button>
              </div>
            )}

            {(resumeData.projects || []).map((proj, idx) => (
              <div key={proj.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-xs">Projeto #{idx + 1}</span>
                  <button
                    onClick={() => removeProject(proj.id)}
                    className="text-rose-500 hover:text-rose-700 flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Excluir
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium text-slate-700 block mb-0.5">Nome do Projeto *</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                      placeholder="Ex: Plataforma E-commerce Headless"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-700 block mb-0.5">Tecnologias / Seu Papel</label>
                    <input
                      type="text"
                      value={proj.roleOrTech || ''}
                      onChange={(e) => updateProject(proj.id, 'roleOrTech', e.target.value)}
                      placeholder="Ex: React, Node.js, Prisma, Tailwind"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="font-medium text-slate-700 block mb-0.5">Link / Repositório (Opcional)</label>
                    <input
                      type="text"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                      placeholder="github.com/seunome/projeto"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-700 block mb-0.5">Ano / Período</label>
                    <input
                      type="text"
                      value={proj.startDate || ''}
                      onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)}
                      placeholder="2024"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-0.5">Descrição & Conquistas do Projeto</label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    placeholder="Descreva o objetivo do projeto, métricas alcançadas ou impacto prático..."
                    className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Trabalho Voluntário & Causas */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          onClick={() => setActiveAccordion(activeAccordion === 'voluntariado' ? null : 'voluntariado')}
          className="w-full px-4 py-3.5 text-left flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 text-xs flex items-center justify-center font-bold">
              <HeartHandshake className="w-3.5 h-3.5" />
            </span>
            <span>Trabalho Voluntário & Causas Sociais</span>
            <span className="text-[10px] text-slate-500 font-normal">
              ({(resumeData.volunteer || []).length} adicionado{(resumeData.volunteer || []).length !== 1 ? 's' : ''})
            </span>
          </span>
          {activeAccordion === 'voluntariado' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeAccordion === 'voluntariado' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <p className="text-slate-500 text-[11px]">
                Valorizado por recrutadores para avaliar soft skills, empatia e trabalho em grupo.
              </p>
              <button
                onClick={addVolunteer}
                className="bg-rose-50 text-rose-700 hover:bg-rose-100 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Voluntariado
              </button>
            </div>

            {(!resumeData.volunteer || resumeData.volunteer.length === 0) && (
              <div className="text-center py-5 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <p className="text-slate-500 mb-2">Nenhum voluntariado adicionado ainda.</p>
                <button
                  onClick={addVolunteer}
                  className="text-xs bg-white text-rose-700 border border-rose-200 px-3 py-1.5 rounded-lg font-semibold cursor-pointer shadow-2xs hover:bg-rose-50"
                >
                  + Adicionar Trabalho Voluntário
                </button>
              </div>
            )}

            {(resumeData.volunteer || []).map((vol, idx) => (
              <div key={vol.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-xs">Voluntariado #{idx + 1}</span>
                  <button
                    onClick={() => removeVolunteer(vol.id)}
                    className="text-rose-500 hover:text-rose-700 flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Excluir
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium text-slate-700 block mb-0.5">Organização / ONG *</label>
                    <input
                      type="text"
                      value={vol.organization}
                      onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)}
                      placeholder="Ex: Cruz Vermelha Brasileira"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-700 block mb-0.5">Sua Função / Cargo</label>
                    <input
                      type="text"
                      value={vol.role}
                      onChange={(e) => updateVolunteer(vol.id, 'role', e.target.value)}
                      placeholder="Ex: Monitor Voluntário de Informática"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium text-slate-700 block mb-0.5">Causa Social</label>
                    <input
                      type="text"
                      value={vol.cause || ''}
                      onChange={(e) => updateVolunteer(vol.id, 'cause', e.target.value)}
                      placeholder="Ex: Educação de Crianças e Jovens"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-700 block mb-0.5">Período</label>
                    <input
                      type="text"
                      value={vol.startDate || ''}
                      onChange={(e) => updateVolunteer(vol.id, 'startDate', e.target.value)}
                      placeholder="Ex: 2023 – 2024"
                      className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-0.5">Descrição das Atividades</label>
                  <textarea
                    rows={2}
                    value={vol.description}
                    onChange={(e) => updateVolunteer(vol.id, 'description', e.target.value)}
                    placeholder="Descreva as principais ações realizadas e o impacto gerado..."
                    className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Seções Personalizadas Livres */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <button
          onClick={() => setActiveAccordion(activeAccordion === 'livre' ? null : 'livre')}
          className="w-full px-4 py-3.5 text-left flex items-center justify-between font-bold text-slate-900 text-xs sm:text-sm bg-white hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs flex items-center justify-center font-bold">
              <Layers className="w-3.5 h-3.5" />
            </span>
            <span>Seções Livres Personalizadas</span>
            <span className="text-[10px] text-slate-500 font-normal">
              ({(resumeData.customSections || []).length} criada{(resumeData.customSections || []).length !== 1 ? 's' : ''})
            </span>
          </span>
          {activeAccordion === 'livre' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {activeAccordion === 'livre' && (
          <div className="p-4 pt-1 border-t border-slate-100 space-y-4 text-xs">
            <p className="text-slate-500 text-[11px]">
              Crie qualquer seção com título customizado (ex: <strong>Publicações</strong>, <strong>Premiações</strong>, <strong>Palestras</strong> ou <strong>Interesses</strong>).
            </p>

            {/* Input para criar nova seção livre */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newCustomTitle}
                onChange={(e) => setNewCustomTitle(e.target.value)}
                placeholder="Ex: Publicações & Artigos, Prêmios..."
                className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:bg-white"
              />
              <button
                onClick={addCustomSection}
                disabled={!newCustomTitle.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold px-3 py-2 rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Criar Seção
              </button>
            </div>

            {/* Lista de seções criadas */}
            {(resumeData.customSections || []).map((sec) => (
              <div key={sec.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleCustomSection(sec.id)}
                      title={sec.enabled ? 'Ocultar no currículo' : 'Mostrar no currículo'}
                      className="text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      {sec.enabled ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                    </button>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{sec.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addCustomSectionItem(sec.id)}
                      className="text-xs text-purple-700 font-semibold hover:underline cursor-pointer"
                    >
                      + Adicionar Item
                    </button>
                    <button
                      onClick={() => removeCustomSection(sec.id)}
                      className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      title="Excluir Seção Inteira"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {sec.items.map((it, idx) => (
                  <div key={it.id} className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-slate-700">Item #{idx + 1}</span>
                      <button
                        onClick={() => removeCustomSectionItem(sec.id, it.id)}
                        className="text-rose-500 text-[11px] hover:underline cursor-pointer"
                      >
                        Remover
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={it.title}
                        onChange={(e) => updateCustomSectionItem(sec.id, it.id, 'title', e.target.value)}
                        placeholder="Título do Item (ex: Artigo Publicado no Congresso)"
                        className="p-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none"
                      />
                      <input
                        type="text"
                        value={it.subtitle || ''}
                        onChange={(e) => updateCustomSectionItem(sec.id, it.id, 'subtitle', e.target.value)}
                        placeholder="Subtítulo ou Veículo (ex: Revista Científica ABC)"
                        className="p-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={it.date || ''}
                        onChange={(e) => updateCustomSectionItem(sec.id, it.id, 'date', e.target.value)}
                        placeholder="Data / Ano (ex: 2024)"
                        className="p-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none"
                      />
                      <input
                        type="text"
                        value={it.description || ''}
                        onChange={(e) => updateCustomSectionItem(sec.id, it.id, 'description', e.target.value)}
                        placeholder="Breve descrição ou link de acesso"
                        className="sm:col-span-2 p-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
