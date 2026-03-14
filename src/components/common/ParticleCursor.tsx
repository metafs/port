"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
};

export const ParticleCursor = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const countRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(media.matches);
    updateEnabled();

    media.addEventListener("change", updateEnabled);
    return () => media.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const nextPos = { x: e.clientX, y: e.clientY };
      mouseRef.current = nextPos;
      setMousePosition(nextPos);
    };

    const interval = setInterval(() => {
      const { x, y } = mouseRef.current;

      setParticles((prev) => {
        const newParticles = prev.length > 24 ? prev.slice(1) : prev;
        return [
          ...newParticles,
          {
            id: countRef.current++,
            x,
            y,
            size: Math.random() * 3 + 2,
            driftX: (Math.random() - 0.5) * 12,
            driftY: (Math.random() - 0.5) * 12,
          },
        ];
      });
    }, 28);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.75, scale: 1, x: particle.x, y: particle.y }}
            animate={{
              opacity: 0,
              scale: 0.25,
              x: particle.x + particle.driftX,
              y: particle.y + particle.driftY,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: particle.size,
              height: particle.size,
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow: "0 0 4px rgba(255, 255, 255, 0.45)",
              top: 0,
              left: 0,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: "white",
          borderRadius: "50%",
          pointerEvents: "none",
          mixBlendMode: "difference",
        }}
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.2 }}
      />
    </div>
  );
};
