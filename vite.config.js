import { defineConfig } from 'vite';
import path from 'path';

const ROOT = path.resolve(__dirname, 'src');
const PUBLIC = path.resolve(__dirname, 'public');
const OUTDIR = path.resolve(__dirname, 'dist');
const VENDOR = path.resolve(__dirname, 'src', 'vendor');

export default defineConfig({
  root: ROOT,
  publicDir: PUBLIC,
  build: {
    outDir: OUTDIR,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(ROOT, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@vendor': VENDOR,
    },
  },
});
