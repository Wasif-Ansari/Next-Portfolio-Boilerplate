import { NextRequest, NextResponse } from 'next/server';
import { gatherAllGitHubProjects } from '@/lib/github';

export const revalidate = 3600; // 1h cache

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username') || process.env.GITHUB_USERNAME || '';
  if (!username) return NextResponse.json({ error: 'username required' }, { status: 400 });
  try {
    const projects = await gatherAllGitHubProjects(username);
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch full project list' }, { status: 500 });
  }
}