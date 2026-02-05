import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/api';

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

  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          {post.author && <span>By {post.author}</span>}
          {formattedDate && <time dateTime={post.date!}>{formattedDate}</time>}
        </div>
        {post.tags.length > 0 && (
          <div className="flex gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html_content }}
      />
    </article>
  );
}
