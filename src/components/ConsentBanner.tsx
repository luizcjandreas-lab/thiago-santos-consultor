import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { hasTrackers, loadTrackers, readConsent, saveConsent } from '../lib/analytics';
import { EASE_OUT } from '../lib/motion';
import { Button } from './ui/Button';

/**
 * Aviso de cookies (LGPD). Só aparece quando há Google Analytics ou Meta Pixel
 * configurados no .env. Sem consentimento, nenhum script de rastreamento é carregado.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasTrackers()) return;
    const consent = readConsent();
    if (consent === 'granted') loadTrackers();
    else if (consent === null) setVisible(true);
  }, []);

  const choose = (value: 'granted' | 'denied') => {
    saveConsent(value);
    if (value === 'granted') loadTrackers();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="consentimento"
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
          className="fixed inset-x-3 bottom-[5.75rem] z-[60] mx-auto max-w-xl rounded-[14px] border border-aco bg-grafite p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] md:bottom-6 md:left-6 md:right-auto md:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
        >
          <p className="text-[0.92rem] leading-relaxed text-nevoa">
            Usamos cookies de medição para entender como o site é usado e melhorar o atendimento. Você pode aceitar ou recusar.{' '}
            <a href="#privacidade" className="text-ouro-claro underline underline-offset-2">
              Saiba mais
            </a>
            .
          </p>
          <div className="mt-4 flex gap-2.5">
            <Button size="sm" onClick={() => choose('granted')}>
              Aceitar
            </Button>
            <Button size="sm" variant="secondary" onClick={() => choose('denied')}>
              Recusar
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
