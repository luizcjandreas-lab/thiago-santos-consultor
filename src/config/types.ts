// Tipos usados pelos arquivos de configuração (site.ts e estoque.ts).
// Normalmente você não precisa editar este arquivo.

export type VehicleStatus = 'disponivel' | 'reservado' | 'vendido';
export type BodyType = 'hatch' | 'sedan' | 'suv' | 'picape';
export type Transmission = 'Manual' | 'Automático' | 'CVT' | 'Automatizado';
export type Fuel = 'Flex' | 'Gasolina' | 'Diesel' | 'Híbrido' | 'Elétrico';

export interface Vehicle {
  /** Identificador único, sem espaços. Ex.: "polo-highline-2023" */
  id: string;
  /** true = veículo de demonstração (aparece com a etiqueta "Exemplo"). Remova ao cadastrar o estoque real. */
  demo?: boolean;
  brand: string;
  model: string;
  version: string;
  /** Ano de fabricação (opcional) e ano do modelo */
  yearMake?: number;
  yearModel: number;
  km: number;
  transmission: Transmission;
  fuel: Fuel;
  /** Preço em reais. Use null para exibir "Consulte". */
  price: number | null;
  color: string;
  /** Usado para a ilustração quando o veículo ainda não tem fotos */
  bodyType: BodyType;
  /** Deve corresponder ao "id" de uma loja em STORES (site.ts) */
  storeId: string;
  status: VehicleStatus;
  /** Caminhos das fotos dentro de /public. A primeira é a foto principal. Ex.: "estoque/polo-2023/1.webp" */
  images: string[];
  engine?: string;
  doors?: number;
  features: string[];
  notes?: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  /** Link do Google Maps (botão "Como chegar") */
  mapsUrl: string;
  /** Usuário do Instagram da unidade, sem @ */
  instagram: string;
  vehicleTypes: string;
  facade: {
    image?: string;
    video?: string;
    poster?: string;
    /** Enquadramento da mídia (CSS object-position). Ex.: "50% 40%" */
    position?: string;
    alt: string;
  };
}

export type ServiceIcon = 'compra' | 'troca' | 'financiamento' | 'busca' | 'distancia' | 'posvenda';

export interface Service {
  id: string;
  /** false = o serviço não aparece no site */
  enabled: boolean;
  icon: ServiceIcon;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  /** Nome completo ou iniciais, conforme autorização do cliente */
  name: string;
  /** Foto autorizada (opcional), dentro de /public */
  photo?: string;
  vehicle?: string;
  text: string;
  /** De 1 a 5 (opcional) */
  rating?: number;
  /** Origem da avaliação. Ex.: "Google", "Instagram", "WhatsApp" */
  source?: string;
  sourceUrl?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}
