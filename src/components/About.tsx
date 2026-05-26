"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Calendar, Code, Server, Cloud, Database, GitBranch, Cpu, Star, MapPin, Download } from "lucide-react";
import confetti from "canvas-confetti";
import { useGitHub } from "@/lib/useGitHub";
import TiltCard from "./TiltCard";
import AnimatedCounter from "./AnimatedCounter";

const c = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const i = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } };

const expertise = [
  { icon: <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" />, label: "Java & Spring Boot" },
  { icon: <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />, label: "MERN Stack" },
  { icon: <Cloud className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />, label: "AWS & Docker" },
  { icon: <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />, label: "Kafka & Redis" },
  { icon: <GitBranch className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />, label: "CI/CD & DevOps" },
  { icon: <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />, label: "Salesforce CRM" },
];

const certs = [
  { name: "Salesforce CAD Certified", sub: "Certified Advanced Developer", g: "from-cyan-500/10 to-blue-500/5", b: "hover:border-cyan-500/50" },
  { name: "Salesforce CSA Certified", sub: "Certified System Administrator", g: "from-purple-500/10 to-blue-500/5", b: "hover:border-purple-500/50" },
];

export default function About() {
  const { repos, totalStars, langStats, loading } = useGitHub();

  return (
    <motion.div variants={c} initial="hidden" animate="visible" className="flex flex-col gap-5 sm:gap-8 lg:gap-10 w-full text-left pt-2 sm:pt-4">

      {/* ── Hero: Image + Bio ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-start">
        {/* Image */}
        <motion.div variants={i} className="md:col-span-2 flex justify-center md:justify-start">
          <TiltCard intensity={5} className="w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-full">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/5">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent z-10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/headshot_transparent.png"
                alt="Aryan"
                className="w-full h-auto object-cover scale-105 hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4 bg-gradient-to-t from-[#050816]/90 to-transparent">
                <h3 className="font-display font-bold text-base sm:text-lg text-white">Aryan</h3>
                <p className="text-[10px] sm:text-xs text-text-secondary flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Bhubaneswar, India
                </p>
              </div>
              <div className="absolute top-3 right-3 z-20">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[9px] sm:text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Available
                </span>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Bio */}
        <motion.div variants={i} className="md:col-span-3 flex flex-col gap-4 sm:gap-5">
          <TiltCard intensity={4}>
            <div className="glass-card-glow p-4 sm:p-6 lg:p-7">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-wide text-white">About Me</h2>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-secondary mb-3">
                I am a final-year B.Tech Computer Science and Engineering student at <strong className="text-white">KIIT University</strong>, Bhubaneswar. My expertise spans across Java, Spring Boot, MERN Stack, AWS, Docker, Kafka, Distributed Systems, REST APIs, CI/CD, and Salesforce CRM.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                Passionate about crafting highly optimized distributed microservices, building CI/CD automation pipelines, and working in production-scale backend and cloud ecosystems. With extensive algorithmic problem-solving experience and <strong className="text-white">{repos.length}+ projects</strong> built, I am actively seeking Software Engineer opportunities.
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-white/5">
                {[
                  { icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />, label: "Education", value: "B.Tech CSE @ KIIT" },
                  { icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />, label: "Grade", value: "8.75 CGPA" },
                  { icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />, label: "Graduation", value: "Expected 2026" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all group/item">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">{s.icon}</div>
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-none mb-0.5">{s.label}</div>
                      <div className="text-[11px] sm:text-xs font-bold text-white">{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* ── Stats ── */}
      <motion.div variants={i} className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {[
          { value: loading ? "—" : 500, label: "Problems Solved", g: "from-purple-500 to-blue-500", suffix: "+" },
          { value: loading ? "—" : repos.length, label: "Projects Built", g: "from-blue-500 to-cyan-500", suffix: "+" },
          { value: loading ? "—" : langStats.length, label: "Technologies", g: "from-cyan-500 to-purple-500", suffix: "+" },
          { value: loading ? "—" : 2, label: "Internships", g: "from-purple-500 to-cyan-500", suffix: "+" },
        ].map((s, i) => (
          <TiltCard key={i} intensity={4}>
            <div className="glass-card p-3 sm:p-4 lg:p-5 text-center group hover:scale-[1.03]">
              <div className={`text-lg xs:text-xl sm:text-2xl lg:text-3xl font-black font-display bg-gradient-to-r ${s.g} bg-clip-text text-transparent`}>
                {typeof s.value === "number" && !loading ? <><AnimatedCounter end={s.value} suffix={s.suffix} duration={2} /></> : s.value}
              </div>
              <div className="text-[8px] sm:text-[10px] uppercase font-bold text-text-secondary tracking-widest mt-1">{s.label}</div>
            </div>
          </TiltCard>
        ))}
      </motion.div>

      {/* ── Expertise & Certs ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Expertise + Internships */}
        <motion.div variants={i} className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
          <TiltCard intensity={5}>
            <div className="glass-card-glow p-4 sm:p-6 lg:p-7">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <h3 className="font-display font-black text-lg sm:text-xl lg:text-2xl tracking-wide text-white">Areas of Expertise</h3>
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 sm:gap-3">
                {expertise.map((ex, i) => (
                  <div key={i} className="flex items-center gap-1.5 sm:gap-3 p-2 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all group/ex">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/ex:scale-110 transition-transform">{ex.icon}</div>
                    <span className="text-[11px] sm:text-xs font-semibold text-white leading-tight">{ex.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>

          <TiltCard intensity={5}>
            <div className="glass-card-glow p-4 sm:p-6 lg:p-7">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                <h3 className="font-display font-black text-lg sm:text-xl lg:text-2xl tracking-wide text-white">Internships</h3>
              </div>
              <div className="flex flex-col gap-3 sm:gap-4">
                {[
                  { role: "Linux Developer Intern", company: "Sasken Technologies, Bengaluru", period: "May 2025 – Jul 2025", desc: "Developed a custom Linux shell in C with process management, piping, I/O redirection, and performance optimization.", c: "text-purple-400" },
                  { role: "Cloud Computing Intern", company: "AICTE Virtual Internship", period: "Oct 2024 – Dec 2024", desc: "AWS EC2/S3/IAM/RDS, Docker containers, Jenkins CI/CD pipeline deployment and cloud optimization.", c: "text-blue-400" },
                ].map((exp, i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all">
                    <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-1 sm:gap-2">
                      <div className="min-w-0">
                        <h4 className="font-display font-bold text-xs sm:text-sm text-white truncate">{exp.role}</h4>
                        <p className={`text-[10px] sm:text-[11px] font-semibold ${exp.c} mt-0.5`}>{exp.company}</p>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-text-secondary uppercase tracking-widest px-2 py-0.5 sm:py-1 rounded bg-white/5 whitespace-nowrap self-start flex-shrink-0">{exp.period}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-text-secondary leading-relaxed mt-1.5 sm:mt-2">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Certs */}
        <motion.div variants={i} className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
          <TiltCard intensity={5}>
            <div className="glass-card-glow p-4 sm:p-6 lg:p-7">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                <h3 className="font-display font-black text-lg sm:text-xl lg:text-2xl text-white">Certifications</h3>
              </div>
              <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed mb-3 sm:mb-4">
                Salesforce Certified professional with extensive knowledge of CRM administration, custom data workflows, profiles, permissions sets, and enterprise automation.
              </p>
              <div className="flex flex-col gap-2 sm:gap-3">
                {certs.map((cert, i) => (
                  <div key={i} onClick={() => confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ["#7C3AED", "#3B82F6", "#06B6D4"] })}
                    className={`p-3 sm:p-4 rounded-xl border border-white/5 bg-gradient-to-br ${cert.g} ${cert.b} cursor-pointer flex justify-between items-center transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] group`}
                  >
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-[11px] sm:text-xs text-white leading-tight mb-0.5 truncate">{cert.name}</h4>
                      <p className="text-[9px] sm:text-[10px] text-text-secondary truncate">{cert.sub}</p>
                    </div>
                    <Award className="w-4 h-4 text-amber-400/70 group-hover:text-amber-400 group-hover:scale-110 transition-all flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>

          <TiltCard intensity={4}>
            <div className="glass-card-glow p-4 sm:p-6 lg:p-7 flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                <h3 className="font-display font-black text-lg sm:text-xl lg:text-2xl text-white">GitHub Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] sm:text-xs text-text-secondary flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-amber-400" /> Total Stars
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white">{loading ? "—" : totalStars}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] sm:text-xs text-text-secondary flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-purple-400" /> Repositories
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white">{loading ? "—" : repos.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] sm:text-xs text-text-secondary flex items-center gap-2">
                    <Cloud className="w-3.5 h-3.5 text-cyan-400" /> Languages
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white">{loading ? "—" : langStats.length}</span>
                </div>
              </div>
              <a href="/assets/Aryan_Resume.pdf" download
                className="mt-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-white text-[11px] sm:text-xs font-bold hover:from-purple-500/30 hover:to-cyan-500/30 hover:border-purple-500/50 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download Resume
              </a>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
