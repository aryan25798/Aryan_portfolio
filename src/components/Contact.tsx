"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Sparkles, CheckCircle, AlertCircle, MessageSquare, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { sendEmail } from "@/lib/email";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";

const c = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const i = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } };

const socials = [
  { icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>, href: "https://github.com/aryan25798", c: "hover:text-purple-400 hover:border-purple-500/40" },
  { icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /></svg>, href: "https://linkedin.com/in/aryan-a506b8288", c: "hover:text-blue-400 hover:border-blue-500/40" },
  { icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>, href: "https://twitter.com/aryan57", c: "hover:text-cyan-400 hover:border-cyan-500/40" },
  { icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" /></svg>, href: "https://instagram.com/_a_rya_n", c: "hover:text-pink-400 hover:border-pink-500/40" },
];

const contactInfo = [
  { icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />, label: "Email", value: "aryan25798@gmail.com", href: "mailto:aryan25798@gmail.com" },
  { icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />, label: "Phone", value: "+91-8804050193", href: "tel:+918804050193" },
  { icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />, label: "Location", value: "Bhubaneswar, Odisha, India", href: "https://maps.google.com/?q=Bhubaneswar,Odisha,India" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const result = await sendEmail(form);

    if (result.success) {
      setStatus({ type: "success", text: "Message sent successfully! I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors: ["#7C3AED", "#3B82F6", "#06B6D4"] });
    } else {
      setStatus({ type: "error", text: result.error || "Failed to send. Please email directly." });
    }
    setSending(false);
  };

  const inputClass = (name: string) =>
    `w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border text-xs sm:text-sm text-white focus:outline-none transition-all placeholder:text-text-secondary/40 ${
      focused === name
        ? "border-purple-500/50 bg-white/10 shadow-[0_0_25px_rgba(124,58,237,0.15)]"
        : "border-white/10 hover:border-white/20"
    }`;

  return (
    <motion.div variants={c} initial="hidden" animate="visible" className="flex flex-col gap-4 sm:gap-6 w-full text-left pt-2 sm:pt-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
          <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-wide text-white">Contact</h2>
        </div>
        <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider hidden sm:block">Let&apos;s Work Together</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-7">
        {/* Form */}
        <motion.div variants={i} className="lg:col-span-7">
          <TiltCard intensity={5}>
            <div className="glass-card-glow p-4 sm:p-6 lg:p-7 flex flex-col relative overflow-hidden min-h-[360px]">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/5 blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/5 blur-[60px] pointer-events-none" />

              <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-6 items-start z-10 relative w-full h-full">
                <div className="sm:col-span-7 flex flex-col gap-3 sm:gap-4 w-full">
                  <div>
                    <h3 className="font-display font-black text-base sm:text-lg lg:text-xl text-white leading-tight flex items-center gap-2 flex-wrap">
                      Drop a Message
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                      I&apos;m always open to discussing new opportunities, systems architecture, or cloud setups.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:gap-3">
                    <div className="relative">
                      <input type="text" placeholder="Your Name" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} required
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        className={inputClass("name")}
                      />
                      {focused === "name" && (
                        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                          className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-purple-500/50 to-cyan-500/50 origin-left" />
                      )}
                    </div>
                    <div className="relative">
                      <input type="email" placeholder="Your Email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} required
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        className={inputClass("email")}
                      />
                      {focused === "email" && (
                        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                          className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-blue-500/50 to-purple-500/50 origin-left" />
                      )}
                    </div>
                    <div className="relative">
                      <textarea placeholder="Your Message..." value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={3}
                        onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                        className={`${inputClass("message")} resize-none`}
                      />
                      {focused === "message" && (
                        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                          className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-cyan-500/50 to-blue-500/50 origin-left" />
                      )}
                    </div>

                    {status && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start gap-2 text-xs p-3 rounded-xl ${
                          status.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                        {status.type === "success" ? <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                        <span className="text-[11px] sm:text-xs">{status.text}</span>
                      </motion.div>
                    )}

                    <MagneticButton>
                      <button type="submit" disabled={sending}
                        className="btn-primary py-2.5 sm:py-3 px-5 sm:px-6 self-start text-[11px] sm:text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 sm:gap-2"
                      >
                        {sending ? (
                          <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                        ) : (
                          <><Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Send Message</>
                        )}
                      </button>
                    </MagneticButton>
                  </form>
                </div>

                {/* Visual decoration */}
                <div className="hidden sm:flex sm:col-span-5 items-center justify-center min-h-[200px] relative select-none w-full">
                  <div className="absolute w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full bg-cyan-500/5 blur-[30px]" />
                  <div className="absolute w-[80px] h-[80px] rounded-full bg-purple-500/5 blur-[25px] -top-4 -right-4" />
                  <svg className="w-full h-full max-w-[110px] sm:max-w-[130px] animate-[spin_30s_linear_infinite] opacity-50" viewBox="0 0 100 100" stroke="url(#gg)" strokeWidth="0.8" fill="none">
                    <circle cx="50" cy="50" r="45" strokeOpacity="0.4" />
                    <ellipse cx="50" cy="50" rx="45" ry="15" strokeOpacity="0.3" />
                    <ellipse cx="50" cy="50" rx="45" ry="30" strokeOpacity="0.3" />
                    <ellipse cx="50" cy="50" rx="15" ry="45" strokeOpacity="0.3" />
                    <ellipse cx="50" cy="50" rx="30" ry="45" strokeOpacity="0.3" />
                    <line x1="50" y1="5" x2="50" y2="95" strokeOpacity="0.3" />
                    <line x1="5" y1="50" x2="95" y2="50" strokeOpacity="0.3" />
                    <defs>
                      <linearGradient id="gg" x1="0" y1="0" x2="100" y2="100">
                        <stop stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div
                    className="absolute bottom-2 text-[8px] sm:text-[9px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"
                    style={{ animation: "glow-pulse-emerald 2s ease-in-out infinite" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Available
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Info sidebar */}
        <motion.div variants={i} className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {contactInfo.map((info, idx) => (
              <TiltCard key={idx} intensity={4}>
                <a href={info.href} target={idx === 2 ? "_blank" : "_self"} rel="noopener noreferrer"
                  className="glass-card p-3 sm:p-4 flex items-center gap-3 sm:gap-4 text-left group hover:scale-[1.01] transition-all"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-purple-500/40 group-hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[9px] sm:text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-none mb-0.5">{info.label}</h4>
                    <p className="text-[11px] sm:text-xs font-bold text-white leading-tight break-all">{info.value}</p>
                  </div>
                </a>
              </TiltCard>
            ))}
          </div>

          <TiltCard intensity={3}>
            <div className="glass-card p-3 sm:p-4 flex flex-col gap-2.5">
              <h4 className="text-[9px] sm:text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Connect Online
              </h4>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {socials.map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary ${s.c} transition-all active:scale-90 hover:scale-110`}
                      aria-label={s.href.split("/").pop() || "social"}
                    >
                      <span className="transition-transform duration-300 hover:rotate-[360deg] inline-flex">{s.icon}</span>
                    </a>
                ))}
              </div>
            </div>
          </TiltCard>

          <TiltCard intensity={3}>
            <div className="glass-card-gradient overflow-hidden">
              <div className="p-3 sm:p-5 relative bg-gradient-to-br from-purple-500/10 to-blue-500/10 min-h-[70px] sm:min-h-[90px] flex items-center justify-between">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                <div className="text-left max-w-[70%] sm:max-w-[65%] relative z-10">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-white leading-tight mb-0.5 flex items-center gap-1.5">
                    Let&apos;s build something epic!
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                  </h4>
                  <p className="text-[9px] sm:text-[10px] text-text-secondary">Constructing digital wows for a better tomorrow.</p>
                </div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-14 flex items-center justify-center select-none mr-1 z-10">
                  <div className="absolute w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/10 rounded-full blur-[15px]" />
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.55)] float-gentle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
