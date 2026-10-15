import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CONTACT, LINKS, TESTIMONIALS } from '../config/site';
import type { Testimonial } from '../config/types';
import { track } from '../lib/analytics';
import { asset, cx } from '../lib/utils';
import { ButtonLink } from './ui/Button';
import { InstagramIcon } from './ui/Icons';
import { SectionHeader } from './ui/SectionHeader';

export function Testimonials() {
  if (!TESTIMONIALS.enabled) return null;
  const items = TESTIMONIALS.items;

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-titulo" className="section-y border-t border-aco bg-grafite">
      <div className="container-site">
        <SectionHeader
          id="depoimentos-titulo"
          title="Negociações construídas com confiança"
          description={items.length ? 'Relatos de clientes atendidos pelo Thiago, publicados com autorização.' : undefined}
        />
        {items.length > 0 && <Carousel items={items} />}
        <GoogleReviews compact={items.length > 0} />
      </div>
    </section>
  );
}

/**
 * Avaliações dos clientes no Google (links em LINKS, site.ts).
 * Depoimentos cadastrados em TESTIMONIALS aparecem acima, no carrossel.
 */
function GoogleReviews({ compact }: { compact: boolean }) {
  return (
    <div
      className={cx(
        'flex flex-col gap-7 rounded-[16px] border border-aco bg-asfalto p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between',
        compact ? 'mt-8' : 'mt-12 lg:mt-16',
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <span aria-hidden="true" className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-aco text-ouro">
          <Quote size={22} strokeWidth={1.6} />
        </span>
        <div>
          <p className="font-wide text-[1.3rem] font-semibold leading-snug text-branco">Avaliações de clientes no Google</p>
          <p className="mt-2 max-w-xl leading-relaxed text-nevoa">
            Veja o que dizem os clientes atendidos pelo Thiago. Se você já comprou com ele, deixe também a sua avaliação.
          </p>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('instagram_click', { location: 'testimonials' })}
            className="mt-4 inline-flex items-center gap-2 text-[0.92rem] text-cimento transition-colors hover:text-ouro-claro"
          >
            <InstagramIcon size={16} /> Entregas e novidades em @{CONTACT.instagram}
          </a>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
        <ButtonLink
          href={LINKS.googleReviews}
          icon={<Star size={18} aria-hidden="true" />}
          onClick={() => track('google_reviews_click', { action: 'view' })}
        >
          Ver avaliações no Google
        </ButtonLink>
        <ButtonLink
          href={LINKS.googleReviewWrite}
          variant="secondary"
          icon={<Quote size={18} aria-hidden="true" />}
          onClick={() => track('google_reviews_click', { action: 'write' })}
        >
          Avaliar meu atendimento
        </ButtonLink>
      </div>
    </div>
  );
}

function Carousel({ items }: { items: Testimonial[] }) {
  const track_ = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(items.length > 1);

  useEffect(() => {
    const el = track_.current;
    if (!el) return;
    const onScroll = () => {
      const slide = el.firstElementChild as HTMLElement | null;
      const width = slide ? slide.offsetWidth + 20 : el.clientWidth;
      setIndex(Math.round(el.scrollLeft / width));
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = track_.current;
    const slide = el?.firstElementChild as HTMLElement | null;
    if (!el || !slide) return;
    el.scrollBy({ left: dir * (slide.offsetWidth + 20), behavior: 'smooth' });
  };

  return (
    <div className="mt-12 lg:mt-16" role="region" aria-roledescription="carrossel" aria-label="Depoimentos de clientes">
      <ul ref={track_} className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-width:none]">
        {items.map((t, i) => (
          <li
            key={t.id}
            className="flex w-[86%] shrink-0 snap-start flex-col gap-6 rounded-[16px] border border-aco bg-asfalto p-7 sm:w-[60%] lg:w-[calc((100%-2.5rem)/3)]"
            aria-label={`Depoimento ${i + 1} de ${items.length}`}
          >
            {t.rating ? (
              <div className="flex gap-1 text-ouro" aria-label={`Avaliação: ${t.rating} de 5 estrelas`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} size={17} aria-hidden="true" className={s < t.rating! ? 'fill-current' : 'opacity-30'} />
                ))}
              </div>
            ) : (
              <Quote size={26} strokeWidth={1.4} className="text-ouro" aria-hidden="true" />
            )}
            <blockquote className="flex-1 text-[1.02rem] leading-relaxed text-nevoa">“{t.text}”</blockquote>
            <div className="flex items-center gap-3.5 border-t border-aco pt-5">
              {t.photo ? (
                <img src={asset(t.photo)} alt={`Foto de ${t.name}`} loading="lazy" className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <span aria-hidden="true" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-aco font-wide font-bold text-ouro">
                  {t.name
                    .split(/\s+/)
                    .map((p) => p[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              )}
              <div className="min-w-0">
                <p className="font-semibold text-branco">{t.name}</p>
                <p className="truncate text-[0.85rem] text-cimento">
                  {[t.vehicle, t.source && (t.sourceUrl ? undefined : `via ${t.source}`)].filter(Boolean).join(' • ')}
                  {t.source && t.sourceUrl && (
                    <>
                      {t.vehicle ? ' • ' : ''}
                      <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-ouro-claro hover:underline">
                        via {t.source}
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-[0.88rem] tabular-nums text-cimento" aria-live="polite">
            {Math.min(index + 1, items.length)} de {items.length}
          </p>
          <div className="flex gap-2">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scrollBy(dir)}
                disabled={dir === -1 ? !canPrev : !canNext}
                aria-label={dir === -1 ? 'Depoimento anterior' : 'Próximo depoimento'}
                className={cx(
                  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-aco text-branco transition-colors hover:border-ouro hover:text-ouro-claro disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-aco disabled:hover:text-branco',
                )}
              >
                {dir === -1 ? <ChevronLeft size={20} aria-hidden="true" /> : <ChevronRight size={20} aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
