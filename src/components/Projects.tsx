"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, Globe, ExternalLink, Rocket, ArrowUpDown, Filter } from "lucide-react";
import type { GithubRepo } from "@/lib/github";
import { useGitHub } from "@/lib/useGitHub";
import TiltCard from "./TiltCard";

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  Java: "#b07219", "C++": "#f34b7d", C: "#555555", HTML: "#e34c26",
  CSS: "#563d7c", Shell: "#89e051", Dockerfile: "#384d54",
};

const CARD_BGS: Record<string, string> = {
  JavaScript: "from-amber-600/20 via-amber-500/5", TypeScript: "from-blue-700/20 via-blue-600/5",
  Python: "from-emerald-700/20 via-emerald-600/5", Java: "from-orange-800/20 via-orange-700/5",
  "C++": "from-rose-700/20 via-rose-600/5", HTML: "from-orange-600/20 via-orange-500/5",
  CSS: "from-violet-700/20 via-violet-600/5", Shell: "from-lime-700/20 via-lime-600/5",
  Dockerfile: "from-sky-800/20 via-sky-700/5",
};

const sortOptions = [
  { value: "stars", label: "Stars" },
  { value: "updated", label: "Recent" },
  { value: "name", label: "Name" },
  { value: "forks", label: "Forks" },
] as const;

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};

const cardUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

function timeAgo(dateStr: string) {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function ProjectCard({ repo }: { repo: GithubRepo }) {
  const langColor = LANG_COLORS[repo.language || ""] || "#8b5cf6";
  const langTotal = Object.values(repo.languages).reduce((s: number, v: number) => s + v, 0) || 1;
  const langEntries = Object.entries(repo.languages).sort(([, a], [, b]) => (b as number) - (a as number));

  return (
    <motion.div variants={cardUp} className="h-full">
      <TiltCard intensity={4}>
        <div className="block h-full group/card relative">
          <div className={`glass-card-glow h-full relative overflow-hidden bg-gradient-to-br ${CARD_BGS[repo.language || ""] || "from-purple-700/20 via-purple-600/5"} to-transparent`}>
            <div className="absolute -top-24 -right-24 w-48 h-48 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${langColor}18 0%, transparent 60%)` }}
            />

            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block relative h-28 sm:h-32 lg:h-36 overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 group-hover/card:scale-105"
                style={{ background: `linear-gradient(160deg, ${langColor}30 0%, ${langColor}08 40%, transparent 65%)` }}
              />
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "16px 16px" }} />
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-25 blur-2xl" style={{ backgroundColor: langColor }} />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full opacity-15 blur-xl" style={{ backgroundColor: langColor }} />

              <div className="absolute inset-0 flex items-center justify-center select-none">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-display leading-none opacity-[0.07] tracking-tight" style={{ color: langColor }}>
                  {repo.name.replace(/[-_]/g, " ").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                </span>
              </div>

              <div className="absolute top-2 left-3 flex items-center gap-1.5">
                <span className="flex items-center gap-1 text-[7px] sm:text-[8px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-sm"
                  style={{ color: langColor, backgroundColor: `${langColor}18`, borderColor: `${langColor}25` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: langColor }} />
                  {repo.language || "N/A"}
                </span>
                {repo.homepage && (
                  <span className="text-[7px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                )}
              </div>

              <div className="absolute bottom-2 left-3 right-3">
                <h3 className="font-display font-bold text-sm sm:text-base lg:text-lg text-white leading-tight drop-shadow-xl">
                  {repo.name.replace(/[-_]/g, " ")}
                </h3>
              </div>
            </a>

            <div className="p-3 sm:p-4 flex flex-col gap-2">
              <p className="text-[10px] sm:text-[11px] text-text-secondary leading-relaxed line-clamp-2 min-h-[2.4em]">
                {repo.description || "No description provided."}
              </p>

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map((t) => (
                    <span key={t} className="text-[6px] sm:text-[7px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wider"
                      style={{ color: langColor, backgroundColor: `${langColor}12`, borderColor: `${langColor}18` }}
                    >
                      {t}
                    </span>
                  ))}
                  {repo.topics.length > 3 && <span className="text-[6px] text-text-secondary/40">+{repo.topics.length - 3}</span>}
                </div>
              )}

              {langEntries.length > 0 && (
                <div className="flex h-[3px] rounded-full overflow-hidden bg-white/5">
                  {langEntries.slice(0, 5).map(([l, v]) => (
                    <div key={l} className="h-full transition-all"
                      style={{ width: `${((v as number) / langTotal) * 100}%`, backgroundColor: LANG_COLORS[l] || "#8b5cf6" }}
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                <div className="flex items-center gap-2">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:border-purple-500/40 transition-all cursor-pointer">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    <span className="text-[8px] sm:text-[9px] font-bold">Source</span>
                  </a>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer"
                      style={{ color: langColor, backgroundColor: `${langColor}15`, border: `1px solid ${langColor}25` }}
                    >
                      <Globe className="w-2.5 h-2.5" />
                      <span className="text-[8px] sm:text-[9px] font-bold">Demo</span>
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[8px] sm:text-[9px] text-text-secondary">
                  <span className="flex items-center gap-0.5" title="Stars"><Star className="w-2.5 h-2.5 text-amber-400/70" /> {repo.stargazers_count}</span>
                  <span className="flex items-center gap-0.5" title="Forks"><GitFork className="w-2.5 h-2.5" /> {repo.forks_count}</span>
                  <span className="hidden xs:inline opacity-50" title="Updated">{timeAgo(repo.pushed_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function FeaturedCard({ repo }: { repo: GithubRepo }) {
  const langColor = LANG_COLORS[repo.language || ""] || "#8b5cf6";

  return (
    <motion.div variants={cardUp}>
      <TiltCard intensity={5}>
        <div className="block group/card relative h-full">
          <div className="glass-card-glow overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none opacity-25"
              style={{ background: `radial-gradient(800px circle at 30% 30%, ${langColor}20 0%, transparent 60%)` }}
            />

            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block relative h-32 sm:h-40 lg:h-48 overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 group-hover/card:scale-105"
                style={{ background: `linear-gradient(160deg, ${langColor}35 0%, ${langColor}08 30%, transparent 60%)` }}
              />
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)", backgroundSize: "20px 20px" }} />
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: langColor }} />
              <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full opacity-20 blur-2xl" style={{ backgroundColor: langColor }} />

              <div className="absolute inset-0 flex items-center justify-center select-none">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-black font-display leading-none opacity-[0.06] tracking-tight" style={{ color: langColor }}>
                  {repo.name.replace(/[-_]/g, " ").split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase()}
                </span>
              </div>

              <div className="absolute top-2 left-3 sm:left-4 flex items-center gap-2">
                <span className="flex items-center gap-1 text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-sm"
                  style={{ color: langColor, backgroundColor: `${langColor}18`, borderColor: `${langColor}25` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: langColor }} />
                  {repo.language || "N/A"}
                </span>
                <span className="text-[8px] font-bold text-purple-400 bg-purple-500/15 border border-purple-500/25 px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                  <Rocket className="w-2.5 h-2.5" />
                  Featured
                </span>
              </div>

              <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4">
                <h3 className="font-display font-black text-base sm:text-xl lg:text-2xl text-white drop-shadow-2xl mb-0.5">
                  {repo.name.replace(/[-_]/g, " ")}
                </h3>
                <p className="text-[10px] sm:text-xs text-white/70 drop-shadow line-clamp-1 max-w-2xl">{repo.description || ""}</p>
              </div>
            </a>

            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap mt-2 sm:mt-3">
                <span className="flex items-center gap-1 text-[10px] sm:text-xs text-amber-400/80"><Star className="w-3 h-3" /> {repo.stargazers_count}</span>
                <span className="flex items-center gap-1 text-[10px] sm:text-xs text-text-secondary"><GitFork className="w-3 h-3" /> {repo.forks_count}</span>
                <span className="text-[10px] sm:text-xs text-text-secondary opacity-60">{timeAgo(repo.pushed_at)}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-white bg-purple-500/20 border border-purple-500/30 rounded-lg px-3 py-1.5 uppercase tracking-wider hover:bg-purple-500/30 transition-all cursor-pointer">
                  <ExternalLink className="w-3 h-3" /> Source
                </a>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold rounded-lg px-3 py-1.5 uppercase tracking-wider transition-all cursor-pointer"
                    style={{ color: langColor, backgroundColor: `${langColor}18`, border: `1px solid ${langColor}28` }}
                  >
                    <Globe className="w-3 h-3" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  const { repos, loading } = useGitHub();
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"stars" | "updated" | "name" | "forks">("stars");
  const [showSort, setShowSort] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const languages = useMemo(() => {
    const langs = new Set(repos.map((r) => r.language).filter(Boolean) as string[]);
    return ["All", ...Array.from(langs).sort()];
  }, [repos]);

  const processed = useMemo(() => {
    let list = [...repos];

    if (langFilter !== "All") {
      list = list.filter((r) => r.language === langFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description || "").toLowerCase().includes(q) ||
          (r.topics || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      switch (sortBy) {
        case "stars": return b.stargazers_count - a.stargazers_count;
        case "updated": return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
        case "name": return a.name.localeCompare(b.name);
        case "forks": return b.forks_count - a.forks_count;
        default: return 0;
      }
    });

    return list;
  }, [repos, langFilter, search, sortBy]);

  const [featured, ...rest] = processed;

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2 w-full text-left">
        <div className="glass-card p-6 sm:p-8 flex items-center justify-center min-h-[120px]">
          <div className="flex items-center gap-2.5 text-text-secondary">
            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs sm:text-sm font-semibold">Loading projects from GitHub...</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-2 w-full text-left">

      <motion.div variants={cardUp} className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
          <h2 className="font-display font-black text-sm sm:text-base lg:text-lg text-white">Projects</h2>
          <span className="text-[7px] sm:text-[8px] text-text-secondary font-mono bg-white/5 px-1.5 py-0.5 rounded-full border border-white/10">{processed.length}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <input type="text" placeholder="Search..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[90px] sm:w-[120px] bg-white/5 border border-white/10 rounded-lg py-1 px-2 text-[9px] sm:text-[10px] text-white placeholder:text-text-secondary/40 focus:outline-none focus:border-purple-500/40 transition-all"
          />

          <div className="relative">
            <button onClick={() => { setShowLang(!showLang); setShowSort(false); }}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] sm:text-[10px] text-text-secondary hover:text-white transition-all active:scale-90"
            >
              <Filter className="w-3 h-3" />
              <span className="hidden xs:inline">{langFilter === "All" ? "Lang" : langFilter}</span>
            </button>
            {showLang && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowLang(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 w-[130px] sm:w-[150px] bg-[#0d0924]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                  {languages.map((l) => (
                    <button key={l} onClick={() => { setLangFilter(l); setShowLang(false); }}
                      className={`w-full text-left px-3 py-1.5 text-[10px] sm:text-xs font-semibold transition-all hover:bg-white/5 ${
                        langFilter === l ? "text-purple-400 bg-purple-500/10" : "text-text-secondary"
                      }`}
                    >{l}</button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button onClick={() => { setShowSort(!showSort); setShowLang(false); }}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] sm:text-[10px] text-text-secondary hover:text-white transition-all active:scale-90"
            >
              <ArrowUpDown className="w-3 h-3" />
              <span className="hidden xs:inline">{sortOptions.find(o => o.value === sortBy)?.label}</span>
            </button>
            {showSort && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 w-[110px] sm:w-[130px] bg-[#0d0924]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                  {sortOptions.map((o) => (
                    <button key={o.value} onClick={() => { setSortBy(o.value); setShowSort(false); }}
                      className={`w-full text-left px-3 py-1.5 text-[10px] sm:text-xs font-semibold transition-all hover:bg-white/5 ${
                        sortBy === o.value ? "text-cyan-400 bg-cyan-500/10" : "text-text-secondary"
                      }`}
                    >{o.label}</button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {processed.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass-card p-8 sm:p-10 text-center flex flex-col items-center justify-center min-h-[120px] sm:min-h-[160px]"
          >
            <h4 className="font-display font-bold text-white text-sm sm:text-base">No projects match</h4>
            <p className="text-[11px] sm:text-xs text-text-secondary mt-1">Try adjusting filters or search term.</p>
          </motion.div>
        ) : (
          <motion.div key={`${langFilter}-${sortBy}-${search}`} variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-2 sm:gap-3">
            {featured && <FeaturedCard repo={featured} />}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
                {rest.map((repo) => (
                  <ProjectCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
