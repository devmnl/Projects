
// pwabuilder-adv-sw.js
const CACHE_NAME = 'your-cache-name';
const offlineFallbackPage = 'index.html'; // Ou outra página

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        offlineFallbackPage,
        // outros arquivos que você precisa
        'calculadora-diametro.html',
        'calculadora-metragem.html',
        'tabela-sentidos.html',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(offlineFallbackPage);
    })
  );
});
