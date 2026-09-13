-- Fil Lab — Dashboard de analytics
-- Tabla de mapeo usuario → sitio de Umami. Correr una sola vez en el SQL
-- Editor de Supabase (Project → SQL Editor → New query), en el proyecto
-- que vayas a usar para el dashboard. Ver docs/dashboard-setup.md para el
-- resto de los pasos.

create table if not exists public.client_profiles (
  -- Mismo id que auth.users: una fila de perfil por usuario de Supabase Auth.
  user_id uuid primary key references auth.users (id) on delete cascade,

  -- El website-id que te da Umami al registrar el sitio del cliente.
  website_id text not null,

  -- Nombre a mostrar en el header del dashboard, ej. "Estudio Almendra".
  client_name text not null,

  -- Informativo, no se usa para nada crítico.
  domain text,

  -- Nombre del evento custom de Umami que contás como conversión para
  -- este cliente (ej. 'contacto_enviado'). Null si el cliente no tiene
  -- uno definido todavía — el dashboard oculta la tarjeta de conversión
  -- en ese caso, en vez de mostrar un 0% engañoso.
  conversion_event text,

  created_at timestamptz not null default now()
);

comment on table public.client_profiles is
  'Mapeo cliente del dashboard -> su sitio en Umami. Una fila por cliente, creada a mano por Fil Lab al dar de alta cada cuenta.';

-- Row Level Security: cada usuario ve únicamente su propia fila. El
-- dashboard consulta esta tabla con la sesión del usuario logueado (no
-- con una service role key), así que esta política es la única barrera
-- real entre los datos de un cliente y los de otro.
alter table public.client_profiles enable row level security;

create policy "Cada cliente ve su propio perfil"
  on public.client_profiles
  for select
  using (auth.uid() = user_id);

-- No hay política de insert/update/delete a propósito: estas filas las
-- gestiona Fil Lab a mano desde el Table Editor de Supabase (o con la
-- service role key en un futuro panel de administración), nunca el
-- propio cliente.
