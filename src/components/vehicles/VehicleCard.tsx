import { MapPin, MessageCircle } from 'lucide-react';
import type { Vehicle } from '../../config/types';
import { track } from '../../lib/analytics';
import { asset, cx, findStore, formatKm, formatPrice, formatYear, storeLabel } from '../../lib/utils';
import { messages, whatsappUrl } from '../../lib/whatsapp';
import { Button, ButtonLink } from '../ui/Button';
import { SoldBand, StatusBadge } from './StatusBadge';
import { VehiclePlaceholder } from './VehiclePlaceholder';

interface Props {
  vehicle: Vehicle;
  onOpen: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle: v, onOpen }: Props) {
  const sold = v.status === 'vendido';
  const store = findStore(v.storeId);
  const cover = v.images[0];
  const titleId = `veiculo-${v.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className="flex w-full min-w-0 flex-col overflow-hidden rounded-[14px] border border-aco bg-grafite transition-colors duration-300 hover:border-aco-claro"
    >
      <button
        type="button"
        onClick={() => onOpen(v)}
        className="group relative block aspect-[4/3] w-full overflow-hidden bg-chumbo text-left"
        aria-label={`Ver fotos e detalhes: ${v.brand} ${v.model} ${v.version}`}
      >
        {cover ? (
          <img
            src={asset(cover)}
            alt={`${v.brand} ${v.model} ${v.version}, ${formatYear(v)}`}
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
            className={cx('h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]', sold && 'grayscale-[60%]')}
          />
        ) : (
          <VehiclePlaceholder
            bodyType={v.bodyType}
            color={v.color}
            caption={sold ? undefined : v.demo ? 'Imagem ilustrativa' : 'Fotos em breve'}
            className={sold ? 'opacity-60' : undefined}
          />
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <StatusBadge status={v.status} />
        </div>
        {v.demo && (
          <span className="absolute right-3 top-3 rounded-full border border-ouro/40 bg-asfalto/80 px-2.5 py-1 text-[0.72rem] font-medium text-ouro-claro">
            Exemplo
          </span>
        )}
        {v.images.length > 1 && !sold && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.72rem] text-nevoa">
            {v.images.length} fotos
          </span>
        )}
        {sold && <SoldBand />}
      </button>

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <div className="min-w-0">
          <p className="text-[0.85rem] text-cimento">{v.brand}</p>
          <h3 id={titleId} className="mt-0.5 font-wide text-[1.3rem] font-bold leading-tight tracking-[-0.015em] text-branco">
            {v.model}
          </h3>
          <p className="mt-1 truncate text-[0.92rem] text-nevoa" title={v.version}>
            {v.version}
          </p>
        </div>

        {/* Ficha resumida, no formato de etiqueta de concessionária */}
        <dl className="grid grid-cols-2 border-t border-aco tabular-nums">
          {[
            ['Ano', formatYear(v)],
            ['Km', formatKm(v.km)],
            ['Câmbio', v.transmission],
            ['Combustível', v.fuel],
          ].map(([label, value], i) => (
            <div
              key={label}
              className={cx('flex min-w-0 items-baseline justify-between gap-2 border-b border-aco py-2.5', i % 2 === 1 ? 'border-l pl-3.5' : 'pr-3.5')}
            >
              <dt className="shrink-0 text-[0.78rem] text-cimento">{label}</dt>
              <dd className="truncate font-narrow text-[0.92rem] font-medium text-branco">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.75rem] text-cimento">{sold ? 'Situação' : 'Preço'}</p>
            <p
              className={cx(
                'mt-1 font-wide text-[1.45rem] font-bold leading-none tracking-[-0.02em] tabular-nums',
                sold ? 'text-cimento' : v.price == null ? 'text-ouro-claro' : 'text-branco',
              )}
            >
              {sold ? 'Vendido' : formatPrice(v.price)}
            </p>
          </div>
          <p className="flex min-w-0 items-center gap-1.5 text-right text-[0.82rem] text-cimento">
            <MapPin size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
            <span className="truncate">{storeLabel(store)}</span>
          </p>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2.5">
          <Button variant="secondary" size="md" className="px-3" onClick={() => onOpen(v)}>
            Ver detalhes
          </Button>
          <ButtonLink
            href={whatsappUrl(sold ? messages.soldVehicle(v) : messages.vehicle(v))}
            size="md"
            className="px-3"
            icon={<MessageCircle size={17} strokeWidth={2} aria-hidden="true" />}
            onClick={() => track('vehicle_interest', { vehicle: v.id, status: v.status, location: 'card' })}
            aria-label={sold ? `Buscar um veículo parecido com ${v.brand} ${v.model}` : `Tenho interesse no ${v.brand} ${v.model}`}
          >
            {sold ? 'Quero parecido' : 'Tenho interesse'}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
