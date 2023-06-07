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
        name: 'Hot Body Buddy',
        short_name: 'HBB',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/hbb-logo-018a9c64.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/hbb-logo-018a9c64.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
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
