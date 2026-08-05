"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PandaSceneProps {
  mouseX: number;
  mouseY: number;
  isMobile: boolean;
  onBearFound: () => void;
  lightsOn?: boolean;
  showPanda?: boolean;
  zoomToPaw?: boolean;
  difficultyBoost?: number;
}

export default function PandaScene({ mouseX, mouseY, isMobile, onBearFound, lightsOn = false, showPanda = false, zoomToPaw = false, difficultyBoost = 0 }: PandaSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer } | null>(null);
  const foundRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || sceneRef.current) return;
    const container = containerRef.current;

    const init = async () => {
      const THREE_NS = await import("three");

      const scene = new THREE_NS.Scene();
      scene.background = new THREE_NS.Color(lightsOn ? 0x1a1a1a : 0x0a0a0a);
      scene.fog = new THREE_NS.FogExp2(lightsOn ? 0x1a1a1a : 0x0a0a0a, lightsOn ? 0.04 : 0.1);

      const camera = new THREE_NS.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 2.5, 7);
      camera.lookAt(0, 0.8, 0);

      const renderer = new THREE_NS.WebGLRenderer({ antialias: false, powerPreference: "low-power" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.shadowMap.enabled = false;
      renderer.toneMapping = THREE_NS.NoToneMapping;
      container.appendChild(renderer.domElement);

      const raycaster = new THREE_NS.Raycaster();

      // ─── Materials ────────────────────────────────
      const wallColor = lightsOn ? 0x3a3a3a : 0x252525;
      const floorColor = lightsOn ? 0x5a4a2a : 0x3a2a15;
      const wallMat = new THREE_NS.MeshStandardMaterial({ color: wallColor, roughness: 0.9 });
      const floorMat = new THREE_NS.MeshStandardMaterial({ color: floorColor, roughness: 0.85 });
      const darkWood = new THREE_NS.MeshStandardMaterial({ color: lightsOn ? 0x6a4a2a : 0x4a3018, roughness: 0.8 });
      const medWood = new THREE_NS.MeshStandardMaterial({ color: lightsOn ? 0x8a6a4a : 0x6a4a2a, roughness: 0.8 });
      const metalMat = new THREE_NS.MeshStandardMaterial({ color: 0x666666, metalness: 0.6, roughness: 0.4 });
      const fabricMat = new THREE_NS.MeshStandardMaterial({ color: lightsOn ? 0x6a5540 : 0x4a3520, roughness: 0.95 });

      // ─── Room ────────────────────────────────────
      const floor = new THREE_NS.Mesh(new THREE_NS.PlaneGeometry(20, 20), floorMat);
      floor.rotation.x = -Math.PI / 2;
      scene.add(floor);

      const backWall = new THREE_NS.Mesh(new THREE_NS.PlaneGeometry(20, 8), wallMat);
      backWall.position.set(0, 4, -6);
      scene.add(backWall);

      const leftWall = new THREE_NS.Mesh(new THREE_NS.PlaneGeometry(20, 8), wallMat);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.set(-7, 4, 0);
      scene.add(leftWall);

      const rightWall = new THREE_NS.Mesh(new THREE_NS.PlaneGeometry(20, 8), wallMat);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.set(7, 4, 0);
      scene.add(rightWall);

      const ceiling = new THREE_NS.Mesh(new THREE_NS.PlaneGeometry(20, 20), new THREE_NS.MeshStandardMaterial({ color: lightsOn ? 0x2a2a2a : 0x1a1a1a, roughness: 1 }));
      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.y = 8;
      scene.add(ceiling);

      // ─── Desk area (left) ─────────────────────────
      const deskTop = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(2.4, 0.08, 1), darkWood);
      deskTop.position.set(-4, 0.9, -3);
      scene.add(deskTop);
      for (const dx of [-5.1, -2.9]) {
        for (const dz of [-3.4, -2.6]) {
          const leg = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.04, 0.04, 0.9), darkWood);
          leg.position.set(dx, 0.45, dz);
          scene.add(leg);
        }
      }

      // Monitor + stand
      const monStand = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.03, 0.04, 0.2), metalMat);
      monStand.position.set(-4, 1.04, -3);
      scene.add(monStand);
      const monitor = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.8, 0.55, 0.04), new THREE_NS.MeshStandardMaterial({ color: 0x111111 }));
      monitor.position.set(-4, 1.4, -3);
      scene.add(monitor);
      const screen = new THREE_NS.Mesh(new THREE_NS.PlaneGeometry(0.7, 0.45), new THREE_NS.MeshStandardMaterial({ color: 0x0a1520, emissive: lightsOn ? 0x101520 : 0x050a10, emissiveIntensity: lightsOn ? 0.5 : 0.3 }));
      screen.position.set(-4, 1.4, -2.97);
      scene.add(screen);

      // Keyboard + mouse + mousepad
      const kb = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.4, 0.02, 0.15), new THREE_NS.MeshStandardMaterial({ color: 0x222222 }));
      kb.position.set(-4, 0.96, -2.3);
      scene.add(kb);
      const mousepad = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.25, 0.005, 0.2), new THREE_NS.MeshStandardMaterial({ color: 0x1a1a2a }));
      mousepad.position.set(-3.3, 0.945, -2.3);
      scene.add(mousepad);
      const mouseObj = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.06, 0.02, 0.1), metalMat);
      mouseObj.position.set(-3.3, 0.96, -2.3);
      scene.add(mouseObj);

      // Desk lamp
      const lampBase = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.1, 0.12, 0.04, 12), metalMat);
      lampBase.position.set(-5, 0.94, -3.2);
      scene.add(lampBase);
      const lampArm = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.015, 0.015, 0.5), metalMat);
      lampArm.position.set(-5, 1.2, -3.2);
      lampArm.rotation.z = 0.3;
      scene.add(lampArm);
      const lampHead = new THREE_NS.Mesh(new THREE_NS.ConeGeometry(0.08, 0.12, 8, 1, true), new THREE_NS.MeshStandardMaterial({ color: 0x888888, side: THREE_NS.DoubleSide }));
      lampHead.position.set(-4.85, 1.45, -3.2);
      scene.add(lampHead);
      const deskLight = new THREE_NS.PointLight(0xfff0d0, lightsOn ? 0.8 : 0.4, lightsOn ? 8 : 4);
      deskLight.position.set(-4.85, 1.4, -3.2);
      scene.add(deskLight);

      // Pens holder + pens
      const penCup = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.04, 0.035, 0.12, 8), new THREE_NS.MeshStandardMaterial({ color: 0x333366 }));
      penCup.position.set(-3.2, 1.0, -3.3);
      scene.add(penCup);
      for (let i = 0; i < 4; i++) {
        const pen = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.005, 0.005, 0.14, 4), new THREE_NS.MeshStandardMaterial({ color: [0x2244aa, 0xaa2222, 0x22aa22, 0xaaaa22][i] }));
        pen.position.set(-3.2 + (i - 1.5) * 0.012, 1.08, -3.3);
        pen.rotation.z = (i - 1.5) * 0.1;
        scene.add(pen);
      }

      // Books on desk
      for (let i = 0; i < 3; i++) {
        const book = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.18, 0.03, 0.14), new THREE_NS.MeshStandardMaterial({ color: [0x8B4513, 0x2E4057, 0x8B0000][i] }));
        book.position.set(-4.8 + i * 0.19, 0.955, -2.7);
        scene.add(book);
      }

      // Coffee mug on desk
      const deskMug = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.04, 0.035, 0.08, 10), new THREE_NS.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }));
      deskMug.position.set(-3.5, 0.98, -3.4);
      scene.add(deskMug);

      // ─── Chair ────────────────────────────────────
      const chairSeat = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.6, 0.06, 0.6), medWood);
      chairSeat.position.set(-4, 0.55, -1.5);
      scene.add(chairSeat);
      const chairBack = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.6, 0.7, 0.06), medWood);
      chairBack.position.set(-4, 0.9, -1.8);
      scene.add(chairBack);
      for (const cx of [-4.22, -3.78]) {
        for (const cz of [-1.28, -1.72]) {
          const cl = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.025, 0.025, 0.55), darkWood);
          cl.position.set(cx, 0.275, cz);
          scene.add(cl);
        }
      }

      // ─── Bookshelf (right back) ───────────────────
      const bookshelf = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(1.4, 2.4, 0.45), darkWood);
      bookshelf.position.set(5, 1.2, -4.5);
      scene.add(bookshelf);
      const bookColors = [0x8B4513, 0x2E4057, 0x8B0000, 0x006400, 0x4A0E4E, 0x1B4F72, 0x922B21, 0x1A5276, 0xB8860B, 0x556B2F];
      for (let i = 0; i < 20; i++) {
        const bh = 0.15 + Math.random() * 0.12;
        const book = new THREE_NS.Mesh(
          new THREE_NS.BoxGeometry(0.06, bh, 0.3),
          new THREE_NS.MeshStandardMaterial({ color: bookColors[i % bookColors.length], roughness: 0.7 })
        );
        book.position.set(4.5 + (i % 5) * 0.17, 0.25 + Math.floor(i / 5) * 0.55, -4.4);
        scene.add(book);
      }
      // Globe on top
      const globe = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.15, 16, 12), new THREE_NS.MeshStandardMaterial({ color: 0x2a5a8a, roughness: 0.6 }));
      globe.position.set(5.3, 2.55, -4.4);
      scene.add(globe);

      // ─── Sofa (right) ─────────────────────────────
      const sofaBase = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(2.4, 0.5, 1), fabricMat);
      sofaBase.position.set(4, 0.25, 2);
      scene.add(sofaBase);
      const sofaBack = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(2.4, 0.55, 0.18), fabricMat);
      sofaBack.position.set(4, 0.78, 2.55);
      scene.add(sofaBack);
      const sofaArmL = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.18, 0.4, 1), fabricMat);
      sofaArmL.position.set(2.79, 0.55, 2);
      scene.add(sofaArmL);
      const sofaArmR = sofaArmL.clone();
      sofaArmR.position.set(5.21, 0.55, 2);
      scene.add(sofaArmR);
      // Pillows
      for (let i = 0; i < 3; i++) {
        const pillow = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.12, 8, 6), new THREE_NS.MeshStandardMaterial({ color: [0x8B4513, 0x556B2F, 0x8B0000][i], roughness: 0.95 }));
        pillow.scale.set(1.2, 0.6, 1);
        pillow.position.set(3.3 + i * 0.8, 0.65, 2.4);
        scene.add(pillow);
      }

      // ─── Coffee table (center) ────────────────────
      const coffeeTable = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(1.2, 0.06, 0.7), darkWood);
      coffeeTable.position.set(0, 0.45, 2.5);
      scene.add(coffeeTable);
      for (const tx of [-0.45, 0.45]) {
        for (const tz of [2.2, 2.8]) {
          const tl = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.03, 0.03, 0.45), darkWood);
          tl.position.set(tx, 0.225, tz);
          scene.add(tl);
        }
      }
      // Items on coffee table
      const book1 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.2, 0.04, 0.15), new THREE_NS.MeshStandardMaterial({ color: 0x2E4057 }));
      book1.position.set(-0.2, 0.5, 2.4);
      book1.rotation.y = 0.2;
      scene.add(book1);
      const book2 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.18, 0.03, 0.13), new THREE_NS.MeshStandardMaterial({ color: 0x8B0000 }));
      book2.position.set(-0.15, 0.535, 2.42);
      book2.rotation.y = -0.3;
      scene.add(book2);
      const mug = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.04, 0.035, 0.08, 10), new THREE_NS.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }));
      mug.position.set(0.3, 0.52, 2.5);
      scene.add(mug);
      const remote = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.04, 0.015, 0.12), new THREE_NS.MeshStandardMaterial({ color: 0x222222 }));
      remote.position.set(0.1, 0.5, 2.7);
      scene.add(remote);
      // Newspaper on table
      const newspaper = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.3, 0.005, 0.22), new THREE_NS.MeshStandardMaterial({ color: 0xccccbb, roughness: 1 }));
      newspaper.position.set(0.2, 0.48, 2.3);
      newspaper.rotation.y = 0.4;
      scene.add(newspaper);

      // ─── Rug ──────────────────────────────────────
      const rug = new THREE_NS.Mesh(new THREE_NS.CircleGeometry(1.8, 32), new THREE_NS.MeshStandardMaterial({ color: lightsOn ? 0x7a3a2a : 0x5a2a1a, roughness: 1 }));
      rug.rotation.x = -Math.PI / 2;
      rug.position.set(0, 0.01, 3);
      scene.add(rug);

      // ─── Floor lamp (left front) ──────────────────
      const floorLampPole = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.025, 0.025, 2), metalMat);
      floorLampPole.position.set(-5.5, 1, 4);
      scene.add(floorLampPole);
      const floorLampBase = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.15, 0.15, 0.04, 12), metalMat);
      floorLampBase.position.set(-5.5, 0.02, 4);
      scene.add(floorLampBase);
      const floorLampShade = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.18, 0.28, 0.35, 12, 1, true), new THREE_NS.MeshStandardMaterial({ color: 0x665544, side: THREE_NS.DoubleSide, roughness: 0.8 }));
      floorLampShade.position.set(-5.5, 2.17, 4);
      scene.add(floorLampShade);
      const floorLight = new THREE_NS.PointLight(0xfff0d0, lightsOn ? 1.2 : 0.5, lightsOn ? 10 : 5);
      floorLight.position.set(-5.5, 2, 4);
      scene.add(floorLight);

      // ─── Plants ───────────────────────────────────
      const pot = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.18, 0.14, 0.3, 10), new THREE_NS.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9 }));
      pot.position.set(5.5, 0.15, 4.5);
      scene.add(pot);
      const leaves = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.35, 8, 6), new THREE_NS.MeshStandardMaterial({ color: 0x2d5a1e, roughness: 0.9 }));
      leaves.position.set(5.5, 0.6, 4.5);
      scene.add(leaves);
      const pot2 = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.12, 0.1, 0.22, 8), new THREE_NS.MeshStandardMaterial({ color: 0x6a3a0a }));
      pot2.position.set(-6, 0.11, -1);
      scene.add(pot2);
      const leaves2 = new THREE_NS.Mesh(new THREE_NS.ConeGeometry(0.2, 0.4, 8), new THREE_NS.MeshStandardMaterial({ color: 0x3a6a2a }));
      leaves2.position.set(-6, 0.45, -1);
      scene.add(leaves2);

      // ─── Picture frames on walls ──────────────────
      const frameMat = new THREE_NS.MeshStandardMaterial({ color: 0x444444 });
      const frame1 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.8, 0.6, 0.04), frameMat);
      frame1.position.set(-2, 2.8, -5.95);
      scene.add(frame1);
      const pic1 = new THREE_NS.Mesh(new THREE_NS.PlaneGeometry(0.7, 0.5), new THREE_NS.MeshStandardMaterial({ color: 0x445566 }));
      pic1.position.set(-2, 2.8, -5.93);
      scene.add(pic1);
      const frame2 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.5, 0.7, 0.04), frameMat);
      frame2.position.set(2, 3, -5.95);
      scene.add(frame2);
      const pic2 = new THREE_NS.Mesh(new THREE_NS.PlaneGeometry(0.4, 0.6), new THREE_NS.MeshStandardMaterial({ color: 0x556644 }));
      pic2.position.set(2, 3, -5.93);
      scene.add(pic2);
      const frame3 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.35, 0.35, 0.04), frameMat);
      frame3.position.set(-4.5, 3.5, -5.95);
      scene.add(frame3);

      // ─── Window ───────────────────────────────────
      const windowFrame = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(1.6, 1.3, 0.06), frameMat);
      windowFrame.position.set(0, 3.2, -5.95);
      scene.add(windowFrame);
      const windowGlass = new THREE_NS.Mesh(new THREE_NS.PlaneGeometry(1.4, 1.1), new THREE_NS.MeshStandardMaterial({ color: 0x1a2a3a, transparent: true, opacity: 0.3 }));
      windowGlass.position.set(0, 3.2, -5.92);
      scene.add(windowGlass);
      for (let i = -0.4; i <= 0.4; i += 0.4) {
        const bar = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.02, 1.1, 0.02), metalMat);
        bar.position.set(i, 3.2, -5.91);
        scene.add(bar);
      }

      // ─── Door ─────────────────────────────────────
      const door = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(1, 2.4, 0.08), new THREE_NS.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.85 }));
      door.position.set(6, 1.2, -5.95);
      scene.add(door);
      const doorKnob = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.04, 8, 6), new THREE_NS.MeshStandardMaterial({ color: 0xB8860B, metalness: 0.7, roughness: 0.3 }));
      doorKnob.position.set(6.4, 1.2, -5.88);
      scene.add(doorKnob);

      // ─── Side table (right front) ─────────────────
      const sideTable = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.28, 0.28, 0.6, 12), darkWood);
      sideTable.position.set(2, 0.3, 4.5);
      scene.add(sideTable);
      const sideLamp = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.03, 0.03, 0.25), metalMat);
      sideLamp.position.set(2, 0.72, 4.5);
      scene.add(sideLamp);
      const sideLampShade = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.1, 0.15, 0.18, 10, 1, true), new THREE_NS.MeshStandardMaterial({ color: 0x776655, side: THREE_NS.DoubleSide }));
      sideLampShade.position.set(2, 0.95, 4.5);
      scene.add(sideLampShade);
      const sideLight = new THREE_NS.PointLight(0xfff0d0, lightsOn ? 0.8 : 0.3, lightsOn ? 8 : 3);
      sideLight.position.set(2, 0.9, 4.5);
      scene.add(sideLight);

      // ─── Boxes / clutter on floor ─────────────────
      const box1 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.4, 0.35, 0.35), new THREE_NS.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.95 }));
      box1.position.set(-2, 0.175, 4.5);
      scene.add(box1);
      const box2 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.3, 0.25, 0.3), new THREE_NS.MeshStandardMaterial({ color: 0x6a5a4a }));
      box2.position.set(-1.5, 0.125, 4.8);
      scene.add(box2);
      const box3 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.35, 0.3, 0.25), new THREE_NS.MeshStandardMaterial({ color: 0x7a6a5a }));
      box3.position.set(-1.7, 0.15, 4.2);
      box3.rotation.y = 0.3;
      scene.add(box3);

      // ─── Trash can ────────────────────────────────
      const trashCan = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.15, 0.12, 0.4, 10), new THREE_NS.MeshStandardMaterial({ color: 0x555555, roughness: 0.7 }));
      trashCan.position.set(-5.5, 0.2, -4);
      scene.add(trashCan);

      // ─── Umbrella stand ───────────────────────────
      const umbrellaStand = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.08, 0.08, 0.3, 8), metalMat);
      umbrellaStand.position.set(6, 0.15, 3);
      scene.add(umbrellaStand);
      const umbrella = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.01, 0.01, 0.8, 4), new THREE_NS.MeshStandardMaterial({ color: 0x222266 }));
      umbrella.position.set(6, 0.55, 3);
      umbrella.rotation.z = 0.1;
      scene.add(umbrella);

      // ─── Coat rack ────────────────────────────────
      const rackPole = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.025, 0.025, 1.8), metalMat);
      rackPole.position.set(5.5, 0.9, -1);
      scene.add(rackPole);
      const rackBase = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.2, 0.2, 0.03, 12), metalMat);
      rackBase.position.set(5.5, 0.015, -1);
      scene.add(rackBase);
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const hook = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.008, 0.008, 0.15, 4), metalMat);
        hook.position.set(5.5 + Math.cos(angle) * 0.12, 1.7, -1 + Math.sin(angle) * 0.12);
        hook.rotation.z = Math.PI / 2;
        hook.rotation.y = angle;
        scene.add(hook);
      }

      // ─── Shoes on floor ───────────────────────────
      const shoeMat = new THREE_NS.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 });
      const shoe1 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.1, 0.06, 0.22), shoeMat);
      shoe1.position.set(5.8, 0.03, 5);
      shoe1.rotation.y = 0.2;
      scene.add(shoe1);
      const shoe2 = shoe1.clone();
      shoe2.position.set(6, 0.03, 5.1);
      shoe2.rotation.y = -0.1;
      scene.add(shoe2);

      // ─── Woven basket ─────────────────────────────
      const basket = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.2, 0.15, 0.25, 12), new THREE_NS.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.95 }));
      basket.position.set(-3, 0.125, 4);
      scene.add(basket);

      // ─── Backpack on floor ────────────────────────
      const backpack = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.3, 0.4, 0.2), new THREE_NS.MeshStandardMaterial({ color: 0x2a4a6a, roughness: 0.9 }));
      backpack.position.set(1, 0.2, 4.8);
      backpack.rotation.y = 0.4;
      scene.add(backpack);

      // ─── Small stool ──────────────────────────────
      const stool = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.2, 0.2, 0.35, 10), medWood);
      stool.position.set(-1, 0.175, 1);
      scene.add(stool);

      // ─── Folding chair ────────────────────────────
      const foldChair = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.45, 0.04, 0.45), metalMat);
      foldChair.position.set(-5, 0.5, 1);
      foldChair.rotation.y = 0.5;
      scene.add(foldChair);
      const foldBack = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.45, 0.5, 0.03), metalMat);
      foldBack.position.set(-5, 0.75, 0.78);
      foldBack.rotation.y = 0.5;
      scene.add(foldBack);

      // ─── Wall clock ───────────────────────────────
      const clockFace = new THREE_NS.Mesh(new THREE_NS.CircleGeometry(0.2, 24), new THREE_NS.MeshStandardMaterial({ color: 0xffffff }));
      clockFace.position.set(3, 3.5, -5.94);
      scene.add(clockFace);
      const clockRim = new THREE_NS.Mesh(new THREE_NS.TorusGeometry(0.2, 0.015, 8, 24), new THREE_NS.MeshStandardMaterial({ color: 0x444444 }));
      clockRim.position.set(3, 3.5, -5.93);
      scene.add(clockRim);

      // ─── TV on wall ───────────────────────────────
      const tv = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(1.2, 0.7, 0.05), new THREE_NS.MeshStandardMaterial({ color: 0x111111 }));
      tv.position.set(0, 3.8, -5.93);
      scene.add(tv);
      const tvScreen = new THREE_NS.Mesh(new THREE_NS.PlaneGeometry(1.1, 0.6), new THREE_NS.MeshStandardMaterial({ color: 0x0a0a15, emissive: lightsOn ? 0x101018 : 0x050508, emissiveIntensity: lightsOn ? 0.4 : 0.2 }));
      tvScreen.position.set(0, 3.8, -5.9);
      scene.add(tvScreen);

      // ─── Fan on floor ─────────────────────────────
      const fanBase = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.15, 0.15, 0.04, 12), metalMat);
      fanBase.position.set(3, 0.02, -2);
      scene.add(fanBase);
      const fanPole = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.02, 0.02, 0.6), metalMat);
      fanPole.position.set(3, 0.32, -2);
      scene.add(fanPole);
      const fanHead = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.18, 0.18, 0.04, 16), metalMat);
      fanHead.position.set(3, 0.65, -2);
      fanHead.rotation.x = Math.PI / 2;
      scene.add(fanHead);

      // ─── Extra clutter ────────────────────────────
      // Scattered papers on floor
      for (let i = 0; i < 5; i++) {
        const paper = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.15, 0.002, 0.1), new THREE_NS.MeshStandardMaterial({ color: 0xddddcc, roughness: 1 }));
        paper.position.set(-1 + Math.random() * 2, 0.005, 1 + Math.random() * 2);
        paper.rotation.y = Math.random() * Math.PI;
        scene.add(paper);
      }

      // Cardboard box (open)
      const cardboardBox = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.5, 0.4, 0.4), new THREE_NS.MeshStandardMaterial({ color: 0x9a8a6a, roughness: 0.95 }));
      cardboardBox.position.set(-0.5, 0.2, 5);
      scene.add(cardboardBox);
      // Box flaps
      const flap1 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.5, 0.02, 0.2), new THREE_NS.MeshStandardMaterial({ color: 0x9a8a6a }));
      flap1.position.set(-0.5, 0.41, 5.15);
      flap1.rotation.x = -0.5;
      scene.add(flap1);

      // Guitar case
      const guitarCase = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.2, 1, 0.4), new THREE_NS.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 }));
      guitarCase.position.set(-6.5, 0.5, 2);
      guitarCase.rotation.z = 0.1;
      scene.add(guitarCase);

      // Yoga mat (rolled)
      const yogaMat = new THREE_NS.Mesh(new THREE_NS.CylinderGeometry(0.08, 0.08, 0.6, 10), new THREE_NS.MeshStandardMaterial({ color: 0x4a6a8a, roughness: 0.9 }));
      yogaMat.position.set(6.5, 0.08, 1);
      yogaMat.rotation.z = Math.PI / 2;
      scene.add(yogaMat);

      // Slippers
      const slipperMat = new THREE_NS.MeshStandardMaterial({ color: 0x555555, roughness: 0.9 });
      const slipper1 = new THREE_NS.Mesh(new THREE_NS.BoxGeometry(0.08, 0.03, 0.2), slipperMat);
      slipper1.position.set(0.5, 0.015, 5.5);
      scene.add(slipper1);
      const slipper2 = slipper1.clone();
      slipper2.position.set(0.7, 0.015, 5.6);
      scene.add(slipper2);

      // ─── PANDA FOOTPRINT (the target!) ────────────
      // Positions scattered across the room: floor, desk, table, lamp, bookshelf, sofa, etc.
      const pawPositions = [
        // Floor
        { x: 0.5, z: 1.5, y: 0.012 }, { x: -0.8, z: 2.5, y: 0.012 },
        { x: 1.2, z: 3, y: 0.012 }, { x: -0.3, z: 1.8, y: 0.012 },
        { x: 0.8, z: 2.2, y: 0.012 }, { x: -1, z: 3.5, y: 0.012 },
        { x: 0.2, z: 4, y: 0.012 }, { x: -0.5, z: 1.2, y: 0.012 },
        { x: 1.5, z: 2, y: 0.012 }, { x: -1.2, z: 2, y: 0.012 },
        { x: 0, z: 3.2, y: 0.012 }, { x: 0.7, z: 3.8, y: 0.012 },
        { x: -1.5, z: 1, y: 0.012 }, { x: 1.8, z: 1.5, y: 0.012 },
        // On desk
        { x: -4, z: -2.8, y: 0.96 }, { x: -3.5, z: -3, y: 0.96 },
        // On coffee table
        { x: 0, z: 2.5, y: 0.5 }, { x: 0.3, z: 2.7, y: 0.5 },
        // Near floor lamp
        { x: -5.3, z: 4.2, y: 0.012 },
        // On bookshelf
        { x: 5, z: -4.3, y: 0.85 },
        // On sofa
        { x: 3.5, z: 2.2, y: 0.52 },
        // Near shoes
        { x: 5.8, z: 5, y: 0.012 },
      ];
      let currentPawIndex = Math.floor(Math.random() * pawPositions.length);
      let pawPos = { ...pawPositions[currentPawIndex] };

      const pawPrintGroup = new THREE_NS.Group();

      // Main pad
      const mainPad = new THREE_NS.Mesh(
        new THREE_NS.CircleGeometry(0.12, 16),
        new THREE_NS.MeshStandardMaterial({ color: 0x111111, roughness: 0.6, transparent: true, opacity: 0.85 })
      );
      mainPad.rotation.x = -Math.PI / 2;
      mainPad.position.y = 0.012;
      pawPrintGroup.add(mainPad);

      // Toe pads
      const toePositions = [
        { x: -0.07, z: -0.09 },
        { x: -0.025, z: -0.12 },
        { x: 0.025, z: -0.12 },
        { x: 0.07, z: -0.09 },
      ];
      for (const tp of toePositions) {
        const toe = new THREE_NS.Mesh(
          new THREE_NS.CircleGeometry(0.04, 10),
          new THREE_NS.MeshStandardMaterial({ color: 0x111111, roughness: 0.6, transparent: true, opacity: 0.85 })
        );
        toe.rotation.x = -Math.PI / 2;
        toe.position.set(tp.x, 0.012, tp.z);
        pawPrintGroup.add(toe);
      }

      pawPrintGroup.position.set(pawPos.x, pawPos.y, pawPos.z);
      pawPrintGroup.rotation.y = Math.random() * Math.PI * 2;
      scene.add(pawPrintGroup);

      // ─── Panda model (hidden, shown when found) ───
      const pandaGroup = new THREE_NS.Group();
      pandaGroup.visible = false;

      const bodyMat = new THREE_NS.MeshStandardMaterial({ color: 0xf5f5f0, roughness: 0.85 });
      const blackMat = new THREE_NS.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
      const eyePatchMat = new THREE_NS.MeshStandardMaterial({ color: 0x111111, roughness: 0.75 });

      // Body
      const torso = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.45, 24, 18), bodyMat);
      torso.scale.set(1, 0.85, 0.9);
      torso.position.y = 0.55;
      pandaGroup.add(torso);

      // Belly
      const belly = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.32, 16, 12), new THREE_NS.MeshStandardMaterial({ color: 0xfff8f0, roughness: 0.9 }));
      belly.position.set(0, 0.5, 0.2);
      belly.scale.set(0.9, 0.8, 0.7);
      pandaGroup.add(belly);

      // Head
      const head = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.38, 24, 18), bodyMat);
      head.position.y = 1.2;
      head.scale.set(1.05, 1, 1);
      pandaGroup.add(head);

      // Ears
      const leftEar = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.12, 12, 10), blackMat);
      leftEar.position.set(-0.22, 1.52, -0.05);
      pandaGroup.add(leftEar);
      const rightEar = leftEar.clone();
      rightEar.position.set(0.22, 1.52, -0.05);
      pandaGroup.add(rightEar);

      // Eye patches
      const leftPatch = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.12, 12, 10), eyePatchMat);
      leftPatch.scale.set(1.1, 1.4, 0.6);
      leftPatch.position.set(-0.15, 1.22, 0.28);
      pandaGroup.add(leftPatch);
      const rightPatch = leftPatch.clone();
      rightPatch.position.set(0.15, 1.22, 0.28);
      pandaGroup.add(rightPatch);

      // Eyes
      const leftEyeWhite = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.065, 12, 10), new THREE_NS.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 }));
      leftEyeWhite.position.set(-0.15, 1.23, 0.38);
      pandaGroup.add(leftEyeWhite);
      const rightEyeWhite = leftEyeWhite.clone();
      rightEyeWhite.position.set(0.15, 1.23, 0.38);
      pandaGroup.add(rightEyeWhite);

      const leftIris = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.04, 10, 8), new THREE_NS.MeshStandardMaterial({ color: 0x3a6b2a, roughness: 0.3 }));
      leftIris.position.set(-0.15, 1.22, 0.42);
      pandaGroup.add(leftIris);
      const rightIris = leftIris.clone();
      rightIris.position.set(0.15, 1.22, 0.42);
      pandaGroup.add(rightIris);

      const leftPupil = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.022, 8, 6), new THREE_NS.MeshStandardMaterial({ color: 0x111111, roughness: 0.3 }));
      leftPupil.position.set(-0.15, 1.22, 0.44);
      pandaGroup.add(leftPupil);
      const rightPupil = leftPupil.clone();
      rightPupil.position.set(0.15, 1.22, 0.44);
      pandaGroup.add(rightPupil);

      // Highlights
      const highlightMat = new THREE_NS.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5 });
      const leftHighlight = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.012, 6, 4), highlightMat);
      leftHighlight.position.set(-0.13, 1.24, 0.46);
      pandaGroup.add(leftHighlight);
      const rightHighlight = leftHighlight.clone();
      rightHighlight.position.set(0.17, 1.24, 0.46);
      pandaGroup.add(rightHighlight);

      // Nose
      const nose = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.04, 8, 6), new THREE_NS.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4 }));
      nose.scale.set(1.2, 0.8, 0.8);
      nose.position.set(0, 1.12, 0.37);
      pandaGroup.add(nose);

      // Mouth
      const mouthCurve = new THREE_NS.Mesh(
        new THREE_NS.TorusGeometry(0.06, 0.008, 6, 12, Math.PI),
        new THREE_NS.MeshStandardMaterial({ color: 0x1a1a1a })
      );
      mouthCurve.rotation.x = Math.PI;
      mouthCurve.rotation.z = Math.PI;
      mouthCurve.position.set(0, 1.07, 0.35);
      pandaGroup.add(mouthCurve);

      // Blush
      const blushMat = new THREE_NS.MeshStandardMaterial({ color: 0xe8a0a0, transparent: true, opacity: 0.35, roughness: 1 });
      const leftBlush = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.05, 8, 6), blushMat);
      leftBlush.position.set(-0.25, 1.12, 0.32);
      leftBlush.scale.set(1.2, 0.7, 0.5);
      pandaGroup.add(leftBlush);
      const rightBlush = leftBlush.clone();
      rightBlush.position.set(0.25, 1.12, 0.32);
      pandaGroup.add(rightBlush);

      // Arms
      const leftArm = new THREE_NS.Mesh(new THREE_NS.CapsuleGeometry(0.08, 0.25, 6, 10), blackMat);
      leftArm.position.set(-0.42, 0.7, 0.15);
      leftArm.rotation.z = 0.2;
      leftArm.rotation.x = -0.3;
      pandaGroup.add(leftArm);

      const rightArm = new THREE_NS.Mesh(new THREE_NS.CapsuleGeometry(0.08, 0.25, 6, 10), blackMat);
      rightArm.position.set(0.42, 0.7, 0.15);
      rightArm.rotation.z = -0.2;
      rightArm.rotation.x = -0.3;
      pandaGroup.add(rightArm);

      // Paws
      const leftPaw = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.07, 10, 8), bodyMat);
      leftPaw.position.set(-0.35, 0.65, 0.5);
      pandaGroup.add(leftPaw);
      const rightPaw = leftPaw.clone();
      rightPaw.position.set(0.35, 0.65, 0.5);
      pandaGroup.add(rightPaw);

      // Legs
      const leftLeg = new THREE_NS.Mesh(new THREE_NS.CapsuleGeometry(0.09, 0.15, 6, 10), blackMat);
      leftLeg.position.set(-0.18, 0.12, 0.1);
      pandaGroup.add(leftLeg);
      const rightLeg = leftLeg.clone();
      rightLeg.position.set(0.18, 0.12, 0.1);
      pandaGroup.add(rightLeg);

      // Feet
      const leftFoot = new THREE_NS.Mesh(new THREE_NS.SphereGeometry(0.08, 8, 6), bodyMat);
      leftFoot.scale.set(1.1, 0.6, 1.3);
      leftFoot.position.set(-0.18, 0.02, 0.15);
      pandaGroup.add(leftFoot);
      const rightFoot = leftFoot.clone();
      rightFoot.position.set(0.18, 0.02, 0.15);
      pandaGroup.add(rightFoot);

      // Hat
      const hat = new THREE_NS.Mesh(new THREE_NS.ConeGeometry(0.22, 0.2, 16), new THREE_NS.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.85 }));
      hat.position.set(0, 1.62, 0);
      pandaGroup.add(hat);
      const hatRim = new THREE_NS.Mesh(new THREE_NS.TorusGeometry(0.24, 0.02, 6, 20), new THREE_NS.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.85 }));
      hatRim.rotation.x = Math.PI / 2;
      hatRim.position.set(0, 1.52, 0);
      pandaGroup.add(hatRim);

      // Position panda at initial paw print location
      pandaGroup.position.set(pawPos.x, 0, pawPos.z);
      pandaGroup.lookAt(camera.position.x, pandaGroup.position.y, camera.position.z);
      scene.add(pandaGroup);

      // ─── Lighting ─────────────────────────────────
      const ambientLight = new THREE_NS.AmbientLight(0xffffff, lightsOn ? 1.2 : 0.5);
      scene.add(ambientLight);

      // MEDIUM difficulty: narrower flashlight beam
      const flashlight = new THREE_NS.SpotLight(0xfff5e0, lightsOn ? 10 : 5, lightsOn ? 35 : 16, Math.PI / (lightsOn ? 2.5 : 5), 0.4, 1);
      flashlight.position.set(0, 3, 5);
      scene.add(flashlight);
      const flashlightTarget = new THREE_NS.Object3D();
      flashlightTarget.position.set(0, 1, 0);
      scene.add(flashlightTarget);
      flashlight.target = flashlightTarget;

      const fillLight = new THREE_NS.PointLight(0xffd4a0, lightsOn ? 2 : 0.3, lightsOn ? 50 : 20);
      fillLight.position.set(0, 4, 3);
      scene.add(fillLight);

      // ─── State ────────────────────────────────────
      let found = false;
      let smoothX = window.innerWidth / 2;
      let smoothY = window.innerHeight / 2;
      const pawWorldPos = new THREE_NS.Vector3();
      let zoomProgress = 0;
      const originalCameraPos = camera.position.clone();
      const originalCameraLookAt = new THREE_NS.Vector3(0, 0.8, 0);

      const handleFound = () => {
        if (foundRef.current) return;
        foundRef.current = true;
        found = true;
        pandaGroup.visible = true;
        pandaGroup.position.set(pawPos.x, pawPos.y, pawPos.z);
        pandaGroup.lookAt(camera.position.x, pandaGroup.position.y, camera.position.z);
        onBearFound();
      };

      // ─── Animation ────────────────────────────────
      const animate = () => {
        requestAnimationFrame(animate);
        const time = performance.now() * 0.001;

        // Camera zoom to paw print
        if (zoomToPaw && zoomProgress < 1) {
          zoomProgress = Math.min(zoomProgress + 0.008, 1);
          const eased = 1 - Math.pow(1 - zoomProgress, 3);

          const targetCamPos = new THREE_NS.Vector3(
            pawPos.x,
            pawPos.y + 1.2,
            pawPos.z + 2.5
          );

          camera.position.lerpVectors(originalCameraPos, targetCamPos, eased);

          const targetLookAt = new THREE_NS.Vector3(pawPos.x, pawPos.y + 0.1, pawPos.z);
          const currentLookAt = originalCameraLookAt.clone().lerp(targetLookAt, eased);
          camera.lookAt(currentLookAt);
        }

        smoothX += (mouseX - smoothX) * 0.08;
        smoothY += (mouseY - smoothY) * 0.08;

        const targetX = (smoothX / window.innerWidth) * 2 - 1;
        const targetY = -(smoothY / window.innerHeight) * 2 + 1;

        // Flashlight follows mouse
        flashlightTarget.position.x = targetX * 5;
        flashlightTarget.position.y = targetY * 2.5 + 0.8;
        flashlightTarget.position.z = 0;
        flashlight.position.x = targetX * 2;
        flashlight.position.z = 5 + Math.abs(targetX);

        // EASY detection: matches narrow beam
        pawPrintGroup.getWorldPosition(pawWorldPos);
        const pawScreen = pawWorldPos.clone().project(camera);
        const dx = targetX - pawScreen.x;
        const dy = targetY - pawScreen.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const detectionRadius = 0.35 + difficultyBoost * 0.15;
        const isIlluminated = dist < detectionRadius;

        if (isIlluminated && !found) {
          pawPrintGroup.children.forEach((child: any) => {
            if (child.isMesh) {
              child.material.opacity = 1;
              child.material.color.set(0x0a0a0a);
            }
          });
        } else if (!found) {
          pawPrintGroup.children.forEach((child: any) => {
            if (child.isMesh) {
              child.material.opacity = lightsOn ? 0.9 : 0.7;
              child.material.color.set(lightsOn ? 0x111111 : 0x2a2a2a);
            }
          });
        }

        // Panda idle animation
        if (pandaGroup.visible) {
          pandaGroup.position.y = Math.sin(time * 2) * 0.02;
          head.rotation.y = Math.sin(time * 1.2) * 0.06;
          leftArm.rotation.x = -0.3 + Math.sin(time * 3) * 0.2;
        }

        // Desk light flicker
        deskLight.intensity = (lightsOn ? 0.8 : 0.4) + Math.sin(time * 0.5) * 0.05;

        renderer.render(scene, camera);
      };

      animate();

      // Click handler
      const onClick = (e: MouseEvent) => {
        if (found) return;
        const clickVec = new THREE_NS.Vector2(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(clickVec, camera);
        const intersects = raycaster.intersectObjects(pawPrintGroup.children, true);
        if (intersects.length > 0) handleFound();
      };

      const onTouchEnd = (e: TouchEvent) => {
        if (found || e.changedTouches.length === 0) return;
        const touch = e.changedTouches[0];
        const clickVec = new THREE_NS.Vector2(
          (touch.clientX / window.innerWidth) * 2 - 1,
          -(touch.clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(clickVec, camera);
        const intersects = raycaster.intersectObjects(pawPrintGroup.children, true);
        if (intersects.length > 0) handleFound();
      };

      window.addEventListener("click", onClick);
      window.addEventListener("touchend", onTouchEnd);

      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      sceneRef.current = { scene, camera, renderer };

      return () => {
        window.removeEventListener("click", onClick);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        sceneRef.current = null;
      };
    };

    init();
  }, [mouseX, mouseY, isMobile, onBearFound, lightsOn, showPanda, zoomToPaw, difficultyBoost]);

  return <div ref={containerRef} className="absolute inset-0 z-[12]" />;
}
