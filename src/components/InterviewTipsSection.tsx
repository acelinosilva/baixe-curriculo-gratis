import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Video, 
  CheckSquare, 
  Square, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Award,
  Sun,
  Eye,
  Mic,
  Laptop
} from 'lucide-react';
import { 
  starMethodSteps, 
  commonInterviewQuestions, 
  onlineInterviewTips, 
  preInterviewChecklist 
} from '../data/interviewTips';

export const InterviewTipsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'star' | 'perguntas' | 'online' | 'checklist'>('star');
  const [expandedQuestion, setExpandedQuestion] = useState<string>('q1');
  const [checkedItems, setCheckedItems] = useState<{ [index: number]: boolean }>({});

  // Practice STAR simulator state
  const [starInput, setStarInput] = useState({
    situation: '',
    task: '',
    action: '',
    result: ''
  });

  const toggleChecklist = (index: number) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="entrevistas" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            Guia Completo de Contratação
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Dicas Estratégicas para Entrevistas de Emprego
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Ter um currículo aprovado no ATS é o primeiro passo; passar na entrevista é o que garante a contratação. 
            Aprenda a estruturar respostas de alto impacto com o <strong>Método STAR</strong> e se destaque dos demais concorrentes.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('star')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'star'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>O Método STAR (Passo a Passo)</span>
          </button>

          <button
            onClick={() => setActiveTab('perguntas')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'perguntas'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Perguntas Mais Difíceis & Como Responder</span>
          </button>

          <button
            onClick={() => setActiveTab('online')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'online'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Entrevistas Online (Meet/Teams)</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Checklist 24h Antes</span>
          </button>
        </div>

        {/* TAB 1: THE STAR METHOD */}
        {activeTab === 'star' && (
          <div className="space-y-8 animate-in fade-in-50 max-w-5xl mx-auto">
            
            {/* 4 Pillars of STAR */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {starMethodSteps.map((step) => (
                <div 
                  key={step.step}
                  className="bg-slate-50 rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg mb-3 shadow-xs">
                      {step.step}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {step.letter}
                    </h3>
                    <div className="text-xs font-semibold text-emerald-700 mb-2">
                      {step.subtitle}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {step.description}
                    </p>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-700 italic">
                    {step.example}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive STAR Builder */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Simulador Prático: Monte sua Resposta STAR
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                Estruture uma Conquista Profissional para Contar ao Entrevistador
              </h3>
              <p className="text-xs text-slate-400 max-w-2xl">
                Preencha os campos abaixo com uma situação real da sua carreira para treinar antes da sua próxima entrevista.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    (S) Situação: Qual era o contexto inicial ou problema?
                  </label>
                  <input
                    type="text"
                    value={starInput.situation}
                    onChange={(e) => setStarInput(prev => ({ ...prev, situation: e.target.value }))}
                    placeholder="Ex: A equipe estava com atraso de 15 dias nas entregas..."
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    (T) Tarefa: Qual era o seu objetivo específico?
                  </label>
                  <input
                    type="text"
                    value={starInput.task}
                    onChange={(e) => setStarInput(prev => ({ ...prev, task: e.target.value }))}
                    placeholder="Ex: Fui encarregado de reorganizar a fila de chamados..."
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    (A) Ação: O que você fez concretamente?
                  </label>
                  <input
                    type="text"
                    value={starInput.action}
                    onChange={(e) => setStarInput(prev => ({ ...prev, action: e.target.value }))}
                    placeholder="Ex: Criei uma planilha automatizada e alinhei reuniões diárias de 10 min..."
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    (R) Resultado: Qual foi o número ou benefício final?
                  </label>
                  <input
                    type="text"
                    value={starInput.result}
                    onChange={(e) => setStarInput(prev => ({ ...prev, result: e.target.value }))}
                    placeholder="Ex: Zeramos a fila em 3 semanas e a satisfação subiu 28%."
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {(starInput.situation || starInput.task || starInput.action || starInput.result) && (
                <div className="mt-4 p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-200 space-y-1">
                  <div className="font-bold text-emerald-400">Sua fala pronta para a entrevista:</div>
                  <p className="italic leading-relaxed text-slate-300">
                    "{starInput.situation || '...'} Para resolver isso, {starInput.task || '...'} Minha abordagem foi {starInput.action || '...'} Como resultado direto, {starInput.result || '...'}"
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: COMMON QUESTIONS & PITFALLS */}
        {activeTab === 'perguntas' && (
          <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in-50">
            {commonInterviewQuestions.map((q) => {
              const isExpanded = expandedQuestion === q.id;
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                >
                  <button
                    onClick={() => setExpandedQuestion(isExpanded ? '' : q.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Pergunta Frequente
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        {q.question}
                      </h3>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-100 text-xs space-y-3.5 bg-slate-50/40">
                      <div>
                        <strong className="text-slate-800 font-bold block mb-0.5">Por que o recrutador pergunta isso:</strong>
                        <p className="text-slate-600">{q.whyTheyAsk}</p>
                      </div>

                      <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 text-emerald-950">
                        <strong className="font-bold block mb-1">Como responder estrategicamente:</strong>
                        <p className="leading-relaxed">{q.howToAnswer}</p>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-slate-800">
                        <strong className="font-bold text-slate-900 block mb-1">Exemplo de Resposta Modelo:</strong>
                        <p className="italic text-slate-700 leading-relaxed">{q.exampleAnswer}</p>
                      </div>

                      <div>
                        <strong className="text-rose-800 font-bold block mb-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                          Erros Fatais a Evitar:
                        </strong>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                          {q.mistakesToAvoid.map((mistake, i) => (
                            <li key={i}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: ONLINE INTERVIEWS TIPS */}
        {activeTab === 'online' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-in fade-in-50">
            {onlineInterviewTips.map((tip, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  {idx === 0 && <Sun className="w-5 h-5" />}
                  {idx === 1 && <Eye className="w-5 h-5" />}
                  {idx === 2 && <Mic className="w-5 h-5" />}
                  {idx === 3 && <Laptop className="w-5 h-5" />}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {tip.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tip.tip}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: 24H PRE-INTERVIEW CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="max-w-2xl mx-auto bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in-50">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Checklist Interativo de 24 Horas
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Marque os itens conforme for concluindo cada etapa de preparação.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              {preInterviewChecklist.map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-xs ${
                      isChecked 
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className={isChecked ? 'line-through text-slate-400' : ''}>{item}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 text-right text-xs text-slate-500">
              Progresso: <span className="font-bold text-emerald-700">{Object.values(checkedItems).filter(Boolean).length}</span> de {preInterviewChecklist.length} itens concluídos
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
