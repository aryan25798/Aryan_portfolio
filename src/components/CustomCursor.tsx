"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
  }, [mouseX, mouseY, visible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden lg:block"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
        }}
      >
        <motion.div
          className="w-4 h-4 rounded-full"
          animate={{
            scale: hovering ? 2.5 : 1,
            background: hovering
              ? "rgba(124,58,237,0.15)"
              : "rgba(124,58,237,0.08)",
            borderColor: hovering
              ? "rgba(124,58,237,0.5)"
              : "rgba(124,58,237,0.3)",
          }}
          transition={{ duration: 0.2 }}
          style={{
            border: "1.5px solid rgba(124,58,237,0.3)",
            boxShadow: "0 0 12px rgba(124,58,237,0.15), inset 0 0 12px rgba(124,58,237,0.05)",
            backdropFilter: "blur(4px)",
          }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden lg:block"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          width: hovering ? 120 : 60,
          height: hovering ? 120 : 60,
          borderRadius: "50%",
          background: hovering
            ? "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 70%)",
          transition: "width 0.3s, height 0.3s",
        }}
      />
    </>
  );
}
