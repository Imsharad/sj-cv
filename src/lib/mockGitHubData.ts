export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
  stats: {
    commits: number;
    pullRequests: number;
    issues: number;
    reviews: number;
  };
}

/**
 * Simple mock generator (static deterministic for dev/reloading)
 */
export function generateMockGitHubData(): ContributionData {
  // 53 weeks x 7 days = up to 371 days (GitHub's heatmap is 1 year)
  // Use a static mock pattern instead of random for stable appearance.
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364);

  // "Activity curve": high in April, June, Nov; lower in summer, weekends.
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const activityByMonth = [0.7, 0.8, 1.0, 1.3, 1.2, 0.7, 0.6, 0.5, 0.9, 1.1, 1.4, 0.9];

  let totalContributions = 0;
  const weeks: ContributionWeek[] = [];
  let d = new Date(startDate);

  for (let w = 0; w < 53; w++) {
    const days: ContributionDay[] = [];
    for (let i = 0; i < 7; i++) {
      if (d > today) break;
      // rough realistic curve
      const monthIndex = d.getMonth();
      const dayOfWeek = d.getDay();
      let base = 0.4 + activityByMonth[monthIndex];
      if (dayOfWeek === 0 || dayOfWeek === 6) base *= 0.4;
      // pulse every ~month
      if ((w > 12 && w < 18) || (w > 36 && w < 40)) base *= 1.3;
      // clamp and map
      // Create several possible "levels"
      let count = Math.max(0, Math.round(base + (i + w) % 3 - 2));
      // Each block has between 0-8
      if (w % 8 === 3 && i % 2 === 0) count += 2;
      totalContributions += count;
      let level: 0|1|2|3|4 = 
        count === 0 ? 0 :
        count <=2 ? 1 :
        count <=4 ? 2 :
        count <=7 ? 3 : 4;

      days.push({
        date: d.toISOString().split("T")[0],
        count,
        level,
      });
      d.setDate(d.getDate() + 1);
    }
    if (days.length) weeks.push({ days });
  }

  // Simple static stats
  return {
    totalContributions,
    weeks,
    stats: {
      commits: Math.floor(totalContributions * 0.7),
      pullRequests: Math.floor(totalContributions * 0.15),
      issues: Math.floor(totalContributions * 0.12),
      reviews: Math.floor(totalContributions * 0.03),
    },
  };
}

