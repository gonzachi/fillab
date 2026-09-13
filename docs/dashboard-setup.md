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

- Sin `NEXT_PUBLIC_SUPABASE_URL` → no hay login real, `/dashboard` no
  redirige a nadie, y `/login` muestra un botón directo al panel.
- Sin `UMAMI_API_URL` → los números vienen de
  `src/lib/umami/demo-data.ts` en vez de una API real.

Se pueden activar por separado — por ejemplo, tener el login real
funcionando antes de conectar Umami. El banner amarillo del panel te dice
en todo momento cuál de los dos falta.

## 1. Crear el proyecto de Supabase

1. [supabase.com](https://supabase.com) → New Project. Anotá la
   contraseña de la base, la vas a necesitar una sola vez.
2. Project Settings → API → copiá **Project URL** y la
   **`publishable` key** (la que antes se llamaba `anon key`).
3. Pegalas en `.env.local` (copiá `.env.example` primero):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJ...
   ```
4. SQL Editor → New query → pegá el contenido de
   `docs/sql/client_profiles.sql` → Run. Esto crea la tabla de mapeo
   cliente → sitio con su RLS.

Con esto ya alcanza para que `/login` deje de estar en modo demo — pero
todavía no hay ningún usuario que pueda entrar (ver paso 3).

## 2. Deployar Umami

1. Umami tiene un botón de "Deploy to Vercel" en su repo
   ([github.com/umami-software/umami](https://github.com/umami-software/umami))
   — pide una base Postgres; podés usar otro proyecto de Supabase para
   eso (Umami no necesita compartir base con el dashboard).
2. Al terminar el deploy, entrá a la URL que te dio Vercel con el usuario
   `admin` / contraseña `umami` (los de fábrica) y **cambiá la
   contraseña en el momento** — Ajustes → Usuarios.
3. Creá un usuario aparte para la API (no uses `admin` en producción):
   Ajustes → Usuarios → Add user. Ese usuario y contraseña van en
   `.env.local`:
   ```
   UMAMI_API_URL=https://tu-umami.vercel.app
   UMAMI_USERNAME=api-fillab
   UMAMI_PASSWORD=...
   ```
   Self-hosted Umami no tiene API key de larga duración (eso es solo de
   Umami Cloud) — el dashboard hace login con este usuario y cachea el
   token, ver `src/lib/umami/client.ts`.
4. Ajustes → Sitios → Add website. Poné el dominio del cliente. Umami te
   da un **Website ID** (un UUID) y el snippet de tracking — guardá el
   ID, lo necesitás en el paso 3.

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

En el `<head>` del sitio del cliente (su `layout.tsx` si es Next.js), el
snippet que te dio Umami en el paso 2.4:

```html
<script defer src="https://tu-umami.vercel.app/script.js" data-website-id="EL-UUID-DEL-SITIO"></script>
```

> El nombre exacto del archivo (`script.js`, `umami.js` u otro) depende
> de tu versión — usá el que te muestre el panel de Umami, no des este
> por sentado.

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

Todo lo de `.env.local` tiene que estar también en el proyecto de
Vercel donde deployás el sitio del dashboard: Project Settings →
Environment Variables. Sin esto, producción sigue en modo demo aunque tu
máquina ya esté conectada.

## Verificar los endpoints de Umami

`src/lib/umami/client.ts` está escrito contra la documentación pública
de Umami (docs.umami.is/docs/api) al momento de construir esto, pero no
se probó contra una instancia real todavía. Antes de confiar en los
números en producción, comparalos a mano contra el panel de Umami un par
de días. Si tu versión difiere en algún nombre de campo, ese archivo es
el único lugar que hay que tocar — el resto del dashboard solo conoce
los tipos de `src/lib/umami/types.ts`.

## Multi-cliente

Repetir el paso 3 por cada cliente nuevo (un `website_id` de Umami +
un usuario de Supabase + una fila en `client_profiles`). No hace falta
tocar código para sumar clientes.
