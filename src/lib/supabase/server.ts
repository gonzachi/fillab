import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente de Supabase para Server Components, Server Actions y Route
 * Handlers. Lee y escribe la sesión a través de las cookies de la request
 * actual — nunca guardarlo en una variable global ni reutilizarlo entre
 * requests (cada invocación crea el suyo).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` fue llamado desde un Server Component, donde no se
            // pueden escribir cookies. Se puede ignorar porque el proxy
            // (`src/lib/supabase/proxy.ts`) ya refresca la sesión antes de
            // que la request llegue acá.
          }
        },
      },
    },
  );
}
