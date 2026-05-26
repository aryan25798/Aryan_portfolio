"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 300);
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 600);
    }, 1800);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050816]"
        >
          <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[80px]" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-cyan-500/5 blur-[60px] top-1/3 right-1/4" />

          <div className="relative flex items-center justify-center">
            {/* Outer ring */}
            <motion.div
              className="absolute w-24 h-24 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border border-purple-500/20" />
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-purple-500"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translateY(-48px)`,
                    transformOrigin: "0 0",
                    boxShadow: "0 0 8px rgba(124,58,237,0.6)",
                    opacity: progress > 20 + i * 13 ? 1 : 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Middle ring */}
            <motion.div
              className="absolute w-16 h-16 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {[0, 90, 180, 270].map((deg, i) => (
                <div key={i}
                  className="absolute w-1 h-1 rounded-full bg-cyan-400"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translateY(-32px)`,
                    transformOrigin: "0 0",
                    boxShadow: "0 0 8px rgba(6,182,212,0.6)",
                    opacity: progress > 30 + i * 17 ? 1 : 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Center glow */}
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 shadow-[0_0_30px_rgba(124,58,237,0.5)]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p className="font-display font-bold text-lg text-white tracking-wider">Aryan</p>
            <div className="flex items-center gap-1 mt-3">
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-purple-500"
                  animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4 w-40 sm:w-48 h-1 rounded-full bg-white/5 overflow-hidden mx-auto">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-[10px] text-text-secondary mt-2 font-mono">
              {Math.min(Math.floor(progress), 100)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
