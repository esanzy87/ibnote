'use client';

import { useRouter } from '@/i18n/routing';
import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { GlobalTopBar } from '@/components/navigation/global-top-bar';
import { TemplateCard } from '@/components/templates/template-card';
import {
  TemplateLibraryFilters,
} from '@/components/templates/template-library-filters';
import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import {
  buildTemplateLibrarySections,
  type EnrichedWorksheetTemplate,
} from '@/lib/templates/template-experience';
import { isSupportedLocale } from '@/lib/templates/template-localization';
import { DEFAULT_TEMPLATE_FILTERS, filterTemplates, type TemplateFilters } from '@/lib/utils/filters';

interface TemplateLibraryClientProps {
  templates: EnrichedWorksheetTemplate[];
}

function TemplateLibraryFrame({ children }: { children: React.ReactNode }) {
  const t = useTranslations('templates.topBar');
  return (
    <div className="flex min-h-screen flex-col bg-background-light">
      <GlobalTopBar
        active="templates"
        action={{ href: '/my/records', icon: 'edit_note', label: t('btnMyRecords'), tone: 'secondary' }}
      />
      <div className="flex-1">{children}</div>
    </div>
  );
}

function AuthLoadingState() {
  const t = useTranslations('templates.library');
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="animate-pulse text-primary">
        <span className="material-symbols-outlined text-5xl">auto_stories</span>
      </div>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">{t('loadingTitle')}</h1>
    </div>
  );
}

function RedirectingState() {
  const t = useTranslations('templates.library');
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-primary">
        <span className="material-symbols-outlined text-5xl">lock</span>
      </div>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">{t('redirectTitle')}</h1>
      <p className="mt-2 text-slate-600">{t('redirectDesc')}</p>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  const t = useTranslations('templates.library');
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/30 p-12 text-center">
      <span className="material-symbols-outlined mb-4 text-5xl text-slate-300">search_off</span>
      <p className="font-medium text-slate-500">{t('emptyTitle')}</p>
      <p className="mb-6 text-sm text-slate-400">{t('emptyDesc')}</p>
      <button 
        onClick={onReset}
        className="text-sm font-bold text-primary hover:underline"
      >
        {t('emptyBtnReset')}
      </button>
    </div>
  );
}

export function TemplateLibraryClient({ templates }: TemplateLibraryClientProps) {
  const tHero = useTranslations('templates.hero');
  const tGuidance = useTranslations('templates.guidance');
  const tSection = useTranslations('templates.section');
  const tCluster = useTranslations('activityCluster');
  const locale = useLocale();

  const router = useRouter();
  const { status } = useAuthUser();
  const [filters, setFilters] = useState<TemplateFilters>(DEFAULT_TEMPLATE_FILTERS);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(buildLoginHref('/templates') as any);
    }
  }, [router, status]);

  const filteredTemplates = useMemo(() => filterTemplates(templates, filters), [templates, filters]);
  const sections = useMemo(
    () => buildTemplateLibrarySections(filteredTemplates, isSupportedLocale(locale) ? locale : 'ko'),
    [filteredTemplates, locale],
  );

  if (status === 'loading') {
    return (
      <TemplateLibraryFrame>
        <AuthLoadingState />
      </TemplateLibraryFrame>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <TemplateLibraryFrame>
        <RedirectingState />
      </TemplateLibraryFrame>
    );
  }

  return (
    <TemplateLibraryFrame>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-black text-slate-900 md:text-4xl">{tHero('title')}</h1>
          <p className="max-w-2xl text-lg text-slate-600">{tHero('desc')}</p>
        </div>

        <TemplateLibraryFilters
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_TEMPLATE_FILTERS)}
        />

        {/* Guidance Block */}
        <div className="mb-12 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <span className="material-symbols-outlined shrink-0 text-3xl text-primary">favorite</span>
          <div>
            <p className="text-lg font-semibold text-slate-800">{tGuidance('title')}</p>
            <p className="mt-1 text-slate-600">{tGuidance('desc')}</p>
          </div>
        </div>

        {/* Activity Grid Sections */}
        <div className="space-y-16">
          {sections.length === 0 ? (
            <EmptyState onReset={() => setFilters(DEFAULT_TEMPLATE_FILTERS)} />
          ) : (
            sections.map((section) => (
              <section key={section.id}>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                    <span className="material-symbols-outlined text-primary">
                      {section.id === 'conversational_check_ins' ? 'self_improvement' : 
                       section.id === 'notice_pattern_sort' ? 'visibility' : 'palette'}
                    </span>
                    {tCluster(section.id as any)}
                  </h2>
                  <span className="text-sm font-medium text-slate-400">{tSection('countSuffix', { count: section.templates.length })}</span>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {section.templates.map((template) => (
                    <TemplateCard key={template.slug} template={template} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
    </TemplateLibraryFrame>
  );
}
