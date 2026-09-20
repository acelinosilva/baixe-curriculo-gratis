import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Check, 
  HelpCircle, 
  Copy, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { ResumeData } from '../types';
import { evaluateResumeATS } from '../utils/atsChecker';
import { generateCleanAtsText } from '../utils/pdfExport';

interface AtsSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onApplyImprovement?: (field: string, val: any) => void;
}

export const AtsSimulatorModal: React.FC<AtsSimulatorModalProps> = ({
  isOpen,
  onClose,
  resumeData
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const evaluation = evaluateResumeATS(resumeData);

  const handleCopyAts = () => {
    const text = generateCleanAtsText(resumeData);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 55) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Simulador & Verificador de Triagem ATS
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Diagnóstico de Compatibilidade com Robôs de Vagas
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Análise baseada nos algoritmos de triagem da Gupy, Kenoby, Workday, Solides e Vagas.com.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Banner */}
        <div className="my-5 p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-black shadow-xs ${getScoreColor(evaluation.score)}`}>
              <span className="text-3xl leading-none">{evaluation.score}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">Pontos</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Classificação Geral:
              </div>
              <h4 className="text-lg font-black text-slate-900">
                {evaluation.grade} para Sistemas ATS
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 max-w-md">
                {evaluation.score >= 90 
                  ? 'Excelente! Seu currículo possui todos os campos fundamentais com estrutura semântica limpa para passar nos filtros preliminares.'
                  : 'Seu currículo tem potencial, mas alguns pequenos ajustes podem aumentar suas chances de ser chamado para a entrevista.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyAts}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shrink-0 shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Texto Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copiar Texto Limpo ATS</span>
              </>
            )}
          </button>
        </div>

        {/* Checks Breakdown */}
        <div className="space-y-4">
          {/* Passed Checks */}
          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Critérios Aprovados ({evaluation.passedChecks.length})
            </h5>
            <div className="space-y-1.5">
              {evaluation.passedChecks.map((check, idx) => (
                <div key={idx} className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-950 font-bold">{check.title}:</strong>{' '}
                    <span className="text-emerald-900">{check.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warning Checks with Recommendations */}
          {evaluation.warningChecks.length > 0 && (
            <div>
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Oportunidades de Melhoria ({evaluation.warningChecks.length})
              </h5>
              <div className="space-y-2">
                {evaluation.warningChecks.map((w, idx) => (
                  <div key={idx} className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs space-y-1">
                    <div className="font-bold text-amber-950 flex items-center gap-1.5">
                      <span>{w.title}</span>
                    </div>
                    <p className="text-amber-900">{w.detail}</p>
                    <div className="pt-1 text-[11px] text-amber-800 font-medium">
                      💡 <strong>Como corrigir:</strong> {w.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Verbs Analysis */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Verbos de Ação Orientados a Resultados Detectados:
            </h5>
            {evaluation.actionVerbsFound.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {evaluation.actionVerbsFound.map((v, i) => (
                  <span key={i} className="text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-md">
                    ✓ {v}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Nenhum verbo de ação forte detectado nas experiências. Experimente adicionar verbos como: <em>"Liderei", "Desenvolvi", "Otimizei", "Implementei", "Reduzi"</em>.
              </p>
            )}
          </div>

          {/* Missing ATS Keywords suggestions */}
          {evaluation.missingKeywordsSuggestions.length > 0 && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-800 block mb-1">
                Palavras-chave recomendadas para adicionar às suas habilidades:
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {evaluation.missingKeywordsSuggestions.map((s, i) => (
                  <span key={i} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                    + {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-5 mt-5 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Continuar Editando Currículo
          </button>
        </div>

      </div>
    </div>
  );
};
