import { useEffect } from 'react';
import { CONTACT, LINKS, PARTNER_STORE, PROFILE, SEO, SERVICES, STORES, WHATSAPP_NUMBER } from '../config/site';
import { isFilled, storeLabel } from '../lib/utils';

/**
 * Dados estruturados (schema.org) gerados a partir de src/config/site.ts.
 * Ajudam o Google a entender quem é o profissional, onde atende e o que oferece.
 * Campos ainda não preenchidos ficam de fora automaticamente.
 */
export function StructuredData() {
  useEffect(() => {
    const url = SEO.siteUrl ? `${SEO.siteUrl}/` : undefined;
    const image = SEO.siteUrl ? `${SEO.siteUrl}/${SEO.ogImage}` : undefined;
    const phone = isFilled(WHATSAPP_NUMBER) ? `+${WHATSAPP_NUMBER}` : undefined;
    const filledStores = STORES.filter((s) => isFilled(s.address));

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Person',
        '@id': '#thiago-santos',
        name: PROFILE.fullName,
        alternateName: PROFILE.name,
        jobTitle: PROFILE.role,
        description: SEO.description,
        url,
        image,
        telephone: phone,
        email: isFilled(CONTACT.email) ? CONTACT.email : undefined,
        sameAs: [LINKS.instagram],
        areaServed: [
          { '@type': 'City', name: 'São Paulo' },
          { '@type': 'AdministrativeArea', name: 'Região Metropolitana de São Paulo' },
        ],
        knowsAbout: ['Venda de veículos seminovos', 'Financiamento de veículos', 'Avaliação de veículos usados', 'Troca de veículos'],
        worksFor: isFilled(PARTNER_STORE.name) ? { '@id': '#loja' } : undefined,
        makesOffer: SERVICES.filter((s) => s.enabled).map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: s.description },
        })),
      },
    ];

    if (isFilled(PARTNER_STORE.name)) {
      graph.push({
        '@type': 'AutoDealer',
        '@id': '#loja',
        name: PARTNER_STORE.name,
        url: isFilled(PARTNER_STORE.website) ? PARTNER_STORE.website : undefined,
        areaServed: PROFILE.region,
        department: filledStores.length
          ? filledStores.map((s) => ({
              '@type': 'AutoDealer',
              name: isFilled(s.name) ? s.name : `${PARTNER_STORE.name} — ${storeLabel(s)}`,
              address: s.address,
              telephone: isFilled(s.phone) ? s.phone : undefined,
              openingHours: s.openingHours?.length ? s.openingHours : undefined,
              hasMap: isFilled(s.mapsUrl) ? s.mapsUrl : undefined,
            }))
          : undefined,
      });
    }

    graph.push({ '@type': 'WebSite', name: `${PROFILE.name} — ${PROFILE.title}`, url, inLanguage: 'pt-BR' });

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return null;
}
