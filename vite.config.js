import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
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
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true,
      },
      serviceWorker: false,

      includeAssets: ['favicon.ico', 'robots.txt', 'img/**'],
      manifest: {
        src: '/manifest.webmanifest.js',
        start_url: '/index.html',
        scope: '/',
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
  ],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        serviceWorker: './public/serviceWorker.js', // Update this path
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
    '**/*.mp4',
    '/loadingImages/**/*.jpg',
  ],

  server: {
    fs: {
      strict: false,
    },
    mimeTypes: {
      'application/javascript': ['js'], // Add this line to configure the MIME type for JavaScript files
      'text/html': ['js'],
    },
  },
});
