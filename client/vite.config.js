import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Dedicated 3D / WebGL chunk
          if (id.includes('three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          // Dedicated Motion chunk
          if (id.includes('gsap') || id.includes('lenis')) {
            return 'vendor-animation';
          }
          // React Core chunk
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'vendor-react';
          }
          // Icons chunk
          if (id.includes('lucide-react')) {
            return 'vendor-icons';
          }
        },
      },
    },
  },
});
