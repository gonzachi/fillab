import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../globals.css";

import { fontVariables } from "@/lib/fonts";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import { IntroProvider } from "@/components/Intro";

/**
 * Layout raíz del sitio público. Es un root layout independiente (no un
 * layout anidado) a propósito: junto con `(dashboard)/layout.tsx`, Next.js
 * permite más de un root layout en la misma app cuando ninguno envuelve al
 * otro — así el panel de clientes no hereda el cursor propio, el grano de
 * película, el scroll con inercia ni la cortina de entrada, que son
 * lenguaje de marketing, no de una herramienta de trabajo.
 */

const DESCRIPTION =
  "Consultora creativa boutique de diseño y desarrollo web en Barcelona. Sitios a medida, rápidos y de alto impacto, hechos con criterio y sin plantillas.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fillab.io"),
  title: {
    default: "Fil Lab — Ideas en movimiento para un futuro real",
    template: "%s · Fil Lab",
  },
  description: DESCRIPTION,
  applicationName: "Fil Lab",
  keywords: [
    "diseño web",
    "desarrollo web",
    "consultora creativa",
    "estudio de diseño Barcelona",
    "Next.js",
    "Fil Lab",
  ],
  authors: [{ name: "Gonzalo Chiavassa" }],
  creator: "Gonzalo Chiavassa",
  openGraph: {
    title: "Fil Lab — Ideas en movimiento para un futuro real",
    description: DESCRIPTION,
    siteName: "Fil Lab",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fil Lab — Ideas en movimiento para un futuro real",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07040B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Sin NEXT_PUBLIC_UMAMI_WEBSITE_ID no se manda tráfico a ningún lado — así
// el sitio en local o en un preview branch nunca ensucia las métricas
// reales con visitas de desarrollo.
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={fontVariables}>
      <body>
        {umamiWebsiteId && (
          <Script
            src="https://fillab-umami.vercel.app/script.js"
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
        <SmoothScroll>
          <IntroProvider>
            <Grain />
            <Cursor />
            {children}
          </IntroProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
