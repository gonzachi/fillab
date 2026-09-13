import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente de Supabase para Client Components. Solo hace falta en el
 * formulario de login (que necesita reaccionar a errores sin recargar la
 * página) — el resto del dashboard lee datos en el servidor.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_FILLAB_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_FILLAB_SUPABASE_PUBLISHABLE_KEY!,
  );
}
