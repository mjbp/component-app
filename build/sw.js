var CACHE_NAME = 'component-app';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Opened cache');
        return cache.addAll([
          'index.html'
        ]);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event);
  event.respondWith(fromCache(event.request));
  event.waitUntil(updateCache(event.request));
});

function fromCache(req){
  console.log('[Service Worker] From cache');
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.match(req).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function updateCache(req){
  console.log('[Service Worker] Updating cache');
  return caches.open(CACHE_NAME).then(function (cache) {
    return fetch(req).then(function (res) {
      return cache.put(req, res);
    });
  });
}