"use client";

import { useState, useEffect } from "react";

type Pose =
  | "peeking-laptop"
  | "peeking-monitor"
  | "waving"
  | "pointing-start"
  | "working-laptop"
  | "detective-bamboo"
  | "flashlight-exploring"
  | "jumping-happy"
  | "unlocking-laptop"
  | "celebrating-confetti"
  | "eating-bamboo"
  | "sleeping-desk"
  | "thinking-scratch"
  | "thumbs-up"
  | "pointing-project"
  | "holding-certificate"
  | "holding-phone"
  | "holding-controller"
  | "interacting-robot"
  | "goodbye-wave";

interface Props {
  pose?: Pose;
  size?: number;
  className?: string;
  expression?: "happy" | "curious" | "excited" | "thinking" | "surprised" | "sleepy";
  speaking?: boolean;
}

// ── CORE PANDA BODY PARTS ──
function PandaHead({ cx, cy, scale = 1, expression = "happy", speaking = false }: { cx: number; cy: number; scale?: number; expression?: string; speaking?: boolean }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`}>
      {/* Head */}
      <ellipse cx="0" cy="0" rx="38" ry="36" fill="#f5f5f0" />
      <ellipse cx="0" cy="2" rx="32" ry="30" fill="#f8f8f3" />

      {/* Ears */}
      <circle cx="-28" cy="-30" r="12" fill="#1a1a1a" />
      <circle cx="-28" cy="-30" r="7" fill="#333" />
      <circle cx="28" cy="-30" r="12" fill="#1a1a1a" />
      <circle cx="28" cy="-30" r="7" fill="#333" />

      {/* Eye patches */}
      <ellipse cx="-14" cy="-4" rx="13" ry="11" fill="#1a1a1a" transform="rotate(-5 -14 -4)" />
      <ellipse cx="14" cy="-4" rx="13" ry="11" fill="#1a1a1a" transform="rotate(5 14 -4)" />

      {/* Eye whites */}
      <circle cx="-14" cy="-4" r="6" fill="white" />
      <circle cx="14" cy="-4" r="6" fill="white" />

      {/* Pupils - expressions */}
      {expression === "happy" && (
        <>
          <path d="M-17 -5 Q-14 -9 -11 -5" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" />
          <path d="M11 -5 Q14 -9 17 -5" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {expression === "curious" && (
        <>
          <circle cx="-12" cy="-4" r="3.5" fill="#111" />
          <circle cx="16" cy="-4" r="3.5" fill="#111" />
          <circle cx="-11" cy="-5" r="1.2" fill="white" />
          <circle cx="17" cy="-5" r="1.2" fill="white" />
        </>
      )}
      {expression === "excited" && (
        <>
          <circle cx="-14" cy="-4" r="4.5" fill="#111" />
          <circle cx="14" cy="-4" r="4.5" fill="#111" />
          <circle cx="-12" cy="-6" r="1.8" fill="white" />
          <circle cx="16" cy="-6" r="1.8" fill="white" />
          <circle cx="-15" cy="-3" r="0.8" fill="white" />
          <circle cx="13" cy="-3" r="0.8" fill="white" />
        </>
      )}
      {expression === "thinking" && (
        <>
          <circle cx="-14" cy="-3" r="3.5" fill="#111" />
          <circle cx="14" cy="-5" r="3.5" fill="#111" />
          <circle cx="-13" cy="-4" r="1.2" fill="white" />
          <circle cx="15" cy="-6" r="1.2" fill="white" />
        </>
      )}
      {expression === "surprised" && (
        <>
          <circle cx="-14" cy="-4" r="5" fill="#111" />
          <circle cx="14" cy="-4" r="5" fill="#111" />
          <circle cx="-12" cy="-6" r="2" fill="white" />
          <circle cx="16" cy="-6" r="2" fill="white" />
        </>
      )}
      {expression === "sleepy" && (
        <>
          <path d="M-17 -3 Q-14 0 -11 -3" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" />
          <path d="M11 -3 Q14 0 17 -3" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {/* Nose */}
      <ellipse cx="0" cy="6" rx="4.5" ry="3.5" fill="#222" />
      <ellipse cx="-1" cy="5" rx="1.5" ry="1" fill="rgba(255,255,255,0.3)" />

      {/* Mouth */}
      {speaking ? (
        <ellipse cx="0" cy="12" rx="3" ry={2.5 + Math.sin(Date.now() * 0.01) * 1.5} fill="#222" />
      ) : expression === "happy" || expression === "excited" ? (
        <path d="M-5 10 Q0 16 5 10" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
      ) : expression === "surprised" ? (
        <ellipse cx="0" cy="13" rx="3" ry="4" fill="#222" />
      ) : expression === "sleepy" ? (
        <path d="M-3 11 Q0 13 3 11" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" />
      ) : (
        <path d="M-4 11 Q0 15 4 11" fill="none" stroke="#222" strokeWidth="1.3" strokeLinecap="round" />
      )}

      {/* Blush */}
      <circle cx="-24" cy="6" r="5" fill="#e8a0a0" opacity="0.25" />
      <circle cx="24" cy="6" r="5" fill="#e8a0a0" opacity="0.25" />
    </g>
  );
}

function PandaBody({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`}>
      {/* Body */}
      <ellipse cx="0" cy="0" rx="32" ry="28" fill="#f5f5f0" />
      {/* Belly */}
      <ellipse cx="0" cy="2" rx="22" ry="20" fill="#fff8f0" />
      {/* Hoodie */}
      <path d="M-28 -8 Q-30 15 -25 25 Q-15 32 0 34 Q15 32 25 25 Q30 15 28 -8" fill="#222" opacity="0.85" />
      <path d="M-22 -4 Q-24 12 -20 20 Q-10 26 0 28 Q10 26 20 20 Q24 12 22 -4" fill="#f5f5f0" />
      {/* Hoodie string */}
      <line x1="-6" y1="-6" x2="-6" y2="8" stroke="#555" strokeWidth="0.8" />
      <line x1="6" y1="-6" x2="6" y2="8" stroke="#555" strokeWidth="0.8" />
      {/* Blue accent */}
      <rect x="-3" y="-8" width="6" height="3" rx="1.5" fill="#3b82f6" />
    </g>
  );
}

function PandaArm({ cx, cy, angle = 0, scale = 1, side = "left" }: { cx: number; cy: number; angle?: number; scale?: number; side?: string }) {
  const flip = side === "right" ? -1 : 1;
  return (
    <g transform={`translate(${cx},${cy}) rotate(${angle * flip}) scale(${scale * flip}, ${scale})`}>
      <ellipse cx="0" cy="0" rx="8" ry="18" fill="#1a1a1a" />
      <circle cx="0" cy="16" r="7" fill="#f5f5f0" />
    </g>
  );
}

function PandaLeg({ cx, cy, scale = 1, angle = 0 }: { cx: number; cy: number; scale?: number; angle?: number }) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${angle}) scale(${scale})`}>
      <ellipse cx="0" cy="0" rx="9" ry="7" fill="#1a1a1a" />
      <ellipse cx="0" cy="2" rx="7" ry="5" fill="#f5f5f0" />
    </g>
  );
}

// ── ACCESSORIES ──
function Laptop({ x, y, scale = 1, open = true }: { x: number; y: number; scale?: number; open?: boolean }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      {open ? (
        <>
          <rect x="-18" y="-12" width="36" height="22" rx="2" fill="#333" />
          <rect x="-16" y="-10" width="32" height="17" rx="1" fill="#1a2a3a" />
          <rect x="-20" y="10" width="40" height="3" rx="1.5" fill="#444" />
          <rect x="-18" y="10" width="36" height="2" rx="1" fill="#555" />
          {/* Screen glow */}
          <rect x="-14" y="-8" width="28" height="13" rx="0.5" fill="#0a1520" opacity="0.5" />
        </>
      ) : (
        <rect x="-18" y="-2" width="36" height="3" rx="1.5" fill="#333" />
      )}
    </g>
  );
}

function Flashlight({ x, y, scale = 1, on = true }: { x: number; y: number; scale?: number; on?: boolean }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-3" y="-15" width="6" height="20" rx="2" fill="#555" />
      <rect x="-4" y="-17" width="8" height="5" rx="2" fill="#777" />
      {on && (
        <ellipse cx="0" cy="-22" rx="12" ry="8" fill="rgba(255,248,200,0.15)" />
      )}
    </g>
  );
}

function Bamboo({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-2" y="-30" width="4" height="60" rx="2" fill="#4a7a2a" />
      <rect x="-1.5" y="-28" width="3" height="2" fill="#5a8a3a" />
      <rect x="-1.5" y="-15" width="3" height="2" fill="#5a8a3a" />
      <rect x="-1.5" y="-2" width="3" height="2" fill="#5a8a3a" />
      <ellipse cx="-4" cy="-22" rx="6" ry="3" fill="#3a6a1a" transform="rotate(-30 -4 -22)" />
      <ellipse cx="4" cy="-12" rx="5" ry="2.5" fill="#3a6a1a" transform="rotate(25 4 -12)" />
    </g>
  );
}

function CoffeeMug({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-6" y="-8" width="12" height="10" rx="1.5" fill="#fff" />
      <rect x="-5" y="-7" width="10" height="8" rx="1" fill="#ddd" />
      <path d="M6 -5 Q10 -5 10 -1 Q10 3 6 3" fill="none" stroke="#fff" strokeWidth="1.5" />
      {/* Steam */}
      <path d="M-2 -10 Q-1 -13 0 -10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      <path d="M2 -11 Q3 -14 4 -11" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
    </g>
  );
}

function Headphones({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M-14 -5 Q-14 -18 0 -18 Q14 -18 14 -5" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      <rect x="-16" y="-8" width="5" height="10" rx="2.5" fill="#444" />
      <rect x="11" y="-8" width="5" height="10" rx="2.5" fill="#444" />
    </g>
  );
}

function Certificate({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-12" y="-9" width="24" height="18" rx="1" fill="#fff" />
      <rect x="-10" y="-7" width="20" height="14" rx="0.5" fill="#f5f5f0" />
      <rect x="-7" y="-4" width="14" height="1.5" rx="0.5" fill="#ccc" />
      <rect x="-5" y="-1" width="10" height="1" rx="0.5" fill="#ddd" />
      <rect x="-4" y="1.5" width="8" height="1" rx="0.5" fill="#ddd" />
      <circle cx="0" cy="5" r="3" fill="none" stroke="#B8860B" strokeWidth="1" />
      <text x="0" y="6.5" textAnchor="middle" fontSize="4" fill="#B8860B" fontWeight="bold">★</text>
    </g>
  );
}

function Robot({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-8" y="-10" width="16" height="14" rx="3" fill="#666" />
      <circle cx="-3" cy="-4" r="2" fill="#3b82f6" />
      <circle cx="3" cy="-4" r="2" fill="#3b82f6" />
      <rect x="-6" y="4" width="12" height="8" rx="2" fill="#555" />
      <rect x="-10" y="-6" width="3" height="6" rx="1" fill="#666" />
      <rect x="7" y="-6" width="3" height="6" rx="1" fill="#666" />
      <rect x="-5" y="12" width="4" height="5" rx="1" fill="#555" />
      <rect x="1" y="12" width="4" height="5" rx="1" fill="#555" />
      <line x1="-3" y1="-12" x2="-3" y2="-15" stroke="#888" strokeWidth="1" />
      <circle cx="-3" cy="-16" r="1.5" fill="#ef4444" />
    </g>
  );
}

function GameController({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M-12 -4 Q-14 4 -10 8 Q-6 10 -2 8 L2 8 Q6 10 10 8 Q14 4 12 -4 Q8 -8 0 -8 Q-8 -8 -12 -4Z" fill="#333" />
      <circle cx="-6" cy="0" r="2.5" fill="#555" />
      <circle cx="6" cy="-1" r="1.5" fill="#ef4444" />
      <circle cx="8" cy="1" r="1.5" fill="#22c55e" />
      <circle cx="4" cy="-1" r="1.5" fill="#3b82f6" />
      <circle cx="6" cy="3" r="1.5" fill="#eab308" />
    </g>
  );
}

function Phone({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-5" y="-9" width="10" height="18" rx="2" fill="#1a1a1a" />
      <rect x="-4" y="-7" width="8" height="14" rx="1" fill="#1a2a3a" />
      <circle cx="0" cy="-7.5" r="0.8" fill="#333" />
    </g>
  );
}

function Confetti({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const colors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ec4899"];
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      {colors.map((color, i) => {
        const angle = (i / colors.length) * Math.PI * 2;
        const r = 15 + Math.random() * 10;
        return (
          <g key={i}>
            <rect
              x={Math.cos(angle) * r - 2}
              y={Math.sin(angle) * r - 1}
              width="4"
              height="2"
              rx="0.5"
              fill={color}
              transform={`rotate(${i * 60} ${Math.cos(angle) * r} ${Math.sin(angle) * r})`}
            />
          </g>
        );
      })}
    </g>
  );
}

// ── POSE COMPONENTS ──
function PosePeekingLaptop({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <Laptop x={100} y={140} scale={2.5} open={true} />
      {/* Only eyes and ears visible above laptop */}
      <g transform="translate(100,100)">
        <circle cx="-28" cy="-30" r="10" fill="#1a1a1a" />
        <circle cx="28" cy="-30" r="10" fill="#1a1a1a" />
        <circle cx="-28" cy="-30" r="5" fill="#333" />
        <circle cx="28" cy="-30" r="5" fill="#333" />
        <ellipse cx="-14" cy="-8" rx="11" ry="9" fill="#1a1a1a" transform="rotate(-5 -14 -8)" />
        <ellipse cx="14" cy="-8" rx="11" ry="9" fill="#1a1a1a" transform="rotate(5 14 -8)" />
        <circle cx="-14" cy="-8" r="5" fill="white" />
        <circle cx="14" cy="-8" r="5" fill="white" />
        <circle cx="-12" cy="-9" r="2.5" fill="#111" />
        <circle cx="16" cy="-9" r="2.5" fill="#111" />
        <circle cx="-11" cy="-10" r="0.8" fill="white" />
        <circle cx="17" cy="-10" r="0.8" fill="white" />
      </g>
    </svg>
  );
}

function PosePeekingMonitor({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* Monitor */}
      <rect x="60" y="30" width="80" height="55" rx="4" fill="#111" />
      <rect x="64" y="34" width="72" height="47" rx="2" fill="#1a2a3a" />
      <rect x="92" y="85" width="16" height="8" fill="#333" />
      <rect x="82" y="93" width="36" height="4" rx="2" fill="#444" />
      {/* Panda peeking from right side */}
      <g transform="translate(155,55)">
        <circle cx="-20" cy="-25" r="9" fill="#1a1a1a" />
        <ellipse cx="-10" cy="0" rx="28" ry="26" fill="#f5f5f0" />
        <ellipse cx="-8" cy="2" rx="10" ry="9" fill="#1a1a1a" transform="rotate(-5 -8 2)" />
        <circle cx="-8" cy="2" r="4" fill="white" />
        <circle cx="-6" cy="1" r="2" fill="#111" />
        <circle cx="-5" cy="0" r="0.7" fill="white" />
        <ellipse cx="-4" cy="8" rx="3" ry="2.5" fill="#222" />
        <path d="M-8 12 Q-4 16 0 12" fill="none" stroke="#222" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="-18" cy="8" r="3.5" fill="#e8a0a0" opacity="0.25" />
      </g>
    </svg>
  );
}

function PoseWaving({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,95) scale(1.3)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-32} cy={5} angle={20} side="left" />
        <PandaArm cx={32} cy={-10} angle={-60} side="right" />
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="happy" />
      </g>
    </svg>
  );
}

function PosePointingStart({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(80,95) scale(1.3)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-32} cy={5} angle={15} side="left" />
        {/* Pointing right arm */}
        <g transform="translate(32,-5) rotate(-30)">
          <ellipse cx="0" cy="0" rx="7" ry="16" fill="#1a1a1a" />
          <circle cx="0" cy="14" r="6" fill="#f5f5f0" />
          <line x1="0" y1="14" x2="12" y2="10" stroke="#f5f5f0" strokeWidth="3" strokeLinecap="round" />
        </g>
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="excited" />
      </g>
      {/* Arrow / button hint */}
      <g transform="translate(160,100)">
        <rect x="-5" y="-12" width="30" height="24" rx="12" fill="#f5f5f0" opacity="0.1" />
        <path d="M0 -5 L8 0 L0 5" fill="#f5f5f0" opacity="0.3" />
      </g>
    </svg>
  );
}

function PoseWorkingLaptop({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,90) scale(1.2)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={8} angle={30} side="left" />
        <PandaArm cx={28} cy={8} angle={-30} side="right" />
        <PandaLeg cx={-14} cy={55} />
        <PandaLeg cx={14} cy={55} />
        <PandaHead cx={0} cy={-20} expression="thinking" />
      </g>
      <Laptop x={100} y={135} scale={2} open={true} />
    </svg>
  );
}

function PoseDetectiveBamboo({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(90,90) scale(1.2)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={5} angle={20} side="left" />
        <PandaArm cx={28} cy={-5} angle={-50} side="right" />
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="curious" />
      </g>
      <Bamboo x={130} y={80} scale={1.5} />
      {/* Detective hat */}
      <g transform="translate(90,58)">
        <ellipse cx="0" cy="5" rx="20" ry="5" fill="#333" />
        <rect x="-12" y="-8" width="24" height="14" rx="3" fill="#333" />
      </g>
    </svg>
  );
}

function PoseFlashlight({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(90,90) scale(1.2)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={5} angle={20} side="left" />
        <g transform="translate(28,-5) rotate(-45)">
          <ellipse cx="0" cy="0" rx="7" ry="16" fill="#1a1a1a" />
          <circle cx="0" cy="14" r="6" fill="#f5f5f0" />
        </g>
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="curious" />
      </g>
      <Flashlight x={130} y={70} scale={2} on={true} />
      {/* Light beam */}
      <ellipse cx="160" cy="120" rx="30" ry="20" fill="rgba(255,248,200,0.08)" />
    </svg>
  );
}

function PoseJumpingHappy({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,80) scale(1.3)">
        <PandaBody cx={0} cy={25} />
        <PandaArm cx={-32} cy={0} angle={-40} side="left" />
        <PandaArm cx={32} cy={0} angle={40} side="right" />
        <PandaLeg cx={-14} cy={50} angle={15} />
        <PandaLeg cx={14} cy={50} angle={-15} />
        <PandaHead cx={0} cy={-22} expression="excited" />
      </g>
      {/* Motion lines */}
      <line x1="80" y1="160" x2="75" y2="175" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="100" y1="165" x2="100" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="120" y1="160" x2="125" y2="175" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PoseUnlockingLaptop({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,85) scale(1.2)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={8} angle={25} side="left" />
        <PandaArm cx={28} cy={8} angle={-25} side="right" />
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="excited" />
      </g>
      <Laptop x={100} y={130} scale={2.2} open={true} />
      {/* Sparkle effects */}
      <g opacity="0.4">
        <path d="M140 100 L142 95 L144 100 L149 102 L144 104 L142 109 L140 104 L135 102Z" fill="#f5f5f0" />
        <path d="M60 95 L61.5 91 L63 95 L67 96.5 L63 98 L61.5 102 L60 98 L56 96.5Z" fill="#f5f5f0" />
      </g>
    </svg>
  );
}

function PoseCelebrating({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,85) scale(1.3)">
        <PandaBody cx={0} cy={28} />
        <PandaArm cx={-32} cy={-5} angle={-55} side="left" />
        <PandaArm cx={32} cy={-5} angle={55} side="right" />
        <PandaLeg cx={-14} cy={53} />
        <PandaLeg cx={14} cy={53} />
        <PandaHead cx={0} cy={-22} expression="excited" />
      </g>
      <Confetti x={100} y={60} scale={2} />
      <Confetti x={50} y={80} scale={1.2} />
      <Confetti x={150} y={70} scale={1.5} />
    </svg>
  );
}

function PoseEatingBamboo({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,90) scale(1.2)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-25} cy={5} angle={30} side="left" />
        <PandaArm cx={25} cy={-10} angle={-40} side="right" />
        <PandaLeg cx={-14} cy={55} />
        <PandaLeg cx={14} cy={55} />
        <PandaHead cx={0} cy={-20} expression="happy" speaking={true} />
      </g>
      <Bamboo x={125} y={60} scale={1.8} />
    </svg>
  );
}

function PoseSleeping({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* Desk */}
      <rect x="30" y="120" width="140" height="6" rx="2" fill="#4a3520" />
      {/* Panda sleeping on desk */}
      <g transform="translate(90,100) rotate(15)">
        <ellipse cx="0" cy="15" rx="28" ry="22" fill="#f5f5f0" />
        <ellipse cx="0" cy="17" rx="20" ry="16" fill="#fff8f0" />
        <circle cx="0" cy="-8" r="26" fill="#f5f5f0" />
        <circle cx="-18" cy="-28" r="8" fill="#1a1a1a" />
        <circle cx="18" cy="-28" r="8" fill="#1a1a1a" />
        <circle cx="-18" cy="-28" r="4" fill="#333" />
        <circle cx="18" cy="-28" r="4" fill="#333" />
        <ellipse cx="-10" cy="-10" rx="8" ry="6" fill="#1a1a1a" />
        <ellipse cx="10" cy="-10" rx="8" ry="6" fill="#1a1a1a" />
        <path d="M-12 -10 Q-10 -7 -8 -10" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 -10 Q10 -7 12 -10" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="0" cy="-3" rx="3" ry="2.5" fill="#222" />
        <path d="M-3 2 Q0 4 3 2" fill="none" stroke="#222" strokeWidth="1" strokeLinecap="round" />
        <circle cx="-16" cy="0" r="3.5" fill="#e8a0a0" opacity="0.25" />
        <circle cx="16" cy="0" r="3.5" fill="#e8a0a0" opacity="0.25" />
      </g>
      {/* ZZZ */}
      <text x="140" y="60" fill="rgba(255,255,255,0.2)" fontSize="16" fontFamily="system-ui" fontWeight="bold">Z</text>
      <text x="152" y="48" fill="rgba(255,255,255,0.15)" fontSize="12" fontFamily="system-ui" fontWeight="bold">z</text>
      <text x="160" y="38" fill="rgba(255,255,255,0.1)" fontSize="9" fontFamily="system-ui" fontWeight="bold">z</text>
    </svg>
  );
}

function PoseThinking({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,90) scale(1.3)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={5} angle={15} side="left" />
        <PandaArm cx={28} cy={-15} angle={-70} side="right" />
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="thinking" />
      </g>
      {/* Thought bubble */}
      <g opacity="0.3">
        <circle cx="145" cy="45" r="2" fill="white" />
        <circle cx="155" cy="35" r="3" fill="white" />
        <ellipse cx="165" cy="20" rx="18" ry="12" fill="white" />
        <text x="165" y="24" textAnchor="middle" fontSize="10" fill="#333">?</text>
      </g>
    </svg>
  );
}

function PoseThumbsUp({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,90) scale(1.3)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={5} angle={15} side="left" />
        <g transform="translate(30,-8) rotate(-35)">
          <ellipse cx="0" cy="0" rx="7" ry="16" fill="#1a1a1a" />
          <circle cx="0" cy="14" r="6" fill="#f5f5f0" />
          {/* Thumb up */}
          <rect x="-2" y="8" width="4" height="8" rx="2" fill="#f5f5f0" />
          <circle cx="0" cy="7" r="3" fill="#f5f5f0" />
        </g>
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="happy" />
      </g>
    </svg>
  );
}

function PosePointingProject({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(70,90) scale(1.2)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={5} angle={15} side="left" />
        <g transform="translate(28,-5) rotate(-25)">
          <ellipse cx="0" cy="0" rx="7" ry="16" fill="#1a1a1a" />
          <circle cx="0" cy="14" r="6" fill="#f5f5f0" />
          <line x1="0" y1="14" x2="15" y2="8" stroke="#f5f5f0" strokeWidth="3" strokeLinecap="round" />
        </g>
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="curious" />
      </g>
      {/* Project card hint */}
      <rect x="130" y="60" width="50" height="35" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x="136" y="66" width="20" height="3" rx="1" fill="rgba(255,255,255,0.1)" />
      <rect x="136" y="72" width="35" height="2" rx="1" fill="rgba(255,255,255,0.06)" />
      <rect x="136" y="77" width="30" height="2" rx="1" fill="rgba(255,255,255,0.06)" />
    </svg>
  );
}

function PoseCertificate({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,90) scale(1.2)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={5} angle={20} side="left" />
        <PandaArm cx={28} cy={-5} angle={-45} side="right" />
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="excited" />
      </g>
      <Certificate x={135} y={55} scale={2.5} />
    </svg>
  );
}

function PosePhone({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,90) scale(1.2)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={5} angle={15} side="left" />
        <g transform="translate(28,-8) rotate(-40)">
          <ellipse cx="0" cy="0" rx="7" ry="16" fill="#1a1a1a" />
          <circle cx="0" cy="14" r="6" fill="#f5f5f0" />
        </g>
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="happy" />
      </g>
      <Phone x={135} y={55} scale={2.5} />
    </svg>
  );
}

function PoseController({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,85) scale(1.2)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-25} cy={8} angle={30} side="left" />
        <PandaArm cx={25} cy={8} angle={-30} side="right" />
        <PandaLeg cx={-14} cy={55} />
        <PandaLeg cx={14} cy={55} />
        <PandaHead cx={0} cy={-20} expression="excited" />
      </g>
      <GameController x={100} y={125} scale={2.5} />
    </svg>
  );
}

function PoseRobot({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(80,90) scale(1.2)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={5} angle={20} side="left" />
        <PandaArm cx={28} cy={0} angle={-35} side="right" />
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="curious" />
      </g>
      <Robot x={140} y={100} scale={2.5} />
    </svg>
  );
}

function PoseGoodbye({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <g transform="translate(100,90) scale(1.3)">
        <PandaBody cx={0} cy={30} />
        <PandaArm cx={-28} cy={5} angle={15} side="left" />
        <PandaArm cx={32} cy={-10} angle={-55} side="right" />
        <PandaLeg cx={-12} cy={55} />
        <PandaLeg cx={12} cy={55} />
        <PandaHead cx={0} cy={-20} expression="happy" />
      </g>
      {/* Wave lines */}
      <path d="M145 65 Q155 60 150 50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M155 70 Q165 65 160 55" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── MAIN COMPONENT ──
const POSE_MAP: Record<Pose, React.FC<{ size: number }>> = {
  "peeking-laptop": PosePeekingLaptop,
  "peeking-monitor": PosePeekingMonitor,
  "waving": PoseWaving,
  "pointing-start": PosePointingStart,
  "working-laptop": PoseWorkingLaptop,
  "detective-bamboo": PoseDetectiveBamboo,
  "flashlight-exploring": PoseFlashlight,
  "jumping-happy": PoseJumpingHappy,
  "unlocking-laptop": PoseUnlockingLaptop,
  "celebrating-confetti": PoseCelebrating,
  "eating-bamboo": PoseEatingBamboo,
  "sleeping-desk": PoseSleeping,
  "thinking-scratch": PoseThinking,
  "thumbs-up": PoseThumbsUp,
  "pointing-project": PosePointingProject,
  "holding-certificate": PoseCertificate,
  "holding-phone": PosePhone,
  "holding-controller": PoseController,
  "interacting-robot": PoseRobot,
  "goodbye-wave": PoseGoodbye,
};

export default function PandaMascot({ pose = "waving", size = 200, className = "", expression, speaking }: Props) {
  const PoseComponent = POSE_MAP[pose];
  return (
    <div className={`inline-block ${className}`}>
      <PoseComponent size={size} />
    </div>
  );
}

export type { Pose };
