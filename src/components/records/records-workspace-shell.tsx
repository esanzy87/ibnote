import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type RouteAnchor = {
  href: string;
  labelKey: string;
  value: 'records' | 'summary' | 'settings';
};

type RecordsWorkspaceShellProps = {
  active: RouteAnchor['value'];
};

const ROUTES: RouteAnchor[] = [
  { href: '/my/records', labelKey: 'tabRecords', value: 'records' },
  { href: '/my/summary', labelKey: 'tabSummary', value: 'summary' },
  { href: '/my/settings', labelKey: 'tabSettings', value: 'settings' },
];

export function RecordsWorkspaceShell({ active }: RecordsWorkspaceShellProps) {
  const t = useTranslations('summary');
  return (
    <header className="rounded-[1.75rem] border border-primary/10 bg-gradient-to-r from-white via-[#fff8f1] to-white px-5 py-4 shadow-[0_24px_60px_-40px_rgba(186,93,28,0.45)] sm:px-7 sm:py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">{t('workspaceTitle')}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">{t('workspaceHeading')}</h1>
        <nav className="flex flex-wrap gap-2">
          {ROUTES.map((route) => {
            const isActive = route.value === active;

            return (
              <Link
                key={route.href}
                href={route.href as any}
                className={
                  isActive
                    ? 'inline-flex items-center rounded-full border border-primary bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/20'
                    : 'inline-flex items-center rounded-full border border-primary/10 bg-background-light px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary/20 hover:text-slate-900'
                }
              >
                {t(route.labelKey)}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
