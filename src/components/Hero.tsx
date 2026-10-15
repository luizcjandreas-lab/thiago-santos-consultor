import { motion, useReducedMotion } from 'framer-motion';
import { CarFront, MessageCircle } from 'lucide-react';
import { PHOTOS, PROFILE } from '../config/site';
import { track } from '../lib/analytics';
import { EASE_OUT } from '../lib/motion';
import { asset, srcSet } from '../lib/utils';
import { whatsappUrl } from '../lib/whatsapp';
import { ButtonLink } from './ui/Button';

interface Props {
  /** false enquanto a abertura está na tela: a entrada do hero espera por ela */
  ready: boolean;
}

export function Hero({ ready }: Props) {
  const reduced = useReducedMotion();
  const enter = (delay: number, distance = 18) => ({
    initial: { opacity: 0, y: reduced ? 0 : distance },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : distance },
    transition: { duration: 0.8, ease: EASE_OUT, delay: ready ? delay : 0 },
  });

  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="relative isolate overflow-hidden bg-asfalto">
      {/* Fotografia */}
      <motion.div
        className="relative mt-16 h-[min(64svh,36rem)] min-h-[23rem] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-20 lg:h-auto lg:max-h-none lg:w-[47%]"
        initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: reduced ? 1 : 1.04 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
      >
        <img
          src={asset(PHOTOS.hero.src)}
          srcSet={srcSet(PHOTOS.hero.srcSet)}
          sizes="(min-width: 1024px) 47vw, 100vw"
          width={PHOTOS.hero.width}
          height={PHOTOS.hero.height}
          alt={PHOTOS.hero.alt}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[50%_8%] lg:object-[46%_6%]"
        />
        {/* Transições da foto para o fundo */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-asfalto to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-asfalto via-asfalto/70 to-transparent lg:h-1/3" />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-asfalto via-asfalto/60 to-transparent lg:block" />
      </motion.div>

      <div className="container-site relative grid lg:min-h-[min(100svh,58rem)] lg:grid-cols-12 lg:items-center">
        <div className="relative z-10 -mt-28 pb-14 sm:-mt-32 lg:col-span-7 lg:mt-0 lg:pb-24 lg:pt-32">
          <motion.p
            {...enter(0.05, 10)}
            className="inline-flex items-center gap-2.5 rounded-full border border-ouro/35 bg-asfalto/60 px-3.5 py-1.5 text-[0.85rem] text-ouro-claro backdrop-blur-sm"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ouro" />
            {PROFILE.role} • {PROFILE.experienceYears} anos de experiência
          </motion.p>

          <motion.h1
            id="hero-titulo"
            {...enter(0.15)}
            className="mt-6 max-w-[15ch] font-wider text-[clamp(2.3rem,3.3vw+1.1rem,4.25rem)] font-extrabold leading-[1.0] tracking-[-0.03em] text-branco"
          >
            Seu próximo carro começa com o atendimento certo.
          </motion.h1>

          <motion.p {...enter(0.28)} className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-nevoa sm:text-lg">
            Conte com um atendimento direto, personalizado e transparente para encontrar o veículo ideal em São Paulo e
            Grande São Paulo.
          </motion.p>

          <motion.div {...enter(0.4)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#veiculos" size="lg" icon={<CarFront size={20} strokeWidth={1.9} aria-hidden="true" />}>
              Ver veículos disponíveis
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl()}
              variant="secondary"
              size="lg"
              icon={<MessageCircle size={20} strokeWidth={1.9} aria-hidden="true" />}
              onClick={() => track('whatsapp_click', { location: 'hero' })}
            >
              Falar com Thiago
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      {/* Indicação de rolagem: faixa de rodagem descendo */}
      <motion.a
        href="#diferenciais"
        aria-label="Rolar para o conteúdo"
        className="container-site absolute inset-x-0 bottom-0 hidden items-end gap-4 pb-8 text-[0.85rem] text-cimento transition-colors hover:text-branco lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: ready ? 0.8 : 0 }}
      >
        <span aria-hidden="true" className="lane-y animate-lane block h-12 opacity-80" />
        <span className="pb-0.5">Role para conhecer</span>
      </motion.a>
    </section>
  );
}
