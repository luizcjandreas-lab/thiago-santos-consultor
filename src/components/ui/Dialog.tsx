import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useLockBodyScroll } from '../../lib/hooks';
import { EASE_OUT } from '../../lib/motion';
import { cx } from '../../lib/utils';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  /** "panel": janela central (tela cheia no celular) · "drawer": menu lateral */
  variant?: 'panel' | 'drawer';
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Dialog({ open, onClose, labelledBy, children, variant = 'panel', className }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const reduced = useReducedMotion();
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      const target = panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel;
      target?.focus({ preventScroll: true });
    }, 40);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const isDrawer = variant === 'drawer';
  const panelMotion = isDrawer
    ? { initial: { x: reduced ? 0 : 48, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: reduced ? 0 : 48, opacity: 0 } }
    : { initial: { y: reduced ? 0 : 24, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: reduced ? 0 : 16, opacity: 0 } };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="dialog-root"
          className={cx('fixed inset-0 z-[70] flex', isDrawer ? 'justify-end' : 'items-stretch justify-center md:items-center md:p-6')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" onClick={() => onCloseRef.current()} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={cx(
              'relative flex max-h-full w-full flex-col overflow-hidden bg-grafite outline-none',
              isDrawer
                ? 'h-full max-w-[24rem] border-l border-aco'
                : 'h-full md:h-auto md:max-h-[min(92vh,60rem)] md:max-w-5xl md:rounded-[18px] md:border md:border-aco',
              className,
            )}
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
            transition={{ duration: 0.32, ease: EASE_OUT }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function DialogClose({ onClose, label = 'Fechar', className }: { onClose: () => void; label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={label}
      data-autofocus
      className={cx(
        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-aco bg-asfalto/70 text-branco transition-colors hover:border-ouro hover:text-ouro-claro',
        className,
      )}
    >
      <X size={20} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}
