import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/dashboard/config";

/**
 * Chequeo OPTIMISTA de sesión, para el `proxy.ts` de la raíz del proyecto.
 *
 * Esto es solo una redirección rápida basada en la cookie — nunca la única
 * defensa. El chequeo real (contra la base) vive en la Data Access Layer
 * (`src/lib/dashboard/dal.ts`) y se ejecuta de nuevo en cada página
 * protegida, como recomienda la guía de autenticación de Next.js.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Sin Supabase configurado, el dashboard entero corre en modo demo:
  // no hay sesión que refrescar ni nada que redirigir.
  if (!isSupabaseConfigured) return response;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // No correr código entre `createServerClient` y `getClaims()`: es lo que
  // mantiene el token fresco. Verificación local del JWT, sin ida y vuelta
  // a la base — por eso es segura para correr en el proxy.
  const { data } = await supabase.auth.getClaims();
  const isLoggedIn = Boolean(data?.claims);

  const path = request.nextUrl.pathname;
  const isLoginPage = path === "/login";

  if (!isLoggedIn && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}
