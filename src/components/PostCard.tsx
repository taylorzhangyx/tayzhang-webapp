import Link from 'next/link';
import type { PostMetadata } from '@/lib/api';

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
          {post.title}
        </h2>
      </Link>
      {post.description && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {post.description}
        </p>
      )}
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
        {formattedDate && <time dateTime={post.date!}>{formattedDate}</time>}
        {post.tags.length > 0 && (
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
