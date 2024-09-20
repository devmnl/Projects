// O nome do cache
const CACHE_NAME = 'pwa-cache-v1';

// Lista de arquivos para armazenar em cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/images/flexologo.png',
    // Adicione outros arquivos necessários
];

// Evento install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Evento activate
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Remove caches antigos
                    }
                })
            );
        })
    );
});

// Evento fetch
self.addEventListener('fetch', event => {
    // Lista de hostnames permitidos
    const HOSTNAME_WHITELIST = [
        self.location.hostname,
        'fonts.gstatic.com',
        'fonts.googleapis.com',
        'cdn.jsdelivr.net'
    ];

    // Ignora alguns pedidos cross-origin
    if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
        const cached = caches.match(event.request);
        const fixedUrl = getFixedUrl(event.request);
        const fetched = fetch(fixedUrl, { cache: 'no-store' });
        const fetchedCopy = fetched.then(resp => resp.clone());

        event.respondWith(
            Promise.race([fetched.catch(_ => cached), cached])
                .then(resp => resp || fetched)
                .catch(_ => { /* eat any errors */ })
        );

        // Atualiza o cache com a versão obtida
        event.waitUntil(
            Promise.all([fetchedCopy, caches.open(CACHE_NAME)])
                .then(([response, cache]) => response.ok && cache.put(event.request, response))
                .catch(_ => { /* eat any errors */ })
        );
    }
});

// Função para corrigir URLs de requisições interceptadas
const getFixedUrl = (req) => {
    var now = Date.now();
    var url = new URL(req.url);

    // Corrige o protocolo da URL
    url.protocol = self.location.protocol;

    // Adiciona query para cache-busting
    if (url.hostname === self.location.hostname) {
        url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
    }
    return url.href;
}

