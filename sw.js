    const CACHE_NAME = 'veranstaltungsplan-cache-v1.2'; // Versionierung des Caches
    const urlsToCache = [
      '/', // Alias für index.html im Root
      'index.html',
      'manifest.json',
      // Externe Ressourcen (CDNs)
      '[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)',
      '[https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap)',
      // Statische Schriftart-Dateien (oft von Google Fonts über CSS geladen, aber das CSS selbst wird gecached)
      // Es ist schwierig, die genauen Font-URLs hier aufzulisten, da sie sich ändern können.
      // Das Caching der Google Fonts CSS-Datei oben ist meist ausreichend.
      // Wenn Sie lokale Schriftarten verwenden, fügen Sie deren Pfade hier hinzu.

      // Wichtige Icons (Beispielpfade, anpassen!)
      'icons/icon-192x192.png',
      'icons/icon-512x512.png'
      // Fügen Sie hier Pfade zu weiteren wichtigen Assets hinzu, die gecached werden sollen
    ];

    // Installation des Service Workers und Caching der App-Shell
    self.addEventListener('install', event => {
      console.log('[ServiceWorker] Install');
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'}))); // 'reload' um sicherzustellen, dass frische Kopien vom Netzwerk geholt werden beim Installieren
          })
          .catch(error => {
            console.error('[ServiceWorker] Caching failed:', error);
          })
      );
    });

    // Aktivierung des Service Workers und Bereinigung alter Caches
    self.addEventListener('activate', event => {
      console.log('[ServiceWorker] Activate');
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              if (cacheName !== CACHE_NAME) {
                console.log('[ServiceWorker] Removing old cache:', cacheName);
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
      return self.clients.claim(); // Sofortige Kontrolle über offene Clients
    });

    // Fetch-Ereignisse abfangen (Cache-First-Strategie für gecachte Assets)
    self.addEventListener('fetch', event => {
      // Nur GET-Requests behandeln
      if (event.request.method !== 'GET') {
        return;
      }

      // Strategie: Cache first, dann Netzwerk. Für alle Anfragen.
      event.respondWith(
        caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              // console.log('[ServiceWorker] Serving from cache:', event.request.url);
              return cachedResponse;
            }

            // console.log('[ServiceWorker] Fetching from network:', event.request.url);
            return fetch(event.request).then(
              networkResponse => {
                // Wenn die Anfrage erfolgreich war, klonen und cachen wir sie für zukünftige Offline-Nutzung.
                // Nur für bestimmte Ressourcentypen oder wenn es eine "wichtige" Ressource ist.
                // Vorsicht beim Cachen von allem, da der Cache schnell groß werden kann.
                if (networkResponse && networkResponse.status === 200 && urlsToCache.includes(event.request.url.replace(self.location.origin, ''))) {
                    // Nur explizit gelistete URLs oder URLs, die zum Ursprung passen und gecached werden sollen
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            // console.log('[ServiceWorker] Caching new resource:', event.request.url);
                            cache.put(event.request, responseToCache);
                        });
                }
                return networkResponse;
              }
            ).catch(error => {
              console.error('[ServiceWorker] Fetch failed; returning offline page if available or error:', error);
              // Hier könnte man eine generische Offline-Seite zurückgeben, falls die Anfrage fehlschlägt und nichts im Cache ist.
              // return caches.match('offline.html'); // Beispiel für eine Offline-Fallback-Seite
            });
          })
      );
    });
