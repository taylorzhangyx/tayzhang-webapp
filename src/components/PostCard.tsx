import Link from 'next/link';
import type { PostMetadata } from '@/lib/api';

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <article className="group bg-surface border border-border rounded-md p-6 hover:shadow-md hover:border-accent/30 transition-all duration-base">
      <Link href={`/writing/${post.slug}`} className="block">
        <h2 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-fast">
          {post.title}
        </h2>
      </Link>
      {post.description && (
        <p className="text-muted mb-4 line-clamp-2">
          {post.description}
        </p>
      )}
      <div className="flex items-center flex-wrap gap-3 text-sm text-subtle">
        {formattedDate && <time dateTime={post.date!}>{formattedDate}</time>}
        {post.reading_time_minutes && (
          <>
            <span className="text-border">·</span>
            <span>{post.reading_time_minutes} min read</span>
          </>
        )}
        {post.tags.length > 0 && (
          <>
            <span className="text-border">·</span>
            <div className="flex gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-accent-light text-accent px-2 py-0.5 rounded-sm text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}
