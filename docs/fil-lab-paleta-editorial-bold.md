# Fil Lab — Paleta de color "Editorial bold"

Reemplaza la paleta verde original del doc de identidad. Pensada con light y dark mode desde el inicio.

## Light mode

| Rol | Hex | Uso |
|---|---|---|
| Fondo | `#F5F3EF` | Fondo general de la página |
| Primario / superficie fuerte | `#2E1A47` | Botón primario, fondo del hero, headers de sección |
| Acento | `#C8FF4D` | CTA secundario, highlights, punto del logo |
| Texto primario | `#1A1A18` | Texto de cuerpo sobre fondo claro |
| Texto secundario | `#6B6258` | Subtítulos, texto de apoyo |

## Dark mode

| Rol | Hex | Uso |
|---|---|---|
| Fondo | `#120A1C` | Fondo general en modo oscuro |
| Superficie elevada | `#2E1A47` | Cards, secciones destacadas — el mismo violeta del light mode pasa a ser superficie, no fondo |
| Acento | `#C8FF4D` | Se mantiene igual en ambos modos, gana contraste sobre el fondo oscuro |
| Texto primario | `#F5F3EF` | Texto de cuerpo sobre fondo oscuro |
| Texto secundario | `#B8AFC4` | Subtítulos, texto de apoyo en dark mode |

## Regla de conversión

El violeta (`#2E1A47`) cambia de rol entre modos, no de valor: en light mode es color fuerte (fondos, botones); en dark mode es superficie elevada (cards). El acento lima (`#C8FF4D`) es el único color que se mantiene idéntico en los dos modos.

## Implementación sugerida (CSS variables)

```css
:root {
  --bg: #F5F3EF;
  --surface: #2E1A47;
  --accent: #C8FF4D;
  --text-primary: #1A1A18;
  --text-secondary: #6B6258;
}

[data-theme="dark"] {
  --bg: #120A1C;
  --surface: #2E1A47;
  --accent: #C8FF4D;
  --text-primary: #F5F3EF;
  --text-secondary: #B8AFC4;
}
```
