'use client';

import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import { getSummaryDateRange } from '@/lib/records/summary-utils';
import { useSummary } from '@/lib/records/use-summary';
import { GlobalTopBar } from '@/components/navigation/global-top-bar';
import { RecordsWorkspaceShell } from '@/components/records/records-workspace-shell';
import type { AbsoluteGrade, WorksheetRecord } from '@/lib/records/record-types';
import { COMPETENCIES, type Competency } from '@/lib/templates/template-types';

const GRADE_TONE_CLASSES = {
  A: 'border-emerald-200 bg-emerald-50 text-emerald-950',
  B: 'border-sky-200 bg-sky-50 text-sky-950',
  C: 'border-violet-200 bg-violet-50 text-violet-950',
  D: 'border-amber-200 bg-amber-50 text-amber-950',
  E: 'border-rose-200 bg-rose-50 text-rose-950',
} satisfies Record<AbsoluteGrade, string>;

function PageFrame({ children }: { children: React.ReactNode }) {
  const t = useTranslations('common');
  return (
    <div className="min-h-screen bg-background-light text-slate-800">
      <GlobalTopBar
        active="workspace"
        variant="workspace"
        action={{ href: '/templates', icon: 'filter_vintage', label: t('templateExplore'), tone: 'secondary' }}
      />
      <main className="bg-gradient-to-b from-background-light via-[#fff8ef] to-[#f6ecdf] px-6 py-12 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">{children}</div>
      </main>
    </div>
  );
}

function SummaryWorkspaceFrame({ children }: { children: React.ReactNode }) {
  return (
    <PageFrame>
      <RecordsWorkspaceShell active="summary" />
      {children}
    </PageFrame>
  );
}

function Surface({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'error' }) {
  const className = tone === 'error'
      ? 'rounded-[1.9rem] border border-rose-200 bg-rose-50 p-8 shadow-sm sm:p-10'
      : 'rounded-[1.9rem] border border-primary/10 bg-white/90 p-8 shadow-[0_24px_60px_-40px_rgba(186,93,28,0.38)] sm:p-10';

  return <section className={className}>{children}</section>;
}

function formatDateStamp(dateStamp: string): string {
  return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }).format(new Date(`${dateStamp}T00:00:00`));
}

function formatDateRange(startDate: string, endDate: string): string {
  return `${formatDateStamp(startDate)} - ${formatDateStamp(endDate)}`;
}

function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(timestamp));
}

function getRecordPreview(record: WorksheetRecord, placeholder: string): string {
  const childReflection = record.childReflection.trim();
  const parentMemo = record.parentMemo.trim();
  if (childReflection) return childReflection;
  if (parentMemo) return parentMemo;
  return placeholder;
}

function AuthLoadingState() {
  const t = useTranslations('summary');
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">{t('labels.mySummary')}</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {t('loadingTitle')}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        {t('loadingDesc')}
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => `summary-loading-card-${index}`).map((placeholderId) => (
          <div key={placeholderId} className="h-36 animate-pulse rounded-[1.75rem] border border-primary/10 bg-background-light" />
        ))}
      </div>
    </Surface>
  );
}

function SummaryLoadingState() {
  const t = useTranslations('summary');
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">{t('labels.summaryData')}</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {t('calcTitle')}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        {t('calcDesc')}
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="h-72 animate-pulse rounded-[1.75rem] border border-primary/10 bg-background-light" />
        <div className="h-72 animate-pulse rounded-[1.75rem] border border-primary/10 bg-background-light" />
      </div>
    </Surface>
  );
}

function EmptyState({ startDate, endDate }: { startDate: string; endDate: string }) {
  const t = useTranslations('summary');
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">{t('labels.emptySummary')}</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {t('emptyTitle')}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        {t('emptyDesc', { range: formatDateRange(startDate, endDate) })}
      </p>
      <div className="mt-6 grid gap-3 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 text-left text-sm text-slate-700 sm:grid-cols-2">
        <div className="rounded-[1.25rem] border border-primary/10 bg-white px-4 py-3">
          <p className="font-medium text-slate-900">{t('emptyHint1Title')}</p>
          <p className="mt-2 leading-6 text-slate-600">{t('emptyHint1Desc')}</p>
        </div>
        <div className="rounded-[1.25rem] border border-primary/10 bg-white px-4 py-3">
          <p className="font-medium text-slate-900">{t('emptyHint2Title')}</p>
          <p className="mt-2 leading-6 text-slate-600">{t('emptyHint2Desc')}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/my/records" className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5">
          {t('linkGoRecords')}
        </Link>
        <Link href="/templates" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90">
          {t('linkGoTemplates')}
        </Link>
      </div>
    </Surface>
  );
}

function SummaryOverview({ averageCount, endDate, startDate, totalSubmittedRecords }: { averageCount: number; endDate: string; startDate: string; totalSubmittedRecords: number; }) {
  const t = useTranslations('summary');
  return (
    <section className="grid gap-4 rounded-[1.9rem] border border-primary/10 bg-gradient-to-br from-white via-[#fff6ed] to-[#f7e2cf] p-6 shadow-[0_24px_60px_-40px_rgba(186,93,28,0.38)] sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div>
         <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">{t('labels.mySummary')}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {t('overviewTitle')}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          {t('overviewDesc', { range: formatDateRange(startDate, endDate) })}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        <div className="rounded-[1.5rem] border border-primary/10 bg-white/90 p-4">
          <p className="text-sm font-medium text-slate-500">{t('statTotalRecords')}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{t('statTotalRecordsVal', { count: totalSubmittedRecords })}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{t('statTotalRecordsDesc')}</p>
        </div>
        <div className="rounded-[1.5rem] border border-primary/10 bg-white/90 p-4">
          <p className="text-sm font-medium text-slate-500">{t('statAvgComps')}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{t('statAvgCompsVal', { count: averageCount })}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{t('statAvgCompsDesc')}</p>
        </div>
        <div className="rounded-[1.5rem] border border-primary/10 bg-white/90 p-4">
          <p className="text-sm font-medium text-slate-500">{t('statRecentSummary')}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{t('statRecentSummaryVal')}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{t('statRecentSummaryDesc')}</p>
        </div>
      </div>
    </section>
  );
}

function CompetencyCountCard({ count, competency, maxCount }: { count: number; competency: Competency; maxCount: number; }) {
  const t = useTranslations('summary');
  const tComp = useTranslations('competencies');
  const widthPercent = maxCount === 0 ? 0 : Math.max((count / maxCount) * 100, count > 0 ? 18 : 0);
  return (
    <article className="rounded-[1.5rem] border border-primary/10 bg-background-light p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{t('labelCompetency')}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{tComp(competency)}</h3>
        </div>
        <p className="text-3xl font-semibold tracking-tight text-slate-900">{count}</p>
      </div>
      <div className="mt-5 h-3 rounded-full bg-white/95">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-[#cc6a24] transition-all" style={{ width: `${widthPercent}%` }} />
      </div>
    </article>
  );
}

function AverageGradeCard({ competency, gradeLabel, ratingCount, roundedAverage }: { competency: Competency; gradeLabel: AbsoluteGrade | null; ratingCount: number; roundedAverage: number | null; }) {
  const t = useTranslations('summary');
  const tComp = useTranslations('competencies');
  const toneClassName = gradeLabel ? GRADE_TONE_CLASSES[gradeLabel] : 'border-primary/10 bg-background-light text-slate-500';
  return (
    <article className={`rounded-[1.5rem] border p-5 ${toneClassName}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium opacity-80">{t('labelCompetency')}</p>
          <h3 className="mt-2 text-xl font-semibold">{tComp(competency)}</h3>
        </div>
        <p className="text-3xl font-semibold tracking-tight">{gradeLabel ?? '-'}</p>
      </div>
      <p className="mt-4 text-sm leading-6 opacity-90">
        {gradeLabel ? t('avgGradeInfo', { score: (roundedAverage ?? 0).toFixed(1), count: ratingCount }) : t('avgGradeEmpty')}
      </p>
    </article>
  );
}

function RecentRecordCard({ record }: { record: WorksheetRecord }) {
  const t = useTranslations('summary');
  const tComp = useTranslations('competencies');
  const ratedCompetencies = record.competenciesSnapshot.filter((competency) => record.competencyRatings[competency]);

  return (
    <article className="rounded-[1.6rem] border border-primary/10 bg-white/92 p-6 shadow-[0_22px_56px_-42px_rgba(148,73,22,0.28)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">{t('labelRecentRecordBadge')}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{record.templateTitleSnapshot}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {t('recordDateAndUpdated', { date: formatDateStamp(record.performedOn), time: formatTimestamp(record.updatedAt) })}
          </p>
        </div>
        <Link href={`/my/records/${record.id}`} className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5">
          {t('btnRevisit')}
        </Link>
      </div>
      <p className="mt-5 rounded-[1.25rem] border border-primary/10 bg-background-light px-4 py-3 text-sm leading-6 text-slate-600">
        {getRecordPreview(record, t('emptyPreview'))}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-950">
          {t('badgeInSummary')}
        </span>
        {ratedCompetencies.length > 0 ? (
          ratedCompetencies.map((competency) => {
            const grade = record.competencyRatings[competency];
            if (!grade) return null;
            return (
              <span key={competency} className={`rounded-full border px-3 py-1 text-sm font-medium ${GRADE_TONE_CLASSES[grade]}`}>
                {tComp(competency)} {grade}
              </span>
            );
          })
        ) : (
          <span className="rounded-full border border-primary/10 bg-background-light px-3 py-1 text-sm font-medium text-slate-600">
            {t('badgeNoGrade')}
          </span>
        )}
      </div>
    </article>
  );
}

export function SummaryPageClient() {
  const t = useTranslations('summary');
  const router = useRouter();
  const { error: authError, retry: retryAuth, status: authStatus, user } = useAuthUser();
  const { error: summaryError, retry: retrySummary, status: summaryStatus, summary } = useSummary({ authStatus, user });
  const emptyWindow = getSummaryDateRange();

  useEffect(() => {
    if (authStatus === 'unauthenticated') router.replace(buildLoginHref('/my/summary') as any);
  }, [authStatus, router]);

  if (authStatus === 'loading') return <SummaryWorkspaceFrame><AuthLoadingState /></SummaryWorkspaceFrame>;
  if (authStatus === 'error') return <SummaryWorkspaceFrame><Surface tone="error"><p>{authError?.message ?? '인증 상태 확인 실패'}</p></Surface></SummaryWorkspaceFrame>;
  if (authStatus === 'unauthenticated') return <SummaryWorkspaceFrame><Surface>Redirecting...</Surface></SummaryWorkspaceFrame>;
  if (summaryStatus === 'idle' || summaryStatus === 'loading') return <SummaryWorkspaceFrame><SummaryLoadingState /></SummaryWorkspaceFrame>;
  if (summaryStatus === 'error') return <SummaryWorkspaceFrame><Surface tone="error"><p>{summaryError?.message ?? '오류'}</p><button onClick={retrySummary}>재시도</button></Surface></SummaryWorkspaceFrame>;
  if (!summary) return <SummaryWorkspaceFrame><EmptyState startDate={emptyWindow.startDate} endDate={emptyWindow.endDate} /></SummaryWorkspaceFrame>;

  const averageEntriesByCompetency = Object.fromEntries(summary.averageGradesByCompetency.map((entry) => [entry.competency, entry])) as Partial<Record<Competency, (typeof summary.averageGradesByCompetency)[number]>>;
  const maxCount = Math.max(...summary.countsByCompetency.map((entry) => entry.count), 0);

  return (
    <SummaryWorkspaceFrame>
      <SummaryOverview
        averageCount={summary.averageGradesByCompetency.length}
        endDate={summary.window.endDate}
        startDate={summary.window.startDate}
        totalSubmittedRecords={summary.totalSubmittedRecords}
      />

      <section className="grid gap-4 rounded-[1.9rem] border border-primary/10 bg-white/92 p-6 shadow-[0_24px_60px_-40px_rgba(186,93,28,0.34)] sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">{t('labels.basisCriteria')}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{t('basisTitle')}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {t('basisDesc', { range: formatDateRange(summary.window.startDate, summary.window.endDate), count: summary.totalSubmittedRecords })}
          </p>
        </div>
        <div className="grid gap-3">
          <article className="rounded-[1.5rem] border border-primary/10 bg-background-light p-4">
            <p className="text-sm font-medium text-slate-900">{t('labels.basisCard1Title')}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{t('labels.basisCard1Desc')}</p>
          </article>
          <article className="rounded-[1.5rem] border border-primary/10 bg-background-light p-4">
            <p className="text-sm font-medium text-slate-900">{t('labels.basisCard2Title')}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{t('labels.basisCard2Desc')}</p>
          </article>
          <article className="rounded-[1.5rem] border border-primary/10 bg-background-light p-4">
            <p className="text-sm font-medium text-slate-900">{t('labels.basisCard3Title')}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{t('labels.basisCard3Desc')}</p>
          </article>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <Surface>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">{t('labels.compCount')}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{t('compCountTitle')}</h2>
            </div>
            <p className="text-sm leading-6 text-slate-600">{t('compCountDesc')}</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {summary.countsByCompetency.map((entry) => (
              <CompetencyCountCard key={entry.competency} competency={entry.competency} count={entry.count} maxCount={maxCount} />
            ))}
          </div>
        </Surface>

        <Surface>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">{t('labels.compAvg')}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{t('compAvgTitle')}</h2>
            </div>
            <p className="text-sm leading-6 text-slate-600">{t('compAvgDesc')}</p>
          </div>
          <div className="mt-6 grid gap-4">
            {COMPETENCIES.map((competency) => {
              const averageEntry = averageEntriesByCompetency[competency];
              return (
                <AverageGradeCard
                  key={competency}
                  competency={competency}
                  gradeLabel={averageEntry?.nearestGrade ?? null}
                  ratingCount={averageEntry?.ratingCount ?? 0}
                  roundedAverage={averageEntry?.roundedAverage ?? null}
                />
              );
            })}
          </div>
        </Surface>
      </section>

      <section className="grid gap-4 xl:grid-cols-1">
        <Surface>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">{t('labels.recentSubmitted')}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{t('recentRecordsTitle')}</h2>
            </div>
            <p className="text-sm leading-6 text-slate-600">{t('recentRecordsDesc')}</p>
          </div>
          <div className="mt-6 grid gap-4">
            {summary.recentRecords.map((record) => (
              <RecentRecordCard key={record.id} record={record} />
            ))}
          </div>
        </Surface>
      </section>
    </SummaryWorkspaceFrame>
  );
}
