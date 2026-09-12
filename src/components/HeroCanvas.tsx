"use client";

import React, { useEffect, useRef } from "react";

interface HeroCanvasProps {
  accentColor?: string;   // hex del punto de nodo, ej. "#C8FF4D"
  baseColor?: string;     // rgb del hilo, ej. "128, 77, 255"
}

export default function HeroCanvas({
  accentColor = "#C8FF4D",
  baseColor = "128, 77, 255",
}: HeroCanvasProps) {
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
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      mouseX = targetMouseX = width / 2;
      mouseY = targetMouseY = height / 2;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

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

    const lines = [
      { offset: -40, opacityBase: 0.10, lineWidth: 1.0, phaseShift: 0.0 },
      { offset: 10,  opacityBase: 0.20, lineWidth: 1.6, phaseShift: 0.5 },
      { offset: 60,  opacityBase: 0.08, lineWidth: 0.8, phaseShift: 1.1 },
    ];

    const render = () => {
      step += 0.010;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);
      const baseY = height * 0.58;

      lines.forEach((line, i) => {
        const startY = baseY + line.offset;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${baseColor}, ${line.opacityBase})`;
        ctx.lineWidth = line.lineWidth;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        const points = 120;
        for (let j = 0; j <= points; j++) {
          const x = (width / points) * j;
          const distToMouse = Math.hypot(x - mouseX, startY - mouseY);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 420) * 52;

          const wave1 = Math.sin(step + j * 0.055 + line.phaseShift) * 32;
          const wave2 = Math.cos(step * 0.7 + j * 0.038 + line.phaseShift) * 18;
          const y = startY + wave1 + wave2 - mouseInfluence;

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Nodo de acento en la línea principal
        if (i === 1) {
          const nodeJ = Math.round(0.82 * 120);
          const nodeX = (width / 120) * nodeJ;
          const nodeDist = Math.hypot(nodeX - mouseX, startY - mouseY);
          const nodeInfluence = Math.max(0, 1 - nodeDist / 420) * 52;
          const nw1 = Math.sin(step + nodeJ * 0.055 + line.phaseShift) * 32;
          const nw2 = Math.cos(step * 0.7 + nodeJ * 0.038 + line.phaseShift) * 18;
          const nodeY = startY + nw1 + nw2 - nodeInfluence;

          // Halo exterior
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 20, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${baseColor}, 0.06)`;
          ctx.fill();

          // Halo interior
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 11, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${baseColor}, 0.15)`;
          ctx.fill();

          // Punto sólido de acento (lima)
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 5, 0, Math.PI * 2);
          ctx.fillStyle = accentColor;
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
  }, [accentColor, baseColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
