import { LayoutGrid, MessageCircle } from 'lucide-react';
import { BRAND, CONTACT, LEGAL, LINKS, PARTNER_STORE, PROFILE, STORES } from '../config/site';
import { track } from '../lib/analytics';
import { asset, cx, isFilled, storeLabel } from '../lib/utils';
import { whatsappUrl } from '../lib/whatsapp';
import { navItems } from './Header';
import { InstagramIcon } from './ui/Icons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-aco bg-asfalto">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <img
            src={asset(BRAND.logoFull)}
            alt={`${PROFILE.name} — Consultor de Vendas. WhatsApp ${CONTACT.whatsappDisplay}, Instagram @${CONTACT.instagram}`}
            width={1000}
            height={400}
            loading="lazy"
            className="w-full max-w-[19rem]"
          />
          <p className="mt-6 font-wide font-semibold text-branco">
            {PROFILE.name} <span className="font-normal text-cimento">— {PROFILE.title}</span>
          </p>
          <p className="mt-1 text-[0.92rem] text-cimento">Atendimento em {PROFILE.region}</p>
        </div>

        <nav aria-label="Links rápidos" className="lg:col-span-2">
          <p className="text-[0.85rem] font-semibold text-branco">Navegação</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-[0.92rem]">
            {[...navItems, { id: 'busca', label: 'Busca personalizada' }, { id: 'avaliacao', label: 'Avaliação do seu veículo' }, { id: 'faq', label: 'Perguntas frequentes' }].map(
              (item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-cimento transition-colors hover:text-ouro-claro">
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="text-[0.85rem] font-semibold text-branco">Contato</p>
          <ul className="mt-4 flex flex-col gap-3 text-[0.92rem]">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('whatsapp_click', { location: 'footer' })}
                className="inline-flex items-center gap-2.5 text-nevoa transition-colors hover:text-ouro-claro"
              >
                <MessageCircle size={17} strokeWidth={1.8} aria-hidden="true" className="text-ouro" />
                WhatsApp {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={LINKS.whatsappCatalog}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('catalog_click', { location: 'footer' })}
                className="inline-flex items-center gap-2.5 text-nevoa transition-colors hover:text-ouro-claro"
              >
                <LayoutGrid size={17} strokeWidth={1.8} aria-hidden="true" className="text-ouro" />
                Catálogo no WhatsApp
              </a>
            </li>
            <li>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('instagram_click', { location: 'footer' })}
                className="inline-flex items-center gap-2.5 text-nevoa transition-colors hover:text-ouro-claro"
              >
                <InstagramIcon size={17} className="text-ouro" />@{CONTACT.instagram}
              </a>
            </li>
            {isFilled(CONTACT.email) && (
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-nevoa transition-colors hover:text-ouro-claro">
                  {CONTACT.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[0.85rem] font-semibold text-branco">Lojas {PARTNER_STORE.name}</p>
          <ul className="mt-4 flex flex-col gap-3.5 text-[0.88rem]">
            {STORES.map((s) => (
              <li key={s.id}>
                <p className="text-nevoa">{storeLabel(s)}</p>
                <p className={cx('mt-0.5', isFilled(s.address) ? 'text-cimento' : 'pending')}>{s.address}</p>
              </li>
            ))}
          </ul>
          {isFilled(PARTNER_STORE.website) && (
            <a href={PARTNER_STORE.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[0.88rem] text-cimento underline-offset-4 hover:text-ouro-claro hover:underline">
              Site da loja
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-aco">
        <div className="container-site flex flex-col gap-4 py-8 text-[0.82rem] leading-relaxed text-cimento lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="flex max-w-[46rem] flex-col gap-1.5">
            <p>{LEGAL.priceNotice}</p>
            <p>{LEGAL.financingNotice}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-1.5 lg:items-end">
            <a href="#privacidade" className="text-nevoa underline-offset-4 hover:text-ouro-claro hover:underline">
              Política de privacidade
            </a>
            <p>
              © {year} {PROFILE.fullName}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
