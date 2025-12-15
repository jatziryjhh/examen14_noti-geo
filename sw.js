const CACHE_NAME = 'only-cache-v1';

self.addEventListener('install', event => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>
            cache.addAll([
                './',
                './index.html',
                './app.js',
                './images/icons/192.png',
                './images/icons/512.png',
                './sw.js',
                './manifest.json'
            ])
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activado');
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => res || fetch(e.request))
    );
});