// Service Worker for Batiyoun PWA
const CACHE_NAME = 'batiyoun-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icon',
  '/apple-icon',
  '/favicon.ico'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache when offline, handle errors gracefully
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // CRITICAL: Skip service worker entirely for Next.js internals and dev files
  const skipPaths = [
    '/_next/',           // Next.js static assets & chunks
    '/icons/',           // PWA icons that might not exist
    '/screenshots/',     // PWA screenshots
    '/_vercel/',         // Vercel internals
    '/api/',             // API routes should always hit server fresh
  ];
  
  const shouldSkipServiceWorker = skipPaths.some(path => url.pathname.includes(path));
  
  if (shouldSkipServiceWorker) {
    // Let the request pass through without any service worker intervention
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Try to fetch from network
        return fetch(event.request).catch((error) => {
          console.log('Fetch failed for:', event.request.url, error);
          // Return a basic offline response
          return new Response('Offline', { 
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});
