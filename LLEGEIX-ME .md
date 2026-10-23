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

## Avisos en vivo (Supabase, opcional)
1. Crea un proyecto gratis en supabase.com → SQL Editor → ejecuta:
```sql
create table reports(
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  lat double precision, lon double precision,
  street text, type text, note text,
  status text default 'pending');
alter table reports enable row level security;
create policy "ver aprobados" on reports for select using (status = 'approved');
create policy "enviar pendientes" on reports for insert with check (
  status = 'pending' and lat between 41.8 and 42.0 and lon between 3.0 and 3.3
  and type in ('obras','bache','pendiente','estrecho','escalon')
  and char_length(coalesce(note,'')) <= 400);
```
2. Settings → API: copia la *Project URL* y la clave *anon public* en `config.js`.
3. Moderar: Table Editor → tabla `reports` → cambia `status` de `pending` a `approved`
   (para borrar un aviso resuelto, cámbialo a `closed`). Solo los aprobados aparecen en el mapa.
La clave anon es pública por diseño; la seguridad la dan las políticas de arriba. Si activas esto,
añade Supabase a la tabla de servicios de `privacy.html`.
