"use client";
import React from "react";
import { generateMockGitHubData, ContributionData } from "@/lib/mockGitHubData";
import { GitCommit, GitPullRequest, GitBranch, AlertCircle } from "lucide-react"; // Assuming AlertCircle for Issues/Reviews if needed, or adjust
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// Tailwind color scale for heatmap levels (GitHub style) - updated darker shades and green tint for level 0
const heatmapLevelColors = [
  "bg-green-50",      // 0: none (slight green tint)
  "bg-green-200",     // 1: low
  "bg-green-400",     // 2: mid
  "bg-green-600",     // 3: high
  "bg-green-800",     // 4: top
];

interface GitHubHeatmapProps {
  username?: string;
}

export default function GitHubHeatmap({ username = "Imsharad" }: GitHubHeatmapProps) {
  const [data, setData] = React.useState<ContributionData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    fetch(`/api/github-contributions?username=${encodeURIComponent(username)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((json) => {
        if (!ignore) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError("Failed to load live GitHub data. Showing mock.");
          setData(generateMockGitHubData());
          setLoading(false);
        }
      });
    return () => { ignore = true; };
  }, [username]);
  const months: string[] = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Only show weekday labels on Y axis: Mon, Wed, Fri
  const weekdayLabels = ["Mon", "Wed", "Fri"];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="border rounded-lg overflow-x-auto max-w-full select-none bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">GitHub Contributions</h2>
          <p className="text-sm text-gray-500">Loading activity...</p>
        </div>
        <div className="p-4">
          <div className="h-28 flex items-center justify-center text-muted-foreground">Loading heatmap…</div>
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="border rounded-lg overflow-x-auto max-w-full select-none bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">GitHub Contributions</h2>
          <p className="text-sm text-gray-500">Error</p>
        </div>
        <div className="p-4">
          <div className="h-24 text-red-600">Could not generate activity heatmap data.</div>
        </div>
      </div>
    );
  }

  // Now safe: only access data after null-check
  const numWeeks = data.weeks.length;
  return (
    <div className="border rounded-lg overflow-x-auto max-w-full select-none bg-gradient-radial from-gray-50 to-white shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">GitHub Contributions</h2>
        <p className="text-sm text-gray-500">
          {data.totalContributions} contributions in the last year
        </p>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Month labels - OG style - Show only alternate months */}
            <div className="flex mb-1">
              {months.map((month, i) => (
                <div
                  key={i}
                  // Use the OG width calculation for better alignment
                  style={{ width: i === 0 ? "20px" : `calc((100% - 20px) / ${months.length - 1})` }}
                  // Only render label for index 0 (spacer) and odd indices (Jan, Mar, etc.)
                  className={`text-xs text-gray-500 ${i > 0 && i % 2 === 0 ? 'invisible' : ''}`}
                >
                  {month}
                </div>
              ))}
            </div>

            {/* Main grid */}
            <div className="flex">
              {/* Y-axis labels - Removed */}
              {/* <div className="flex flex-col justify-between h-[120px] mr-2">
                {weekdayLabels.map((day, i) => (
                  <div key={i} className="text-xs text-gray-500 h-5 flex items-center"> {/* Match OG: text-xs, h-5 */}
              {/*      {day}
                  </div>
                ))}
              </div> */}
              {/* Weeks grid - OG style */}
              {/* Use grid-cols-53 from globals.css, gap-1, h-[120px] */}
              <div className="flex-1 grid grid-cols-53 gap-1 h-[120px]">
                {data.weeks.flatMap((week, weekIdx) =>
                  week.days.map((day, dayIdx) => (
                    <div key={`${weekIdx}-${dayIdx}`} className="w-3 h-3 rounded-sm">
                      <div
                        className={`w-3 h-3 rounded-sm ${heatmapLevelColors[day.level] || "bg-gray-100"}`}
                        style={{ gridRow: dayIdx + 1 }} // Directly set grid row based on day index (0-6 -> 1-7)
                        aria-label={`${day.count} contributions on ${formatDate(day.date)}`}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Legend & stats - OG style */}
            <div className="flex justify-between mt-4 flex-wrap gap-x-4 gap-y-2"> {/* mt-4, gap-x-4 */}
              {/* Stats with Icons - OG Style */}
              <div className="flex items-center gap-1">
                <GitCommit className="h-4 w-4 text-green-600" /> {/* Icon + Color */}
                <span className="text-sm font-medium">{data.stats.commits}</span>
                <span className="text-sm text-gray-500">commits</span>
              </div>
              <div className="flex items-center gap-1">
                <GitPullRequest className="h-4 w-4 text-blue-600" /> {/* Icon + Color */}
                <span className="text-sm font-medium">{data.stats.pullRequests}</span>
                <span className="text-sm text-gray-500">pull requests</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-yellow-600" /> {/* Icon + Color (Using AlertCircle for Issues) */}
                <span className="text-sm font-medium">{data.stats.issues}</span>
                <span className="text-sm text-gray-500">issues</span>
              </div>
              <div className="flex items-center gap-1">
                <GitBranch className="h-4 w-4 text-purple-600" /> {/* Icon + Color (Using GitBranch for Reviews, adjust if needed) */}
                <span className="text-sm font-medium">{data.stats.reviews}</span>
                <span className="text-sm text-gray-500">reviews</span>
              </div>

              {/* Mini color legend */}
              <div className="flex items-center gap-1 text-xs self-center ml-auto"> {/* Align legend right */}
                Less
                {heatmapLevelColors.map((cls, i) => (
                  <span key={i} className={`inline-block h-3 w-3 mx-0.5 rounded-sm border ${cls}`} />
                ))}
                More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
