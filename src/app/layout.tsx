import type { Metadata, Viewport } from "next";
import { Sora, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import { IntroProvider } from "@/components/Intro";

/* ─── Tres voces tipográficas ──────────────────────────────────
   Sora sostiene la estructura, Instrument Serif pone el acento
   editorial y JetBrains Mono etiqueta todo lo técnico.          */

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>
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
