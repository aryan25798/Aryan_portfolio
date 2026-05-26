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

let cachedData: GitHubData | null = null;
let inflightPromise: Promise<GitHubData> | null = null;

export function useGitHub(): GitHubData {
  const [data, setData] = useState<GitHubData>(() => {
    if (cachedData) return cachedData;
    return {
      user: null,
      repos: [],
      langStats: [],
      totalStars: 0,
      contributions: null,
      loading: true,
      error: null,
    };
  });

  useEffect(() => {
    if (cachedData) return;

    async function fetchData() {
      if (inflightPromise) return inflightPromise;

      inflightPromise = (async () => {
        try {
          const res = await fetch("/api/github");
          if (!res.ok) throw new Error("Failed to fetch GitHub data");
          const json = await res.json();
          const result: GitHubData = {
            user: json.user,
            repos: json.repos || [],
            langStats: json.langStats || [],
            totalStars: json.totalStars || 0,
            contributions: json.contributions,
            loading: false,
            error: null,
          };
          cachedData = result;
          return result;
        } catch (err) {
          const result: GitHubData = {
            user: null,
            repos: [],
            langStats: [],
            totalStars: 0,
            contributions: null,
            loading: false,
            error: (err as Error).message,
          };
          cachedData = result;
          return result;
        } finally {
          inflightPromise = null;
        }
      })();

      return inflightPromise;
    }

    fetchData().then(setData);
  }, []);

  return data;
}
