import { LogOut } from "lucide-react";
import { getOptionalSession, displayName } from "@/lib/dashboard/dal";
import { logout } from "./actions";

/**
 * Shell del panel: logo, nombre del cliente, botón de salir. Solo para
 * mostrar información — NO es acá donde se protege la ruta.
 *
 * Un layout no vuelve a ejecutarse en cada navegación dentro del mismo
 * segmento (ver la guía de autenticación de Next.js), así que un chequeo
 * de sesión puesto solo acá podría no repetirse al navegar entre páginas
 * del dashboard más adelante. La verificación real vive en
 * `verifySession()`, llamada de nuevo en cada página — ver
 * `src/lib/dashboard/dal.ts`.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getOptionalSession();
  const name = session ? displayName(session) : null;

  return (
    <div className="min-h-[100svh]">
      <header className="u-hair-b flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[16px] font-bold tracking-[-0.03em]">
            Fil Lab
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          <span className="u-mono ml-2 text-[var(--fg-faint)]">Panel</span>
        </div>

        <div className="flex items-center gap-6">
          {name && (
            <span className="hidden text-[13px] text-[var(--fg-dim)] sm:inline">
              {name}
            </span>
          )}
          <form action={logout}>
            <button
              type="submit"
              className="group flex items-center gap-2 text-[13px] text-[var(--fg-faint)] transition-colors hover:text-bone"
            >
              Salir
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </header>

      {children}
    </div>
  );
}
