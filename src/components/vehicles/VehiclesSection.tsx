import { CarFront, Info, MessageCircle, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { STOCK } from '../../config/estoque';
import type { Vehicle } from '../../config/types';
import { track } from '../../lib/analytics';
import { cx } from '../../lib/utils';
import { whatsappUrl } from '../../lib/whatsapp';
import { Button, ButtonLink } from '../ui/Button';
import { SelectInput } from '../ui/Field';
import { SectionHeader } from '../ui/SectionHeader';
import { EMPTY_FILTERS, FILTER_FIELDS, SORT_OPTIONS, applyFilters, filterOptions, type Filters, type SortKey } from './filters';
import { VehicleCard } from './VehicleCard';
import { VehicleDetails } from './VehicleDetails';

export function VehiclesSection() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortKey>('relevancia');
  const [panelOpen, setPanelOpen] = useState(false);
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const options = useMemo(() => filterOptions(STOCK, filters), [filters]);
  const results = useMemo(() => applyFilters(STOCK, filters, sort), [filters, sort]);
  const activeCount = Object.values(filters).filter(Boolean).length;
  const hasDemo = STOCK.some((v) => v.demo);
  const availableCount = results.filter((v) => v.status === 'disponivel').length;

  const update = (key: keyof Filters, value: string) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      // Ao trocar a marca, o modelo selecionado pode deixar de existir
      if (key === 'brand' && value && prev.model && !STOCK.some((v) => v.brand === value && v.model === prev.model)) {
        next.model = '';
      }
      return next;
    });
    track('vehicle_filter', { field: key, value: value || 'todos' });
  };

  const open = (v: Vehicle) => {
    setSelected(v);
    setDetailsOpen(true);
    track('vehicle_details_open', { vehicle: v.id, status: v.status });
  };

  return (
    <section id="veiculos" aria-labelledby="veiculos-titulo" className="section-y bg-asfalto">
      <div className="container-site">
        <SectionHeader
          id="veiculos-titulo"
          title="Encontre o veículo certo para você"
          description="Confira algumas das opções disponíveis e fale diretamente com o Thiago para consultar condições, disponibilidade e possibilidades de negociação."
        />

        {hasDemo && (
          <p className="mt-10 flex gap-3 rounded-[12px] border border-aco bg-grafite px-4 py-3.5 text-[0.9rem] leading-relaxed text-nevoa sm:items-center">
            <Info size={18} strokeWidth={1.8} aria-hidden="true" className="mt-0.5 shrink-0 text-ouro sm:mt-0" />
            <span>
              <strong className="font-semibold text-branco">Vitrine em demonstração.</strong> Os veículos marcados como “Exemplo”
              mostram como a página funciona e não fazem parte do estoque. Para saber o que está disponível hoje, fale com o
              Thiago.
            </span>
          </p>
        )}

        {STOCK.length === 0 ? (
          <EmptyStock />
        ) : (
          <>
        {/* Filtros */}
        <div className={cx('rounded-[14px] border border-aco bg-grafite', hasDemo ? 'mt-5' : 'mt-10')}>
          <div className="flex items-center justify-between gap-3 px-4 py-3 lg:hidden">
            <button
              type="button"
              onClick={() => setPanelOpen((o) => !o)}
              aria-expanded={panelOpen}
              aria-controls="painel-filtros"
              className="inline-flex h-11 items-center gap-2.5 rounded-[10px] px-2 font-semibold text-branco"
            >
              <SlidersHorizontal size={19} strokeWidth={1.8} aria-hidden="true" className="text-ouro" />
              Filtrar veículos
              {activeCount > 0 && (
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-ouro px-1.5 text-[0.78rem] text-asfalto">
                  {activeCount}
                </span>
              )}
            </button>
            {activeCount > 0 && (
              <button type="button" onClick={() => setFilters(EMPTY_FILTERS)} className="h-11 px-2 text-[0.9rem] text-cimento hover:text-branco">
                Limpar
              </button>
            )}
          </div>

          <div id="painel-filtros" className={cx('border-t border-aco p-4 sm:p-5 lg:block lg:border-t-0', panelOpen ? 'block' : 'hidden')}>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-4 lg:gap-x-4">
              {FILTER_FIELDS.map(({ key, label, all }) => (
                <div key={key} className="flex min-w-0 flex-col gap-1.5">
                  <label htmlFor={`filtro-${key}`} className="text-[0.8rem] text-cimento">
                    {label}
                  </label>
                  <SelectInput
                    id={`filtro-${key}`}
                    value={filters[key]}
                    onChange={(e) => update(key, e.target.value)}
                    className="min-h-11 py-2 text-[0.92rem]"
                  >
                    <option value="">{all}</option>
                    {options[key].map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </SelectInput>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo e ordenação */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.95rem] text-nevoa" aria-live="polite">
            <span className="font-semibold text-branco">{results.length}</span> {results.length === 1 ? 'veículo' : 'veículos'}
            {results.length > 0 && <span className="text-cimento"> • {availableCount} disponíveis</span>}
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="ml-3 inline-flex items-center gap-1.5 text-[0.9rem] text-ouro-claro underline-offset-4 hover:underline max-lg:hidden"
              >
                <RotateCcw size={14} aria-hidden="true" /> Limpar filtros
              </button>
            )}
          </p>
          <div className="flex items-center gap-3">
            <label htmlFor="ordenar" className="shrink-0 text-[0.85rem] text-cimento">
              Ordenar por
            </label>
            <SelectInput id="ordenar" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="min-h-10 py-1.5 text-[0.9rem]">
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectInput>
          </div>
        </div>

        {results.length > 0 ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((v) => (
              <li key={v.id} className="flex min-w-0">
                <VehicleCard vehicle={v} onOpen={open} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 flex flex-col items-start gap-5 rounded-[14px] border border-dashed border-aco-claro px-6 py-12 sm:items-center sm:text-center">
            <Search size={28} strokeWidth={1.6} aria-hidden="true" className="text-ouro" />
            <div>
              <p className="font-wide text-xl font-semibold text-branco">Nenhum veículo com esses filtros</p>
              <p className="mt-2 max-w-md text-nevoa">Tente ampliar a busca ou peça ao Thiago para procurar o modelo que você quer.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" onClick={() => setFilters(EMPTY_FILTERS)} icon={<RotateCcw size={17} aria-hidden="true" />}>
                Limpar filtros
              </Button>
              <ButtonLink href="#busca">Pedir uma busca personalizada</ButtonLink>
            </div>
          </div>
        )}
          </>
        )}
      </div>

      <VehicleDetails open={detailsOpen} vehicle={selected} onClose={() => setDetailsOpen(false)} />
    </section>
  );
}

/** Exibido enquanto não houver veículos cadastrados em src/config/estoque.ts */
function EmptyStock() {
  return (
    <div className="mt-10 grid gap-8 rounded-[16px] border border-aco bg-grafite p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6 lg:col-span-8">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-aco text-ouro">
          <CarFront size={24} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <div>
          <p className="font-wide text-[1.35rem] font-bold leading-snug text-branco">Estoque em atualização</p>
          <p className="mt-2 max-w-xl leading-relaxed text-nevoa">
            Os veículos disponíveis estão sendo cadastrados no site. Enquanto isso, chame o Thiago para saber o que tem nas lojas
            hoje ou peça uma busca pelo modelo que você procura.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
        <ButtonLink
          href={whatsappUrl('Olá, Thiago! Vim pelo seu site e gostaria de saber quais veículos estão disponíveis hoje.')}
          icon={<MessageCircle size={18} strokeWidth={2} aria-hidden="true" />}
          onClick={() => track('whatsapp_click', { location: 'empty_stock' })}
        >
          Consultar estoque
        </ButtonLink>
        <ButtonLink href="#busca" variant="secondary">
          Pedir uma busca personalizada
        </ButtonLink>
      </div>
    </div>
  );
}
