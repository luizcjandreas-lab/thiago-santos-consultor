import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base './' permite publicar a pasta dist em qualquer hospedagem
// (raiz do domínio, subpasta, Vercel, Netlify, Hostinger etc.).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
});
