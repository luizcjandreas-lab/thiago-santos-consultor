import { MessageCircle } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { INVESTMENT_OPTIONS, PHOTOS } from '../config/site';
import { track } from '../lib/analytics';
import { asset, isValidPhone, maskPhone, srcSet } from '../lib/utils';
import { buildMessage, openWhatsapp, whatsappUrl } from '../lib/whatsapp';
import { Button } from './ui/Button';
import { ChoiceGroup, ConsentCheckbox, Field, SelectInput, TextArea, TextInput, describedBy } from './ui/Field';
import { SubmitResult } from './ui/SubmitResult';

const INITIAL = {
  name: '',
  phone: '',
  brand: '',
  model: '',
  year: '',
  budget: '',
  tradeIn: '',
  financing: '',
  notes: '',
  consent: false,
};
type FormState = typeof INITIAL;
type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Informe seu nome.';
  if (!isValidPhone(f.phone)) e.phone = 'Informe um WhatsApp com DDD, por exemplo (11) 91234-5678.';
  if (!f.brand.trim() && !f.model.trim()) e.brand = 'Informe pelo menos a marca ou o modelo que você procura.';
  if (f.year && !/^(19|20)\d{2}$/.test(f.year.trim())) e.year = 'Use um ano com 4 dígitos, por exemplo 2021.';
  if (!f.budget) e.budget = 'Escolha uma faixa de investimento.';
  if (!f.tradeIn) e.tradeIn = 'Responda se tem veículo para troca.';
  if (!f.financing) e.financing = 'Responda se vai precisar de financiamento.';
  if (!f.consent) e.consent = 'Para continuar, autorize o envio das informações pelo WhatsApp.';
  return e;
}

export function CustomSearch() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<{ url: string; opened: boolean } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }
    const message = buildMessage('Olá, Thiago! Vim pelo seu site e gostaria de ajuda para encontrar um veículo.', [
      ['Nome', form.name],
      ['WhatsApp', form.phone],
      ['Marca desejada', form.brand],
      ['Modelo desejado', form.model],
      ['Ano aproximado', form.year],
      ['Faixa de investimento', form.budget],
      ['Possui veículo para troca', form.tradeIn],
      ['Precisa de financiamento', form.financing],
      ['Observações', form.notes],
    ]);
    const url = whatsappUrl(message);
    track('search_form_submit', { brand: form.brand, budget: form.budget });
    setResult({ url, opened: openWhatsapp(url) });
  };

  return (
    <section id="busca" aria-labelledby="busca-titulo" className="section-y border-t border-aco bg-grafite">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <h2 id="busca-titulo" className="font-wide text-[clamp(2rem,2.6vw+1.1rem,3.25rem)] font-bold leading-[1.04] tracking-[-0.025em]">
            Não encontrou o carro que procura?
          </h2>
          <p className="mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed text-nevoa">
            Conte ao Thiago o que você está procurando e receba um atendimento direcionado para encontrar a melhor opção.
          </p>
          <figure className="mt-10 hidden overflow-hidden rounded-[14px] border border-aco md:block">
            <img
              src={asset(PHOTOS.search.src)}
              srcSet={srcSet(PHOTOS.search.srcSet)}
              sizes="(min-width: 1024px) 34vw, 60vw"
              width={PHOTOS.search.width}
              height={PHOTOS.search.height}
              alt={PHOTOS.search.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-[35%_50%] lg:aspect-[5/6]"
            />
          </figure>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <div className="rounded-[16px] border border-aco bg-asfalto p-5 sm:p-8">
            {result ? (
              <SubmitResult
                url={result.url}
                opened={result.opened}
                onEdit={() => setResult(null)}
                onTrack={() => track('whatsapp_click', { location: 'search_form_result' })}
              />
            ) : (
              <form ref={formRef} noValidate onSubmit={submit} className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                <Field id="busca-nome" label="Nome" required error={errors.name}>
                  <TextInput
                    id="busca-nome"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby={describedBy('busca-nome', errors.name)}
                  />
                </Field>
                <Field id="busca-whatsapp" label="WhatsApp" required error={errors.phone}>
                  <TextInput
                    id="busca-whatsapp"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="(11) 91234-5678"
                    value={form.phone}
                    onChange={(e) => set('phone', maskPhone(e.target.value))}
                    aria-invalid={errors.phone ? 'true' : undefined}
                    aria-describedby={describedBy('busca-whatsapp', errors.phone)}
                  />
                </Field>
                <Field id="busca-marca" label="Marca desejada" required error={errors.brand}>
                  <TextInput
                    id="busca-marca"
                    name="brand"
                    placeholder="Ex.: Volkswagen"
                    value={form.brand}
                    onChange={(e) => set('brand', e.target.value)}
                    aria-invalid={errors.brand ? 'true' : undefined}
                    aria-describedby={describedBy('busca-marca', errors.brand)}
                  />
                </Field>
                <Field id="busca-modelo" label="Modelo desejado">
                  <TextInput id="busca-modelo" name="model" placeholder="Ex.: T-Cross" value={form.model} onChange={(e) => set('model', e.target.value)} />
                </Field>
                <Field id="busca-ano" label="Ano aproximado" error={errors.year}>
                  <TextInput
                    id="busca-ano"
                    name="year"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="Ex.: 2021"
                    value={form.year}
                    onChange={(e) => set('year', e.target.value.replace(/\D/g, ''))}
                    aria-invalid={errors.year ? 'true' : undefined}
                    aria-describedby={describedBy('busca-ano', errors.year)}
                  />
                </Field>
                <Field id="busca-investimento" label="Faixa de investimento" required error={errors.budget}>
                  <SelectInput
                    id="busca-investimento"
                    name="budget"
                    value={form.budget}
                    onChange={(e) => set('budget', e.target.value)}
                    aria-invalid={errors.budget ? 'true' : undefined}
                    aria-describedby={describedBy('busca-investimento', errors.budget)}
                  >
                    <option value="">Selecione</option>
                    {INVESTMENT_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </SelectInput>
                </Field>
                <ChoiceGroup
                  name="tradeIn"
                  legend="Possui veículo para troca?"
                  options={['Sim', 'Não']}
                  value={form.tradeIn}
                  onChange={(v) => set('tradeIn', v)}
                  required
                  error={errors.tradeIn}
                />
                <ChoiceGroup
                  name="financing"
                  legend="Precisa de financiamento?"
                  options={['Sim', 'Não', 'Ainda não sei']}
                  value={form.financing}
                  onChange={(v) => set('financing', v)}
                  required
                  error={errors.financing}
                />
                <Field id="busca-obs" label="Observações" className="sm:col-span-2">
                  <TextArea
                    id="busca-obs"
                    name="notes"
                    rows={3}
                    placeholder="Cor, opcionais, uso do dia a dia, prazo para comprar…"
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <ConsentCheckbox id="busca-consentimento" name="consent" checked={form.consent} onChange={(v) => set('consent', v)} error={errors.consent}>
                    <span>
                      Autorizo o envio destas informações ao Thiago pelo WhatsApp para receber atendimento, conforme a{' '}
                      <a href="#privacidade" className="text-ouro-claro underline underline-offset-2">
                        Política de Privacidade
                      </a>
                      .
                    </span>
                  </ConsentCheckbox>
                </div>
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.85rem] text-cimento">Nada é enviado sem você conferir a mensagem no WhatsApp.</p>
                  <Button type="submit" size="lg" icon={<MessageCircle size={20} strokeWidth={2} aria-hidden="true" />}>
                    Enviar pelo WhatsApp
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
