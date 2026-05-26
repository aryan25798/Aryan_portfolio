"use client";

import { useState, useEffect } from "react";
import type { GithubRepo, GithubLangStats, GithubContributions, GithubUser } from "./github";

interface GitHubData {
  user: GithubUser | null;
  repos: GithubRepo[];
  langStats: GithubLangStats[];
  totalStars: number;
  contributions: GithubContributions | null;
  loading: boolean;
  error: string | null;
}

export function useGitHub(): GitHubData {
  const [data, setData] = useState<GitHubData>({
    user: null,
    repos: [],
    langStats: [],
    totalStars: 0,
    contributions: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch GitHub data");
        const json = await res.json();
        setData({
          user: json.user,
          repos: json.repos || [],
          langStats: json.langStats || [],
          totalStars: json.totalStars || 0,
          contributions: json.contributions,
          loading: false,
          error: null,
        });
      } catch (err) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: (err as Error).message,
        }));
      }
    }
    fetchData();
  }, []);

  return data;
}
