"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FlashlightCanvas from "./FlashlightCanvas";
import AntiInspect from "./AntiInspect";

interface Props {
  active: boolean;
  onUnlock: () => void;
}

// ── DRAW ROOM STRUCTURE ──
function drawRoom(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Back wall
  const wallGrad = ctx.createLinearGradient(0, 0, 0, h * 0.65);
  wallGrad.addColorStop(0, "#2a2520");
  wallGrad.addColorStop(0.5, "#231f1a");
  wallGrad.addColorStop(1, "#1e1a15");
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, w, h * 0.65);

  // Wallpaper subtle texture lines
  ctx.strokeStyle = "rgba(255,255,255,0.012)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 40; i++) {
    const y = (i / 40) * h * 0.65;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Baseboard
  const bbY = h * 0.63;
  const bbGrad = ctx.createLinearGradient(0, bbY, 0, bbY + h * 0.04);
  bbGrad.addColorStop(0, "#4a3a28");
  bbGrad.addColorStop(0.5, "#3a2a18");
  bbGrad.addColorStop(1, "#2a1a0a");
  ctx.fillStyle = bbGrad;
  ctx.fillRect(0, bbY, w, h * 0.04);
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(0, bbY, w, 1.5);

  // Floor
  const floorGrad = ctx.createLinearGradient(0, h * 0.65, 0, h);
  floorGrad.addColorStop(0, "#3a2a18");
  floorGrad.addColorStop(0.3, "#322210");
  floorGrad.addColorStop(1, "#281a0a");
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, h * 0.65, w, h * 0.35);

  // Wood floor planks
  ctx.strokeStyle = "rgba(0,0,0,0.15)";
  ctx.lineWidth = 0.8;
  const plankW = w / 12;
  for (let i = 0; i < 13; i++) {
    const px = i * plankW;
    ctx.beginPath();
    ctx.moveTo(px, h * 0.65);
    ctx.lineTo(px, h);
    ctx.stroke();
  }
  // Horizontal plank lines
  for (let i = 0; i < 8; i++) {
    const py = h * 0.65 + (i / 8) * h * 0.35;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(w, py);
    ctx.stroke();
  }

  // Wood grain highlights
  ctx.strokeStyle = "rgba(255,255,255,0.015)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 20; i++) {
    const px = Math.random() * w;
    const py = h * 0.65 + Math.random() * h * 0.35;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + Math.random() * 30 - 15, py + Math.random() * 4);
    ctx.stroke();
  }

  // Left wall shadow edge
  const leftShadow = ctx.createLinearGradient(0, 0, w * 0.08, 0);
  leftShadow.addColorStop(0, "rgba(0,0,0,0.4)");
  leftShadow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = leftShadow;
  ctx.fillRect(0, 0, w * 0.08, h * 0.65);

  // Right wall shadow edge
  const rightShadow = ctx.createLinearGradient(w, 0, w * 0.92, 0);
  rightShadow.addColorStop(0, "rgba(0,0,0,0.4)");
  rightShadow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = rightShadow;
  ctx.fillRect(w * 0.92, 0, w * 0.08, h * 0.65);
}

// ── FURNITURE DRAWING FUNCTIONS ──

function drawDesk(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Desk shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 4, w * 0.55, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs
  const legW = w * 0.06;
  const legGrad = ctx.createLinearGradient(x, y, x + legW, y);
  legGrad.addColorStop(0, "#3a2510");
  legGrad.addColorStop(0.5, "#4a3520");
  legGrad.addColorStop(1, "#3a2510");
  ctx.fillStyle = legGrad;
  ctx.fillRect(x + w * 0.05, y + h * 0.2, legW, h * 0.8);
  ctx.fillRect(x + w * 0.89, y + h * 0.2, legW, h * 0.8);

  // Cross bar
  ctx.fillStyle = "#3a2510";
  ctx.fillRect(x + w * 0.05, y + h * 0.7, w * 0.9, legW * 0.6);

  // Table top
  const topGrad = ctx.createLinearGradient(x, y, x, y + h * 0.2);
  topGrad.addColorStop(0, "#5a4030");
  topGrad.addColorStop(0.3, "#4a3525");
  topGrad.addColorStop(1, "#3a2a18");
  ctx.fillStyle = topGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h * 0.2, 3);
  ctx.fill();

  // Wood grain on desk
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 5; i++) {
    const gy = y + 3 + i * (h * 0.15 / 5);
    ctx.beginPath();
    ctx.moveTo(x + 5, gy);
    ctx.bezierCurveTo(x + w * 0.3, gy + 1, x + w * 0.7, gy - 1, x + w - 5, gy);
    ctx.stroke();
  }

  // Top edge highlight
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(x + 2, y, w - 4, 1.5);
}

function drawMonitor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Stand
  ctx.fillStyle = "#222";
  ctx.fillRect(x + w * 0.4, y + h, w * 0.2, h * 0.15);
  ctx.fillStyle = "#333";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + h * 0.18, w * 0.2, h * 0.04, 0, 0, Math.PI * 2);
  ctx.fill();

  // Monitor body
  const bodyGrad = ctx.createLinearGradient(x, y, x, y + h);
  bodyGrad.addColorStop(0, "#1a1a1a");
  bodyGrad.addColorStop(0.5, "#111");
  bodyGrad.addColorStop(1, "#0a0a0a");
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 4);
  ctx.fill();

  // Bezel
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(x + 3, y + 3, w - 6, h - 6);

  // Screen
  const screenGrad = ctx.createLinearGradient(x + 5, y + 5, x + 5, y + h - 5);
  screenGrad.addColorStop(0, "#0a1520");
  screenGrad.addColorStop(0.5, "#0d1a28");
  screenGrad.addColorStop(1, "#081018");
  ctx.fillStyle = screenGrad;
  ctx.fillRect(x + 5, y + 5, w - 10, h - 10);

  // Screen glow
  const glowGrad = ctx.createRadialGradient(x + w / 2, y + h / 2, 0, x + w / 2, y + h / 2, w * 0.6);
  glowGrad.addColorStop(0, "rgba(30,60,90,0.15)");
  glowGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glowGrad;
  ctx.fillRect(x + 5, y + 5, w - 10, h - 10);

  // Screen content lines
  ctx.fillStyle = "rgba(60,120,180,0.08)";
  for (let i = 0; i < 6; i++) {
    const lw = (w - 20) * (0.4 + Math.random() * 0.5);
    ctx.fillRect(x + 10, y + 12 + i * (h - 25) / 6, lw, 2);
  }

  // Power LED
  ctx.fillStyle = "#22cc44";
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h - 4, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(34,204,68,0.3)";
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h - 4, 4, 0, Math.PI * 2);
  ctx.fill();

  // Brand text
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.font = `${Math.max(6, w * 0.06)}px system-ui`;
  ctx.textAlign = "center";
  ctx.fillText("DENI", x + w / 2, y + h - 3);
}

function drawKeyboard(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Body
  const kbGrad = ctx.createLinearGradient(x, y, x, y + h);
  kbGrad.addColorStop(0, "#2a2a2a");
  kbGrad.addColorStop(1, "#1a1a1a");
  ctx.fillStyle = kbGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 3);
  ctx.fill();

  // Keys
  const cols = 14;
  const rows = 4;
  const keyW = (w - 6) / cols;
  const keyH = (h - 4) / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const kx = x + 3 + c * keyW;
      const ky = y + 2 + r * keyH;
      const kw = keyW - 1.5;
      const kh = keyH - 1.5;
      const shade = 0.08 + Math.random() * 0.04;
      ctx.fillStyle = `rgba(255,255,255,${shade})`;
      ctx.beginPath();
      ctx.roundRect(kx, ky, kw, kh, 1);
      ctx.fill();
    }
  }

  // Spacebar
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.beginPath();
  ctx.roundRect(x + w * 0.28, y + h - keyH - 0.5, w * 0.44, keyH - 1, 1);
  ctx.fill();

  // Top highlight
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.fillRect(x + 2, y, w - 4, 1);
}

function drawMouse(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Mousepad
  ctx.fillStyle = "#1a1a2a";
  ctx.beginPath();
  ctx.roundRect(x - 3, y - 2, w + 6, h + 4, 4);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.roundRect(x - 2, y - 1, w + 4, h + 2, 3);
  ctx.stroke();

  // Mouse body
  const mGrad = ctx.createRadialGradient(x + w / 2, y + h / 2, 0, x + w / 2, y + h / 2, w * 0.6);
  mGrad.addColorStop(0, "#555");
  mGrad.addColorStop(1, "#333");
  ctx.fillStyle = mGrad;
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Scroll wheel
  ctx.fillStyle = "#666";
  ctx.beginPath();
  ctx.roundRect(x + w / 2 - 1.5, y + h * 0.25, 3, h * 0.25, 1);
  ctx.fill();

  // Divider line
  ctx.strokeStyle = "rgba(0,0,0,0.3)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + 2);
  ctx.lineTo(x + w / 2, y + h * 0.5);
  ctx.stroke();
}

function drawChair(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Chair shadow
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 3, w * 0.4, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wheels
  ctx.fillStyle = "#333";
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI - Math.PI / 2;
    const wx = x + w / 2 + Math.cos(angle) * w * 0.35;
    const wy = y + h * 0.95 + Math.sin(angle) * 2;
    ctx.beginPath();
    ctx.arc(wx, wy, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Base pole
  ctx.fillStyle = "#444";
  ctx.fillRect(x + w / 2 - 2, y + h * 0.55, 4, h * 0.4);

  // Seat
  const seatGrad = ctx.createLinearGradient(x, y + h * 0.4, x, y + h * 0.55);
  seatGrad.addColorStop(0, "#3a3025");
  seatGrad.addColorStop(1, "#2a2018");
  ctx.fillStyle = seatGrad;
  ctx.beginPath();
  ctx.roundRect(x, y + h * 0.4, w, h * 0.15, 4);
  ctx.fill();

  // Seat cushion
  ctx.fillStyle = "#4a4035";
  ctx.beginPath();
  ctx.roundRect(x + 3, y + h * 0.38, w - 6, h * 0.12, 3);
  ctx.fill();

  // Backrest
  const backGrad = ctx.createLinearGradient(x, y, x, y + h * 0.45);
  backGrad.addColorStop(0, "#3a3025");
  backGrad.addColorStop(0.5, "#2a2018");
  backGrad.addColorStop(1, "#3a3025");
  ctx.fillStyle = backGrad;
  ctx.beginPath();
  ctx.roundRect(x + w * 0.05, y, w * 0.9, h * 0.45, 6);
  ctx.fill();

  // Backrest stitching
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + 5);
  ctx.lineTo(x + w / 2, y + h * 0.4);
  ctx.stroke();

  // Armrests
  ctx.fillStyle = "#2a2018";
  ctx.fillRect(x - 3, y + h * 0.32, 6, h * 0.08);
  ctx.fillRect(x + w - 3, y + h * 0.32, 6, h * 0.08);
}

function drawBookshelf(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(x + 4, y + 4, w, h);

  // Back panel
  ctx.fillStyle = "#2a1a0a";
  ctx.fillRect(x, y, w, h);

  // Side panels
  const sideGrad = ctx.createLinearGradient(x, 0, x + w * 0.08, 0);
  sideGrad.addColorStop(0, "#4a3520");
  sideGrad.addColorStop(1, "#3a2a15");
  ctx.fillStyle = sideGrad;
  ctx.fillRect(x, y, w * 0.08, h);
  ctx.fillRect(x + w * 0.92, y, w * 0.08, h);

  // Shelves (5 levels)
  const shelfCount = 5;
  const shelfH = h / shelfCount;
  for (let i = 0; i <= shelfCount; i++) {
    const sy = y + i * shelfH;
    const shelfGrad = ctx.createLinearGradient(x, sy, x, sy + 3);
    shelfGrad.addColorStop(0, "#5a4530");
    shelfGrad.addColorStop(1, "#4a3520");
    ctx.fillStyle = shelfGrad;
    ctx.fillRect(x, sy - 1.5, w, 3);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(x, sy - 1.5, w, 1);
  }

  // Books on each shelf
  const bookColors = [
    "#8B4513", "#2E4057", "#8B0000", "#006400", "#4A0E4E",
    "#B8860B", "#556B2F", "#1B4F72", "#922B21", "#1A5276",
    "#6C3483", "#117A65", "#A04000", "#154360", "#7B241C",
  ];

  for (let shelf = 0; shelf < shelfCount; shelf++) {
    const shelfTop = y + shelf * shelfH + 4;
    const shelfBottom = y + (shelf + 1) * shelfH - 4;
    const bookH = shelfBottom - shelfTop;
    let bx = x + w * 0.1;

    const bookCount = 6 + Math.floor(Math.random() * 5);
    for (let b = 0; b < bookCount && bx < x + w * 0.88; b++) {
      const bw = 2 + Math.random() * 4;
      const lean = (Math.random() - 0.5) * 0.08;

      ctx.save();
      ctx.translate(bx + bw / 2, shelfTop + bookH / 2);
      ctx.rotate(lean);

      // Book spine
      const color = bookColors[(shelf * 7 + b) % bookColors.length];
      const bookGrad = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
      bookGrad.addColorStop(0, color);
      bookGrad.addColorStop(0.3, color);
      bookGrad.addColorStop(0.95, shadeColor(color, -20));
      bookGrad.addColorStop(1, shadeColor(color, -40));
      ctx.fillStyle = bookGrad;
      ctx.fillRect(-bw / 2, -bookH / 2, bw, bookH);

      // Spine detail
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(-bw / 2 + 0.5, -bookH / 4, bw - 1, 1.5);

      ctx.restore();
      bx += bw + 0.5;
    }
  }
}

function drawSofa(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 4, w * 0.52, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Base
  const baseGrad = ctx.createLinearGradient(x, y + h * 0.5, x, y + h);
  baseGrad.addColorStop(0, "#4a3525");
  baseGrad.addColorStop(1, "#3a2a18");
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.roundRect(x, y + h * 0.5, w, h * 0.5, 6);
  ctx.fill();

  // Seat cushion
  const seatGrad = ctx.createLinearGradient(x, y + h * 0.35, x, y + h * 0.55);
  seatGrad.addColorStop(0, "#5a4535");
  seatGrad.addColorStop(0.5, "#4a3a28");
  seatGrad.addColorStop(1, "#3a2a1a");
  ctx.fillStyle = seatGrad;
  ctx.beginPath();
  ctx.roundRect(x + 4, y + h * 0.35, w - 8, h * 0.2, 4);
  ctx.fill();

  // Cushion divider
  ctx.strokeStyle = "rgba(0,0,0,0.15)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + h * 0.36);
  ctx.lineTo(x + w / 2, y + h * 0.54);
  ctx.stroke();

  // Backrest
  const backGrad = ctx.createLinearGradient(x, y, x, y + h * 0.45);
  backGrad.addColorStop(0, "#5a4535");
  backGrad.addColorStop(0.5, "#4a3a28");
  backGrad.addColorStop(1, "#3a2a1a");
  ctx.fillStyle = backGrad;
  ctx.beginPath();
  ctx.roundRect(x + 2, y, w - 4, h * 0.42, 8);
  ctx.fill();

  // Armrests
  const armGrad = ctx.createLinearGradient(x, 0, x + w * 0.12, 0);
  armGrad.addColorStop(0, "#4a3525");
  armGrad.addColorStop(1, "#3a2a18");
  ctx.fillStyle = armGrad;
  ctx.beginPath();
  ctx.roundRect(x, y + h * 0.1, w * 0.1, h * 0.55, 4);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(x + w * 0.9, y + h * 0.1, w * 0.1, h * 0.55, 4);
  ctx.fill();

  // Pillows
  const pillowColors = ["#8B4513", "#556B2F", "#6B3A2A"];
  for (let i = 0; i < 3; i++) {
    const px = x + w * 0.15 + i * w * 0.28;
    const py = y + h * 0.08;
    const pw = w * 0.2;
    const ph = h * 0.28;

    ctx.fillStyle = pillowColors[i];
    ctx.beginPath();
    ctx.ellipse(px + pw / 2, py + ph / 2, pw / 2, ph / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pillow highlight
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.beginPath();
    ctx.ellipse(px + pw * 0.4, py + ph * 0.35, pw * 0.25, ph * 0.2, -0.3, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCoffeeTable(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 3, w * 0.5, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs
  ctx.fillStyle = "#3a2a15";
  ctx.fillRect(x + w * 0.08, y + h * 0.3, w * 0.06, h * 0.7);
  ctx.fillRect(x + w * 0.86, y + h * 0.3, w * 0.06, h * 0.7);

  // Tabletop
  const topGrad = ctx.createLinearGradient(x, y, x, y + h * 0.3);
  topGrad.addColorStop(0, "#5a4530");
  topGrad.addColorStop(0.5, "#4a3520");
  topGrad.addColorStop(1, "#3a2a15");
  ctx.fillStyle = topGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h * 0.3, 4);
  ctx.fill();

  // Top highlight
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(x + 3, y + 1, w - 6, 1.5);

  // Reflection
  ctx.fillStyle = "rgba(255,255,255,0.02)";
  ctx.fillRect(x + w * 0.2, y + 3, w * 0.6, h * 0.1);
}

function drawBed(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(x + 5, y + h - 2, w, 6);

  // Bed frame
  ctx.fillStyle = "#3a2a18";
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 4);
  ctx.fill();

  // Mattress
  const mattGrad = ctx.createLinearGradient(x, y, x, y + h);
  mattGrad.addColorStop(0, "#4a4a5a");
  mattGrad.addColorStop(0.5, "#3a3a4a");
  mattGrad.addColorStop(1, "#2a2a3a");
  ctx.fillStyle = mattGrad;
  ctx.beginPath();
  ctx.roundRect(x + 3, y + 3, w - 6, h - 6, 3);
  ctx.fill();

  // Sheet
  const sheetGrad = ctx.createLinearGradient(x, y + h * 0.3, x, y + h);
  sheetGrad.addColorStop(0, "#5a5a6a");
  sheetGrad.addColorStop(1, "#4a4a5a");
  ctx.fillStyle = sheetGrad;
  ctx.beginPath();
  ctx.roundRect(x + 3, y + h * 0.3, w - 6, h * 0.67, 3);
  ctx.fill();

  // Sheet fold line
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 5, y + h * 0.32);
  ctx.bezierCurveTo(x + w * 0.3, y + h * 0.3, x + w * 0.7, y + h * 0.34, x + w - 5, y + h * 0.32);
  ctx.stroke();

  // Pillow
  const pillowGrad = ctx.createRadialGradient(x + w * 0.25, y + h * 0.18, 0, x + w * 0.25, y + h * 0.18, w * 0.2);
  pillowGrad.addColorStop(0, "#eee");
  pillowGrad.addColorStop(1, "#ccc");
  ctx.fillStyle = pillowGrad;
  ctx.beginPath();
  ctx.ellipse(x + w * 0.25, y + h * 0.18, w * 0.18, h * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Blanket pattern
  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + 8, y + h * (0.45 + i * 0.12));
    ctx.lineTo(x + w - 8, y + h * (0.45 + i * 0.12));
    ctx.stroke();
  }
}

function drawTV(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Mount bracket
  ctx.fillStyle = "#222";
  ctx.fillRect(x + w / 2 - 4, y + h, 8, 6);

  // TV body
  const tvGrad = ctx.createLinearGradient(x, y, x, y + h);
  tvGrad.addColorStop(0, "#1a1a1a");
  tvGrad.addColorStop(1, "#111");
  ctx.fillStyle = tvGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 3);
  ctx.fill();

  // Screen
  ctx.fillStyle = "#080810";
  ctx.fillRect(x + 3, y + 3, w - 6, h - 6);

  // Screen reflection
  const refGrad = ctx.createLinearGradient(x + 3, y + 3, x + w - 3, y + h - 3);
  refGrad.addColorStop(0, "rgba(40,60,80,0.08)");
  refGrad.addColorStop(0.5, "rgba(0,0,0,0)");
  refGrad.addColorStop(1, "rgba(40,60,80,0.04)");
  ctx.fillStyle = refGrad;
  ctx.fillRect(x + 3, y + 3, w - 6, h - 6);

  // Brand
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.font = `${Math.max(5, w * 0.05)}px system-ui`;
  ctx.textAlign = "center";
  ctx.fillText("SAMSUNG", x + w / 2, y + h - 5);
}

function drawDoor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Door frame
  ctx.fillStyle = "#2a1a0a";
  ctx.fillRect(x - 3, y - 2, w + 6, h + 4);

  // Door
  const doorGrad = ctx.createLinearGradient(x, y, x + w, y);
  doorGrad.addColorStop(0, "#3a2a18");
  doorGrad.addColorStop(0.3, "#4a3a28");
  doorGrad.addColorStop(0.7, "#4a3a28");
  doorGrad.addColorStop(1, "#3a2a18");
  ctx.fillStyle = doorGrad;
  ctx.fillRect(x, y, w, h);

  // Door panels
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + w * 0.15, y + h * 0.08, w * 0.7, h * 0.35);
  ctx.strokeRect(x + w * 0.15, y + h * 0.5, w * 0.7, h * 0.42);

  // Door handle
  ctx.fillStyle = "#B8860B";
  ctx.beginPath();
  ctx.arc(x + w * 0.82, y + h * 0.52, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(184,134,11,0.3)";
  ctx.beginPath();
  ctx.arc(x + w * 0.82, y + h * 0.52, 6, 0, Math.PI * 2);
  ctx.fill();

  // Handle bar
  ctx.fillStyle = "#B8860B";
  ctx.fillRect(x + w * 0.82, y + h * 0.52, w * 0.08, 2);

  // Keyhole
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(x + w * 0.82, y + h * 0.58, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawWindow(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Frame
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(x - 2, y - 2, w + 4, h + 4);

  // Window panes
  ctx.fillStyle = "#1a2a3a";
  ctx.fillRect(x, y, w / 2 - 1, h);
  ctx.fillRect(x + w / 2 + 1, y, w / 2 - 1, h);

  // Glass reflection
  ctx.fillStyle = "rgba(100,150,200,0.05)";
  ctx.fillRect(x + 3, y + 3, w / 2 - 7, h - 6);
  ctx.fillRect(x + w / 2 + 4, y + 3, w / 2 - 7, h - 6);

  // Moon glow through window
  const moonGrad = ctx.createRadialGradient(x + w * 0.7, y + h * 0.3, 0, x + w * 0.7, y + h * 0.3, w * 0.3);
  moonGrad.addColorStop(0, "rgba(200,220,255,0.08)");
  moonGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = moonGrad;
  ctx.fillRect(x, y, w, h);

  // Cross bar
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(x + w / 2 - 1, y, 2, h);
  ctx.fillRect(x, y + h / 2 - 1, w, 2);

  // Curtain left
  const curtGrad = ctx.createLinearGradient(x - 15, 0, x + 5, 0);
  curtGrad.addColorStop(0, "#3a2a20");
  curtGrad.addColorStop(1, "rgba(58,42,32,0)");
  ctx.fillStyle = curtGrad;
  ctx.fillRect(x - 15, y - 5, 20, h + 10);

  // Curtain right
  const curtGrad2 = ctx.createLinearGradient(x + w - 5, 0, x + w + 15, 0);
  curtGrad2.addColorStop(0, "rgba(58,42,32,0)");
  curtGrad2.addColorStop(1, "#3a2a20");
  ctx.fillStyle = curtGrad2;
  ctx.fillRect(x + w - 5, y - 5, 20, h + 10);

  // Curtain rod
  ctx.fillStyle = "#5a4a3a";
  ctx.fillRect(x - 18, y - 6, w + 36, 3);
  ctx.fillStyle = "#6a5a4a";
  ctx.beginPath();
  ctx.arc(x - 18, y - 4.5, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + w + 18, y - 4.5, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawFloorLamp(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Base
  ctx.fillStyle = "#555";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h, w * 0.4, h * 0.03, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pole
  ctx.fillStyle = "#666";
  ctx.fillRect(x + w / 2 - 1.5, y + h * 0.3, 3, h * 0.7);

  // Shade
  const shadeGrad = ctx.createLinearGradient(x, y, x, y + h * 0.35);
  shadeGrad.addColorStop(0, "#776655");
  shadeGrad.addColorStop(1, "#665544");
  ctx.fillStyle = shadeGrad;
  ctx.beginPath();
  ctx.moveTo(x + 1, y + h * 0.35);
  ctx.lineTo(x + w / 2, y);
  ctx.lineTo(x + w - 1, y + h * 0.35);
  ctx.closePath();
  ctx.fill();

  // Shade inner glow
  ctx.fillStyle = "rgba(255,240,200,0.04)";
  ctx.beginPath();
  ctx.moveTo(x + 3, y + h * 0.33);
  ctx.lineTo(x + w / 2, y + 3);
  ctx.lineTo(x + w - 3, y + h * 0.33);
  ctx.closePath();
  ctx.fill();
}

function drawWallClock(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Clock face
  const clockGrad = ctx.createRadialGradient(x + w / 2, y + h / 2, 0, x + w / 2, y + h / 2, w / 2);
  clockGrad.addColorStop(0, "#fff");
  clockGrad.addColorStop(0.8, "#eee");
  clockGrad.addColorStop(1, "#ccc");
  ctx.fillStyle = clockGrad;
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
  ctx.fill();

  // Clock border
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
  ctx.stroke();

  // Hour markers
  ctx.fillStyle = "#333";
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const r = w / 2 - 3;
    const mx = x + w / 2 + Math.cos(angle) * r;
    const my = y + h / 2 + Math.sin(angle) * r;
    ctx.beginPath();
    ctx.arc(mx, my, 1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Hands
  const now = new Date();
  const hourAngle = ((now.getHours() % 12) / 12 + now.getMinutes() / 720) * Math.PI * 2 - Math.PI / 2;
  const minAngle = (now.getMinutes() / 60) * Math.PI * 2 - Math.PI / 2;

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + h / 2);
  ctx.lineTo(x + w / 2 + Math.cos(hourAngle) * w * 0.25, y + h / 2 + Math.sin(hourAngle) * h * 0.25);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + h / 2);
  ctx.lineTo(x + w / 2 + Math.cos(minAngle) * w * 0.35, y + h / 2 + Math.sin(minAngle) * h * 0.35);
  ctx.stroke();

  // Center dot
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h / 2, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawPictureFrame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Frame
  ctx.fillStyle = "#4a3a2a";
  ctx.fillRect(x, y, w, h);

  // Inner border
  ctx.fillStyle = "#3a2a1a";
  ctx.fillRect(x + 2, y + 2, w - 4, h - 4);

  // Canvas
  const canvasGrad = ctx.createLinearGradient(x + 4, y + 4, x + w - 4, y + h - 4);
  canvasGrad.addColorStop(0, "#2a3a4a");
  canvasGrad.addColorStop(0.5, "#1a2a3a");
  canvasGrad.addColorStop(1, "#2a3a4a");
  ctx.fillStyle = canvasGrad;
  ctx.fillRect(x + 4, y + 4, w - 8, h - 8);

  // Abstract art
  ctx.fillStyle = "rgba(100,150,200,0.15)";
  ctx.beginPath();
  ctx.arc(x + w * 0.35, y + h * 0.4, w * 0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(200,100,80,0.12)";
  ctx.beginPath();
  ctx.arc(x + w * 0.6, y + h * 0.55, w * 0.12, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlant(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 2, w * 0.4, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pot
  const potGrad = ctx.createLinearGradient(x, y + h * 0.5, x, y + h);
  potGrad.addColorStop(0, "#8B4513");
  potGrad.addColorStop(1, "#6B3410");
  ctx.fillStyle = potGrad;
  ctx.beginPath();
  ctx.moveTo(x + 2, y + h * 0.5);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w - 2, y + h * 0.5);
  ctx.closePath();
  ctx.fill();

  // Pot rim
  ctx.fillStyle = "#9B5523";
  ctx.fillRect(x - 1, y + h * 0.48, w + 2, h * 0.06);

  // Soil
  ctx.fillStyle = "#3a2a18";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h * 0.52, w * 0.4, h * 0.03, 0, 0, Math.PI * 2);
  ctx.fill();

  // Leaves
  const leafColors = ["#2d5a1e", "#3a7a2a", "#2a6a1a"];
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI - Math.PI / 2 + (Math.random() - 0.5) * 0.3;
    const leafLen = h * (0.3 + Math.random() * 0.2);
    const lx = x + w / 2 + Math.cos(angle) * leafLen * 0.5;
    const ly = y + h * 0.4 + Math.sin(angle) * leafLen * 0.5;

    ctx.fillStyle = leafColors[i % leafColors.length];
    ctx.beginPath();
    ctx.ellipse(lx, ly, leafLen * 0.15, leafLen * 0.4, angle, 0, Math.PI * 2);
    ctx.fill();
  }

  // Center leaf
  ctx.fillStyle = "#4a8a3a";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h * 0.2, w * 0.12, h * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawCoffeeMug(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 1, w * 0.5, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mug body
  const mugGrad = ctx.createLinearGradient(x, y, x + w, y);
  mugGrad.addColorStop(0, "#fff");
  mugGrad.addColorStop(0.5, "#f0f0f0");
  mugGrad.addColorStop(1, "#ddd");
  ctx.fillStyle = mugGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 2);
  ctx.fill();

  // Coffee inside
  ctx.fillStyle = "#3a2010";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + 2, w / 2 - 2, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Handle
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x + w + 3, y + h / 2, 4, -Math.PI * 0.4, Math.PI * 0.4);
  ctx.stroke();

  // Steam
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    const sx = x + w * 0.3 + i * w * 0.2;
    ctx.moveTo(sx, y - 2);
    ctx.bezierCurveTo(sx + 2, y - 8, sx - 2, y - 14, sx + 1, y - 20);
    ctx.stroke();
  }
}

function drawRemote(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 2);
  ctx.fill();

  // Buttons
  const btnColors = ["#333", "#333", "#cc3333", "#333"];
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = btnColors[i];
    ctx.beginPath();
    ctx.arc(x + w / 2, y + 3 + i * (h - 6) / 3, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Top sensor
  ctx.fillStyle = "#222";
  ctx.fillRect(x + 2, y, w - 4, 1.5);
}

function drawNewspaper(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Slightly rotated
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(0.05);

  ctx.fillStyle = "#ccbb99";
  ctx.fillRect(-w / 2, -h / 2, w, h);

  // Text lines
  ctx.fillStyle = "#aa9977";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(-w / 2 + 2, -h / 2 + 2 + i * (h - 4) / 5, w - 4, 0.8);
  }

  // Headline
  ctx.fillStyle = "#8a7a5a";
  ctx.fillRect(-w / 2 + 2, -h / 2 + 1, w * 0.6, 1.5);

  ctx.restore();
}

function drawShoes(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 1, w * 0.5, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Shoe 1
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.ellipse(x + w * 0.3, y + h / 2, w * 0.35, h / 2, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#222";
  ctx.fillRect(x + w * 0.3, y + h * 0.2, w * 0.4, h * 0.3);

  // Shoe 2
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.ellipse(x + w * 0.7, y + h / 2, w * 0.35, h / 2, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(x + w * 0.35, y + h * 0.25, w * 0.4, h * 0.3);
}

function drawBackpack(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 2, w * 0.5, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  const bpGrad = ctx.createLinearGradient(x, y, x + w, y);
  bpGrad.addColorStop(0, "#2a4a6a");
  bpGrad.addColorStop(0.5, "#1a3a5a");
  bpGrad.addColorStop(1, "#2a4a6a");
  ctx.fillStyle = bpGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 4);
  ctx.fill();

  // Front pocket
  ctx.fillStyle = "#1a3050";
  ctx.beginPath();
  ctx.roundRect(x + w * 0.1, y + h * 0.5, w * 0.8, h * 0.4, 3);
  ctx.fill();

  // Zipper
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(x + w * 0.15, y + h * 0.5);
  ctx.lineTo(x + w * 0.85, y + h * 0.5);
  ctx.stroke();

  // Straps
  ctx.fillStyle = "#1a3a5a";
  ctx.fillRect(x + w * 0.15, y, w * 0.12, h * 0.3);
  ctx.fillRect(x + w * 0.73, y, w * 0.12, h * 0.3);
}

function drawTrashCan(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 2, w * 0.45, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Can body
  const canGrad = ctx.createLinearGradient(x, y, x + w, y);
  canGrad.addColorStop(0, "#555");
  canGrad.addColorStop(0.5, "#666");
  canGrad.addColorStop(1, "#555");
  ctx.fillStyle = canGrad;
  ctx.beginPath();
  ctx.moveTo(x + 1, y);
  ctx.lineTo(x - 1, y + h);
  ctx.lineTo(x + w + 1, y + h);
  ctx.lineTo(x + w - 1, y);
  ctx.closePath();
  ctx.fill();

  // Rim
  ctx.fillStyle = "#777";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y, w / 2, 2, 0, 0, Math.PI * 2);
  ctx.fill();
}

// Helper function to darken/lighten colors
function shadeColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}

// ── PAW PRINT ──
function drawPawPrint(ctx: CanvasRenderingContext2D, px: number, py: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha * 0.6;
  ctx.fillStyle = "#f5f5f0";

  ctx.beginPath();
  ctx.ellipse(px, py + 3, 5, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  const toes = [
    { x: px - 4, y: py - 2.5 },
    { x: px - 1.5, y: py - 6 },
    { x: px + 1.5, y: py - 6 },
    { x: px + 4, y: py - 2.5 },
  ];
  for (const t of toes) {
    ctx.beginPath();
    ctx.arc(t.x, t.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ── PANDA ──
function drawPanda(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, talkFrame: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  ctx.fillStyle = "#f5f5f0";
  ctx.beginPath(); ctx.ellipse(0, 30, 35, 30, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -15, 30, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.arc(-22, -38, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(22, -38, 10, 0, Math.PI * 2); ctx.fill();

  ctx.beginPath(); ctx.ellipse(-12, -18, 10, 8, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(12, -18, 10, 8, 0.2, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(-12, -18, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(12, -18, 4, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#111";
  ctx.beginPath(); ctx.arc(-11, -17, 2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(13, -17, 2, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(-10, -19, 0.8, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(14, -19, 0.8, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#222";
  ctx.beginPath(); ctx.ellipse(0, -8, 4, 3, 0, 0, Math.PI * 2); ctx.fill();

  const mouthOpen = talkFrame % 2 === 0 ? 3 : 1;
  ctx.fillStyle = "#222";
  ctx.beginPath(); ctx.ellipse(0, -2, 3, mouthOpen, 0, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "rgba(232,160,160,0.25)";
  ctx.beginPath(); ctx.arc(-22, -10, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(22, -10, 5, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.ellipse(-32, 20, 8, 18, 0.3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(32, 20, 8, 18, -0.3, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#f5f5f0";
  ctx.beginPath(); ctx.arc(-28, 35, 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(28, 35, 6, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath(); ctx.ellipse(-12, 55, 10, 7, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(12, 55, 10, 7, 0, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#fff8f0";
  ctx.beginPath(); ctx.ellipse(0, 30, 22, 18, 0, 0, Math.PI * 2); ctx.fill();

  ctx.restore();
}

// ── ROOM ITEMS ──
interface RoomItem {
  x: number;
  y: number;
  w: number;
  h: number;
  draw: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => void;
}

function createRoomItems(): RoomItem[] {
  const items: RoomItem[] = [];
  const add = (x: number, y: number, w: number, h: number, draw: RoomItem["draw"]) => items.push({ x, y, w, h, draw });

  // ── BIG FURNITURE ──
  add(3, 28, 25, 18, drawDesk);
  add(8, 14, 16, 14, drawMonitor);
  add(9, 32, 14, 4, drawKeyboard);
  add(24, 32, 6, 5, drawMouse);
  add(8, 44, 14, 16, drawChair);
  add(70, 5, 26, 40, drawBookshelf);
  add(63, 55, 32, 22, drawSofa);
  add(35, 52, 22, 14, drawCoffeeTable);
  add(3, 70, 30, 24, drawBed);
  add(35, 2, 24, 16, drawTV);
  add(88, 10, 10, 42, drawDoor);
  add(58, 1, 12, 14, drawWindow);

  // ── MEDIUM ITEMS ──
  add(1, 12, 6, 35, drawFloorLamp);
  add(48, 0, 7, 7, drawWallClock);
  add(15, 3, 12, 10, drawPictureFrame);
  add(88, 56, 8, 18, drawPlant);
  add(40, 47, 5, 7, drawPlant);
  add(50, 42, 10, 16, (ctx, x, y, w, h) => {
    // Kipas angin
    ctx.fillStyle = "#666";
    ctx.fillRect(x + w / 2 - 1.5, y + h * 0.4, 3, h * 0.6);
    ctx.fillStyle = "#555";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h, 4, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#777";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h * 0.3, 7, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#888";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h * 0.3, 3, 3, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  add(85, 15, 5, 28, (ctx, x, y, w, h) => {
    // Payung
    ctx.fillStyle = "#222266";
    ctx.fillRect(x + w / 2 - 1, y + h * 0.3, 2, h * 0.7);
    ctx.fillStyle = "#555";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h, 3, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#222266";
    ctx.beginPath();
    ctx.moveTo(x, y + h * 0.3);
    ctx.lineTo(x + w / 2, y);
    ctx.lineTo(x + w, y + h * 0.3);
    ctx.closePath();
    ctx.fill();
  });
  add(92, 40, 4, 22, (ctx, x, y, w, h) => {
    // Sapu
    ctx.fillStyle = "#8a6a3a";
    ctx.fillRect(x + w / 2 - 1, y, 2, h * 0.65);
    ctx.fillStyle = "#666";
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(x + i * 0.8, y + h * 0.65, 0.7, h * 0.35);
    }
  });

  // ── SMALL ITEMS ──
  add(40, 48, 6, 5, drawCoffeeMug);
  add(44, 49, 7, 6, (ctx, x, y, w, h) => {
    // Piring makanan
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#eee";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 3, h / 3, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  add(70, 58, 5, 10, drawRemote);
  add(36, 49, 12, 8, drawNewspaper);
  add(48, 49, 6, 5, (ctx, x, y, w, h) => {
    // Kotak tisu
    ctx.fillStyle = "#ddd";
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(x + w / 2 - 1, y - 2, 2, 3);
  });
  add(86, 49, 8, 5, drawShoes);
  add(83, 50, 8, 5, (ctx, x, y, w, h) => {
    // Sepatu 2
    ctx.fillStyle = "#2a2a2a";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, -0.1, 0, Math.PI * 2);
    ctx.fill();
  });
  add(32, 74, 10, 14, drawBackpack);
  add(15, 62, 7, 5, (ctx, x, y, w, h) => {
    // Bantal lantai
    ctx.fillStyle = "#8B4513";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.beginPath();
    ctx.ellipse(x + w * 0.4, y + h * 0.4, w * 0.2, h * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  add(58, 64, 7, 8, (ctx, x, y, w, h) => {
    // Keranjang
    ctx.fillStyle = "#8B7355";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#6a5a3a";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h / 2, w / 2 - i * 2, h / 2 - i, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
  add(20, 57, 8, 6, (ctx, x, y, w, h) => {
    // Buku berserakan
    ctx.fillStyle = "#8B4513";
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(0.15);
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
    ctx.fillStyle = "#2E4057";
    ctx.save();
    ctx.translate(x + w / 2 + 3, y + h / 2 - 2);
    ctx.rotate(-0.2);
    ctx.fillRect(-w / 2, -h / 2, w * 0.8, h * 0.9);
    ctx.restore();
  });
  add(55, 77, 12, 4, (ctx, x, y, w, h) => {
    // Kabel charger
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + h / 2);
    ctx.bezierCurveTo(x + w * 0.3, y, x + w * 0.7, y + h, x + w, y + h / 2);
    ctx.stroke();
    // USB head
    ctx.fillStyle = "#555";
    ctx.fillRect(x + w - 3, y + h / 2 - 2, 4, 4);
  });
  add(16, 30, 4, 3, (ctx, x, y, w, h) => {
    // Kunci
    ctx.fillStyle = "#ccaa44";
    ctx.beginPath();
    ctx.arc(x + w / 3, y + h / 2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(x + w / 3, y + h / 2 - 0.5, w / 2, 1);
  });
  add(75, 57, 6, 4, (ctx, x, y, w, h) => {
    // Dompet
    ctx.fillStyle = "#5a3a1a";
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(x + 1, y + 1, w - 2, 1);
  });
  add(18, 32, 4, 4, (ctx, x, y, w, h) => {
    // Jam tangan
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#eee";
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, w / 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y + h / 2);
    ctx.lineTo(x + w / 2, y + h * 0.25);
    ctx.stroke();
  });
  add(25, 26, 5, 5, (ctx, x, y, w, h) => {
    // Jam alarm
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
    ctx.stroke();
    // Numbers
    ctx.fillStyle = "#333";
    ctx.font = `${Math.max(3, w * 0.2)}px system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("12", x + w / 2, y + 2);
    ctx.fillText("6", x + w / 2, y + h - 2);
    ctx.fillText("3", x + w - 3, y + h / 2);
    ctx.fillText("9", x + 3, y + h / 2);
  });
  add(56, 82, 7, 6, (ctx, x, y, w, h) => {
    // Tas tangan
    ctx.fillStyle = "#4a3a2a";
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 2);
    ctx.fill();
    ctx.strokeStyle = "#6a5a4a";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(x + w / 2, y - 2, w / 3, Math.PI, 0);
    ctx.stroke();
  });
  add(0, 62, 6, 8, drawTrashCan);
  add(95, 52, 5, 5, (ctx, x, y, w, h) => {
    // Bola
    const ballGrad = ctx.createRadialGradient(x + w * 0.35, y + h * 0.35, 0, x + w / 2, y + h / 2, w / 2);
    ballGrad.addColorStop(0, "#4a8aca");
    ballGrad.addColorStop(1, "#2a5a8a");
    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath();
    ctx.arc(x + w * 0.35, y + h * 0.35, w * 0.15, 0, Math.PI * 2);
    ctx.fill();
  });
  add(88, 8, 6, 6, (ctx, x, y, w, h) => {
    // Hanger
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x, y + h * 0.5);
    ctx.lineTo(x + w, y + h * 0.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w / 2, y - 3);
    ctx.stroke();
  });
  add(5, 52, 16, 10, (ctx, x, y, w, h) => {
    // Karpet
    ctx.fillStyle = "rgba(100,50,30,0.25)";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(120,60,35,0.15)";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
    ctx.strokeStyle = "rgba(140,70,40,0.1)";
    ctx.strokeRect(x + 4, y + 4, w - 8, h - 8);
  });
  add(28, 5, 9, 12, (ctx, x, y, w, h) => {
    // Koper
    const copGrad = ctx.createLinearGradient(x, y, x + w, y);
    copGrad.addColorStop(0, "#2a4a6a");
    copGrad.addColorStop(0.5, "#1a3a5a");
    copGrad.addColorStop(1, "#2a4a6a");
    ctx.fillStyle = copGrad;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 3);
    ctx.fill();
    ctx.fillStyle = "#1a3050";
    ctx.fillRect(x, y + h * 0.6, w, 1.5);
    ctx.fillStyle = "#555";
    ctx.fillRect(x + w / 2 - 2, y - 2, 4, 3);
    // Handle
    ctx.strokeStyle = "#777";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x + w / 2, y - 1, 3, Math.PI, 0);
    ctx.stroke();
  });
  add(1, 47, 6, 8, drawTrashCan);

  return items;
}

const ROOM_ITEMS = createRoomItems();

// ── MAIN COMPONENT ──
export default function WorkspacePhase({ active, onUnlock }: Props) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [instructionVisible, setInstructionVisible] = useState(false);
  const [bearFound, setBearFound] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [pandaPhase, setPandaPhase] = useState<"hidden" | "appearing" | "talking" | "done">("hidden");
  const [talkFrame, setTalkFrame] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [pawPos] = useState(() => ({
    x: 8 + Math.random() * 82,
    y: 8 + Math.random() * 82,
  }));
  const [pawVisible, setPawVisible] = useState(false);
  const startTimeRef = useRef(0);
  const musicRef = useRef<{ stop: () => void } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pandaCanvasRef = useRef<HTMLCanvasElement>(null);
  const smoothMouse = useRef({ x: 0, y: 0 });
  const pandaAnimRef = useRef(0);

  const difficultyBoost = Math.min(elapsed / 20, 1);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (active) {
      setBearFound(false);
      setLightsOn(false);
      setPandaPhase("hidden");
      setPawVisible(false);
      setElapsed(0);
      startTimeRef.current = Date.now();
      setTimeout(() => setInstructionVisible(true), 800);
      startMusic();
    }
    return () => { stopMusic(); };
  }, [active]);

  useEffect(() => {
    if (!active || bearFound) return;
    const interval = setInterval(() => {
      setElapsed((Date.now() - startTimeRef.current) / 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [active, bearFound]);

  // Paw visibility
  useEffect(() => {
    if (!active || bearFound || lightsOn) return;
    const check = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const px = (pawPos.x / 100) * w;
      const py = (pawPos.y / 100) * h;
      const dx = smoothMouse.current.x - px;
      const dy = smoothMouse.current.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const detectionRadius = isMobile ? 50 : 75;
      setPawVisible(dist < detectionRadius);
    };
    const id = setInterval(check, 50);
    return () => clearInterval(id);
  }, [active, bearFound, lightsOn, pawPos, isMobile]);

  // Draw room canvas
  useEffect(() => {
    if (!active || bearFound || lightsOn) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const px = (pawPos.x / 100) * w;
      const py = (pawPos.y / 100) * h;
      const dx = smoothMouse.current.x - px;
      const dy = smoothMouse.current.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const detectionRadius = isMobile ? 50 : 75;
      const visibility = Math.max(0, 1 - dist / detectionRadius);

      // Draw room background
      drawRoom(ctx, w, h);

      // Draw room items
      for (const item of ROOM_ITEMS) {
        const ix = (item.x / 100) * w;
        const iy = (item.y / 100) * h;
        const iw = (item.w / 100) * w;
        const ih = (item.h / 100) * h;
        item.draw(ctx, ix, iy, iw, ih);
      }

      // Draw paw print
      if (visibility > 0.01) {
        drawPawPrint(ctx, px, py, visibility * 0.7);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active, bearFound, lightsOn, pawPos, isMobile]);

  // Panda animation
  useEffect(() => {
    if (pandaPhase === "hidden" || pandaPhase === "done") return;
    const canvas = pandaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width * 0.65;
      const cy = canvas.height * 0.5;

      if (pandaPhase === "appearing") {
        const progress = Math.min(frame / 40, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const scale = eased * 2.2;
        ctx.globalAlpha = eased;
        drawPanda(ctx, cx, cy, scale, 0);
        ctx.globalAlpha = 1;

        if (progress > 0.4) {
          const bubbleAlpha = Math.min((progress - 0.4) * 3, 1);
          ctx.globalAlpha = bubbleAlpha;
          ctx.fillStyle = "#f5f5f0";
          const bw = 320, bh = 60;
          const bx = cx - bw / 2, by = cy - 160;
          ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 12); ctx.fill();
          ctx.beginPath();
          ctx.moveTo(cx - 8, by + bh); ctx.lineTo(cx, by + bh + 14); ctx.lineTo(cx + 8, by + bh);
          ctx.closePath(); ctx.fill();
          ctx.fillStyle = "#1a1a1a";
          ctx.font = "600 18px system-ui, -apple-system, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("Wah, kamu telah menemukanku!", cx, by + 35);
          ctx.globalAlpha = 1;
        }
        if (frame >= 50) setPandaPhase("talking");
      } else if (pandaPhase === "talking") {
        ctx.globalAlpha = 1;
        drawPanda(ctx, cx, cy, 2.2, talkFrame);

        ctx.fillStyle = "#f5f5f0";
        const bw = 320, bh = 60;
        const bx = cx - bw / 2, by = cy - 160;
        ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 12); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx - 8, by + bh); ctx.lineTo(cx, by + bh + 14); ctx.lineTo(cx + 8, by + bh);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#1a1a1a";
        ctx.font = "600 18px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Wah, kamu telah menemukanku!", cx, by + 35);

        ctx.fillStyle = "#888";
        ctx.font = "14px system-ui";
        const dots = ".".repeat((Math.floor(frame / 15) % 3) + 1);
        ctx.fillText("Masuk ke portofolio" + dots, cx, by + bh + 35);
      }

      frame++;
      pandaAnimRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(pandaAnimRef.current);
  }, [pandaPhase, talkFrame]);

  useEffect(() => {
    if (pandaPhase !== "talking") return;
    const id = setInterval(() => setTalkFrame((f) => f + 1), 300);
    return () => clearInterval(id);
  }, [pandaPhase]);

  const startMusic = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.06;
      masterGain.connect(ctx.destination);

      const oscillators: OscillatorNode[] = [];
      const intervals: ReturnType<typeof setInterval>[] = [];

      const bassDrone = ctx.createOscillator();
      const bassGain = ctx.createGain();
      const bassFilter = ctx.createBiquadFilter();
      bassDrone.type = "sine"; bassDrone.frequency.value = 44;
      bassGain.gain.value = 0.35; bassFilter.type = "lowpass"; bassFilter.frequency.value = 120;
      bassDrone.connect(bassFilter); bassFilter.connect(bassGain); bassGain.connect(masterGain);
      bassDrone.start(); oscillators.push(bassDrone);

      const wobble = ctx.createOscillator();
      const wobbleGain = ctx.createGain();
      wobble.type = "sine"; wobble.frequency.value = 0.3; wobbleGain.gain.value = 3;
      wobble.connect(wobbleGain); wobbleGain.connect(bassDrone.frequency);
      wobble.start(); oscillators.push(wobble);

      const bassPatternNotes = [55, 65.41, 73.42, 61.74, 55, 73.42, 82.41, 65.41];
      let bassIdx = 0;
      const bassPat = ctx.createOscillator();
      const bassPatGain = ctx.createGain();
      const bassPatFilter = ctx.createBiquadFilter();
      bassPat.type = "triangle"; bassPat.frequency.value = bassPatternNotes[0];
      bassPatGain.gain.value = 0.18; bassPatFilter.type = "lowpass"; bassPatFilter.frequency.value = 250;
      bassPat.connect(bassPatFilter); bassPatFilter.connect(bassPatGain); bassPatGain.connect(masterGain);
      bassPat.start(); oscillators.push(bassPat);

      const bassInterval = setInterval(() => {
        bassIdx = (bassIdx + 1) % bassPatternNotes.length;
        bassPat.frequency.setTargetAtTime(bassPatternNotes[bassIdx], ctx.currentTime, 0.04);
        bassPatGain.gain.setTargetAtTime(0.22, ctx.currentTime, 0.01);
        bassPatGain.gain.setTargetAtTime(0.08, ctx.currentTime + 0.08, 0.15);
      }, 800); intervals.push(bassInterval);

      const arpNotes = [220, 261.63, 293.66, 329.63, 392, 523.25, 440, 349.23];
      let arpIdx = 0;
      const playArp = () => {
        if (!musicRef.current) return;
        const freq = arpNotes[arpIdx % arpNotes.length]; arpIdx++;
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = "sine"; osc.frequency.value = freq;
        filter.type = "lowpass"; filter.frequency.value = 1200;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.10, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(filter); filter.connect(gain); gain.connect(masterGain);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 1.3);
      };
      const arpInterval = setInterval(playArp, 600); intervals.push(arpInterval);
      setTimeout(playArp, 300);

      const padChords = [[220, 261.63, 329.63], [261.63, 329.63, 392], [196, 246.94, 293.66], [174.61, 220, 261.63]];
      let chordIdx = 0;
      const playChord = () => {
        if (!musicRef.current) return;
        const chord = padChords[chordIdx % padChords.length]; chordIdx++;
        chord.forEach((freq) => {
          const o1 = ctx.createOscillator(); const o2 = ctx.createOscillator();
          o1.type = "sawtooth"; o2.type = "sawtooth";
          o1.frequency.value = freq; o2.frequency.value = freq * 1.003;
          const pf = ctx.createBiquadFilter(); pf.type = "lowpass"; pf.frequency.value = 400; pf.Q.value = 1;
          const pg = ctx.createGain();
          pg.gain.setValueAtTime(0, ctx.currentTime);
          pg.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.8);
          pg.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5);
          o1.connect(pf); o2.connect(pf); pf.connect(pg); pg.connect(masterGain);
          o1.start(ctx.currentTime); o2.start(ctx.currentTime);
          o1.stop(ctx.currentTime + 3.6); o2.stop(ctx.currentTime + 3.6);
        });
      };
      const chordInterval = setInterval(playChord, 3200); intervals.push(chordInterval);
      setTimeout(playChord, 1000);

      const textureInterval = setInterval(() => {
        if (!musicRef.current) return;
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800 + Math.random() * 2000, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 2);
        filter.type = "bandpass"; filter.frequency.value = 500; filter.Q.value = 3;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
        osc.connect(filter); filter.connect(gain); gain.connect(masterGain);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 2.6);
      }, 5000 + Math.random() * 3000); intervals.push(textureInterval);

      const sparkleInterval = setInterval(() => {
        if (!musicRef.current || Math.random() > 0.6) return;
        const notes = [880, 1046.5, 1174.66, 1318.51, 1567.98];
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = "sine"; osc.frequency.value = notes[Math.floor(Math.random() * notes.length)];
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.connect(gain); gain.connect(masterGain);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.9);
      }, 2000); intervals.push(sparkleInterval);

      musicRef.current = {
        stop: () => {
          oscillators.forEach((osc) => { try { osc.stop(); } catch(_e) {} });
          intervals.forEach((id) => clearInterval(id));
          try { ctx.close(); } catch(_e) {}
        },
      };

      const updateFilter = () => {
        if (!musicRef.current) return;
        const boost = Math.min(elapsed / 30, 1);
        bassPatFilter.frequency.setTargetAtTime(250 + boost * 800, ctx.currentTime, 0.5);
        masterGain.gain.setTargetAtTime(0.05 + boost * 0.03, ctx.currentTime, 0.5);
        requestAnimationFrame(updateFilter);
      };
      updateFilter();
    } catch(_e) {}
  };

  const stopMusic = () => { try { musicRef.current?.stop(); } catch(_e) {} musicRef.current = null; };

  const playFoundSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      [523, 659, 784, 1047].forEach((freq, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = "sine"; osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.15 + 0.05);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.15 + 0.4);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.15); osc.stop(ctx.currentTime + i * 0.15 + 0.5);
      });
    } catch(_e) {}
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const pos = { x: e.clientX, y: e.clientY };
    setMousePos(pos); smoothMouse.current = pos;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const pos = { x: touch.clientX, y: touch.clientY };
    setMousePos(pos); smoothMouse.current = pos;
  }, []);

  useEffect(() => {
    if (!isMobile || !active) return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma || 0; const beta = e.beta || 0;
      const pos = {
        x: Math.max(0, Math.min(window.innerWidth, (gamma / 90) * window.innerWidth * 0.5 + window.innerWidth * 0.5)),
        y: Math.max(0, Math.min(window.innerHeight, (beta / 180) * window.innerHeight * 0.5 + window.innerHeight * 0.5)),
      };
      setMousePos(pos); smoothMouse.current = pos;
    };
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      (DeviceOrientationEvent as any).requestPermission().then((s: string) => {
        if (s === "granted") window.addEventListener("deviceorientation", handleOrientation);
      }).catch(() => {});
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isMobile, active]);

  const handleFound = useCallback(() => {
    if (bearFound) return;
    setBearFound(true); stopMusic(); playFoundSound();
    setLightsOn(true); setPandaPhase("appearing");
    setTimeout(() => { setPandaPhase("talking"); setTimeout(() => onUnlock(), 3500); }, 2000);
  }, [onUnlock, bearFound]);

  const handleClick = useCallback(() => {
    if (!bearFound && pawVisible) handleFound();
  }, [bearFound, pawVisible, handleFound]);

  const handleTouchEnd = useCallback(() => {
    if (!bearFound && pawVisible) handleFound();
  }, [bearFound, pawVisible, handleFound]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black cursor-none select-none overflow-hidden"
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchStart={isMobile ? (e) => {
        const t = e.touches[0]; const pos = { x: t.clientX, y: t.clientY };
        setMousePos(pos); smoothMouse.current = pos;
      } : undefined}
    >
      <AntiInspect />
      {!lightsOn && (
        <>
          <FlashlightCanvas mouseX={mousePos.x} mouseY={mousePos.y} active={active} isMobile={isMobile} difficultyBoost={difficultyBoost} />
          <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-[43] pointer-events-none" />
        </>
      )}
      {lightsOn && <div className="fixed inset-0 z-[41] bg-[#1a1a1a] transition-opacity duration-1000" />}
      <canvas ref={pandaCanvasRef} className={`fixed inset-0 w-full h-full z-[48] pointer-events-none transition-opacity duration-500 ${pandaPhase !== "hidden" ? "opacity-100" : "opacity-0"}`} />
      <div className={`fixed bottom-[8%] left-1/2 -translate-x-1/2 text-center z-[45] transition-all duration-1000 ${instructionVisible && !bearFound ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <p className="text-[0.95rem] text-white/50 tracking-wide font-light">
          {isMobile ? "Sentuh dan geser untuk menelusuri ruangan" : "Gerakkan mouse untuk menyalakan senter di ruangan gelap"}
        </p>
        <p className="text-[0.8rem] text-white/30 mt-2">Cari jejak kaki panda...</p>
      </div>
    </div>
  );
}
