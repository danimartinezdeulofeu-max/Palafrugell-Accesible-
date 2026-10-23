const V = 'pa-v2', SHELL = ['./', 'index.html', 'app.js', 'config.js', 'features.js', 'manifest.json', 'privacy.html', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/favicon.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || /nominatim|valhalla|routing\.openstreetmap|overpass|open-meteo|formspree/.test(u.hostname)) return;
  const put = x => { if (x.ok || x.type === 'opaque') { const y = x.clone(); caches.open(V).then(c => c.put(r, y)); } return x; };
  if (u.pathname.endsWith('reports.json')) return e.respondWith(fetch(r).then(put).catch(() => caches.match(r)));
  e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(put)).catch(() => caches.match('index.html')));
  e.waitUntil(fetch(r).then(put).catch(() => {}));
});
