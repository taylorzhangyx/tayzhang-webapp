'use client';

import { useState, useMemo } from 'react';
import PostCard from '@/components/PostCard';
import type { PostMetadata } from '@/lib/api';

interface WritingClientProps {
  initialPosts: PostMetadata[];
  allTags: string[];
}

export default function WritingClient({ initialPosts, allTags }: WritingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let posts = initialPosts;

    // Filter by tag
    if (selectedTag) {
      posts = posts.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const terms = searchQuery.toLowerCase().split(/\s+/);
      posts = posts.filter((post) => {
        const searchable = `${post.title} ${post.description || ''} ${post.tags.join(' ')}`.toLowerCase();
        return terms.every((term) => searchable.includes(term));
      });
    }

    return posts;
  }, [initialPosts, searchQuery, selectedTag]);

  const startHereSlugs = [
    '2023-04-25-mlops-series-2-challenges-solutions',
    '2023-04-18-mlops-series-1-origin-what-why',
    '2022-12-19-performance-optimization-toolbox',
  ];

  const startHerePosts = initialPosts.filter((post) =>
    startHereSlugs.includes(post.slug)
  );

  const showStartHere = !searchQuery && !selectedTag;
  const noResults = filteredPosts.length === 0 && (searchQuery || selectedTag);

  return (
    <div>
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-md
                     bg-surface focus:outline-none focus:ring-2
                     focus:ring-accent/50 focus:border-accent transition-all duration-fast"
        />
      </div>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-fast ${
              !selectedTag
                ? 'bg-accent text-white'
                : 'bg-surface border border-border hover:border-accent hover:text-accent'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-fast ${
                selectedTag === tag
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border hover:border-accent hover:text-accent'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Start Here Section */}
      {showStartHere && startHerePosts.length > 0 && (
        <section className="mb-14">
          <h2 className="font-display text-xl font-semibold mb-5 text-foreground">
            Start Here
          </h2>
          <div className="space-y-4">
            {startHerePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* All Posts / Filtered Results */}
      <section>
        <h2 className="font-display text-xl font-semibold mb-5 text-foreground">
          {searchQuery || selectedTag ? 'Results' : 'All Writing'}
        </h2>

        {noResults ? (
          <div className="text-center py-16">
            <p className="text-muted mb-8">
              No posts found matching your criteria.
            </p>
            {startHerePosts.length > 0 && (
              <div>
                <p className="text-sm text-subtle mb-6">
                  Try these popular posts instead:
                </p>
                <div className="space-y-4">
                  {startHerePosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
