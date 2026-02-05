import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Taylor Zhang</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Software Engineer | Writer | Builder
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/posts"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Read Posts
          </Link>
          <Link
            href="/showcase"
            className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            View Showcase
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to my personal website. Here you&apos;ll find my articles, thoughts,
          and a showcase of small applications I&apos;ve built.
        </p>
      </section>
    </div>
  );
}
