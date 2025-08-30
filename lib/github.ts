export interface GitHubProjectRaw {
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  language?: string | null;
  topics?: string[];
  stargazers_count?: number;
}

export interface GitHubProject {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  repo: string;
  demo?: string;
  stars?: number;
  source: 'pinned' | 'recent' | 'starred' | 'all';
}

const GITHUB_API = 'https://api.github.com';

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
  return res.json();
}

// Fallback REST fetch (recent repos)
export async function fetchRecentRepos(username: string, limit = 6): Promise<GitHubProject[]> {
  const data: GitHubProjectRaw[] = await fetchJSON(`${GITHUB_API}/users/${username}/repos?per_page=${limit}&sort=updated`);
  return data.map(r => ({
    slug: r.name.toLowerCase(),
    title: r.name,
    description: r.description || 'No description provided.',
    tech: r.topics && r.topics.length ? r.topics.slice(0, 6) : (r.language ? [r.language] : []),
    repo: r.html_url,
    demo: r.homepage || undefined,
    stars: r.stargazers_count,
    source: 'recent',
  }));
}

// Fetch up to 100 repos (all public) and return a richer mapped structure, filtering out clearly trivial ones
export async function fetchAllRepos(username: string, max = 100): Promise<GitHubProject[]> {
  const data: GitHubProjectRaw[] = await fetchJSON(`${GITHUB_API}/users/${username}/repos?per_page=${Math.min(max,100)}&sort=updated`);
  // Heuristic: "fully developed" -> has description length > 12 OR size > 30 (approx) to avoid tiny throwaway repos
  return data
    .filter(r => (r.description && r.description.trim().length > 12) || (r as any).size > 30)
    .map(r => ({
      slug: r.name.toLowerCase(),
      title: r.name,
      description: r.description || 'No description provided.',
      tech: r.topics && r.topics.length ? r.topics.slice(0, 8) : (r.language ? [r.language] : []),
      repo: r.html_url,
      demo: r.homepage || undefined,
      stars: r.stargazers_count,
      source: 'all' as const,
    }))
    .sort((a, b) => (b.stars || 0) - (a.stars || 0));
}

// GraphQL pinned repos (requires token)
export async function fetchPinnedRepos(username: string, token: string): Promise<GitHubProject[]> {
  const query = `query($login: String!) { user(login: $login) { pinnedItems(first:6, types: REPOSITORY) { nodes { ... on Repository { name description url homepageUrl primaryLanguage { name } repositoryTopics(first:6){ nodes { topic { name } } } stargazerCount } } } } }`;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query, variables: { login: username } }),
  });
  if (!res.ok) throw new Error('GitHub GraphQL error');
  const json = await res.json();
  const nodes = json.data?.user?.pinnedItems?.nodes || [];
  return nodes.map((n: any) => ({
    slug: n.name.toLowerCase(),
    title: n.name,
    description: n.description || 'No description provided.',
    tech: [
      ...(n.repositoryTopics?.nodes?.map((t: any) => t.topic.name) || []),
      ...(n.primaryLanguage?.name ? [n.primaryLanguage.name] : []),
    ].filter(Boolean).slice(0, 6),
    repo: n.url,
    demo: n.homepageUrl || undefined,
    stars: n.stargazerCount,
    source: 'pinned',
  }));
}

export async function gatherGitHubProjects(username: string): Promise<GitHubProject[]> {
  if (!username) return [];
  const token = process.env.GITHUB_TOKEN;
  try {
    if (token) {
      const pinned = await fetchPinnedRepos(username, token);
      if (pinned.length) return pinned;
    }
  } catch {
    // ignore pinned error, fallback to recent
  }
  return fetchRecentRepos(username);
}

export async function gatherAllGitHubProjects(username: string): Promise<GitHubProject[]> {
  if (!username) return [];
  return fetchAllRepos(username);
}
