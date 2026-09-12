/**
 * `sessionStorage` como fuente externa de estado: la intro se ve una vez por
 * pestaña. Modelarlo así (y no con un `useState` dentro de un efecto) permite
 * que React lea la decisión durante el render, sin renders en cascada.
 */

const KEY = "fillab:intro";
const listeners = new Set<() => void>();

export function subscribeIntro(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function getIntroSeen(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    // Modo privado o almacenamiento bloqueado: la tratamos como ya vista
    // para no repetir la intro en cada navegación.
    return true;
  }
}

/** En el servidor asumimos primera visita: el HTML ya incluye la cortina. */
export function getIntroSeenOnServer(): boolean {
  return false;
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* sin almacenamiento, el estado en memoria alcanza */
  }
  listeners.forEach((l) => l());
}
