import { NextRequest, NextResponse } from "next/server";

// ------ INSTRUCTION ------
/*
  IMPORTANT: Add your GitHub Personal Access Token (with read:user access) to .env.local:
  GITHUB_TOKEN=ghp_xxx...

  Never commit this file with the real token!
*/

const GITHUB_API = "https://api.github.com/graphql";

function getLevelFromContributionLevel(level: string): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case "NONE": return 0;
    case "FIRST_QUARTILE": return 1;
    case "SECOND_QUARTILE": return 2;
    case "THIRD_QUARTILE": return 3;
    case "FOURTH_QUARTILE": return 4;
    default: return 0;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "sharadjain"; // Default

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Missing GITHUB_TOKEN env variable on server." }, { status: 500 });
  }

  // GraphQL query from mock shape
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
          commitContributionsByRepository {
            contributions { totalCount }
          }
          pullRequestContributionsByRepository {
            contributions { totalCount }
          }
          issueContributionsByRepository {
            contributions { totalCount }
          }
          pullRequestReviewContributionsByRepository {
            contributions { totalCount }
          }
        }
      }
    }`;

  try {
    const response = await fetch(GITHUB_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 }, // Optionally cache for 1 hour
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: "GitHub API error", detail: text }, { status: 500 });
    }

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json({ error: "GitHub API GraphQL error", detail: data.errors }, { status: 502 });
    }

    const c = data.data.user.contributionsCollection;
    // Map to your expected shape
    const totalContributions = c.contributionCalendar.totalContributions;
    const weeks = c.contributionCalendar.weeks.map((week: any) => ({
      days: week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level: getLevelFromContributionLevel(day.contributionLevel),
      })),
    }));

    // Compute stats
    const commits = (c.commitContributionsByRepository || []).reduce(
      (acc: number, repo: any) => acc + (repo.contributions?.totalCount || 0), 0);
    const pullRequests = (c.pullRequestContributionsByRepository || []).reduce(
      (acc: number, repo: any) => acc + (repo.contributions?.totalCount || 0), 0);
    const issues = (c.issueContributionsByRepository || []).reduce(
      (acc: number, repo: any) => acc + (repo.contributions?.totalCount || 0), 0);
    const reviews = (c.pullRequestReviewContributionsByRepository || []).reduce(
      (acc: number, repo: any) => acc + (repo.contributions?.totalCount || 0), 0);

    return NextResponse.json({
      totalContributions,
      weeks,
      stats: {
        commits,
        pullRequests,
        issues,
        reviews
      }
    });
  } catch (error: any) {
    // Rate limiting etc.
    console.error("GitHub contributions API error:", error);
    return NextResponse.json({ error: "Server error", detail: error?.message || error.toString() }, { status: 500 });
  }
}

