-- ============================================================
-- CDMX Trust Score — Schema Supabase
-- Pegar este archivo completo en: Supabase → SQL Editor → New query → Run
-- ============================================================

-- Limpieza si ya existe (seguro de correr varias veces)
drop table if exists public.egresos_raw cascade;
drop table if exists public.hallazgos cascade;
drop table if exists public.scores cascade;
drop table if exists public.alcaldias cascade;

-- ------------------------------------------------------------
-- 1) Catálogo de las 16 alcaldías (nombres canónicos)
-- ------------------------------------------------------------
create table public.alcaldias (
  slug          text primary key,
  nombre        text not null unique,      -- Nombre que aparece en el GeoJSON (NOMGEO)
  clave_inegi   text                       -- Clave municipal INEGI (opcional)
);

insert into public.alcaldias (slug, nombre, clave_inegi) values
  ('alvaro-obregon',          'Álvaro Obregón',          '010'),
  ('azcapotzalco',            'Azcapotzalco',            '002'),
  ('benito-juarez',           'Benito Juárez',           '014'),
  ('coyoacan',                'Coyoacán',                '003'),
  ('cuajimalpa-de-morelos',   'Cuajimalpa de Morelos',   '004'),
  ('cuauhtemoc',              'Cuauhtémoc',              '015'),
  ('gustavo-a-madero',        'Gustavo A. Madero',       '005'),
  ('iztacalco',               'Iztacalco',               '006'),
  ('iztapalapa',              'Iztapalapa',              '007'),
  ('la-magdalena-contreras',  'La Magdalena Contreras',  '008'),
  ('miguel-hidalgo',           'Miguel Hidalgo',          '016'),
  ('milpa-alta',              'Milpa Alta',              '009'),
  ('tlahuac',                 'Tláhuac',                 '011'),
  ('tlalpan',                 'Tlalpan',                 '012'),
  ('venustiano-carranza',     'Venustiano Carranza',     '017'),
  ('xochimilco',              'Xochimilco',              '013');

-- ------------------------------------------------------------
-- 2) Scores calculados por alcaldía × sexenio
-- ------------------------------------------------------------
create table public.scores (
  id                  bigserial primary key,
  alcaldia            text not null references public.alcaldias(nombre),
  sexenio             text not null,                 -- '2012-2018', '2018-2024', '2024-2030'
  score_total         numeric,                       -- 0-100 o null si no hay data
  score_presupuesto   numeric,
  score_plan          numeric,
  score_deuda         numeric,
  score_patrimonio    numeric,
  data_faltante       boolean default false,
  pesos_aplicados     jsonb,                         -- {"presupuesto":1.0,"plan":0,"deuda":0,"patrimonio":0}
  notas               text,
  created_at          timestamptz default now(),
  unique (alcaldia, sexenio)
);

create index idx_scores_alcaldia on public.scores(alcaldia);
create index idx_scores_sexenio  on public.scores(sexenio);

-- ------------------------------------------------------------
-- 3) Hallazgos narrativos (bullets que el agente cita)
-- ------------------------------------------------------------
create table public.hallazgos (
  id                  bigserial primary key,
  alcaldia            text not null references public.alcaldias(nombre),
  sexenio             text not null,
  componente          text,                          -- 'presupuesto' | 'plan' | 'deuda' | 'patrimonio' | 'general'
  hallazgo_narrativo  text not null,
  fuente              text,                          -- link a datos.cdmx.gob.mx / SAF / etc.
  severidad           text,                          -- 'info' | 'alerta' | 'critico'
  created_at          timestamptz default now()
);

create index idx_hallazgos_alcaldia on public.hallazgos(alcaldia);
create index idx_hallazgos_sexenio  on public.hallazgos(sexenio);

-- ------------------------------------------------------------
-- 4) Egresos en crudo — staging desde los CSVs de Yuli (7 años × ~20k filas)
-- Se cargan vía pipeline Python; el agente NO los consulta directo.
-- ------------------------------------------------------------
create table public.egresos_raw (
  id                        bigserial primary key,
  ciclo                     int,
  periodo                   text,
  clave_presupuestaria      text,
  gobierno_general          text,
  desc_gobierno_general     text,
  sector                    text,
  desc_sector               text,
  unidad_responsable        text,
  desc_unidad_responsable   text,
  es_alcaldia               boolean,                 -- true si desc_unidad_responsable mapea a una de las 16
  alcaldia                  text,                    -- nombre canónico si es_alcaldia=true
  finalidad                 text,
  desc_finalidad            text,
  funcion                   text,
  desc_funcion              text,
  capitulo                  text,
  desc_capitulo             text,
  monto_aprobado            numeric,
  monto_modificado          numeric,
  monto_ejercido            numeric
);

create index idx_egresos_alcaldia on public.egresos_raw(alcaldia) where es_alcaldia = true;
create index idx_egresos_ciclo    on public.egresos_raw(ciclo);

-- ------------------------------------------------------------
-- 5) Vistas agregadas (el agente consulta estas, no los raw)
-- ------------------------------------------------------------
create or replace view public.v_ejecucion_por_alcaldia_anio as
select
  alcaldia,
  ciclo                                                                as anio,
  sum(monto_aprobado)                                                  as aprobado,
  sum(monto_modificado)                                                as modificado,
  sum(monto_ejercido)                                                  as ejercido,
  case when sum(monto_modificado) > 0
       then sum(monto_ejercido) / sum(monto_modificado)
       else null end                                                   as tasa_ejecucion,
  case when sum(monto_aprobado) > 0
       then abs(sum(monto_modificado) - sum(monto_aprobado)) / sum(monto_aprobado)
       else null end                                                   as disciplina_modificatoria
from public.egresos_raw
where es_alcaldia = true
group by alcaldia, ciclo;

-- ------------------------------------------------------------
-- 6) Permisos: lectura pública (RLS off para hackathon)
-- ------------------------------------------------------------
alter table public.alcaldias  disable row level security;
alter table public.scores     disable row level security;
alter table public.hallazgos  disable row level security;
alter table public.egresos_raw disable row level security;

-- LISTO. Deberías ver 16 alcaldías en public.alcaldias y las demás tablas vacías.
-- Corre:  select count(*) from public.alcaldias;    -- debe dar 16
