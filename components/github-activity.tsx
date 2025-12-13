'use client';

import { Github } from 'lucide-react';
import { useEffect, useState } from 'react';

/* ----------------------------- Types ----------------------------- */

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

/* --------------------------- Component ---------------------------- */

export function GitHubActivity() {
  const [contributionData, setContributionData] = useState<ContributionDay[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  /* ------------------------ Data Fetching ------------------------- */

  const fetchGitHubData = async (): Promise<void> => {
    try {
      setLoading(true);
      const username = 'umar-fr';

      // User stats
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData: GitHubUser = await userResponse.json();

      // Repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const reposData: unknown = await reposResponse.json();

      // Public events
      let allEvents: GitHubEvent[] = [];

      for (let page = 1; page <= 10; page++) {
        const response = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`
        );
        const events: GitHubEvent[] | unknown = await response.json();

        if (!Array.isArray(events) || events.length === 0) break;
        allEvents = allEvents.concat(events);
      }

      /* ------------------ Build contribution map ------------------ */

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

      setContributionData(contributions);

      const totalContributions = contributions.reduce(
        (sum, day) => sum + day.count,
        0
      );

      setStats({
        totalContributions,
        followers: userData.followers ?? 0,
        repositories: Array.isArray(reposData)
          ? reposData.length
          : userData.public_repos ?? 0,
        streak: calculateStreak(contributions),
      });

      setError(null);
    } catch (err: unknown) {
      console.error('Error fetching GitHub data:', err);
      setError('Failed to load GitHub data');
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------ Helpers ------------------------- */

  const calculateStreak = (contributions: ContributionDay[]): number => {
    let streak = 0;
    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) streak++;
      else break;
    }
    return streak;
  };

  const getIntensityColor = (intensity: number): string => {
    const colors: string[] = [
      'bg-gray-300 dark:bg-gray-700',
      'bg-green-300 dark:bg-green-900/60',
      'bg-green-400 dark:bg-green-800',
      'bg-green-500 dark:bg-green-700',
      'bg-green-600 dark:bg-green-600',
      'bg-green-700 dark:bg-green-500',
    ];
    return colors[Math.min(intensity, 5)];
  };

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributionData.length; i += 7) {
    weeks.push(contributionData.slice(i, i + 7));
  }

  /* -------------------------- UI --------------------------- */

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading GitHub data...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Github className="w-8 h-8" />
            <h2 className="text-4xl font-bold">GitHub Activity</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            My contribution history and development activity
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Total Contributions', value: stats.totalContributions },
              { label: 'Repositories', value: stats.repositories },
              { label: 'Followers', value: stats.followers },
              {
                label: 'Current Streak',
                value: `${stats.streak} days`,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border"
              >
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Graph */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
          {error ? (
            <p className="text-red-500 text-center py-8">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="inline-flex gap-1">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((day, di) => (
                      <div
                        key={`${wi}-${di}`}
                        className={`w-4 h-4 rounded-sm ${getIntensityColor(
                          day.intensity
                        )}`}
                        title={`${day.date}: ${day.count} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://github.com/umar-fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg"
          >
            <Github className="w-5 h-5" />
            Visit My GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
