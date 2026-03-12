// src/components/AuroraBg.tsx

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  homeX: number;   // resting X — particle always drifts back here
  homeY: number;   // resting Y
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
}

export default function AuroraBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    let scrollY = 0;
    let lastScrollY = 0;
    let scrollDecay = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-home particles when window resizes
      for (const p of particles) {
        p.homeX = Math.random() * canvas.width;
        p.homeY = Math.random() * canvas.height;
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

    // ── Orbs ──────────────────────────────────────────────────
    const orbs = [
      { x: 0.12, y: 0.18, r: 420, color: "38,120,255",  phase: 0,   speed: 0.00020 },
      { x: 0.80, y: 0.50, r: 360, color: "0,190,255",   phase: 2.1, speed: 0.00016 },
      { x: 0.45, y: 0.85, r: 310, color: "100,60,255",  phase: 4.2, speed: 0.00018 },
      { x: 0.70, y: 0.25, r: 240, color: "0,140,255",   phase: 1.5, speed: 0.00023 },
    ];

    // ── Particles ─────────────────────────────────────────────
    const PARTICLE_COUNT = 110;
    const MAX_DIST       = 130;
    const DAMPING        = 0.96;
    const HOME_SPRING    = 0.012;   // how strongly each particle is pulled back to homeX/Y
    const SCROLL_DECAY   = 0.88;
    const GRAVITY        = 0.055;

    // Initialise after canvas is sized
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const mkParticle = (): Particle => {
      const hx = Math.random() * canvas.width;
      const hy = Math.random() * canvas.height;
      return {
        x: hx, y: hy,
        homeX: hx, homeY: hy,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.6 + 0.5,
        baseOpacity: Math.random() * 0.45 + 0.2,
        opacity: 0,
      };
    };

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, mkParticle);

    let t = 0;

    const draw = () => {
      t++;

      // Scroll velocity → decay
      const sv = scrollY - lastScrollY;
      lastScrollY = scrollY;
      scrollDecay += (sv - scrollDecay) * 0.25;
      scrollDecay *= SCROLL_DECAY;

      const gravDir = Math.sign(scrollDecay);
      const gravMag = Math.min(Math.abs(scrollDecay) * 0.4, 3.5);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Orbs ──
      for (const orb of orbs) {
        const px = (orb.x + Math.sin(t * orb.speed * 1000 + orb.phase) * 0.15) * canvas.width;
        const py = (orb.y + Math.cos(t * orb.speed * 800  + orb.phase) * 0.12) * canvas.height;
        const g  = ctx.createRadialGradient(px, py, 0, px, py, orb.r);
        g.addColorStop(0,    `rgba(${orb.color},0.12)`);
        g.addColorStop(0.45, `rgba(${orb.color},0.04)`);
        g.addColorStop(1,    `rgba(${orb.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Particles ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Spring toward home position — keeps the network spread out
        p.vx += (p.homeX - p.x) * HOME_SPRING;
        p.vy += (p.homeY - p.y) * HOME_SPRING;

        // Gravity from scroll (Y only — no horizontal convergence force)
        p.vy += gravDir * gravMag * GRAVITY;

        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 6) { p.vx = p.vx / spd * 6; p.vy = p.vy / spd * 6; }

        p.x += p.vx;
        p.y += p.vy;

        // Soft-clamp to canvas (bounce off edges instead of wrap,
        // so particles don't teleport across the screen)
        if (p.x < 0)             { p.x =  0;            p.vx *= -0.5; p.homeX = Math.random() * canvas.width; }
        if (p.x > canvas.width)  { p.x = canvas.width;  p.vx *= -0.5; p.homeX = Math.random() * canvas.width; }
        if (p.y < 0)             { p.y =  0;            p.vy *= -0.5; p.homeY = Math.random() * canvas.height; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -0.5; p.homeY = Math.random() * canvas.height; }

        // Visual — brighten + grow when fast
        const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        p.opacity = p.baseOpacity + Math.min(vel * 0.07, 0.4);
        const r   = p.radius + Math.min(vel * 0.15, 1.2);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,180,255,${p.opacity})`;
        ctx.fill();

        // Lines
        for (let j = i + 1; j < particles.length; j++) {
          const q  = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * (0.15 + Math.min(vel * 0.04, 0.2));
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(80,160,255,${a})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(38,120,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(38,120,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 10%, transparent 100%)",
          maskImage:       "radial-gradient(ellipse 90% 90% at 50% 50%, black 10%, transparent 100%)",
        }}
      />
    </>
  );
}