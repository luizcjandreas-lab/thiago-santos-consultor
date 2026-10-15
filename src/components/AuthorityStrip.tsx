import { BadgeCheck, CalendarClock, Handshake, MapPin } from 'lucide-react';
import { PROFILE } from '../config/site';

const ITEMS = [
  { icon: CalendarClock, title: `${PROFILE.experienceYears} anos de experiência`, text: 'Trabalhando com venda de veículos' },
  { icon: BadgeCheck, title: PROFILE.role, text: 'Função atual na loja' },
  { icon: MapPin, title: PROFILE.region, text: 'Região de atendimento' },
  { icon: Handshake, title: 'Consultoria personalizada', text: 'Atendimento pensado para cada cliente' },
];

export function AuthorityStrip() {
  return (
    <section id="diferenciais" aria-label="Diferenciais" className="border-y border-aco bg-grafite">
      <div className="container-site">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className={[
                'flex flex-col gap-3 py-7 sm:flex-row sm:items-start sm:gap-4 lg:py-9',
                index % 2 === 1 ? 'border-l border-aco pl-5 sm:pl-7' : 'pr-5',
                index >= 2 ? 'border-t border-aco lg:border-t-0' : '',
                index === 2 ? 'lg:border-l lg:pl-7' : '',
                index > 0 ? 'lg:pl-7' : '',
              ].join(' ')}
            >
              <Icon size={24} strokeWidth={1.6} className="mt-0.5 shrink-0 text-ouro" aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-wide text-[1.02rem] font-semibold leading-snug text-branco">{title}</p>
                <p className="mt-1 text-[0.88rem] leading-snug text-cimento">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
