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
    <div>
      <h1 className="text-3xl font-bold mb-2">Writing</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Thoughts on backend engineering, practical AI/agents, and long-term growth.
      </p>

      {error && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
          <p className="text-yellow-800 dark:text-yellow-200">
            Unable to load posts. {error}
          </p>
        </div>
      )}

      <WritingClient initialPosts={posts} allTags={tags} />
    </div>
  );
}
