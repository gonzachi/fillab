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

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let step = 0;

    const render = () => {
      step += 0.012;
      // Suavizado del mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Dibujar hilos orgánicos ondulantes (el "fil")
      const linesCount = 3;
      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        const offset = i * 40;
        const opacity = 0.15 + (i * 0.1);
        ctx.strokeStyle = `rgba(61, 214, 188, ${opacity})`;
        ctx.lineWidth = 1.8 - (i * 0.3);

        const startY = height * 0.55 + offset;
        ctx.moveTo(0, startY);

        const points = 100;
        let lastX = 0;
        let lastY = startY;

        for (let j = 0; j <= points; j++) {
          const x = (width / points) * j;
          // Influencia del mouse
          const distToMouse = Math.hypot(x - mouseX, startY - mouseY);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 380) * 45;

          const wave1 = Math.sin(step + j * 0.06 + i * 0.5) * 35;
          const wave2 = Math.cos(step * 0.8 + j * 0.04) * 20;
          const y = startY + wave1 + wave2 - mouseInfluence;

          ctx.lineTo(x, y);
          lastX = x;
          lastY = y;
        }

        ctx.stroke();

        // Si es el hilo principal, dibujar el nodo final (el punto de acento de Fil Lab)
        if (i === 1) {
          const nodeX = width * 0.85;
          const nodeDist = Math.hypot(nodeX - mouseX, startY - mouseY);
          const nodeInfluence = Math.max(0, 1 - nodeDist / 380) * 45;
          const wave1 = Math.sin(step + (nodeX / width) * 100 * 0.06 + i * 0.5) * 35;
          const wave2 = Math.cos(step * 0.8 + (nodeX / width) * 100 * 0.04) * 20;
          const nodeY = startY + wave1 + wave2 - nodeInfluence;

          // Halo
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 12, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(61, 214, 188, 0.2)";
          ctx.fill();

          // Punto sólido de acento
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 6, 0, Math.PI * 2);
          ctx.fillStyle = "#3DD6BC";
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
