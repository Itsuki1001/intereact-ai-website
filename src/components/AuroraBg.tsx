// src/components/SignalWaveBg.tsx
//
// Drop-in replacement for AuroraBg.tsx
// — Signal wave background with scroll-driven animation
// — Mobile-first: no particle physics, smooth on all devices
// — Scroll effect: waves spread, amplify, glow; hero text lifts away
//
// Usage:
//   import SignalWaveBg from "./components/SignalWaveBg";
//   <SignalWaveBg scrollContainerRef={optionalRef} />
//
// If scrollContainerRef is omitted, it listens to window scroll.

import { useEffect, useRef } from "react";

interface WaveDef {
  amp: number;
  freq: number;
  speed: number;
  phase: number;
  r: number;
  g: number;
  b: number;
  baseOp: number;
  lw: number;
}

interface Props {
  /** Pass a ref to a scrollable div if your page doesn't scroll on window */
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

export default function SignalWaveBg({ scrollContainerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let raf: number;

    // ─── Scroll state ──────────────────────────────────────────
    // scrollPct: 0 (top) → 1 (fully scrolled into view of background)
    // We clamp it to [0, 1] and drive all animation from it.
    let rawScroll = 0;
    let smoothScroll = 0; // lerped for buttery transitions

    const getScrollSource = (): HTMLElement | Window =>
      scrollContainerRef?.current ?? window;

    const onScroll = () => {
      const src = scrollContainerRef?.current;
      if (src) {
        rawScroll = src.scrollTop / Math.max(1, src.scrollHeight - src.clientHeight);
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        rawScroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      }
      rawScroll = Math.min(1, Math.max(0, rawScroll));
    };

    // ─── Resize ────────────────────────────────────────────────
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    getScrollSource().addEventListener("scroll", onScroll, { passive: true });

    // ─── Wave definitions ──────────────────────────────────────
    // 6 waves: varied amplitude, frequency, speed, colour, opacity.
    // All colours are blue-purple family — cohesive AI/signal palette.
    const waves: WaveDef[] = [
      { amp: 28, freq: 0.016, speed: 0.018, phase: 0.0, r: 38,  g: 120, b: 255, baseOp: 0.22, lw: 1.6 },
      { amp: 18, freq: 0.024, speed: 0.026, phase: 2.1, r: 0,   g: 190, b: 255, baseOp: 0.16, lw: 1.2 },
      { amp: 38, freq: 0.011, speed: 0.013, phase: 4.5, r: 90,  g: 60,  b: 255, baseOp: 0.13, lw: 2.2 },
      { amp: 12, freq: 0.038, speed: 0.042, phase: 1.1, r: 0,   g: 140, b: 255, baseOp: 0.11, lw: 0.8 },
      { amp: 22, freq: 0.019, speed: 0.022, phase: 3.3, r: 55,  g: 160, b: 255, baseOp: 0.18, lw: 1.1 },
      { amp: 8,  freq: 0.050, speed: 0.055, phase: 5.5, r: 20,  g: 100, b: 220, baseOp: 0.09, lw: 0.6 },
    ];

    // Pulse nodes — subtle glowing dots that intensify on scroll,
    // suggesting live AI signal nodes / connections.
    // Defined as fractions of canvas size so they're always in frame.
    const nodePositions: [number, number][] = [
      [0.12, 0.38],
      [0.50, 0.44],
      [0.82, 0.40],
      [0.30, 0.55],
      [0.68, 0.52],
      [0.20, 0.62],
      [0.75, 0.60],
    ];

    let t = 0;

    // ─── Draw loop ─────────────────────────────────────────────
    const draw = () => {
      t++;

      // Smooth scroll interpolation — prevents jerky animation on mobile
      smoothScroll += (rawScroll - smoothScroll) * 0.06;
      const sp = smoothScroll; // 0 → 1

      ctx.clearRect(0, 0, W, H);

      // ── Background orb (deepens with scroll) ──────────────────
      const orbX = W * (0.5 + Math.sin(t * 0.0008) * 0.12);
      const orbY = H * (0.45 + Math.cos(t * 0.0006) * 0.08);
      const orbR = Math.min(W, H) * (0.55 + sp * 0.35);
      const orbG = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbR);
      orbG.addColorStop(0,    `rgba(28,90,200,${0.10 + sp * 0.10})`);
      orbG.addColorStop(0.45, `rgba(10,50,150,${0.04 + sp * 0.05})`);
      orbG.addColorStop(1,    "rgba(3,5,15,0)");
      ctx.fillStyle = orbG;
      ctx.fillRect(0, 0, W, H);

      // ── Scroll-driven wave parameters ─────────────────────────
      // At sp=0: waves sit calmly at vertical center, gentle amplitude
      // At sp=1: waves spread apart, larger amplitude, higher frequency, glowing
      const ampBoost   = 1 + sp * 2.8;    // waves grow taller
      const freqBoost  = 1 + sp * 0.55;   // waves become slightly denser
      const opBoost    = 1 + sp * 1.5;    // waves become more visible
      const lwBoost    = 1 + sp * 0.7;    // stroke becomes thicker
      const spreadY    = H * (0.5 + sp * 0.10); // waves drift downward slightly

      for (const w of waves) {
        // Build path with quadratic smoothing for organic curves
        const pts: [number, number][] = [];
        const step = 4; // px step — low enough for smooth curves, high enough for perf
        for (let x = 0; x <= W; x += step) {
          const y =
            spreadY +
            Math.sin(w.freq * freqBoost * x + w.phase + t * w.speed) *
              w.amp * ampBoost;
          pts.push([x, y]);
        }

        const lineOp = Math.min(w.baseOp * opBoost, 0.60);

        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length - 1; i++) {
          const mx = (pts[i][0] + pts[i + 1][0]) / 2;
          const my = (pts[i][1] + pts[i + 1][1]) / 2;
          ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
        }
        ctx.strokeStyle = `rgba(${w.r},${w.g},${w.b},${lineOp})`;
        ctx.lineWidth   = w.lw * lwBoost;
        ctx.stroke();

        // Below-wave fill that fades in after sp > 0.3 — adds depth
        if (sp > 0.3) {
          const fillOp = ((sp - 0.3) / 0.7) * 0.045;
          ctx.lineTo(W, H);
          ctx.lineTo(0, H);
          ctx.closePath();
          ctx.fillStyle = `rgba(${w.r},${w.g},${w.b},${fillOp})`;
          ctx.fill();
        }
      }

      // ── Pulse nodes ───────────────────────────────────────────
      const pulse = 3 + Math.sin(t * 0.05) * 1.8;
      for (const [fx, fy] of nodePositions) {
        const nx = fx * W;
        const ny = fy * H + sp * 25; // nodes drift down slightly with scroll

        const nodeOp = Math.min(
          0.20 + sp * 0.55 + Math.sin(t * 0.04 + nx * 0.01) * 0.10,
          0.80
        );

        // Core dot
        ctx.beginPath();
        ctx.arc(nx, ny, pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,160,255,${nodeOp})`;
        ctx.fill();

        // Outer ring — grows with scroll
        const ringR = pulse + 4 + sp * 10;
        ctx.beginPath();
        ctx.arc(nx, ny, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(80,160,255,${nodeOp * 0.35})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Second ring at high scroll values — "signal broadcasting" feel
        if (sp > 0.5) {
          const ring2R = ringR + (sp - 0.5) * 20;
          const ring2Op = (sp - 0.5) * nodeOp * 0.25;
          ctx.beginPath();
          ctx.arc(nx, ny, ring2R, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(80,160,255,${ring2Op})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      getScrollSource().removeEventListener("scroll", onScroll);
    };
  }, [scrollContainerRef]);

  return (
    <>
      {/* Main animated canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid overlay — fades toward edges */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(38,120,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(38,120,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 5%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 5%, transparent 100%)",
        }}
      />

      {/* Vignette — softens edges, gives depth */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(3,5,15,0.55) 100%)",
        }}
      />
    </>
  );
}


// ─── Companion hook (optional) ──────────────────────────────────────────────
//
// Use this in your hero section to sync content animations with scroll.
// The returned `scrollPct` value goes from 0 → 1 as the user scrolls.
//
// import { useScrollPct } from "./components/SignalWaveBg";
//
// function Hero() {
//   const sp = useScrollPct();
//   return (
//     <div style={{ opacity: 1 - sp * 2, transform: `translateY(${sp * -40}px)` }}>
//       {/* your hero content */}
//     </div>
//   );
// }

import { useState, useEffect as useEff } from "react";

export function useScrollPct(scrollContainerRef?: React.RefObject<HTMLElement>) {
  const [pct, setPct] = useState(0);

  useEff(() => {
    const onScroll = () => {
      let value: number;
      const src = scrollContainerRef?.current;
      if (src) {
        value = src.scrollTop / Math.max(1, src.scrollHeight - src.clientHeight);
      } else {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        value = max > 0 ? window.scrollY / max : 0;
      }
      setPct(Math.min(1, Math.max(0, value)));
    };

    const target = scrollContainerRef?.current ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  return pct;
}