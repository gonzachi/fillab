import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fil Lab — Ideas en movimiento para un futuro real",
  description:
    "Consultora creativa boutique de diseño y desarrollo web en Barcelona. Sitios web a medida, rápidos y de alto impacto.",
  keywords: [
    "diseño web",
    "desarrollo web",
    "consultora creativa",
    "Barcelona",
    "Next.js",
    "Fil Lab",
  ],
  authors: [{ name: "Gonzalo Chiavassa" }],
  openGraph: {
    title: "Fil Lab — Ideas en movimiento para un futuro real",
    description:
      "Consultora creativa boutique de diseño y desarrollo web en Barcelona.",
    siteName: "Fil Lab",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} scroll-smooth`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[#F4F4F2] text-[#1F2A27]">
        {children}
      </body>
    </html>
  );
}
