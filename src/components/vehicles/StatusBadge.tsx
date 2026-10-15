import type { VehicleStatus } from '../../config/types';
import { STATUS_LABEL, cx } from '../../lib/utils';

const STYLES: Record<VehicleStatus, string> = {
  disponivel: 'text-ok',
  reservado: 'text-reserva',
  vendido: 'text-cimento',
};

export function StatusBadge({ status, className }: { status: VehicleStatus; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-asfalto/80 px-2.5 py-1 text-[0.75rem] font-medium backdrop-blur-sm',
        STYLES[status],
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status]}
    </span>
  );
}

/** Tarja elegante sobre a foto de veículos vendidos */
export function SoldBand() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-asfalto/80 py-2.5 backdrop-blur-[2px]">
      <span className="font-wider text-[0.95rem] font-bold tracking-[0.18em] text-ouro">VENDIDO</span>
    </div>
  );
}
