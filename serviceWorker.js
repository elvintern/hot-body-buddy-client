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
