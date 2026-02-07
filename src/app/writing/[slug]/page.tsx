import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPost, getPosts, getRelatedPosts, PostMetadata } from '@/lib/api';
import PostCard from '@/components/PostCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return {
      title: `${post.title} | Taylor Zhang`,
      description: post.description || undefined,
    };
  } catch {
    return {
      title: 'Post Not Found | Taylor Zhang',
    };
  }
}

export async function generateStaticParams() {
  try {
    const response = await getPosts();
    return response.posts.map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  let post;
  let relatedPosts: PostMetadata[] = [];

  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  try {
    const relatedResponse = await getRelatedPosts(slug, 3);
    relatedPosts = relatedResponse.posts;
  } catch {
    // Silently fail - related posts are optional
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article className="max-w-3xl mx-auto animate-fade-in">
      <header className="mb-10 max-w-2xl mx-auto">
        <div className="flex gap-3 mb-4 font-mono text-xs font-medium text-accent uppercase tracking-wider">
          {formattedDate && <time dateTime={post.date!}>{formattedDate}</time>}
          {post.reading_time_minutes && (
            <>
              <span>·</span>
              <span>{post.reading_time_minutes} min read</span>
            </>
          )}
          {post.author && (
            <>
              <span>·</span>
              <span>{post.author}</span>
            </>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-[1.1] mb-6">
          {post.title}
        </h1>

        {post.tags.length > 0 && (
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/writing?tag=${encodeURIComponent(tag)}`}
                className="text-xs px-2 py-1 bg-surface border border-border rounded-md text-muted font-sans
                         hover:border-accent hover:text-accent transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html_content }}
      />

      {/* Follow CTA */}
      <div className="mt-14 p-8 bg-surface border border-border rounded-lg">
        <h3 className="font-serif text-xl font-semibold mb-2">Enjoyed this post?</h3>
        <p className="text-muted mb-6">
          Follow me for more content on backend engineering and practical AI.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/taylorzhangyx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-contrast text-bg
                     rounded-md hover:opacity-90 transition-opacity duration-fast font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/yxzh/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white
                     rounded-md hover:bg-accent-hover transition-colors duration-fast font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold mb-6">Related Posts</h2>
          <div className="space-y-4">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
