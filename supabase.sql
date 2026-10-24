-- Palafrugell Accessible · avisos en directe. Supabase → SQL Editor → pega tot això → Run.
create table if not exists reports(
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  lat double precision not null, lon double precision not null,
  street text, type text, note text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')));

alter table reports enable row level security;

-- El públic només veu els avisos que tu has aprovat
create policy "veure aprovats" on reports for select using (status = 'approved');

-- El públic només pot ENVIAR avisos nous, sempre «pendents», dins de Palafrugell i amb límits de mida
create policy "enviar avis" on reports for insert with check (
  status = 'pending'
  and lat between 41.85 and 41.98 and lon between 3.08 and 3.27
  and type in ('obras','bache','pendiente','estrecho','escalon')
  and char_length(coalesce(street,'')) <= 120 and char_length(coalesce(note,'')) <= 400);

-- Ningú del públic pot editar ni esborrar res: ho fas tu des de Table Editor.
