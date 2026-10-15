import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useInView } from '../../lib/hooks';
import { asset, cx } from '../../lib/utils';

interface Props {
  src: string;
  poster?: string;
  label: string;
  className?: string;
  videoClassName?: string;
  objectPosition?: string;
  playbackRate?: number;
  /** false = toca uma vez e para no último quadro */
  loop?: boolean;
  /** Exibe o botão de pausar/reproduzir */
  control?: boolean;
  /** botão menor, para vídeos em miniatura */
  compactControl?: boolean;
  style?: CSSProperties;
}

/**
 * Vídeo curto, sem som, que só toca enquanto está visível na tela.
 * Com "reduzir movimento" ativado no aparelho, fica parado no primeiro quadro
 * e o visitante pode tocar manualmente.
 */
export function AutoVideo({
  src,
  poster,
  label,
  className,
  videoClassName,
  objectPosition,
  playbackRate = 1,
  loop = true,
  control = true,
  compactControl = false,
  style,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);

  const paused = userPaused ?? Boolean(reduced);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playbackRate = playbackRate;
    if (inView && !paused) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [inView, paused, playbackRate]);

  return (
    <div ref={ref} className={cx('relative overflow-hidden', className)} style={style}>
      <video
        ref={videoRef}
        className={cx('h-full w-full object-cover', videoClassName)}
        style={objectPosition ? { objectPosition } : undefined}
        poster={poster ? asset(poster) : undefined}
        muted
        loop={loop}
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={asset(src)} type="video/mp4" />
      </video>
      {control && (
        <button
          type="button"
          onClick={() => setUserPaused(playing)}
          aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          className={cx(
            'absolute inline-flex items-center justify-center rounded-full border border-white/15 bg-black/55 text-branco backdrop-blur-sm transition-colors hover:border-ouro hover:text-ouro-claro',
            compactControl ? 'bottom-1.5 right-1.5 h-7 w-7' : 'bottom-3 right-3 h-10 w-10',
          )}
        >
          {playing ? (
            <Pause size={compactControl ? 12 : 16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Play size={compactControl ? 12 : 16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
