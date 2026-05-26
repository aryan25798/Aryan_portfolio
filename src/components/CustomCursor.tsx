"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const interactive = document.querySelectorAll(
      "a, button, .glass-card, .btn-primary, .btn-secondary, input, textarea"
    );
    const onEnterHandler = () => setHovering(true);
    const onLeaveHandler = () => setHovering(false);
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHandler);
      el.addEventListener("mouseleave", onLeaveHandler);
    });

    window.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHandler);
        el.removeEventListener("mouseleave", onLeaveHandler);
      });
    };
  }, [visible]);

  if (typeof window === "undefined") return null;

  const size = hovering ? 120 : 60;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] hidden lg:block transition-[width,height] duration-300 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 28 : 16,
          height: hovering ? 28 : 16,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: hovering ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0.08)",
          border: "1.5px solid rgba(124,58,237,0.3)",
          boxShadow: "0 0 12px rgba(124,58,237,0.15)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          transitionProperty: "width, height, background, border-color",
        }}
      />
      <div
        className="pointer-events-none fixed z-[9998] hidden lg:block transition-[width,height] duration-300 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: hovering
            ? "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
