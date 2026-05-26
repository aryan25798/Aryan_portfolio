export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  homepage: string;
  languages: Record<string, number>;
}

export interface GithubLangStats {
  name: string;
  percentage: number;
  color: string;
  bytes: number;
}

export interface GithubContributions {
  totalContributions: number;
  weeks: { days: { count: number; level: number; date: string }[] }[];
}

const GITHUB_USERNAME = "aryan25798";
const GITHUB_API = "https://api.github.com";

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Rust: "#dea584",
  Go: "#00ADD8",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Scala: "#c22d40",
  Dart: "#00B4AB",
  Lua: "#000080",
  Haskell: "#5e5086",
  "Jupyter Notebook": "#DA5B0B",
};

async function fetchWithRetry(url: string, retries = 3): Promise<unknown> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      });
      if (res.status === 403) {
        const data = await res.json();
        if (data.message?.includes("API rate limit")) return null;
      }
      if (!res.ok) continue;
      return await res.json();
    } catch {
      if (i === retries - 1) return null;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  return null;
}

export async function fetchUser(): Promise<GithubUser | null> {
  const data = await fetchWithRetry(`${GITHUB_API}/users/${GITHUB_USERNAME}`);
  if (!data) return null;
  const d = data as Record<string, unknown>;
  return {
    login: d.login as string,
    avatar_url: d.avatar_url as string,
    html_url: d.html_url as string,
    name: d.name as string,
    bio: d.bio as string,
    public_repos: d.public_repos as number,
    followers: d.followers as number,
    following: d.following as number,
    total_stars: 0,
  };
}

export async function fetchRepos(): Promise<GithubRepo[]> {
  const data = (await fetchWithRetry(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
  )) as Record<string, unknown>[];

  if (!data || !Array.isArray(data)) return [];

  const batchSize = 30;
  const batch = data.slice(0, batchSize);

  const langResults = await Promise.all(
    batch.map((repo) =>
      fetchWithRetry(
        `${GITHUB_API}/repos/${GITHUB_USERNAME}/${(repo as Record<string, unknown>).name}/languages`
      )
    )
  );

  return batch.map((repo, i) => {
    const r = repo as Record<string, unknown>;
    const langData = langResults[i] as Record<string, number> | null;
    return {
      id: r.id as number,
      name: r.name as string,
      full_name: r.full_name as string,
      html_url: r.html_url as string,
      description: r.description as string,
      fork: r.fork as boolean,
      stargazers_count: r.stargazers_count as number,
      forks_count: r.forks_count as number,
      language: r.language as string,
      topics: (r.topics as string[]) || [],
      updated_at: r.updated_at as string,
      pushed_at: r.pushed_at as string,
      homepage: r.homepage as string,
      languages: langData || {},
    };
  });
}

export async function fetchLangStats(repos?: GithubRepo[]): Promise<GithubLangStats[]> {
  if (!repos) repos = await fetchRepos();
  const langTotals: Record<string, number> = {};
  let totalBytes = 0;

  for (const repo of repos) {
    for (const [lang, bytes] of Object.entries(repo.languages)) {
      langTotals[lang] = (langTotals[lang] || 0) + bytes;
      totalBytes += bytes;
    }
  }

  return Object.entries(langTotals)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 1000) / 10,
      color: LANG_COLORS[name] || "#8b5cf6",
      bytes,
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

export async function fetchTotalStars(repos?: GithubRepo[]): Promise<number> {
  if (!repos) repos = await fetchRepos();
  return repos.reduce((sum, r) => sum + r.stargazers_count, 0);
}

export async function fetchContributions(): Promise<GithubContributions | null> {
  try {
    const res = await fetch(
      `https://github.com/users/${GITHUB_USERNAME}/contributions`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const html = await res.text();

    const totalMatch = html.match(
      /(\d+)\s+total\s+contributions?\s+in\s+the\s+last\s+year/i
    );

    const totalContributions = totalMatch ? parseInt(totalMatch[1]) : 0;

    const rects: { count: number; level: number; date: string }[] = [];
    const rectRegex =
      /<rect[^>]*data-count="(\d+)"[^>]*data-level="(\d+)"[^>]*data-date="([^"]+)"/g;
    let match;
    while ((match = rectRegex.exec(html)) !== null) {
      rects.push({
        count: parseInt(match[1]),
        level: parseInt(match[2]),
        date: match[3],
      });
    }

    const weeks: { days: { count: number; level: number; date: string }[] }[] = [];
    for (let i = 0; i < rects.length; i += 7) {
      weeks.push({ days: rects.slice(i, i + 7) });
    }

    return { totalContributions, weeks };
  } catch {
    return null;
  }
}
