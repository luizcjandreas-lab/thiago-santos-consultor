import { MessageCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { FAQ } from '../config/site';
import { track } from '../lib/analytics';
import { cx } from '../lib/utils';
import { whatsappUrl } from '../lib/whatsapp';
import { ButtonLink } from './ui/Button';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-titulo" className="section-y border-t border-aco bg-asfalto">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 id="faq-titulo" className="font-wide text-[clamp(2rem,2.6vw+1.1rem,3.25rem)] font-bold leading-[1.04] tracking-[-0.025em]">
            Perguntas frequentes
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-nevoa">Não encontrou sua dúvida? Pergunte direto ao Thiago.</p>
          <ButtonLink
            href={whatsappUrl('Olá, Thiago! Vim pelo seu site e tenho uma dúvida.')}
            variant="secondary"
            className="mt-7"
            icon={<MessageCircle size={18} aria-hidden="true" />}
            onClick={() => track('whatsapp_click', { location: 'faq' })}
          >
            Enviar minha pergunta
          </ButtonLink>
        </div>

        <ul className="border-t border-aco lg:col-span-8">
          {FAQ.map((item, i) => {
            const expanded = open === i;
            const id = `faq-${i}`;
            return (
              <li key={item.question} className="border-b border-aco">
                <h3>
                  <button
                    type="button"
                    id={`${id}-botao`}
                    aria-expanded={expanded}
                    aria-controls={`${id}-resposta`}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-wide text-[1.08rem] font-semibold leading-snug text-branco transition-colors hover:text-ouro-claro sm:text-[1.15rem]"
                  >
                    {item.question}
                    <span
                      aria-hidden="true"
                      className={cx(
                        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,color] duration-300',
                        expanded ? 'rotate-45 border-ouro text-ouro' : 'border-aco text-cimento',
                      )}
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${id}-resposta`}
                  role="region"
                  aria-labelledby={`${id}-botao`}
                  className={cx(
                    'grid transition-[grid-template-rows] duration-300 ease-pista',
                    expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className={cx('max-w-[44rem] pb-6 pr-12 leading-relaxed text-nevoa', !expanded && 'invisible')}>{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
