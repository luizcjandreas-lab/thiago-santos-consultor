import { Camera, ClipboardCheck, ImagePlus, MessageCircle, ScanEye, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { CONDITION_OPTIONS, LEGAL } from '../config/site';
import { track } from '../lib/analytics';
import { isValidPhone, maskPhone } from '../lib/utils';
import { buildMessage, openWhatsapp, whatsappUrl } from '../lib/whatsapp';
import { Button } from './ui/Button';
import { ChoiceGroup, ConsentCheckbox, Field, SelectInput, TextArea, TextInput, describedBy } from './ui/Field';
import { SubmitResult } from './ui/SubmitResult';

/*
  SOBRE AS FOTOS DO VEÍCULO
  O site não tem servidor (backend). Links do WhatsApp (wa.me) aceitam apenas
  texto, então as fotos escolhidas aqui NÃO são enviadas automaticamente.
  Elas ficam só no aparelho do visitante, servem para ele conferir o que vai
  mandar, e a mensagem avisa o Thiago de que as fotos chegarão na conversa.
  Para receber as fotos pelo site, seria preciso um serviço de upload
  (ex.: Cloudinary, Firebase Storage ou um formulário com backend).
*/

const MAX_PHOTOS = 10;

const INITIAL = {
  name: '',
  phone: '',
  brand: '',
  model: '',
  version: '',
  year: '',
  km: '',
  condition: '',
  city: '',
  openLoan: '',
  notes: '',
  consent: false,
};
type FormState = typeof INITIAL;
type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  const year = Number(f.year);
  if (f.name.trim().length < 2) e.name = 'Informe seu nome.';
  if (!isValidPhone(f.phone)) e.phone = 'Informe um WhatsApp com DDD, por exemplo (11) 91234-5678.';
  if (!f.brand.trim()) e.brand = 'Informe a marca do veículo.';
  if (!f.model.trim()) e.model = 'Informe o modelo do veículo.';
  if (!/^\d{4}$/.test(f.year) || year < 1950 || year > new Date().getFullYear() + 1) e.year = 'Informe o ano com 4 dígitos, por exemplo 2019.';
  if (!f.km.trim()) e.km = 'Informe a quilometragem aproximada.';
  if (!f.condition) e.condition = 'Escolha o estado geral do veículo.';
  if (f.city.trim().length < 2) e.city = 'Informe a cidade onde o veículo está.';
  if (!f.openLoan) e.openLoan = 'Responda se há financiamento em aberto.';
  if (!f.consent) e.consent = 'Para continuar, autorize o envio das informações pelo WhatsApp.';
  return e;
}

const formatKmInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 7);
  return digits ? new Intl.NumberFormat('pt-BR').format(Number(digits)) : '';
};

export function TradeIn() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [photos, setPhotos] = useState<Array<{ file: File; url: string }>>([]);
  const [photoNote, setPhotoNote] = useState('');
  const [result, setResult] = useState<{ url: string; opened: boolean } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const photosRef = useRef(photos);
  photosRef.current = photos;

  // Libera a memória das miniaturas ao sair da página
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const addPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter((f) => f.type.startsWith('image/'));
    event.target.value = '';
    if (!files.length) return;
    const room = MAX_PHOTOS - photos.length;
    const accepted = files.slice(0, Math.max(room, 0)).map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPhotos((prev) => [...prev, ...accepted]);
    setPhotoNote(files.length > room ? `Limite de ${MAX_PHOTOS} fotos. As demais não foram adicionadas.` : '');
  };

  const removePhoto = (url: string) => {
    URL.revokeObjectURL(url);
    setPhotos((prev) => prev.filter((p) => p.url !== url));
    setPhotoNote('');
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const message = buildMessage(
      'Olá, Thiago! Gostaria de solicitar uma avaliação do meu veículo. Seguem as informações:',
      [
        ['Nome', form.name],
        ['WhatsApp', form.phone],
        ['Veículo', `${form.brand} ${form.model}`],
        ['Versão', form.version],
        ['Ano', form.year],
        ['Quilometragem', form.km ? `${form.km} km` : ''],
        ['Estado geral', form.condition],
        ['Cidade', form.city],
        ['Financiamento em aberto', form.openLoan],
        ['Observações', form.notes],
      ],
      photos.length
        ? `Separei ${photos.length} ${photos.length === 1 ? 'foto' : 'fotos'} do veículo e envio aqui na conversa.`
        : 'Posso enviar fotos do veículo aqui na conversa.',
    );
    const url = whatsappUrl(message);
    track('tradein_form_submit', { brand: form.brand, year: form.year, photos: photos.length });
    setResult({ url, opened: openWhatsapp(url) });
  };

  const invalid = (key: keyof FormState) => (errors[key] ? 'true' : undefined);

  return (
    <section id="avaliacao" aria-labelledby="avaliacao-titulo" className="section-y border-t border-aco bg-grafite">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <h2 id="avaliacao-titulo" className="font-wide text-[clamp(2rem,2.6vw+1.1rem,3.25rem)] font-bold leading-[1.04] tracking-[-0.025em]">
            Quer usar seu veículo na negociação?
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-nevoa">
            Envie os dados do seu carro para uma avaliação inicial. Ele pode entrar como parte do pagamento do próximo.
          </p>
          <ul className="mt-9 flex flex-col gap-5">
            {[
              { icon: ClipboardCheck, title: 'Avaliação inicial', text: 'Feita a partir das informações e fotos que você enviar.' },
              { icon: Camera, title: 'Fotos pelo WhatsApp', text: 'Depois que a conversa abrir, mande as fotos por lá.' },
              { icon: ScanEye, title: 'Proposta após vistoria', text: LEGAL.tradeInNotice },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-aco text-ouro">
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-branco">{title}</p>
                  <p className="mt-0.5 text-[0.92rem] leading-snug text-cimento">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div className="rounded-[16px] border border-aco bg-asfalto p-5 sm:p-8">
            {result ? (
              <SubmitResult
                url={result.url}
                opened={result.opened}
                onEdit={() => setResult(null)}
                onTrack={() => track('whatsapp_click', { location: 'tradein_form_result' })}
              />
            ) : (
              <form ref={formRef} noValidate onSubmit={submit} className="grid gap-x-4 gap-y-5 sm:grid-cols-2 xl:grid-cols-6">
                <Field id="aval-nome" label="Nome" required error={errors.name} className="xl:col-span-3">
                  <TextInput id="aval-nome" name="name" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={invalid('name')} aria-describedby={describedBy('aval-nome', errors.name)} />
                </Field>
                <Field id="aval-whatsapp" label="WhatsApp" required error={errors.phone} className="xl:col-span-3">
                  <TextInput
                    id="aval-whatsapp"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="(11) 91234-5678"
                    value={form.phone}
                    onChange={(e) => set('phone', maskPhone(e.target.value))}
                    aria-invalid={invalid('phone')}
                    aria-describedby={describedBy('aval-whatsapp', errors.phone)}
                  />
                </Field>
                <Field id="aval-marca" label="Marca" required error={errors.brand} className="xl:col-span-2">
                  <TextInput id="aval-marca" name="brand" placeholder="Ex.: Fiat" value={form.brand} onChange={(e) => set('brand', e.target.value)} aria-invalid={invalid('brand')} aria-describedby={describedBy('aval-marca', errors.brand)} />
                </Field>
                <Field id="aval-modelo" label="Modelo" required error={errors.model} className="xl:col-span-2">
                  <TextInput id="aval-modelo" name="model" placeholder="Ex.: Argo" value={form.model} onChange={(e) => set('model', e.target.value)} aria-invalid={invalid('model')} aria-describedby={describedBy('aval-modelo', errors.model)} />
                </Field>
                <Field id="aval-versao" label="Versão" className="sm:col-span-2 xl:col-span-2">
                  <TextInput id="aval-versao" name="version" placeholder="Ex.: Drive 1.0" value={form.version} onChange={(e) => set('version', e.target.value)} />
                </Field>
                <Field id="aval-ano" label="Ano" required error={errors.year} className="xl:col-span-2">
                  <TextInput id="aval-ano" name="year" inputMode="numeric" maxLength={4} placeholder="Ex.: 2019" value={form.year} onChange={(e) => set('year', e.target.value.replace(/\D/g, ''))} aria-invalid={invalid('year')} aria-describedby={describedBy('aval-ano', errors.year)} />
                </Field>
                <Field id="aval-km" label="Quilometragem" required error={errors.km} className="xl:col-span-2">
                  <TextInput id="aval-km" name="km" inputMode="numeric" placeholder="Ex.: 45.000" value={form.km} onChange={(e) => set('km', formatKmInput(e.target.value))} aria-invalid={invalid('km')} aria-describedby={describedBy('aval-km', errors.km)} />
                </Field>
                <Field id="aval-estado" label="Estado geral" required error={errors.condition} className="sm:col-span-2 xl:col-span-2">
                  <SelectInput id="aval-estado" name="condition" value={form.condition} onChange={(e) => set('condition', e.target.value)} aria-invalid={invalid('condition')} aria-describedby={describedBy('aval-estado', errors.condition)}>
                    <option value="">Selecione</option>
                    {CONDITION_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </SelectInput>
                </Field>
                <Field id="aval-cidade" label="Cidade" required error={errors.city} className="xl:col-span-3">
                  <TextInput id="aval-cidade" name="city" autoComplete="address-level2" placeholder="Ex.: Guarulhos" value={form.city} onChange={(e) => set('city', e.target.value)} aria-invalid={invalid('city')} aria-describedby={describedBy('aval-cidade', errors.city)} />
                </Field>
                <ChoiceGroup
                  name="openLoan"
                  legend="Possui financiamento em aberto?"
                  options={['Sim', 'Não']}
                  value={form.openLoan}
                  onChange={(v) => set('openLoan', v)}
                  required
                  error={errors.openLoan}
                  className="xl:col-span-3"
                />
                <Field id="aval-obs" label="Observações" className="sm:col-span-2 xl:col-span-6">
                  <TextArea id="aval-obs" name="notes" rows={3} placeholder="Revisões em dia, detalhes de lataria, pneus, único dono…" value={form.notes} onChange={(e) => set('notes', e.target.value)} />
                </Field>

                {/* Fotos */}
                <div className="flex flex-col gap-3 sm:col-span-2 xl:col-span-6">
                  <p className="text-[0.9rem] font-medium text-nevoa">
                    Fotos do veículo <span className="font-normal text-cimento">(opcional)</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {photos.map((p, i) => (
                      <div key={p.url} className="relative h-20 w-24 overflow-hidden rounded-[10px] border border-aco">
                        <img src={p.url} alt={`Foto ${i + 1} selecionada`} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(p.url)}
                          aria-label={`Remover foto ${i + 1}`}
                          className="absolute right-1 top-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-branco hover:text-erro"
                        >
                          <Trash2 size={14} aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                    {photos.length < MAX_PHOTOS && (
                      <label
                        htmlFor="aval-fotos"
                        className="inline-flex h-20 min-w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] border border-dashed border-aco-claro px-4 text-[0.8rem] text-cimento transition-colors hover:border-ouro hover:text-ouro-claro has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ouro"
                      >
                        <ImagePlus size={20} strokeWidth={1.6} aria-hidden="true" />
                        {photos.length ? 'Adicionar' : 'Escolher fotos'}
                        <input id="aval-fotos" type="file" accept="image/*" multiple onChange={addPhotos} className="sr-only" aria-describedby="aval-fotos-nota" />
                      </label>
                    )}
                  </div>
                  <p id="aval-fotos-nota" className="text-[0.82rem] leading-snug text-cimento">
                    As fotos ficam apenas no seu aparelho e não são enviadas automaticamente. Depois que a conversa abrir no WhatsApp,
                    envie as fotos selecionadas por lá.
                  </p>
                  {photoNote && (
                    <p role="status" className="text-[0.82rem] text-reserva">
                      {photoNote}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2 xl:col-span-6">
                  <ConsentCheckbox id="aval-consentimento" name="consent" checked={form.consent} onChange={(v) => set('consent', v)} error={errors.consent}>
                    <span>
                      Autorizo o envio destas informações ao Thiago pelo WhatsApp para a avaliação do veículo, conforme a{' '}
                      <a href="#privacidade" className="text-ouro-claro underline underline-offset-2">
                        Política de Privacidade
                      </a>
                      .
                    </span>
                  </ConsentCheckbox>
                </div>
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between xl:col-span-6">
                  <p className="text-[0.85rem] text-cimento">{LEGAL.tradeInNotice}</p>
                  <Button type="submit" size="lg" icon={<MessageCircle size={20} strokeWidth={2} aria-hidden="true" />}>
                    Solicitar avaliação
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
