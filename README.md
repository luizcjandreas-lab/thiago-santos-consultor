# Site — Thiago Santos, Consultor de Vendas

Site de marca pessoal do Thiago Santos (gerente de vendas, 8 anos de experiência, São Paulo e Grande São Paulo).
Feito em React + TypeScript + Tailwind CSS 4 + Framer Motion + Lucide React, com Vite.

## Como rodar

Requisitos: Node.js 18 ou mais recente.

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm run build      # gera a pasta dist/ pronta para publicar
npm run preview    # confere a versão final localmente
npm run typecheck  # checagem de tipos do TypeScript
```

## Onde editar as informações

Tudo o que é fixo no site fica em dois arquivos:

| Arquivo | O que tem |
| --- | --- |
| `src/config/site.ts` | Nome, cargo, WhatsApp, Instagram, e-mail, cores, logomarcas, fotos, loja, unidades, serviços, depoimentos, perguntas frequentes, links e avisos legais |
| `src/config/estoque.ts` | Veículos (vitrine) |

Valores entre colchetes, como `[ENDEREÇO]`, ainda precisam ser preenchidos. Enquanto estiverem assim, o site
mostra o campo como pendente e desativa botões que dependem dele (por exemplo, "Como chegar" sem link do mapa).

### Pendências

- [ ] Nome, telefone, Instagram e tipos de veículos de cada unidade (`STORES`). Endereços e horários já preenchidos.
      Campos não informados ficam ocultos no site.
- [ ] E-mail de contato (`CONTACT.email`)
- [ ] Logomarca da loja (`PARTNER_STORE.logo`) — enquanto vazia, aparece só o nome em texto
- [ ] Veículos em `estoque.ts` (a lista está vazia; a vitrine mostra "Estoque em atualização")
- [ ] Depoimentos em texto no carrossel (`TESTIMONIALS.items`), se quiser destacar alguns. As avaliações do Google já estão linkadas (`LINKS.googleReviews`).
- [ ] IDs de rastreamento no `.env` (opcional) e domínio próprio, se houver

Já preenchidos: WhatsApp **(11) 97812-7789**, Instagram **@thiagoconsultorfimavel**, endereços e horários das 3 unidades em Jundiaí e o link das avaliações no Google.

## Cadastrar veículos

1. Coloque as fotos em `public/estoque/<id-do-veiculo>/` (ex.: `1.webp`, `2.webp`). Fotos na horizontal (4:3), até 1600 px de largura.
2. Em `src/config/estoque.ts`, copie o modelo do comentário no topo do arquivo para dentro de `VEHICLES`.
3. Preencha `images: ['estoque/<id>/1.webp', 'estoque/<id>/2.webp']`. A primeira é a foto do card.
4. `status`: `'disponivel'`, `'reservado'` ou `'vendido'`. Vendidos ficam no fim da lista com a tarja "Vendido".
5. `price: null` mostra "Consulte".

Sem fotos, o card mostra uma ilustração da carroceria (`bodyType`) na cor informada.

## WhatsApp

Todos os botões geram mensagens prontas (`src/lib/whatsapp.ts`):

- Geral: "Olá, Thiago! Vim pelo seu site e gostaria de receber ajuda para encontrar meu próximo veículo."
- Veículo: "Olá, Thiago! Vim pelo seu site e gostaria de saber mais sobre o [marca, modelo, versão e ano]. Ele ainda está disponível?"
- Busca personalizada e avaliação: as respostas do formulário são organizadas em uma mensagem.

As fotos escolhidas no formulário de avaliação **não** são enviadas pelo link do WhatsApp (o link aceita só texto e o site
não tem servidor). O visitante vê a orientação para enviá-las na conversa. Detalhes no comentário de `src/components/TradeIn.tsx`.

## Rastreamento (Google Analytics 4 e Meta Pixel)

Copie `.env.example` para `.env` e preencha:

```
VITE_SITE_URL=https://seu-dominio.com.br
VITE_GA_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=123456789012345
```

Com algum ID preenchido, aparece um aviso de cookies; os scripts só carregam depois do "Aceitar".
Eventos registrados: `whatsapp_click`, `vehicle_details_open`, `vehicle_interest`, `vehicle_filter`,
`search_form_submit`, `tradein_form_submit`, `store_directions`, `store_schedule`, `instagram_click`, `nav_click`
(também enviados ao `window.dataLayer`, para quem usa o Google Tag Manager).

## Publicar

`npm run build` gera a pasta `dist/`. Ela pode ir para Vercel, Netlify, Cloudflare Pages ou qualquer hospedagem
comum (envie o conteúdo de `dist/` para a pasta pública). Como o projeto usa caminhos relativos, funciona também em subpastas.

## Mídias

- **Logomarca**: recortada do PDF original sem alterar desenho, cores ou proporções. O cabeçalho e a abertura usam a versão
  sem a linha de contatos (`logo-thiago.png/.webp`), e o rodapé usa a versão completa (`logo-thiago-completo`).
  O favicon usa as letras "T" e "S" da própria logomarca.
- **Fotos**: recortadas e otimizadas em WebP (`public/media`). Os arquivos originais estão em `assets-originais/`.
- **Vídeos**: convertidos para MP4 (H.264, sem áudio). Fachadas nas unidades, recepção na seção "Sobre" e o reflexo na
  pintura como fundo da chamada final. Todos tocam só quando aparecem na tela e respeitam "reduzir movimento".

## Estrutura

```
src/
  config/        site.ts (dados), estoque.ts (veículos), types.ts
  lib/           whatsapp, analytics, hooks, utilidades
  components/    seções da página
    ui/          botões, campos, janela (dialog), vídeo
    vehicles/    vitrine, filtros, card, detalhes e galeria
public/
  brand/         logomarcas e ícones
  media/         fotos e vídeos otimizados
```
