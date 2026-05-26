"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, Mail } from "lucide-react";
import Link from "next/link";

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
  mobileMenuOpen: boolean;
  onMenuToggle: (open: boolean) => void;
}

const navLinks = [
  { id: "home", name: "Home" },
  { id: "about", name: "About" },
  { id: "skills", name: "Skills" },
  { id: "projects", name: "Projects" },
  { id: "experience", name: "Experience" },
  { id: "blog", name: "Blog" },
  { id: "contact", name: "Contact" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Header({ activePage, setActivePage, mobileMenuOpen, onMenuToggle }: Props) {
  const handleNav = (id: string) => {
    setActivePage(id);
    onMenuToggle(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 md:left-20 right-0 h-[56px] sm:h-[72px] z-40 bg-[#050816]/70 border-b border-white/5 flex items-center justify-between px-2 sm:px-6 lg:px-8 backdrop-blur-2xl shadow-[0_1px_30px_rgba(0,0,0,0.3)]">
        <button onClick={() => handleNav("home")} className="flex items-center gap-1 font-display font-black text-base sm:text-xl lg:text-2xl tracking-wider text-white hover:opacity-80 transition-opacity min-w-0 flex-shrink-0 group">
          <motion.span
            animate={{ textShadow: ["0 0 0px rgba(124,58,237,0)", "0 0 15px rgba(124,58,237,0.5)", "0 0 0px rgba(124,58,237,0)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            A<span className="text-purple-500">.</span>
          </motion.span>
          <span className="text-[10px] font-mono font-normal text-text-secondary ml-1 hidden xs:inline opacity-70 group-hover:opacity-100 transition-opacity">&lt;dev /&gt;</span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`relative px-2.5 xl:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold tracking-wider rounded-lg transition-all duration-300 whitespace-nowrap ${
                activePage === link.id
                  ? "text-white bg-purple-500/15 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                  : "text-text-secondary hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
              {activePage === link.id && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_8px_rgba(124,58,237,0.5)]"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <button onClick={() => handleNav("contact")} className="btn-primary py-1.5 sm:py-2 px-2.5 sm:px-5 text-[10px] sm:text-xs shadow-[0_4px_20px_rgba(124,58,237,0.25)] hover:shadow-[0_6px_30px_rgba(6,182,212,0.4)]">
            <span className="hidden sm:inline">Let&apos;s Connect</span>
            <span className="sm:hidden">Connect</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-300" />
          </button>

          <button
            onClick={() => onMenuToggle(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white transition-all active:scale-90 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(124,58,237,0.15)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-[#050816]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-center items-center px-4 overflow-hidden"
          >
            {/* Premium futuristic glowing background blobs */}
            <div className="absolute top-[15%] left-[-20%] w-[250px] h-[250px] rounded-full bg-purple-500/15 blur-[80px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-[15%] right-[-20%] w-[250px] h-[250px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />

            <motion.nav
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col gap-2 sm:gap-4 text-center w-full max-w-xs"
            >
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  variants={itemAnim}
                  onClick={() => handleNav(link.id)}
                  className={`relative text-lg sm:text-2xl md:text-3xl font-bold tracking-widest uppercase py-3 sm:py-2 transition-all duration-300 rounded-xl touch-manipulation overflow-hidden ${
                    activePage === link.id
                      ? "text-white bg-gradient-to-r from-purple-500/15 to-cyan-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                      : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {link.name}
                  {activePage === link.id && (
                    <motion.span layoutId="mobile-dot" className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                  )}
                </motion.button>
              ))}
              <motion.div variants={itemAnim} className="flex items-center justify-center gap-5 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                {[
                  { href: "https://github.com/aryan25798", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22", color: "hover:text-purple-400" },
                  { href: "https://linkedin.com/in/aryan-a506b8288", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", color: "hover:text-blue-400" },
                  { href: "https://twitter.com/aryan57", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z", color: "hover:text-cyan-400" },
                  { href: "mailto:aryan25798@gmail.com", icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, color: "hover:text-amber-400" },
                ].map((s, i) => (
                  <Link key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`text-text-secondary ${s.color} transition-all hover:scale-125`}>
                    {s.icon || <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={s.path} /></svg>}
                  </Link>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
