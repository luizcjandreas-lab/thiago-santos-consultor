/* ==========================================================================
   ESTOQUE DE VEÍCULOS
   --------------------------------------------------------------------------
   Se nenhum veículo estiver visível, a vitrine mostra o aviso
   "Estoque em atualização" com os botões de WhatsApp e busca personalizada.
   Veículos com "hidden: true" ficam salvos aqui, mas não aparecem no site.

   Para cadastrar um veículo:
   1. Coloque as fotos em /public/estoque/<id-do-veiculo>/ (ex.: 1.webp, 2.webp...).
      Use fotos na horizontal (4:3), com no máximo 1600 px de largura.
   2. Copie o modelo abaixo para dentro da lista VEHICLES e preencha.
   3. "images" recebe os caminhos das fotos. A primeira é a foto principal.
   4. "storeId" precisa ser igual ao "id" de uma loja em site.ts (loja-1, loja-2, loja-3).
   5. "price: null" exibe "Consulte" no lugar do preço.
   6. "status": 'disponivel', 'reservado' ou 'vendido'. Vendidos aparecem no fim
      da lista, com a tarja "Vendido", como histórico.

   Modelo (copie a partir da chave de abertura até a vírgula final):

   {
     id: 'polo-highline-2023',
     brand: 'Volkswagen',
     model: 'Polo',
     version: 'Highline 200 TSI',
     yearMake: 2022,
     yearModel: 2023,
     km: 28400,
     transmission: 'Automático',      // 'Manual' | 'Automático' | 'CVT' | 'Automatizado'
     fuel: 'Flex',                    // 'Flex' | 'Gasolina' | 'Diesel' | 'Híbrido' | 'Elétrico'
     price: 104900,                   // ou null para "Consulte"
     color: 'Prata',
     bodyType: 'hatch',               // 'hatch' | 'sedan' | 'suv' | 'picape' (ilustração quando não há fotos)
     storeId: 'loja-1',
     status: 'disponivel',
     images: ['estoque/polo-highline-2023/1.webp', 'estoque/polo-highline-2023/2.webp'],
     engine: '1.0 turbo',
     doors: 4,
     features: ['Central multimídia', 'Câmera de ré', 'Rodas de liga leve'],
     notes: 'Revisões em dia, manual e chave reserva.',
   },
   ========================================================================== */

import type { Vehicle } from './types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'jetta-r-line-2020',
    brand: 'Volkswagen',
    model: 'Jetta',
    version: 'R-Line 1.4 TSI 250',
    yearModel: 2020,
    // km: preencher quando souber (sem km, o site mostra "Consulte")
    transmission: 'Automático',
    fuel: 'Flex',
    price: 122900,
    color: 'Branco',
    bodyType: 'sedan',
    // storeId: 'loja-1', // preencher com a unidade onde o carro está
    status: 'disponivel',
    engine: '1.4 TSI',
    doors: 4,
    images: [
      'estoque/jetta-r-line-2020/1.webp',
      'estoque/jetta-r-line-2020/2.webp',
      'estoque/jetta-r-line-2020/3.webp',
      'estoque/jetta-r-line-2020/4.webp',
      'estoque/jetta-r-line-2020/5.webp',
      'estoque/jetta-r-line-2020/6.webp',
      'estoque/jetta-r-line-2020/7.webp',
      'estoque/jetta-r-line-2020/8.webp',
      'estoque/jetta-r-line-2020/9.webp',
      'estoque/jetta-r-line-2020/10.webp',
      'estoque/jetta-r-line-2020/11.webp',
      'estoque/jetta-r-line-2020/12.webp',
      'estoque/jetta-r-line-2020/13.webp',
    ],
    features: ['Completo', 'Pacote Premium', 'Teto solar', 'Painel digital', 'Central multimídia'],
    notes: 'IPVA 2026 pago.',
  },
  {
    id: 'onix-plus-premier-2023',
    brand: 'Chevrolet',
    model: 'Onix Plus',
    version: '1.0 Turbo Premier 2',
    yearModel: 2023,
    // km: preencher quando souber
    transmission: 'Automático',
    fuel: 'Flex',
    price: 81900,
    color: 'Preto',
    bodyType: 'sedan',
    // storeId: 'loja-1',
    status: 'disponivel',
    engine: '1.0 turbo',
    doors: 4,
    images: [
      'estoque/onix-plus-premier-2023/1.webp',
      'estoque/onix-plus-premier-2023/2.webp',
      'estoque/onix-plus-premier-2023/3.webp',
      'estoque/onix-plus-premier-2023/4.webp',
      'estoque/onix-plus-premier-2023/5.webp',
      'estoque/onix-plus-premier-2023/6.webp',
      'estoque/onix-plus-premier-2023/7.webp',
      'estoque/onix-plus-premier-2023/8.webp',
      'estoque/onix-plus-premier-2023/9.webp',
      'estoque/onix-plus-premier-2023/10.webp',
    ],
    features: ['Completo', 'Central multimídia'],
    notes: 'IPVA 2026 pago.',
  },
  {
    id: 'hb20s-1-0',
    brand: 'Hyundai',
    model: 'HB20S',
    version: '1.0 TGDI Comfort Plus',
    yearModel: 2025,
    // km: preencher quando souber
    transmission: 'Automático',
    fuel: 'Flex',
    price: 86900,
    color: 'Branco',
    bodyType: 'sedan',
    // storeId: 'loja-1',
    status: 'disponivel',
    engine: '1.0 turbo',
    doors: 4,
    images: [
      'estoque/hb20s-1-0/1.webp',
      'estoque/hb20s-1-0/2.webp',
      'estoque/hb20s-1-0/3.webp',
      'estoque/hb20s-1-0/4.webp',
      'estoque/hb20s-1-0/5.webp',
      'estoque/hb20s-1-0/6.webp',
      'estoque/hb20s-1-0/7.webp',
      'estoque/hb20s-1-0/8.webp',
      'estoque/hb20s-1-0/9.webp',
      'estoque/hb20s-1-0/10.webp',
      'estoque/hb20s-1-0/11.webp',
      'estoque/hb20s-1-0/12.webp',
    ],
    features: ['Completo', 'Central multimídia'],
    notes: 'IPVA 2026 pago.',
  },
  {
    id: 'hyundai-creta',
    brand: 'Hyundai',
    model: 'Creta',
    version: '1.6 Action',
    yearModel: 2019,
    // km: preencher quando souber
    transmission: 'Automático',
    fuel: 'Flex',
    price: 87900,
    color: 'Branco',
    bodyType: 'suv',
    // storeId: 'loja-1',
    status: 'disponivel',
    engine: '1.6',
    doors: 4,
    images: [
      'estoque/hyundai-creta/1.webp',
      'estoque/hyundai-creta/2.webp',
      'estoque/hyundai-creta/3.webp',
      'estoque/hyundai-creta/4.webp',
      'estoque/hyundai-creta/5.webp',
      'estoque/hyundai-creta/6.webp',
      'estoque/hyundai-creta/7.webp',
      'estoque/hyundai-creta/8.webp',
      'estoque/hyundai-creta/9.webp',
      'estoque/hyundai-creta/10.webp',
      'estoque/hyundai-creta/11.webp',
    ],
    features: ['Completo', 'Central multimídia'],
    notes: 'IPVA 2026 pago.',
  },

  {
    id: 't-cross-1-4',
    brand: 'Volkswagen',
    model: 'T-Cross',
    version: '1.4 TSI 250 Highline',
    yearModel: 2021,
    // km: preencher quando souber
    transmission: 'Automático',
    fuel: 'Flex',
    price: 106900,
    color: 'Preto',
    bodyType: 'suv',
    // storeId: 'loja-1',
    status: 'disponivel',
    engine: '1.4 TSI',
    doors: 4,
    images: [
      'estoque/t-cross-1-4/1.webp',
      'estoque/t-cross-1-4/2.webp',
      'estoque/t-cross-1-4/3.webp',
      'estoque/t-cross-1-4/4.webp',
      'estoque/t-cross-1-4/5.webp',
      'estoque/t-cross-1-4/6.webp',
      'estoque/t-cross-1-4/7.webp',
      'estoque/t-cross-1-4/8.webp',
      'estoque/t-cross-1-4/9.webp',
      'estoque/t-cross-1-4/10.webp',
      'estoque/t-cross-1-4/11.webp',
      'estoque/t-cross-1-4/12.webp',
    ],
    features: ['Completo', 'Painel digital', 'Central multimídia'],
    notes: 'IPVA 2026 pago.',
  },
];

/** Veículos exibidos no site (os marcados com hidden: true ficam de fora) */
export const STOCK = VEHICLES.filter((v) => !v.hidden);
