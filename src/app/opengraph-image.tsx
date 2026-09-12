import { ImageResponse } from "next/og";

export const alt = "Fil Lab — Ideas en movimiento para un futuro real";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Tarjeta social generada en el build: mismo lenguaje visual que la portada. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#07040B",
          padding: 72,
        }}
      >
        {/* Hilo con nodo */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          <path
            d="M-40 470 C 240 470, 280 220, 560 280 S 860 500, 1240 330"
            fill="none"
            stroke="#452873"
            strokeWidth="2"
          />
          <path
            d="M-40 520 C 260 520, 300 300, 600 350 S 900 540, 1240 400"
            fill="none"
            stroke="#6B3FA8"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <circle cx="600" cy="350" r="9" fill="#C8FF4D" />
          <circle cx="600" cy="350" r="26" fill="none" stroke="#C8FF4D" strokeWidth="1.5" opacity="0.35" />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#F6F4F0", fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
            Fil Lab
          </span>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 9,
              backgroundColor: "#C8FF4D",
              display: "flex",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#F6F4F0",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            Ideas en movimiento
          </span>
          <span
            style={{
              color: "#C8FF4D",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1.1,
            }}
          >
            para un futuro real.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(246,244,240,0.14)",
            paddingTop: 26,
            color: "rgba(246,244,240,0.5)",
            fontSize: 20,
            letterSpacing: 2,
          }}
        >
          <span>CONSULTORA CREATIVA</span>
          <span>BARCELONA</span>
        </div>
      </div>
    ),
    size,
  );
}
