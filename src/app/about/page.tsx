export const metadata = {
  title: 'About | Taylor Zhang',
  description: 'Backend engineer at Booking.com. Writing about production systems, practical AI/agents, and long-term engineering growth.',
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About</h1>

      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          I&apos;m Taylor Zhang, a creator, explorer and adventure.
        </p>

        <p>
          I&apos;ve spent the last eight years building and running production systems
          across different environments: a Silicon Valley startup, large internet
          companies, and a global tech organization. My background is in backend and
          system design, with a strong bias toward reliability, trade-offs, and
          long-term maintainability.
        </p>

        <p>
          Lately, my focus has been on <strong>AI-powered applications</strong>—not
          model research, but how agents, RAG systems, evaluation, and workflows
          actually work in production under real constraints like cost, latency, and
          failure modes.
        </p>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <h2 className="text-2xl font-semibold">This blog is where I think in public.</h2>

        <p>
          I write about backend engineering, practical AI systems, and career
          decisions from the perspective of an individual contributor who cares about
          depth, leverage, and sustainable growth.
        </p>

        <p className="text-gray-600 dark:text-gray-400 italic">
          I don&apos;t write to chase trends. I write to clarify thinking and share
          things that hold up in practice.
        </p>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">TL;DR</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>AI & Software engineer</li>
            <li>Writing about production systems, practical AI/agents, and long-term engineering growth</li>
            <li>Less hype, more things that actually work</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
