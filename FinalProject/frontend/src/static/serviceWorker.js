function log(...data) {
    console.log("SWv1.1", ...data);
}

// log("SW Script executing");

console.log("SW")


const STATIC_CACHE_NAME = 'bracketeer-static-v0';

self.addEventListener('install', event => {
    caches.delete(STATIC_CACHE_NAME);
    
    console.log("Installing service worker")
    log('install', event);

    const preCache = async function() {
        const cache = await caches.open(STATIC_CACHE_NAME);
        // separating out cache.addAll so that I can tell what resource is failing to 
        // be retrieved
        cache.add('/').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/offline').catch(err => {console.error("PreCache: Failed to fetch resource")});

        // CSS
        cache.add('/css/create-tournament-styles.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/created-tournaments.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/entered-tournaments.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/home-styles.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/join-tournament.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/join.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/match-lg.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/match-sm.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/matches.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/navbar.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/profile-styles.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/register-lg.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/register-sm.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/register.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/styles.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/css/tournaments.css').catch(err => {console.error("PreCache: Failed to fetch resource")});

        // FONTS
        cache.add('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap').catch(err => {console.error("PreCache: Failed to fetch resource")});
    
        // IMAGES
        cache.add('/images/bracket-example.png').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/images/default-avatar-example.jpg').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/images/logo-cropped.jpeg').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/images/logo-icon-transparent.png').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/images/logo-lg-cropped.jpeg').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/images/logo-lg.jpeg').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/images/logo.jpeg').catch(err => {console.error("PreCache: Failed to fetch resource")});


        // JAVASCRIPT

        cache.add('/js/common.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/create-tournament.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/created-tournaments.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/edit-tournament.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/entered-tournaments.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/join-tournament.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/join.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/landing.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/matches.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/navbar.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/profile.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('/js/tournaments.js').catch(err => {console.error("PreCache: Failed to fetch resource")});

        // EXTERNAL RESOURCES

        cache.add('https://unpkg.com/leaflet@1.9.1/dist/leaflet.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('https://unpkg.com/leaflet@1.9.1/dist/leaflet.js').catch(err => {console.error("PreCache: Failed to fetch resource")});
        cache.add('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css').catch(err => {console.error("PreCache: Failed to fetch resource")});
    }

    event.waitUntil(preCache());
});

self.addEventListener('activate', event => {
    log('activate', event);
    event.clients.claim();
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.filter(cacheName => {
                return cacheName.startsWith('bracketeer-') && cacheName != STATIC_CACHE_NAME;
            }).map(cacheName => {
                return caches.delete(cacheName);
            })
        );
    }));
});

self.addEventListener('fetch', event => {
    console.log(event.request.url);
    var requestUrl = new URL(event.request.url);
    //Treat API calls (to our API) differently
    if(requestUrl.origin === location.origin && requestUrl.pathname.startsWith('/api')) {
        //If we are here, we are intercepting a call to our API
        if(event.request.method === "GET") {
            //Only intercept (and cache) GET API requests
            event.respondWith(cacheSecond(event.request));
        }
    } else {
        //If we are here, this was not a call to our API
        event.respondWith(cacheSecond(event.request));
    }

});

async function cacheSecond(request) {
    let cache = await caches.open(STATIC_CACHE_NAME);

    try {
        // try the network first
        let response = await fetch(request)

        // store in cache
        cache.put(request, response.clone())

        return response;
    } catch {
        // network error occured
        // get from cache

        let cachedResponse = await cache.match(request);

        console.log(cachedResponse);

        if (cachedResponse) {
            // if we found a cached response return it
            console.log("SW: Cached response found")
            return cachedResponse;
        } else {
            // if no cached response was found, then return cached error page
            console.log("SW: Cached response not found, returning cached error page")
            let cachedErrorPage = cache.match("/offline");
            return cachedErrorPage
        }
    }
}


function cacheFirst(request) {
    return caches.match(request).then(response => {
        //Return a response if we have one cached. Otherwise, get from the network
        return response || fetchAndCache(request);
    }).catch(error => {
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
