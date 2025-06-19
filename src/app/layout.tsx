import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import * as Tooltip from '@radix-ui/react-tooltip'; // ✅ Import Tooltip.Provider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlixOra',
  description: 'A modern anime detail page prototype.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Tooltip.Provider delayDuration={100}>
            {children}
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
