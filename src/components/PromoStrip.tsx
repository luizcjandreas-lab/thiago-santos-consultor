import { Check, MessageCircle } from 'lucide-react';
import { PROMO } from '../config/site';
import { track } from '../lib/analytics';
import { whatsappUrl } from '../lib/whatsapp';
import { ButtonLink } from './ui/Button';

/** Faixa de condições comerciais exibida acima da vitrine (textos em PROMO, site.ts) */
export function PromoStrip() {
  if (!PROMO.enabled) return null;

  return (
    <aside aria-labelledby="condicoes-titulo" className="relative mt-10 overflow-hidden rounded-[16px] border border-ouro/35 bg-grafite">
      <div aria-hidden="true" className="lane-x absolute inset-x-0 top-0 opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-ouro/10 blur-3xl" />

      <div className="relative grid gap-7 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-10">
        <div className="lg:col-span-5">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ouro">{PROMO.label}</p>
          <h3
            id="condicoes-titulo"
            className="mt-3 font-wide text-[1.6rem] font-bold leading-[1.08] tracking-[-0.02em] text-branco sm:text-[1.95rem]"
          >
            {PROMO.title}
          </h3>
          <p className="mt-3 max-w-md text-[0.97rem] leading-relaxed text-nevoa">{PROMO.text}</p>
          <ButtonLink
            href={whatsappUrl(PROMO.whatsappMessage)}
            className="mt-6 max-sm:w-full"
            icon={<MessageCircle size={18} strokeWidth={2} aria-hidden="true" />}
            onClick={() => track('whatsapp_click', { location: 'promo_strip' })}
          >
            Consultar condições
          </ButtonLink>
        </div>

        <ul className="grid sm:grid-cols-2 sm:gap-x-8 lg:col-span-7">
          {PROMO.items.map((item) => (
            <li key={item} className="flex items-start gap-3 border-t border-aco py-4 text-[1rem] leading-snug text-branco">
              <span
                aria-hidden="true"
                className="mt-px inline-flex h-[1.35rem] w-[1.35rem] shrink-0 items-center justify-center rounded-full bg-ouro/15 text-ouro"
              >
                <Check size={14} strokeWidth={2.6} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {PROMO.footnote && (
        <p className="relative border-t border-aco px-6 py-3 text-[0.8rem] text-cimento sm:px-8 lg:px-10">{PROMO.footnote}</p>
      )}
    </aside>
  );
}
