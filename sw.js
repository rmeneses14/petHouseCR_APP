// ─── Saiph SW — PetHouseCR ────────────────────────────────────────────────────
const CACHE_NAME = 'pethousecr-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Pacifico&display=swap',
];

// Instalar — pre-cachear assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activar — limpiar versiones viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache-first para assets, siempre red para Google Sheets y WhatsApp
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Sheets CSV → siempre red (datos en tiempo real)
  if (url.hostname.includes('docs.google.com') || url.hostname.includes('sheets.googleapis.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Externas dinámicas → siempre red
  if (url.hostname.includes('wa.me') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(fetch(event.request).catch(() => new Response('')));
    return;
  }

  // Assets estáticos → cache-first con actualización en background
  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
      return cached || network;
    })
  );
});
