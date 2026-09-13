# Dashboard de analytics — puesta en marcha

El código ya está: `/dashboard` funciona hoy mismo en **modo demo**, con
datos de ejemplo, sin que hagas nada. Esta guía es para cuando quieras
conectarlo a un cliente real. Ninguno de estos pasos se puede hacer desde
acá — son cuentas y clics en paneles web que solo vos podés crear.

Ver también `docs/fil-lab-plan-dashboard-umami.md` (el plan original) y
`docs/sql/client_profiles.sql` (el esquema).

## Cómo funciona el modo demo

`src/lib/dashboard/config.ts` decide todo esto mirando variables de
entorno:

- Sin `NEXT_PUBLIC_FILLAB_SUPABASE_URL` → no hay login real, `/dashboard`
  no redirige a nadie, y `/login` muestra un botón directo al panel.
- Sin `UMAMI_API_URL` → los números vienen de
  `src/lib/umami/demo-data.ts` en vez de una API real.

Se pueden activar por separado — por ejemplo, tener el login real
funcionando antes de conectar Umami. El banner amarillo del panel te dice
en todo momento cuál de los dos falta.

## 1. Crear el proyecto de Supabase

Se creó desde el **Marketplace de Vercel** (Project fillab → Storage →
Browse Marketplace → Supabase), no desde supabase.com directo. Ventaja:
Vercel deployment ya tiene las variables de producción cargadas solas.
Desventaja a tener en cuenta: Vercel las marca como **Secret** — ni el
dashboard de Vercel ni el CLI las vuelven a mostrar una vez creadas, así
que para desarrollo local hay que ir a buscarlas al lugar que sí las
muestra siempre: el dashboard propio de Supabase.

1. Desde el proyecto de Vercel → **Storage** → el recurso de Supabase →
   **Open in Supabase Dashboard** (o entrá directo a
   [supabase.com](https://supabase.com) con la misma cuenta).
2. **Project Settings → API** → copiá **Project URL** y la
   **`publishable` key** (la que antes se llamaba `anon key`).
3. Pegalas en `.env.local` (copiá `.env.example` primero) — el prefijo
   `FILLAB_` es el que le puso Vercel al recurso, no algo que inventamos:
   ```
   NEXT_PUBLIC_FILLAB_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_FILLAB_SUPABASE_PUBLISHABLE_KEY=eyJ...
   ```
4. SQL Editor → New query → pegá el contenido de
   `docs/sql/client_profiles.sql` → Run. Esto crea la tabla de mapeo
   cliente → sitio con su RLS.

Con esto ya alcanza para que `/login` deje de estar en modo demo — pero
todavía no hay ningún usuario que pueda entrar (ver paso 3).

> Si en cambio creaste (o creás en el futuro) un proyecto de Supabase
> directo en supabase.com, sin pasar por Vercel, las variables se llaman
> sin prefijo (`NEXT_PUBLIC_SUPABASE_URL` /
> `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) — ese es el nombre "de fábrica"
> que usa la documentación oficial de Supabase. En ese caso hay que
> renombrarlas en `src/lib/dashboard/config.ts` y en los tres archivos de
> `src/lib/supabase/`.

## 2. Deployar Umami

Camino real que funcionó (no el botón "Deploy to Vercel" genérico del
repo de Umami — ese import no conecta ninguna base sola, hay que
armarla a mano):

1. Fork de [github.com/umami-software/umami](https://github.com/umami-software/umami)
   a tu cuenta, e importalo como proyecto nuevo en Vercel (separado del
   proyecto `fillab`).
2. Conectar la base: ver **"Compartir la base con Supabase, en un
   esquema propio"** más abajo — es la parte con más peatones. Cargar
   `DATABASE_URL` y `DIRECT_DATABASE_URL` como variables del proyecto
   de Umami (tipo **Config**, no Secret, para poder releerlas después).
3. Si el build falla en `build-tracker-types` con un error de Biome
   sobre un "ignore file" que no encuentra: es porque Vercel borra
   `.git` después de clonar y el `biome.json` del repo depende de él.
   Poner `"useIgnoreFile": false` en el bloque `vcs` de `biome.json` y
   volver a deployar — ya está corregido en el fork si partiste de uno
   hecho después de esta fecha.
4. Deploy. Entrá a la URL con `admin` / `umami` (de fábrica) y **cambiá
   la contraseña ya mismo** — ícono de usuario → Settings.
5. Usuario para la API: en teoría conviene uno aparte de `admin`
   (Settings → Users → Add user), pero si por ahora sos el único que
   accede, usar `admin` directamente es una simplificación razonable —
   solo recordá que ese usuario y contraseña van a vivir como variable
   de entorno del proyecto `fillab`, no del proyecto de Umami:
   ```
   UMAMI_API_URL=https://tu-umami.vercel.app
   UMAMI_USERNAME=admin
   UMAMI_PASSWORD=...
   ```
   Self-hosted Umami no tiene API key de larga duración (eso es solo de
   Umami Cloud) — el dashboard hace login con este usuario y cachea el
   token, ver `src/lib/umami/client.ts`.
6. Settings → Websites → Add website (podés hacerlo también por API,
   ver ejemplo abajo). Te da un **Website ID** (UUID) — necesario para
   el paso 3, y para `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (la variable que usa
   el script de tracking en `(marketing)/layout.tsx`).

   Crear el sitio por API en vez de la interfaz (útil si ya tenés el
   token a mano):
   ```
   curl -X POST https://tu-umami.vercel.app/api/websites \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -d '{"name": "Fil Lab", "domain": "fillab.io"}'
   ```

## 3. Dar de alta un cliente

No hay pantalla de alta todavía (a propósito — lo hacés vos a mano, ver
"Pendientes" en el plan original). Dos pasos en Supabase:

1. **Authentication → Users → Add user.** Cargá el email y una
   contraseña — esas son las credenciales que le das al cliente.
2. **Table Editor → `client_profiles` → Insert row.**
   - `user_id`: el UUID del usuario que acabás de crear (columna `id` en
     Authentication → Users).
   - `website_id`: el UUID que te dio Umami en el paso 2.4.
   - `client_name`: el nombre a mostrar en el panel.
   - `domain`: opcional, solo informativo.
   - `conversion_event`: el nombre del evento custom que cuenta como
     conversión para este cliente (ej. `contacto_enviado`), o dejalo
     vacío si todavía no definiste uno — el dashboard oculta la tarjeta
     de conversión en ese caso.

## 4. Instalar el tracking en el sitio del cliente

Para **fillab.io/fillab.vercel.app** ya está resuelto: el layout de
marketing (`src/app/(marketing)/layout.tsx`) carga el script con
`next/script` si existe `NEXT_PUBLIC_UMAMI_WEBSITE_ID` — nada que tocar
acá, solo cargar esa variable (paso 6 de arriba) y listo. Sin la
variable, el sitio no manda nada — así un preview o un local nunca
ensucia las métricas reales.

Para el sitio de **otro cliente** (otro repo), el equivalente manual en
su `<head>` (su `layout.tsx` si es Next.js):

```html
<script defer src="https://tu-umami.vercel.app/script.js" data-website-id="EL-UUID-DEL-SITIO"></script>
```

> El nombre exacto del archivo (`script.js` en la versión probada acá)
> puede variar entre versiones de Umami — usá el que te muestre el
> panel, no des este por sentado.

Para trackear una conversión (ej. el envío del formulario de contacto),
en el componente del formulario, al confirmar el envío:

```ts
declare global {
  interface Window {
    umami?: { track: (name: string, data?: Record<string, unknown>) => void };
  }
}

window.umami?.track("contacto_enviado");
```

El nombre acá (`"contacto_enviado"`) tiene que ser **exactamente** el
mismo que pusiste en `conversion_event` al dar de alta el cliente (paso
3) — el dashboard busca ese string literal en las métricas de Umami.

## 5. Variables en Vercel

Las de Supabase ya están (las puso el Marketplace solo, para Preview y
Producción). Las de Umami (`UMAMI_API_URL`, `UMAMI_USERNAME`,
`UMAMI_PASSWORD`) hay que cargarlas a mano: Project Settings →
Environment Variables → Add — marcalas como **Plain Text**, no Secret,
así se pueden volver a leer si hace falta rotar el usuario más adelante.
Sin esto, producción sigue en modo demo para Umami aunque tu máquina ya
esté conectada.

## Endpoints de Umami — verificado contra una instancia real

`src/lib/umami/client.ts` se probó de punta a punta contra
`fillab-umami.vercel.app` (Umami 3.3.1), no solo contra la documentación
pública. Dos correcciones que la doc no dejaba ver:

- `/api/websites/{id}/stats` devuelve números planos
  (`{ pageviews: 1, visitors: 1, ... }`) más un objeto `comparison`
  aparte con el período anterior — no `{ value, prev }` anidado por
  métrica como sugiere la doc pública.
- El tipo de métrica para el ranking de páginas es `path`, no `url`
  (verificado contra `src/lib/constants.ts` del propio repo de Umami:
  `EVENT_COLUMNS`/`SESSION_COLUMNS` en `metrics/route.ts` listan los
  valores válidos de `type`).

Si tu versión de Umami difiere, `src/lib/umami/client.ts` es el único
archivo que hay que tocar — el resto del dashboard solo conoce los tipos
de `src/lib/umami/types.ts`.

### Compartir la base con Supabase, en un esquema propio

Si Umami y el dashboard comparten el mismo proyecto de Supabase (como
en `fillab-umami`), tres cosas a tener en cuenta:

1. **Conexión directa (`db.xxx.supabase.co:5432`) no funciona desde
   Vercel** — requiere IPv6 y el build falla con `ENETUNREACH`. Usar
   el **connection pooler** (`aws-x-region.pooler.supabase.com`).
2. El pooler en **modo transacción** (puerto 6543) sirve para
   `DATABASE_URL` (consultas normales) pero no soporta los locks que
   necesita `prisma migrate deploy`. Para eso hace falta
   `DIRECT_DATABASE_URL` apuntando al mismo pooler en **modo sesión**
   (puerto 5432).
3. Agregar `?schema=umami` a ambas URLs — así Umami crea sus ~24 tablas
   en un esquema propio, sin chocar con `client_profiles` (que vive en
   `public`). Sin esto, `prisma migrate deploy` falla con `P3005` en
   cuanto el esquema `public` ya tiene alguna tabla.

URL de ejemplo completa:
```
postgresql://postgres.<ref>:<password>@<pooler-host>:6543/postgres?pgbouncer=true&connect_timeout=10&sslmode=require&uselibpqcompat=true&schema=umami
```
(cambiar el puerto a `5432` y sacar `pgbouncer=true` para
`DIRECT_DATABASE_URL`). El flag `uselibpqcompat=true` evita un error de
"self-signed certificate" que tira la versión nueva del driver de
Postgres con `sslmode=require` a secas.

## Multi-cliente

Repetir el paso 3 por cada cliente nuevo (un `website_id` de Umami +
un usuario de Supabase + una fila en `client_profiles`). No hace falta
tocar código para sumar clientes.
