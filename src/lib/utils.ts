import { STORES } from '../config/site';
import type { Store, Vehicle, VehicleStatus } from '../config/types';

/** true quando o valor foi preenchido (não está vazio nem no formato "[PREENCHER]") */
export function isFilled(value: string | null | undefined): value is string {
  if (!value) return false;
  const v = value.trim();
  return v.length > 0 && !/^\[.*\]$/.test(v);
}

/** Resolve um caminho de /public respeitando o "base" do Vite */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export function srcSet(value: string): string {
  return value
    .split(',')
    .map((part) => {
      const [url, size] = part.trim().split(/\s+/);
      return `${asset(url)} ${size}`;
    })
    .join(', ');
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const integer = new Intl.NumberFormat('pt-BR');

export const formatPrice = (price: number | null) => (price == null ? 'Consulte' : currency.format(price));
export const formatKm = (km?: number) => (km == null ? 'Consulte' : `${integer.format(km)} km`);
export const formatYear = (v: Pick<Vehicle, 'yearMake' | 'yearModel'>) =>
  v.yearMake && v.yearMake !== v.yearModel ? `${v.yearMake}/${v.yearModel}` : String(v.yearModel);

export const vehicleName = (v: Vehicle) => `${v.brand} ${v.model} ${v.version} ${v.yearModel}`;

export const STATUS_LABEL: Record<VehicleStatus, string> = {
  disponivel: 'Disponível',
  reservado: 'Reservado',
  vendido: 'Vendido',
};

export function findStore(id?: string): Store | undefined {
  if (!id) return undefined;
  return STORES.find((s) => s.id === id);
}

/** Nome da unidade para exibição (mostra "Unidade 1" enquanto o nome não foi preenchido) */
export function storeLabel(store: Store): string {
  if (isFilled(store.name)) return store.name;
  const index = STORES.indexOf(store);
  return `Unidade ${index + 1}`;
}

/** Máscara de telefone brasileiro: (11) 91234-5678 */
export function maskPhone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function isValidPhone(value: string): boolean {
  const d = value.replace(/\D/g, '');
  return d.length === 10 || d.length === 11;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}
