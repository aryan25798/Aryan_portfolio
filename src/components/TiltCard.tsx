"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className = "", intensity = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isTouch, setIsTouch] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setRotate({ x: (y - 0.5) * -intensity, y: (x - 0.5) * intensity });
      setGlow({ x: x * 100, y: y * 100 });
    });
  }, [isTouch, intensity]);

  const handleLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setRotate({ x: 0, y: 0 });
      setGlow({ x: 50, y: 50 });
    });
  }, []);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  if (isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
      style={{ perspective: "1000px" } as React.CSSProperties}
    >
      <div
        className="relative overflow-hidden group transition-[transform] duration-200 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(124,58,237,0.12) 0%, transparent 60%)`,
            zIndex: 1,
          }}
        />
        <div className="relative z-[2]">{children}</div>
      </div>
    </div>
  );
}
