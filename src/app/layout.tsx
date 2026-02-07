import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Taylor Zhang',
  description: 'Backend engineer writing about production systems, practical AI/agents, and long-term engineering growth.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-bg text-foreground">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
