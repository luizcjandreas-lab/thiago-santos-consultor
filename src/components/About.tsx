import { MessageCircle } from 'lucide-react';
import { MEDIA, PARTNER_STORE, PHOTOS, PROFILE } from '../config/site';
import { track } from '../lib/analytics';
import { asset, isFilled, srcSet } from '../lib/utils';
import { whatsappUrl } from '../lib/whatsapp';
import { AutoVideo } from './ui/AutoVideo';
import { ButtonLink } from './ui/Button';

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="section-y border-t border-aco bg-asfalto">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <figure className="relative lg:col-span-5">
          <img
            src={asset(PHOTOS.about.src)}
            srcSet={srcSet(PHOTOS.about.srcSet)}
            sizes="(min-width: 1024px) 38vw, 100vw"
            width={PHOTOS.about.width}
            height={PHOTOS.about.height}
            alt={PHOTOS.about.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-[16px] border border-aco object-cover object-[50%_30%]"
          />
          <span aria-hidden="true" className="lane-x absolute -bottom-5 left-6 right-24 opacity-60" />
        </figure>

        <div className="min-w-0 lg:col-span-7">
          <h2 id="sobre-titulo" className="font-wide text-[clamp(2rem,2.6vw+1.1rem,3.25rem)] font-bold leading-[1.04] tracking-[-0.025em]">
            Experiência para orientar. Proximidade para entender.
          </h2>
          <div className="mt-7 flex max-w-[38rem] flex-col gap-5 text-[1.0625rem] leading-[1.7] text-nevoa">
            <p>
              {PROFILE.name} trabalha há oito anos com vendas de veículos e atualmente atua como gerente de vendas. Seu
              trabalho é baseado em entender o momento, a necessidade e o orçamento de cada cliente antes de apresentar uma
              opção.
            </p>
            <p>
              Com atendimento em {PROFILE.region}, busca tornar a escolha de um veículo mais simples, segura e bem orientada,
              acompanhando cada negociação de forma próxima e personalizada.
            </p>
          </div>

          {/* Assinatura */}
          <div className="mt-9 flex flex-col gap-1">
            <p className="font-wider text-[1.6rem] font-bold leading-none tracking-[-0.02em] text-branco">{PROFILE.name}</p>
            <p className="text-[0.95rem] text-ouro-claro">{PROFILE.signatureRole}</p>
          </div>

          <ButtonLink
            href={whatsappUrl()}
            size="lg"
            className="mt-9"
            icon={<MessageCircle size={20} strokeWidth={2} aria-hidden="true" />}
            onClick={() => track('whatsapp_click', { location: 'about' })}
          >
            Conversar com o Thiago
          </ButtonLink>

          {/* Loja: presença discreta */}
          <div className="mt-12 flex items-center gap-5 border-t border-aco pt-7">
            <AutoVideo
              src={MEDIA.showroomVideo}
              poster={MEDIA.showroomPoster}
              label="Recepção da loja, com a logomarca na parede"
              className="aspect-[9/16] w-[4.5rem] shrink-0 rounded-[10px] border border-aco sm:w-20"
              compactControl
            />
            <div className="min-w-0">
              {isFilled(PARTNER_STORE.logo) ? (
                <img src={asset(PARTNER_STORE.logo)} alt={PARTNER_STORE.name} className="h-8 w-auto opacity-80" loading="lazy" />
              ) : (
                <p className="font-wide text-[1.05rem] font-semibold text-branco">{PARTNER_STORE.name}</p>
              )}
              <p className="mt-1.5 text-[0.92rem] leading-snug text-cimento">Atendimento realizado com a estrutura da loja parceira.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
