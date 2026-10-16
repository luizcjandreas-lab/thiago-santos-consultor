/* ==========================================================================
   Rastreamento de eventos (Google Analytics 4 e Meta Pixel)
   --------------------------------------------------------------------------
   - Defina VITE_GA_ID e/ou VITE_META_PIXEL_ID no arquivo .env.
   - Os scripts só são carregados depois que o visitante aceita o aviso de
     cookies (LGPD). Sem IDs configurados, nenhum aviso é exibido.
   - Todos os eventos também são enviados ao window.dataLayer, o que permite
     usar o Google Tag Manager se preferir.
   ========================================================================== */

import { ANALYTICS } from '../config/site';

export type TrackEvent =
  | 'whatsapp_click'
  | 'catalog_click'
  | 'vehicle_details_open'
  | 'vehicle_interest'
  | 'vehicle_filter'
  | 'search_form_submit'
  | 'tradein_form_submit'
  | 'store_directions'
  | 'store_schedule'
  | 'instagram_click'
  | 'google_reviews_click'
  | 'nav_click';

type Params = Record<string, string | number | boolean | undefined>;

/** Mapeamento para eventos padrão do Meta Pixel */
const PIXEL_EVENTS: Partial<Record<TrackEvent, string>> = {
  whatsapp_click: 'Contact',
  catalog_click: 'ViewContent',
  vehicle_interest: 'Contact',
  store_schedule: 'Schedule',
  vehicle_details_open: 'ViewContent',
  search_form_submit: 'Lead',
  tradein_form_submit: 'Lead',
};

export function track(event: TrackEvent, params: Params = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    window.gtag?.('event', event, params);
    const pixelEvent = PIXEL_EVENTS[event];
    if (pixelEvent) window.fbq?.('track', pixelEvent, params);
    else window.fbq?.('trackCustom', event, params);
    if (import.meta.env.DEV) console.debug('[track]', event, params);
  } catch {
    /* rastreamento nunca deve quebrar o site */
  }
}

export const hasTrackers = () => Boolean(ANALYTICS.gaId || ANALYTICS.metaPixelId);

const CONSENT_KEY = 'ts-consentimento';
export type Consent = 'granted' | 'denied' | null;

export function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* armazenamento indisponível */
  }
}

let loaded = false;

/** Carrega GA4 e Meta Pixel (chamado somente após o consentimento) */
export function loadTrackers() {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;

  if (ANALYTICS.gaId) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS.gaId)}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS.gaId, { anonymize_ip: true });
  }

  if (ANALYTICS.metaPixelId) {
    /* Snippet oficial do Meta Pixel, adaptado para TypeScript */
    const w = window as Window;
    if (!w.fbq) {
      const fbq = function (...args: unknown[]) {
        const self = fbq as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
        if (self.callMethod) self.callMethod(...args);
        else self.queue.push(args);
      } as unknown as NonNullable<Window['fbq']>;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      w.fbq = fbq;
      w._fbq = fbq;
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(s);
    }
    w.fbq!('init', ANALYTICS.metaPixelId);
    w.fbq!('track', 'PageView');
  }
}
