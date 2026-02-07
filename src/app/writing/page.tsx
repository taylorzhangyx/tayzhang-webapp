import { getPosts, getTags, PostMetadata } from '@/lib/api';
import WritingClient from './WritingClient';

export const metadata = {
  title: 'Writing | Taylor Zhang',
  description: 'Articles about backend engineering, practical AI systems, and career growth.',
};

export default async function WritingPage() {
  let posts: PostMetadata[] = [];
  let tags: string[] = [];
  let error: string | null = null;

  try {
    const [postsResponse, tagsResponse] = await Promise.all([
      getPosts(),
      getTags(),
    ]);
    posts = postsResponse.posts;
    tags = tagsResponse.tags;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load posts';
    posts = [];
    tags = [];
  }

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-4xl font-semibold mb-3 tracking-tight">Writing</h1>
      <p className="text-muted mb-10 text-lg">
        Thoughts on backend engineering, practical AI/agents, and long-term growth.
      </p>

      {error && (
        <div className="bg-accent-light border border-accent/20 rounded-md p-4 mb-8">
          <p className="text-accent">
            Unable to load posts. {error}
          </p>
        </div>
      )}

      <WritingClient initialPosts={posts} allTags={tags} />
    </div>
  );
}
