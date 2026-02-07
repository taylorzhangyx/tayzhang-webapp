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
    <Link href={`/writing/${post.slug}`} className="block">
      <article className="group cursor-pointer py-8 border-b border-border">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-baseline">
          <div className="w-32 shrink-0 font-mono text-xs text-accent font-medium uppercase tracking-wide">
            {formattedDate && <time dateTime={post.date!}>{formattedDate}</time>}
            {post.reading_time_minutes && (
              <span className="md:block md:mt-1"> · {post.reading_time_minutes} min</span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-2 group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            {post.description && (
              <p className="font-sans text-muted text-lg leading-relaxed mb-3 max-w-prose line-clamp-2">
                {post.description}
              </p>
            )}
            {post.tags.length > 0 && (
              <div className="flex gap-2 mb-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-surface border border-border rounded-md text-muted font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
              Read article <span>→</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
