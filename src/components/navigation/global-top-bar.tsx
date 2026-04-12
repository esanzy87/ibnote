import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';

type GlobalSection = 'home' | 'templates' | 'workspace';

type TopBarAction = {
  href: any; // Using any for flexible routing hrefs
  icon: string;
  label: string; // Will pass translation key or translated string
  tone?: 'primary' | 'secondary';
};

type GlobalTopBarProps = {
  active: GlobalSection;
  action?: TopBarAction;
  variant?: 'public' | 'workspace';
};

function getActionClassName(tone: TopBarAction['tone']) {
  if (tone === 'secondary') {
    return 'items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/35 hover:bg-primary/5';
  }

  return 'items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90';
}

export function GlobalTopBar({
  active,
  action,
  variant = 'public',
}: GlobalTopBarProps) {
  const t = useTranslations('common');

  const NAV_LINKS = [
    { href: '/', label: t('home'), value: 'home' },
    { href: '/templates', label: t('templateExplore'), value: 'templates' },
    { href: '/my/records', label: t('myRecords'), value: 'workspace' },
  ];

  const activeLinkClassName =
    variant === 'workspace'
      ? 'inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary'
      : 'inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary';

  const inactiveLinkClassName =
    'inline-flex items-center rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary/25 hover:text-slate-900';

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-background-light/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-3 rounded-full">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <span className="material-symbols-outlined">auto_stories</span>
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">IBNote</span>
          </Link>

          {action ? (
            <Link href={action.href} className={`inline-flex ${getActionClassName(action.tone)} sm:hidden`}>
              <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
              {action.label}
            </Link>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:justify-end">
          <nav aria-label="전역 탐색" className="flex flex-wrap items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = link.value === active;

              return (
                <Link
                  key={link.href}
                  href={link.href as any}
                  aria-current={isActive ? 'page' : undefined}
                  className={isActive ? activeLinkClassName : inactiveLinkClassName}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          <LocaleSwitcher />

          {action ? (
            <Link href={action.href} className={`hidden ${getActionClassName(action.tone)} sm:inline-flex`}>
              <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
              {action.label}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
