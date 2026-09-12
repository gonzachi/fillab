# Fil Lab — Plan de landing page (v1)

Brief para pasar directo a Claude Code. Referencia de marca: `fil-lab-identidad-visual.md`.

## Alcance

- Una sola página (landing), sin portfolio todavía.
- Objetivo: comunicar la propuesta de valor y generar contacto — no mostrar trabajo previo.
- Doble vía de contacto: formulario + WhatsApp/email directo.

## Stack sugerido

- **Frontend:** HTML/CSS/JS simple o Next.js (si en algún momento sumás blog/portfolio, Next.js escala mejor sin reescribir).
- **Hosting:** Vercel (deploy directo desde Claude Code, gratis para este uso).
- **Formulario de contacto:** Formspree o Resend (plan gratuito) para no montar backend propio — el form postea ahí y te llega el mail.
- **Dominio:** pendiente de definir (fillab.io / fillab.co / fillab.com según disponibilidad).

## Dirección visual: futuro y creatividad

La identidad de base (verde oscuro + Sora + hilo) es sobria — para que la web "respire futuro" sin traicionar la marca, la modernidad va en los componentes y micro-interacciones, no en sumar más colores:

- **Hero con canvas animado:** el hilo/onda de la marca como fondo generativo (canvas o SVG animado con JS), reacciona sutilmente al mouse o hace loop lento — no un fondo estático.
- **Scroll reveals:** cada sección aparece con fade/slide al entrar en viewport (librería tipo GSAP o Framer Motion si es Next.js).
- **Botones magnéticos:** el CTA principal "sigue" levemente el cursor al hover — detalle chico pero se siente premium.
- **Bento grid** en la sección "Qué hacemos" en vez de cards parejas — cajas de distinto tamaño, más dinámico que una grilla uniforme.
- **Texto con reveal por letra o gradiente animado** en el tagline del hero — un detalle tipográfico que marque tono sin saturar.
- **Cursor custom** (opcional, si no complica mobile): un punto que replica el acento mint de la marca, cambia de tamaño sobre links.
- **Scroll suave** (Lenis o similar) para que toda la navegación se sienta fluida en vez de saltos bruscos.
- **Glass/blur sutil** en la barra de navegación fija al hacer scroll (fondo semitransparente + blur), no en toda la página.

Nada de esto pide más colores ni gradientes de fondo llamativos — la sensación de "futuro" sale del movimiento y la interacción, manteniendo la paleta plana de la identidad.

## Secciones de la landing

### 1. Hero
- Wordmark "Fil Lab" con el punto de acento, sobre fondo verde oscuro (`#064E3B`).
- Elemento gráfico: la línea ondulada + punto, como motivo decorativo de fondo o separador.
- Tagline: "Ideas en movimiento para un futuro real."
- CTA principal: "Contame tu proyecto" → ancla a la sección de contacto.

### 2. Qué hacemos
- 2-3 líneas de propuesta de valor: páginas web a medida, rápidas, sin vueltas de agencia grande.
- 3-4 bullets o cards cortas (podés reusar el estilo de "Explorar / Colaborar / Medir / Crear" del moodboard, adaptado a servicios reales: ej. "Diseño", "Desarrollo", "Optimización", "Mantenimiento").

### 3. Cómo trabajamos
- Los 4 pilares del moodboard como proceso: Pensar → Experimentar → Construir → Transformar.
- Formato simple: 4 pasos en línea o en grilla, ícono de línea + título + una frase corta cada uno.

### 4. Manifiesto
- Sección propia, tratamiento editorial: texto grande, una frase por línea, mucho espacio en blanco — sin cards ni íconos, que contraste con el resto de la página.
- Reveal progresivo línea por línea al hacer scroll (encaja con los scroll reveals de la dirección visual).
- Abre con un bloque de definición estilo diccionario, antes del manifiesto — ancla el nombre a su significado antes de bajar a los valores:

  > **FIL** — sust., cat. /fil/
  > Hilo, hebra. Lo que conecta un extremo con otro, punto a punto, hasta volverse algo.
  >
  > **NODO** — sust.
  > Punto donde varios hilos se encuentran y se convierten en algo nuevo. Cada proyecto, un nodo.

- Copy del manifiesto (revisado):

  > Creemos en hacer las cosas bien, no rápido.
  > Creemos en innovar con tecnología, no en repetir fórmulas.
  > Creemos en hacer equipo — con vos, no para vos.
  > Creemos en soluciones a medida. Nunca genéricas.
  > Fil Lab nace de la curiosidad, y crece con cuidado.

- Ubicación en la página: después de "Cómo trabajamos" y antes de "Por qué Fil Lab" — funciona como respiro/climax antes del cierre hacia el CTA de contacto.
- Tratamiento visual sugerido: el bloque de definiciones en tipografía más chica y monoespaciada o con estilo "entrada de diccionario" (línea divisoria, itálica en la categoría gramatical), el manifiesto en Sora grande, bold, alineado a la izquierda.

### 5. Por qué Fil Lab
- Diferenciador clave: sos vos, no una agencia — trato directo, rapidez, sin intermediarios.
- Podés usar el claim "un símbolo simple para ideas complejas" reformulado a por qué elegirte.

### 6. Contacto
- Formulario corto: nombre, email, mensaje (3 campos, nada más — bajar fricción).
- Debajo o al lado: botón directo a WhatsApp (`wa.me/34644634884`) y mailto (`gonzalo.chiavassa@gmail.com`) — dejar claro que se puede saltear el form.
- Footer minimal: logo chico, "Barcelona · 2026", enlace a Instagram/LinkedIn si vas a usar redes.

## Tokens de diseño (de la identidad)

- Color principal: `#064E3B` · Acento: `#3DD6BC` (a confirmar) · Texto: `#1F2A27` · Fondo: `#F4F4F2`
- Tipografía: Sora (Google Fonts) — Semibold/Bold para títulos, Regular/Medium para cuerpo
- Botón primario: fondo verde oscuro, texto blanco, radio suave
- Botón secundario: outline

## Pendientes antes de escribir el copy final

- Fijar el hex de acento y de fondo definitivos (ver nota en el doc de identidad).
- Definir si sumás redes sociales al footer.
- Decidir el dominio final antes de configurar el deploy en Vercel.
