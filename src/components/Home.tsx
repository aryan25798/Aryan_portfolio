"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Terminal, Code, Star, ExternalLink, BookOpen, Zap, MessageSquare } from "lucide-react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";
import TiltCard from "./TiltCard";
import AnimatedCounter from "./AnimatedCounter";
import ResumeViewer from "./ResumeViewer";
import SkillIcon from "./SkillIcon";
import headshot from "../../public/assets/headshot_transparent.png";

interface Props {
  setActivePage: (page: string) => void;
}

const c = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } 
};
const i = { 
  hidden: { opacity: 0, y: 25 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } } 
};

const roles = [
  "Software Engineer",
  "Java Developer",
  "Salesforce Pro",
  "MERN Stack Dev",
  "Cloud Architect",
];

const FloatingBadge = ({ children, className, orbitRadius, delay, duration }: { children: React.ReactNode; className?: string; orbitRadius: number; delay: number; duration: number }) => (
  <div
    className={`absolute ${className}`}
    style={{
      animation: `orbit ${duration}s linear infinite`,
      animationDelay: `${delay}s`,
      WebkitAnimation: `orbit ${duration}s linear infinite`,
      WebkitAnimationDelay: `${delay}s`,
      width: 0,
      height: 0,
      top: "50%",
      left: "50%",
      willChange: "transform",
    }}
  >
    <div
      className="absolute whitespace-nowrap"
      style={{
        transform: `translateX(${orbitRadius}px) translateY(-50%)`,
        animation: `badge-float ${duration * 0.5}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  </div>
);

const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  useEffect(() => {
    let pauseTimer: ReturnType<typeof setTimeout> | undefined;
    const t = setTimeout(() => {
      if (dir === 1) {
        if (char >= texts[idx].length) {
          pauseTimer = setTimeout(() => setDir(-1), 2000);
        } else {
          setChar(c => c + 1);
        }
      } else {
        if (char <= 0) {
          setDir(1);
          setIdx(i => (i + 1) % texts.length);
        } else {
          setChar(c => c - 1);
        }
      }
    }, dir === 1 ? 60 : 20);
    return () => {
      clearTimeout(t);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [char, dir, idx, texts]);

  return (
    <span className="typing-cursor">
      {texts[idx].substring(0, char)}
    </span>
  );
};

const ContributionHeatmap = () => {
  const [cells, setCells] = useState<number[][]>([]);
  useEffect(() => {
    const cols = 15, rows = 7;
    const generated = Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () => {
        const rand = Math.random();
        if (rand > 0.85) return 4;
        if (rand > 0.65) return 3;
        if (rand > 0.4) return 2;
        if (rand > 0.15) return 1;
        return 0;
      })
    );
    setCells(generated);
  }, []);

  const colors = [
    "bg-white/[0.04] border border-white/5",
    "bg-purple-900/30 border border-purple-500/10",
    "bg-purple-600/40 border border-purple-500/20",
    "bg-cyan-500/40 border border-cyan-400/20",
    "bg-cyan-400/60 border border-cyan-400/40 shadow-[0_0_8px_rgba(6,182,212,0.3)]",
  ];

  if (cells.length === 0) return (
    <div className="grid grid-flow-col gap-0.5 sm:gap-1 select-none">
      {Array.from({ length: 15 }).map((_, cIdx) => (
        <div key={cIdx} className="flex flex-col gap-0.5 sm:gap-1">
          {Array.from({ length: 7 }).map((_, rIdx) => (
            <div key={rIdx} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[1.5px] bg-white/[0.04] border border-white/5" />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-flow-col gap-0.5 sm:gap-1 select-none">
      {cells.map((col, cIdx) => (
        <div key={cIdx} className="flex flex-col gap-0.5 sm:gap-1">
          {col.map((score, rIdx) => (
            <div key={rIdx} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[1.5px] transition-all hover:scale-125 ${colors[score]}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default function Home({ setActivePage }: Props) {
  const [scrollActive, setScrollActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY > 100);
    };
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const badges = [
    { label: "Java", color: "from-red-500/20 to-orange-500/10 border-red-500/30 text-red-400", orbit: 110, delay: 0, dur: 12 },
    { label: "React", color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400", orbit: 130, delay: 2, dur: 14 },
    { label: "AWS", color: "from-orange-500/20 to-yellow-500/10 border-orange-500/30 text-orange-400", orbit: 90, delay: 4, dur: 10 },
    { label: "Spring", color: "from-emerald-500/20 to-green-500/10 border-emerald-500/30 text-emerald-400", orbit: 145, delay: 1, dur: 16 },
    { label: "Docker", color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400", orbit: 120, delay: 3, dur: 13 },
    { label: "Kafka", color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400", orbit: 100, delay: 5, dur: 11 },
    { label: "MongoDB", color: "from-emerald-600/20 to-teal-500/10 border-emerald-600/30 text-emerald-500", orbit: 135, delay: 6, dur: 15 },
    { label: "Postgres", color: "from-blue-600/20 to-cyan-500/10 border-blue-600/30 text-blue-400", orbit: 95, delay: 7, dur: 9 },
  ];

  return (
    <motion.div variants={c} initial="hidden" animate="visible" className="relative flex flex-col gap-4 sm:gap-8 lg:gap-12 w-full pt-2 sm:pt-4">

      <div className="absolute -inset-x-3 sm:-inset-x-6 lg:-inset-x-8 -top-[80px] sm:-top-[100px] -bottom-[80px] sm:-bottom-[100px] z-0 pointer-events-none overflow-hidden select-none">
        <div className="relative w-full h-full min-h-[600px] sm:min-h-[800px] lg:min-h-[900px]">
          <Image
            src="/assets/hero_background.png"
            alt="Cosmic Background"
            fill
            className="object-cover opacity-70 sm:opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#050816]/40 to-[#050816] lg:from-[#050816]/95 lg:to-[#050816]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/90 via-transparent to-[#050816]/90" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-center w-full relative z-10">

          <motion.div variants={i} className="lg:col-span-4 flex flex-col gap-3 sm:gap-5 text-left z-20">

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] sm:text-xs font-semibold self-start tracking-wider"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              Available for work
            </motion.div>

            <div className="flex flex-col gap-0.5">
              <span className="text-sm sm:text-lg md:text-xl font-semibold text-text-secondary font-display">Hi, I&apos;m</span>
              <h1 className="text-[2rem] xs:text-5xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-none break-words">
                Aryan
              </h1>
              <h1 className="text-2xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-none mt-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent animate-shimmer">
                Developer
              </h1>
              <h2 className="text-xs sm:text-sm md:text-base font-semibold text-text-secondary mt-2 sm:mt-4 leading-relaxed font-display min-h-[1.5em]">
                <TypewriterText texts={roles} />
              </h2>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-text-secondary max-w-md">
              Final-year B.Tech Computer Science student at KIIT. Building scalable applications, cloud-native systems, and futuristic digital experiences that push boundaries.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 mt-1 sm:mt-2">
              <MagneticButton>
                <button onClick={() => setActivePage("projects")} className="btn-primary text-xs sm:text-sm py-2.5 px-4 sm:px-6">
                  View My Work <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </MagneticButton>
              <MagneticButton>
                <button onClick={() => setShowResume(true)} className="btn-secondary text-xs sm:text-sm py-2.5 px-4 sm:px-6 bg-black/40 border-white/10 hover:border-white/20">
                  View Resume <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" />
                </button>
              </MagneticButton>
            </div>

          <div className={`flex items-center gap-2 mt-2 sm:mt-4 text-text-secondary text-xs font-semibold select-none transition-all duration-500 ${
            scrollActive ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
          }`}>
            <span className="relative flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/25 py-1.5">
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-cyan-400"
              />
            </span>
            <span>Scroll Down</span>
          </div>

        </motion.div>

        <motion.div variants={i} className="lg:col-span-4 flex justify-center items-center relative min-h-[260px] xs:min-h-[340px] sm:min-h-[400px] lg:min-h-[480px] z-10 lg:-mt-14">
          
          <div className="relative w-[180px] h-[240px] xs:w-[250px] xs:h-[330px] sm:w-[300px] sm:h-[390px] lg:w-[340px] lg:h-[440px] flex items-end justify-center z-10 -mt-2 xs:-mt-4 sm:-mt-6 max-w-full overflow-hidden">
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-3xl"
              style={{
                background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(124,58,237,0.2), rgba(6,182,212,0.1), transparent)`,
                transition: "background 0.3s ease-out",
              }}
            />
            <div className="hidden lg:block">
              {badges.map((b, i) => (
                <FloatingBadge key={i} orbitRadius={b.orbit} delay={b.delay} duration={b.dur}
                >
                  <span className={`inline-block px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border bg-gradient-to-br ${b.color} backdrop-blur-md shadow-lg hover:scale-110 transition-transform duration-300`}>
                    {b.label}
                  </span>
                </FloatingBadge>
              ))}
            </div>
            <Image 
              src={headshot} 
              alt="Aryan" 
              className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] hover:scale-[1.02] transition-transform duration-500 relative z-10" 
              priority 
            />
          </div>

          <div className="absolute w-[320px] h-[320px] xs:w-[360px] xs:h-[360px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full animate-[spin_60s_linear_infinite] opacity-40">
            <div className="absolute inset-0 rounded-full border border-purple-500/10 shadow-[0_0_30px_rgba(124,58,237,0.05)]" />
            <div className="absolute inset-[15%] rounded-full border border-cyan-500/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-500/60 shadow-[0_0_15px_rgba(124,58,237,0.6)] animate-pulse-slow" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse-slow" style={{ animationDelay: "1s" }} />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500/60 shadow-[0_0_15px_rgba(99,102,241,0.6)] animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
          </div>
        </motion.div>

        <motion.div variants={i} className="lg:col-span-4 flex flex-col gap-3 sm:gap-4 lg:gap-5 z-20 lg:-mt-4">

          <TiltCard intensity={5}>
            <div className="glass-card-glow p-3 sm:p-4 lg:p-5 relative group">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div className="absolute -inset-full top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12 animate-[shimmer_3s_ease-in-out_infinite]" />
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                  <span>My Code</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/80" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500/80" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500/80" />
                </div>
              </div>
              
              <div className="font-mono text-[9px] xs:text-[10px] sm:text-[11px] leading-relaxed overflow-x-auto text-slate-300 flex gap-2 sm:gap-3 select-all">
                <div className="text-slate-500 select-none flex flex-col border-r border-white/5 pr-1.5 sm:pr-2.5 text-right font-semibold">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (<div key={n}>{n}</div>))}
                </div>
                <div className="whitespace-nowrap text-left">
                  <div><span className="text-purple-400">const</span> developer = &#123;</div>
                  <div className="pl-3 sm:pl-4"><span className="text-pink-400">name:</span> <span className="text-emerald-400">&apos;Aryan&apos;</span>,</div>
                  <div className="pl-3 sm:pl-4"><span className="text-pink-400">role:</span> <span className="text-emerald-400">&apos;Software Engineer&apos;</span>,</div>
                  <div className="pl-3 sm:pl-4"><span className="text-pink-400">passion:</span> <span className="text-emerald-400">&apos;Building digital wows&apos;</span>,</div>
                  <div className="pl-3 sm:pl-4"><span className="text-pink-400">skills:</span> [</div>
                  <div className="pl-6 sm:pl-8"><span className="text-emerald-400">&apos;Spring Boot&apos;</span>, <span className="text-emerald-400">&apos;React&apos;</span>,</div>
                  <div className="pl-6 sm:pl-8"><span className="text-emerald-400">&apos;AWS&apos;</span>, <span className="text-emerald-400">&apos;Salesforce&apos;</span></div>
                  <div className="pl-3 sm:pl-4">],</div>
                  <div className="pl-3 sm:pl-4"><span className="text-pink-400">focus:</span> <span className="text-emerald-400">&apos;Create Impact&apos;</span></div>
                  <div>&#125;;</div>
                </div>
              </div>
            </div>
          </TiltCard>

          <TiltCard intensity={4}>
            <div className="glass-card p-3 sm:p-4 lg:p-5 bg-black/40 border-white/5 backdrop-blur-xl hover:shadow-[0_12px_48px_rgba(124,58,237,0.2)]">
              <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                <h4 className="text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wider">GitHub Overview</h4>
                <a href="https://github.com/aryan25798" target="_blank" rel="noopener noreferrer" className="text-[10px] text-purple-400 hover:text-white flex items-center gap-1 transition-colors font-bold uppercase tracking-wider group/link">
                  View Profile <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="text-left flex-shrink-0">
                  <div className="text-lg xs:text-2xl sm:text-3xl font-black font-display text-white leading-tight">
                    <AnimatedCounter end={1428} duration={2} />
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-bold text-text-secondary uppercase tracking-wider mt-0.5">Contributions</div>
                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] sm:text-[9px] font-bold mt-1 sm:mt-2">
                    <span className="w-1 h-1.5 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>▲ 34%</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto pl-1.5 sm:pl-3 border-l border-white/5 flex-1 min-w-0 scrollbar-none">
                  <ContributionHeatmap />
                </div>
              </div>
            </div>
          </TiltCard>

          <TiltCard intensity={4}>
            <div className="glass-card p-3 sm:p-4 lg:p-5 bg-black/40 border-white/5 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h4 className="text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wider">Currently Building</h4>
                </div>
                <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-white/10" /><div className="w-1.5 h-1.5 rounded-full bg-white/10" /></div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 text-left">
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-purple-500/25 to-cyan-500/25 border border-purple-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(124,58,237,0.25)]">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-display font-bold text-xs sm:text-sm text-white leading-tight">AI SaaS Platform</h5>
                  <p className="text-[10px] sm:text-[11px] text-text-secondary mt-0.5">Full Stack Application</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold mt-2 sm:mt-3 mb-1">
                <span className="text-text-secondary">Progress</span>
                <span className="text-cyan-400">78%</span>
              </div>
              <div className="w-full h-1.5 sm:h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                />
              </div>
            </div>
          </TiltCard>

        </motion.div>
      </div>

        <motion.div variants={i} className="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 w-full relative z-10">
        {[
          { icon: <Code className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />, title: "Clean Code", desc: "Maintainable & Scalable" },
          { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />, title: "Problem Solver", desc: "Turning ideas into real solutions" },
          { icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />, title: "Performance", desc: "Optimized for high performance" },
          { icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />, title: "Continuous Learner", desc: "Always exploring new technologies" },
        ].map((h, idx) => (
          <TiltCard key={idx} intensity={4}>
            <div className="glass-card-glow p-3 sm:p-4 lg:p-5 flex items-center gap-3 sm:gap-4 text-left group bg-black/30">
              <div className="w-9 h-9 sm:w-10 sm:h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-purple-500/40 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all">
                {h.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-xs sm:text-sm text-white leading-tight mb-0.5">{h.title}</h3>
                <p className="text-[11px] sm:text-[11px] text-text-secondary leading-tight">{h.desc}</p>
              </div>
            </div>
          </TiltCard>
        ))}
      </motion.div>

      <motion.div variants={i} className="relative overflow-hidden w-full py-2 sm:py-3 z-10">
        <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-6 sm:gap-10 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[
            { name: "Java", slug: "java" },
            { name: "React", slug: "react" },
            { name: "AWS", slug: "amazonwebservices" },
            { name: "Spring Boot", slug: "springboot" },
            { name: "Docker", slug: "docker" },
            { name: "Apache Kafka", slug: "apachekafka" },
            { name: "MongoDB", slug: "mongodb" },
            { name: "TypeScript", slug: "typescript" },
            { name: "Python", slug: "python" },
            { name: "Kubernetes", slug: "kubernetes" },
            { name: "PostgreSQL", slug: "postgresql" },
            { name: "Redis", slug: "redis" },
            { name: "Next.js", slug: "nextdotjs" },
            { name: "Salesforce", slug: "salesforce" },
            { name: "Terraform", slug: "terraform" },
            { name: "Jenkins", slug: "jenkins" },
          ].concat([
            { name: "Java", slug: "java" },
            { name: "React", slug: "react" },
            { name: "AWS", slug: "amazonwebservices" },
            { name: "Spring Boot", slug: "springboot" },
            { name: "Docker", slug: "docker" },
            { name: "Apache Kafka", slug: "apachekafka" },
            { name: "MongoDB", slug: "mongodb" },
            { name: "TypeScript", slug: "typescript" },
            { name: "Python", slug: "python" },
            { name: "Kubernetes", slug: "kubernetes" },
            { name: "PostgreSQL", slug: "postgresql" },
            { name: "Redis", slug: "redis" },
            { name: "Next.js", slug: "nextdotjs" },
            { name: "Salesforce", slug: "salesforce" },
            { name: "Terraform", slug: "terraform" },
            { name: "Jenkins", slug: "jenkins" },
          ]).map((s, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3 whitespace-nowrap group/ticker">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover/ticker:border-purple-500/40 transition-all">
                <SkillIcon slug={s.slug} name={s.name} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-text-secondary group-hover/ticker:text-white transition-colors">{s.name}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={i} className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 w-full items-stretch relative z-10">
        
        <div className="lg:col-span-5 flex w-full">
          <TiltCard intensity={3} className="w-full flex">
            <div className="glass-card-glow p-4 sm:p-5 lg:p-6 text-center group bg-black/40 w-full flex items-center justify-center">
              <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-4 w-full">
                {[
                  { end: 2, suffix: "+", label: "Years Experience" },
                  { end: 25, suffix: "+", label: "Projects Completed" },
                  { end: 15, suffix: "+", label: "Technologies Mastered" },
                  { end: 5, suffix: " ★", label: "Client Reviews" },
                ].map((st, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col items-center justify-center transition-all hover:bg-white/[0.04]">
                    <div className="text-base xs:text-xl sm:text-2xl lg:text-3xl font-black font-display bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                      <AnimatedCounter end={st.end} suffix={st.suffix} duration={2} />
                    </div>
                    <div className="text-[9px] xs:text-[9px] sm:text-[9px] lg:text-[10px] uppercase font-bold text-text-secondary tracking-widest text-center mt-1 sm:mt-1.5 leading-normal max-w-[80px] xs:max-w-[90px] sm:max-w-[100px]">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>

        <div className="lg:col-span-7 flex w-full">
          <TiltCard intensity={3} className="w-full flex">
            <div className="glass-card-glow p-4 sm:p-5 lg:p-6 text-left group bg-black/40 w-full flex flex-col justify-between">
              
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <h4 className="text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-widest">Tech Stack</h4>
              </div>

              <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-7 lg:grid-cols-4 xl:grid-cols-7 gap-1.5 sm:gap-3 w-full">
                {[
                  { name: "Next.js", slug: "nextdotjs" },
                  { name: "React", slug: "react" },
                  { name: "TypeScript", slug: "typescript" },
                  { name: "Node.js", slug: "nodedotjs" },
                  { name: "MongoDB", slug: "mongodb" },
                  { name: "Tailwind CSS", slug: "tailwindcss" },
                  { name: "AWS", slug: "amazonwebservices" },
                ].map((tech, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 group/tile">
                    <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover/tile:scale-110 group-hover/tile:border-purple-500/40 group-hover/tile:-translate-y-1 group-hover/tile:shadow-[0_0_20px_rgba(124,58,237,0.3)] shadow-lg">
                      <SkillIcon slug={tech.slug} name={tech.name} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[9px] xs:text-[9px] sm:text-[9px] font-bold text-text-secondary uppercase tracking-wider group-hover/tile:text-white transition-colors text-center leading-tight">{tech.name}</span>
                  </div>
                ))}
              </div>

            </div>
          </TiltCard>
        </div>

        <ResumeViewer open={showResume} onClose={() => setShowResume(false)} />
      </motion.div>
    </motion.div>
  );
}
