# Fil Lab — Dashboard de analytics para clientes (Umami)

Plan técnico para armar un dashboard nativo de analytics, embebido en la web de cada cliente, sin mostrar nunca la interfaz de Umami.

## Idea general

Umami hace el trabajo pesado (recolectar datos, guardarlos, calcular métricas) y vos construís encima tu propio dashboard, con tu diseño, al que cada cliente entra con su login. El cliente nunca ve umami.is ni sabe que existe por debajo.

## Arquitectura

```
Web del cliente (Vercel)
  └─ script de tracking de Umami (una línea en el <head>)
        ↓ manda eventos
Instancia de Umami (Vercel + Postgres)
  └─ guarda pageviews, eventos, sesiones
        ↓ vos consultás su API
Dashboard propio (Vercel, Next.js)
  └─ login del cliente → pide datos a la API de Umami → los muestra con tu UI
```

## Stack

- **Umami:** deploy directo en Vercel (está hecho en Next.js, encaja nativo con tu flujo actual).
- **Base de datos:** Supabase (Postgres) — tanto para Umami como para la auth del dashboard.
- **Dashboard propio:** otra app Next.js (puede vivir en un subdominio tipo `panel.fillab.io` o en `/dashboard` dentro de cada web de cliente).
- **Gráficos:** Recharts o Chart.js.
- **Auth del dashboard:** Supabase Auth — mismo proveedor que la base, cada cliente tiene su cuenta y solo ve su propio sitio (row-level security a nivel de fila, por `website-id`).

## Pasos de implementación

1. **Deployar Umami en Vercel**
   - Clonar el repo de Umami, conectar a un proyecto nuevo de Supabase (Postgres), deploy.
   - Login inicial con usuario admin por defecto — cambiar contraseña al toque.
2. **Agregar cada sitio de cliente en Umami**
   - Desde el panel de Umami (uso interno tuyo, no del cliente) se registra cada web y te da un `website-id` + script de tracking.
3. **Instalar el script en la web del cliente**
   - Una línea `<script>` con `data-website-id` en el `<head>` de cada sitio que armes.
4. **Armar el dashboard propio**
   - App Next.js aparte, con login por cliente.
   - Al loguearse, el cliente ve solo los datos de su `website-id` (nunca eligiendo entre sitios de otros clientes).
5. **Consultar la API de Umami desde el dashboard**
   - Endpoints clave: `/api/websites/{id}/stats` (resumen: visitas, visitantes únicos, rebote, duración), `/api/websites/{id}/pageviews` (serie temporal), `/api/websites/{id}/metrics` (top páginas, referrers, países, dispositivos), `/api/websites/{id}/events` (eventos custom, ej. clicks en el CTA de contacto — esto es tu "conversión").
   - El dashboard pide estos datos server-side (con tu API key de Umami, que nunca se expone al cliente) y los renderiza con tu diseño.
6. **Definir "conversión" por cliente**
   - Umami trackea eventos custom con una línea de JS (`umami.track('contacto_enviado')`). Eso te da conversión real (ej. formularios enviados / visitas totales), no solo tráfico.

## Qué ve el cliente en su panel

- Visitas totales y visitantes únicos, con comparación vs. período anterior.
- Gráfico de tráfico en el tiempo (línea, últimos 7/30/90 días).
- Top páginas visitadas.
- De dónde viene el tráfico (referrers, redes, directo).
- Tasa de conversión (evento definido / visitas).
- Dispositivo y país, si aporta valor al cliente.

## Multi-cliente desde el día uno

Aunque arranques con un solo cliente, convini modelar esto pensando en varios desde el principio: cada cliente = un `website-id` en Umami + una cuenta en tu sistema de auth, con una tabla de mapeo `usuario → website-id` para que el dashboard sepa qué datos mostrarle a quién.

## Acceso al dashboard

- Vive en `/dashboard` (ruta dentro del mismo dominio, no subdominio separado — más simple de configurar).
- Acceso con usuario y contraseña — login tradicional vía Supabase Auth (email + password), sin magic link ni social login por ahora.
- Al loguearse, cada cliente cae directo a su propio panel (su `website-id`), sin selector de sitios de otros clientes.

## Pendientes / decisiones antes de construir

- Definir qué eventos custom trackear por defecto en cada proyecto nuevo (ej. submit de formulario, click en WhatsApp).
