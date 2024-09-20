self.addEventListener('install', async (event) => {
  const CACHE_NAME = 'pwabuilder-page';
  const offlineFallbackPage = '/index.html'; // Use um caminho correto

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([offlineFallbackPage]))
      .catch(error => {
        console.error('Erro ao adicionar ao cache:', error);
      })
  );
});
