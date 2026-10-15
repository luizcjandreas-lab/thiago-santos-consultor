import type { BodyType } from '../../config/types';
import { cx } from '../../lib/utils';

/*
  Ilustração exibida enquanto o veículo não tem fotos cadastradas.
  A silhueta muda conforme o tipo de carroceria e a cor informada no estoque.
*/

const BODY: Record<BodyType, { body: string; windows: string[]; wheels: [number, number]; r: number; extra?: string }> = {
  sedan: {
    body: 'M28 146C28 132 34 124 52 121L112 113C130 96 152 80 182 76L242 75C266 76 284 90 306 108L346 115C364 118 372 128 372 140V146C372 150 368 152 364 152H330C330 134 316 120 298 120S266 134 266 152H136C136 134 122 120 104 120S72 134 72 152H36C31 152 28 150 28 146Z',
    windows: ['M124 114C138 101 156 88 182 85L208 84V113Z', 'M216 84H240C258 85 274 97 290 112L216 113Z'],
    wheels: [104, 298],
    r: 23,
  },
  hatch: {
    body: 'M53 146C53 132 59 124 77 121L135 113C153 96 173 82 203 78L262 77C282 78 296 86 306 100L334 120C342 126 346 134 346 142V148C346 151 343 152 340 152H327C327 134 313 120 295 120S263 134 263 152H157C157 134 143 120 125 120S93 134 93 152H61C56 152 53 150 53 146Z',
    windows: ['M145 113C159 100 175 88 203 86L229 85V112Z', 'M237 85L260 85C276 86 288 93 297 106L299 112L237 112Z'],
    wheels: [125, 295],
    r: 23,
  },
  suv: {
    body: 'M26 144V120C26 110 32 104 46 102L104 96C118 78 136 64 164 62L282 60C300 60 314 66 322 80L340 108C352 110 362 118 364 130L366 146C366 150 362 152 358 152H332C332 132 316 116 296 116S260 132 260 152H138C138 132 122 116 102 116S66 132 66 152H34C29 152 26 150 26 144Z',
    windows: ['M114 96C126 82 142 72 166 70L206 69V95Z', 'M214 69L278 68C292 68 302 74 310 86L318 96H214Z'],
    wheels: [102, 296],
    r: 26,
  },
  picape: {
    body: 'M24 146V122C24 112 30 106 44 104L100 98C114 80 130 68 156 66L212 65C224 65 230 72 232 82L234 104H370C374 104 376 107 376 110V146C376 150 372 152 368 152H338C338 132 322 116 302 116S266 132 266 152H138C138 132 122 116 102 116S66 132 66 152H32C27 152 24 150 24 146Z',
    windows: ['M110 98C122 84 136 74 158 73L190 72V98Z', 'M198 72H216C222 72 224 76 225 82L226 98H198Z'],
    wheels: [102, 302],
    r: 26,
    extra: 'M242 111H368',
  },
};

const BODY_LABEL: Record<BodyType, string> = { sedan: 'sedã', hatch: 'hatch', suv: 'SUV', picape: 'picape' };

const COLORS: Array<[RegExp, string]> = [
  [/prata/i, '#b9bcc0'],
  [/branc/i, '#e7e6e2'],
  [/pret/i, '#2b2d31'],
  [/cinza|grafite|chumbo/i, '#6f747a'],
  [/vermelh/i, '#9c302d'],
  [/azul/i, '#355686'],
  [/verde/i, '#3f6650'],
  [/marrom|bronze|bege/i, '#8a6c4f'],
];

const paintFor = (color: string) => COLORS.find(([re]) => re.test(color))?.[1] ?? '#8a8f96';

interface Props {
  bodyType: BodyType;
  color: string;
  caption?: string;
  className?: string;
  /** desenho em escala menor, para miniaturas */
  compact?: boolean;
}

export function VehiclePlaceholder({ bodyType, color, caption, className, compact }: Props) {
  const shape = BODY[bodyType];
  const paint = paintFor(color);
  const uid = `${bodyType}-${paint.slice(1)}`;
  return (
    <div
      className={cx(
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-chumbo',
        'bg-[radial-gradient(70%_55%_at_50%_68%,rgba(255,255,255,0.075),transparent_70%)]',
        className,
      )}
    >
      <svg
        viewBox="0 0 400 180"
        className={cx('w-[82%] -scale-x-100', compact ? 'max-w-[11rem]' : 'max-w-[26rem]')}
        role="img"
        aria-label={`Ilustração de ${BODY_LABEL[bodyType]}`}
      >
        <defs>
          <linearGradient id={`shine-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="156" rx="178" ry="7" fill="#000" opacity="0.55" />
        <path d={shape.body} fill={paint} />
        <path d={shape.body} fill={`url(#shine-${uid})`} stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
        {shape.windows.map((d) => (
          <path key={d} d={d} fill="#0c0d10" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        ))}
        {shape.extra && <path d={shape.extra} stroke="rgba(0,0,0,0.35)" strokeWidth="2" fill="none" />}
        {shape.wheels.map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="152" r={shape.r} fill="#0a0a0b" />
            <circle cx={cx} cy="152" r={shape.r * 0.58} fill="#7d8187" />
            <circle cx={cx} cy="152" r={shape.r * 0.2} fill="#2a2d33" />
          </g>
        ))}
      </svg>
      {caption && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.72rem] text-nevoa backdrop-blur-sm">
          {caption}
        </span>
      )}
    </div>
  );
}
