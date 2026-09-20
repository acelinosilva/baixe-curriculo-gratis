import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Copy, 
  Check, 
  HelpCircle, 
  MessageSquare,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onNavigateToSection,
}) => {
  const recipientEmail = 'acewebdf@gmail.com';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Dúvida sobre os Modelos',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessageBody, setCopiedMessageBody] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic SEO Injection for Contact Page
  useEffect(() => {
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute('content') || '';
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const originalOgTitle = ogTitle?.getAttribute('content') || '';
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const originalOgDesc = ogDesc?.getAttribute('content') || '';

    const pageTitle = 'Fale Conosco | Baixe Currículo Grátis – Contato e Suporte';
    const pageDesc = 'Entre em contato com a equipe do Baixe Currículo Grátis pelo e-mail acewebdf@gmail.com. Tire dúvidas, envie sugestões de modelos ou solicite suporte.';

    document.title = pageTitle;
    if (metaDesc) metaDesc.setAttribute('content', pageDesc);
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    if (ogDesc) ogDesc.setAttribute('content', pageDesc);

    // Schema.org ContactPage
    const scriptId = 'contact-structured-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const currentUrl = typeof window !== 'undefined' 
      ? window.location.origin + '/contato' 
      : 'https://baixecurriculogratis.vercel.app/contato';

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Página de Contato - Baixe Currículo Grátis',
      'description': pageDesc,
      'url': currentUrl,
      'mainEntity': {
        '@type': 'Organization',
        'name': 'Baixe Currículo Grátis',
        'email': recipientEmail,
        'url': 'https://baixecurriculogratis.vercel.app'
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Por favor, preencha seu nome, e-mail e a mensagem.');
      return;
    }

    setErrorMessage(null);

    // Formatted mail body sent directly to acewebdf@gmail.com
    const emailSubject = encodeURIComponent(`[Contato BCG] ${formData.subject} - ${formData.name}`);
    const emailBody = encodeURIComponent(
      `Olá equipe Baixe Currículo Grátis,\n\n` +
      `Uma nova mensagem de contato foi enviada através do site:\n\n` +
      `• Nome: ${formData.name}\n` +
      `• E-mail: ${formData.email}\n` +
      `• Telefone/WhatsApp: ${formData.phone || 'Não informado'}\n` +
      `• Assunto: ${formData.subject}\n\n` +
      `-----------------------------------------\n` +
      `MENSAGEM:\n` +
      `${formData.message}\n` +
      `-----------------------------------------\n\n` +
      `Enviado a partir de: https://baixecurriculogratis.vercel.app/contato`
    );

    const mailtoUrl = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

    // Open mail client
    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

  const handleCopyFormattedBody = () => {
    const formatted = 
      `Para: ${recipientEmail}\n` +
      `Assunto: [Contato BCG] ${formData.subject} - ${formData.name}\n\n` +
      `Nome: ${formData.name}\n` +
      `E-mail: ${formData.email}\n` +
      `Telefone: ${formData.phone || 'N/A'}\n\n` +
      `Mensagem:\n${formData.message}`;
    
    navigator.clipboard.writeText(formatted);
    setCopiedMessageBody(true);
    setTimeout(() => setCopiedMessageBody(false), 3000);
  };

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
              Contato
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

        {/* Header Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md mb-2 uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-emerald-700" />
            Canais de Atendimento
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Fale Conosco
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Tem alguma dúvida sobre como preencher seu currículo, deseja sugerir um novo modelo profissional ou quer relatar um problema técnico? Nossa equipe responde prontamente.
          </p>
        </div>

        {/* Two-column layout: Form and Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900">
                  Mensagem Preparada com Sucesso!
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Seu programa de e-mail padrão foi acionado para enviar sua mensagem diretamente para <strong className="text-emerald-800">{recipientEmail}</strong>.
                </p>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-2 max-w-md mx-auto text-slate-700">
                  <div className="font-semibold text-slate-900">
                    Não abriu o seu e-mail automaticamente?
                  </div>
                  <p>
                    Copie o texto estruturado abaixo e envie manualmente do seu Gmail, Outlook ou Yahoo para <strong>{recipientEmail}</strong>:
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyFormattedBody}
                    className="w-full mt-2 py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedMessageBody ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Texto Copiado para a Área de Transferência!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copiar Texto Completo da Mensagem</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'Dúvida sobre os Modelos',
                        message: ''
                      });
                    }}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    Enviar outra mensagem
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    onClick={onNavigateHome}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Voltar para o Início
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1">
                      Seu Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Ex: Ana Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
                      Seu E-mail para Resposta <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="Ex: ana.silva@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone / WhatsApp */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1">
                      Telefone / WhatsApp <span className="text-slate-400 font-normal">(opcional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Ex: (61) 98765-4321"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1">
                      Assunto da Mensagem <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    >
                      <option value="Dúvida sobre os Modelos">Dúvida sobre os Modelos</option>
                      <option value="Sugestão de Novo Modelo">Sugestão de Novo Modelo</option>
                      <option value="Dificuldade com Download / PDF">Dificuldade com Download / PDF</option>
                      <option value="Dúvida sobre Compatibilidade ATS">Dúvida sobre Compatibilidade ATS</option>
                      <option value="Parceria ou Imprensa">Parceria ou Imprensa</option>
                      <option value="Outro Assunto">Outro Assunto</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
                    Mensagem Detalhada <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Descreva com detalhes sua dúvida, feedback ou sugestão..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white resize-y"
                  />
                </div>

                {/* LGPD notice */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Seus dados de contato são utilizados única e exclusivamente para responder a sua mensagem. Não enviamos spam nem compartilhamos dados com terceiros.
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem para {recipientEmail}</span>
                </button>
              </form>
            )}

          </div>

          {/* Sidebar Info & Direct Channels */}
          <div className="space-y-6">
            
            {/* Direct Email Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>E-mail Direto</span>
              </div>
              
              <div className="text-sm font-bold text-slate-900 break-all">
                {recipientEmail}
              </div>

              <p className="text-xs text-slate-500">
                Você pode nos escrever diretamente pelo seu gerenciador de e-mails preferido a qualquer momento.
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`mailto:${recipientEmail}`}
                  className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Abrir no seu E-mail</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">E-mail Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copiar Endereço</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Response Time & Location */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Prazo de Resposta</div>
                  <div className="text-slate-500 mt-0.5">
                    Normalmente respondemos em até 24 a 48 horas úteis de segunda a sexta.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Origem & Atendimento</div>
                  <div className="text-slate-500 mt-0.5">
                    Brasília - DF, Brasil (Acelino Web DF / Baixe Currículo Grátis)
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ Link */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <HelpCircle className="w-4 h-4 text-emerald-700" />
                <span>Dúvida Frequente?</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                A resposta para sua dúvida pode já estar respondida na nossa seção de perguntas frequentes.
              </p>
              <button
                onClick={() => onNavigateToSection('faq')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer pt-1 block"
              >
                Consultar FAQ do Baixe Currículo Grátis →
              </button>
            </div>

          </div>

        </div>

      </div>
    </article>
  );
};
