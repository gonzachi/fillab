import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/dashboard/config";
import { DEMO_PROFILE } from "@/lib/umami/demo-data";

/**
 * Data Access Layer del dashboard.
 *
 * El proxy (`proxy.ts`) ya hizo un chequeo optimista de sesión —basado
 * solo en la cookie— para redirigir rápido a `/login`. Pero un layout no
 * vuelve a ejecutarse en cada navegación dentro del mismo segmento, así
 * que confiar solo en el proxy dejaría rutas sin re-verificar. Por eso la
 * guía de autenticación de Next.js pide repetir el chequeo real acá, cerca
 * de donde se leen los datos: cada página protegida llama a
 * `verifySession()` de nuevo, no solo el layout.
 */

export type ClientProfile =
  | { mode: "demo" }
  | { mode: "unprovisioned"; email: string }
  | {
      mode: "live";
      userId: string;
      email: string;
      websiteId: string;
      clientName: string;
      domain: string | null;
      conversionEvent: string | null;
    };

/**
 * Verifica la sesión y devuelve el perfil del cliente logueado.
 * Redirige a `/login` si no hay sesión válida. Memoizado con `cache()`
 * para que llamarlo desde el layout y desde la página en el mismo render
 * no dispare dos verificaciones.
 */
export const verifySession = cache(async (): Promise<ClientProfile> => {
  if (!isSupabaseConfigured) return { mode: "demo" };

  const supabase = await createClient();

  // `getClaims()` verifica la firma del JWT en forma local (sin ida y
  // vuelta a la base) — suficientemente seguro para datos de analytics de
  // bajo riesgo, y es el mismo mecanismo que ya corrió en el proxy.
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims?.sub) {
    redirect("/login");
  }

  const userId = claims.sub;
  const email = typeof claims.email === "string" ? claims.email : "";

  const { data: profile } = await supabase
    .from("client_profiles")
    .select("website_id, client_name, domain, conversion_event")
    .eq("user_id", userId)
    .maybeSingle();

  if (!profile) {
    // El usuario existe en Supabase Auth pero todavía no tiene fila en
    // `client_profiles` — falta el paso manual de alta (ver
    // docs/dashboard-setup.md). No es un error de código: mostramos un
    // estado claro en vez de una página rota.
    return { mode: "unprovisioned", email };
  }

  return {
    mode: "live",
    userId,
    email,
    websiteId: profile.website_id,
    clientName: profile.client_name,
    domain: profile.domain,
    conversionEvent: profile.conversion_event,
  };
});

/**
 * Versión de `verifySession` para el logout: no redirige si no hay sesión
 * (no tendría sentido fallar al cerrar sesión), simplemente informa si
 * hay alguien logueado.
 */
export async function getOptionalSession(): Promise<ClientProfile | null> {
  if (!isSupabaseConfigured) return { mode: "demo" };

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) return null;

  return verifySession();
}

/** Nombre a mostrar en el shell del dashboard, en cualquier modo. */
export function displayName(profile: ClientProfile): string {
  if (profile.mode === "live") return profile.clientName;
  if (profile.mode === "unprovisioned") return profile.email;
  return DEMO_PROFILE.clientName;
}
