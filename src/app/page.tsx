"use client";
 
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import BackgroundEffect from "@/components/BackgroundEffect";
import LoadingScreen from "@/components/LoadingScreen";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import HomeView from "@/components/Home";
import AboutView from "@/components/About";
import SkillsView from "@/components/Skills";
import ProjectsView from "@/components/Projects";
import ExperienceView from "@/components/Experience";
import BlogView from "@/components/Blog";
import ContactView from "@/components/Contact";
 
const variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
 
export default function Page() {
  const [activePage, setActivePage] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showTop, setShowTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    const valid = ["home", "about", "skills", "projects", "experience", "blog", "contact"];
    if (page && valid.includes(page)) {
      setActivePage(page);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", activePage);
    window.history.replaceState({}, "", url.toString());
  }, [activePage]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
 
  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomeView setActivePage={setActivePage} key="home" />;
      case "about": return <AboutView key="about" />;
      case "skills": return <SkillsView key="skills" />;
      case "projects": return <ProjectsView key="projects" />;
      case "experience": return <ExperienceView key="experience" />;
      case "blog": return <BlogView key="blog" />;
      case "contact": return <ContactView key="contact" />;
      default: return <HomeView setActivePage={setActivePage} key="home" />;
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      <LoadingScreen />
      <BackgroundEffect />

      <div
        className="pointer-events-none fixed inset-0 z-30 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124,58,237,0.04), transparent 60%)`,
          transition: "background 0.15s ease-out",
        }}
      />

      <Sidebar activePage={activePage} setActivePage={setActivePage} onMenuToggle={setMobileMenuOpen} />
      <Header activePage={activePage} setActivePage={setActivePage} mobileMenuOpen={mobileMenuOpen} onMenuToggle={setMobileMenuOpen} />

      <main className="pl-0 md:pl-14 lg:pl-20 pt-[60px] sm:pt-[76px] min-h-screen relative z-10">
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
        className={`fixed bottom-4 sm:bottom-5 right-3 sm:right-5 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-text-secondary hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 active:scale-90 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
