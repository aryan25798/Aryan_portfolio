"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Star } from "lucide-react";
import TiltCard from "./TiltCard";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  stars: number;
  tags: string[];
}

const blogPosts: Post[] = [
  {
    id: 1,
    title: "Mastering Spring Boot & Distributed Microservices Architecture",
    excerpt: "An in-depth guide to building resilient, highly scalable backend architectures using Spring Boot, Apache Kafka, Redis Caching, and Docker containerization.",
    date: "May 18, 2026",
    readTime: "8 min read",
    category: "Backend",
    stars: 48,
    tags: ["Java", "Spring Boot", "Kafka", "Redis"],
  },
  {
    id: 2,
    title: "Deep Dive into Next.js 14 Server Actions & Hydration Optimization",
    excerpt: "Learn how to leverage React Server Components, server actions, and strategic data revalidation to achieve perfect Core Web Vitals on high-traffic websites.",
    date: "Apr 24, 2026",
    readTime: "6 min read",
    category: "Frontend",
    stars: 36,
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    id: 3,
    title: "Automating DevOps Pipelines: From Commit to Cloud with AWS & Docker",
    excerpt: "A step-by-step practical guide to architecting fully automated CI/CD deployment pipelines using GitHub Actions, Docker multi-stage builds, and AWS EC2/S3.",
    date: "Mar 12, 2026",
    readTime: "10 min read",
    category: "DevOps",
    stars: 52,
    tags: ["AWS", "Docker", "CI/CD", "DevOps"],
  },
  {
    id: 4,
    title: "Integrating AI Agents & Large Language Models in SaaS Architectures",
    excerpt: "Explore the patterns of integrating scalable LLM interfaces, vector databases like Pinecone, and real-time streams in enterprise-grade MERN platforms.",
    date: "Feb 05, 2026",
    readTime: "7 min read",
    category: "AI & SaaS",
    stars: 64,
    tags: ["Node.js", "MongoDB", "AI Agents", "LLMs"],
  },
];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Backend", "Frontend", "DevOps", "AI & SaaS"];

  const filtered = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCat = selectedCat === "All" || post.category === selectedCat;

    return matchesSearch && matchesCat;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      className="flex flex-col gap-6 sm:gap-8 w-full text-left pt-2 sm:pt-4"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
          <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-wide text-white">Articles & Insights</h2>
        </div>
        
        <div className="relative w-full sm:w-[250px] md:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 sm:py-2.5 pl-9 pr-4 text-xs sm:text-sm font-semibold text-white placeholder:text-text-secondary focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] focus:shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all"
          />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 border-b border-white/5 scrollbar-none -mx-2 sm:mx-0 px-2 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 touch-manipulation ${
              selectedCat === cat
                ? "bg-purple-500/15 border border-purple-500/40 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                : "bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, idx) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, delay: idx * 0.05 } }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <TiltCard intensity={4}>
                <div className="glass-card-glow p-4 sm:p-5 lg:p-7 flex flex-col justify-between min-h-[200px] sm:min-h-[260px] group h-full">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/15">
                        <Star className="w-3 h-3 fill-current" /> {post.stars}
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-sm sm:text-base lg:text-lg text-white group-hover:text-purple-400 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold text-text-secondary bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-1">
                      <div className="flex gap-2 sm:gap-3 text-[10px] text-text-secondary font-semibold">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                      
                      <span className="text-[10px] sm:text-xs font-bold text-purple-400 group-hover:text-white flex items-center gap-1 transition-all cursor-default">
                        Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <TiltCard intensity={3}>
          <div className="glass-card p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px]">
            <BookOpen className="w-8 h-8 text-text-secondary mb-3 animate-pulse" />
            <h4 className="font-display font-bold text-white text-sm sm:text-base">No articles found</h4>
            <p className="text-xs text-text-secondary mt-1">Try adjusting your search keywords or categories.</p>
          </div>
        </TiltCard>
      )}
    </motion.div>
  );
}
