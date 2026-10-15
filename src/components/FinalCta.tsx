import { CarFront, MessageCircle } from 'lucide-react';
import { CONTACT, MEDIA } from '../config/site';
import { track } from '../lib/analytics';
import { whatsappUrl } from '../lib/whatsapp';
import { AutoVideo } from './ui/AutoVideo';
import { ButtonLink } from './ui/Button';

export function FinalCta() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="relative isolate overflow-hidden border-t border-aco bg-asfalto">
      {/* Fundo: reflexos na pintura de um veículo, em câmera lenta */}
      <AutoVideo
        src={MEDIA.finalCtaVideo}
        poster={MEDIA.finalCtaPoster}
        label="Reflexos de luz na pintura de um veículo"
        className="absolute! inset-0 -z-10"
        playbackRate={0.6}
        loop={false}
        control={false}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-asfalto/55" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-asfalto via-asfalto/75 to-transparent" />

      <div className="container-site py-24 lg:py-36">
        <div className="max-w-[46rem]">
          <span aria-hidden="true" className="lane-x block w-28" />
          <h2
            id="contato-titulo"
            className="mt-8 font-wider text-[clamp(2.2rem,3.4vw+1rem,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-branco"
          >
            Seu próximo carro pode estar a uma conversa de distância.
          </h2>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-nevoa">
            Fale diretamente com o Thiago e receba um atendimento pensado para o que você realmente procura.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl()}
              size="lg"
              icon={<MessageCircle size={20} strokeWidth={2} aria-hidden="true" />}
              onClick={() => track('whatsapp_click', { location: 'final_cta' })}
            >
              Conversar no WhatsApp
            </ButtonLink>
            <ButtonLink href="#veiculos" variant="secondary" size="lg" icon={<CarFront size={20} strokeWidth={1.9} aria-hidden="true" />}>
              Ver veículos disponíveis
            </ButtonLink>
          </div>
          <p className="mt-8 text-[0.95rem] text-cimento">
            WhatsApp <span className="select-all font-semibold tabular-nums text-branco">{CONTACT.whatsappDisplay}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
