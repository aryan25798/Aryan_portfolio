"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className = "", intensity = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotate({
      x: (y - 0.5) * -intensity,
      y: (x - 0.5) * intensity,
    });
    setGlow({ x: x * 100, y: y * 100 });
  };

  const handleLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="perspective-1000"
    >
      <motion.div
        animate={isTouch ? {} : { rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`relative overflow-hidden group ${className}`}
        style={{ transformStyle: "preserve-3d", willChange: isTouch ? "auto" : "transform" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(124,58,237,0.12) 0%, transparent 60%)`,
            zIndex: 0,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[inherit] overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <div
            className="absolute -inset-full top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-12"
            style={{ animation: "shimmer 3s ease-in-out infinite" }}
          />
        </div>
        <div className="relative z-[1]">{children}</div>
      </motion.div>
    </div>
  );
}
