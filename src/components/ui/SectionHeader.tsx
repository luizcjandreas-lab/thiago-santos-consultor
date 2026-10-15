import type { ReactNode } from 'react';
import { cx } from '../../lib/utils';

interface Props {
  id: string;
  title: string;
  description?: ReactNode;
  className?: string;
}

/** Título de seção à esquerda e texto de apoio alinhado à base, à direita (no desktop) */
export function SectionHeader({ id, title, description, className }: Props) {
  return (
    <div className={cx('grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10', className)}>
      <h2
        id={id}
        className="font-wide text-[clamp(2rem,2.6vw+1.1rem,3.25rem)] font-bold leading-[1.04] tracking-[-0.025em] text-branco lg:col-span-7"
      >
        {title}
      </h2>
      {description && (
        <p className="max-w-[36rem] text-[1.0625rem] leading-relaxed text-nevoa lg:col-span-5 lg:pb-1.5">{description}</p>
      )}
    </div>
  );
}
