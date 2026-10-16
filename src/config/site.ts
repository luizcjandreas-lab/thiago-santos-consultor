/* ==========================================================================
   CONFIGURAÇÃO CENTRAL DO SITE — Thiago Santos, Consultor de Vendas
   --------------------------------------------------------------------------
   Todas as informações fixas do site estão aqui. Para atualizar textos,
   contatos, lojas, serviços, depoimentos ou perguntas frequentes, edite
   somente este arquivo. O estoque de veículos fica em ./estoque.ts.

   Valores entre colchetes, como "[ENDEREÇO]", ainda precisam ser
   preenchidos. Enquanto estiverem assim, o site mostra o campo como
   pendente e desativa botões que dependeriam dele (ex.: "Como chegar").
   ========================================================================== */

import type { FaqItem, PriceRange, Service, Store, Testimonial } from './types';

/* -------------------------------------------------------------------------- */
/* Identidade do profissional                                                 */
/* -------------------------------------------------------------------------- */

export const PROFILE = {
  fullName: 'Thiago dos Santos Souza',
  name: 'Thiago Santos',
  firstName: 'Thiago',
  title: 'Consultor de Vendas Automotivas',
  role: 'Gerente de vendas',
  signatureRole: 'Gerente e Consultor de Vendas',
  experienceYears: 8,
  region: 'São Paulo e Grande São Paulo',
  tagline: 'Consultoria automotiva com atendimento de verdade.',
};

/* -------------------------------------------------------------------------- */
/* Contato                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Número do WhatsApp com DDI + DDD, somente dígitos.
 * Preenchido com o número que aparece na logomarca: (11) 97812-7789.
 */
export const WHATSAPP_NUMBER = '5511978127789';

export const CONTACT = {
  whatsappDisplay: '(11) 97812-7789',
  /** Usuário do Instagram, sem @ (fonte: logomarca) */
  instagram: 'thiagoconsultorfimavel',
  email: '[PREENCHER]',
};

/** Mensagem padrão dos botões gerais de WhatsApp */
export const WHATSAPP_GENERAL_MESSAGE =
  'Olá, Thiago! Vim pelo seu site e gostaria de receber ajuda para encontrar meu próximo veículo.';

/* -------------------------------------------------------------------------- */
/* Endereço do site, SEO e rastreamento                                       */
/* -------------------------------------------------------------------------- */

export const SEO = {
  title: 'Thiago Santos | Consultor de Vendas de Veículos em São Paulo',
  description:
    'Encontre seu próximo veículo com atendimento personalizado. Fale com Thiago Santos, gerente de vendas com 8 anos de experiência em São Paulo e Grande São Paulo.',
  /** Endereço final do site. Defina VITE_SITE_URL no arquivo .env */
  siteUrl: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, ''),
  ogImage: 'og-image.jpg',
};

export const ANALYTICS = {
  /** Google Analytics 4. Defina VITE_GA_ID no .env */
  gaId: import.meta.env.VITE_GA_ID ?? '',
  /** Meta Pixel. Defina VITE_META_PIXEL_ID no .env */
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID ?? '',
};

/* -------------------------------------------------------------------------- */
/* Cores (aplicadas automaticamente em todo o site)                           */
/* -------------------------------------------------------------------------- */

export const THEME_COLORS = {
  asfalto: '#070708', // fundo principal
  grafite: '#0f1013', // fundo das seções alternadas
  chumbo: '#17191d', // superfícies, campos
  aco: '#2a2d33', // linhas e bordas
  'aco-claro': '#3d4148',
  cimento: '#9ea1a6', // textos secundários
  nevoa: '#c9cbce',
  branco: '#f4f3f0',
  ouro: '#e1ba66', // cor principal da logomarca do Thiago
  'ouro-escuro': '#b8934b',
  'ouro-claro': '#edd29a',
  ok: '#6cc08b', // status: disponível
  reserva: '#e0995a', // status: reservado
  erro: '#ef8a80',
};

/* -------------------------------------------------------------------------- */
/* Logomarcas e fotografias (arquivos dentro de /public)                      */
/* -------------------------------------------------------------------------- */

export const BRAND = {
  /**
   * Logomarca do Thiago (versão para fundo escuro, sem a linha de contatos).
   * Os arquivos .webp são cópias sem perda dos originais .png na mesma pasta.
   */
  logo: 'brand/logo-thiago.webp',
  logoRatio: 1000 / 283,
  /** Logomarca completa, com WhatsApp e Instagram (rodapé) */
  logoFull: 'brand/logo-thiago-completo.webp',
  logoFullRatio: 1000 / 400,
};

export const PHOTOS = {
  hero: {
    src: 'media/thiago-hero-1200.webp',
    srcSet: 'media/thiago-hero-640.webp 640w, media/thiago-hero-960.webp 960w, media/thiago-hero-1200.webp 1200w',
    width: 1200,
    height: 1450,
    alt: 'Thiago Santos no showroom, entre os veículos da loja',
  },
  about: {
    src: 'media/thiago-sobre-1200.webp',
    srcSet: 'media/thiago-sobre-640.webp 640w, media/thiago-sobre-960.webp 960w, media/thiago-sobre-1200.webp 1200w',
    width: 1200,
    height: 1500,
    alt: 'Thiago Santos de braços cruzados na recepção da loja',
  },
  search: {
    src: 'media/thiago-busca-960.webp',
    srcSet: 'media/thiago-busca-640.webp 640w, media/thiago-busca-960.webp 960w',
    width: 960,
    height: 1200,
    alt: 'Thiago Santos pesquisando veículos no notebook',
  },
};

export const MEDIA = {
  /** Vídeo de fundo da chamada final (detalhe de pintura de um veículo) */
  finalCtaVideo: 'media/detalhe-acabamento.mp4',
  finalCtaPoster: 'media/detalhe-acabamento-poster.webp',
  /** Vídeo curto do showroom, usado na seção "Sobre o Thiago" */
  showroomVideo: 'media/showroom.mp4',
  showroomPoster: 'media/showroom-poster.webp',
};

/* -------------------------------------------------------------------------- */
/* Loja onde o Thiago atua                                                    */
/* -------------------------------------------------------------------------- */

export const PARTNER_STORE = {
  name: 'Fimavel Multimarcas',
  /**
   * Logomarca da loja (ex.: "brand/logo-loja.png"). Enquanto estiver vazia,
   * o site exibe apenas o nome da loja em texto, sem imagem quebrada.
   */
  logo: '',
  /** Site oficial da loja (opcional). Ex.: "https://fimavelmultimarcas.com.br" — confirme antes de preencher. */
  website: '',
};

/* -------------------------------------------------------------------------- */
/* Unidades                                                                   */
/* -------------------------------------------------------------------------- */
/*
   Campos entre colchetes ainda não foram informados e ficam ocultos no site.
   "hours" é o texto exibido (use \n para quebrar linha); "openingHours" é o
   mesmo horário no formato do Google (Mo-Fr 09:00-18:00), usado nos dados estruturados.
   Enquanto "name" estiver em branco, o card mostra "Unidade 1", "Unidade 2"...
   O botão "Como chegar" usa uma busca do Google Maps pelo endereço; se quiser,
   troque pelo link exato da loja no Google Maps.
*/

const mapsSearch = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const STORES: Store[] = [
  {
    id: 'loja-1',
    name: '[NOME DA LOJA 1]',
    address: 'Rua Joaquim Marques Lisboa, 135 – Vila de Vecchi, Jundiaí – SP, 13202-170',
    hours: 'Segunda a sexta: 9h às 18h\nSábado: 9h às 13h\nDomingo: fechado',
    openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00'],
    phone: '[TELEFONE]',
    mapsUrl: mapsSearch('Rua Joaquim Marques Lisboa, 135 - Vila de Vecchi, Jundiaí - SP, 13202-170'),
    instagram: '[INSTAGRAM]',
    vehicleTypes: '[TIPOS DE VEÍCULOS]',
    facade: {
      video: 'media/loja-1.mp4',
      poster: 'media/loja-1-poster.webp',
      position: '50% 55%',
      alt: 'Vídeo da unidade 1: fachada, veículos expostos sob a cobertura e área de atendimento',
    },
  },
  {
    id: 'loja-2',
    name: '[NOME DA LOJA 2]',
    address: 'Avenida Fernando Arens, 1566 – Vila Progresso, Jundiaí – SP',
    hours: 'Segunda a sexta: 9h às 18h\nSábado: 9h às 13h\nDomingo: fechado',
    openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00'],
    phone: '[TELEFONE]',
    mapsUrl: mapsSearch('Avenida Fernando Arens, 1566, Jundiaí - SP'),
    instagram: '[INSTAGRAM]',
    vehicleTypes: '[TIPOS DE VEÍCULOS]',
    facade: {
      video: 'media/loja-2.mp4',
      poster: 'media/loja-2-poster.webp',
      position: '50% 45%',
      alt: 'Vídeo da unidade 2: fachada, pátio coberto com veículos e recepção',
    },
  },
  {
    id: 'loja-3',
    name: '[NOME DA LOJA 3]',
    address: 'Avenida Fernando Arens, 1556 – Vila Progresso, Jundiaí – SP',
    hours: 'Segunda a sexta: 9h às 18h\nSábado: 9h às 13h\nDomingo: fechado',
    openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00'],
    phone: '[TELEFONE]',
    mapsUrl: mapsSearch('Avenida Fernando Arens, 1556, Jundiaí - SP'),
    instagram: '[INSTAGRAM]',
    vehicleTypes: '[TIPOS DE VEÍCULOS]',
    facade: {
      video: 'media/loja-3.mp4',
      poster: 'media/loja-3-poster.webp',
      position: '50% 55%',
      alt: 'Vídeo da unidade 3: fachada de vidro e showroom com veículos',
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Serviços                                                                   */
/* -------------------------------------------------------------------------- */
/*
   Use "enabled: false" para esconder um serviço que ainda não foi validado.
   Compra, troca e financiamento constam na própria logomarca
   ("Vendo – Financio – Troco – Compro").
*/

export const SERVICES: Service[] = [
  {
    id: 'compra',
    enabled: true,
    icon: 'compra',
    title: 'Compra de veículos',
    description: 'Atendimento para encontrar o modelo adequado ao perfil, à necessidade e ao orçamento do cliente.',
  },
  {
    id: 'troca',
    enabled: true,
    icon: 'troca',
    title: 'Troca e avaliação',
    description: 'Análise do veículo usado para estudar possibilidades de entrada na negociação.',
  },
  {
    id: 'financiamento',
    enabled: true,
    icon: 'financiamento',
    title: 'Financiamento',
    description:
      'Orientação durante a consulta de condições de financiamento, sujeita à análise e aprovação das instituições responsáveis.',
  },
  {
    id: 'busca',
    enabled: true,
    icon: 'busca',
    title: 'Busca personalizada',
    description: 'Atendimento para clientes que procuram um modelo específico.',
  },
  {
    id: 'distancia',
    enabled: true,
    icon: 'distancia',
    title: 'Atendimento à distância',
    description: 'Suporte pelo WhatsApp para clientes de São Paulo e Grande São Paulo.',
  },
  {
    id: 'posvenda',
    enabled: true,
    icon: 'posvenda',
    title: 'Pós-venda',
    description: 'Acompanhamento após a entrega para oferecer mais segurança e proximidade.',
  },
];

/* -------------------------------------------------------------------------- */
/* Depoimentos                                                                */
/* -------------------------------------------------------------------------- */
/*
   Adicione somente depoimentos reais e fotos autorizadas pelos clientes.
   Enquanto a lista estiver vazia, a seção mostra um aviso discreto.
   Para esconder a seção inteira (e o item do menu), use enabled: false.

   Exemplo de item:
   {
     id: 'cliente-1',
     name: 'M. A.',
     photo: 'depoimentos/cliente-1.webp',
     vehicle: 'Volkswagen Polo 2023',
     text: 'Texto do depoimento, exatamente como o cliente escreveu.',
     rating: 5,
     source: 'Google',
     sourceUrl: 'https://...',
   },
*/

export const TESTIMONIALS: { enabled: boolean; items: Testimonial[] } = {
  enabled: true,
  items: [],
};

/* -------------------------------------------------------------------------- */
/* Perguntas frequentes                                                       */
/* -------------------------------------------------------------------------- */

export const FAQ: FaqItem[] = [
  {
    question: 'Posso usar meu veículo como entrada?',
    answer:
      'Sim, o seu veículo pode ser estudado como parte do pagamento. O valor considerado depende da avaliação presencial do estado de conservação, da documentação e das condições de mercado no momento da negociação.',
  },
  {
    question: 'É possível fazer uma avaliação inicial à distância?',
    answer:
      'Sim. Pelo formulário de avaliação ou pelo WhatsApp, você envia os dados e as fotos do veículo para uma análise inicial. A proposta definitiva só é feita depois da vistoria presencial.',
  },
  {
    question: 'Vocês trabalham com financiamento?',
    answer:
      'O Thiago orienta a simulação e o envio da proposta às instituições financeiras. A aprovação, as taxas e as condições dependem da análise de crédito de cada instituição.',
  },
  {
    question: 'Posso solicitar um veículo específico?',
    answer:
      'Pode. Informe marca, modelo, ano e faixa de investimento na busca personalizada. O Thiago verifica as opções e retorna com os veículos compatíveis que encontrar.',
  },
  {
    question: 'O atendimento é somente em São Paulo?',
    answer:
      'O foco do atendimento é São Paulo e Grande São Paulo. Se você está em outra região, chame no WhatsApp para verificar se é possível atender o seu caso.',
  },
  {
    question: 'Os veículos disponíveis podem mudar?',
    answer:
      'Sim. O estoque muda com frequência e um veículo pode ser reservado ou vendido a qualquer momento. Confirme a disponibilidade pelo WhatsApp antes de ir até a loja.',
  },
  {
    question: 'Como faço para agendar uma visita?',
    answer:
      'Chame o Thiago no WhatsApp ou use o botão "Agendar atendimento" da unidade que preferir. Ele confirma com você o dia, o horário e a unidade.',
  },
];

/* -------------------------------------------------------------------------- */
/* Filtros e formulários                                                      */
/* -------------------------------------------------------------------------- */

export const PRICE_RANGES: PriceRange[] = [
  { id: 'ate-60', label: 'Até R$ 60 mil', min: 0, max: 60000 },
  { id: '60-100', label: 'R$ 60 mil a R$ 100 mil', min: 60000, max: 100000 },
  { id: '100-150', label: 'R$ 100 mil a R$ 150 mil', min: 100000, max: 150000 },
  { id: 'acima-150', label: 'Acima de R$ 150 mil', min: 150000, max: Number.POSITIVE_INFINITY },
];

export const INVESTMENT_OPTIONS = [
  'Até R$ 50 mil',
  'De R$ 50 mil a R$ 80 mil',
  'De R$ 80 mil a R$ 120 mil',
  'De R$ 120 mil a R$ 180 mil',
  'Acima de R$ 180 mil',
  'Prefiro conversar',
];

export const CONDITION_OPTIONS = ['Excelente', 'Bom', 'Regular', 'Precisa de reparos'];

/* -------------------------------------------------------------------------- */
/* Menu e links externos                                                      */
/* -------------------------------------------------------------------------- */

export const NAV_ITEMS = [
  { id: 'inicio', label: 'Início' },
  { id: 'veiculos', label: 'Veículos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre o Thiago' },
  { id: 'lojas', label: 'Lojas' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'contato', label: 'Contato' },
];

export const LINKS = {
  instagram: `https://www.instagram.com/${CONTACT.instagram}/`,
  /** Catálogo de veículos do Thiago no WhatsApp */
  whatsappCatalog: `https://wa.me/c/${WHATSAPP_NUMBER}`,
  /** Perfil no Google, onde ficam as avaliações dos clientes */
  googleReviews: 'https://g.page/r/CTdiiMQcGJ5-EAE',
  /** Link para o cliente deixar uma avaliação no Google */
  googleReviewWrite: 'https://g.page/r/CTdiiMQcGJ5-EAE/review',
};

/* ==========================================================================
   FAIXA DE CONDIÇÕES (aparece acima da vitrine de veículos)
   Para tirar do site, troque "enabled: true" por "enabled: false".
   ========================================================================== */
export const PROMO = {
  enabled: true,
  label: 'Condições do momento',
  title: 'Primeiro pagamento só em dezembro',
  text: 'Mais de 150 veículos em estoque. Se o modelo que você procura não estiver aqui, peça ao Thiago.',
  items: [
    'Financiamento em até 60x',
    'Entrada em até 12x sem juros no cartão de crédito',
    'Seu carro de menor ou maior valor como entrada',
    'Trabalhamos com todas as financeiras',
    'Carros a pronta entrega',
  ],
  /** Texto pequeno no rodapé da faixa */
  footnote: 'Financiamento sujeito à análise e aprovação de crédito.',
  whatsappMessage: 'Olá, Thiago! Vim pelo seu site e gostaria de saber mais sobre as condições de pagamento.',
};

/** Avisos legais exibidos no rodapé e nos detalhes do veículo */
export const LEGAL = {
  priceNotice: 'Preços, disponibilidade e condições podem sofrer alterações sem aviso prévio.',
  financingNotice: 'Financiamentos estão sujeitos à análise e aprovação de crédito pelas instituições financeiras.',
  tradeInNotice: 'O valor do veículo usado depende de vistoria presencial.',
  privacyUpdatedAt: 'outubro de 2026',
};
