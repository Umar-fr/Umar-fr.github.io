import { NextResponse } from 'next/server';

type ContributionDay = {
  date: string;
  count: number;
  intensity: number;
};

type GitHubStats = {
  totalContributions: number;
  followers: number;
  repositories: number;
  streak: number;
};

type GitHubEvent = {
  created_at: string;
};

type GitHubUser = {
  followers: number;
  public_repos: number;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
    ]);

    if (!userResponse.ok) {
        throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
    }
    const userData: GitHubUser = await userResponse.json();

    if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repositories: ${reposResponse.statusText}`);
    }
    const reposData: unknown = await reposResponse.json();

    let allEvents: GitHubEvent[] = [];
    for (let page = 1; page <= 10; page++) {
      const response = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch events page ${page}: ${response.statusText}`);
      }
      const events: GitHubEvent[] | unknown = await response.json();
      if (!Array.isArray(events) || events.length === 0) {
        break;
      }
      allEvents = allEvents.concat(events);
    }

    const contributionMap: Record<string, number> = {};
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const key = date.toISOString().split('T')[0];
      contributionMap[key] = 0;
    }

    allEvents.forEach((event) => {
      const dateKey = event.created_at.split('T')[0];
      if (dateKey in contributionMap) {
        contributionMap[dateKey]++;
      }
    });

    const contributions: ContributionDay[] = Object.entries(contributionMap)
      .map(([date, count]) => ({
        date,
        count,
        intensity: count === 0 ? 0 : Math.min(Math.floor(count / 2) + 1, 5),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const totalContributions = contributions.reduce(
      (sum, day) => sum + day.count,
      0
    );

    const calculateStreak = (contributions: ContributionDay[]): number => {
        let streak = 0;
        for (let i = contributions.length - 1; i >= 0; i--) {
          if (contributions[i].count > 0) streak++;
          else break;
        }
        return streak;
    };

    const stats: GitHubStats = {
      totalContributions,
      followers: userData.followers ?? 0,
      repositories: Array.isArray(reposData)
        ? reposData.length
        : userData.public_repos ?? 0,
      streak: calculateStreak(contributions),
    };

    return NextResponse.json({ contributions, stats });

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to load GitHub data', details: errorMessage }, { status: 500 });
  }
}
