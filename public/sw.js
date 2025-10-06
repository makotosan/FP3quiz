
const CACHE_NAME = 'fp3-quiz-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Note: In a real build, you'd add your JS/CSS bundles here.
  // The CDN for tailwind will be cached by the browser but not by the service worker by default.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
