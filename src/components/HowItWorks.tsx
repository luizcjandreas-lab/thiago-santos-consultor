import { motion, useReducedMotion } from 'framer-motion';
import { EASE_IN_OUT } from '../lib/motion';
import { SectionHeader } from './ui/SectionHeader';

const STEPS = [
  { title: 'Conte o que você procura', text: 'O cliente informa modelo, orçamento e preferências.' },
  { title: 'Receba opções selecionadas', text: 'Thiago analisa as possibilidades e apresenta veículos compatíveis.' },
  { title: 'Avalie as condições', text: 'São verificadas possibilidades de troca, financiamento e negociação.' },
  { title: 'Retire seu veículo', text: 'Após a conclusão, o cliente recebe orientação até o momento da entrega.' },
];

/*
  As quatro etapas ficam sobre uma "faixa de rodagem". Quando a seção entra
  na tela, um ponto de luz percorre a faixa uma única vez, da etapa 1 à 4.
  O conteúdo é sempre visível; a luz é só um detalhe.
*/
export function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section id="como-funciona" aria-labelledby="como-titulo" className="section-y border-t border-aco bg-grafite">
      <div className="container-site">
        <SectionHeader
          id="como-titulo"
          title="Como funciona"
          description="Um caminho simples, com o Thiago acompanhando cada etapa até a entrega."
        />

        <div className="relative mt-14 pl-12 lg:mt-20 lg:pl-0 lg:pt-14">
          {/* Faixa vertical (celular) */}
          <span aria-hidden="true" className="lane-y absolute bottom-2 left-[1.05rem] top-2 opacity-50 lg:hidden" />
          {/* Faixa horizontal (desktop) */}
          <span aria-hidden="true" className="lane-x absolute left-0 right-0 top-[1.3rem] hidden opacity-50 lg:block" />
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="absolute left-0 top-[1.3rem] hidden h-2 w-2 -translate-y-[3px] rounded-full bg-ouro-claro shadow-[0_0_18px_6px_rgba(237,210,154,0.45)] lg:block"
              initial={{ left: '0%', opacity: 0 }}
              whileInView={{ left: ['0%', '33%', '66%', '100%'], opacity: [0, 1, 1, 0] }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 2.6, ease: EASE_IN_OUT, delay: 0.2 }}
            />
          )}

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-12 top-0 flex h-[2.1rem] w-[2.1rem] items-center justify-center rounded-full border border-ouro bg-grafite font-wide text-[0.95rem] font-bold text-ouro lg:-top-14 lg:left-0 lg:h-[2.6rem] lg:w-[2.6rem]"
              >
                {i + 1}
              </span>
              <h3 className="font-wide text-[1.2rem] font-semibold leading-snug text-branco">
                <span className="sr-only">Etapa {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[22rem] leading-relaxed text-nevoa">{step.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
