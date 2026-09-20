import { ResumeData } from '../types';

export const blankResume: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    showPhoto: false,
  },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  selectedTemplate: 'moderno',
  primaryColor: '#0f766e', // Emerald 700
  fontFamily: 'sans',
  fontSize: 'standard',
  spacing: 'normal',
  pageMargin: 'normal',
  lineHeight: 'normal',
  headerAlignment: 'left',
  contentAlignment: 'left',
  projects: [],
  volunteer: [],
  customSections: [],
};

export const sampleFirstJob: ResumeData = {
  personalInfo: {
    fullName: 'Lucas Gabriel Silveira',
    jobTitle: 'Candidato a Primeiro Emprego / Jovem Aprendiz',
    email: 'lucas.silveira@email.com',
    phone: '(11) 98765-4321',
    location: 'São Paulo, SP - Zona Leste',
    linkedin: 'linkedin.com/in/lucas-silveira-sp',
    website: '',
    showPhoto: false,
  },
  summary: 'Jovem proativo e dedicado, cursando o último ano do Ensino Médio, em busca da primeira oportunidade profissional como Jovem Aprendiz ou Auxiliar. Possuo facilidade com informática, boa comunicação interpessoal, facilidade para aprender rotinas operacionais e forte vontade de evoluir dentro da empresa.',
  experiences: [
    {
      id: 'exp-1',
      company: 'Grêmio Estudantil Machado de Assis',
      role: 'Voluntário e Diretor de Comunicação',
      location: 'São Paulo, SP',
      startDate: 'Fev 2025',
      endDate: 'Dez 2025',
      current: false,
      description: 'Organização de eventos culturais e esportivos escolares com mais de 500 alunos presentes.',
      achievements: [
        'Criação de comunicados informativos semanais distribuídos para a comunidade escolar',
        'Controle básico de planilhas de inscrições e lista de presença via Google Sheets',
        'Atendimento e esclarecimento de dúvidas dos estudantes com cordialidade'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'E.E. Professor Carlos Alberto',
      degree: 'Ensino Médio Regular',
      fieldOfStudy: 'Educação Básica',
      startDate: '2024',
      endDate: 'Dez 2026',
      current: true,
      description: 'Período Matutino. Frequência acima de 95% com destaque em Matemática e Redação.'
    }
  ],
  skills: [
    'Pacote Office (Word, Excel básico)',
    'Google Workspace',
    'Digitação Rápida',
    'Comunicação Verbal e Escrita',
    'Organização e Pontualidade',
    'Trabalho em Equipe'
  ],
  languages: [
    { id: 'lang-1', language: 'Português', proficiency: 'Nativo' },
    { id: 'lang-2', language: 'Inglês', proficiency: 'Básico' }
  ],
  certifications: [
    { id: 'cert-1', name: 'Informática Básica e Pacote Office (80h)', issuer: 'Fundação Bradesco', year: '2025' },
    { id: 'cert-2', name: 'Atendimento ao Cliente e Etiqueta Corporativa (40h)', issuer: 'SEBRAE', year: '2025' }
  ],
  selectedTemplate: 'classico',
  primaryColor: '#2563eb', // Blue 600
  fontFamily: 'sans',
  fontSize: 'standard',
  spacing: 'normal',
  pageMargin: 'normal',
  lineHeight: 'normal',
  headerAlignment: 'center',
  contentAlignment: 'left',
  projects: [
    {
      id: 'proj-1',
      title: 'Campanha Solidária de Arrecadação de Agasalhos',
      roleOrTech: 'Coordenador Estudantil',
      description: 'Mobilização escolar que arrecadou mais de 600 peças de roupa de inverno para instituições de acolhimento do bairro.',
      startDate: 'Mai 2025',
      endDate: 'Jul 2025'
    }
  ],
  volunteer: [
    {
      id: 'vol-1',
      organization: 'Ação Comunitária do Bairro',
      role: 'Monitor Voluntário de Leitura e Alfabetização Infantil',
      cause: 'Educação Comunitária',
      startDate: '2024',
      endDate: '2025',
      description: 'Apoio pedagógico semanal a crianças de 6 a 10 anos aos sábados.'
    }
  ],
  customSections: [],
};

export const sampleTechDeveloper: ResumeData = {
  personalInfo: {
    fullName: 'Mariana Duarte Costa',
    jobTitle: 'Desenvolvedora Full Stack Pleno | React & Node.js',
    email: 'mariana.costa.dev@gmail.com',
    phone: '(11) 97123-8899',
    location: 'Campinas, SP (Disponível para Remoto)',
    linkedin: 'linkedin.com/in/marianaduarte-dev',
    website: 'github.com/marianacosta',
    showPhoto: false,
  },
  summary: 'Desenvolvedora de Software com 4 anos de experiência prática construindo produtos web escaláveis com TypeScript, React, Node.js e bancos de dados SQL/NoSQL. Foco em arquitetura limpa, alta performance e sistemas de alta disponibilidade. Histórico comprovado de redução de tempo de carregamento de páginas em 35% e implementação de pipelines CI/CD automatizados.',
  experiences: [
    {
      id: 'exp-1',
      company: 'Nexum Tech Solutions',
      role: 'Desenvolvedora Front-end Pleno',
      location: 'São Paulo, SP (Remoto)',
      startDate: 'Jan 2024',
      endDate: 'Presente',
      current: true,
      description: 'Responsável pelo desenvolvimento da interface do principal produto SaaS B2B da empresa utilizado por mais de 45.000 usuários ativos mensais.',
      achievements: [
        'Liderei a migração de monólito para micro frontends com React e Vite, reduzindo tempo de build em 50%',
        'Otimizei renderizações no cliente melhorando o Core Web Vitals (LCP de 3.8s para 1.2s)',
        'Implementei testes automatizados com Jest e Playwright elevando a cobertura de código para 88%'
      ]
    },
    {
      id: 'exp-2',
      company: 'Inova Digital Labs',
      role: 'Desenvolvedora Júnior Full Stack',
      location: 'Campinas, SP',
      startDate: 'Jul 2022',
      endDate: 'Dez 2023',
      current: false,
      description: 'Atuação no time ágil desenvolvendo APIs RESTful em Node.js e telas responsivas com React e Tailwind CSS.',
      achievements: [
        'Desenvolvi integração com gateway de pagamento Pix e cartão processando R$ 1.5M mensais',
        'Criei rotinas em background para geração assíncrona de relatórios contábeis em PDF e Excel'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Universidade Estadual de Campinas (UNICAMP)',
      degree: 'Bacharelado',
      fieldOfStudy: 'Ciência da Computação',
      startDate: '2019',
      endDate: '2023',
      current: false,
      description: 'Trabalho de conclusão focado em algoritmos distribuídos e sistemas distribuídos.'
    }
  ],
  skills: [
    'TypeScript & JavaScript (ESNext)',
    'React 18+, Next.js, Redux Toolkit',
    'Node.js, Express, NestJS',
    'PostgreSQL, MongoDB, Redis',
    'Docker, Git, CI/CD GitHub Actions',
    'Tailwind CSS, Figma to Code',
    'APIs RESTful e GraphQL'
  ],
  languages: [
    { id: 'lang-1', language: 'Português', proficiency: 'Nativo' },
    { id: 'lang-2', language: 'Inglês', proficiency: 'Avançado' }
  ],
  certifications: [
    { id: 'cert-1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
    { id: 'cert-2', name: 'Meta Front-End Developer Professional Certificate', issuer: 'Meta / Coursera', year: '2023' }
  ],
  selectedTemplate: 'moderno',
  primaryColor: '#0f766e', // Teal 700
  fontFamily: 'sans',
  fontSize: 'standard',
  spacing: 'compact',
  pageMargin: 'normal',
  lineHeight: 'normal',
  headerAlignment: 'left',
  contentAlignment: 'left',
  projects: [
    {
      id: 'proj-tech-1',
      title: 'Plataforma E-commerce Headless & Gateway Pix',
      roleOrTech: 'Next.js 14, TypeScript, Prisma, PostgreSQL, Tailwind',
      link: 'github.com/marianacosta/ecommerce-headless',
      startDate: '2024',
      endDate: '2024',
      description: 'Construção de plataforma com carrinho otimizado, checkout com liquidação instantânea via webhook Pix e painel administrativo com métricas em tempo real.'
    },
    {
      id: 'proj-tech-2',
      title: 'Extensão Open-Source de Acessibilidade Web (Lighthouse 100)',
      roleOrTech: 'React, Web Extensions API, Tailwind CSS',
      link: 'github.com/marianacosta/a11y-checker',
      startDate: '2023',
      endDate: '2023',
      description: 'Ferramenta utilizada por mais de 3.000 desenvolvedores para auditoria rápida de contraste de cores e suporte a leitores de tela NVDA.'
    }
  ],
  volunteer: [
    {
      id: 'vol-tech-1',
      organization: 'Mulheres na Tecnologia (WoMakersCode)',
      role: 'Mentora Voluntária de Frontend',
      cause: 'Inclusão de Mulheres no Mercado Tech',
      startDate: '2023',
      endDate: 'Presente',
      description: 'Mentoria técnica quinzenal e revisão de código para alunas em início de transição de carreira.'
    }
  ],
  customSections: [],
};

export const sampleAdministrative: ResumeData = {
  personalInfo: {
    fullName: 'Rodrigo Henrique de Menezes',
    jobTitle: 'Analista Administrativo e Financeiro Sênior',
    email: 'rodrigo.menezes.adm@outlook.com',
    phone: '(21) 98455-1122',
    location: 'Rio de Janeiro, RJ - Barra da Tijuca',
    linkedin: 'linkedin.com/in/rodrigo-menezes-adm',
    website: '',
    showPhoto: false,
  },
  summary: 'Profissional com mais de 7 anos de vivência em rotinas administrativas, controladoria, contas a pagar e receber, fluxo de caixa e gestão de contratos. Especialista em automação de relatórios gerenciais com Excel Avançado e Power BI. Conhecimento aprofundado nos ERPs SAP e TOTVS Protheus, com capacidade comprovada de redução de custos operacionais e conformidade fiscal.',
  experiences: [
    {
      id: 'exp-1',
      company: 'Grupo Horizonte Logística e Serviços',
      role: 'Analista Administrativo Financeiro Sênior',
      location: 'Rio de Janeiro, RJ',
      startDate: 'Mar 2022',
      endDate: 'Presente',
      current: true,
      description: 'Supervisão do fechamento mensal de contas, conciliação bancária de 12 filiais e auditoria de compras corporativas.',
      achievements: [
        'Reestruturação dos processos de compras indiretas, gerando economia anual de R$ 320.000',
        'Implementação de dashboards no Power BI para diretoria com acompanhamento de DRE em tempo real',
        'Treinamento e mentoria de equipe júnior de 4 assistentes administrativos'
      ]
    },
    {
      id: 'exp-2',
      company: 'Vanguard Engenharia e Projetos',
      role: 'Assistente Administrativo Pleno',
      location: 'Rio de Janeiro, RJ',
      startDate: 'Fev 2019',
      endDate: 'Fev 2022',
      current: false,
      description: 'Gestão de contas a pagar, emissão de notas fiscais de serviço e controle de certidões negativas de débitos.',
      achievements: [
        'Redução do índice de inadimplência de fornecedores de 8% para menos de 1% mediante renegociações',
        'Automatização de planilhas de rateio via macros VBA economizando 15 horas de trabalho semanal'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Universidade Federal do Rio de Janeiro (UFRJ)',
      degree: 'Graduação',
      fieldOfStudy: 'Administração de Empresas',
      startDate: '2015',
      endDate: '2019',
      current: false,
      description: 'Ênfase em Gestão Financeira e Controladoria.'
    }
  ],
  skills: [
    'Excel Avançado (VBA, Power Query, Fórmulas complexas)',
    'Power BI & Dashboards Gerenciais',
    'ERP SAP (FI/CO) e TOTVS Protheus',
    'Contas a Pagar / Receber e Fluxo de Caixa',
    'Conciliação Bancária e Auditoria',
    'Negociação com Fornecedores'
  ],
  languages: [
    { id: 'lang-1', language: 'Português', proficiency: 'Nativo' },
    { id: 'lang-2', language: 'Inglês', proficiency: 'Intermediário' }
  ],
  certifications: [
    { id: 'cert-1', name: 'Certificação Power BI para Gestão Financeira', issuer: 'Data Science Academy', year: '2023' },
    { id: 'cert-2', name: 'Gestão de Custos e Orçamentos Empresariais', issuer: 'FGV Online', year: '2022' }
  ],
  selectedTemplate: 'profissional',
  primaryColor: '#1e293b', // Slate 800
  fontFamily: 'serif',
  fontSize: 'standard',
  spacing: 'normal',
  pageMargin: 'normal',
  lineHeight: 'normal',
  headerAlignment: 'left',
  contentAlignment: 'justify',
  projects: [
    {
      id: 'proj-adm-1',
      title: 'Projeto de Migração e Implantação do ERP SAP S/4HANA',
      roleOrTech: 'Líder Funcional do Módulo Financeiro',
      startDate: '2023',
      endDate: '2024',
      description: 'Mapeamento de 14 processos de faturamento, conciliação e tesouraria, garantindo virada de chave do sistema sem parada operacional.'
    }
  ],
  volunteer: [
    {
      id: 'vol-adm-1',
      organization: 'ONG Educação Financeira para Todos',
      role: 'Instrutor Voluntário de Orçamento Doméstico',
      cause: 'Educação Financeira',
      startDate: '2022',
      endDate: '2024',
      description: 'Aulas mensais gratuitas de planejamento financeiro para famílias de baixa renda.'
    }
  ],
  customSections: [],
};

export const sampleHealthcare: ResumeData = {
  personalInfo: {
    fullName: 'Dra. Beatriz Santos Nogueira',
    jobTitle: 'Enfermeira Assistencial | Coren-SP 485.120',
    email: 'beatriz.nogueira.enf@gmail.com',
    phone: '(11) 99344-7766',
    location: 'Santo André, SP - Grande ABC',
    linkedin: 'linkedin.com/in/beatriz-nogueira-enfermeira',
    website: '',
    showPhoto: false,
  },
  summary: 'Enfermeira com 5 anos de atuação em Unidade de Terapia Intensiva (UTI Adulto) e Pronto-Socorro. Experiência consolidada no protocolo de acolhimento com classificação de risco (Manchester), assistência a pacientes de alta complexidade e liderança de equipe técnica. Foco constante na humanização do atendimento, segurança do paciente e rigor na administração medicamentosa.',
  experiences: [
    {
      id: 'exp-1',
      company: 'Hospital e Maternidade São Lucas',
      role: 'Enfermeira de UTI Adulto',
      location: 'São Paulo, SP',
      startDate: 'Ago 2022',
      endDate: 'Presente',
      current: true,
      description: 'Supervisão direta da assistência em leitos de terapia intensiva, monitorização hemodinâmica contínua e suporte a ventilação mecânica.',
      achievements: [
        'Membro ativo da Comissão de Controle de Infecção Hospitalar (CCIH)',
        'Zero intercorrências com administração incorreta de fármacos de alta vigilância',
        'Capacitação de 18 técnicos de enfermagem nas novas diretrizes de ressuscitação cardiopulmonar (RCP)'
      ]
    },
    {
      id: 'exp-2',
      company: 'Pronto Atendimento Municipal',
      role: 'Enfermeira de Triagem e Emergência',
      location: 'Santo André, SP',
      startDate: 'Jan 2020',
      endDate: 'Jul 2022',
      current: false,
      description: 'Atendimento na classificação de risco e sala de estabilização de urgência e emergência.',
      achievements: [
        'Média de 120 atendimentos diários com tempo médio de acolhimento reduzido em 20%',
        'Gestão de estoque de materiais cirúrgicos e reposição de carrinhos de parada'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Faculdade de Medicina do ABC (FMABC)',
      degree: 'Pós-Graduação Lato Sensu',
      fieldOfStudy: 'Enfermagem em Cuidados Intensivos (UTI)',
      startDate: '2021',
      endDate: '2022',
      current: false
    },
    {
      id: 'edu-2',
      institution: 'Universidade São Judas Tadeu',
      degree: 'Bacharelado',
      fieldOfStudy: 'Enfermagem',
      startDate: '2016',
      endDate: '2019',
      current: false
    }
  ],
  skills: [
    'Protocolo de Manchester (Triagem)',
    'Cuidados Intensivos e Monitorização Hemodinâmica',
    'Ventilação Mecânica e Gasometria Arterial',
    'Administração de Medicamentos de Alta Vigilância',
    'Liderança de Equipe de Enfermagem',
    'Prontuário Eletrônico (Tasy, MV Soul)'
  ],
  languages: [
    { id: 'lang-1', language: 'Português', proficiency: 'Nativo' },
    { id: 'lang-2', language: 'Inglês', proficiency: 'Básico' }
  ],
  certifications: [
    { id: 'cert-1', name: 'Suporte Avançado de Vida Cardiovascular (ACLS)', issuer: 'American Heart Association', year: '2024' },
    { id: 'cert-2', name: 'Atendimento Pré-Hospitalar (APH 100h)', issuer: 'Cruz Vermelha Brasileira', year: '2023' }
  ],
  selectedTemplate: 'criativo',
  primaryColor: '#0284c7', // Sky 600
  fontFamily: 'sans',
  fontSize: 'standard',
  spacing: 'normal',
  pageMargin: 'normal',
  lineHeight: 'normal',
  headerAlignment: 'left',
  contentAlignment: 'left',
  projects: [],
  volunteer: [
    {
      id: 'vol-health-1',
      organization: 'Doutores da Esperança e Cruz Vermelha',
      role: 'Voluntária em Mutirões Comunitários de Saúde',
      cause: 'Acesso à Saúde Primária',
      startDate: '2021',
      endDate: 'Presente',
      description: 'Aferição de pressão arterial, testes rápidos de glicemia e orientações sobre prevenção de hipertensão e diabetes.'
    }
  ],
  customSections: [],
};
