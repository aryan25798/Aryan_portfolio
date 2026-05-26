"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Code, Terminal, Database, Cloud, Settings } from "lucide-react";
import { useGitHub } from "@/lib/useGitHub";
import TiltCard from "./TiltCard";

const cats = [
  { id: "all", name: "All Stack", icon: <Layers className="w-3.5 h-3.5" /> },
  { id: "languages", name: "Languages", icon: <Code className="w-3.5 h-3.5" /> },
  { id: "web", name: "Web & Backend", icon: <Terminal className="w-3.5 h-3.5" /> },
  { id: "databases", name: "Databases", icon: <Database className="w-3.5 h-3.5" /> },
  { id: "cloud", name: "Cloud & DevOps", icon: <Cloud className="w-3.5 h-3.5" /> },
  { id: "salesforce", name: "Salesforce", icon: <Settings className="w-3.5 h-3.5" /> },
];

const progressMap: Record<string, number> = {
  Java: 95, Python: 80, "C++": 75, JavaScript: 92, TypeScript: 82,
  "Spring Boot": 95, React: 92, "Node.js": 90, "Next.js": 80,
  MongoDB: 90, PostgreSQL: 80, Redis: 88,
  AWS: 90, Docker: 88, Kubernetes: 75, "Apache Kafka": 85, Jenkins: 78, Terraform: 72,
  Salesforce: 92,
};

const skillData = [
  { n: "Java", l: "Expert", c: "languages", col: "text-red-400", g: "#ef4444", slug: "java" },
  { n: "Python", l: "Advanced", c: "languages", col: "text-blue-400", g: "#3b82f6", slug: "python" },
  { n: "C++", l: "Advanced", c: "languages", col: "text-cyan-400", g: "#06b6d4", slug: "cplusplus" },
  { n: "JavaScript", l: "Expert", c: "languages", col: "text-yellow-400", g: "#eab308", slug: "javascript" },
  { n: "TypeScript", l: "Advanced", c: "languages", col: "text-blue-400", g: "#3178c6", slug: "typescript" },
  { n: "Spring Boot", l: "Expert", c: "web", col: "text-emerald-400", g: "#34d399", slug: "springboot" },
  { n: "React", l: "Expert", c: "web", col: "text-cyan-400", g: "#06b6d4", slug: "react" },
  { n: "Node.js", l: "Expert", c: "web", col: "text-green-400", g: "#22c55e", slug: "nodedotjs" },
  { n: "Next.js", l: "Advanced", c: "web", col: "text-white", g: "#ffffff", slug: "nextdotjs" },
  { n: "MongoDB", l: "Expert", c: "databases", col: "text-emerald-500", g: "#10b981", slug: "mongodb" },
  { n: "PostgreSQL", l: "Advanced", c: "databases", col: "text-blue-400", g: "#3b82f6", slug: "postgresql" },
  { n: "Redis", l: "Expert", c: "databases", col: "text-red-500", g: "#ef4444", slug: "redis" },
  { n: "AWS", l: "Expert", c: "cloud", col: "text-orange-400", g: "#f97316", slug: "amazonwebservices" },
  { n: "Docker", l: "Expert", c: "cloud", col: "text-blue-400", g: "#3b82f6", slug: "docker" },
  { n: "Kubernetes", l: "Advanced", c: "cloud", col: "text-blue-500", g: "#3b82f6", slug: "kubernetes" },
  { n: "Apache Kafka", l: "Expert", c: "cloud", col: "text-purple-400", g: "#a855f7", slug: "apachekafka" },
  { n: "Jenkins", l: "Advanced", c: "cloud", col: "text-red-400", g: "#ef4444", slug: "jenkins" },
  { n: "Terraform", l: "Advanced", c: "cloud", col: "text-purple-500", g: "#a855f7", slug: "terraform" },
  { n: "Salesforce", l: "Expert", c: "salesforce", col: "text-cyan-400", g: "#06b6d4", slug: "salesforce" },
];

const SkillRing = ({ progress, color }: { progress: number; color: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(40);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setSize(e.contentRect.width);
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center">
      <svg width={size} height={size} className="absolute -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>
    </div>
  );
};

export default function Skills() {
  const [tab, setTab] = useState("all");
  const { langStats } = useGitHub();

  const filtered = tab === "all" ? skillData : skillData.filter((s) => s.c === tab);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }}
      className="flex flex-col gap-6 sm:gap-8 w-full text-left pt-2 sm:pt-4"
    >
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 border-b border-white/5 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
          <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-wide text-white">Tech Stack</h2>
        </div>
        <span className="text-[10px] sm:text-xs text-text-secondary font-semibold uppercase tracking-wider">{filtered.length} Technologies</span>
      </div>

      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 select-none border-b border-white/5 scrollbar-none -mx-2 sm:mx-0 px-2 sm:px-0">
        {cats.map((cat) => (
          <button key={cat.id} onClick={() => setTab(cat.id)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 touch-manipulation ${
              tab === cat.id
                ? "bg-purple-500/15 border border-purple-500/40 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                : "bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {langStats.length > 0 && (
        <TiltCard intensity={3}>
          <div className="glass-card p-3 sm:p-4">
            <div className="text-[10px] sm:text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Live Language Distribution</div>
            <div className="flex h-2 sm:h-3 rounded-full overflow-hidden">
              {langStats.slice(0, 8).map((l, i) => (
                <motion.div key={i} className="h-full" initial={{ width: 0 }} animate={{ width: `${l.percentage}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                  style={{ backgroundColor: l.color, minWidth: l.percentage > 3 ? undefined : 0 }} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {langStats.slice(0, 8).map((l, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="text-[9px] sm:text-[9px] text-text-secondary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.name} <strong>{l.percentage}%</strong>
                </motion.span>
              ))}
            </div>
          </div>
        </TiltCard>
      )}

      <motion.div layout className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((s, idx) => (
            <motion.div
              key={s.n}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, delay: idx * 0.025 } }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <TiltCard intensity={5}>
                <div className="glass-card-glow p-3 sm:p-4 lg:p-5 flex flex-col items-center justify-between text-center gap-2 sm:gap-3 group cursor-default">
                  <div className="relative w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                    <SkillRing progress={progressMap[s.n] || 80} color={s.g} />
                    <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-110 p-2.5 sm:p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://cdn.simpleicons.org/${s.slug}/white`} alt={s.n} className="w-full h-full object-contain" loading="lazy" />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[11px] xs:text-xs sm:text-sm text-white group-hover:text-purple-400 transition-colors leading-tight mb-0.5 truncate max-w-[80px] xs:max-w-[90px] sm:max-w-[110px]">{s.n}</h4>
                    <div className="flex items-center justify-center gap-1">
                      <span className="inline-block text-[9px] sm:text-[9px] font-bold text-text-secondary uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded bg-white/5">{s.l}</span>
                      <span className="text-[9px] font-bold text-cyan-400/70">{progressMap[s.n] || 80}%</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
