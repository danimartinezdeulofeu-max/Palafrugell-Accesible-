'use strict';
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const store = { get: k => { try { return localStorage.getItem(k) } catch (e) { return null } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch (e) {} } };

/* ---------- Textos (afegir un idioma = copiar un bloc) ---------- */
const T = {
ca: { sub:"Rutes a peu sense barreres", tabR:"🗺️ Ruta", tabA:"⚠️ Avisar d'un perill", prof:"Com et mous?", pWheel:"Cadira de rodes", pWalk:"Caminant (gent gran, caminador)", from:"Des d'on?", fromPh:"Buit = la meva ubicació", gps:"📍 Jo", to:"On vols anar?", toPh:"Ex: Mercat, Plaça Nova, Ajuntament…", go:"Calcular ruta accessible", dist:"Distància", time:"Temps", slope:"Pendent màx.", issues:"Què hem trobat", steps:"Indicacions pas a pas", share:"🔗 Compartir ruta", disc:"Orientatiu: es calcula amb dades d'OpenStreetMap i una altimetria aproximada. Pot haver-hi obres o errors. Confirma sempre el camí a peu.", rHelp:"Toca el lloc exacte al mapa i omple el formulari. Revisem els avisos abans de publicar-los.", street:"Carrer", problem:"Quin problema hi ha?", o1:"🚧 Obres / vorera tallada", o2:"🕳️ Forat o rajoles trencades", o3:"⛰️ Pendent perillós", o4:"↔️ Vorera massa estreta", o5:"🪜 Escaló o vorada alta", note:"Detalls (opcional)", photo:"📸 Foto (opcional)", photoN:"Esborrem les dades de la foto (ubicació) abans d'enviar-la. Evita que surtin persones.", consent:"Accepto que s'enviï aquest avís tal com explica la", privLink:"Política de privacitat", send:"Enviar avís",
  searching:"Cercant el lloc…", locating:"Cercant la teva ubicació…", pick:"Tria el lloc:", noto:"Escriu on vols anar.", notfound:"No hem trobat aquest lloc a Palafrugell.", gpsdenied:"No podem accedir a la ubicació. Escriu el punt de sortida.", routing:"Calculant ruta…", analyzing:"Avaluant carrers, pendents i voreres…", errnet:"No hi ha connexió o el servei no respon. Torna-ho a provar.", myloc:"La meva ubicació", lOk:"Ruta adequada", lMid:"Amb precaució", lBad:"No recomanada", lUnk:"Dades limitades", conf:"Fiabilitat de les dades: {n}%", nodata:"No s'han pogut carregar les dades de carrers.", noiss:"No s'ha detectat cap obstacle amb les dades disponibles.", basic:"Ruta bàsica: no es pot garantir que eviti escales.", iSteps:"Escales", iSteep:"Pendent pronunciat", iSurf:"Paviment irregular o sense pavimentar", iKerb:"Vorada alta sense rebaix", iNoSw:"Carrer sense vorera", iNoWc:"Accés limitat per a cadira de rodes", iRep:"Avís d'un veí", copied:"Enllaç copiat", sent:"Avís enviat. Gràcies!", rerr:"No s'ha pogut enviar. Torna-ho a provar.", rPosSet:"✅ Lloc marcat al mapa.", rPosNone:"Toca el mapa per marcar el lloc exacte.", min:"min" },
es: { sub:"Rutas a pie sin barreras", tabR:"🗺️ Ruta", tabA:"⚠️ Avisar de un peligro", prof:"¿Cómo te desplazas?", pWheel:"Silla de ruedas", pWalk:"Caminando (mayores, andador)", from:"¿Desde dónde?", fromPh:"Vacío = mi ubicación", gps:"📍 Yo", to:"¿A dónde quieres ir?", toPh:"Ej: Mercado, Plaça Nova, Ayuntamiento…", go:"Calcular ruta accesible", dist:"Distancia", time:"Tiempo", slope:"Pendiente máx.", issues:"Qué hemos encontrado", steps:"Indicaciones paso a paso", share:"🔗 Compartir ruta", disc:"Orientativo: se calcula con datos de OpenStreetMap y una altimetría aproximada. Puede haber obras o errores. Confirma siempre el camino a pie.", rHelp:"Toca el lugar exacto en el mapa y rellena el formulario. Revisamos los avisos antes de publicarlos.", street:"Calle", problem:"¿Qué problema hay?", o1:"🚧 Obras / acera cortada", o2:"🕳️ Agujero o baldosas rotas", o3:"⛰️ Pendiente peligrosa", o4:"↔️ Acera demasiado estrecha", o5:"🪜 Escalón o bordillo alto", note:"Detalles (opcional)", photo:"📸 Foto (opcional)", photoN:"Borramos los datos de la foto (ubicación) antes de enviarla. Evita que salgan personas.", consent:"Acepto que se envíe este aviso como explica la", privLink:"Política de privacidad", send:"Enviar aviso",
  searching:"Buscando el lugar…", locating:"Buscando tu ubicación…", pick:"Elige el lugar:", noto:"Escribe a dónde quieres ir.", notfound:"No hemos encontrado ese lugar en Palafrugell.", gpsdenied:"No podemos acceder a la ubicación. Escribe el punto de salida.", routing:"Calculando ruta…", analyzing:"Evaluando calles, pendientes y aceras…", errnet:"Sin conexión o el servicio no responde. Inténtalo de nuevo.", myloc:"Mi ubicación", lOk:"Ruta adecuada", lMid:"Con precaución", lBad:"No recomendada", lUnk:"Datos limitados", conf:"Fiabilidad de los datos: {n}%", nodata:"No se pudieron cargar los datos de calles.", noiss:"No se ha detectado ningún obstáculo con los datos disponibles.", basic:"Ruta básica: no se garantiza que evite escaleras.", iSteps:"Escaleras", iSteep:"Pendiente pronunciada", iSurf:"Pavimento irregular o sin pavimentar", iKerb:"Bordillo alto sin rebaje", iNoSw:"Calle sin acera", iNoWc:"Acceso limitado para silla de ruedas", iRep:"Aviso de un vecino", copied:"Enlace copiado", sent:"Aviso enviado. ¡Gracias!", rerr:"No se pudo enviar. Inténtalo de nuevo.", rPosSet:"✅ Lugar marcado en el mapa.", rPosNone:"Toca el mapa para marcar el lugar exacto.", min:"min" },
en: { sub:"Barrier-free walking routes", tabR:"🗺️ Route", tabA:"⚠️ Report a hazard", prof:"How do you get around?", pWheel:"Wheelchair", pWalk:"On foot (older adults, walker)", from:"From where?", fromPh:"Empty = my location", gps:"📍 Me", to:"Where to?", toPh:"E.g. Market, Plaça Nova, Town hall…", go:"Find accessible route", dist:"Distance", time:"Time", slope:"Max. slope", issues:"What we found", steps:"Step-by-step directions", share:"🔗 Share route", disc:"Indicative only: based on OpenStreetMap data and approximate elevation. Roadworks or errors are possible. Always check the way on site.", rHelp:"Tap the exact spot on the map and fill in the form. We review reports before publishing them.", street:"Street", problem:"What is the problem?", o1:"🚧 Roadworks / blocked sidewalk", o2:"🕳️ Hole or broken tiles", o3:"⛰️ Dangerous slope", o4:"↔️ Sidewalk too narrow", o5:"🪜 Step or high kerb", note:"Details (optional)", photo:"📸 Photo (optional)", photoN:"We remove the photo's metadata (location) before sending. Avoid people in the picture.", consent:"I agree to send this report as explained in the", privLink:"Privacy policy", send:"Send report",
  searching:"Searching for the place…", locating:"Finding your location…", pick:"Choose the place:", noto:"Type where you want to go.", notfound:"We could not find that place in Palafrugell.", gpsdenied:"We cannot access your location. Type the starting point.", routing:"Calculating route…", analyzing:"Assessing streets, slopes and sidewalks…", errnet:"No connection or the service is not responding. Try again.", myloc:"My location", lOk:"Suitable route", lMid:"Use caution", lBad:"Not recommended", lUnk:"Limited data", conf:"Data reliability: {n}%", nodata:"Street data could not be loaded.", noiss:"No obstacles detected with the available data.", basic:"Basic route: avoiding stairs cannot be guaranteed.", iSteps:"Stairs", iSteep:"Steep slope", iSurf:"Rough or unpaved surface", iKerb:"High kerb without ramp", iNoSw:"Street without sidewalk", iNoWc:"Limited wheelchair access", iRep:"Neighbour report", copied:"Link copied", sent:"Report sent. Thank you!", rerr:"Could not send. Please try again.", rPosSet:"✅ Spot marked on the map.", rPosNone:"Tap the map to mark the exact spot.", min:"min" },
fr: { sub:"Itinéraires piétons sans obstacles", tabR:"🗺️ Itinéraire", tabA:"⚠️ Signaler un danger", prof:"Comment vous déplacez-vous ?", pWheel:"Fauteuil roulant", pWalk:"À pied (seniors, déambulateur)", from:"Départ ?", fromPh:"Vide = ma position", gps:"📍 Moi", to:"Où allez-vous ?", toPh:"Ex : Marché, Plaça Nova, Mairie…", go:"Calculer l'itinéraire accessible", dist:"Distance", time:"Durée", slope:"Pente max.", issues:"Ce que nous avons trouvé", steps:"Indications pas à pas", share:"🔗 Partager", disc:"Indicatif : basé sur OpenStreetMap et une altimétrie approximative. Travaux ou erreurs possibles. Vérifiez toujours sur place.", rHelp:"Touchez l'endroit exact sur la carte et remplissez le formulaire. Nous vérifions les signalements avant publication.", street:"Rue", problem:"Quel est le problème ?", o1:"🚧 Travaux / trottoir barré", o2:"🕳️ Trou ou dalles cassées", o3:"⛰️ Pente dangereuse", o4:"↔️ Trottoir trop étroit", o5:"🪜 Marche ou bordure haute", note:"Détails (facultatif)", photo:"📸 Photo (facultatif)", photoN:"Nous supprimons les métadonnées (position) de la photo avant l'envoi. Évitez les personnes.", consent:"J'accepte l'envoi de ce signalement selon la", privLink:"Politique de confidentialité", send:"Envoyer",
  searching:"Recherche du lieu…", locating:"Recherche de votre position…", pick:"Choisissez le lieu :", noto:"Indiquez où vous allez.", notfound:"Lieu introuvable à Palafrugell.", gpsdenied:"Position inaccessible. Indiquez le départ.", routing:"Calcul de l'itinéraire…", analyzing:"Évaluation des rues, pentes et trottoirs…", errnet:"Pas de connexion ou service indisponible. Réessayez.", myloc:"Ma position", lOk:"Itinéraire adapté", lMid:"Prudence", lBad:"Déconseillé", lUnk:"Données limitées", conf:"Fiabilité des données : {n} %", nodata:"Données de rues indisponibles.", noiss:"Aucun obstacle détecté avec les données disponibles.", basic:"Itinéraire basique : escaliers non exclus.", iSteps:"Escaliers", iSteep:"Pente forte", iSurf:"Sol irrégulier ou non revêtu", iKerb:"Bordure haute sans rampe", iNoSw:"Rue sans trottoir", iNoWc:"Accès limité en fauteuil", iRep:"Signalement d'un voisin", copied:"Lien copié", sent:"Signalement envoyé. Merci !", rerr:"Échec de l'envoi. Réessayez.", rPosSet:"✅ Lieu marqué sur la carte.", rPosNone:"Touchez la carte pour marquer le lieu exact.", min:"min" }
};
let lang = store.get('lang') || (navigator.language || 'ca').slice(0, 2);
if (!T[lang]) lang = 'en';
const t = k => (T[lang] && T[lang][k]) || T.en[k] || k;
function applyLang() {
  document.documentElement.lang = lang; $('#lang').value = lang;
  $$('[data-i]').forEach(e => e.textContent = t(e.dataset.i));
  $$('[data-ph]').forEach(e => e.placeholder = t(e.dataset.ph));
  store.set('lang', lang);
}
$('#lang').onchange = e => { lang = e.target.value; applyLang(); };

/* ---------- Mida de lletra (gent gran) ---------- */
let fs = +store.get('fs') || 18;
const setFs = n => { fs = Math.max(15, Math.min(28, n)); document.documentElement.style.setProperty('--fs', fs + 'px'); store.set('fs', fs); };
$('#fPlus').onclick = () => setFs(fs + 2); $('#fMinus').onclick = () => setFs(fs - 2); setFs(fs);

/* ---------- Mapa ---------- */
const map = L.map('mapa').setView([41.9148, 3.1632], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
const routeLayer = L.layerGroup().addTo(map), repLayer = L.layerGroup().addTo(map);
let state = { gps: null, from: null, to: null, prof: 'wheel' }, reports = [], repPin = null, gpsDot = null;
const RT = { obras: 'o1', bache: 'o2', pendiente: 'o3', estrecho: 'o4', escalon: 'o5' };
const pin = (ll, e, title) => L.marker(ll, { icon: L.divIcon({ className: '', html: `<span class="pin" aria-hidden="true">${e}</span>`, iconSize: [26, 26], iconAnchor: [13, 13] }), title: title || '' });

fetch('reports.json', { cache: 'no-cache' }).then(r => r.json()).then(a => {
  reports = Array.isArray(a) ? a : [];
  reports.forEach(r => pin([r.lat, r.lon], '⚠️').bindPopup(`<b>${r.street || ''}</b><br>${t(RT[r.type] || 'iRep')}${r.date ? '<br>' + r.date : ''}`).addTo(repLayer));
}).catch(() => {});

/* ---------- Pestanyes ---------- */
function tab(a) {
  $('#tabR').setAttribute('aria-selected', a ? 'false' : 'true'); $('#tabA').setAttribute('aria-selected', a ? 'true' : 'false');
  $('#pR').hidden = a; $('#pA').hidden = !a;
  if (a && !$('#rLat').value) $('#rPos').textContent = t('rPosNone');
}
$('#tabR').onclick = () => tab(false); $('#tabA').onclick = () => tab(true);
map.on('click', e => { if ($('#tabA').getAttribute('aria-selected') === 'true') setRep(e.latlng.lat, e.latlng.lng); });
function setRep(la, lo) {
  $('#rLat').value = la.toFixed(6); $('#rLon').value = lo.toFixed(6);
  if (repPin) map.removeLayer(repPin);
  repPin = L.circleMarker([la, lo], { radius: 10, color: '#b86e00', fillColor: '#e9a21f', fillOpacity: .9 }).addTo(map);
  $('#rPos').textContent = t('rPosSet');
}

/* ---------- Estat i missatges ---------- */
const setStatus = (m, bad) => { const s = $('#status'); s.textContent = m || ''; s.className = 'status' + (bad ? ' err' : ''); };

/* ---------- Ubicació (només quan l'usuari ho demana) ---------- */
function gps() {
  return new Promise((ok, ko) => {
    if (!navigator.geolocation) return ko('gpsdenied');
    setStatus(t('locating'));
    navigator.geolocation.getCurrentPosition(p => {
      state.gps = { lat: p.coords.latitude, lon: p.coords.longitude, name: t('myloc') };
      $('#from').value = t('myloc'); $('#from').dataset.gps = 1; setStatus('');
      if (gpsDot) map.removeLayer(gpsDot);
      gpsDot = L.circleMarker([state.gps.lat, state.gps.lon], { radius: 8, color: '#fff', fillColor: '#1565c0', fillOpacity: 1, weight: 3 }).addTo(map);
      ok(state.gps);
    }, () => ko('gpsdenied'), { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 });
  });
}
$('#from').addEventListener('input', () => delete $('#from').dataset.gps);
$('#btnGps').onclick = () => gps().then(p => map.setView([p.lat, p.lon], 17)).catch(e => setStatus(t(e), 1));

/* ---------- Cerca de llocs (Nominatim, només l'entorn de Palafrugell) ---------- */
async function geocode(q) {
  const r = await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&accept-language=' + lang + '&viewbox=3.10,41.95,3.25,41.88&bounded=1&q=' + encodeURIComponent(q));
  if (!r.ok) throw 'errnet';
  return (await r.json()).map(x => ({ name: x.display_name.split(',').slice(0, 2).join(','), lat: +x.lat, lon: +x.lon }));
}
function choose(list) {
  return new Promise(res => {
    if (list.length === 1) return res(list[0]);
    const ul = $('#sugg'); ul.innerHTML = ''; setStatus(t('pick'));
    list.forEach(p => { const li = document.createElement('li'), b = document.createElement('button'); b.textContent = '📍 ' + p.name; b.onclick = () => { ul.innerHTML = ''; setStatus(''); res(p); }; li.append(b); ul.append(li); });
    ul.querySelector('button').focus();
  });
}
async function resolve(id) {
  const el = $('#' + id), q = el.value.trim(), m = q.match(/^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/);
  if (m) return { lat: +m[1], lon: +m[2], name: q };
  if (id === 'from') { if (el.dataset.gps && state.gps) return state.gps; if (!q) return state.gps || gps(); }
  if (!q) throw 'noto';
  setStatus(t('searching'));
  const l = await geocode(q); if (!l.length) throw 'notfound';
  return choose(l);
}
$('#btnGo').onclick = async () => {
  $('#sugg').innerHTML = ''; setStatus('');
  try { const a = await resolve('from'), b = await resolve('to'); await run(a, b, $('#prof').value); }
  catch (e) { setStatus(t(typeof e === 'string' ? e : 'errnet'), 1); }
};
$('#to').addEventListener('keydown', e => { if (e.key === 'Enter') $('#btnGo').click(); });

/* ---------- Geometria ---------- */
const R = 6371000, rad = Math.PI / 180;
const hav = (a, b) => { const x = Math.sin((b[0] - a[0]) * rad / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin((b[1] - a[1]) * rad / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
function dseg(p, a, b) {
  const k = Math.cos(p[0] * rad), px = p[1] * k, py = p[0], ax = a[1] * k, ay = a[0], dx = b[1] * k - ax, dy = b[0] - ay;
  let u = dx || dy ? ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy) : 0; u = Math.max(0, Math.min(1, u));
  return Math.hypot(px - ax - u * dx, py - ay - u * dy) * 111320;
}
function resample(p, st) {
  const o = [p[0]]; let acc = 0;
  for (let i = 1; i < p.length; i++) {
    let a = p[i - 1], b = p[i], d = hav(a, b);
    while (acc + d >= st) { const f = (st - acc) / d; a = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]; o.push(a); d = hav(a, b); acc = 0; }
    acc += d;
  }
  if (hav(o[o.length - 1], p[p.length - 1]) > 5) o.push(p[p.length - 1]);
  return o;
}
function dec6(s) { let i = 0, la = 0, lo = 0; const o = []; while (i < s.length) { for (const k of [0, 1]) { let r = 0, sh = 0, b; do { b = s.charCodeAt(i++) - 63; r |= (b & 31) << sh; sh += 5; } while (b >= 32); const d = r & 1 ? ~(r >> 1) : r >> 1; k ? lo += d : la += d; } o.push([la / 1e6, lo / 1e6]); } return o; }

/* ---------- Ruta (Valhalla perfil cadira de rodes; OSRM a peu com a reserva) ---------- */
async function getRoute(a, b, prof) {
  const co = prof === 'wheel' ? { type: 'wheelchair' } : { type: 'foot', step_penalty: 300, walking_speed: 3.5 };
  const body = { locations: [{ lat: a.lat, lon: a.lon }, { lat: b.lat, lon: b.lon }], costing: 'pedestrian', costing_options: { pedestrian: co }, directions_options: { language: { ca: 'ca-ES', es: 'es-ES', en: 'en-US', fr: 'fr-FR' }[lang], units: 'kilometers' } };
  try {
    const r = await fetch('https://valhalla1.openstreetmap.de/route?json=' + encodeURIComponent(JSON.stringify(body)));
    if (!r.ok) throw 0; const j = await r.json(), leg = j.trip.legs[0];
    return { pts: dec6(leg.shape), dist: j.trip.summary.length * 1000, steps: leg.maneuvers.map(m => ({ s: m.instruction, d: m.length * 1000 })), basic: false };
  } catch (e) {
    const r = await fetch(`https://routing.openstreetmap.de/routed-foot/route/v1/foot/${a.lon},${a.lat};${b.lon},${b.lat}?overview=full&geometries=geojson`);
    if (!r.ok) throw 'errnet'; const rt = (await r.json()).routes[0];
    return { pts: rt.geometry.coordinates.map(c => [c[1], c[0]]), dist: rt.distance, steps: [], basic: true };
  }
}

/* ---------- Dades reals per avaluar (OpenStreetMap + altimetria) ---------- */
async function overpass(pts) {
  const la = pts.map(p => p[0]), lo = pts.map(p => p[1]), m = .0004;
  const bb = [Math.min(...la) - m, Math.min(...lo) - m, Math.max(...la) + m, Math.max(...lo) + m].join(',');
  const q = `[out:json][timeout:25];(way["highway"](${bb});node["kerb"](${bb}););out tags geom;`;
  const r = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: new URLSearchParams({ data: q }) });
  if (!r.ok) throw 0; const els = (await r.json()).elements;
  return { ways: els.filter(e => e.type === 'way' && e.geometry).map(e => ({ tags: e.tags || {}, g: e.geometry.map(p => [p.lat, p.lon]) })), kerbs: els.filter(e => e.type === 'node' && e.tags && e.tags.kerb).map(e => ({ p: [e.lat, e.lon], k: e.tags.kerb })) };
}
async function elev(pts) {
  const r = await fetch('https://api.open-meteo.com/v1/elevation?latitude=' + pts.map(p => p[0].toFixed(5)).join(',') + '&longitude=' + pts.map(p => p[1].toFixed(5)).join(','));
  if (!r.ok) throw 0; return (await r.json()).elevation;
}
const SURF = { cobblestone: 30, sett: 30, unhewn_cobblestone: 45, gravel: 40, fine_gravel: 30, pebblestone: 40, dirt: 45, ground: 45, earth: 45, sand: 50, grass: 45, mud: 60, unpaved: 35, compacted: 10 };
const SMOOTH = { intermediate: 10, bad: 30, very_bad: 60, horrible: 60, very_horrible: 60, impassable: 60 };
const ROAD = /^(residential|tertiary|secondary|primary|unclassified|service|living_street|trunk|road)(_link)?$/;
const EMO = { iSteps: '🪜', iSteep: '⛰️', iSurf: '🪨', iKerb: '🟧', iNoSw: '🚧', iNoWc: '♿', iRep: '⚠️' };

function evaluate(pts, osm, el, k) {
  const n = pts.length, scores = [], issues = []; let known = 0, maxG = 0;
  const add = (key, p, hard, extra) => { if (!issues.some(x => x.key === key && hav(x.p, p) < 60)) issues.push({ key, p, hard, extra }); };
  pts.forEach((p, i) => {
    let pen = 0, ok = false, g = 0;
    if (el) { const sg = Math.min(Math.floor(i / k), el.idx.length - 2), a = pts[el.idx[sg]], b = pts[el.idx[sg + 1]], d = hav(a, b); g = d > 20 ? Math.abs(el.z[sg + 1] - el.z[sg]) / d * 100 : 0; }
    if (osm) {
      let best = null, bd = 1e9;
      for (const w of osm.ways) { for (let j = 1; j < w.g.length; j++) { let d = dseg(p, w.g[j - 1], w.g[j]); if (/footway|pedestrian|path/.test(w.tags.highway)) d -= 4; if (d < bd) { bd = d; best = w; } } }
      if (best && bd <= 22) {
        const tg = best.tags, h = tg.highway;
        if (h === 'steps') { pen += 100; add('iSteps', p, 1); }
        if (tg.wheelchair === 'no') { pen += 80; add('iNoWc', p, 1); } else if (tg.wheelchair === 'limited') { pen += 35; add('iNoWc', p, 0); }
        const sv = SURF[tg.surface] || 0, mv = SMOOTH[tg.smoothness] || 0;
        if (sv >= 30 || mv >= 30) { pen += Math.max(sv, mv); add('iSurf', p, Math.max(sv, mv) >= 60); } else pen += sv + mv;
        const sw = tg.sidewalk || tg['sidewalk:both'];
        if (ROAD.test(h) && (['no', 'none'].includes(sw) || (tg['sidewalk:left'] === 'no' && tg['sidewalk:right'] === 'no'))) { pen += 25; add('iNoSw', p, 0); }
        const gi = parseFloat(tg.incline); if (!isNaN(gi) && /%/.test(tg.incline)) g = Math.max(g, Math.abs(gi));
        ok = !!(tg.surface || tg.smoothness || tg.wheelchair || tg.incline || sw || /footway|pedestrian|steps|path|cycleway/.test(h));
      }
      for (const c of osm.kerbs) if (c.k === 'raised' && hav(c.p, p) < 12) { pen += 30; add('iKerb', p, 0); break; }
    }
    if (g > 12) { pen += 70; add('iSteep', p, 1, ' (' + Math.round(g) + '%)'); } else if (g > 8) { pen += 45; add('iSteep', p, 0, ' (' + Math.round(g) + '%)'); } else if (g > 5) { pen += 20; add('iSteep', p, 0, ' (' + Math.round(g) + '%)'); } else if (g > 3) pen += 5;
    maxG = Math.max(maxG, g);
    for (const r of reports) if (hav([r.lat, r.lon], p) < 30) { pen += 40; add('iRep', p, 0, ': ' + t(RT[r.type] || 'iRep').replace(/^\S+\s/, '')); break; }
    if (ok) known++; scores.push(Math.max(0, 100 - pen));
  });
  const mean = scores.reduce((a, b) => a + b, 0) / n, bar = issues.filter(x => x.hard).length;
  const score = Math.round(bar ? Math.min(mean, Math.max(10, 45 - 5 * bar)) : mean);
  return { scores, issues, score, maxG, conf: osm ? Math.round(known / n * 100) : 0 };
}

/* ---------- Procés complet ---------- */
async function run(a, b, prof) {
  state.from = a; state.to = b; state.prof = prof; $('#res').hidden = true; routeLayer.clearLayers();
  setStatus(t('routing'));
  const rt = await getRoute(a, b, prof), pts = resample(rt.pts, 30), n = pts.length;
  setStatus(t('analyzing'));
  const k = Math.max(2, Math.ceil(n / 99)), idx = []; for (let i = 0; i < n; i += k) idx.push(i); if (idx[idx.length - 1] !== n - 1) idx.push(n - 1);
  const [osm, z] = await Promise.all([overpass(rt.pts).catch(() => null), elev(idx.map(i => pts[i])).then(z => ({ idx, z })).catch(() => null)]);
  const ev = evaluate(pts, osm, z, k);
  L.polyline(rt.pts, { color: '#fff', weight: 12, opacity: .95 }).addTo(routeLayer);
  for (let i = 0; i < n - 1; i++) L.polyline([pts[i], pts[i + 1]], { color: ev.scores[i] >= 80 ? '#2f8a3d' : ev.scores[i] >= 55 ? '#e29a00' : '#b3261e', weight: 7, lineCap: 'butt' }).addTo(routeLayer);
  L.circleMarker(rt.pts[0], { radius: 9, color: '#fff', fillColor: '#2f8a3d', fillOpacity: 1, weight: 3 }).addTo(routeLayer);
  L.circleMarker(rt.pts[rt.pts.length - 1], { radius: 9, color: '#fff', fillColor: '#17365d', fillOpacity: 1, weight: 3 }).bindPopup(b.name).addTo(routeLayer);
  ev.issues.slice(0, 15).forEach(x => pin(x.p, EMO[x.key], t(x.key)).bindPopup(t(x.key) + (x.extra || '')).addTo(routeLayer));
  map.fitBounds(L.polyline(rt.pts).getBounds(), { padding: [30, 30] });
  const cls = ev.score < 55 ? 'bad' : ev.conf < 35 ? 'unk' : ev.score >= 80 ? 'ok' : 'mid';
  $('#res').className = cls;
  $('#score').textContent = ev.score + '/100';
  $('#label').textContent = { ok: '✅ ' + t('lOk'), mid: '⚠️ ' + t('lMid'), bad: '⛔ ' + t('lBad'), unk: '❔ ' + t('lUnk') }[cls];
  $('#conf').textContent = t('conf').replace('{n}', ev.conf) + (osm ? '' : ' · ' + t('nodata'));
  $('#dist').textContent = rt.dist >= 1000 ? (rt.dist / 1000).toFixed(1) + ' km' : Math.round(rt.dist) + ' m';
  $('#time').textContent = Math.max(1, Math.round(rt.dist / (prof === 'wheel' ? 1 : .8) / 60)) + ' ' + t('min');
  $('#maxg').textContent = z ? Math.round(ev.maxG) + '%' : '—';
  const ul = $('#issues'); ul.innerHTML = '';
  (ev.issues.length ? ev.issues : [{ none: 1 }]).forEach(x => { const li = document.createElement('li'); li.textContent = x.none ? t('noiss') : EMO[x.key] + ' ' + t(x.key) + (x.extra || ''); ul.append(li); });
  const ol = $('#steps'); ol.innerHTML = '';
  (rt.basic ? [{ s: t('basic'), d: 0 }] : rt.steps).forEach(s => { const li = document.createElement('li'); li.textContent = s.s + (s.d >= 10 ? ' (' + Math.round(s.d) + ' m)' : ''); ol.append(li); });
  $('#res').hidden = false; setStatus(''); $('#res').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ---------- Compartir ---------- */
$('#btnShare').onclick = async () => {
  const f = state.from, d = state.to, u = location.origin + location.pathname + `#r=${f.lat.toFixed(5)},${f.lon.toFixed(5)},${d.lat.toFixed(5)},${d.lon.toFixed(5)},${state.prof}`;
  try { if (navigator.share) await navigator.share({ title: 'Palafrugell Accessible', url: u }); else { await navigator.clipboard.writeText(u); setStatus(t('copied')); } } catch (e) {}
};
function fromHash() {
  const m = location.hash.match(/^#r=(-?[\d.]+),(-?[\d.]+),(-?[\d.]+),(-?[\d.]+),(wheel|walk)$/); if (!m) return;
  const a = { lat: +m[1], lon: +m[2], name: m[1] + ', ' + m[2] }, b = { lat: +m[3], lon: +m[4], name: m[3] + ', ' + m[4] };
  $('#from').value = a.name; $('#to').value = b.name; $('#prof').value = m[5];
  run(a, b, m[5]).catch(e => setStatus(t(typeof e === 'string' ? e : 'errnet'), 1));
}

/* ---------- Enviar avís (foto sense metadades, camp trampa anti-spam) ---------- */
async function strip(file) {
  const b = await createImageBitmap(file), s = Math.min(1, 1280 / Math.max(b.width, b.height)), c = document.createElement('canvas');
  c.width = Math.round(b.width * s); c.height = Math.round(b.height * s); c.getContext('2d').drawImage(b, 0, 0, c.width, c.height);
  return new Promise(r => c.toBlob(r, 'image/jpeg', .8));
}
$('#fr').addEventListener('submit', async e => {
  e.preventDefault(); const btn = $('#rSend'), st = $('#rStatus'); btn.disabled = true; st.className = 'status'; st.textContent = '…';
  try {
    const f = new FormData(e.target); f.append('idioma', lang);
    const file = $('#rPhoto').files[0]; if (file) f.append('foto', await strip(file), 'foto.jpg');
    const r = await fetch(e.target.action, { method: 'POST', body: f, headers: { Accept: 'application/json' } });
    if (!r.ok) throw 0;
    st.textContent = t('sent'); e.target.reset(); $('#rLat').value = ''; $('#rLon').value = ''; $('#rPos').textContent = t('rPosNone'); if (repPin) map.removeLayer(repPin);
  } catch (x) { st.className = 'status err'; st.textContent = t('rerr'); }
  btn.disabled = false;
});

applyLang(); fromHash();
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
