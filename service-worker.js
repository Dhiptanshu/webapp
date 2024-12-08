// service-worker.js
const CACHE_NAME = 'threejs-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  '/manifest.json',
  'img2.png',
  'mobile_ss.png',
  'pc_ss.png'
   // if you have a manifest file for your app
];

// Install the service worker and cache necessary assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch assets from the cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});
