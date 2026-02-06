'use client';

import { useState, useEffect, useMemo } from 'react';
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
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg
                     bg-white dark:bg-gray-900 focus:outline-none focus:ring-2
                     focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              !selectedTag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Start Here Section */}
      {showStartHere && startHerePosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
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
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {searchQuery || selectedTag ? 'Results' : 'All Writing'}
        </h2>

        {noResults ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No posts found matching your criteria.
            </p>
            {startHerePosts.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
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
