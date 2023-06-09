import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'img/**'],
      manifest: {
        src: 'manifest.webmanifest.js',
        name: 'Hot Body Buddy',
        short_name: 'HBB',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/src/assets/hbb-logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/src/assets/hbb-logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Workbox options
      },
    }),
    imagemin({
      gifsicle: {},
      mozjpeg: {},
      pngquant: {
        quality: [0.7, 0.9],
        speed: 4,
      },
      svgo: {},
      webp: {},
    }),
  ],
  assetsInclude: ['**/*.PNG'],
});
