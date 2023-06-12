self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('version-1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './offline.html',
        // Add any other assets you want to cache
      ]);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== 'version-1') // Update the cache name if needed
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          const responseToCache = response.clone();

          caches.open('version-1').then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        return caches.match('./offline.html');
      })
  );
});

self.addEventListener('click', (event) => {
  if (event.target.id === 'install-button' && self.deferredPrompt) {
    self.deferredPrompt.prompt();
    self.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User installed the app');
      } else {
        console.log('User dismissed the install prompt');
      }
      self.deferredPrompt = null; // Reset the deferredPrompt after user interaction
    });
  }
});
