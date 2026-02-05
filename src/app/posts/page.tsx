import PostCard from '@/components/PostCard';
import { getPosts, PostMetadata } from '@/lib/api';

export const metadata = {
  title: 'Posts | Taylor Zhang',
  description: 'Articles and posts by Taylor Zhang',
};

export default async function PostsPage() {
  let posts: PostMetadata[] = [];
  let error: string | null = null;

  try {
    const response = await getPosts();
    posts = response.posts;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load posts';
    posts = [];
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Posts</h1>

      {error && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
          <p className="text-yellow-800 dark:text-yellow-200">
            Unable to load posts. {error}
          </p>
        </div>
      )}

      {posts.length === 0 && !error ? (
        <p className="text-gray-600 dark:text-gray-400">No posts yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
