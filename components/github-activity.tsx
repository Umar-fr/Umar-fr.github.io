'use client';

import { Github } from 'lucide-react';
import { useEffect, useState } from 'react';

export function GitHubActivity() {
  const [contributionData, setContributionData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      const username = 'umar-fr';

      // Fetch user stats
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();

      // Fetch repositories for stats
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const reposData = await reposResponse.json();

      // Fetch all events (public activity)
      let allEvents = [];
      for (let page = 1; page <= 10; page++) {
        const response = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`
        );
        const events = await response.json();
        if (!Array.isArray(events) || events.length === 0) break;
        allEvents = [...allEvents, ...events];
      }

      // Process contribution data - count by date
      const contributionMap = {};
      const today = new Date();

      // Initialize past year with zeros
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        contributionMap[dateStr] = 0;
      }

      // Count actual contributions from events
      if (Array.isArray(allEvents)) {
        allEvents.forEach((event) => {
          const dateStr = event.created_at.split('T')[0];
          if (contributionMap.hasOwnProperty(dateStr)) {
            contributionMap[dateStr]++;
          }
        });
      }

      // Convert to array and sort by date
      const contributions = Object.entries(contributionMap)
        .map(([date, count]) => ({
          date,
          count: count,
          intensity: count === 0 ? 0 : Math.min(Math.floor(count / 2) + 1, 5),
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setContributionData(contributions);

      // Calculate total contributions
      const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

      // Set stats
      setStats({
        totalContributions: totalContributions,
        followers: userData.followers || 0,
        repositories: Array.isArray(reposData) ? reposData.length : userData.public_repos || 0,
        streak: calculateStreak(contributions),
      });

      setError(null);
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError('Failed to load GitHub data');
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = (contributions) => {
    let streak = 0;
    // Start from the end (today) and count backwards
    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getIntensityColor = (intensity) => {
    const colors = [
      'bg-gray-300 dark:bg-gray-700',
      'bg-green-300 dark:bg-green-900/60',
      'bg-green-400 dark:bg-green-800',
      'bg-green-500 dark:bg-green-700',
      'bg-green-600 dark:bg-green-600',
      'bg-green-700 dark:bg-green-500',
    ];
    return colors[Math.min(intensity, 5)] || colors[0];
  };

  // Organize contributions into weeks
  const weeks = [];
  for (let i = 0; i < contributionData.length; i += 7) {
    weeks.push(contributionData.slice(i, i + 7));
  }

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
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
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              GitHub Activity
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            My contribution history and development activity
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Total Contributions', value: stats.totalContributions },
              { label: 'Repositories', value: stats.repositories },
              { label: 'Followers', value: stats.followers },
              {
                label: 'Current Streak',
                value: stats.streak > 0 ? `${stats.streak} days` : '0 days',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Contribution Graph */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Last Year of Contributions
          </h3>

          {error ? (
            <p className="text-red-500 text-center py-8">{error}</p>
          ) : (
            <>
              <div className="overflow-x-auto pb-4">
                <div className="inline-flex gap-1">
                  {weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-1">
                      {week.map((day, dayIdx) => (
                        <div
                          key={`${weekIdx}-${dayIdx}`}
                          className={`w-4 h-4 rounded-sm cursor-pointer transition-all hover:scale-125 hover:shadow-lg ${getIntensityColor(
                            day.intensity
                          )}`}
                          title={`${day.date}: ${day.count} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-end gap-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Less</span>
                {[0, 1, 2, 3, 4, 5].map((intensity) => (
                  <div
                    key={intensity}
                    className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)}`}
                  />
                ))}
                <span className="text-gray-600 dark:text-gray-400">More</span>
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://github.com/umar-fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-semibold"
          >
            <Github className="w-5 h-5" />
            Visit My GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}