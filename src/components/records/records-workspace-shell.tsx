import Link from 'next/link';

type RouteAnchor = {
  href: string;
  label: string;
  value: 'records' | 'summary' | 'settings';
};

type RecordsWorkspaceShellProps = {
  active: RouteAnchor['value'];
};

const ROUTES: RouteAnchor[] = [
  { href: '/my/records', label: '기록', value: 'records' },
  { href: '/my/summary', label: '요약', value: 'summary' },
  { href: '/my/settings', label: '설정', value: 'settings' },
];

export function RecordsWorkspaceShell({ active }: RecordsWorkspaceShellProps) {
  return (
    <header className="rounded-[1.75rem] border border-stone-200 bg-white px-5 py-4 shadow-sm sm:px-7 sm:py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">기록 워크스페이스</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">내 기록으로 이어가기</h1>
        <nav className="flex flex-wrap gap-2">
          {ROUTES.map((route) => {
            const isActive = route.value === active;

            return (
              <Link
                key={route.href}
                href={route.href}
                className={
                  isActive
                    ? 'inline-flex items-center rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white'
                    : 'inline-flex items-center rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-stone-300 hover:text-slate-900'
                }
              >
                {route.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
