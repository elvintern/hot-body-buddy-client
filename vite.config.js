import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      // devOptions: {
      //   enabled: true,
      // },
      includeAssets: ['favicon.ico', 'robots.txt', 'img/**'],
      manifest: {
        src: '/manifest.webmanifest.js',
        start_url: '/index.html',
        display: 'standalone',
        name: 'Hot Body Buddy',
        short_name: 'HBB',
        theme_color: '#ffffff',
        icons: [
          {
            src: './splash_screens/icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: './splash_screens/icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
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
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        serviceWorker: './serviceWorker.js', // Update this path
      },
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
  },
  assetsInclude: [
    '**/*.PNG',
    '**/*.png',
    '**/*.jpg',
    '/assets/loadingImages/**/*.jpg',
  ],
});
