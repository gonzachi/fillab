"use client";

import React, { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Posición del puntero (mouse o touch)
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      mouseX = targetMouseX = width / 2;
      mouseY = targetMouseY = height / 2;
    };

    // Soporte de mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    // Soporte de touch para móvil
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.touches[0].clientX - rect.left;
      targetMouseY = e.touches[0].clientY - rect.top;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let step = 0;

    // Configuración de líneas: más variedad
    const lines = [
      { offset: -30, opacityBase: 0.12, lineWidth: 1.2, phaseShift: 0.0 },
      { offset: 20,  opacityBase: 0.22, lineWidth: 1.8, phaseShift: 0.5 },
      { offset: 65,  opacityBase: 0.10, lineWidth: 0.9, phaseShift: 1.1 },
    ];

    const render = () => {
      step += 0.010;

      // Suavizado del puntero
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const baseY = height * 0.58;

      lines.forEach((line, i) => {
        const startY = baseY + line.offset;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(61, 214, 188, ${line.opacityBase})`;
        ctx.lineWidth = line.lineWidth;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        const points = 120;
        for (let j = 0; j <= points; j++) {
          const x = (width / points) * j;

          // Influencia del cursor: radio generoso, deflexión sutil
          const distToMouse = Math.hypot(x - mouseX, startY - mouseY);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 400) * 50;

          const wave1 = Math.sin(step + j * 0.055 + line.phaseShift) * 32;
          const wave2 = Math.cos(step * 0.7 + j * 0.038 + line.phaseShift) * 18;
          const y = startY + wave1 + wave2 - mouseInfluence;

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Nodo de acento en la línea principal (índice 1)
        if (i === 1) {
          const nodeFrac = 0.82;
          const nodeJ = Math.round(nodeFrac * 120);
          const nodeX = (width / 120) * nodeJ;
          const nodeDist = Math.hypot(nodeX - mouseX, startY - mouseY);
          const nodeInfluence = Math.max(0, 1 - nodeDist / 400) * 50;
          const nw1 = Math.sin(step + nodeJ * 0.055 + line.phaseShift) * 32;
          const nw2 = Math.cos(step * 0.7 + nodeJ * 0.038 + line.phaseShift) * 18;
          const nodeY = startY + nw1 + nw2 - nodeInfluence;

          // Halo exterior
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 18, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(61, 214, 188, 0.08)";
          ctx.fill();

          // Halo interior
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 10, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(61, 214, 188, 0.18)";
          ctx.fill();

          // Punto sólido de acento
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#3DD6BC";
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
