import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UI Showcase | Dev Tools',
  description: 'A showcase of all available UI components.',
};

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {children}
    </div>
  );
}