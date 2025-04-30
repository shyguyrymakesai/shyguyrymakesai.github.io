import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/personal-site/'  // use '/' if repo is ryanmartinez.github.io
});
