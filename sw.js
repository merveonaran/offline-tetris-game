var CACHE_STATIC_NAME ='static -v1'

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
      caches.open(CACHE_STATIC_NAME)
        .then(function(cache) {
          console.log('[Service Worker] Precaching App Shell');
          cache.addAll([
            '/',
            '/index.html',
            '/app.js',
            '/style.css'

          ]);
        
         
        })
    )

  });
