# Palafrugell Accessible

Sube todos estos archivos a la raíz de tu repositorio (GitHub Pages). Necesita HTTPS.

## Antes de publicar
1. Edita `privacy.html`: cambia los `[CORREO]` / `[NOMBRE...]` por los tuyos.
2. Corrige el logo original: pone "Acessible" (falta una "c").
3. `reports.json`: cuando recibas un aviso por email y lo verifiques, añade una línea:
   `{"lat":41.9150,"lon":3.1630,"street":"Carrer X","type":"obras","date":"2026-10-23"}`
   Tipos: obras, bache, pendiente, estrecho, escalon. Esos puntos penalizan las rutas que pasan a <30 m.
4. Cuando cambies archivos, sube la versión en `sw.js` (`pa-v1` → `pa-v2`).

## Cómo evalúa las calles
Ruta con perfil silla de ruedas (Valhalla) → datos reales de OpenStreetMap (escaleras, superficie,
suavidad, aceras, bordillos, accesibilidad) + pendiente (Open-Meteo) + avisos de vecinos.
