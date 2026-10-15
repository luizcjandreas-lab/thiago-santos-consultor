import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BRAND, PROFILE } from '../config/site';
import { useLockBodyScroll } from '../lib/hooks';
import { EASE_IN_OUT, EASE_OUT, INTRO_DURATION_MS } from '../lib/motion';
import { asset } from '../lib/utils';

const STORAGE_KEY = 'ts-abertura-exibida';

/** Exibe a abertura somente na primeira visita da sessão */
export function shouldShowIntro(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== '1';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* armazenamento indisponível: a abertura simplesmente não se repete nesta visualização */
  }
}

interface Props {
  /** chamado quando a abertura começa a sair (a página principal inicia sua animação) */
  onReveal: () => void;
}

export function Intro({ onReveal }: Props) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  useLockBodyScroll(visible);

  useEffect(() => {
    markIntroSeen();
    const total = reduced ? 700 : INTRO_DURATION_MS;
    const timer = window.setTimeout(() => setVisible(false), total);
    const skip = () => setVisible(false);
    window.addEventListener('keydown', skip, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', skip);
    };
  }, [reduced]);

  useEffect(() => {
    if (!visible) onReveal();
  }, [visible, onReveal]);

  const logoUrl = asset(BRAND.logo);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          role="presentation"
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-asfalto px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.25 : 0.7, ease: EASE_IN_OUT }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            className="relative w-[min(30rem,82vw)]"
            style={{ aspectRatio: `${BRAND.logoRatio}` }}
            initial={reduced ? { opacity: 0 } : { opacity: 1, clipPath: 'inset(0% 100% 0% 0%)' }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: reduced ? 0.3 : 0.95, ease: EASE_OUT, delay: reduced ? 0 : 0.1 }}
          >
            <img
              src={logoUrl}
              alt={`${PROFILE.name} — ${PROFILE.title}`}
              width={1000}
              height={283}
              className="h-full w-full object-contain"
              decoding="sync"
            />
            {!reduced && (
              /* Reflexo de luz que passa apenas sobre os traços da logomarca */
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                style={{
                  backgroundImage:
                    'linear-gradient(100deg, transparent 38%, rgba(255,250,235,0.9) 49%, rgba(255,250,235,0.9) 51%, transparent 62%)',
                  backgroundSize: '260% 100%',
                  backgroundRepeat: 'no-repeat',
                  WebkitMaskImage: `url(${logoUrl})`,
                  maskImage: `url(${logoUrl})`,
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
                initial={{ backgroundPosition: '135% 0%' }}
                animate={{ backgroundPosition: '-35% 0%' }}
                transition={{ duration: 1.05, ease: EASE_IN_OUT, delay: 0.55 }}
              />
            )}
          </motion.div>
          <motion.p
            className="mt-7 text-center text-[0.95rem] tracking-[0.01em] text-cimento md:text-base"
            initial={{ opacity: 0, y: reduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: reduced ? 0.1 : 0.75 }}
          >
            {PROFILE.tagline}
          </motion.p>
          <motion.span
            aria-hidden="true"
            className="lane-x mt-8 block w-24 origin-left opacity-70"
            initial={{ scaleX: reduced ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: reduced ? 0 : 0.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
