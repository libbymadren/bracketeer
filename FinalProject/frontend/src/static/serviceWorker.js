function log(...data) {
console.log("SWv1.1", ...data);
}

log("SW Script executing");


const STATIC_CACHE_NAME = 'bracketeer-static-v0';

self.addEventListener('install', event => {
log('install', event);
event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
    return cache.addAll([
        '/',
        '/offline',
        //CSS
        '/css/styles.css',
        '/css/created-tournament-styles.css',
        '/css/entered-tournament-styles.css',
        '/css/home-styles.css',
        '/css/join-tournament.css',
        '/css/join.css',
        '/css/matches-lg.css',
        '/css/matches-sm.css',
        '/css/navbar.css',
        '/css/profile-styles.css',
        '/css/register-lg.css',
        '/css/register-sm.css',
        '/css/register.css',
        '/css/tournaments-lg.css',
        '/css/tournaments-sm.css',
        //Images
        '/img/bracket-example.png',
        '/img/default-avatar-example.jpg',
        '/img/logo-cropped.jpeg',
        '/img/logo-icon-transparent.png',
        '/img/logo-lg-cropped.jpeg',
        '/img/logo-lg.jpeg',
        '/img/logo.jpeg',
        //Scripts
        '/js/common.js',
        '/js/create-tournament.js',
        '/js/created-tournaments.js',
        '/js/edit-tournament.js',
        '/js/entered-tournaments.js',
        '/js/join-tournament.js',
        '/js/join.js',
        '/js/landing.js',
        '/js/login.js',
        '/js/logout.js',
        '/js/matches.js',
        '/js/navbar.js',
        '/js/profile.js',
        '/js/register.js',
        '/js/tournaments.js',
        //External Resources
        'https://unpkg.com/leaflet@1.9.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.9.1/dist/leaflet.js',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
    ]);
    })
);
});

self.addEventListener('activate', event => {
log('activate', event);
event.waitUntil(
    caches.keys().then(cacheNames => {
    return Promise.all(
        cacheNames.filter(cacheName => {
        return cacheName.startsWith('bracketeer-') && cacheName != STATIC_CACHE_NAME;
        }).map(cacheName => {
        return caches.delete(cacheName);
        })
    );
    })
);
});

self.addEventListener('fetch', event => {
var requestUrl = new URL(event.request.url);
//Treat API calls (to our API) differently
if(requestUrl.origin === location.origin && requestUrl.pathname.startsWith('/api')) {
    //If we are here, we are intercepting a call to our API
    if(event.request.method === "GET") {
    //Only intercept (and cache) GET API requests
    event.respondWith(
        cacheFirst(event.request)
    );
    }
}
else {
    //If we are here, this was not a call to our API
    event.respondWith(
    cacheFirst(event.request)
    );
}

});


function cacheFirst(request) {
return caches.match(request)
.then(response => {
    //Return a response if we have one cached. Otherwise, get from the network
    return response || fetchAndCache(request);
})
.catch(error => {
    return caches.match('/offline');
})
}



function fetchAndCache(request) {
return fetch(request).then(response => {
    if(response.ok) {
    caches.open(STATIC_CACHE_NAME).then((cache) => {
        cache.put(request, response);
    });
    }
    return response.clone();
});
}



self.addEventListener('message', event => {
log('message', event.data);
if(event.data.action === 'skipWaiting') {
    self.skipWaiting();
}
});