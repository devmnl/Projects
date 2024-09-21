
  import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
  precacheAndRoute([{"revision":"874b657f7148af98691dad1b3bd8f1dc","url":"aboutme.css"},{"revision":"6a2d20adacf5153dd8a3a84dd1bf1e31","url":"calcular-diametro.html"},{"revision":"14b9cb5f964c66774b8ee7efe6699850","url":"calcular-metragem.html"},{"revision":"efffaf09864adfeb6700abf562889665","url":"index.html"},{"revision":"4d0b7b9030aac4a81f414cddafc68e59","url":"pagina-de-avisos.html"},{"revision":"af5cd1b56e5853161916a4529f39b57d","url":"sobre-mim.html"},{"revision":"0ff3fff12de7f636f356b5a9bb7b0f0b","url":"style-avisos.css"},{"revision":"4f74af2e3b0e881a4906bc79201e3eb7","url":"style-sentidos.css"},{"revision":"cde9070cc42316c57242755b100c92c4","url":"style.css"},{"revision":"3279e101c4400426b13078f24f533db1","url":"tabela-sentidos.html"},{"revision":"09dda91daebb44311515416c12bb4847","url":"vemax.css"},{"revision":"b92be6fe8fd36d54739bdd292e0f2024","url":"vemax.html"}]);
  import { precaching } from 'workbox-precaching';
  import { registerRoute } from 'workbox-routing';
  import { StaleWhileRevalidate } from 'workbox-strategies';
  
  precaching.precacheAndRoute(self.__WB_MANIFEST || []);
  
  // Adiciona uma rota para cache de recursos
  registerRoute(
    ({request}) => request.destination === 'image',
    new StaleWhileRevalidate()
  );