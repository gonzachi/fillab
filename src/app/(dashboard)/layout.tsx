import type { Metadata, Viewport } from "next";
import "../globals.css";

import { fontVariables } from "@/lib/fonts";

/**
 * Root layout del panel de clientes. Independiente del layout de
 * marketing (ver la nota en `(marketing)/layout.tsx`): mismas fuentes y
 * mismos tokens de `globals.css`, pero sin cursor propio, sin grano de
 * película, sin scroll con inercia y sin la cortina de entrada — acá el
 * cliente quiere leer números rápido, no vivir una experiencia editorial.
 *
 * `robots: noindex` porque todo lo que hay debajo de acá es privado.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://fillab.io"),
  title: { default: "Panel de cliente · Fil Lab", template: "%s · Fil Lab" },
  description: "Panel de analíticas privado para clientes de Fil Lab.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#07040B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function DashboardRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={fontVariables}>
      <body className="bg-ink text-bone" data-native-cursor>
        {children}
      </body>
    </html>
  );
}
