import Link from 'next/link';
import { getPosts, PostMetadata } from '@/lib/api';
import PostCard from '@/components/PostCard';

const featuredSlugs = [
  '2023-04-25-mlops-series-2-challenges-solutions',
  '2023-04-18-mlops-series-1-origin-what-why',
  '2022-12-19-performance-optimization-toolbox',
];

export default async function Home() {
  let featuredPosts: PostMetadata[] = [];

  try {
    const response = await getPosts();
    featuredPosts = response.posts.filter((post) =>
      featuredSlugs.includes(post.slug)
    );
  } catch {
    // Silently fail - featured posts are optional on home page
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-12 animate-fade-in">
        <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
          Taylor Zhang
        </h1>
        <p className="text-xl md:text-2xl text-muted mb-6 max-w-2xl leading-relaxed">
          Backend engineer building production systems and practical AI applications.
        </p>
        <ul className="text-muted mb-10 space-y-2">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
            8+ years shipping reliable systems at scale
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
            Building AI agents that actually work in production
          </li>
        </ul>
        <div className="flex gap-4 flex-wrap">
          <Link
            href="/writing"
            className="bg-accent text-white px-6 py-3 rounded-md hover:bg-accent-hover transition-colors duration-fast font-medium"
          >
            Read Writing
          </Link>
          <Link
            href="/showcase"
            className="border border-border px-6 py-3 rounded-md hover:border-accent hover:text-accent transition-colors duration-fast"
          >
            View Showcase
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mt-10 pt-8 border-t border-border-light">
          <a
            href="https://github.com/taylorzhangyx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-fast"
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
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-fast"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </section>

      {/* Featured Writing */}
      {featuredPosts.length > 0 && (
        <section className="animate-fade-in stagger-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-semibold">Featured Writing</h2>
            <Link
              href="/writing"
              className="text-accent hover:text-accent-hover transition-colors duration-fast text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {featuredPosts.map((post, index) => (
              <div key={post.slug} className={`animate-fade-in stagger-${index + 3}`}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
