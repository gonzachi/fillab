import { Sora, Instrument_Serif, JetBrains_Mono } from "next/font/google";

/**
 * Tres voces tipográficas, compartidas por los dos layouts raíz del sitio
 * (marketing y dashboard): Sora sostiene la estructura, Instrument Serif
 * pone el acento editorial y JetBrains Mono etiqueta todo lo técnico.
 *
 * Se definen acá una sola vez porque next/font exige que cada llamada sea
 * una constante de módulo — si cada layout la llamara por su cuenta,
 * tendríamos dos declaraciones divergentes de la misma fuente.
 */

export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${sora.variable} ${instrument.variable} ${jetbrains.variable}`;
