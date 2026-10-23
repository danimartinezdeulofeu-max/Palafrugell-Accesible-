'use strict';
/* ---------- Textos nous ---------- */
Object.assign(T.ca, { pElec: "Cadira elèctrica / scooter", pStr: "Cotxet de nadó", tabP: "📌 Llocs útils", pHelp: "Mostra llocs útils a la zona del mapa que veus.", cWc: "🚻 Lavabos", cPk: "🅿️ Aparcament PMR", cBn: "🪑 Bancs", cWt: "🚰 Fonts", cPh: "💊 Farmàcies", cHl: "🏥 Salut", pShow: "Mostrar al mapa", pZoom: "Apropa una mica més el mapa.", pNone: "No s'ha trobat res aquí.", pFound: "{n} llocs trobats.", wcYes: "♿ Accessible", wcNo: "♿ No accessible", wcUnk: "♿ Accessibilitat desconeguda", fav: "⭐ Guardar destí", favSaved: "Destí guardat.", alt: "Ruta {n}", nav: "▶ Començar a caminar", navStop: "⏹ Aturar", voice: "🔊 Veu", navOff: "T'has desviat. Recalculant…", navArr: "Has arribat!", navAhead: "Compte, en {m} m: {x}", navNext: "En {m} m: ", navLeft: "Queden {d}", navWait: "Esperant el GPS…" });
Object.assign(T.es, { pElec: "Silla eléctrica / scooter", pStr: "Carrito de bebé", tabP: "📌 Lugares útiles", pHelp: "Muestra lugares útiles en la zona del mapa que ves.", cWc: "🚻 Aseos", cPk: "🅿️ Aparcamiento PMR", cBn: "🪑 Bancos", cWt: "🚰 Fuentes", cPh: "💊 Farmacias", cHl: "🏥 Salud", pShow: "Mostrar en el mapa", pZoom: "Acerca un poco más el mapa.", pNone: "No se ha encontrado nada aquí.", pFound: "{n} lugares encontrados.", wcYes: "♿ Accesible", wcNo: "♿ No accesible", wcUnk: "♿ Accesibilidad desconocida", fav: "⭐ Guardar destino", favSaved: "Destino guardado.", alt: "Ruta {n}", nav: "▶ Empezar a caminar", navStop: "⏹ Parar", voice: "🔊 Voz", navOff: "Te has desviado. Recalculando…", navArr: "¡Has llegado!", navAhead: "Cuidado, en {m} m: {x}", navNext: "En {m} m: ", navLeft: "Quedan {d}", navWait: "Esperando al GPS…" });
Object.assign(T.en, { pElec: "Power chair / scooter", pStr: "Stroller", tabP: "📌 Useful places", pHelp: "Shows useful places in the map area you see.", cWc: "🚻 Toilets", cPk: "🅿️ Disabled parking", cBn: "🪑 Benches", cWt: "🚰 Drinking water", cPh: "💊 Pharmacies", cHl: "🏥 Health", pShow: "Show on map", pZoom: "Zoom the map in a little.", pNone: "Nothing found here.", pFound: "{n} places found.", wcYes: "♿ Accessible", wcNo: "♿ Not accessible", wcUnk: "♿ Accessibility unknown", fav: "⭐ Save destination", favSaved: "Destination saved.", alt: "Route {n}", nav: "▶ Start walking", navStop: "⏹ Stop", voice: "🔊 Voice", navOff: "You went off route. Recalculating…", navArr: "You have arrived!", navAhead: "Careful, in {m} m: {x}", navNext: "In {m} m: ", navLeft: "{d} left", navWait: "Waiting for GPS…" });
Object.assign(T.fr, { pElec: "Fauteuil électrique / scooter", pStr: "Poussette", tabP: "📌 Lieux utiles", pHelp: "Affiche les lieux utiles de la zone de carte visible.", cWc: "🚻 Toilettes", cPk: "🅿️ Parking PMR", cBn: "🪑 Bancs", cWt: "🚰 Fontaines", cPh: "💊 Pharmacies", cHl: "🏥 Santé", pShow: "Afficher sur la carte", pZoom: "Zoomez un peu plus.", pNone: "Rien trouvé ici.", pFound: "{n} lieux trouvés.", wcYes: "♿ Accessible", wcNo: "♿ Non accessible", wcUnk: "♿ Accessibilité inconnue", fav: "⭐ Enregistrer", favSaved: "Destination enregistrée.", alt: "Itinéraire {n}", nav: "▶ Commencer à marcher", navStop: "⏹ Arrêter", voice: "🔊 Voix", navOff: "Vous vous êtes écarté. Recalcul…", navArr: "Vous êtes arrivé !", navAhead: "Attention, dans {m} m : {x}", navNext: "Dans {m} m : ", navLeft: "Reste {d}", navWait: "En attente du GPS…" });

const LS = (k, d) => { try { return JSON.parse(store.get(k)) || d; } catch (e) { return d; } };
const save = (k, v) => store.set(k, JSON.stringify(v));
const opq = async q => { const r = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: new URLSearchParams({ data: q }) }); if (!r.ok) throw 0; return (await r.json()).elements; };

/* ---------- Favorits i recents (només al teu dispositiu) ---------- */
let favs = LS('favs', []), recs = LS('recs', []);
function chips() {
  const c = $('#chips'); c.innerHTML = '';
  const mk = (p, ic, fav) => {
    const w = document.createElement('span'); w.className = 'chip';
    const b = document.createElement('button'); b.textContent = ic + ' ' + p.name; b.onclick = () => { $('#to').value = p.name; $('#to').dataset.p = JSON.stringify(p); }; w.append(b);
    if (fav) { const x = document.createElement('button'); x.textContent = '✕'; x.setAttribute('aria-label', '✕ ' + p.name); x.onclick = () => { favs = favs.filter(f => f.name !== p.name); save('favs', favs); chips(); }; w.append(x); }
    c.append(w);
  };
  favs.forEach(p => mk(p, '⭐', 1));
  recs.filter(r => !favs.some(f => f.name === r.name)).forEach(p => mk(p, '🕘'));
}
function remember(b) { recs = [b, ...recs.filter(r => r.name !== b.name)].slice(0, 4); save('recs', recs); chips(); }
$('#to').addEventListener('input', () => delete $('#to').dataset.p);
$('#btnFav').onclick = () => { const b = state.to; if (!b) return; if (!favs.some(f => f.name === b.name)) favs = [b, ...favs].slice(0, 8); save('favs', favs); chips(); setStatus(t('favSaved')); };

/* ---------- Llocs útils (OpenStreetMap) ---------- */
const CAT = {
  wc: ['nwr["amenity"="toilets"]', '🚻'], pk: ['nwr["amenity"="parking"]["capacity:disabled"];nwr["amenity"="parking_space"]["parking_space"="disabled"]', '🅿️'],
  bn: ['node["amenity"="bench"]', '🪑'], wt: ['node["amenity"="drinking_water"]', '🚰'], ph: ['nwr["amenity"="pharmacy"]', '💊'], hl: ['nwr["amenity"~"^(clinic|hospital|doctors)$"]', '🏥']
};
const catOf = g => g.amenity === 'toilets' ? 'wc' : /parking/.test(g.amenity) ? 'pk' : g.amenity === 'bench' ? 'bn' : g.amenity === 'drinking_water' ? 'wt' : g.amenity === 'pharmacy' ? 'ph' : 'hl';
const poiLayer = L.layerGroup().addTo(map);
$('#pShow').onclick = async () => {
  const st = $('#pStatus'); poiLayer.clearLayers();
  const sel = [...document.querySelectorAll('.poi:checked')].map(c => c.value); if (!sel.length) return;
  if (map.getZoom() < 15) { st.textContent = t('pZoom'); return; }
  const b = map.getBounds(), bb = [b.getSouth(), b.getWest(), b.getNorth(), b.getEast()].map(x => x.toFixed(5)).join(',');
  const q = '[out:json][timeout:25];(' + sel.map(k => CAT[k][0].split(';').map(s => s + `(${bb});`).join('')).join('') + ');out tags center 300;';
  st.textContent = '…';
  try {
    let n = 0;
    (await opq(q)).forEach(e => {
      const la = e.lat ?? (e.center && e.center.lat), lo = e.lon ?? (e.center && e.center.lon); if (la == null) return;
      const g = e.tags || {}, k = catOf(g), wc = g.wheelchair === 'yes' ? 'wcYes' : g.wheelchair === 'no' ? 'wcNo' : 'wcUnk';
      pin([la, lo], CAT[k][1]).bindPopup(`<b>${g.name || ''}</b>${g.name ? '<br>' : ''}${/^(wc|pk|ph|hl)$/.test(k) ? t(wc) : ''}`).addTo(poiLayer); n++;
    });
    st.textContent = n ? t('pFound').replace('{n}', n) : t('pNone');
  } catch (e) { st.textContent = t('errnet'); st.className = 'status err'; }
};

/* ---------- Navegació en directe ---------- */
let wid = null, wlock = null, warned = new Set(), off = 0, lastRe = 0;
const speak = s => { if (!$('#voice').checked || !window.speechSynthesis) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(s); u.lang = { ca: 'ca-ES', es: 'es-ES', en: 'en-US', fr: 'fr-FR' }[lang]; speechSynthesis.speak(u); };
function startNav() {
  if (!state.cur || !navigator.geolocation) return;
  $('#nav').hidden = false; $('#navTxt').textContent = t('navWait'); $('#navLeft').textContent = ''; $('#navWarn').textContent = ''; warned.clear(); off = 0;
  try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(l => wlock = l).catch(() => {}); } catch (e) {}
  wid = navigator.geolocation.watchPosition(onPos, () => { $('#navTxt').textContent = t('gpsdenied'); }, { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 });
  $('#btnNav').hidden = true; map.getContainer().scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function stopNav() {
  if (wid !== null) navigator.geolocation.clearWatch(wid); wid = null;
  if (wlock) { wlock.release().catch(() => {}); wlock = null; }
  $('#nav').hidden = true; if (state.cur) $('#btnNav').hidden = !navigator.geolocation;
  if (window.speechSynthesis) speechSynthesis.cancel();
}
function onPos(p) {
  const u = [p.coords.latitude, p.coords.longitude], { rt, cum, ev } = state.cur;
  state.gps = { lat: u[0], lon: u[1], name: t('myloc') };
  if (gpsDot) gpsDot.setLatLng(u); else gpsDot = L.circleMarker(u, { radius: 8, color: '#fff', fillColor: '#1565c0', fillOpacity: 1, weight: 3 }).addTo(map);
  map.panTo(u);
  if (hav(u, rt.pts[rt.pts.length - 1]) < 20) { $('#navTxt').textContent = t('navArr'); $('#navLeft').textContent = ''; speak(t('navArr')); navigator.geolocation.clearWatch(wid); wid = null; return; }
  let bj = 0, bd = 1e9; for (let j = 1; j < rt.pts.length; j++) { const d = dseg(u, rt.pts[j - 1], rt.pts[j]); if (d < bd) { bd = d; bj = j - 1; } }
  if (bd > 35) {
    off++;
    if (off >= 3 && Date.now() - lastRe > 20000) { lastRe = Date.now(); $('#navTxt').textContent = t('navOff'); speak(t('navOff')); run(state.gps, state.to, state.prof).then(startNav).catch(() => {}); }
    return;
  }
  off = 0;
  const left = Math.max(0, cum[cum.length - 1] - cum[bj]), m = rt.steps.find(s => s.i > bj);
  $('#navLeft').textContent = t('navLeft').replace('{d}', left >= 1000 ? (left / 1000).toFixed(1) + ' km' : Math.round(left) + ' m');
  if (m) { const d = cum[m.i] - cum[bj]; $('#navTxt').textContent = t('navNext').replace('{m}', Math.round(d)) + m.s; if (d < 40 && !warned.has('m' + m.i)) { warned.add('m' + m.i); speak(m.s); } }
  else $('#navTxt').textContent = t('navLeft').replace('{d}', left >= 1000 ? (left / 1000).toFixed(1) + ' km' : Math.round(left) + ' m');
  ev.issues.forEach((x, ix) => {
    const d = hav(u, x.p);
    if (d < 30 && !warned.has('h' + ix)) { warned.add('h' + ix); const msg = t('navAhead').replace('{m}', Math.round(d)).replace('{x}', t(x.key)); $('#navWarn').textContent = '⚠️ ' + msg; if (navigator.vibrate) navigator.vibrate(250); speak(msg); }
  });
}
$('#btnNav').onclick = startNav; $('#btnStop').onclick = stopNav;

/* ---------- Avisos en directe (Supabase, opcional) ---------- */
const SB = CFG.SUPABASE_URL && CFG.SUPABASE_KEY, SBH = { apikey: CFG.SUPABASE_KEY, Authorization: 'Bearer ' + CFG.SUPABASE_KEY };
if (SB) fetch(CFG.SUPABASE_URL + '/rest/v1/reports?status=eq.approved&select=lat,lon,street,type,created_at&order=created_at.desc&limit=500', { headers: SBH })
  .then(r => r.json()).then(a => (Array.isArray(a) ? a : []).forEach(r => {
    if (Date.now() - new Date(r.created_at) > 3.15e10) return; r.date = (r.created_at || '').slice(0, 10); reports.push(r);
    pin([r.lat, r.lon], '⚠️').bindPopup(`<b>${r.street || ''}</b><br>${t(RT[r.type] || 'iRep')}<br>${r.date}`).addTo(repLayer);
  })).catch(() => {});
async function sbInsert(f) {
  if (!SB) return; const lat = parseFloat(f.get('lat')), lon = parseFloat(f.get('lon')); if (isNaN(lat) || isNaN(lon)) return;
  await fetch(CFG.SUPABASE_URL + '/rest/v1/reports', { method: 'POST', headers: { ...SBH, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ lat, lon, street: f.get('calle'), type: f.get('problema'), note: f.get('nota') }) });
}

chips(); applyLang();
