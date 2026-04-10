"use client";

import Section from "@/components/Section";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import * as THREE from "three";

const problems = [
  "How many customers are you losing every day just because you didn't reply in time?",
  "What happens to leads that contact you outside working hours?",
  "How many one-time customers never come back because there's no follow-up?",
  "How much revenue are you missing by not converting every inquiry into a sale?",
  "If every lead was handled instantly and personally, how much would your business grow?",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function EnergyLine({ start, end, scale }: { start: THREE.Vector3; end: THREE.Vector3; scale: number }) {
  const points = useMemo(() => {
    const pts = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const point = new THREE.Vector3().lerpVectors(start, end, t);
      point.x += (Math.random() - 0.5) * 0.15 * scale;
      point.y += (Math.random() - 0.5) * 0.15 * scale;
      point.z += (Math.random() - 0.5) * 0.15 * scale;
      pts.push(point);
    }
    return pts;
  }, [start, end, scale]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#60a5fa" transparent opacity={0.5} linewidth={2} />
    </line>
  );
}

function ElectroSphere({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const radius = isMobile ? 1.8 : 2.5;
  const particleRadius = isMobile ? 1.8 : 2.5;

  const particles = useMemo(() => {
    const count = isMobile ? 500 : 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = particleRadius + Math.random() * 0.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [particleRadius, isMobile]);

  const energyPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const theta = (i / 8) * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pts.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      );
    }
    return pts;
  }, [radius]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const scrollY = window.scrollY;
    const time = state.clock.getElapsedTime();
    const targetY = scrollY * 0.002;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.z = 0;
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color="#020a1a"
          emissive="#1e3a8a"
          emissiveIntensity={0.45}
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius + 0.02, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.14} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius + 0.04, 24, 24]} />
        <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.07} />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.025 : 0.03}
          color="#60a5fa"
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>
      {energyPoints.map((point, i) => {
        const nextPoint = energyPoints[(i + 1) % energyPoints.length];
        return <EnergyLine key={i} start={point} end={nextPoint} scale={isMobile ? 0.7 : 1} />;
      })}
      <mesh>
        <sphereGeometry args={[isMobile ? 0.2 : 0.3, 32, 32]} />
        <meshBasicMaterial color="#93c5fd" />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius - 0.2, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
function ProblemCard({
  text,
  isActive,
  cardRef,
}: {
  text: string;
  isActive: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-xl p-[1px] cursor-default"
      style={{
        transform: isActive ? "scale(1.02) translateX(6px)" : "scale(1) translateX(0px)",
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Border */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          transition: "background 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          background: isActive
            ? "linear-gradient(135deg, #3b82f6, #60a5fa80, #3b82f6)"
            : "linear-gradient(135deg, rgba(96,165,250,0.2), rgba(59,130,246,0.06), rgba(96,165,250,0.2))",
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-xl px-5 py-4 flex items-start gap-3"
        style={{
          transition: "background 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          background: isActive
            ? "rgba(59,130,246,0.18)"
            : "rgba(255,255,255,0.03)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: isActive
            ? "1px solid rgba(96,165,250,0.5)"
            : "1px solid rgba(96,165,250,0.12)",
        }}
      >
        {/* Glass shimmer */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            transition: "opacity 0.5s ease",
            opacity: isActive ? 0.6 : 0.4,
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 55%)",
          }}
        />

        {/* Dot */}
        <div className="relative mt-[5px] flex-shrink-0">
          <div
            className="h-2 w-2 rounded-full"
            style={{
              transition: "background-color 0.5s ease, box-shadow 0.5s ease",
              backgroundColor: isActive ? "#93c5fd" : "#3b82f6",
              boxShadow: isActive ? "0 0 8px #60a5fa" : "0 0 4px #60a5fa44",
            }}
          />
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: "#60a5fa",
              opacity: isActive ? 0.6 : 0.3,
              transition: "opacity 0.5s ease",
            }}
          />
        </div>

        {/* Text */}
        <p
          className="text-sm leading-relaxed font-medium"
          style={{
            transition: "color 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            color: isActive ? "#eff6ff" : "rgba(219,234,254,0.4)",
            fontFamily: "'Geist', 'Inter', sans-serif",
          }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}
export default function ProblemSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Store refs to each card DOM element
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-based active detection using requestAnimationFrame — no flickering
  useEffect(() => {
    let rafId: number;
    let lastActive = -1;

    const computeActive = () => {
      const viewportMid = window.innerHeight / 2;
      let closestIndex = -1;
      let closestDistance = Infinity;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardMid = rect.top + rect.height / 2;
        const distance = Math.abs(cardMid - viewportMid);

        // Only consider cards that are actually visible in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0 && distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      // Only update state when value actually changes — prevents re-renders
      if (closestIndex !== lastActive) {
        lastActive = closestIndex;
        setActiveIndex(closestIndex);
      }

      rafId = requestAnimationFrame(computeActive);
    };

    rafId = requestAnimationFrame(computeActive);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const setCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  return (
    <Section className="relative text-white overflow-hidden" style={{ background: "#050d1f" }}>
      <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left Side */}
        <div>
          <div className="mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight"
              style={{
                color: "#f0f4ff",
                fontFamily: "'Geist', 'Inter', sans-serif",
              }}
            >
              Every Missed Message{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Is a Lost Opportunity
              </span>
            </h2>
            <p
              className="max-w-2xl text-base"
              style={{
                color: "rgba(219,234,254,0.5)",
                fontFamily: "'Geist', 'Inter', sans-serif",
              }}
            >
              Slow responses are silently costing you customers.
            </p>
          </div>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-3"
          >
            {problems.map((p, i) => (
              <ProblemCard
                key={i}
                text={p}
                isActive={activeIndex === i}
                cardRef={setCardRef(i)}
              />
            ))}

            {/* Highlighted solution card — always on */}
            <motion.div
              variants={cardVariants}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-xl p-[1px] cursor-default"
            >
              <div
                className="absolute inset-0 rounded-xl animate-pulse"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #60a5fa80, #3b82f6)",
                }}
              />
              <div
                className="relative rounded-xl px-5 py-4 flex items-start gap-3"
                style={{
                  background: "rgba(59,130,246,0.14)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(96,165,250,0.18) 0%, transparent 60%)",
                  }}
                />
                <div className="relative mt-[5px] flex-shrink-0">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: "#60a5fa" }}
                  />
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-60"
                    style={{ backgroundColor: "#60a5fa" }}
                  />
                </div>
                <p
                  className="relative text-sm font-semibold"
                  style={{
                    color: "#93c5fd",
                    fontFamily: "'Geist', 'Inter', sans-serif",
                  }}
                >
                  Interact AI solves all of this — automatically.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - 3D Sphere */}
        <div className="relative h-[400px] lg:h-[600px]">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.25), rgba(30,58,138,0.08) 50%, transparent 80%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none animate-pulse"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(96,165,250,0.1), transparent 60%)",
            }}
          />
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, isMobile ? 6 : 8], fov: 45 }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} color="#3b82f6" />
              <pointLight position={[-5, 0, -5]} intensity={0.6} color="#60a5fa" />
              <pointLight position={[0, 5, 0]} intensity={0.4} color="#93c5fd" />
              <ElectroSphere isMobile={isMobile} />
            </Canvas>
          </div>
        </div>
      </div>
    </Section>
  );
}