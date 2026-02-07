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
    <div className="animate-fade-in">
      <h1 className="font-display text-4xl font-semibold mb-3 tracking-tight">App Showcase</h1>
      <p className="text-muted mb-10 text-lg">
        Small applications and tools I&apos;ve built.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-surface border border-border rounded-md p-6 hover:shadow-md hover:border-accent/30 transition-all duration-base"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl font-semibold">{app.name}</h2>
              <span
                className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                  app.status === 'live'
                    ? 'bg-accent-light text-accent'
                    : 'bg-border-light text-subtle'
                }`}
              >
                {app.status === 'live' ? 'Live' : 'Coming Soon'}
              </span>
            </div>
            <p className="text-muted">{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
