"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-2xl p-2 sm:p-4"
        >
          {/* Portal glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px] pointer-events-none -top-20 -right-20"
          />

          {/* Resume card */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 60 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-full max-w-5xl h-[85vh] sm:h-[90vh] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-[0_0_80px_rgba(124,58,237,0.15)]"
            style={{ boxShadow: "0 0 80px rgba(124,58,237,0.15), 0 0 200px rgba(6,182,212,0.05)" }}
          >
            {/* Gradient border glow */}
            <div className="absolute -inset-[1px] rounded-2xl opacity-50 pointer-events-none" style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(6,182,212,0.4), rgba(59,130,246,0.4), rgba(124,58,237,0.4))",
              backgroundSize: "300% 300%",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
              animation: "gradient-border-spin 4s ease-in-out infinite",
            }} />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }} />

            {/* Toolbar */}
            <div className="relative flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-black/40 z-10">
              <span className="text-xs sm:text-sm font-display font-bold text-white tracking-wide">Resume</span>
              <div className="flex items-center gap-2">
                <motion.a
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  href="/assets/Aryan_Resume.pdf"
                  download="Aryan_Resume.pdf"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 active:scale-90"
                  aria-label="Download resume"
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.a>
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.25)] transition-all duration-300 active:scale-90"
                  aria-label="Close resume"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </div>

            <iframe
              src="/assets/Aryan_Resume.pdf#view=FitH"
              className="relative w-full flex-1 rounded-2xl"
              style={{ border: "none", height: "calc(100% - 53px)" }}
              title="Aryan Resume"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
