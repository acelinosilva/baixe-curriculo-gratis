import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Os modelos do Baixe Currículo Grátis são realmente 100% gratuitos?',
      a: 'Sim! Todos os modelos disponíveis no Baixe Currículo Grátis (BCG) são 100% gratuitos para personalizar no editor online e baixar tanto em formato PDF de alta resolução quanto em Word (.doc). Não há cobrança oculta, nem pedido de cartão de crédito.'
    },
    {
      q: 'O que significa um currículo ser "Compatível com ATS"?',
      a: 'ATS (Applicant Tracking System) são softwares de triagem automática como Gupy, Kenoby, Workday e Solides que as empresas usam para filtrar currículos antes de um humano ler. Se o documento contiver tabelas complexas, desenhos pesados ou textos em imagem, o robô não consegue ler suas informações e descarta seu currículo. Nossos modelos possuem código limpo, semântica correta e fontes legíveis para garantir nota máxima na triagem.'
    },
    {
      q: 'Preciso criar conta ou fazer login para baixar meu currículo?',
      a: 'Não! Nossa arquitetura foi projetada para eliminar qualquer barreira. Você entra, escolhe o modelo, preenche seus dados e baixa instantaneamente em segundos.'
    },
    {
      q: 'Meus dados pessoais (nome, telefone, e-mail) ficam salvos em algum servidor?',
      a: 'Não. Para garantir sua total privacidade e conformidade rigorosa com a LGPD (Lei Geral de Proteção de Dados), todo o preenchimento e a geração do PDF ocorrem 100% no seu próprio navegador de internet. Nenhum dado é transmitido para nossos servidores.'
    },
    {
      q: 'Qual a diferença entre baixar em PDF ou em Word (.doc)?',
      a: 'O PDF é o formato padrão mais recomendado para enviar por e-mail, WhatsApp ou anexar em portais de vagas, pois mantém a formatação idêntica em qualquer celular ou computador. O arquivo Word (.doc) permite que você edite o texto mais tarde no Microsoft Word, LibreOffice ou Google Docs caso queira fazer alterações no futuro.'
    },
    {
      q: 'Devo colocar foto no currículo?',
      a: 'No Brasil, a foto só é recomendada se a vaga exigir explicitamente (como áreas de recepção, teatro, eventos ou aviação comercial). Para funções corporativas, administrativas e de TI, os recrutadores e robôs ATS preferem currículos sem foto para focar puramente em competências e evitar vieses inconscientes. Por isso, em nossos modelos a foto é opcional.'
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md mb-2 uppercase tracking-wide">
            Tire Suas Dúvidas
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Perguntas Frequentes sobre o Baixe Currículo Grátis
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Respostas transparentes sobre funcionamento, formatos, compatibilidade e privacidade.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
