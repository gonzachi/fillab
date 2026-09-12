import { useMemo, useSyncExternalStore } from "react";

/**
 * Lee una media query como una fuente externa de estado.
 *
 * Es la forma correcta en React 19: el valor del servidor es `false`, el
 * cliente lo corrige al hidratar y cualquier cambio posterior (girar el
 * móvil, activar el ajuste de movimiento reducido) vuelve a renderizar.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useMemo(
    () => (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** El visitante pidió menos movimiento en los ajustes del sistema. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Ratón o trackpad, no dedo: solo ahí tiene sentido un cursor propio. */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}
