"use client";

import { Home, User, Code, Briefcase, GraduationCap, Newspaper, Mail } from "lucide-react";

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
}

const items = [
  { id: "home", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "skills", icon: Code, label: "Skills" },
  { id: "projects", icon: Briefcase, label: "Work" },
  { id: "experience", icon: GraduationCap, label: "Exp" },
  { id: "blog", icon: Newspaper, label: "Blog" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export default function MobileNav({ activePage, setActivePage }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#050816]/90 backdrop-blur-2xl border-t border-white/10 safe-area-bottom">
      <div className="flex items-center justify-around px-1 py-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`relative flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-xl transition-all duration-200 active:scale-90 touch-manipulation min-w-0 flex-1 ${
                isActive
                  ? "text-white"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
              )}
              <div className={`rounded-lg p-1 transition-colors ${isActive ? "bg-purple-500/15" : ""}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[8px] font-bold uppercase tracking-wider ${isActive ? "opacity-100" : "opacity-70"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
