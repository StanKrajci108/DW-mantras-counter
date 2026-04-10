const CACHE_NAME = 'dw-counter-v3';
const ASSETS = [
  '/DW-mantras-counter/img/app_logo.png',
  '/DW-mantras-counter/img/diamondway-firewheel.png',
  '/DW-mantras-counter/img/Refuge.jpg',
  '/DW-mantras-counter/img/Diamond-mind.jpg',
  '/DW-mantras-counter/img/Mandala.jpg',
  '/DW-mantras-counter/img/Guruyoga.jpg',
  '/DW-mantras-counter/img/Amitabha.jpg',
  '/DW-mantras-counter/img/Chenrezig.jpg',
  '/DW-mantras-counter/img/16thKarmapa.jpg',
  '/DW-mantras-counter/counters/img-counters/Refuge.jpg',
  '/DW-mantras-counter/counters/img-counters/Diamond-mind.jpg',
  '/DW-mantras-counter/counters/img-counters/Mandala.jpg',
  '/DW-mantras-counter/counters/img-counters/Guruyoga.jpg',
  '/DW-mantras-counter/counters/img-counters/Amithaba.jpg',
  '/DW-mantras-counter/counters/img-counters/Chenrezig.jpg',
  '/DW-mantras-counter/counters/img-counters/16-Karmapa.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  }
});