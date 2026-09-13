/**
 * Interruptores de configuración del dashboard, derivados de qué variables
 * de entorno existen. No hay build separado para "modo demo" — es el mismo
 * código corriendo con o sin credenciales reales, así que agregar Supabase
 * o Umami más adelante es poner las variables en `.env.local`, no tocar
 * código. Ver `docs/dashboard-setup.md` para el paso a paso.
 *
 * Los nombres `NEXT_PUBLIC_FILLAB_SUPABASE_*` (con el prefijo del recurso,
 * no los genéricos `NEXT_PUBLIC_SUPABASE_*` de la documentación de
 * Supabase) son los que puso automáticamente el Marketplace de Vercel al
 * provisionar el proyecto desde la pestaña Storage — Vercel prefija así
 * para no chocar si algún día hay más de un recurso de storage.
 *
 * Deliberadamente NO usa `server-only`: `isUmamiConfigured` no se necesita
 * en el cliente hoy, pero `isSupabaseConfigured` sí (el login lo usa para
 * decidir si mostrar el formulario real o el aviso de modo demo).
 */

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FILLAB_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_FILLAB_SUPABASE_PUBLISHABLE_KEY,
);

export const isUmamiConfigured = Boolean(
  process.env.UMAMI_API_URL &&
    process.env.UMAMI_USERNAME &&
    process.env.UMAMI_PASSWORD,
);
