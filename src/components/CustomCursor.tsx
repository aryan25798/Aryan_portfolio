"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    let visible = false;

    const update = () => {
      const px = posRef.current.x;
      const py = posRef.current.y;
      cursor.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
      glow.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
      rafRef.current = 0;
    };

    const onMouse = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) {
        visible = true;
        cursor.style.opacity = "1";
        glow.style.opacity = "1";
      }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    const onLeave = () => {
      visible = false;
      cursor.style.opacity = "0";
      glow.style.opacity = "0";
    };
    const onEnter = () => {
      visible = true;
      cursor.style.opacity = "1";
      glow.style.opacity = "1";
    };

    const interactive = document.querySelectorAll(
      "a, button, .glass-card, .btn-primary, .btn-secondary, input, textarea"
    );
    const onEnterHandler = () => {
      cursor.style.width = "28px";
      cursor.style.height = "28px";
      cursor.style.background = "rgba(124,58,237,0.15)";
      cursor.style.borderColor = "rgba(124,58,237,0.6)";
      glow.style.width = "120px";
      glow.style.height = "120px";
      glow.style.background = "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)";
    };
    const onLeaveHandler = () => {
      cursor.style.width = "16px";
      cursor.style.height = "16px";
      cursor.style.background = "rgba(124,58,237,0.08)";
      cursor.style.borderColor = "rgba(124,58,237,0.3)";
      glow.style.width = "60px";
      glow.style.height = "60px";
      glow.style.background = "radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 70%)";
    };

    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHandler);
      el.addEventListener("mouseleave", onLeaveHandler);
    });

    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHandler);
        el.removeEventListener("mouseleave", onLeaveHandler);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] hidden lg:block"
        style={{
          left: 0,
          top: 0,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "rgba(124,58,237,0.08)",
          border: "1.5px solid rgba(124,58,237,0.3)",
          boxShadow: "0 0 12px rgba(124,58,237,0.15)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          transition: "width 0.3s ease-out, height 0.3s ease-out, background 0.3s ease-out, border-color 0.3s ease-out, opacity 0.3s ease-out",
          willChange: "transform",
          opacity: 0,
        }}
      />
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[9998] hidden lg:block"
        style={{
          left: 0,
          top: 0,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 70%)",
          transition: "width 0.3s ease-out, height 0.3s ease-out, background 0.3s ease-out, opacity 0.3s ease-out",
          willChange: "transform",
          opacity: 0,
        }}
      />
    </>
  );
}
