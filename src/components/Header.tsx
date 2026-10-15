import { Menu, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { BRAND, CONTACT, LINKS, NAV_ITEMS, PROFILE, TESTIMONIALS } from '../config/site';
import { track } from '../lib/analytics';
import { useActiveSection, useScrolled } from '../lib/hooks';
import { asset, cx } from '../lib/utils';
import { whatsappUrl } from '../lib/whatsapp';
import { ButtonLink } from './ui/Button';
import { Dialog, DialogClose } from './ui/Dialog';
import { InstagramIcon } from './ui/Icons';

export const navItems = NAV_ITEMS.filter((item) => item.id !== 'depoimentos' || TESTIMONIALS.enabled);

export function Header() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navItems.map((i) => i.id));

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled ? 'border-b border-aco/80 bg-asfalto/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent',
        )}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-20">
          <a href="#inicio" className="shrink-0 rounded-md" aria-label={`${PROFILE.name}, voltar ao início`}>
            <img
              src={asset(BRAND.logo)}
              alt={`${PROFILE.name} — Consultor de Vendas`}
              width={1000}
              height={283}
              className="h-10 w-auto lg:h-12"
            />
          </a>

          <nav aria-label="Menu principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    onClick={() => track('nav_click', { item: item.id })}
                    className={cx(
                      'relative rounded-md px-3 py-2 text-[0.92rem] transition-colors',
                      active === item.id ? 'text-branco' : 'text-cimento hover:text-branco',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cx(
                        'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-ouro transition-transform duration-300',
                        active === item.id ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={whatsappUrl()}
              size="sm"
              className="max-sm:hidden lg:h-11 lg:px-5"
              icon={<MessageCircle size={18} strokeWidth={2} aria-hidden="true" />}
              onClick={() => track('whatsapp_click', { location: 'header' })}
            >
              Falar no WhatsApp
            </ButtonLink>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-aco text-branco transition-colors hover:border-ouro xl:hidden"
              aria-label="Abrir menu"
              aria-expanded={open}
              aria-controls="menu-celular"
              onClick={() => setOpen(true)}
            >
              <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <Dialog open={open} onClose={() => setOpen(false)} labelledBy="menu-celular-titulo" variant="drawer">
        <div id="menu-celular" className="flex h-full flex-col overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
          <div className="flex items-center justify-between gap-4 border-b border-aco px-6 py-4">
            <h2 id="menu-celular-titulo" className="sr-only">
              Menu
            </h2>
            <img src={asset(BRAND.logo)} alt="" width={1000} height={283} className="h-10 w-auto" />
            <DialogClose onClose={() => setOpen(false)} label="Fechar menu" />
          </div>
          <nav aria-label="Menu" className="flex-1 px-3 py-4">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => {
                      track('nav_click', { item: item.id, menu: 'mobile' });
                      setOpen(false);
                    }}
                    className={cx(
                      'flex items-center justify-between rounded-[10px] px-3 py-3.5 font-wide text-[1.15rem] font-semibold transition-colors hover:bg-chumbo',
                      active === item.id ? 'text-ouro-claro' : 'text-branco',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-3 border-t border-aco px-6 py-6">
            <ButtonLink
              href={whatsappUrl()}
              size="lg"
              className="w-full"
              icon={<MessageCircle size={20} strokeWidth={2} aria-hidden="true" />}
              onClick={() => track('whatsapp_click', { location: 'mobile_menu' })}
            >
              Falar no WhatsApp
            </ButtonLink>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('instagram_click', { location: 'mobile_menu' })}
              className="inline-flex items-center justify-center gap-2 py-2 text-[0.95rem] text-nevoa hover:text-ouro-claro"
            >
              <InstagramIcon size={18} /> @{CONTACT.instagram}
            </a>
            <p className="text-center text-[0.85rem] text-cimento">Atendimento em {PROFILE.region}</p>
          </div>
        </div>
      </Dialog>
    </>
  );
}
