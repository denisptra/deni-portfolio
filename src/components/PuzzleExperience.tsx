"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AntiInspect from "./AntiInspect";

interface Props {
  onComplete: () => void;
}

type Scene =
  | "intro-1"
  | "intro-2"
  | "flashlight-intro"
  | "exploring"
  | "found-text-1"
  | "found-text-2"
  | "panda-appear"
  | "panda-wave"
  | "follow-text"
  | "follow-me"
  | "laptop-on"
  | "entering-website";

interface RoomObject {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  draw: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, hover: boolean, t: number) => void;
  reaction?: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, t: number) => void;
}

interface HidingSpot {
  x: number;
  y: number;
  type: "ears" | "eyes" | "paw" | "tail";
}

// ═══════════════════════════════════════════════════════
// ROOM DRAWING (3D Perspective)
// ═══════════════════════════════════════════════════════

function drawRoom(ctx: CanvasRenderingContext2D, w: number, h: number, mx: number, my: number) {
  // 3D perspective vanishing point (slightly off-center based on mouse)
  const vpx = w * 0.5 + (mx - w * 0.5) * 0.03;
  const vpy = h * 0.35 + (my - h * 0.5) * 0.02;

  // Back wall
  const bwLeft = w * 0.15;
  const bwRight = w * 0.85;
  const bwTop = h * 0.08;
  const bwBottom = h * 0.62;

  // Back wall gradient
  const wg = ctx.createLinearGradient(0, bwTop, 0, bwBottom);
  wg.addColorStop(0, "#1e1a16");
  wg.addColorStop(1, "#161310");
  ctx.fillStyle = wg;
  ctx.beginPath();
  ctx.moveTo(bwLeft, bwTop);
  ctx.lineTo(bwRight, bwTop);
  ctx.lineTo(bwRight, bwBottom);
  ctx.lineTo(bwLeft, bwBottom);
  ctx.closePath();
  ctx.fill();

  // Back wall subtle brick pattern
  ctx.strokeStyle = "rgba(255,255,255,0.006)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 20; i++) {
    const y = bwTop + (i / 20) * (bwBottom - bwTop);
    ctx.beginPath();
    ctx.moveTo(bwLeft, y);
    ctx.lineTo(bwRight, y);
    ctx.stroke();
  }
  for (let i = 0; i < 12; i++) {
    const x = bwLeft + (i / 12) * (bwRight - bwLeft);
    ctx.beginPath();
    ctx.moveTo(x, bwTop);
    ctx.lineTo(x, bwBottom);
    ctx.stroke();
  }

  // Left wall (perspective)
  const lg = ctx.createLinearGradient(0, 0, w * 0.15, 0);
  lg.addColorStop(0, "#0e0c09");
  lg.addColorStop(1, "#1a1612");
  ctx.fillStyle = lg;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(bwLeft, bwTop);
  ctx.lineTo(bwLeft, bwBottom);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  // Left wall texture
  ctx.strokeStyle = "rgba(255,255,255,0.004)";
  ctx.lineWidth = 0.4;
  for (let i = 0; i < 8; i++) {
    const t = i / 8;
    const lx1 = bwLeft * (1 - t);
    const ly1 = bwTop + (0 - bwTop) * t;
    const lx2 = bwLeft * (1 - t);
    const ly2 = bwBottom + (h - bwBottom) * t;
    ctx.beginPath();
    ctx.moveTo(lx1, ly1);
    ctx.lineTo(lx2, ly2);
    ctx.stroke();
  }

  // Right wall (perspective)
  const rg = ctx.createLinearGradient(w * 0.85, 0, w, 0);
  rg.addColorStop(0, "#1a1612");
  rg.addColorStop(1, "#0e0c09");
  ctx.fillStyle = rg;
  ctx.beginPath();
  ctx.moveTo(w, 0);
  ctx.lineTo(bwRight, bwTop);
  ctx.lineTo(bwRight, bwBottom);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Right wall texture
  ctx.strokeStyle = "rgba(255,255,255,0.004)";
  for (let i = 0; i < 8; i++) {
    const t = i / 8;
    const rx1 = bwRight + (w - bwRight) * t;
    const ry1 = bwTop + (0 - bwTop) * t;
    const rx2 = bwRight + (w - bwRight) * t;
    const ry2 = bwBottom + (h - bwBottom) * t;
    ctx.beginPath();
    ctx.moveTo(rx1, ry1);
    ctx.lineTo(rx2, ry2);
    ctx.stroke();
  }

  // Baseboard
  ctx.fillStyle = "#3a2a18";
  ctx.beginPath();
  ctx.moveTo(bwLeft, bwBottom);
  ctx.lineTo(bwRight, bwBottom);
  ctx.lineTo(bwRight, bwBottom + h * 0.025);
  ctx.lineTo(bwLeft, bwBottom + h * 0.025);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  ctx.fillRect(bwLeft, bwBottom, bwRight - bwLeft, 1);

  // Floor (perspective)
  const fg = ctx.createLinearGradient(0, bwBottom, 0, h);
  fg.addColorStop(0, "#2a1a0c");
  fg.addColorStop(1, "#1a1005");
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.moveTo(bwLeft, bwBottom);
  ctx.lineTo(bwRight, bwBottom);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  // Floor perspective planks
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 0.5;
  const planks = 10;
  for (let i = 0; i <= planks; i++) {
    const t = i / planks;
    const fx1 = bwLeft + (0 - bwLeft) * t;
    const fy1 = bwBottom;
    const fx2 = w * 0 + (w - 0) * t;
    const fy2 = h;
    ctx.beginPath();
    ctx.moveTo(bwLeft + (bwRight - bwLeft) * t, bwBottom);
    ctx.lineTo(0 + w * t, h);
    ctx.stroke();
  }
  // Horizontal floor lines
  for (let i = 0; i < 6; i++) {
    const t = (i + 1) / 7;
    const y = bwBottom + (h - bwBottom) * t;
    const spread = t * 0.5;
    ctx.beginPath();
    ctx.moveTo(bwLeft * (1 - spread), y);
    ctx.lineTo(bwRight + (w - bwRight) * spread, y);
    ctx.stroke();
  }

  // Ceiling (perspective)
  const cg = ctx.createLinearGradient(0, 0, 0, bwTop);
  cg.addColorStop(0, "#0a0808");
  cg.addColorStop(1, "#141210");
  ctx.fillStyle = cg;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w, 0);
  ctx.lineTo(bwRight, bwTop);
  ctx.lineTo(bwLeft, bwTop);
  ctx.closePath();
  ctx.fill();

  // Ambient light from "above"
  const ambientGlow = ctx.createRadialGradient(vpx, bwTop, 0, vpx, bwTop, w * 0.4);
  ambientGlow.addColorStop(0, "rgba(255,240,200,0.015)");
  ambientGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = ambientGlow;
  ctx.fillRect(0, 0, w, h);
}

// ═══════════════════════════════════════════════════════
// OBJECTS
// ═══════════════════════════════════════════════════════

function createObjects(): RoomObject[] {
  const items: RoomObject[] = [];
  const add = (o: RoomObject) => items.push(o);

  add({ id: "laptop", x: 38, y: 28, w: 24, h: 18,
    draw: (ctx, x, y, w, h, hover, t) => {
      ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+3, w*0.52, 5, 0, 0, Math.PI*2); ctx.fill();
      const bg = ctx.createLinearGradient(x, y+h*0.75, x, y+h); bg.addColorStop(0, "#555"); bg.addColorStop(1, "#333");
      ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(x, y+h*0.75, w, h*0.25, 3); ctx.fill();
      const sg = ctx.createLinearGradient(x, y, x, y+h*0.75); sg.addColorStop(0, "#222"); sg.addColorStop(1, "#111");
      ctx.fillStyle = sg; ctx.beginPath(); ctx.roundRect(x+1, y, w-2, h*0.75, [6,6,0,0]); ctx.fill();
      ctx.fillStyle = hover ? "rgba(20,35,50,0.2)" : "rgba(20,35,50,0.1)";
      ctx.fillRect(x+4, y+3, w-8, h*0.7-3);
      if (hover) { const g = ctx.createRadialGradient(x+w/2, y+h*0.35, 0, x+w/2, y+h*0.35, w*0.5); g.addColorStop(0, "rgba(60,120,200,0.1)"); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(x+4, y+3, w-8, h*0.7-3); }
      ctx.fillStyle = "rgba(80,160,240,0.06)";
      for (let i = 0; i < 5; i++) { ctx.fillRect(x+8, y+8+i*((h*0.6)/5), (w-14)*(0.3+Math.random()*0.6), 1.5); }
      ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.font = `${Math.max(5,w*0.04)}px system-ui`; ctx.textAlign = "center"; ctx.fillText("DENI", x+w/2, y+h*0.73);
    }
  });

  add({ id: "coffee", x: 28, y: 33, w: 7, h: 9,
    draw: (ctx, x, y, w, h, hover, t) => {
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.52, 2, 0, 0, Math.PI*2); ctx.fill();
      const cg = ctx.createLinearGradient(x, y, x+w, y); cg.addColorStop(0, "#f0f0f0"); cg.addColorStop(1, "#ddd");
      ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(x+1, y+2); ctx.quadraticCurveTo(x, y+h*0.7, x+2, y+h); ctx.lineTo(x+w-2, y+h); ctx.quadraticCurveTo(x+w, y+h*0.7, x+w-1, y+2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#3a2010"; ctx.beginPath(); ctx.ellipse(x+w/2, y+3, w/2-2, 2, 0, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#ddd"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x+w+2, y+h*0.5, 3, -0.6, 0.6); ctx.stroke();
      if (hover) { ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.6; for (let i = 0; i < 3; i++) { const sx = x+w*0.25+i*w*0.25; const p = t*0.004+i; ctx.beginPath(); ctx.moveTo(sx, y); ctx.bezierCurveTo(sx+Math.sin(p)*3, y-7, sx-Math.sin(p)*2, y-14, sx+Math.sin(p+1)*2, y-20); ctx.stroke(); } }
    },
    reaction: (ctx, x, y, w, h, t) => {
      ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 0.6;
      for (let i = 0; i < 3; i++) { const sx = x+w*0.25+i*w*0.25; const p = t*0.005+i; ctx.beginPath(); ctx.moveTo(sx, y); ctx.bezierCurveTo(sx+Math.sin(p)*4, y-9, sx-Math.sin(p)*3, y-18, sx+Math.sin(p+1)*3, y-26); ctx.stroke(); }
    }
  });

  add({ id: "robot", x: 76, y: 30, w: 8, h: 14,
    draw: (ctx, x, y, w, h, hover, t) => {
      ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.45, 3, 0, 0, Math.PI*2); ctx.fill();
      const bg = ctx.createLinearGradient(x, y+h*0.35, x, y+h); bg.addColorStop(0, "#777"); bg.addColorStop(1, "#555");
      ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(x+w*0.15, y+h*0.35, w*0.7, h*0.55, 3); ctx.fill();
      ctx.fillStyle = "#888"; ctx.beginPath(); ctx.roundRect(x+w*0.2, y, w*0.6, h*0.38, 4); ctx.fill();
      const blink = Math.sin(t*0.002) > 0.95;
      if (blink) { ctx.fillStyle = "#333"; ctx.fillRect(x+w*0.28, y+h*0.12, w*0.15, 1.5); ctx.fillRect(x+w*0.57, y+h*0.12, w*0.15, 1.5); }
      else { ctx.fillStyle = hover ? "#ff4444" : "#3b82f6"; ctx.beginPath(); ctx.arc(x+w*0.35, y+h*0.14, 2.5, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(x+w*0.65, y+h*0.14, 2.5, 0, Math.PI*2); ctx.fill(); }
      ctx.fillStyle = "#444"; ctx.fillRect(x+w*0.35, y+h*0.24, w*0.3, 2);
      ctx.fillStyle = "#666"; ctx.fillRect(x, y+h*0.4, w*0.15, h*0.3); ctx.fillRect(x+w*0.85, y+h*0.4, w*0.15, h*0.3);
      ctx.strokeStyle = "#888"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x+w/2, y); ctx.lineTo(x+w/2, y-4); ctx.stroke();
      ctx.fillStyle = hover ? "#ff4444" : "#ef4444"; ctx.beginPath(); ctx.arc(x+w/2, y-5, 2, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "controller", x: 14, y: 40, w: 12, h: 10,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.22)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.48, 2.5, 0, 0, Math.PI*2); ctx.fill();
      const cg = ctx.createRadialGradient(x+w/2, y+h/2, 0, x+w/2, y+h/2, w*0.6); cg.addColorStop(0, "#444"); cg.addColorStop(1, "#222");
      ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(x+w*0.15, y+h*0.2); ctx.quadraticCurveTo(x, y+h*0.5, x+w*0.05, y+h*0.9); ctx.lineTo(x+w*0.35, y+h); ctx.lineTo(x+w*0.65, y+h); ctx.lineTo(x+w*0.95, y+h*0.9); ctx.quadraticCurveTo(x+w, y+h*0.5, x+w*0.85, y+h*0.2); ctx.quadraticCurveTo(x+w*0.5, y, x+w*0.15, y+h*0.2); ctx.fill();
      ctx.fillStyle = "#333"; ctx.fillRect(x+w*0.18, y+h*0.35, w*0.15, w*0.06); ctx.fillRect(x+w*0.22, y+h*0.3, w*0.06, w*0.15);
      const bc = ["#ef4444","#22c55e","#3b82f6","#eab308"];
      for (let i = 0; i < 4; i++) { const a = (i/4)*Math.PI*2+Math.PI/4; ctx.fillStyle = hover ? bc[i] : "#333"; ctx.beginPath(); ctx.arc(x+w*0.7+Math.cos(a)*w*0.1, y+h*0.4+Math.sin(a)*h*0.15, 2, 0, Math.PI*2); ctx.fill(); }
      ctx.fillStyle = "#333"; ctx.beginPath(); ctx.arc(x+w*0.35, y+h*0.65, 2.5, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(x+w*0.65, y+h*0.65, 2.5, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "camera", x: 82, y: 36, w: 10, h: 8,
    draw: (ctx, x, y, w, h, hover, t) => {
      ctx.fillStyle = "rgba(0,0,0,0.22)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.45, 2.5, 0, 0, Math.PI*2); ctx.fill();
      const cg = ctx.createLinearGradient(x, y, x, y+h); cg.addColorStop(0, "#333"); cg.addColorStop(1, "#1a1a1a");
      ctx.fillStyle = cg; ctx.beginPath(); ctx.roundRect(x, y, w, h, 2); ctx.fill();
      ctx.fillStyle = "#222"; ctx.fillRect(x, y, w*0.25, h);
      ctx.fillStyle = "#444"; ctx.beginPath(); ctx.arc(x+w*0.6, y+h/2, w*0.22, 0, Math.PI*2); ctx.fill();
      const lg = ctx.createRadialGradient(x+w*0.6, y+h/2, 0, x+w*0.6, y+h/2, w*0.18); lg.addColorStop(0, "#1a2a4a"); lg.addColorStop(1, "#333");
      ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(x+w*0.6, y+h/2, w*0.18, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "rgba(100,150,220,0.12)"; ctx.beginPath(); ctx.arc(x+w*0.55, y+h*0.4, w*0.06, 0, Math.PI*2); ctx.fill();
      if (hover) { ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 0.4; for (let i = 0; i < 8; i++) { const a = t*0.001+(i/8)*Math.PI*2; ctx.beginPath(); ctx.arc(x+w*0.6, y+h/2, w*0.2, a, a+0.3); ctx.stroke(); } }
      ctx.fillStyle = "#555"; ctx.fillRect(x+w*0.75, y+1, w*0.15, h*0.25);
    }
  });

  add({ id: "keyboard", x: 34, y: 43, w: 18, h: 7,
    draw: (ctx, x, y, w, h, hover, t) => {
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.48, 2.5, 0, 0, Math.PI*2); ctx.fill();
      const kg = ctx.createLinearGradient(x, y, x, y+h); kg.addColorStop(0, "#2a2a2a"); kg.addColorStop(1, "#1a1a1a");
      ctx.fillStyle = kg; ctx.beginPath(); ctx.roundRect(x, y, w, h, 3); ctx.fill();
      const cols = 12, rows = 3, kw = (w-4)/cols, kh = (h-3)/rows;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        if (hover) { ctx.fillStyle = `hsla(${((c+r*cols)*30+t*0.05)%360},70%,50%,0.06)`; ctx.beginPath(); ctx.roundRect(x+2+c*kw-0.5, y+1.5+r*kh-0.5, kw-0.5, kh-1, 1); ctx.fill(); }
        ctx.fillStyle = hover ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"; ctx.beginPath(); ctx.roundRect(x+2+c*kw, y+1.5+r*kh, kw-1, kh-1.5, 1); ctx.fill();
      }
    }
  });

  add({ id: "headphones", x: 8, y: 20, w: 10, h: 14,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.45, 2.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = hover ? "#555" : "#333"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x+2, y+h*0.5); ctx.quadraticCurveTo(x+w/2, y-2, x+w-2, y+h*0.5); ctx.stroke();
      ctx.fillStyle = "#333"; ctx.beginPath(); ctx.ellipse(x+2, y+h*0.55, w*0.22, h*0.2, 0, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.ellipse(x+w-2, y+h*0.55, w*0.22, h*0.2, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.03)"; ctx.beginPath(); ctx.ellipse(x+2, y+h*0.55, w*0.12, h*0.12, 0, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.ellipse(x+w-2, y+h*0.55, w*0.12, h*0.12, 0, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "lamp", x: 4, y: 28, w: 8, h: 18,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.5, 2, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#555"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h, w*0.45, 3, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#666"; ctx.fillRect(x+w/2-1.5, y+h*0.35, 3, h*0.65);
      ctx.strokeStyle = "#666"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x+w/2, y+h*0.35); ctx.lineTo(x+w*0.8, y+h*0.15); ctx.stroke();
      const sg = ctx.createLinearGradient(x, y, x, y+h*0.2); sg.addColorStop(0, "#776655"); sg.addColorStop(1, "#5a4a3a");
      ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(x+w*0.5, y+h*0.2); ctx.lineTo(x+w*0.8, y); ctx.lineTo(x+w, y+h*0.2); ctx.closePath(); ctx.fill();
      if (hover) { const lg = ctx.createRadialGradient(x+w*0.8, y+h*0.1, 0, x+w*0.8, y+h*0.1, w*1.5); lg.addColorStop(0, "rgba(255,240,200,0.1)"); lg.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = lg; ctx.fillRect(x-w, y-h*0.2, w*3, h*0.8); }
    }
  });

  add({ id: "notebook", x: 66, y: 35, w: 10, h: 14,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.beginPath(); ctx.roundRect(x+3, y+3, w, h, 2); ctx.fill();
      const ng = ctx.createLinearGradient(x, y, x+w, y); ng.addColorStop(0, "#1a3a5a"); ng.addColorStop(1, "#0a2a4a");
      ctx.fillStyle = ng; ctx.beginPath(); ctx.roundRect(x, y, w, h, 2); ctx.fill();
      ctx.fillStyle = "#f5f0e8"; ctx.fillRect(x+2, y+2, w-4, h-4);
      ctx.strokeStyle = "rgba(100,150,200,0.12)"; ctx.lineWidth = 0.3;
      for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x+3, y+4+i*(h-6)/8); ctx.lineTo(x+w-3, y+4+i*(h-6)/8); ctx.stroke(); }
      ctx.strokeStyle = "#cc3333"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x+w*0.85, y); ctx.lineTo(x+w*0.85, y+h); ctx.stroke();
    }
  });

  add({ id: "tablet", x: 60, y: 42, w: 14, h: 10,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.beginPath(); ctx.roundRect(x+4, y+4, w, h, 3); ctx.fill();
      ctx.fillStyle = "#1a1a1a"; ctx.beginPath(); ctx.roundRect(x, y, w, h, 3); ctx.fill();
      ctx.fillStyle = "#0a0a0a"; ctx.beginPath(); ctx.roundRect(x+2, y+2, w-4, h-4, 2); ctx.fill();
      if (hover) { const tg = ctx.createRadialGradient(x+w/2, y+h/2, 0, x+w/2, y+h/2, w*0.5); tg.addColorStop(0, "rgba(80,160,240,0.04)"); tg.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = tg; ctx.fillRect(x+2, y+2, w-4, h-4); }
      for (let i = 0; i < 6; i++) { ctx.fillStyle = hover ? "#333" : "#222"; ctx.beginPath(); ctx.arc(x+w-3, y+3+i*(h-6)/5, 1.5, 0, Math.PI*2); ctx.fill(); }
    }
  });

  add({ id: "stickies", x: 52, y: 15, w: 10, h: 10,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.4, 2, 0, 0, Math.PI*2); ctx.fill();
      const colors = ["#fef08a","#fca5a5","#86efac","#93c5fd"];
      for (let i = 0; i < 4; i++) {
        const sx = x+(i%2)*w*0.5, sy = y+Math.floor(i/2)*h*0.5, sw = w*0.55, sh = h*0.55;
        ctx.save(); ctx.translate(sx+sw/2, sy+sh/2); ctx.rotate((i-1.5)*0.05);
        ctx.fillStyle = colors[i]; ctx.globalAlpha = hover ? 0.3 : 0.15; ctx.fillRect(-sw/2, -sh/2, sw, sh);
        ctx.fillStyle = "rgba(0,0,0,0.12)"; for (let j = 0; j < 3; j++) ctx.fillRect(-sw/2+3, -sh/2+4+j*4, sw*0.7, 1);
        ctx.globalAlpha = 1; ctx.restore();
      }
    }
  });

  add({ id: "sketchbook", x: 12, y: 48, w: 10, h: 12,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.beginPath(); ctx.roundRect(x+3, y+3, w, h, 2); ctx.fill();
      ctx.fillStyle = "#222"; ctx.beginPath(); ctx.roundRect(x, y, w, h, 2); ctx.fill();
      ctx.fillStyle = "#f5f0e8"; ctx.fillRect(x+1, y+1, w-2, h-2);
      ctx.strokeStyle = "rgba(100,100,100,0.15)"; ctx.lineWidth = 0.4;
      ctx.beginPath(); ctx.arc(x+w/2, y+h*0.4, w*0.2, 0, Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x+w*0.38, y+h*0.35, 0.8, 0, Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x+w*0.58, y+h*0.35, 0.8, 0, Math.PI*2); ctx.stroke();
      ctx.strokeStyle = "#888"; ctx.lineWidth = 0.6;
      for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(x-1, y+2+i*(h-4)/4, 1.5, -Math.PI*0.5, Math.PI*0.5); ctx.stroke(); }
    }
  });

  add({ id: "plant", x: 88, y: 42, w: 7, h: 10,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.45, 2.5, 0, 0, Math.PI*2); ctx.fill();
      const pg = ctx.createLinearGradient(x, y+h*0.55, x, y+h); pg.addColorStop(0, "#c2703a"); pg.addColorStop(1, "#a05a2a");
      ctx.fillStyle = pg; ctx.beginPath(); ctx.moveTo(x+1, y+h*0.55); ctx.lineTo(x, y+h); ctx.lineTo(x+w, y+h); ctx.lineTo(x+w-1, y+h*0.55); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#d08040"; ctx.fillRect(x-0.5, y+h*0.52, w+1, h*0.06);
      const lc = ["#2d6a1e","#3a8a2a","#2a7a1a"];
      for (let i = 0; i < 5; i++) { const a = (i/5)*Math.PI-Math.PI/2+(i%2?0.2:-0.2); const l = h*(0.25+(i%3)*0.05); ctx.fillStyle = lc[i%3]; ctx.beginPath(); ctx.ellipse(x+w/2+Math.cos(a)*l*0.6, y+h*0.45+Math.sin(a)*l*0.5, l*0.18, l*0.4, a, 0, Math.PI*2); ctx.fill(); }
    }
  });

  add({ id: "ball", x: 95, y: 52, w: 5, h: 5,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.42, 2, 0, 0, Math.PI*2); ctx.fill();
      const bg = ctx.createRadialGradient(x+w*0.35, y+h*0.35, 0, x+w/2, y+h/2, w/2); bg.addColorStop(0, "#4a8aca"); bg.addColorStop(1, "#2a5a8a");
      ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(x+w/2, y+h/2, w/2, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.beginPath(); ctx.arc(x+w*0.35, y+h*0.35, w*0.12, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "shoes", x: 86, y: 49, w: 8, h: 5,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.22)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.52, 2.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1a1a1a"; ctx.beginPath(); ctx.ellipse(x+w*0.3, y+h/2, w*0.35, h/2, 0.1, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#222"; ctx.beginPath(); ctx.ellipse(x+w*0.7, y+h/2, w*0.35, h/2, -0.1, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "backpack", x: 32, y: 74, w: 10, h: 14,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.28)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+3, w*0.52, 3.5, 0, 0, Math.PI*2); ctx.fill();
      const bg = ctx.createLinearGradient(x, y, x+w, y); bg.addColorStop(0, "#2a4a6a"); bg.addColorStop(1, "#1a3a5a");
      ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(x, y, w, h, 4); ctx.fill();
      ctx.fillStyle = "#1a3050"; ctx.beginPath(); ctx.roundRect(x+w*0.1, y+h*0.5, w*0.8, h*0.4, 3); ctx.fill();
      ctx.strokeStyle = "#888"; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(x+w*0.15, y+h*0.5); ctx.lineTo(x+w*0.85, y+h*0.5); ctx.stroke();
    }
  });

  add({ id: "trash", x: 0, y: 62, w: 6, h: 8,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.22)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.48, 2.5, 0, 0, Math.PI*2); ctx.fill();
      const cg = ctx.createLinearGradient(x, y, x+w, y); cg.addColorStop(0, "#555"); cg.addColorStop(1, "#444");
      ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(x+1, y); ctx.lineTo(x-1, y+h); ctx.lineTo(x+w+1, y+h); ctx.lineTo(x+w-1, y); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#777"; ctx.beginPath(); ctx.ellipse(x+w/2, y, w/2, 1.5, 0, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "clock", x: 48, y: 0, w: 7, h: 7,
    draw: (ctx, x, y, w, h, _, t) => {
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.42, 1.5, 0, 0, Math.PI*2); ctx.fill();
      const cg = ctx.createRadialGradient(x+w/2, y+h/2, 0, x+w/2, y+h/2, w/2); cg.addColorStop(0, "#fff"); cg.addColorStop(1, "#ccc");
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x+w/2, y+h/2, w/2, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#333"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x+w/2, y+h/2, w/2, 0, Math.PI*2); ctx.stroke();
      const now = new Date();
      const ha = ((now.getHours()%12)/12+now.getMinutes()/720)*Math.PI*2-Math.PI/2;
      const ma = (now.getMinutes()/60)*Math.PI*2-Math.PI/2;
      ctx.strokeStyle = "#111"; ctx.lineWidth = 1.5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(x+w/2, y+h/2); ctx.lineTo(x+w/2+Math.cos(ha)*w*0.22, y+h/2+Math.sin(ha)*h*0.22); ctx.stroke();
      ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(x+w/2, y+h/2); ctx.lineTo(x+w/2+Math.cos(ma)*w*0.32, y+h/2+Math.sin(ma)*h*0.32); ctx.stroke();
    }
  });

  add({ id: "window", x: 58, y: 1, w: 12, h: 14,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "#4a4a4a"; ctx.fillRect(x-2, y-2, w+4, h+4);
      ctx.fillStyle = "#1a2a3a"; ctx.fillRect(x, y, w/2-1, h); ctx.fillRect(x+w/2+1, y, w/2-1, h);
      const mg = ctx.createRadialGradient(x+w*0.7, y+h*0.3, 0, x+w*0.7, y+h*0.3, w*0.3); mg.addColorStop(0, "rgba(200,220,255,0.06)"); mg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = mg; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "#4a4a4a"; ctx.fillRect(x+w/2-1, y, 2, h); ctx.fillRect(x, y+h/2-1, w, 2);
      ctx.fillStyle = "#3a2a20";
      const cg1 = ctx.createLinearGradient(x-15, 0, x+5, 0); cg1.addColorStop(0, "#3a2a20"); cg1.addColorStop(1, "rgba(58,42,32,0)");
      ctx.fillStyle = cg1; ctx.fillRect(x-15, y-5, 20, h+10);
      const cg2 = ctx.createLinearGradient(x+w-5, 0, x+w+15, 0); cg2.addColorStop(0, "rgba(58,42,32,0)"); cg2.addColorStop(1, "#3a2a20");
      ctx.fillStyle = cg2; ctx.fillRect(x+w-5, y-5, 20, h+10);
      ctx.fillStyle = "#5a4a3a"; ctx.fillRect(x-18, y-6, w+36, 3);
    }
  });

  add({ id: "frame", x: 15, y: 3, w: 12, h: 10,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.4, 1.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#4a3a2a"; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "#2a3a4a"; ctx.fillRect(x+3, y+3, w-6, h-6);
      ctx.fillStyle = "rgba(100,150,200,0.12)"; ctx.beginPath(); ctx.arc(x+w*0.35, y+h*0.4, w*0.12, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "rgba(200,100,80,0.1)"; ctx.beginPath(); ctx.arc(x+w*0.6, y+h*0.55, w*0.1, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "mug", x: 44, y: 49, w: 6, h: 6,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.42, 1.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.roundRect(x, y, w, h, 2); ctx.fill();
      ctx.fillStyle = "#3a2010"; ctx.beginPath(); ctx.ellipse(x+w/2, y+1.5, w/2-1.5, 1.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#ddd"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x+w+1.5, y+h/2, 2, -0.5, 0.5); ctx.stroke();
    }
  });

  add({ id: "tissue", x: 48, y: 49, w: 5, h: 4,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.4, 1, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#ddd"; ctx.beginPath(); ctx.roundRect(x, y, w, h, 1.5); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.fillRect(x+w/2-0.8, y-1.5, 1.6, 2);
    }
  });

  add({ id: "remote", x: 70, y: 58, w: 4, h: 8,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.4, 1.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1a1a1a"; ctx.beginPath(); ctx.roundRect(x, y, w, h, 1.5); ctx.fill();
      for (let i = 0; i < 4; i++) { ctx.fillStyle = "#333"; ctx.beginPath(); ctx.arc(x+w/2, y+2+i*2, 0.8, 0, Math.PI*2); ctx.fill(); }
    }
  });

  add({ id: "newspaper", x: 36, y: 49, w: 10, h: 7,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.42, 1.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.save(); ctx.translate(x+w/2, y+h/2); ctx.rotate(0.05);
      ctx.fillStyle = "#ccbb99"; ctx.fillRect(-w/2, -h/2, w, h);
      ctx.fillStyle = "#aa9977"; for (let i = 0; i < 5; i++) ctx.fillRect(-w/2+2, -h/2+2+i*(h-4)/5, w-4, 0.6);
      ctx.fillStyle = "#8a7a5a"; ctx.fillRect(-w/2+2, -h/2+1, w*0.5, 1.2);
      ctx.restore();
    }
  });

  // === EXTRA ITEMS FOR MORE DIFFICULTY ===

  add({ id: "glasses", x: 22, y: 44, w: 7, h: 3,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.4, 1, 0, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = hover ? "#888" : "#555"; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.ellipse(x+w*0.25, y+h/2, w*0.22, h*0.4, 0, 0, Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x+w*0.75, y+h/2, w*0.22, h*0.4, 0, 0, Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+w*0.47, y+h/2); ctx.lineTo(x+w*0.53, y+h/2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+w*0.03, y+h/2); ctx.lineTo(x-w*0.05, y+h*0.3); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+w*0.97, y+h/2); ctx.lineTo(x+w*1.05, y+h*0.3); ctx.stroke();
    }
  });

  add({ id: "penholder", x: 40, y: 40, w: 5, h: 7,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.4, 1.5, 0, 0, Math.PI*2); ctx.fill();
      const pg = ctx.createLinearGradient(x, y, x+w, y); pg.addColorStop(0, "#4a4a4a"); pg.addColorStop(1, "#333");
      ctx.fillStyle = pg; ctx.beginPath(); ctx.roundRect(x, y+h*0.3, w, h*0.7, 2); ctx.fill();
      ctx.fillStyle = "#555"; ctx.fillRect(x, y+h*0.28, w, h*0.06);
      const pens = ["#e74c3c","#3498db","#2ecc71","#f1c40f"];
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = pens[i]; ctx.fillRect(x+1+i*(w-2)/4, y, 1, h*0.35);
      }
    }
  });

  add({ id: "bookstack", x: 70, y: 44, w: 8, h: 10,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.45, 2, 0, 0, Math.PI*2); ctx.fill();
      const colors = ["#8B4513","#2c3e50","#1a5276","#7d3c98"];
      for (let i = 0; i < 4; i++) {
        const bh = h/4 - 0.5;
        ctx.fillStyle = colors[i]; ctx.fillRect(x, y+i*(bh+0.5), w, bh);
        ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.lineWidth = 0.3;
        ctx.strokeRect(x, y+i*(bh+0.5), w, bh);
      }
    }
  });

  add({ id: "figurine", x: 92, y: 35, w: 5, h: 8,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+2, w*0.4, 1.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#666"; ctx.beginPath(); ctx.roundRect(x+w*0.2, y+h*0.6, w*0.6, h*0.4, 2); ctx.fill();
      ctx.fillStyle = hover ? "#8a8a8a" : "#555"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h*0.4, w*0.3, h*0.25, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#444"; ctx.beginPath(); ctx.arc(x+w/2, y+h*0.18, w*0.2, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = hover ? "#ff6b6b" : "#333"; ctx.beginPath(); ctx.arc(x+w*0.38, y+h*0.16, 1, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(x+w*0.62, y+h*0.16, 1, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "wallshelf", x: 40, y: 5, w: 16, h: 4,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.35, 1, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#5a4a3a"; ctx.fillRect(x, y+h*0.6, w, h*0.4);
      ctx.fillStyle = "rgba(255,255,255,0.03)"; ctx.fillRect(x, y+h*0.55, w, 1);
      ctx.fillStyle = "#3a3a3a"; ctx.fillRect(x+w*0.1, y, w*0.2, h*0.6);
      ctx.fillStyle = "#4a3a2a"; ctx.fillRect(x+w*0.4, y+h*0.1, w*0.15, h*0.5);
      ctx.fillStyle = "#2a4a3a"; ctx.fillRect(x+w*0.65, y+h*0.2, w*0.2, h*0.4);
    }
  });

  add({ id: "mousepad", x: 56, y: 43, w: 8, h: 7,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.42, 1.5, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1a1a2a"; ctx.beginPath(); ctx.roundRect(x, y, w, h, 2); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.lineWidth = 0.5; ctx.strokeRect(x+1, y+1, w-2, h-2);
      ctx.fillStyle = "#333"; ctx.beginPath(); ctx.roundRect(x+w*0.35, y+h*0.15, w*0.3, h*0.35, 3); ctx.fill();
      ctx.fillStyle = "#444"; ctx.beginPath(); ctx.roundRect(x+w*0.38, y+h*0.5, w*0.24, h*0.15, 1); ctx.fill();
    }
  });

  add({ id: "speaker", x: 4, y: 42, w: 5, h: 8,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.4, 1.5, 0, 0, Math.PI*2); ctx.fill();
      const sg = ctx.createLinearGradient(x, y, x+w, y); sg.addColorStop(0, "#2a2a2a"); sg.addColorStop(1, "#1a1a1a");
      ctx.fillStyle = sg; ctx.beginPath(); ctx.roundRect(x, y, w, h, 2); ctx.fill();
      ctx.fillStyle = hover ? "#333" : "#222"; ctx.beginPath(); ctx.arc(x+w/2, y+h*0.35, w*0.3, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#444"; ctx.beginPath(); ctx.arc(x+w/2, y+h*0.35, w*0.15, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = hover ? "rgba(59,130,246,0.15)" : "#1a1a1a"; ctx.beginPath(); ctx.arc(x+w/2, y+h*0.7, w*0.18, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "charger", x: 78, y: 56, w: 4, h: 5,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.4, 1, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#f5f5f0"; ctx.beginPath(); ctx.roundRect(x, y, w, h, 1); ctx.fill();
      ctx.fillStyle = "#ddd"; ctx.fillRect(x+w*0.3, y+h*0.2, w*0.4, h*0.15);
      ctx.strokeStyle = "#888"; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(x+w/2, y+h); ctx.quadraticCurveTo(x+w/2+3, y+h+4, x+w/2+6, y+h+2); ctx.stroke();
    }
  });

  add({ id: "coin", x: 18, y: 55, w: 3, h: 3,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.35, 1, 0, 0, Math.PI*2); ctx.fill();
      const cg = ctx.createRadialGradient(x+w*0.4, y+h*0.4, 0, x+w/2, y+h/2, w/2); cg.addColorStop(0, "#f0d060"); cg.addColorStop(1, "#c0a030");
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x+w/2, y+h/2, w/2, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#a08020"; ctx.lineWidth = 0.4; ctx.beginPath(); ctx.arc(x+w/2, y+h/2, w*0.3, 0, Math.PI*2); ctx.stroke();
    }
  });

  add({ id: "dice", x: 84, y: 56, w: 4, h: 4,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.4, 1, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#f5f5f0"; ctx.beginPath(); ctx.roundRect(x, y, w, h, 1); ctx.fill();
      ctx.fillStyle = "#333";
      ctx.beginPath(); ctx.arc(x+w/2, y+h/2, 1, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+w*0.25, y+h*0.25, 0.6, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+w*0.75, y+h*0.75, 0.6, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "usb-drive", x: 64, y: 55, w: 3, h: 2,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.4, 1, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#444"; ctx.beginPath(); ctx.roundRect(x, y, w*0.6, h, 0.5); ctx.fill();
      ctx.fillStyle = "#888"; ctx.beginPath(); ctx.roundRect(x+w*0.6, y+h*0.15, w*0.4, h*0.7, 0.3); ctx.fill();
    }
  });

  add({ id: "rubber-duck", x: 93, y: 54, w: 4, h: 4,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.4, 1, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = hover ? "#ffe066" : "#f0c030"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h*0.55, w*0.45, h*0.35, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = hover ? "#ffe066" : "#f0c030"; ctx.beginPath(); ctx.arc(x+w*0.4, y+h*0.25, w*0.22, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#333"; ctx.beginPath(); ctx.arc(x+w*0.35, y+h*0.22, 0.8, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#e87020"; ctx.beginPath(); ctx.ellipse(x+w*0.25, y+h*0.28, w*0.12, h*0.06, -0.2, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "stress-ball", x: 3, y: 55, w: 4, h: 4,
    draw: (ctx, x, y, w, h, hover) => {
      const sg = ctx.createRadialGradient(x+w*0.35, y+h*0.35, 0, x+w/2, y+h/2, w/2);
      sg.addColorStop(0, hover ? "#ff8888" : "#cc5555"); sg.addColorStop(1, hover ? "#cc4444" : "#882222");
      ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(x+w/2, y+h/2, w/2, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.beginPath(); ctx.arc(x+w*0.35, y+h*0.3, w*0.1, 0, Math.PI*2); ctx.fill();
    }
  });

  add({ id: "tape-roll", x: 76, y: 50, w: 5, h: 5,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "#88ccaa"; ctx.beginPath(); ctx.arc(x+w/2, y+h/2, w/2, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#0a0a0b"; ctx.beginPath(); ctx.arc(x+w/2, y+h/2, w*0.25, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 0.3; ctx.beginPath(); ctx.arc(x+w/2, y+h/2, w*0.38, 0, Math.PI*2); ctx.stroke();
    }
  });

  add({ id: "scissors", x: 55, y: 50, w: 6, h: 5,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "#666"; ctx.beginPath(); ctx.ellipse(x+w*0.25, y+h*0.7, 2, 1.5, -0.3, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x+w*0.75, y+h*0.7, 2, 1.5, 0.3, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = hover ? "#aaa" : "#777"; ctx.lineWidth = 1.5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(x+w*0.3, y+h*0.55); ctx.lineTo(x+w*0.45, y+h*0.15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+w*0.7, y+h*0.55); ctx.lineTo(x+w*0.55, y+h*0.15); ctx.stroke();
    }
  });

  add({ id: "stapler", x: 25, y: 52, w: 7, h: 4,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "#cc2222"; ctx.beginPath(); ctx.roundRect(x, y+h*0.3, w, h*0.7, 1); ctx.fill();
      ctx.fillStyle = "#aa1111"; ctx.beginPath(); ctx.roundRect(x+w*0.05, y, w*0.9, h*0.35, [2,2,0,0]); ctx.fill();
      ctx.fillStyle = "#888"; ctx.fillRect(x+w*0.85, y+h*0.4, w*0.1, h*0.3);
    }
  });

  add({ id: "cactus", x: 96, y: 44, w: 5, h: 8,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.35, 1, 0, 0, Math.PI*2); ctx.fill();
      const pg = ctx.createLinearGradient(x, y+h*0.6, x, y+h); pg.addColorStop(0, "#b8805a"); pg.addColorStop(1, "#966040");
      ctx.fillStyle = pg; ctx.beginPath(); ctx.roundRect(x+w*0.2, y+h*0.6, w*0.6, h*0.4, 1); ctx.fill();
      ctx.fillStyle = "#2d8a2d"; ctx.beginPath(); ctx.roundRect(x+w*0.3, y+h*0.15, w*0.4, h*0.5, 3); ctx.fill();
      ctx.fillStyle = "#35a535"; ctx.beginPath(); ctx.roundRect(x+w*0.05, y+h*0.2, w*0.3, h*0.2, 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(x+w*0.65, y+h*0.3, w*0.3, h*0.2, 2); ctx.fill();
    }
  });

  add({ id: "keyboard-wrist", x: 30, y: 50, w: 14, h: 3,
    draw: (ctx, x, y, w, h) => {
      const wg = ctx.createLinearGradient(x, y, x, y+h); wg.addColorStop(0, "#555"); wg.addColorStop(1, "#333");
      ctx.fillStyle = wg; ctx.beginPath(); ctx.roundRect(x, y, w, h, 1.5); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.03)"; ctx.beginPath(); ctx.roundRect(x+1, y+0.5, w-2, h*0.4, 1); ctx.fill();
    }
  });

  add({ id: "lucky-cat", x: 6, y: 34, w: 5, h: 7,
    draw: (ctx, x, y, w, h, hover) => {
      ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.4, 1, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#f5f0e0"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h*0.55, w*0.4, h*0.4, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#f5f0e0"; ctx.beginPath(); ctx.arc(x+w/2, y+h*0.22, w*0.28, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#e8a0a0"; ctx.beginPath(); ctx.ellipse(x+w*0.32, y+h*0.15, w*0.08, h*0.06, -0.3, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x+w*0.68, y+h*0.15, w*0.08, h*0.06, 0.3, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#333"; ctx.beginPath(); ctx.arc(x+w*0.4, y+h*0.2, 0.6, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(x+w*0.6, y+h*0.2, 0.6, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#e87020"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h*0.27, w*0.06, h*0.03, 0, 0, Math.PI*2); ctx.fill();
      const armAngle = hover ? Math.sin(Date.now()*0.005)*0.3 : 0;
      ctx.save(); ctx.translate(x+w*0.85, y+h*0.4); ctx.rotate(-0.5+armAngle);
      ctx.fillStyle = "#f5f0e0"; ctx.beginPath(); ctx.ellipse(0, 0, w*0.08, h*0.15, 0, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    }
  });

  add({ id: "tiny-tripod", x: 68, y: 52, w: 4, h: 8,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "#333"; ctx.fillRect(x+w*0.45, y, w*0.1, h*0.4);
      ctx.fillStyle = "#222"; ctx.beginPath(); ctx.roundRect(x+w*0.25, y, w*0.5, h*0.15, 1); ctx.fill();
      ctx.strokeStyle = "#444"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x+w*0.4, y+h*0.15); ctx.lineTo(x+w*0.1, y+h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+w*0.5, y+h*0.15); ctx.lineTo(x+w*0.5, y+h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+w*0.6, y+h*0.15); ctx.lineTo(x+w*0.9, y+h); ctx.stroke();
    }
  });

  add({ id: "spray-bottle", x: 82, y: 48, w: 4, h: 7,
    draw: (ctx, x, y, w, h) => {
      ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.beginPath(); ctx.ellipse(x+w/2, y+h+1, w*0.4, 1, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#4488cc"; ctx.beginPath(); ctx.roundRect(x+w*0.1, y+h*0.3, w*0.8, h*0.7, 1); ctx.fill();
      ctx.fillStyle = "#666"; ctx.fillRect(x+w*0.3, y+h*0.1, w*0.4, h*0.25);
      ctx.fillStyle = "#555"; ctx.beginPath(); ctx.roundRect(x+w*0.15, y, w*0.35, h*0.15, 1); ctx.fill();
      ctx.strokeStyle = "#777"; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(x+w*0.5, y+h*0.08); ctx.lineTo(x+w*0.9, y+h*0.03); ctx.stroke();
    }
  });

  return items;
}

const ROOM_OBJECTS = createObjects();

// ═══════════════════════════════════════════════════════
// PANDA HINTS (tiny)
// ═══════════════════════════════════════════════════════

function drawEars(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  const w = Math.sin(t * 0.003) * 1.2;
  ctx.save(); ctx.translate(x, y); ctx.scale(1.6, 1.6);
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.ellipse(-4+w, 0, 3, 4.5, -0.2, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(4-w, 0, 3, 4.5, 0.2, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = "#444";
  ctx.beginPath(); ctx.ellipse(-4+w, 0, 1.8, 2.8, -0.2, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(4-w, 0, 1.8, 2.8, 0.2, 0, Math.PI*2); ctx.fill();
  ctx.restore();
}

function drawEyes(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  const blink = Math.sin(t * 0.0015) > 0.93;
  ctx.save(); ctx.translate(x, y); ctx.scale(1.6, 1.6);
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.ellipse(-5, 0, 3.5, 3, -0.15, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(5, 0, 3.5, 3, 0.15, 0, Math.PI*2); ctx.fill();
  if (blink) {
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(-7, 0); ctx.lineTo(-3, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(3, 0); ctx.lineTo(7, 0); ctx.stroke();
  } else {
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-5, 0, 1.8, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(5, 0, 1.8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#111"; ctx.beginPath(); ctx.arc(-4.5, 0.3, 0.9, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(5.5, 0.3, 0.9, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-4, -0.5, 0.35, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(6, -0.5, 0.35, 0, Math.PI*2); ctx.fill();
  }
  ctx.restore();
}

function drawPaw(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  const w = Math.sin(t * 0.004) * 1.5;
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 0.003) * 0.12); ctx.scale(1.8, 1.8);
  ctx.fillStyle = "#f5f5f0"; ctx.beginPath(); ctx.ellipse(0, 0, 3.5, 2.5, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.arc(-1.2, -1, 1, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(1.2, -1, 1, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(0, 0.8, 1, 0, Math.PI*2); ctx.fill();
  ctx.translate(w, 0);
  ctx.restore();
}

function drawTail(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  const w = Math.sin(t * 0.005) * 1.5;
  ctx.save(); ctx.translate(x, y); ctx.scale(1.8, 1.8);
  ctx.fillStyle = "#f5f5f0"; ctx.beginPath(); ctx.ellipse(w, 0, 2.5, 2, 0, 0, Math.PI*2); ctx.fill();
  ctx.restore();
}

// ═══════════════════════════════════════════════════════
// FULL PANDA
// ═══════════════════════════════════════════════════════

function drawPanda(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, pose: "idle" | "surprised" | "wave" | "run") {
  ctx.save(); ctx.translate(cx, cy); ctx.scale(scale, scale);

  ctx.fillStyle = "#f5f5f0";
  ctx.beginPath(); ctx.ellipse(0, 30, 35, 30, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -15, 30, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = "#fff8f0"; ctx.beginPath(); ctx.ellipse(0, 32, 22, 18, 0, 0, Math.PI*2); ctx.fill();

  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.arc(-22, -38, 10, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(22, -38, 10, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = "#333";
  ctx.beginPath(); ctx.arc(-22, -38, 5, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(22, -38, 5, 0, Math.PI*2); ctx.fill();

  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.ellipse(-12, -18, 10, 8, -0.2, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(12, -18, 10, 8, 0.2, 0, Math.PI*2); ctx.fill();

  if (pose === "surprised") {
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-12, -18, 6, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(12, -18, 6, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#111"; ctx.beginPath(); ctx.arc(-12, -17, 3.5, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(12, -17, 3.5, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-10, -19, 1.5, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(14, -19, 1.5, 0, Math.PI*2); ctx.fill();
  } else {
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-12, -18, 4, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(12, -18, 4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#111"; ctx.beginPath(); ctx.arc(-11, -17, 2, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(13, -17, 2, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(-10, -19, 0.8, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(14, -19, 0.8, 0, Math.PI*2); ctx.fill();
  }

  ctx.fillStyle = "#222"; ctx.beginPath(); ctx.ellipse(0, -8, 4, 3, 0, 0, Math.PI*2); ctx.fill();
  if (pose === "surprised") { ctx.fillStyle = "#222"; ctx.beginPath(); ctx.ellipse(0, -2, 4, 5, 0, 0, Math.PI*2); ctx.fill(); }
  else if (pose === "wave") { ctx.fillStyle = "#222"; ctx.beginPath(); ctx.arc(0, -3, 5, 0, Math.PI); ctx.fill(); }
  else { ctx.fillStyle = "#222"; ctx.beginPath(); ctx.arc(0, -3, 4, 0.1, Math.PI-0.1); ctx.fill(); }

  ctx.fillStyle = "rgba(232,160,160,0.25)";
  ctx.beginPath(); ctx.arc(-22, -10, 5, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(22, -10, 5, 0, Math.PI*2); ctx.fill();

  ctx.fillStyle = "#1a1a1a";
  if (pose === "wave") {
    ctx.beginPath(); ctx.ellipse(-32, 20, 8, 18, 0.3, 0, Math.PI*2); ctx.fill();
    ctx.save(); ctx.translate(32, 10); ctx.rotate(-0.8);
    ctx.beginPath(); ctx.ellipse(0, 0, 8, 18, 0, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  } else if (pose === "run") {
    ctx.beginPath(); ctx.ellipse(-35, 25, 8, 16, 0.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(35, 15, 8, 16, -0.5, 0, Math.PI*2); ctx.fill();
  } else {
    ctx.beginPath(); ctx.ellipse(-32, 20, 8, 18, 0.3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(32, 20, 8, 18, -0.3, 0, Math.PI*2); ctx.fill();
  }

  ctx.fillStyle = "#f5f5f0";
  if (pose === "wave") { ctx.beginPath(); ctx.arc(-28, 35, 6, 0, Math.PI*2); ctx.fill(); ctx.save(); ctx.translate(32, 10); ctx.rotate(-0.8); ctx.beginPath(); ctx.arc(0, 16, 6, 0, Math.PI*2); ctx.fill(); ctx.restore(); }
  else { ctx.beginPath(); ctx.arc(-28, 35, 6, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(28, 35, 6, 0, Math.PI*2); ctx.fill(); }

  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.ellipse(-12, 55, 10, 7, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(12, 55, 10, 7, 0, 0, Math.PI*2); ctx.fill();

  ctx.restore();
}

// ═══════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════

export default function PuzzleExperience({ onComplete }: Props) {
  const [scene, setScene] = useState<Scene>("intro-1");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0);
  const [flashlightRadius, setFlashlightRadius] = useState(0);
  const [hoveredObj, setHoveredObj] = useState<string | null>(null);
  const [pandaFound, setPandaFound] = useState(false);
  const [pandaPhase, setPandaPhase] = useState<"hidden" | "freeze" | "surprised" | "wave" | "run" | "laptop">("hidden");
  const [laptopGlow, setLaptopGlow] = useState(0);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [clickFlash, setClickFlash] = useState(false);

  const smoothMouse = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const sceneTimeRef = useRef(0);
  const musicRef = useRef<{ stop: () => void } | null>(null);
  const lastHintRef = useRef(0);

  const [pandaSpot] = useState<HidingSpot>(() => {
    const spots: HidingSpot[] = [
      { x: 12 + Math.random() * 76, y: 10 + Math.random() * 75, type: "ears" },
      { x: 12 + Math.random() * 76, y: 10 + Math.random() * 75, type: "eyes" },
      { x: 12 + Math.random() * 76, y: 10 + Math.random() * 75, type: "paw" },
      { x: 12 + Math.random() * 76, y: 10 + Math.random() * 75, type: "tail" },
    ];
    return spots[Math.floor(Math.random() * spots.length)];
  });

  const [decoys] = useState<HidingSpot[]>(() => {
    const types: HidingSpot["type"][] = ["ears", "eyes", "paw", "tail"];
    return Array.from({ length: 3 }, () => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 75,
      type: types[Math.floor(Math.random() * types.length)],
    })).filter(d => Math.abs(d.x - pandaSpot.x) > 20 || Math.abs(d.y - pandaSpot.y) > 20);
  });

  const [fakePrints] = useState(() =>
    Array.from({ length: 5 }, () => ({
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 70,
      r: Math.random() * Math.PI * 2,
    }))
  );

  // ── MOBILE ──
  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c);
  }, []);

  // ── SCENE TIMELINE ──
  useEffect(() => {
    sceneTimeRef.current = Date.now();
    const t: Record<Scene, { next: Scene; delay: number }[]> = {
      "intro-1": [{ next: "intro-2", delay: 3800 }],
      "intro-2": [{ next: "flashlight-intro", delay: 3200 }],
      "flashlight-intro": [],
      "exploring": [],
      "found-text-1": [{ next: "found-text-2", delay: 3200 }],
      "found-text-2": [{ next: "panda-appear", delay: 3200 }],
      "panda-appear": [{ next: "panda-wave", delay: 2200 }],
      "panda-wave": [{ next: "follow-text", delay: 3000 }],
      "follow-text": [{ next: "follow-me", delay: 2800 }],
      "follow-me": [{ next: "laptop-on", delay: 3000 }],
      "laptop-on": [{ next: "entering-website", delay: 2000 }],
      "entering-website": [],
    };
    const run = () => { const c = t[scene]; if (c?.length) c.forEach(({ next, delay }) => setTimeout(() => { setScene(next); sceneTimeRef.current = Date.now(); }, delay)); };
    run();
  }, [scene]);

  // ── TEXT FADES ──
  useEffect(() => {
    setTextOpacity(0);
    const texts = ["intro-1", "intro-2", "found-text-1", "found-text-2", "follow-text", "entering-website"];
    if (texts.includes(scene)) {
      const fi = setTimeout(() => setTextOpacity(1), 400);
      const fo = setTimeout(() => setTextOpacity(0), scene === "entering-website" ? 3000 : 2600);
      return () => { clearTimeout(fi); clearTimeout(fo); };
    }
  }, [scene]);

  // ── FLASHLIGHT GROW ──
  useEffect(() => {
    if (scene !== "flashlight-intro") return;
    setFlashlightRadius(0);
    const start = Date.now();
    const grow = () => {
      const r = Math.min((Date.now() - start) / 1500, 1);
      setFlashlightRadius(r * (isMobile ? 90 : 130));
      if (r < 1) requestAnimationFrame(grow);
      else { setTimeout(() => setScene("exploring"), 800); startMusic(); }
    };
    grow();
  }, [scene, isMobile]);

  // ── PANDA CLICK DETECTION ──
  const handleCanvasClick = useCallback(() => {
    if (scene !== "exploring" || pandaFound) return;
    const w = window.innerWidth, h = window.innerHeight;
    const px = (pandaSpot.x / 100) * w, py = (pandaSpot.y / 100) * h;
    const dx = smoothMouse.current.x - px, dy = smoothMouse.current.y - py;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = isMobile ? 45 : 55;

    setClickFlash(true);
    setTimeout(() => setClickFlash(false), 150);

    if (dist < radius) {
      setPandaFound(true);
      setPandaPhase("freeze");
      stopMusic();
      playFoundSound();
      setTimeout(() => setPandaPhase("surprised"), 600);
      setTimeout(() => setScene("found-text-1"), 1400);
    } else {
      playMissSound();
    }
  }, [scene, pandaFound, pandaSpot, isMobile]);

  // ── PANDA RUN TO LAPTOP ──
  useEffect(() => {
    if (scene !== "follow-me") return;
    setPandaPhase("run");
    const id = setTimeout(() => setPandaPhase("laptop"), 2500);
    return () => clearTimeout(id);
  }, [scene]);

  // ── LAPTOP GLOW ──
  useEffect(() => {
    if (scene !== "laptop-on") return;
    const start = Date.now();
    const glow = () => { const e = (Date.now() - start) / 1000; setLaptopGlow(Math.min(e / 2, 1)); if (e < 2) requestAnimationFrame(glow); };
    glow();
  }, [scene]);

  // ── ENTERING WEBSITE (5s hold then fade to website) ──
  useEffect(() => {
    if (scene !== "entering-website") return;
    const id = setTimeout(onComplete, 5500);
    return () => clearTimeout(id);
  }, [scene, onComplete]);

  // ── CANVAS RENDER ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);

    let raf = 0;
    const render = () => {
      const w = canvas.width, h = canvas.height, t = Date.now();
      ctx.clearRect(0, 0, w, h);

      const isRoom = ["flashlight-intro", "exploring", "found-text-1", "found-text-2", "panda-appear", "panda-wave", "follow-text", "follow-me", "laptop-on"].includes(scene);

      if (isRoom) {
        drawRoom(ctx, w, h, smoothMouse.current.x, smoothMouse.current.y);
        const mx = smoothMouse.current.x, my = smoothMouse.current.y;
        let near: string | null = null, nearD = Infinity;

        for (const obj of ROOM_OBJECTS) {
          const ox = (obj.x/100)*w, oy = (obj.y/100)*h, ow = (obj.w/100)*w, oh = (obj.h/100)*h;
          const d = Math.sqrt((mx-(ox+ow/2))**2 + (my-(oy+oh/2))**2);
          const reach = Math.max(ow, oh)*1.5 + (isMobile ? 70 : 100);
          if (d < reach && d < nearD) { nearD = d; near = obj.id; }
          if (d < reach) { ctx.globalAlpha = Math.max(0, 1-d/reach); obj.draw(ctx, ox, oy, ow, oh, obj.id===near, t); if (obj.id===near && obj.reaction) obj.reaction(ctx, ox, oy, ow, oh, t); ctx.globalAlpha = 1; }
        }
        setHoveredObj(near);

        // Panda hint (real)
        if (!pandaFound && scene === "exploring") {
          const ppx = (pandaSpot.x/100)*w, ppy = (pandaSpot.y/100)*h;
          const pd = Math.sqrt((mx-ppx)**2 + (my-ppy)**2);
          const pr = isMobile ? 55 : 70;
          if (pd < pr) {
            ctx.globalAlpha = Math.max(0, 1-pd/pr) * 0.55;
            if (pandaSpot.type === "ears") drawEars(ctx, ppx, ppy, t);
            else if (pandaSpot.type === "eyes") drawEyes(ctx, ppx, ppy, t);
            else if (pandaSpot.type === "paw") drawPaw(ctx, ppx, ppy, t);
            else drawTail(ctx, ppx, ppy, t);
            ctx.globalAlpha = 1;
          }

          // Decoys
          for (const d of decoys) {
            const dx2 = (d.x/100)*w, dy2 = (d.y/100)*h;
            const dd = Math.sqrt((mx-dx2)**2 + (my-dy2)**2);
            if (dd < pr) {
              ctx.globalAlpha = Math.max(0, 1-dd/pr) * 0.18;
              if (d.type === "ears") drawEars(ctx, dx2, dy2, t);
              else if (d.type === "eyes") drawEyes(ctx, dx2, dy2, t);
              else if (d.type === "paw") drawPaw(ctx, dx2, dy2, t);
              else drawTail(ctx, dx2, dy2, t);
              ctx.globalAlpha = 1;
            }
          }

          // Fake prints
          for (const fp of fakePrints) {
            const fpx = (fp.x/100)*w, fpy = (fp.y/100)*h;
            const fd = Math.sqrt((mx-fpx)**2 + (my-fpy)**2);
            if (fd < pr) {
              ctx.globalAlpha = Math.max(0, 1-fd/pr) * 0.12;
              ctx.save(); ctx.translate(fpx, fpy); ctx.rotate(fp.r);
              ctx.fillStyle = "#888";
              ctx.beginPath(); ctx.ellipse(0, 2, 2.5, 2, 0, 0, Math.PI*2); ctx.fill();
              ctx.beginPath(); ctx.arc(-2.5, -1, 1, 0, Math.PI*2); ctx.fill();
              ctx.beginPath(); ctx.arc(-0.5, -2.5, 1, 0, Math.PI*2); ctx.fill();
              ctx.beginPath(); ctx.arc(1.5, -2.5, 1, 0, Math.PI*2); ctx.fill();
              ctx.beginPath(); ctx.arc(3, -1, 1, 0, Math.PI*2); ctx.fill();
              ctx.restore(); ctx.globalAlpha = 1;
            }
          }
        }

        // Full panda
        if (pandaFound && pandaPhase !== "hidden") {
          const ppx = (pandaSpot.x/100)*w, ppy = (pandaSpot.y/100)*h;
          if (pandaPhase === "freeze" || pandaPhase === "surprised") drawPanda(ctx, ppx, ppy, 1.8, "surprised");
          else if (pandaPhase === "wave") drawPanda(ctx, ppx, ppy, 1.8, "wave");
          else if (pandaPhase === "run") {
            const prog = Math.min((t - sceneTimeRef.current) / 2500, 1);
            const rx = ppx + (w*0.5-ppx)*prog;
            drawPanda(ctx, rx, ppy, 1.5, "run");
          } else if (pandaPhase === "laptop") drawPanda(ctx, w*0.5, h*0.28, 1.1, "idle");
        }
      }

      // Entering website — cinematic text + panda + fade
      if (scene === "entering-website") {
        ctx.fillStyle = "#0a0a0b"; ctx.fillRect(0, 0, w, h);

        const elapsed = (Date.now() - sceneTimeRef.current) / 1000;
        const textIn = Math.min(elapsed / 0.8, 1);
        const fadeOut = elapsed > 4 ? Math.max(0, 1 - (elapsed - 4) / 1) : 1;
        const alpha = Math.min(textIn, fadeOut);

        ctx.globalAlpha = alpha;
        const fontSize = Math.min(w * 0.045, 38);
        ctx.fillStyle = "#f5f5f7";
        ctx.font = `600 ${fontSize}px var(--font-display), system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("We will find each other again,", w/2, h * 0.45);
        ctx.fillText("in other ways.", w/2, h * 0.45 + fontSize * 1.5);
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [scene, pandaFound, pandaPhase, pandaSpot, decoys, fakePrints, isMobile, textOpacity, laptopGlow]);

  // ── PROXIMITY HINT ──
  useEffect(() => {
    if (scene !== "exploring" || pandaFound) return;
    const id = setInterval(() => {
      const w = window.innerWidth, h = window.innerHeight;
      const px = (pandaSpot.x/100)*w, py = (pandaSpot.y/100)*h;
      const d = Math.sqrt((smoothMouse.current.x-px)**2 + (smoothMouse.current.y-py)**2);
      if (d < 120 && d > 55 && Date.now() - lastHintRef.current > 4000) {
        lastHintRef.current = Date.now();
        playProximityGiggle();
      }
    }, 200);
    return () => clearInterval(id);
  }, [scene, pandaFound, pandaSpot]);

  // ── MUSIC ──
  const startMusic = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const mg = ctx.createGain(); mg.gain.value = 0.04; mg.connect(ctx.destination);
      const oscs: OscillatorNode[] = [], ints: ReturnType<typeof setInterval>[] = [];

      const bass = ctx.createOscillator(); const bg = ctx.createGain(); bass.type = "sine"; bass.frequency.value = 44; bg.gain.value = 0.25;
      bass.connect(bg); bg.connect(mg); bass.start(); oscs.push(bass);

      const wb = ctx.createOscillator(); const wg = ctx.createGain(); wb.type = "sine"; wb.frequency.value = 0.3; wg.gain.value = 3;
      wb.connect(wg); wg.connect(bass.frequency); wb.start(); oscs.push(wb);

      const notes = [55, 65.41, 73.42, 61.74, 55, 73.42, 82.41, 65.41];
      let ni = 0; const bp = ctx.createOscillator(); const bpg = ctx.createGain(); const bpf = ctx.createBiquadFilter();
      bp.type = "triangle"; bp.frequency.value = notes[0]; bpg.gain.value = 0.12; bpf.type = "lowpass"; bpf.frequency.value = 250;
      bp.connect(bpf); bpf.connect(bpg); bpg.connect(mg); bp.start(); oscs.push(bp);
      ints.push(setInterval(() => { ni = (ni+1)%notes.length; bp.frequency.setTargetAtTime(notes[ni], ctx.currentTime, 0.04); bpg.gain.setTargetAtTime(0.15, ctx.currentTime, 0.01); bpg.gain.setTargetAtTime(0.05, ctx.currentTime+0.08, 0.15); }, 800));

      const arp = [220, 261.63, 293.66, 329.63, 392, 523.25]; let ai = 0;
      const pa = () => { if (!musicRef.current) return; const f = arp[ai%arp.length]; ai++; const o = ctx.createOscillator(); const g = ctx.createGain(); const fl = ctx.createBiquadFilter(); o.type = "sine"; o.frequency.value = f; fl.type = "lowpass"; fl.frequency.value = 1200; g.gain.setValueAtTime(0, ctx.currentTime); g.gain.linearRampToValueAtTime(0.07, ctx.currentTime+0.02); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+1.2); o.connect(fl); fl.connect(g); g.connect(mg); o.start(ctx.currentTime); o.stop(ctx.currentTime+1.3); };
      ints.push(setInterval(pa, 600)); setTimeout(pa, 300);

      const ch = [[220,261.63,329.63],[261.63,329.63,392],[196,246.94,293.66]]; let ci = 0;
      const pc = () => { if (!musicRef.current) return; const c = ch[ci%ch.length]; ci++; c.forEach(f => { const o1 = ctx.createOscillator(); const o2 = ctx.createOscillator(); o1.type = "sawtooth"; o2.type = "sawtooth"; o1.frequency.value = f; o2.frequency.value = f*1.003; const pf = ctx.createBiquadFilter(); pf.type = "lowpass"; pf.frequency.value = 400; const pg = ctx.createGain(); pg.gain.setValueAtTime(0, ctx.currentTime); pg.gain.linearRampToValueAtTime(0.02, ctx.currentTime+0.8); pg.gain.linearRampToValueAtTime(0, ctx.currentTime+3.5); o1.connect(pf); o2.connect(pf); pf.connect(pg); pg.connect(mg); o1.start(ctx.currentTime); o2.start(ctx.currentTime); o1.stop(ctx.currentTime+3.6); o2.stop(ctx.currentTime+3.6); }); };
      ints.push(setInterval(pc, 3200)); setTimeout(pc, 1000);

      musicRef.current = { stop: () => { oscs.forEach(o => { try { o.stop(); } catch(_e) {} }); ints.forEach(id => clearInterval(id)); try { ctx.close(); } catch(_e) {} } };
    } catch(_e) {}
  };

  const stopMusic = () => { try { musicRef.current?.stop(); } catch(_e) {} musicRef.current = null; };

  const playFoundSound = () => {
    try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); [523,659,784,1047].forEach((f,i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "sine"; o.frequency.value = f; g.gain.setValueAtTime(0, ctx.currentTime+i*0.15); g.gain.linearRampToValueAtTime(0.1, ctx.currentTime+i*0.15+0.05); g.gain.linearRampToValueAtTime(0, ctx.currentTime+i*0.15+0.4); o.connect(g); g.connect(ctx.destination); o.start(ctx.currentTime+i*0.15); o.stop(ctx.currentTime+i*0.15+0.5); }); } catch(_e) {}
  };

  const playMissSound = () => {
    try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "sine"; o.frequency.value = 200; g.gain.setValueAtTime(0.06, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.15); o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+0.2); } catch(_e) {}
  };

  const playProximityGiggle = () => {
    try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); [880,1100,880].forEach((f,i) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "sine"; o.frequency.value = f; g.gain.setValueAtTime(0, ctx.currentTime+i*0.1); g.gain.linearRampToValueAtTime(0.015, ctx.currentTime+i*0.1+0.02); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+i*0.1+0.12); o.connect(g); g.connect(ctx.destination); o.start(ctx.currentTime+i*0.1); o.stop(ctx.currentTime+i*0.1+0.15); }); } catch(_e) {}
  };

  // ── INPUT ──
  const handleMouseMove = useCallback((e: React.MouseEvent) => { smoothMouse.current = { x: e.clientX, y: e.clientY }; setMousePos({ x: e.clientX, y: e.clientY }); }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent) => { const t = e.touches[0]; smoothMouse.current = { x: t.clientX, y: t.clientY }; setMousePos({ x: t.clientX, y: t.clientY }); }, []);

  const isExploring = scene === "flashlight-intro" || scene === "exploring";

  const introTexts: Record<string, string> = {
    "intro-1": "brb, turning off the lights...",
    "intro-2": "bet you can't find me!",
  };

  const foundTexts: Record<string, string> = {
    "found-text-1": "OK fine, you win this round.",
    "found-text-2": "Come check out my setup though...",
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a0a0b] overflow-hidden"
      style={{ cursor: isExploring && !isMobile ? "none" : pandaFound ? "default" : "default" }}
      onMouseMove={isExploring ? handleMouseMove : undefined}
      onTouchMove={isExploring ? handleTouchMove : undefined}
      onTouchStart={isExploring ? (e) => { const t = e.touches[0]; smoothMouse.current = { x: t.clientX, y: t.clientY }; setMousePos({ x: t.clientX, y: t.clientY }); } : undefined}
      onClick={scene === "exploring" ? handleCanvasClick : undefined}
    >
      <AntiInspect />

      {/* Intro texts */}
      {["intro-1", "intro-2"].includes(scene) && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-white/60 text-xl md:text-3xl tracking-[0.12em] font-light text-center px-8 transition-all duration-700 ease-out" style={{ opacity: textOpacity, transform: `translateY(${textOpacity ? 0 : 12}px)`, fontFamily: "var(--font-syne), var(--font-display), system-ui, sans-serif", fontWeight: 300, letterSpacing: "0.12em" }}>
            {introTexts[scene]}
          </p>
        </div>
      )}

      {/* Found texts */}
      {["found-text-1", "found-text-2"].includes(scene) && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <p className="text-white/60 text-xl md:text-2xl tracking-[0.06em] font-light text-center px-8 transition-all duration-700 ease-out" style={{ opacity: textOpacity, transform: `translateY(${textOpacity ? 0 : 15}px) scale(${textOpacity ? 1 : 0.95})` }}>
            {foundTexts[scene]}
          </p>
        </div>
      )}

      {/* Follow text */}
      {scene === "follow-text" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <p className="text-white/50 text-lg tracking-[0.08em] font-light text-center px-8 transition-all duration-700 ease-out" style={{ opacity: textOpacity, transform: `translateY(${textOpacity ? 0 : 12}px)` }}>
            Follow me...
          </p>
        </div>
      )}

      {/* Flashlight instructions */}
      {scene === "flashlight-intro" && (
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center z-10">
          <p className="text-white/30 text-sm tracking-wide transition-opacity duration-500" style={{ opacity: textOpacity }}>
            {isMobile ? "Tap anywhere to start snooping" : "Click to catch a sneaky panda"}
          </p>
          <p className="text-white/15 text-xs mt-2">There's definitely a panda in here somewhere...</p>
        </div>
      )}

      {/* Exploring */}
      {scene === "exploring" && !pandaFound && (
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center z-10">
          <p className="text-white/25 text-sm tracking-wide">
            {isMobile ? "Tap to yeet that panda out of hiding" : "Click when you spot the freeloader"}
          </p>
          <p className="text-white/12 text-xs mt-2">It's definitely plotting something in this room...</p>
        </div>
      )}

      {/* Click flash effect */}
      {clickFlash && (
        <div className="fixed inset-0 z-[6] pointer-events-none" style={{
          background: `radial-gradient(circle 30px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent)`,
        }} />
      )}

      {/* Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

      {/* Flashlight overlay */}
      {isExploring && (
        <div className="fixed inset-0 pointer-events-none z-[5]" style={{
          background: `radial-gradient(circle ${flashlightRadius || (isMobile ? 90 : 130)}px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0,0,0,0.95) 100%)`,
        }} />
      )}

      {/* Extra darkness layer */}
      {isExploring && (
        <div className="fixed inset-0 pointer-events-none z-[4] bg-black/40" />
      )}
    </div>
  );
}
