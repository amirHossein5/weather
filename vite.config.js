import { defineConfig } from 'vite';
import path from 'path';

const ROOT = path.resolve(__dirname, 'src');
const OUTDIR = path.resolve(__dirname, 'dist');
const VENDOR = path.resolve(__dirname, 'src', 'vendor');

export default defineConfig({
  root: ROOT,
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
