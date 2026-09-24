import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
const stub = fileURLToPath(new URL('./src/data/firebase-stub.ts', import.meta.url));
import { viteSingleFile } from 'vite-plugin-singlefile';
/** Aperçu autonome : un seul fichier HTML, routage par ancre (#/...). */
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  define: { 'import.meta.env.VITE_HASH_ROUTER': JSON.stringify('1') },
  resolve: { alias: { 'firebase/app': stub, 'firebase/firestore': stub, 'firebase/auth': stub } },
  build: { outDir: 'dist-apercu', assetsInlineLimit: 100_000_000, cssCodeSplit: false },
});
