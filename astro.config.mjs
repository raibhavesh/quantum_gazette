import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://quantum-gazette.com',
  devToolbar: {
    enabled: false,
  },
});