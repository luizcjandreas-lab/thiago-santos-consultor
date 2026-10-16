import { CalendarCheck, Car, Clock, MapPin, Navigation, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { STORES } from '../config/site';
import type { Store } from '../config/types';
import { track } from '../lib/analytics';
import { asset, isFilled, storeLabel } from '../lib/utils';
import { messages, whatsappUrl } from '../lib/whatsapp';
import { AutoVideo } from './ui/AutoVideo';
import { ButtonLink } from './ui/Button';
import { InstagramIcon } from './ui/Icons';
import { SectionHeader } from './ui/SectionHeader';

export function Stores() {
  return (
    <section id="lojas" aria-labelledby="lojas-titulo" className="section-y border-t border-aco bg-asfalto">
      <div className="container-site">
        <SectionHeader
          id="lojas-titulo"
          title="Três lojas para você visitar"
          description="Escolha a unidade mais perto de você. Antes de ir, chame o Thiago para confirmar o veículo e o horário."
        />
        <ul className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {STORES.map((store, i) => (
            <li key={store.id} className="flex min-w-0">
              <StoreCard store={store} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StoreCard({ store, index }: { store: Store; index: number }) {
  const titleId = `loja-${store.id}`;
  const media = store.facade;

  return (
    <article
      aria-labelledby={titleId}
      className="flex w-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-aco bg-grafite sm:flex-row lg:flex-col"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-chumbo sm:aspect-auto sm:min-h-[19rem] sm:w-[42%] lg:aspect-[4/3] lg:min-h-0 lg:w-full">
        {media.video ? (
          <AutoVideo
            src={media.video}
            poster={media.poster}
            label={media.alt}
            objectPosition={media.position}
            className="absolute! inset-0"
          />
        ) : media.image ? (
          <img
            src={asset(media.image)}
            alt={media.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: media.position }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-cimento">
            <MapPin size={26} strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}
        {isFilled(store.name) && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.75rem] text-nevoa backdrop-blur-sm">
            Unidade {index + 1}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <h3 id={titleId} className="font-wide text-[1.25rem] font-bold leading-snug text-branco">
          {storeLabel(store)}
        </h3>
        <dl className="flex flex-col gap-3 text-[0.93rem]">
          <InfoRow icon={<MapPin size={17} strokeWidth={1.7} />} label="Endereço" value={store.address} />
          <InfoRow icon={<Clock size={17} strokeWidth={1.7} />} label="Horário" value={store.hours} />
          <InfoRow icon={<Phone size={17} strokeWidth={1.7} />} label="Telefone" value={store.phone} />
          <InfoRow icon={<Car size={17} strokeWidth={1.7} />} label="Veículos" value={store.vehicleTypes} />
          <InfoRow
            icon={<InstagramIcon size={17} />}
            label="Instagram"
            value={store.instagram}
            render={(v) => (
              <a
                href={`https://www.instagram.com/${v.replace(/^@/, '')}/`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('instagram_click', { location: 'store', store: store.id })}
                className="text-nevoa underline-offset-4 hover:text-ouro-claro hover:underline"
              >
                @{v.replace(/^@/, '')}
              </a>
            )}
          />
        </dl>
        <div className="mt-auto grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-2 lg:grid-cols-1">
          {isFilled(store.mapsUrl) && (
            <ButtonLink
              href={store.mapsUrl}
              variant="secondary"
              icon={<Navigation size={17} aria-hidden="true" />}
              onClick={() => track('store_directions', { store: store.id })}
            >
              Como chegar
            </ButtonLink>
          )}
          <ButtonLink
            href={whatsappUrl(messages.store(store))}
            icon={<CalendarCheck size={17} aria-hidden="true" />}
            onClick={() => track('store_schedule', { store: store.id })}
            aria-label={`Agendar atendimento na ${storeLabel(store)}`}
          >
            Agendar atendimento
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

function InfoRow({
  icon,
  label,
  value,
  render,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  render?: (value: string) => ReactNode;
}) {
  // Campos ainda não informados em site.ts ficam ocultos
  if (!isFilled(value)) return null;
  return (
    <div className="flex gap-3">
      <dt className="mt-0.5 shrink-0 text-ouro" aria-label={label}>
        <span aria-hidden="true">{icon}</span>
      </dt>
      <dd className="min-w-0 whitespace-pre-line break-words leading-snug text-nevoa">{render ? render(value) : value}</dd>
    </div>
  );
}
