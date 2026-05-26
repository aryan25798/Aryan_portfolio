"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, User, Code, Briefcase, GraduationCap, Mail, Newspaper } from "lucide-react";

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
  onMenuToggle: (open: boolean) => void;
}

const items = [
  { id: "home", icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />, label: "Home" },
  { id: "about", icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />, label: "About" },
  { id: "skills", icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />, label: "Skills" },
  { id: "projects", icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />, label: "Projects" },
  { id: "experience", icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />, label: "Experience" },
  { id: "blog", icon: <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />, label: "Blog" },
  { id: "contact", icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />, label: "Contact" },
];

const socials = [
  { href: "https://github.com/aryan25798", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22", color: "hover:text-cyan-400" },
  { href: "https://linkedin.com/in/aryan-a506b8288", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", color: "hover:text-purple-500" },
  { href: "https://twitter.com/aryan57", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z", color: "hover:text-blue-400" },
  { href: "https://instagram.com/_a_rya_n", path: "M2 2h20v20H2zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01", color: "hover:text-pink-400" },
];

export default function Sidebar({ activePage, setActivePage, onMenuToggle }: Props) {
  const handleNav = (id: string) => {
    setActivePage(id);
    onMenuToggle(false);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-14 sm:w-16 lg:w-20 z-50 bg-[#060318]/40 border-r border-white/5 flex flex-col justify-between items-center py-3 sm:py-4 lg:py-6 backdrop-blur-2xl transition-all hidden md:flex shadow-[2px_0_30px_rgba(0,0,0,0.3)]">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleNav("home")}
        className="w-8 h-8 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center border border-purple-500/30 bg-purple-500/10 hover:border-purple-500 transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] relative group"
        aria-label="Home"
      >
        <motion.span
          animate={{ textShadow: ["0 0 0px rgba(124,58,237,0)", "0 0 10px rgba(124,58,237,0.6)", "0 0 0px rgba(124,58,237,0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="font-display font-extrabold text-sm sm:text-base lg:text-lg text-white"
        >A</motion.span>
      </motion.button>

      <nav className="flex flex-col gap-1.5 sm:gap-2 lg:gap-3 w-full px-1.5 sm:px-2 lg:px-3">
        {items.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleNav(item.id)}
            className={`w-full h-8 sm:h-9 lg:h-11 rounded-xl flex items-center justify-center transition-all duration-300 relative group ${
              activePage === item.id
                ? "border border-purple-500/40 bg-purple-500/15 text-white shadow-[0_0_20px_rgba(124,58,237,0.35)]"
                : "text-text-secondary hover:text-white hover:bg-white/5 hover:border-white/10 border border-transparent"
            }`}
            aria-label={item.label}
          >
            <motion.span
              animate={activePage === item.id ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {item.icon}
            </motion.span>
            <span className="absolute left-10 sm:left-11 lg:left-14 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#0a0720]/95 text-text-primary text-[10px] sm:text-[11px] font-semibold opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 border border-white/5 backdrop-blur-sm shadow-xl whitespace-nowrap z-[60]">
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${activePage === item.id ? "bg-purple-500 animate-pulse" : "bg-white/20"}`} />
                {item.label}
              </span>
            </span>
          </motion.button>
        ))}
      </nav>

      <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 w-full items-center">
        {socials.map((s, i) => (
          <motion.a
            key={i}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            href={s.href} target="_blank" rel="noopener noreferrer"
            className={`text-text-secondary ${s.color} transition-all duration-300 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6`}
            aria-label={s.href.replace("https://", "").split("/")[0]}
          >
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={s.path} />
            </svg>
          </motion.a>
        ))}
      </div>
    </aside>
  );
}
