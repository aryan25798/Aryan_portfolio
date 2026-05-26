import { NextResponse } from "next/server";
import { fetchUser, fetchRepos, fetchLangStats, fetchTotalStars, fetchContributions } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const [user, repos, contributions] = await Promise.all([
      fetchUser(),
      fetchRepos(),
      fetchContributions(),
    ]);

    const langStats = fetchLangStats(repos);
    const totalStars = fetchTotalStars(repos);

    return NextResponse.json({
      user,
      repos,
      langStats,
      totalStars,
      contributions,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
