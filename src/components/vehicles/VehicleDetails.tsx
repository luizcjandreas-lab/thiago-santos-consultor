import { MapPin, MessageCircle, Navigation } from 'lucide-react';
import { LEGAL } from '../../config/site';
import type { Vehicle } from '../../config/types';
import { track } from '../../lib/analytics';
import { cx, displayAddress, findStore, formatKm, formatPrice, formatYear, isFilled, storeLabel } from '../../lib/utils';
import { messages, whatsappUrl } from '../../lib/whatsapp';
import { ButtonLink } from '../ui/Button';
import { Dialog, DialogClose } from '../ui/Dialog';
import { Gallery } from './Gallery';
import { StatusBadge } from './StatusBadge';

interface Props {
  open: boolean;
  /** Mantido mesmo após fechar, para o conteúdo continuar visível durante a animação de saída */
  vehicle: Vehicle | null;
  onClose: () => void;
}

export function VehicleDetails({ open, vehicle, onClose }: Props) {
  return (
    <Dialog open={open && vehicle !== null} onClose={onClose} labelledBy="detalhes-titulo">
      {vehicle && <DetailsContent v={vehicle} onClose={onClose} />}
    </Dialog>
  );
}

function DetailsContent({ v, onClose }: { v: Vehicle; onClose: () => void }) {
  const store = findStore(v.storeId);
  const sold = v.status === 'vendido';
  const specs: Array<[string, string | undefined]> = [
    ['Marca', v.brand],
    ['Modelo', v.model],
    ['Versão', v.version],
    ['Ano', formatYear(v)],
    ['Quilometragem', v.km != null ? formatKm(v.km) : undefined],
    ['Câmbio', v.transmission],
    ['Combustível', v.fuel],
    ['Cor', v.color],
    ['Motor', v.engine],
    ['Portas', v.doors ? String(v.doors) : undefined],
  ];

  return (
    <>
      <div
        className="flex items-center justify-between gap-4 border-b border-aco px-5 py-3 md:px-7"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0px))' }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <StatusBadge status={v.status} />
        </div>
        <DialogClose onClose={onClose} label="Fechar detalhes do veículo" />
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="grid gap-8 px-5 py-6 md:px-7 md:py-7 lg:grid-cols-[1.12fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-6">
            <Gallery vehicle={v} />
            <section aria-labelledby="det-condicoes" className="hidden rounded-[12px] border border-aco p-5 lg:block">
              <Conditions id="det-condicoes" />
            </section>
          </div>

          <div className="flex min-w-0 flex-col gap-7">
            <header>
              <p className="text-[0.9rem] text-cimento">{v.brand}</p>
              <h2 id="detalhes-titulo" className="mt-1 font-wide text-[1.9rem] font-bold leading-[1.08] tracking-[-0.02em] text-branco">
                {v.model} <span className="font-semibold text-nevoa">{v.version}</span>
              </h2>
              <p className="mt-2 text-[0.95rem] tabular-nums text-cimento">
                {[formatYear(v), v.km != null ? formatKm(v.km) : null, v.transmission, v.fuel].filter(Boolean).join(' • ')}
              </p>
              <p
                className={cx(
                  'mt-5 font-wider text-[2rem] font-extrabold leading-none tracking-[-0.025em] tabular-nums',
                  sold ? 'text-cimento' : v.price == null ? 'text-ouro-claro' : 'text-branco',
                )}
              >
                {sold ? 'Vendido' : formatPrice(v.price)}
              </p>
            </header>

            <section aria-labelledby="det-ficha">
              <h3 id="det-ficha" className="font-wide text-[1.05rem] font-semibold text-branco">
                Ficha técnica
              </h3>
              <dl className="mt-3 grid grid-cols-2 border-t border-aco">
                {specs
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div key={label} className="min-w-0 border-b border-aco py-3 pr-3">
                      <dt className="text-[0.78rem] text-cimento">{label}</dt>
                      <dd className="mt-0.5 break-words text-[0.95rem] font-medium tabular-nums text-branco">{value}</dd>
                    </div>
                  ))}
              </dl>
            </section>

            {v.features.length > 0 && (
              <section aria-labelledby="det-opcionais">
                <h3 id="det-opcionais" className="font-wide text-[1.05rem] font-semibold text-branco">
                  Opcionais
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {v.features.map((f) => (
                    <li key={f} className="rounded-full border border-aco bg-chumbo px-3 py-1.5 text-[0.85rem] text-nevoa">
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {v.notes && (
              <section aria-labelledby="det-obs">
                <h3 id="det-obs" className="font-wide text-[1.05rem] font-semibold text-branco">
                  Observações
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-nevoa">{v.notes}</p>
              </section>
            )}

            {store && (
            <section aria-labelledby="det-unidade" className="rounded-[12px] border border-aco p-5">
              <h3 id="det-unidade" className="flex items-center gap-2 font-wide text-[1.05rem] font-semibold text-branco">
                <MapPin size={18} strokeWidth={1.8} aria-hidden="true" className="text-ouro" />
                Onde o veículo está
              </h3>
              <p className="mt-2 text-[0.95rem] text-branco">{storeLabel(store)}</p>
              {isFilled(store.address) && <p className="mt-1 text-[0.9rem] text-nevoa">{displayAddress(store.address)}</p>}
              {isFilled(store.mapsUrl) && (
                <div className="mt-4">
                  <ButtonLink
                    href={store.mapsUrl}
                    variant="secondary"
                    size="sm"
                    icon={<Navigation size={16} aria-hidden="true" />}
                    onClick={() => track('store_directions', { store: store.id, location: 'vehicle_details' })}
                  >
                    Como chegar
                  </ButtonLink>
                </div>
              )}
            </section>
            )}

            <section aria-labelledby="det-condicoes-m" className="rounded-[12px] border border-aco p-5 lg:hidden">
              <Conditions id="det-condicoes-m" />
            </section>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col gap-3 border-t border-aco bg-grafite px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-7"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <p className="text-[0.85rem] text-cimento">
          {sold ? 'Este veículo já foi vendido. O Thiago pode buscar um parecido para você.' : 'Consulte disponibilidade e condições direto com o Thiago.'}
        </p>
        <ButtonLink
          href={whatsappUrl(sold ? messages.soldVehicle(v) : messages.vehicle(v))}
          size="lg"
          className="w-full sm:w-auto"
          icon={<MessageCircle size={20} strokeWidth={2} aria-hidden="true" />}
          onClick={() => track('vehicle_interest', { vehicle: v.id, status: v.status, location: 'details' })}
        >
          {sold ? 'Buscar um parecido' : 'Falar sobre este veículo'}
        </ButtonLink>
      </div>
    </>
  );
}

function Conditions({ id }: { id: string }) {
  return (
    <>
      <h3 id={id} className="font-wide text-[1.05rem] font-semibold text-branco">
        Condições importantes
      </h3>
      <ul className="mt-3 flex flex-col gap-2 text-[0.88rem] leading-relaxed text-cimento">
        {[LEGAL.priceNotice, LEGAL.financingNotice, LEGAL.tradeInNotice].map((text) => (
          <li key={text} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-ouro" />
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}
