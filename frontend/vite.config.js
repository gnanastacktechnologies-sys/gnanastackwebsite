import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listens on 0.0.0.0 to enable local network / mobile access
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:17200',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
