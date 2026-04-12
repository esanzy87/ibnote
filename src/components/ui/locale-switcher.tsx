'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    // Replace the current path with the new locale
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="relative inline-flex items-center">
      <span className="pointer-events-none absolute left-3 flex items-center text-slate-400">
        <span className="material-symbols-outlined text-[16px]">language</span>
      </span>
      <select
        value={locale}
        onChange={handleLocaleChange}
        className="h-10 cursor-pointer appearance-none rounded-full border border-primary/20 bg-background-light py-1.5 pl-9 pr-8 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
      <span className="pointer-events-none absolute right-3 flex items-center text-slate-400">
        <span className="material-symbols-outlined text-[16px]">expand_more</span>
      </span>
    </div>
  );
}
