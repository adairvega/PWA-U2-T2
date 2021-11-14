const CACHE_STATIC = "static_v1"
const CACHE_INMUTABLE = "inmutable_v1"

self.addEventListener('install', event => {

    console.log('SW Instalado');

    const cacheStatic = caches.open(CACHE_STATIC)
    .then( cache => {
        cache.addAll([
            './',
            './index.html',
            './manifest.json',
            './js/camera.js',
            './js/app.js',
            './img/icons/android-launchericon-48-48.png',
            './img/icons/android-launchericon-72-72.png',
            './img/icons/android-launchericon-96-96.png',
            './img/icons/android-launchericon-144-144.png',
            './img/icons/android-launchericon-192-192.png',
            './img/icons/android-launchericon-512-512.png',
        ])
    })

    const cacheInmutable = caches.open(CACHE_INMUTABLE)
    .then( cache => {
        cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
            'https://code.jquery.com/jquery-3.6.0.slim.js'
        ])
    })

    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]))
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
    );
});