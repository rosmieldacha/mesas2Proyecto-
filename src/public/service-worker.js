const CACHE_NAME = 'Accesorio';
const urlsToCache = [
  '/',
  '/img/accesorios.jpg',
  '/img/cliente.png',
  '/img/inicio.png',
  '/img/logo2.png',
  '/img/personal.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Caché abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(function(error) {
          console.error('Error en la solicitud:', error);
       
        });
      })
  );
});