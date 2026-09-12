"use client";

import { useEffect, useRef } from "react";

/**
 * Campo de hilos que convergen en un nodo.
 *
 * Es la identidad de Fil Lab dibujada en movimiento: muchas hebras sueltas
 * que se juntan en un punto y siguen. La amplitud de cada onda se apaga al
 * acercarse al nodo, de modo que el desorden se vuelve orden y vuelve a
 * abrirse después. El cursor empuja los hilos sin llegar a romperlos.
 */

const THREADS = 9;
const SEGMENTS = 150;
const NODE_T = 0.72;

type Thread = {
  spread: number;   // -1..1, posición vertical de origen
  freq: number;
  phase: number;
  amp: number;
  speed: number;
  width: number;
  alpha: number;
};

function smoothstep(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

export default function ThreadField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let t0 = performance.now();
    let time = 0;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const threads: Thread[] = Array.from({ length: THREADS }, (_, i) => {
      const n = i / (THREADS - 1);        // 0..1
      const spread = (n - 0.5) * 2;       // -1..1
      const center = 1 - Math.abs(spread); // 1 en el hilo central
      return {
        spread,
        freq: 4.2 + n * 5.5,
        phase: i * 1.27,
        amp: 0.05 + Math.abs(spread) * 0.16,
        speed: 0.22 + n * 0.16,
        width: 0.7 + center * 1.5,
        alpha: 0.1 + center * 0.42,
      };
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
    };

    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    /** Posición del hilo `th` en el parámetro t (0..1). */
    const pointAt = (th: Thread, t: number, nodeX: number, nodeY: number) => {
      const x = t * w * 1.02 - w * 0.01;

      // Peso de convergencia: 1 exactamente en el nodo, 0 en los extremos.
      const reach = t < NODE_T ? NODE_T : 1 - NODE_T;
      const pull = smoothstep(1 - Math.abs(t - NODE_T) / reach);
      const pull2 = pull * pull;

      const startY = nodeY + th.spread * h * 0.42;
      const wave =
        Math.sin(t * th.freq + th.phase + time * th.speed) * h * th.amp +
        Math.cos(t * th.freq * 0.55 - time * th.speed * 0.8) * h * th.amp * 0.5;

      let y = startY + (nodeY - startY) * pull2 + wave * (1 - pull2);

      // Empuje del cursor: cae con la distancia y respeta el nodo.
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const dist = Math.hypot(dx, dy);
      const radius = Math.min(w, h) * 0.34;
      if (dist < radius) {
        const push = (1 - dist / radius) ** 2 * radius * 0.38 * (1 - pull2 * 0.85);
        y += (dy / (dist || 1)) * push;
      }

      return { x, y };
    };

    const draw = () => {
      const now = performance.now();
      if (!reduced) time += (now - t0) / 1000;
      t0 = now;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      ctx.clearRect(0, 0, w, h);

      const nodeX = w * NODE_T * 1.02 - w * 0.01;
      const nodeY = h * 0.52;

      ctx.globalCompositeOperation = "lighter";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      for (const th of threads) {
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, `rgba(69, 40, 115, 0)`);
        grad.addColorStop(0.25, `rgba(107, 63, 168, ${th.alpha * 0.8})`);
        grad.addColorStop(NODE_T, `rgba(200, 255, 77, ${th.alpha})`);
        grad.addColorStop(0.92, `rgba(69, 40, 115, ${th.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(69, 40, 115, 0)`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = th.width;

        for (let s = 0; s <= SEGMENTS; s++) {
          const { x, y } = pointAt(th, s / SEGMENTS, nodeX, nodeY);
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // ── El nodo ──────────────────────────────────────────────
      const breathe = reduced ? 0 : Math.sin(time * 1.1);

      const halo = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, 130);
      halo.addColorStop(0, "rgba(200, 255, 77, 0.16)");
      halo.addColorStop(0.4, "rgba(200, 255, 77, 0.05)");
      halo.addColorStop(1, "rgba(200, 255, 77, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 130, 0, Math.PI * 2);
      ctx.fill();

      // Anillo que respira
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 16 + breathe * 4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200, 255, 77, ${0.3 - breathe * 0.12})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Punto sólido
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#C8FF4D";
      ctx.shadowColor = "rgba(200, 255, 77, 0.9)";
      ctx.shadowBlur = 22;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);

    // No gastar ciclos con la pestaña o la sección fuera de vista.
    const io = new IntersectionObserver(
      ([entry]) => {
        const shouldRun = entry.isIntersecting && !document.hidden;
        if (shouldRun && !running) {
          running = true;
          t0 = performance.now();
          if (!reduced) raf = requestAnimationFrame(draw);
        } else if (!shouldRun) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        t0 = performance.now();
        if (!reduced) raf = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
