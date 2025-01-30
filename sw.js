const CACHE_NAME = 'portfolio-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/scripts.js'
];

const ASSET_CACHE_NAME = 'portfolio-assets-v1';
const ASSET_URLS = [
  '/assets/img/profile.jpg',
  '/assets/img/android-chrome-192x192.png',
  '/assets/img/android-chrome-512x512.png',
  '/assets/img/apple-touch-icon.png',
  '/assets/img/favicon-16x16.png',
  '/assets/img/favicon-32x32.png',
  '/assets/img/favicon.ico',
  '/assets/img/site.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(ASSET_CACHE_NAME)
        .then(cache => cache.addAll(ASSET_URLS))
    ])
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Statik dosyalar için cache-first stratejisi
  if (STATIC_ASSETS.includes(url.pathname) || ASSET_URLS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
    return;
  }

  // Diğer istekler için network-first stratejisi
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});

// Eski cache'leri temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== ASSET_CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
}); 