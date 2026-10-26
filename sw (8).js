// Precàrrega TOLERANT: si un fitxer no existeix, no s'impedeix la instal·lació (abans addAll fallava en bloc).
const V = 'pa-v17', TILES = 'pa-tiles', SHELL = ['./', 'index.html', 'config.js', 'manifest.json', 'privacy.html', 'icon-192.png', 'icon-512.png', 'favicon.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => Promise.allSettled(SHELL.map(u => c.add(u)))).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V && x !== TILES).map(x => caches.delete(x)))).then(() => clients.claim())));
const API = /nominatim|valhalla|routing\.openstreetmap|overpass|open-meteo|formspree|supabase/;
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || !/^https?:$/.test(u.protocol) || API.test(u.hostname) || r.headers.has('range')) return;
  const tile = /tile\.openstreetmap\.org/.test(u.hostname), name = tile ? TILES : V;
  const put = x => { if (x.ok || x.type === 'opaque') { const y = x.clone(); caches.open(name).then(async c => { await c.put(r, y); if (tile) { const k = await c.keys(); if (k.length > 400) await c.delete(k[0]); } }); } return x; };
  if (u.pathname.endsWith('reports.json')) return e.respondWith(fetch(r).then(put).catch(() => caches.match(r)));
  // una sola petició: serveix la còpia i la refresca en segon pla
  e.respondWith(caches.match(r).then(hit => { const net = fetch(r).then(put).catch(() => hit || (r.mode === 'navigate' ? caches.match('index.html') : Response.error())); return hit || net; }));
});
