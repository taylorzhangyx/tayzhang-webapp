export const metadata = {
  title: 'Showcase | Taylor Zhang',
  description: 'App showcase - small applications and tools',
};

interface App {
  id: string;
  name: string;
  description: string;
  status: 'live' | 'coming-soon';
}

const apps: App[] = [
  {
    id: 'coming-soon',
    name: 'More Apps Coming Soon',
    description: 'Stay tuned for AI tools, note-taking apps, and more.',
    status: 'coming-soon',
  },
];

export default function ShowcasePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">App Showcase</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Small applications and tools I&apos;ve built.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {apps.map((app) => (
          <div
            key={app.id}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">{app.name}</h2>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  app.status === 'live'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                {app.status === 'live' ? 'Live' : 'Coming Soon'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
