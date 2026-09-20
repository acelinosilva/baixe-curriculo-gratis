import { InterviewQuestionTip } from '../types';

export const starMethodSteps = [
  {
    step: 'S',
    letter: 'Situação',
    subtitle: 'O Contexto Inicial',
    color: 'emerald',
    description: 'Descreva resumidamente o cenário em que você estava inserido. Onde você trabalhava, qual era o problema ou momento da empresa.',
    example: 'Exemplo: "Na empresa anterior, no final de 2024, tínhamos uma taxa de cancelamento de clientes (churn) de 8% ao mês na área de suporte técnico..."'
  },
  {
    step: 'T',
    letter: 'Tarefa',
    subtitle: 'Sua Responsabilidade',
    color: 'blue',
    description: 'Explique qual era o seu papel específico e o objetivo direto que precisava ser alcançado.',
    example: 'Exemplo: "Fui designado como ponto focal para mapear os 10 principais motivos de insatisfação e propor um plano de ação em 30 dias."'
  },
  {
    step: 'A',
    letter: 'Ação',
    subtitle: 'O que Você Fez',
    color: 'indigo',
    description: 'O cerne da resposta. Detalhe as ações práticas que você tomou, ferramentas utilizadas, liderança e habilidades aplicadas.',
    example: 'Exemplo: "Implementei uma pesquisa rápida pós-atendimento via WhatsApp e redesenhei os 3 scripts de atendimento mais complexos junto ao time."'
  },
  {
    step: 'R',
    letter: 'Resultado',
    subtitle: 'O Impacto com Números',
    color: 'purple',
    description: 'Finalize sempre com dados mensuráveis, impacto positivo para a equipe ou aprendizado chave conquistado.',
    example: 'Exemplo: "Em 3 meses, o índice de resolução no primeiro contato subiu de 62% para 89%, reduzindo o cancelamento para 3,1% ao mês."'
  }
];

export const commonInterviewQuestions: InterviewQuestionTip[] = [
  {
    id: 'q1',
    category: 'comportamental',
    question: '"Fale um pouco sobre você e sua trajetória"',
    whyTheyAsk: 'O recrutador quer avaliar sua capacidade de síntese, comunicação clara e se a sua trajetória faz sentido com o escopo da vaga.',
    howToAnswer: 'Use a fórmula Presente → Passado → Futuro. Fale do seu momento atual em 30 segundos, mencione 1 ou 2 experiências marcantes anteriores e conecte o porquê esta vaga é o seu próximo passo natural.',
    exampleAnswer: '"Sou profissional de administração com 4 anos de atuação, especializado em controle de fluxo de caixa e relatórios no Power BI. Recentemente liderei a conciliação financeira de 10 filiais, economizando tempo operacional da equipe. Acompanho o crescimento da sua empresa no setor e vejo nesta oportunidade a chance de aplicar minha experiência em otimização de processos fiscais."',
    mistakesToAvoid: [
      'Contar a história da sua vida pessoal desde a infância',
      'Repetir linha por linha o que já está escrito no currículo sem trazer contexto',
      'Falar por mais de 2 minutos e meio sem dar espaço para o recrutador'
    ]
  },
  {
    id: 'q2',
    category: 'comportamental',
    question: '"Qual é o seu maior ponto a melhorar ou defeito?"',
    whyTheyAsk: 'O objetivo é medir sua autocrítica, maturidade emocional e se você é proativo para contornar suas limitações conhecidas.',
    howToAnswer: 'Escolha uma fraqueza real (e não fatal para a função) e mostre a ação concreta que você já está tomando para superá-la.',
    exampleAnswer: '"Historicamente, eu tinha dificuldade em delegar tarefas por querer garantir que tudo saísse exatamente como planejado. Percebi que isso sobrecarregava minha rotina. No último ano, passei a utilizar o Trello para dividir marcos com colegas e praticar reuniões de alinhamento semanais, o que me deu muito mais confiança no trabalho conjunto."',
    mistakesToAvoid: [
      'Clichês manjados como "sou perfeccionista demais" ou "trabalho demais"',
      'Mencionar uma competência crítica para a vaga (ex: dizer que é desorganizado para vaga financeira)',
      'Dizer que não tem nenhum defeito'
    ]
  },
  {
    id: 'q3',
    category: 'comportamental',
    question: '"Por que você quer trabalhar na nossa empresa?"',
    whyTheyAsk: 'Descobrir se você pesquisou sobre a empresa ou se apenas está enviando currículos em massa sem critério.',
    howToAnswer: 'Cite algo específico da empresa: um projeto recente, os valores, o momento de mercado ou a reputação da cultura e conecte com o seu interesse.',
    exampleAnswer: '"Li a reportagem recente sobre a expansão dos serviços digitais de vocês para o Nordeste e achei fascinante o compromisso com inclusão financeira. Esse propósito conversa diretamente com o que busco para minha carreira, e quero somar com minha experiência em suporte ao cliente nesse período de escala."',
    mistakesToAvoid: [
      'Respostas genéricas como "porque preciso de um emprego" ou "porque a empresa é grande"',
      'Demonstrar que nem sabe ao certo o que a empresa vende ou faz'
    ]
  },
  {
    id: 'q4',
    category: 'salario',
    question: '"Qual é a sua pretensão salarial?"',
    whyTheyAsk: 'Validar se o seu valor de mercado cabe na faixa orçamentária aprovada para a vaga antes de avançar fases caras do processo.',
    howToAnswer: 'Pesquise a média do cargo no Glassdoor e vagas similares. Responda informando uma faixa salarial e demonstre flexibilidade dependendo do pacote completo de benefícios (VR, saúde, PLR, modelo remoto).',
    exampleAnswer: '"Considerando as responsabilidades descritas e a pesquisa de mercado para o nível Pleno nesta região, minha pretensão está na faixa de R$ 4.500 a R$ 5.200. No entanto, sou flexível e levo em consideração o pacote total de benefícios e oportunidades de crescimento na empresa."',
    mistakesToAvoid: [
      'Dar uma resposta evasiva como "qualquer valor está bom"',
      'Falar um valor sem ter pesquisado a média de mercado',
      'Desconsiderar os benefícios que compõem a remuneração real'
    ]
  },
  {
    id: 'q5',
    category: 'perguntas-recrutador',
    question: '"Você tem alguma pergunta para nós?" (Perguntas que VOCÊ deve fazer)',
    whyTheyAsk: 'Candidatos que não fazem perguntas demonstram desinteresse ou passividade. Fazer boas perguntas posiciona você como profissional sênior.',
    howToAnswer: 'Tenha sempre de 2 a 3 perguntas preparadas para o final da entrevista sobre os desafios do dia a dia, expectativas do time e cultura.',
    exampleAnswer: '"Como a pessoa contratada saberá que teve sucesso nos primeiros 90 dias nesta função? Quais são as principais prioridades do time para este trimestre?"',
    mistakesToAvoid: [
      'Responder apenas "Não, você explicou tudo muito bem"',
      'Perguntar logo de cara sobre férias ou folgas antes mesmo de entender a função'
    ]
  }
];

export const onlineInterviewTips = [
  {
    title: 'Iluminação e Enquadramento',
    icon: 'Sun',
    tip: 'A fonte de luz principal (janela ou ring light) deve ficar na sua frente, nunca atrás de você (evita silhueta escura). Deixe a câmera na linha exata dos seus olhos utilizando livros ou suporte sob o notebook.'
  },
  {
    title: 'Olhar para a Lente, não para a Tela',
    icon: 'Eye',
    tip: 'Quando estiver falando, olhe diretamente para a bolinha da câmera e não para o vídeo do recrutador. Isso transmite contato visual autêntico e segurança.'
  },
  {
    title: 'Áudio e Ruído de Fundo',
    icon: 'Mic',
    tip: 'Use fone de ouvido com microfone próximo à boca para isolar barulhos da casa ou da rua. Feche janelas e deixe o celular no modo silencioso fora do alcance da vista.'
  },
  {
    title: 'Teste Técnico 15 Minutos Antes',
    icon: 'Laptop',
    tip: 'Abra a sala do Google Meet / Teams / Zoom com antecedência para testar permissão de câmera, microfone e certificar-se de que a bateria do computador está no carregador.'
  }
];

export const preInterviewChecklist = [
  'Pesquisei o site da empresa, LinkedIn e últimas notícias no Google',
  'Li novamente a descrição completa da vaga e anotei 3 pontos fortes meus',
  'Preparei 2 histórias usando o Método STAR para ilustrar resultados',
  'Tenho uma cópia em PDF do meu currículo aberta na tela caso precise consultar',
  'Roupa adequada para o código de vestimenta da empresa (inclusive parte de baixo em chamadas de vídeo)',
  'Garrafa de água limpa ao lado da mesa',
  'Caderno e caneta prontos para anotar informações e nomes dos entrevistadores'
];
