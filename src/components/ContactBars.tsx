import { AnimatePresence, motion } from 'framer-motion';
import { CarFront, MessageCircle } from 'lucide-react';
import { track } from '../lib/analytics';
import { useScrolled } from '../lib/hooks';
import { EASE_OUT } from '../lib/motion';
import { whatsappUrl } from '../lib/whatsapp';

/** Botão flutuante de WhatsApp (tablet e desktop). Aparece depois da primeira dobra. */
export function FloatingWhatsApp() {
  const visible = useScrolled(560);
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="whats-flutuante"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com o Thiago no WhatsApp"
          onClick={() => track('whatsapp_click', { location: 'floating' })}
          title="Falar no WhatsApp"
          className="fixed z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-ouro text-asfalto shadow-[0_10px_30px_-10px_rgba(0,0,0,0.85)] ring-4 ring-asfalto/60 transition-colors hover:bg-ouro-claro md:inline-flex"
          style={{
            right: 'max(1.5rem, calc(env(safe-area-inset-right, 0px) + 1rem))',
            bottom: 'max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
        >
          <MessageCircle size={24} strokeWidth={2} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Barra fixa inferior no celular */
export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-aco bg-asfalto/95 backdrop-blur-md md:hidden"
      style={{
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
      }}
    >
      <div className="grid grid-cols-2 gap-2.5 pt-3">
        <a
          href="#veiculos"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-aco-claro text-[0.95rem] font-semibold text-branco active:bg-chumbo"
        >
          <CarFront size={19} strokeWidth={1.9} aria-hidden="true" />
          Ver veículos
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { location: 'mobile_bar' })}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-ouro text-[0.95rem] font-semibold text-asfalto active:bg-ouro-claro"
        >
          <MessageCircle size={19} strokeWidth={2} aria-hidden="true" />
          Falar com Thiago
        </a>
      </div>
    </div>
  );
}
