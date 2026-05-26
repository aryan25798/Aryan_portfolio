"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, ArrowRight, Terminal, Star, Cpu, Cloud, Code, GitBranch, Layers } from "lucide-react";
import TiltCard from "./TiltCard";

const c = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
const i = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } };

const FlowingLine = () => (
  <div className="absolute left-0 top-0 bottom-0 w-px overflow-hidden">
    <div className="absolute inset-0 w-full" style={{
      background: "linear-gradient(180deg, rgba(124,58,237,0.8), rgba(6,182,212,0.8), rgba(124,58,237,0.8))",
      backgroundSize: "100% 200%",
      animation: "flow-line 3s linear infinite",
    }} />
    <div className="absolute inset-0 w-full opacity-30" style={{
      background: "linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.3) 50%, transparent 100%)",
      backgroundSize: "100% 200%",
      animation: "shimmer 3s ease-in-out infinite",
    }} />
  </div>
);

const techTags: Record<string, { icon: React.ReactNode; label: string }[]> = {
  "Sasken": [
    { icon: <Terminal className="w-2.5 h-2.5" />, label: "C" },
    { icon: <Code className="w-2.5 h-2.5" />, label: "Shell" },
    { icon: <GitBranch className="w-2.5 h-2.5" />, label: "Git" },
    { icon: <Cpu className="w-2.5 h-2.5" />, label: "Linux" },
  ],
  "AICTE": [
    { icon: <Cloud className="w-2.5 h-2.5" />, label: "AWS" },
    { icon: <Layers className="w-2.5 h-2.5" />, label: "Docker" },
    { icon: <GitBranch className="w-2.5 h-2.5" />, label: "Jenkins" },
    { icon: <Terminal className="w-2.5 h-2.5" />, label: "CI/CD" },
  ],
};

export default function Experience() {

  const experiences = [
    {
      role: "Linux Developer Intern", company: "Sasken Technologies, Bengaluru",
      duration: "May 2025 – Jul 2025",
      points: [
        "Developed a custom Linux shell in C with job controls, child fork executions, and robust I/O redirection.",
        "Debugged core Linux system-level process calls, reducing CPU resource overhead and enhancing execution performance by 15%.",
        "Acquired hands-on knowledge of OS threads, signal operations, and advanced shell scripting.",
      ],
      color: "border-purple-500 bg-purple-500/10", shadow: "shadow-[0_0_15px_rgba(124,58,237,0.3)]",
      grad: "from-purple-500 to-cyan-500",
      tagKey: "Sasken",
    },
    {
      role: "Cloud Computing Intern", company: "AICTE Virtual Internship",
      duration: "Oct 2024 – Dec 2024",
      points: [
        "Configured AWS core services: EC2 instances, S3 storage, RDS PostgreSQL, and IAM credentials.",
        "Implemented multibranch Jenkins pipelines with Git, Docker image builds, and AWS deployments.",
        "Optimized deployment workflows, reducing hosting costs through server monitoring and IAM policies.",
      ],
      color: "border-blue-500 bg-blue-500/10", shadow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
      grad: "from-blue-500 to-cyan-500",
      tagKey: "AICTE",
    },
  ];

  return (
    <motion.div variants={c} initial="hidden" animate="visible" className="flex flex-col gap-4 sm:gap-6 lg:gap-7 w-full text-left pt-2 sm:pt-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
          <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-wide text-white">Experience</h2>
        </div>
        <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider hidden sm:block">Internship Log</span>
      </div>

      <div className="relative pl-5 sm:pl-9 lg:pl-11 flex flex-col gap-5 sm:gap-7 lg:gap-9 mt-1 sm:mt-2">
        <FlowingLine />

        {experiences.map((exp, idx) => (
          <motion.div key={idx} variants={i} className="relative flex flex-col gap-2 sm:gap-3 text-left group">
            <motion.div
              className={`absolute -left-5 xs:-left-[1.45rem] sm:-left-[2.35rem] lg:-left-[2.85rem] top-1 w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 rounded-full border-[2.5px] ${exp.color} z-10`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: `0 0 12px ${idx === 0 ? "rgba(124,58,237,0.6)" : "rgba(59,130,246,0.6)"}` }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br opacity-80 animate-pulse-slow"
                style={{ background: `linear-gradient(135deg, ${idx === 0 ? "rgba(124,58,237,0.4)" : "rgba(59,130,246,0.4)"}, transparent)` }}
              />
            </motion.div>

            {/* Connecting line highlight */}
            {idx < experiences.length - 1 && (
              <div className="absolute left-[-1.5px] top-[1.25rem] bottom-[-0.75rem] w-[2px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: `linear-gradient(180deg, ${idx === 0 ? "rgba(124,58,237,0.5)" : "rgba(59,130,246,0.5)"}, transparent)` }}
              />
            )}

            <TiltCard intensity={5}>
              <div className="glass-card-glow p-3 sm:p-5 lg:p-6 flex flex-col gap-2 sm:gap-3 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                {/* Glow on hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full blur-3xl"
                  style={{ background: `radial-gradient(circle, ${idx === 0 ? "rgba(124,58,237,0.12)" : "rgba(59,130,246,0.12)"}, transparent 60%)` }}
                />

                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-2 z-10 relative">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse-slow" style={{ backgroundColor: idx === 0 ? "#7C3AED" : "#3B82F6" }} />
                      <h3 className="font-display font-black text-sm sm:text-base lg:text-lg text-white leading-tight break-words">{exp.role}</h3>
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 mt-0.5" style={{ color: idx === 0 ? "#A78BFA" : "#60A5FA" }}>
                      <Briefcase className="w-3 h-3 flex-shrink-0" /> <span>{exp.company}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-text-secondary uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded bg-white/5 border border-white/5 flex-shrink-0 overflow-hidden">
                    <Calendar className="w-3 h-3 flex-shrink-0" /> <span className="truncate min-w-0">{exp.duration}</span>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 z-10 relative mt-1">
                  {(techTags[exp.tagKey] || []).map((tag, tIdx) => (
                    <span key={tIdx} className="flex items-center gap-1 text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-md border"
                      style={{
                        color: idx === 0 ? "#C4B5FD" : "#93C5FD",
                        backgroundColor: idx === 0 ? "rgba(124,58,237,0.08)" : "rgba(59,130,246,0.08)",
                        borderColor: idx === 0 ? "rgba(124,58,237,0.15)" : "rgba(59,130,246,0.15)",
                      }}
                    >
                      {tag.icon} {tag.label}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <ul className="flex flex-col gap-1.5 sm:gap-2 z-10 relative mt-1">
                  {exp.points.map((pt, pIdx) => (
                    <motion.li key={pIdx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: pIdx * 0.1 }}
                      className="text-[11px] sm:text-xs leading-relaxed text-text-secondary flex items-start gap-1.5 sm:gap-2"
                    >
                      <ArrowRight className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: idx === 0 ? "#7C3AED" : "#3B82F6" }} />
                      <span>{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <TiltCard intensity={3}>
        <div className="glass-card p-3 sm:p-5 lg:p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "16px 16px" }} />
          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 flex-wrap relative z-10">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-text-secondary">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span><strong className="text-white">2</strong> professional internships</span>
            </div>
            <div className="w-px h-4 sm:h-5 bg-white/10 hidden xs:block" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-text-secondary">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Systems & Cloud <strong className="text-white">Engineering</strong></span>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
