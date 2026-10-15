import { PRICE_RANGES, STORES } from '../../config/site';
import type { Vehicle, VehicleStatus } from '../../config/types';
import { STATUS_LABEL, storeLabel } from '../../lib/utils';

export interface Filters {
  brand: string;
  model: string;
  price: string;
  year: string;
  transmission: string;
  fuel: string;
  store: string;
  status: string;
}

export const EMPTY_FILTERS: Filters = {
  brand: '',
  model: '',
  price: '',
  year: '',
  transmission: '',
  fuel: '',
  store: '',
  status: '',
};

export type SortKey = 'relevancia' | 'menor-preco' | 'maior-preco' | 'mais-novos' | 'menor-km';

export const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: 'relevancia', label: 'Disponíveis primeiro' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'mais-novos', label: 'Mais novos' },
  { value: 'menor-km', label: 'Menor quilometragem' },
];

const STATUS_ORDER: Record<VehicleStatus, number> = { disponivel: 0, reservado: 1, vendido: 2 };

const unique = <T,>(values: T[]) => Array.from(new Set(values));
const byText = (a: string, b: string) => a.localeCompare(b, 'pt-BR');

export function filterOptions(vehicles: Vehicle[], filters: Filters) {
  return {
    brand: unique(vehicles.map((v) => v.brand)).sort(byText).map((b) => ({ value: b, label: b })),
    model: unique(vehicles.filter((v) => !filters.brand || v.brand === filters.brand).map((v) => v.model))
      .sort(byText)
      .map((m) => ({ value: m, label: m })),
    price: PRICE_RANGES.map((r) => ({ value: r.id, label: r.label })),
    year: unique(vehicles.map((v) => v.yearModel))
      .sort((a, b) => b - a)
      .map((y) => ({ value: String(y), label: `${y} ou mais novo` })),
    transmission: unique(vehicles.map((v) => v.transmission)).sort(byText).map((t) => ({ value: t, label: t })),
    fuel: unique(vehicles.map((v) => v.fuel)).sort(byText).map((f) => ({ value: f, label: f })),
    store: STORES.map((s) => ({ value: s.id, label: storeLabel(s) })),
    status: (Object.keys(STATUS_LABEL) as VehicleStatus[]).map((s) => ({ value: s, label: STATUS_LABEL[s] })),
  };
}

export function applyFilters(vehicles: Vehicle[], f: Filters, sort: SortKey): Vehicle[] {
  const range = PRICE_RANGES.find((r) => r.id === f.price);
  const list = vehicles.filter((v) => {
    if (f.brand && v.brand !== f.brand) return false;
    if (f.model && v.model !== f.model) return false;
    if (range && (v.price == null || v.price < range.min || v.price >= range.max)) return false;
    if (f.year && v.yearModel < Number(f.year)) return false;
    if (f.transmission && v.transmission !== f.transmission) return false;
    if (f.fuel && v.fuel !== f.fuel) return false;
    if (f.store && v.storeId !== f.store) return false;
    if (f.status && v.status !== f.status) return false;
    return true;
  });

  const price = (v: Vehicle, dir: 1 | -1) => (v.price == null ? Number.POSITIVE_INFINITY : v.price * dir);
  return list.sort((a, b) => {
    // Vendidos ficam sempre por último, servindo apenas como histórico
    const sold = Number(a.status === 'vendido') - Number(b.status === 'vendido');
    if (sold !== 0) return sold;
    switch (sort) {
      case 'menor-preco':
        return price(a, 1) - price(b, 1);
      case 'maior-preco':
        return price(a, -1) - price(b, -1);
      case 'mais-novos':
        return b.yearModel - a.yearModel;
      case 'menor-km':
        return a.km - b.km;
      default:
        return STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || b.yearModel - a.yearModel;
    }
  });
}

export const FILTER_FIELDS: Array<{ key: keyof Filters; label: string; all: string }> = [
  { key: 'brand', label: 'Marca', all: 'Todas as marcas' },
  { key: 'model', label: 'Modelo', all: 'Todos os modelos' },
  { key: 'price', label: 'Faixa de preço', all: 'Qualquer valor' },
  { key: 'year', label: 'Ano', all: 'Qualquer ano' },
  { key: 'transmission', label: 'Câmbio', all: 'Todos' },
  { key: 'fuel', label: 'Combustível', all: 'Todos' },
  { key: 'store', label: 'Loja', all: 'Todas as unidades' },
  { key: 'status', label: 'Status', all: 'Todos' },
];
