import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/**
 * `proxy.ts` — en Next.js 16 reemplaza a `middleware.ts` (mismo mecanismo,
 * nuevo nombre; ver el codemod `middleware-to-proxy`). Corre en runtime
 * Node.js, no edge.
 *
 * Acotado a `/dashboard` y `/login`: es el único lugar del sitio donde
 * existe una sesión que refrescar. Correrlo en cada página de marketing
 * gastaría una verificación de JWT en cada visita sin necesidad.
 */
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
