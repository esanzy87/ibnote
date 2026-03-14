import type { Metadata } from 'next';
import Link from 'next/link';

import '@/styles/globals.css';
import '@/styles/print.css';

export const metadata: Metadata = {
  title: 'IBNote',
  description: '집에서 아이와 한 활동을 짧게 기록하고 다시 이어 보는 부모용 기록 서비스',
};

const NAV_ITEMS = [
  { href: '/', label: '홈' },
  { href: '/login', label: '로그인' },
  { href: '/templates', label: '템플릿' },
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
                  부모가 활동 기록을 쉽게 남기고 다시 볼 수 있는 서비스
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
                  내 기록 · 요약
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
