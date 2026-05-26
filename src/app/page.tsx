"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import BackgroundEffect from "@/components/BackgroundEffect";
import LoadingScreen from "@/components/LoadingScreen";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import HomeView from "@/components/Home";
import AboutView from "@/components/About";
import SkillsView from "@/components/Skills";
import ProjectsView from "@/components/Projects";
import ExperienceView from "@/components/Experience";
import BlogView from "@/components/Blog";
import ContactView from "@/components/Contact";

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const } },
};

const pages = ["home", "about", "skills", "projects", "experience", "blog", "contact"];

export default function Page() {
  const [activePage, setActivePage] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (page && pages.includes(page)) {
      setActivePage(page);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", activePage);
    window.history.replaceState({}, "", url.toString());
  }, [activePage]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigateTo = useCallback((id: string) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const idx = parseInt(e.key) - 1;
      if (idx >= 0 && idx < pages.length) {
        navigateTo(pages[idx]);
        return;
      }
      if (e.key.toLowerCase() === "r" && !e.repeat) {
        window.dispatchEvent(new CustomEvent("open-resume"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigateTo]);

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomeView setActivePage={navigateTo} key="home" />;
      case "about": return <AboutView key="about" />;
      case "skills": return <SkillsView key="skills" />;
      case "projects": return <ProjectsView key="projects" />;
      case "experience": return <ExperienceView key="experience" />;
      case "blog": return <BlogView key="blog" />;
      case "contact": return <ContactView key="contact" />;
      default: return <HomeView setActivePage={navigateTo} key="home" />;
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      <LoadingScreen />
      <BackgroundEffect />

      <Sidebar activePage={activePage} setActivePage={navigateTo} onMenuToggle={setMobileMenuOpen} />
      <Header activePage={activePage} setActivePage={navigateTo} mobileMenuOpen={mobileMenuOpen} onMenuToggle={setMobileMenuOpen} />
      <MobileNav activePage={activePage} setActivePage={navigateTo} />

      <main className="pl-0 md:pl-14 lg:pl-20 pt-[60px] sm:pt-[76px] pb-16 md:pb-0 min-h-screen relative z-10" style={{ contentVisibility: "auto" }}>
        <div className="section-container">
          <AnimatePresence mode="wait">
            <motion.div key={activePage} variants={variants} initial="initial" animate="animate" exit="exit" className="scroll-mt-24">
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-20 md:bottom-5 right-3 sm:right-5 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-text-secondary hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 active:scale-90 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
