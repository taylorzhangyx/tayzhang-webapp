import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Taylor Zhang
        </Link>
        <div className="flex gap-6">
          <Link
            href="/posts"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Posts
          </Link>
          <Link
            href="/showcase"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Showcase
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
