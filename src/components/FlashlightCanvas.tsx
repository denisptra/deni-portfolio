"use client";

import { useRef, useEffect } from "react";

interface Props {
  mouseX: number;
  mouseY: number;
  active: boolean;
  isMobile?: boolean;
  difficultyBoost?: number;
}

export default function FlashlightCanvas({ mouseX, mouseY, active, isMobile, difficultyBoost = 0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const radius = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const baseRadius = isMobile ? 160 : 250;
    const targetRadius = baseRadius + difficultyBoost * 80;
    const darkness = 0.78 - difficultyBoost * 0.2;

    const animate = () => {
      if (!active) {
        cancelAnimationFrame(raf.current);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      currentX.current = lerp(currentX.current, mouseX, 0.12);
      currentY.current = lerp(currentY.current, mouseY, 0.12);
      radius.current = lerp(radius.current, targetRadius, 0.05);

      const cx = currentX.current;
      const cy = currentY.current;
      const r = radius.current;

      // Dark overlay
      ctx.save();
      ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Flashlight hole
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, "rgba(0,0,0,1)");
      grad.addColorStop(0.25, "rgba(0,0,0,1)");
      grad.addColorStop(0.50, "rgba(0,0,0,0.7)");
      grad.addColorStop(0.75, "rgba(0,0,0,0.2)");
      grad.addColorStop(0.90, "rgba(0,0,0,0.03)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Warm glow
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.5);
      glow.addColorStop(0, "rgba(255, 248, 225, 0.22)");
      glow.addColorStop(0.4, "rgba(255, 242, 210, 0.10)");
      glow.addColorStop(1, "rgba(255, 235, 195, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      raf.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf.current);
  }, [mouseX, mouseY, active, isMobile, difficultyBoost]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[42] pointer-events-none"
    />
  );
}
