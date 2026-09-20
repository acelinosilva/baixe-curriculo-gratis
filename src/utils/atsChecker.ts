import { ResumeData, AtsEvaluation } from '../types';

const COMMON_ACTION_VERBS = [
  'desenvolveu', 'desenvolvi', 'desenvolver',
  'liderou', 'liderei', 'liderar',
  'implementou', 'implementei', 'implementar',
  'coordenou', 'coordenei', 'coordenar',
  'otimizou', 'otimizei', 'otimizar',
  'gerenciou', 'gerenciei', 'gerenciar',
  'aumentou', 'aumentei', 'aumentar',
  'reduziu', 'reduzi', 'reduzir',
  'criou', 'criei', 'criar',
  'estruturou', 'estruturei', 'estruturar',
  'negociou', 'negociei', 'negociar',
  'planejou', 'planejei', 'planejar',
  'supervisionou', 'supervisionei', 'supervisionar',
  'automatizou', 'automatizei', 'automatizar',
  'treinou', 'treinei', 'treinar',
  'elaborou', 'elaborei', 'elaborar',
  'conduziu', 'conduzi', 'conduzir'
];

export function evaluateResumeATS(data: ResumeData): AtsEvaluation {
  let score = 0;
  const passedChecks: { title: string; detail: string }[] = [];
  const warningChecks: { title: string; detail: string; recommendation: string }[] = [];

  // 1. Contact information (max 25 points)
  if (data.personalInfo.fullName && data.personalInfo.fullName.trim().length > 3) {
    score += 8;
    passedChecks.push({ title: 'Nome Completo Válido', detail: 'Identificação clara para o recrutador.' });
  } else {
    warningChecks.push({
      title: 'Nome Completo Ausente',
      detail: 'O nome não foi informado ou está muito curto.',
      recommendation: 'Insira seu nome e sobrenome completos no cabeçalho.'
    });
  }

  if (data.personalInfo.jobTitle && data.personalInfo.jobTitle.trim().length > 2) {
    score += 5;
    passedChecks.push({ title: 'Cargo / Objetivo Definido', detail: `Cargo: "${data.personalInfo.jobTitle}"` });
  } else {
    warningChecks.push({
      title: 'Cargo Alvo Não Especificado',
      detail: 'Robôs ATS procuram compatibilidade direta com o título da vaga.',
      recommendation: 'Especifique o cargo exato que você busca (ex: "Assistente Administrativo").'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.personalInfo.email && emailRegex.test(data.personalInfo.email.trim())) {
    score += 5;
    passedChecks.push({ title: 'E-mail Válido', detail: 'Contato digital pronto para notificações de processo.' });
  } else {
    warningChecks.push({
      title: 'E-mail Inválido ou Ausente',
      detail: 'Sem um e-mail correto, você não receberá convites de entrevista.',
      recommendation: 'Adicione um e-mail profissional (ex: nome.sobrenome@email.com).'
    });
  }

  if (data.personalInfo.phone && data.personalInfo.phone.trim().length >= 8) {
    score += 4;
    passedChecks.push({ title: 'Telefone / WhatsApp Informado', detail: 'Canal direto para contato rápido do RH.' });
  } else {
    warningChecks.push({
      title: 'Telefone Ausente',
      detail: 'Recrutadores preferem agendar entrevistas por ligação ou WhatsApp.',
      recommendation: 'Inclua seu telefone com DDD.'
    });
  }

  if (data.personalInfo.location && data.personalInfo.location.trim().length > 3) {
    score += 3;
    passedChecks.push({ title: 'Localização (Cidade/Estado)', detail: 'Permite filtro regional de candidatos.' });
  } else {
    warningChecks.push({
      title: 'Localidade não informada',
      detail: 'Muitas vagas filtram por proximidade geográfica.',
      recommendation: 'Adicione sua Cidade e Estado (ex: "São Paulo, SP").'
    });
  }

  // 2. Summary / Objective (max 15 points)
  const summaryLength = data.summary ? data.summary.trim().length : 0;
  if (summaryLength >= 100 && summaryLength <= 600) {
    score += 15;
    passedChecks.push({ title: 'Resumo Profissional Ideal', detail: `${summaryLength} caracteres (tamanho ideal de 2 a 4 parágrafos curtos).` });
  } else if (summaryLength > 0 && summaryLength < 100) {
    score += 8;
    warningChecks.push({
      title: 'Resumo Muito Curto',
      detail: 'O resumo tem menos de 100 caracteres.',
      recommendation: 'Acrescente seus anos de experiência, especialidades e objetivos principais.'
    });
  } else if (summaryLength > 600) {
    score += 8;
    warningChecks.push({
      title: 'Resumo Muito Longo',
      detail: 'Textos longos tendem a ser ignorados na triagem rápida.',
      recommendation: 'Sintetize seu resumo para no máximo 4 a 5 linhas diretas.'
    });
  } else {
    warningChecks.push({
      title: 'Resumo Profissional Ausente',
      detail: 'O resumo é a primeira coisa que o recrutador lê após o nome.',
      recommendation: 'Escreva um parágrafo objetivo destacando sua trajetória e metas.'
    });
  }

  // 3. Experience & Action Verbs (max 25 points)
  const allExpText = data.experiences.map(e => `${e.description} ${e.achievements.join(' ')}`).join(' ').toLowerCase();
  const actionVerbsFound: string[] = [];

  COMMON_ACTION_VERBS.forEach(verb => {
    if (allExpText.includes(verb) && !actionVerbsFound.includes(verb)) {
      actionVerbsFound.push(verb);
    }
  });

  if (data.experiences.length > 0) {
    score += 15;
    passedChecks.push({
      title: 'Experiências Profissionais Registradas',
      detail: `${data.experiences.length} experiência(s) adicionada(s) com datas e funções.`
    });

    if (actionVerbsFound.length >= 3) {
      score += 10;
      passedChecks.push({
        title: 'Uso Forte de Verbos de Ação',
        detail: `Detectados ${actionVerbsFound.length} verbos orientados a resultado (${actionVerbsFound.slice(0, 4).join(', ')}...).`
      });
    } else {
      score += 5;
      warningChecks.push({
        title: 'Poucos Verbos de Ação',
        detail: 'Declarações passivas enfraquecem o impacto das suas conquistas.',
        recommendation: 'Use verbos como "Implementei", "Coordenei", "Desenvolvi" e "Otimizei".'
      });
    }
  } else {
    // Check if it's first job
    if (data.personalInfo.jobTitle.toLowerCase().includes('primeiro') || data.personalInfo.jobTitle.toLowerCase().includes('aprendiz')) {
      score += 12;
      passedChecks.push({
        title: 'Perfil de Primeiro Emprego',
        detail: 'Foco adaptado para formação acadêmica e cursos livres.'
      });
    } else {
      warningChecks.push({
        title: 'Nenhuma Experiência Profissional Cadastrada',
        detail: 'Vagas plenas e seniores exigem histórico de empresas anteriores.',
        recommendation: 'Adicione suas experiências anteriores ou trabalhos voluntários e acadêmicos.'
      });
    }
  }

  // 4. Education (max 15 points)
  if (data.education.length > 0) {
    score += 15;
    passedChecks.push({
      title: 'Formação Acadêmica Completa',
      detail: `${data.education.length} curso(s) com instituição e período informados.`
    });
  } else {
    warningChecks.push({
      title: 'Formação Acadêmica Ausente',
      detail: 'Toda vaga exige no mínimo indicação do grau de escolaridade.',
      recommendation: 'Adicione seu Ensino Médio, Técnico ou Graduação.'
    });
  }

  // 5. Skills & Competencies (max 15 points)
  if (data.skills.length >= 5) {
    score += 15;
    passedChecks.push({
      title: 'Palavras-Chave de Habilidades Sólidas',
      detail: `${data.skills.length} competências indexadas para cruzamento de requisitos ATS.`
    });
  } else if (data.skills.length > 0) {
    score += 8;
    warningChecks.push({
      title: 'Poucas Habilidades Listadas',
      detail: `Você adicionou apenas ${data.skills.length} habilidade(s).`,
      recommendation: 'Recomendamos listar de 5 a 10 competências técnicas e comportamentais.'
    });
  } else {
    warningChecks.push({
      title: 'Lista de Habilidades Vazia',
      detail: 'Robôs de IA buscam diretamente as competências no currículo.',
      recommendation: 'Adicione ferramentas que domina (ex: Excel, React, Gestão de Tempo).'
    });
  }

  // 6. Additional bonus (Languages or Certifications) (max 5 points)
  if (data.languages.length > 0 || data.certifications.length > 0) {
    score += 5;
    passedChecks.push({
      title: 'Diferencial Competitivo (Idiomas/Certificações)',
      detail: 'Certificações e idiomas aumentam sua pontuação na triagem final.'
    });
  }

  // Bound score
  score = Math.min(100, Math.max(10, score));

  let grade: AtsEvaluation['grade'] = 'Crítico';
  if (score >= 90) grade = 'Excelente';
  else if (score >= 75) grade = 'Bom';
  else if (score >= 55) grade = 'Precisa de Ajustes';

  const missingKeywordsSuggestions = [
    'Gestão de Tempo', 'Comunicação Interpessoal', 'Resolução de Problemas',
    'Trabalho em Equipe', 'Excel / Planilhas', 'Foco em Metas'
  ].filter(s => !data.skills.some(k => k.toLowerCase().includes(s.toLowerCase())));

  return {
    score,
    grade,
    passedChecks,
    warningChecks,
    actionVerbsFound,
    missingKeywordsSuggestions: missingKeywordsSuggestions.slice(0, 4)
  };
}
