import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import type { Vehicle } from '../../config/types';
import { asset, cx } from '../../lib/utils';
import { SoldBand } from './StatusBadge';
import { VehiclePlaceholder } from './VehiclePlaceholder';

export function Gallery({ vehicle: v }: { vehicle: Vehicle }) {
  const [index, setIndex] = useState(0);
  const total = v.images.length;
  const sold = v.status === 'vendido';
  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (total < 2) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  if (!total) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] border border-aco">
        <VehiclePlaceholder
          bodyType={v.bodyType}
          color={v.color}
          caption={v.demo ? 'Imagem ilustrativa — veículo de demonstração' : 'As fotos deste veículo serão publicadas em breve'}
        />
        {sold && <SoldBand />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[12px] border border-aco bg-chumbo"
        role="region"
        aria-roledescription="galeria"
        aria-label={`Fotos do ${v.brand} ${v.model}`}
        tabIndex={total > 1 ? 0 : -1}
        onKeyDown={onKey}
      >
        <motion.img
          key={index}
          src={asset(v.images[index])}
          alt={`${v.brand} ${v.model} — foto ${index + 1} de ${total}`}
          className={cx('h-full w-full object-cover', sold && 'grayscale-[60%]')}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        {sold && <SoldBand />}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-branco backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-ouro-claro"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-branco backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-ouro-claro"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
            <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.75rem] tabular-nums text-nevoa" aria-live="polite">
              {index + 1} de {total}
            </span>
          </>
        )}
      </div>
      {total > 1 && (
        <ul className="flex gap-2 overflow-x-auto pb-1" aria-label="Miniaturas">
          {v.images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={cx(
                  'block h-16 w-20 overflow-hidden rounded-[8px] border-2 transition-colors',
                  i === index ? 'border-ouro' : 'border-transparent opacity-70 hover:opacity-100',
                )}
              >
                <img src={asset(src)} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
