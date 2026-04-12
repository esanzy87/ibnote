'use client';

import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import {
  getSummaryDateRange,
  isRecordInsideSummaryWindow,
  type SummaryWindow,
} from '@/lib/records/summary-utils';
import {
  useRecords,
  type RecordsFilterStatus,
} from '@/lib/records/use-records';
import { GlobalTopBar } from '@/components/navigation/global-top-bar';
import { RecordsWorkspaceShell } from '@/components/records/records-workspace-shell';
import type { RecordStatus, WorksheetRecord } from '@/lib/records/record-types';

function formatRecordDateTime(timestamp: number) {
  return new Date(timestamp).toLocaleString('ko-KR');
}

function formatDateStamp(dateStamp: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date(`${dateStamp}T00:00:00`));
}

function AuthLoadingState() {
  const t = useTranslations('recordsList.loading');
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      <p className="mt-4 text-sm font-medium text-slate-500">{t('title')}</p>
    </div>
  );
}

function HeroSection() {
  const t = useTranslations('recordsList.hero');
  return (
    <section className="text-center md:text-left">
      <h1 className="mb-3 text-3xl font-bold text-slate-800 md:text-4xl">{t('title')}</h1>
      <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
        {t('desc')}
      </p>
    </section>
  );
}

function StatusFilters({
  records,
  statusFilter,
  onStatusChange,
  summaryWindow,
}: {
  records: WorksheetRecord[];
  statusFilter: RecordsFilterStatus;
  onStatusChange: (status: RecordsFilterStatus) => void;
  summaryWindow: SummaryWindow;
}) {
  const t = useTranslations('recordsList.status');
  const draftCount = records.filter((r) => r.status === 'draft').length;
  const completedCount = records.filter((r) => r.status === 'submitted').length;
  const inSummaryCount = records.filter(
    (record) => record.status === 'submitted' && isRecordInsideSummaryWindow(record, summaryWindow)
  ).length;

  return (
    <section className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onStatusChange(statusFilter === 'draft' ? 'all' : 'draft')}
        className={`group rounded-[12px] border-2 bg-white p-4 sm:p-6 text-left transition-all hover:border-primary/20 ${
          statusFilter === 'draft' ? 'border-primary shadow-sm' : 'border-transparent shadow-[0_4px_20px_-2px_rgba(207,84,23,0.05)]'
        }`}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">{t('draft')}</span>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">{draftCount}</span>
        </div>
        <p className={`text-xl sm:text-2xl font-bold transition-colors ${statusFilter === 'draft' ? 'text-primary' : 'text-slate-800 group-hover:text-primary'}`}>
          {t('draftSub')}
        </p>
      </button>

      <button
        type="button"
        onClick={() => onStatusChange(statusFilter === 'submitted' ? 'all' : 'submitted')}
        className={`rounded-[12px] p-4 sm:p-6 text-left border-2 transition-all ${
          statusFilter === 'submitted'
            ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
            : 'border-transparent bg-[#fdfcfb] text-slate-800 shadow-[0_4px_20px_-2px_rgba(207,84,23,0.05)] hover:border-primary/20'
        }`}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className={`text-sm font-semibold uppercase tracking-wider ${statusFilter === 'submitted' ? 'text-white/80' : 'text-slate-400'}`}>{t('submitted')}</span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusFilter === 'submitted' ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>{completedCount}</span>
        </div>
        <p className="text-xl sm:text-2xl font-bold">{t('submittedSub')}</p>
        {inSummaryCount > 0 && statusFilter === 'submitted' && (
          <p className="mt-2 text-[10px] sm:text-xs font-medium text-white/80">{t('inSummary', { count: inSummaryCount })}</p>
        )}
      </button>
    </section>
  );
}

function SearchAndTools({
  templateFilter,
  onTemplateChange,
  templateOptions,
  onReset
}: {
  templateFilter: string;
  onTemplateChange: (value: string) => void;
  templateOptions: Array<{slug: string; title: string}>;
  onReset: () => void;
}) {
  const t = useTranslations('recordsList.search');
  return (
    <section className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="relative w-full md:w-96 hidden md:block">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </span>
        <input
          type="text"
          placeholder={t('placeholder')}
          className="w-full rounded-[12px] border-slate-200 bg-white py-3 pl-10 pr-4 shadow-sm transition-all focus:border-primary focus:ring-primary"
          disabled
        />
      </div>
      <div className="flex w-full items-center gap-3 md:w-auto">
        <select
          value={templateFilter}
          onChange={(event) => onTemplateChange(event.target.value)}
          className="w-full rounded-[12px] border-slate-200 bg-white py-3 text-slate-600 shadow-sm transition-all focus:border-primary focus:ring-primary md:w-64"
        >
          <option value="all">{t('allTemplates')}</option>
          {templateOptions.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.title}
            </option>
          ))}
        </select>
        {templateFilter !== 'all' && (
          <button type="button" onClick={onReset} className="text-sm font-semibold text-slate-500 hover:text-slate-800 whitespace-nowrap">{t('reset')}</button>
        )}
      </div>
    </section>
  );
}

function RecordCard({
  record,
  summaryWindow,
}: {
  record: WorksheetRecord;
  summaryWindow: SummaryWindow;
}) {
  const t = useTranslations('recordsList.card');
  const isInsideSummaryWindow = isRecordInsideSummaryWindow(record, summaryWindow);
  const isDraft = record.status === 'draft';
  const memoText = (record.childReflection?.trim() || record.parentMemo?.trim()) || t('emptyMemo');

  if (isDraft) {
    return (
      <div className="flex flex-col gap-6 rounded-[12px] border border-primary/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(207,84,23,0.05)] transition-transform hover:translate-y-[-2px] md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-slate-500">
              Draft
            </span>
            <span className="text-xs italic text-slate-400">
              {t('updatedAt', { date: formatRecordDateTime(record.updatedAt) })}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-800">{record.templateTitleSnapshot}</h3>
          <p className="line-clamp-1 text-sm italic text-slate-500">&quot;{memoText}&quot;</p>
        </div>
        <Link
          href={`/my/records/${record.id}`}
          className="whitespace-nowrap rounded-[12px] bg-[#f4ece4] px-6 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-200 text-center"
        >
          {t('btnContinue')}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-[12px] border border-primary/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(207,84,23,0.05)] transition-transform hover:translate-y-[-2px] md:flex-row md:items-center md:justify-between">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-400">
            {record.performedOn ? formatDateStamp(record.performedOn) : t('noDate')}
          </span>
          {isInsideSummaryWindow && (
            <span className="rounded-full border border-primary/10 bg-primary/5 px-3 py-0.5 mt-0.5 text-[10px] font-bold text-primary">
              {t('inSummaryBadge')}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">{record.templateTitleSnapshot}</h3>
          <p className="mt-1 max-w-2xl text-slate-600 leading-relaxed md:line-clamp-2 line-clamp-3">
            {memoText}
          </p>
        </div>
      </div>
      <Link
        href={`/my/records/${record.id}`}
        className="whitespace-nowrap rounded-[12px] border-2 border-primary px-6 py-3 font-bold text-primary transition-all hover:bg-primary hover:text-white text-center"
      >
        {t('btnRevisit')}
      </Link>
    </div>
  );
}

function EmptyState({ hasFilters, onReset }: { hasFilters: boolean; onReset: () => void }) {
  const t = useTranslations('recordsList.empty');
  return (
    <div className="pt-16 pb-24 text-center">
      <h3 className="mb-2 text-xl font-bold text-slate-800">
        {hasFilters ? t('hasFiltersTitle') : t('noFiltersTitle')}
      </h3>
      <p className="mb-6 text-slate-500">
        {hasFilters ? t('hasFiltersDesc') : t('noFiltersDesc')}
      </p>
      {hasFilters ? (
        <button type="button" onClick={onReset} className="font-semibold text-primary underline-offset-4 hover:underline">
          {t('btnReset')}
        </button>
      ) : (
        <Link href="/templates" className="font-semibold text-primary underline-offset-4 hover:underline">
          {t('btnNew')}
        </Link>
      )}
    </div>
  );
}

function AuthRedirectState({ isLoadError, onRetry }: { isLoadError?: boolean, onRetry?: () => void }) {
  const t = useTranslations('recordsList.redirect');
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center text-center px-4">
      <span className="material-symbols-outlined text-4xl text-slate-300 mb-4">error</span>
      <h3 className="text-lg font-bold text-slate-800 mb-2">
        {isLoadError ? t('errorTitle') : t('loginTitle')}
      </h3>
      <p className="text-slate-500 mb-6 text-sm">
        {isLoadError ? t('errorDesc') : t('loginDesc')}
      </p>
      {isLoadError && onRetry && (
        <button type="button" onClick={onRetry} className="rounded-full bg-primary px-6 py-2 text-white font-bold transition-all hover:bg-primary/90">
          {t('btnRetry')}
        </button>
      )}
    </div>
  );
}

export function RecordsListClient() {
  const router = useRouter();
  const { error: authError, retry: retryAuth, status: authStatus, user } = useAuthUser();
  const summaryWindow = getSummaryDateRange();
  const {
    error: recordsError,
    filteredRecords,
    hasActiveFilters,
    records,
    retry: retryRecords,
    setStatusFilter,
    setTemplateFilter,
    status: recordsStatus,
    statusFilter,
    templateFilter,
    templateOptions,
  } = useRecords({ authStatus, user });
  const tTopBar = useTranslations('recordsList.topBar');
  const tBtn = useTranslations('recordsList');

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.replace(buildLoginHref('/my/records') as any);
    }
  }, [authStatus, router]);

  if (authStatus === 'loading' || (recordsStatus === 'loading' && authStatus === 'authenticated')) {
    return (
      <div className="min-h-screen bg-[#fcfaf7] font-sans antialiased">
        <GlobalTopBar active="workspace" variant="workspace" action={{ href: '/templates', icon: 'filter_vintage', label: tTopBar('btnTemplates'), tone: 'secondary' }} />
        <RecordsWorkspaceShell active="records" />
        <AuthLoadingState />
      </div>
    );
  }

  if (authStatus === 'error' || recordsStatus === 'error') {
    return (
      <div className="min-h-screen bg-[#fcfaf7] font-sans antialiased">
        <GlobalTopBar active="workspace" variant="workspace" action={{ href: '/templates', icon: 'filter_vintage', label: tTopBar('btnTemplates'), tone: 'secondary' }} />
        <RecordsWorkspaceShell active="records" />
        <AuthRedirectState isLoadError onRetry={authStatus === 'error' ? retryAuth : retryRecords} />
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#fcfaf7] font-sans antialiased">
        <GlobalTopBar active="workspace" variant="workspace" action={{ href: '/templates', icon: 'filter_vintage', label: tTopBar('btnTemplates'), tone: 'secondary' }} />
        <RecordsWorkspaceShell active="records" />
        <AuthRedirectState />
      </div>
    );
  }

  const handleResetFilters = () => {
    setStatusFilter('all');
    setTemplateFilter('all');
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans antialiased text-slate-800">
      <GlobalTopBar active="workspace" variant="workspace" action={{ href: '/templates', icon: 'filter_vintage', label: tTopBar('btnTemplates'), tone: 'secondary' }} />
      <RecordsWorkspaceShell active="records" />
      
      <main className="mx-auto max-w-5xl px-4 py-8 pb-32 space-y-10">
        <HeroSection />
        
        <StatusFilters
          records={records}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          summaryWindow={summaryWindow}
        />
        
        <SearchAndTools
          templateFilter={templateFilter}
          onTemplateChange={setTemplateFilter}
          templateOptions={templateOptions}
          onReset={handleResetFilters}
        />
        
        <section className="space-y-6">
          {filteredRecords.length === 0 ? (
            <EmptyState hasFilters={hasActiveFilters} onReset={handleResetFilters} />
          ) : (
            filteredRecords.map((record) => (
              <RecordCard key={record.id} record={record} summaryWindow={summaryWindow} />
            ))
          )}
          
          {filteredRecords.length > 0 && (
            <div className="pt-4 text-center">
              <Link href="/templates" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">
                {tBtn('bottomNext')}
              </Link>
            </div>
          )}
        </section>
      </main>

      <div className="fixed bottom-8 right-8 z-50">
        <Link
          href="/templates"
          className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/40 transition-transform hover:scale-110"
        >
          <span className="material-symbols-outlined text-[32px]">edit_square</span>
        </Link>
      </div>
    </div>
  );
}
