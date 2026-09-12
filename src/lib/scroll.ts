import type Lenis from "lenis";

/**
 * Referencia compartida a la instancia de Lenis.
 * La intro necesita congelar el scroll antes de que la página sea navegable
 * y el navbar necesita desplazarse con el mismo easing que el resto del sitio.
 */
let instance: Lenis | null = null;
let locked = false;

export function setLenis(l: Lenis | null) {
  instance = l;
  // La intro puede haber pedido el bloqueo antes de que Lenis exista.
  if (l && locked) l.stop();
}

export function lockScroll() {
  locked = true;
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  locked = false;
  document.documentElement.style.overflow = "";
  instance?.start();
}

export function scrollTo(target: string | number) {
  if (instance) {
    instance.scrollTo(target, { duration: 1.5, lock: true });
    return;
  }
  // Sin Lenis (movimiento reducido o antes de montar): salto nativo.
  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
