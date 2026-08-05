"use client";

import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 2000,
      size: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      twinkleSpeed: Math.random() * 0.003 + 0.001,
      twinkleOffset: Math.random() * Math.PI * 2,
      brightness: Math.random() * 0.4 + 0.1,
    }));

    // Meteors
    interface Meteor {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number; active: boolean;
    }
    const meteors: Meteor[] = [];
    const spawnMeteor = () => {
      if (meteors.length >= 3) return;
      const side = Math.random();
      meteors.push({
        x: side < 0.5 ? Math.random() * w * 0.6 : -20,
        y: side < 0.5 ? -20 : Math.random() * h * 0.3,
        vx: (3 + Math.random() * 4) * (side < 0.5 ? 1 : 1),
        vy: (2 + Math.random() * 3),
        life: 0,
        maxLife: 60 + Math.random() * 40,
        size: 1 + Math.random() * 1.5,
        active: true,
      });
    };

    let meteorTimer = 0;
    const t = Date.now();

    const render = () => {
      const elapsed = (Date.now() - t) * 0.001;
      ctx.clearRect(0, 0, w, h);

      // Draw stars
      for (const s of stars) {
        const sx = (s.x % w + w) % w;
        const sy = (s.y % h + h) % h;
        const twinkle = Math.sin(elapsed * s.twinkleSpeed * 100 + s.twinkleOffset) * 0.5 + 0.5;
        const alpha = s.brightness * (0.5 + twinkle * 0.5);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross sparkle on bigger stars
        if (s.size > 1 && twinkle > 0.7) {
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.3})`;
          ctx.lineWidth = 0.3;
          const sparkLen = s.size * 2.5;
          ctx.beginPath();
          ctx.moveTo(sx - sparkLen, sy);
          ctx.lineTo(sx + sparkLen, sy);
          ctx.moveTo(sx, sy - sparkLen);
          ctx.lineTo(sx, sy + sparkLen);
          ctx.stroke();
        }
      }

      // Spawn meteors periodically
      meteorTimer++;
      if (meteorTimer > 180 + Math.random() * 240) {
        spawnMeteor();
        meteorTimer = 0;
      }

      // Draw meteors
      for (const m of meteors) {
        if (!m.active) continue;
        m.x += m.vx;
        m.y += m.vy;
        m.life++;

        const progress = m.life / m.maxLife;
        const alpha = progress < 0.2 ? progress / 0.2 : progress > 0.7 ? (1 - progress) / 0.3 : 1;

        // Meteor trail
        const trailLen = 40 + m.size * 15;
        const gradient = ctx.createLinearGradient(
          m.x, m.y,
          m.x - m.vx * trailLen * 0.3,
          m.y - m.vy * trailLen * 0.3
        );
        gradient.addColorStop(0, `rgba(255,255,255,${0.8 * alpha})`);
        gradient.addColorStop(0.1, `rgba(200,220,255,${0.5 * alpha})`);
        gradient.addColorStop(0.5, `rgba(150,180,255,${0.15 * alpha})`);
        gradient.addColorStop(1, `rgba(100,150,255,0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x - m.vx * trailLen * 0.3,
          m.y - m.vy * trailLen * 0.3
        );
        ctx.stroke();

        // Meteor head glow
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.size * 4);
        glow.addColorStop(0, `rgba(255,255,255,${0.6 * alpha})`);
        glow.addColorStop(0.5, `rgba(180,200,255,${0.2 * alpha})`);
        glow.addColorStop(1, "rgba(100,150,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(255,255,255,${0.9 * alpha})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        if (m.life >= m.maxLife) m.active = false;
      }

      // Remove dead meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        if (!meteors[i].active) meteors.splice(i, 1);
      }

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
