import { ArrowLeftRight, CarFront, Handshake, Landmark, MessagesSquare, ScanSearch, type LucideIcon } from 'lucide-react';
import { SERVICES } from '../config/site';
import type { ServiceIcon } from '../config/types';
import { SectionHeader } from './ui/SectionHeader';

const ICONS: Record<ServiceIcon, LucideIcon> = {
  compra: CarFront,
  troca: ArrowLeftRight,
  financiamento: Landmark,
  busca: ScanSearch,
  distancia: MessagesSquare,
  posvenda: Handshake,
};

export function Services() {
  const services = SERVICES.filter((s) => s.enabled);
  if (!services.length) return null;

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="section-y border-t border-aco bg-asfalto">
      <div className="container-site">
        <SectionHeader
          id="servicos-titulo"
          title="Como o Thiago pode ajudar"
          description="Da escolha do modelo à entrega das chaves, cada etapa da negociação tem acompanhamento direto."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[16px] border border-aco bg-aco sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <li key={service.id} className="group relative flex flex-col gap-5 bg-asfalto p-7 transition-colors duration-300 hover:bg-grafite sm:p-8">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-ouro transition-transform duration-500 ease-pista group-hover:scale-x-100"
                />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] border border-aco text-ouro">
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-wide text-[1.2rem] font-semibold leading-snug text-branco">{service.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-nevoa">{service.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
