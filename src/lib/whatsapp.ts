import { WHATSAPP_GENERAL_MESSAGE, WHATSAPP_NUMBER } from '../config/site';
import type { Store, Vehicle } from '../config/types';
import { isFilled, storeLabel, vehicleName } from './utils';

/**
 * Gera o link do WhatsApp com a mensagem pronta.
 * Se o número ainda não foi preenchido, o link abre o WhatsApp para o
 * visitante escolher o contato (nunca gera um link quebrado).
 */
export function whatsappUrl(message: string = WHATSAPP_GENERAL_MESSAGE): string {
  const number = isFilled(WHATSAPP_NUMBER) ? WHATSAPP_NUMBER.replace(/\D/g, '') : '';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const messages = {
  general: WHATSAPP_GENERAL_MESSAGE,

  vehicle: (v: Vehicle) =>
    `Olá, Thiago! Vim pelo seu site e gostaria de saber mais sobre o ${vehicleName(v)}. Ele ainda está disponível?`,

  soldVehicle: (v: Vehicle) =>
    `Olá, Thiago! Vim pelo seu site e vi que o ${vehicleName(v)} já foi vendido. Gostaria de encontrar um veículo parecido.`,

  store: (s: Store) => `Olá, Thiago! Vim pelo seu site e gostaria de agendar um atendimento na unidade ${storeLabel(s)}.`,
};

/** Monta uma mensagem organizada a partir de pares "rótulo: valor", ignorando campos vazios */
export function buildMessage(intro: string, fields: Array<[string, string | undefined]>, outro?: string): string {
  const lines = fields
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([label, value]) => `*${label}:* ${value!.trim()}`);
  return [intro, '', ...lines, ...(outro ? ['', outro] : [])].join('\n');
}

/**
 * Abre o WhatsApp em uma nova aba. Retorna false quando o navegador bloqueia
 * a janela; nesse caso o formulário mostra um botão para abrir manualmente.
 */
export function openWhatsapp(url: string): boolean {
  try {
    // Sem "noopener" nos parâmetros: com ele, window.open sempre retorna null
    // e não daria para saber se a janela abriu. O vínculo é cortado logo abaixo.
    const win = window.open(url, '_blank');
    if (!win) return false;
    win.opener = null;
    return true;
  } catch {
    return false;
  }
}
