import type { Metadata } from 'next';
import Link from 'next/link';

import '@/styles/globals.css';
import '@/styles/print.css';

export const metadata: Metadata = {
  title: 'IBNote',
  description: 'IBNote bootstrap MVP',
};

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/login', label: 'Login' },
  { href: '/templates', label: 'Templates' },
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-stone-100 text-slate-800 antialiased">
        <div className="min-h-screen">
          <header className="print-hidden border-b border-stone-200 bg-stone-50/90 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href="/"
                  className="text-lg font-semibold tracking-tight text-slate-900 transition hover:text-slate-700"
                >
                  IBNote
                </Link>
                <p className="mt-1 text-sm text-slate-600">
                  Parent-friendly worksheet and record MVP.
                </p>
              </div>

              <nav
                aria-label="Primary"
                className="flex flex-wrap items-center gap-2 text-sm text-slate-600"
              >
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-stone-300 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                ))}
                <span className="rounded-full border border-dashed border-stone-300 px-3 py-1.5 text-slate-500">
                  My pages soon
                </span>
              </nav>
            </div>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
