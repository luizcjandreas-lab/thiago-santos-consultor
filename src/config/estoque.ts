/* ==========================================================================
   ESTOQUE DE VEÍCULOS
   --------------------------------------------------------------------------
   Enquanto esta lista estiver vazia, a vitrine mostra o aviso
   "Estoque em atualização" com os botões de WhatsApp e busca personalizada.

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

export const VEHICLES: Vehicle[] = [];
