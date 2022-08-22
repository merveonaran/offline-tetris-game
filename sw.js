var CACHE_STATIC_NAME ='static -v1'
var CACHE_DYNAMIC_NAME ='dynamic -v1'


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
            'style.css'
 
  
          ]);
        
        })
    )

  });


  
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
    .then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if(key!== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME){
          console.log('[Service Worker] removeing old cache ', key);
          return caches.delete(key);
        }
      }))
    })
  )
  return self.clients.claim();
});



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response){
      if(response){
        return response;
      }
    
    
      else{
       return fetch(event.request)
       .then(function(res){
        return caches.open(CACHE_DYNAMIC_NAME)
        .then(function(cache){
            cache.put(event.request.url, res.clone());
            return res;

        })
      
      })
    
      .catch(function(err){

      });


      }}))
  });
 

