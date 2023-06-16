// vite.config.js
import { defineConfig } from "file:///C:/Users/elvin/Desktop/github/hot-body-buddy-client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/elvin/Desktop/github/hot-body-buddy-client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import imagemin from "file:///C:/Users/elvin/Desktop/github/hot-body-buddy-client/node_modules/vite-plugin-imagemin/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/elvin/Desktop/github/hot-body-buddy-client/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: {},
      mozjpeg: {},
      pngquant: {
        quality: [0.7, 0.9],
        speed: 4
      },
      svgo: {},
      webp: {}
    }),
    VitePWA({
      registerType: "prompt",
      // devOptions: {
      //   enabled: true,
      // },
      includeAssets: ["favicon.ico", "robots.txt", "img/**"],
      manifest: {
        src: "/manifest.webmanifest.js",
        start_url: "/index.html",
        scope: "/",
        display: "standalone",
        name: "Hot Body Buddy",
        short_name: "HBB",
        theme_color: "#ffffff",
        icons: [
          {
            src: "./splash_screens/icon.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "./splash_screens/icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        // Workbox options
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        serviceWorker: "./public/serviceWorker.js"
        // Update this path
      },
      output: {
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "[name].[hash].[ext]"
      }
    }
  },
  assetsInclude: [
    "**/*.PNG",
    "**/*.png",
    "**/*.jpg",
    "/loadingImages/**/*.jpg"
  ],
  server: {
    fs: {
      strict: false
    },
    mimeTypes: {
      "application/javascript": ["js"],
      // Add this line to configure the MIME type for JavaScript files
      "text/html": ["js"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlbHZpblxcXFxEZXNrdG9wXFxcXGdpdGh1YlxcXFxob3QtYm9keS1idWRkeS1jbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGVsdmluXFxcXERlc2t0b3BcXFxcZ2l0aHViXFxcXGhvdC1ib2R5LWJ1ZGR5LWNsaWVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZWx2aW4vRGVza3RvcC9naXRodWIvaG90LWJvZHktYnVkZHktY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBpbWFnZW1pbiBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZW1pbic7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgaW1hZ2VtaW4oe1xyXG4gICAgICBnaWZzaWNsZToge30sXHJcbiAgICAgIG1vempwZWc6IHt9LFxyXG4gICAgICBwbmdxdWFudDoge1xyXG4gICAgICAgIHF1YWxpdHk6IFswLjcsIDAuOV0sXHJcbiAgICAgICAgc3BlZWQ6IDQsXHJcbiAgICAgIH0sXHJcbiAgICAgIHN2Z286IHt9LFxyXG4gICAgICB3ZWJwOiB7fSxcclxuICAgIH0pLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ3Byb21wdCcsXHJcbiAgICAgIC8vIGRldk9wdGlvbnM6IHtcclxuICAgICAgLy8gICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAvLyB9LFxyXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uaWNvJywgJ3JvYm90cy50eHQnLCAnaW1nLyoqJ10sXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgc3JjOiAnL21hbmlmZXN0LndlYm1hbmlmZXN0LmpzJyxcclxuICAgICAgICBzdGFydF91cmw6ICcvaW5kZXguaHRtbCcsXHJcbiAgICAgICAgc2NvcGU6ICcvJyxcclxuICAgICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXHJcbiAgICAgICAgbmFtZTogJ0hvdCBCb2R5IEJ1ZGR5JyxcclxuICAgICAgICBzaG9ydF9uYW1lOiAnSEJCJyxcclxuICAgICAgICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgIGljb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJy4vc3BsYXNoX3NjcmVlbnMvaWNvbi5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSBtYXNrYWJsZScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICcuL3NwbGFzaF9zY3JlZW5zL2ljb24ucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXHJcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnkgbWFza2FibGUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgLy8gV29ya2JveCBvcHRpb25zXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgbWFpbjogJy4vaW5kZXguaHRtbCcsXHJcbiAgICAgICAgc2VydmljZVdvcmtlcjogJy4vcHVibGljL3NlcnZpY2VXb3JrZXIuanMnLCAvLyBVcGRhdGUgdGhpcyBwYXRoXHJcbiAgICAgIH0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLltoYXNoXS5qcycsXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdbbmFtZV0uW2hhc2hdLmpzJyxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ1tuYW1lXS5baGFzaF0uW2V4dF0nLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGFzc2V0c0luY2x1ZGU6IFtcclxuICAgICcqKi8qLlBORycsXHJcbiAgICAnKiovKi5wbmcnLFxyXG4gICAgJyoqLyouanBnJyxcclxuICAgICcvbG9hZGluZ0ltYWdlcy8qKi8qLmpwZycsXHJcbiAgXSxcclxuXHJcbiAgc2VydmVyOiB7XHJcbiAgICBmczoge1xyXG4gICAgICBzdHJpY3Q6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIG1pbWVUeXBlczoge1xyXG4gICAgICAnYXBwbGljYXRpb24vamF2YXNjcmlwdCc6IFsnanMnXSwgLy8gQWRkIHRoaXMgbGluZSB0byBjb25maWd1cmUgdGhlIE1JTUUgdHlwZSBmb3IgSmF2YVNjcmlwdCBmaWxlc1xyXG4gICAgICAndGV4dC9odG1sJzogWydqcyddLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VixTQUFTLG9CQUFvQjtBQUNwWCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxjQUFjO0FBQ3JCLFNBQVMsZUFBZTtBQUV4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxVQUFVLENBQUM7QUFBQSxNQUNYLFNBQVMsQ0FBQztBQUFBLE1BQ1YsVUFBVTtBQUFBLFFBQ1IsU0FBUyxDQUFDLEtBQUssR0FBRztBQUFBLFFBQ2xCLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxNQUFNLENBQUM7QUFBQSxNQUNQLE1BQU0sQ0FBQztBQUFBLElBQ1QsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSWQsZUFBZSxDQUFDLGVBQWUsY0FBYyxRQUFRO0FBQUEsTUFDckQsVUFBVTtBQUFBLFFBQ1IsS0FBSztBQUFBLFFBQ0wsV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUztBQUFBO0FBQUEsTUFFVDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLGVBQWU7QUFBQTtBQUFBLE1BQ2pCO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxlQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxXQUFXO0FBQUEsTUFDVCwwQkFBMEIsQ0FBQyxJQUFJO0FBQUE7QUFBQSxNQUMvQixhQUFhLENBQUMsSUFBSTtBQUFBLElBQ3BCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
