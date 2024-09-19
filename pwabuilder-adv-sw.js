
// service-worker.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('c').then(cache => {
      return cache.addAll([
        
        'index.html',
        // Adicione outros arquivos que deseja armazenar em cache
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});