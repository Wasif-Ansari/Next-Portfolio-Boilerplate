import { NextRequest, NextResponse } from 'next/server';
import { gatherGitHubProjects } from '@/lib/github';

export const revalidate = 3600; // cache for 1h

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username') || process.env.GITHUB_USERNAME || '';
  if (!username) return NextResponse.json({ error: 'username required' }, { status: 400 });
  try {
    const projects = await gatherGitHubProjects(username);
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
