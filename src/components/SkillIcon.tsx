"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

export default function SkillIcon({ slug, name, className = "w-full h-full" }: { slug: string; name: string; className?: string }) {
  const [useFallback, setUseFallback] = useState(false);
  const [err, setErr] = useState(false);

  if (err) {
    return <span className="text-[10px] sm:text-xs font-black text-white/80">{name[0]}</span>;
  }

  if (useFallback) {
    return (
      <img
        src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`}
        alt={name}
        className={`${className} brightness-0 invert`}
        loading="lazy"
        onError={() => setErr(true)}
      />
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/white`}
      alt={name}
      className={className}
      loading="lazy"
      onError={() => setUseFallback(true)}
    />
  );
}
