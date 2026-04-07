const CACHE_NAME = 'dw-counter-v1';
const ASSETS = [
  '/DW-mantras-counter/index.html',
  '/DW-mantras-counter/counters/refuge-tree.html',
  '/DW-mantras-counter/counters/diamond-mind.html',
  '/DW-mantras-counter/counters/mandala-offering.html',
  '/DW-mantras-counter/counters/guruyoga.html',
  '/DW-mantras-counter/counters/amitabha.html',
  '/DW-mantras-counter/counters/chenrezig.html',
  '/DW-mantras-counter/counters/16-Karmapa.html',
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
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
