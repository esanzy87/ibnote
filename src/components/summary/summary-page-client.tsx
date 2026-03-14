'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import { getSummaryDateRange } from '@/lib/records/summary-utils';
import { useSummary } from '@/lib/records/use-summary';
import type { AbsoluteGrade, WorksheetRecord } from '@/lib/records/record-types';
import { COMPETENCIES, type Competency } from '@/lib/templates/template-types';

const COMPETENCY_LABELS = {
  literacy: '문해',
  thinking: '사고력',
  expression: '표현',
  collaboration: '협력',
  digital_literacy: '디지털 문해',
} satisfies Record<Competency, string>;

const GRADE_TONE_CLASSES = {
  A: 'border-emerald-200 bg-emerald-50 text-emerald-950',
  B: 'border-sky-200 bg-sky-50 text-sky-950',
  C: 'border-violet-200 bg-violet-50 text-violet-950',
  D: 'border-amber-200 bg-amber-50 text-amber-950',
  E: 'border-rose-200 bg-rose-50 text-rose-950',
} satisfies Record<AbsoluteGrade, string>;

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">{children}</div>
    </main>
  );
}

function Surface({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'error' }) {
  const className =
    tone === 'error'
      ? 'rounded-[1.9rem] border border-rose-200 bg-rose-50 p-8 shadow-sm sm:p-10'
      : 'rounded-[1.9rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10';

  return <section className={className}>{children}</section>;
}

function formatDateStamp(dateStamp: string): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date(`${dateStamp}T00:00:00`));
}

function formatDateRange(startDate: string, endDate: string): string {
  return `${formatDateStamp(startDate)} - ${formatDateStamp(endDate)}`;
}

function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
}

function getRecordPreview(record: WorksheetRecord): string {
  const childReflection = record.childReflection.trim();
  const parentMemo = record.parentMemo.trim();

  if (childReflection) {
    return childReflection;
  }

  if (parentMemo) {
    return parentMemo;
  }

  return '짧은 메모는 비어 있지만 제출된 평가 결과는 요약에 반영되어 있어요.';
}

function AuthLoadingState() {
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">내 요약</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        최근 기록 요약 화면을 준비하고 있습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        로그인 상태를 확인한 뒤 최근 14일 안에 제출한 기록만 모아 보여 드립니다.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => `summary-loading-card-${index}`).map((placeholderId) => (
          <div
            key={placeholderId}
            className="h-36 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50"
          />
        ))}
      </div>
    </Surface>
  );
}

function SummaryLoadingState() {
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">요약 데이터</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        요약 데이터를 계산하고 있습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        활동 날짜와 역량 평가를 정리해 이해하기 쉬운 14일 요약으로 변환하고 있습니다.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="h-72 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
        <div className="h-72 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
      </div>
    </Surface>
  );
}

function RedirectingState() {
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">로그인 필요</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        로그인 화면으로 이동하고 있습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        내 요약은 로그인한 계정에서만 볼 수 있어요. 잠시 후 로그인 화면으로 이동합니다.
      </p>
    </Surface>
  );
}

function AuthErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <Surface tone="error">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">인증 오류</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
        로그인 상태를 확인하지 못했습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-rose-900 sm:text-base">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-rose-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-800"
      >
        다시 시도
      </button>
    </Surface>
  );
}

function SummaryErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <Surface tone="error">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">요약 오류</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
        최근 14일 요약을 불러오지 못했습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-rose-900 sm:text-base">{message}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-full bg-rose-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-800"
        >
          다시 시도
        </button>
        <Link
          href="/my/records"
          className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-5 py-3 text-sm font-medium text-rose-900 transition hover:border-rose-300"
        >
          내 기록으로 이동
        </Link>
      </div>
    </Surface>
  );
}

function EmptyState({ startDate, endDate }: { startDate: string; endDate: string }) {
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">빈 요약</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        최근 14일에 제출한 기록이 아직 없습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        현재 요약 기간은 {formatDateRange(startDate, endDate)}입니다. 이 기간 안에 제출 완료한 기록이
        생기면 이곳에 역량별 횟수와 평균 등급이 자동으로 정리됩니다.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/my/records"
          className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
        >
          내 기록 보기
        </Link>
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          템플릿 보러 가기
        </Link>
      </div>
    </Surface>
  );
}

function SummaryOverview({
  averageCount,
  endDate,
  startDate,
  totalSubmittedRecords,
}: {
  averageCount: number;
  endDate: string;
  startDate: string;
  totalSubmittedRecords: number;
}) {
  return (
    <section className="grid gap-4 rounded-[1.9rem] border border-stone-200 bg-gradient-to-br from-white via-stone-50 to-amber-50 p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div>
         <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">내 요약</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          최근 14일의 제출 기록을 간단히 돌아보세요.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          오늘을 포함한 {formatDateRange(startDate, endDate)} 기간 안에서 제출 완료한 기록만 집계합니다.
          활동 수와 역량별 평가 흐름을 한 화면에서 확인하고, 필요하면 개별 기록으로 바로 이동할 수 있어요.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        <div className="rounded-[1.5rem] border border-stone-200 bg-white/90 p-4">
          <p className="text-sm font-medium text-slate-500">제출 기록 수</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {totalSubmittedRecords}개
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">최근 14일 안에 제출된 기록만 셉니다.</p>
        </div>

        <div className="rounded-[1.5rem] border border-stone-200 bg-white/90 p-4">
          <p className="text-sm font-medium text-slate-500">평균 집계 역량</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{averageCount}개</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">평가값이 있는 역량만 평균 등급을 계산합니다.</p>
        </div>

        <div className="rounded-[1.5rem] border border-stone-200 bg-white/90 p-4">
          <p className="text-sm font-medium text-slate-500">최근 기록 목록</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">최대 5개</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            활동 날짜 최신순, 같은 날짜면 마지막 수정이 더 최근인 기록이 먼저 보입니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function CompetencyCountCard({
  count,
  competency,
  maxCount,
}: {
  count: number;
  competency: Competency;
  maxCount: number;
}) {
  const widthPercent = maxCount === 0 ? 0 : Math.max((count / maxCount) * 100, count > 0 ? 18 : 0);

  return (
    <article className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">역량</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{COMPETENCY_LABELS[competency]}</h3>
        </div>
        <p className="text-3xl font-semibold tracking-tight text-slate-900">{count}</p>
      </div>
      <div className="mt-5 h-3 rounded-full bg-white">
        <div
          className="h-full rounded-full bg-slate-900 transition-all"
          style={{ width: `${widthPercent}%` }}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        최근 14일 제출 기록 중 이 역량이 평가된 횟수입니다.
      </p>
    </article>
  );
}

function AverageGradeCard({
  competency,
  gradeLabel,
  ratingCount,
  roundedAverage,
}: {
  competency: Competency;
  gradeLabel: AbsoluteGrade | null;
  ratingCount: number;
  roundedAverage: number | null;
}) {
  const toneClassName = gradeLabel ? GRADE_TONE_CLASSES[gradeLabel] : 'border-stone-200 bg-stone-50 text-slate-500';

  return (
    <article className={`rounded-[1.5rem] border p-5 ${toneClassName}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium opacity-80">역량</p>
          <h3 className="mt-2 text-xl font-semibold">{COMPETENCY_LABELS[competency]}</h3>
        </div>
        <p className="text-3xl font-semibold tracking-tight">{gradeLabel ?? '-'}</p>
      </div>
      <p className="mt-4 text-sm leading-6 opacity-90">
        {gradeLabel
          ? `평균 ${roundedAverage?.toFixed(1)}점, ${ratingCount}개의 평가에서 계산했습니다.`
          : '최근 14일 안에 이 역량에 대한 제출 평가가 아직 없습니다.'}
      </p>
    </article>
  );
}

function RecentRecordCard({ record }: { record: WorksheetRecord }) {
  const ratedCompetencies = record.competenciesSnapshot.filter(
    (competency) => record.competencyRatings[competency],
  );

  return (
    <article className="rounded-[1.6rem] border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Submitted record</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
            {record.templateTitleSnapshot}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            활동 날짜 {formatDateStamp(record.performedOn)} · 마지막 수정 {formatTimestamp(record.updatedAt)}
          </p>
        </div>

        <Link
          href={`/my/records/${record.id}`}
          className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
        >
          기록 보기
        </Link>
      </div>

      <p className="mt-5 rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-slate-600">
        {getRecordPreview(record)}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {ratedCompetencies.length > 0 ? (
          ratedCompetencies.map((competency) => {
            const grade = record.competencyRatings[competency];

            if (!grade) {
              return null;
            }

            return (
              <span
                key={competency}
                className={`rounded-full border px-3 py-1 text-sm font-medium ${GRADE_TONE_CLASSES[grade]}`}
              >
                {COMPETENCY_LABELS[competency]} {grade}
              </span>
            );
          })
        ) : (
          <span className="rounded-full border border-stone-300 bg-stone-50 px-3 py-1 text-sm font-medium text-slate-600">
            표시할 평가가 없습니다.
          </span>
        )}
      </div>
    </article>
  );
}

export function SummaryPageClient() {
  const router = useRouter();
  const { error: authError, retry: retryAuth, status: authStatus, user } = useAuthUser();
  const { error: summaryError, retry: retrySummary, status: summaryStatus, summary } = useSummary({
    authStatus,
    user,
  });
  const emptyWindow = getSummaryDateRange();

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.replace(buildLoginHref('/my/summary'));
    }
  }, [authStatus, router]);

  if (authStatus === 'loading') {
    return (
      <PageFrame>
        <AuthLoadingState />
      </PageFrame>
    );
  }

  if (authStatus === 'error') {
    return (
      <PageFrame>
        <AuthErrorState
          message={authError?.message ?? '인증 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'}
          onRetry={retryAuth}
        />
      </PageFrame>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <PageFrame>
        <RedirectingState />
      </PageFrame>
    );
  }

  if (summaryStatus === 'idle' || summaryStatus === 'loading') {
    return (
      <PageFrame>
        <SummaryLoadingState />
      </PageFrame>
    );
  }

  if (summaryStatus === 'error') {
    return (
      <PageFrame>
        <SummaryErrorState
          message={summaryError?.message ?? '요약 데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'}
          onRetry={retrySummary}
        />
      </PageFrame>
    );
  }

  if (!summary) {
    return (
      <PageFrame>
        <EmptyState startDate={emptyWindow.startDate} endDate={emptyWindow.endDate} />
      </PageFrame>
    );
  }

  const averageEntriesByCompetency = Object.fromEntries(
    summary.averageGradesByCompetency.map((entry) => [entry.competency, entry]),
  ) as Partial<Record<Competency, (typeof summary.averageGradesByCompetency)[number]>>;
  const maxCount = Math.max(...summary.countsByCompetency.map((entry) => entry.count), 0);

  return (
    <PageFrame>
      <SummaryOverview
        averageCount={summary.averageGradesByCompetency.length}
        endDate={summary.window.endDate}
        startDate={summary.window.startDate}
        totalSubmittedRecords={summary.totalSubmittedRecords}
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <Surface>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
                Counts by competency
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                어떤 역량을 자주 기록했는지 확인해 보세요.
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-600">제출 기록 1개당 역량별로 1회씩 집계합니다.</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {summary.countsByCompetency.map((entry) => (
              <CompetencyCountCard
                key={entry.competency}
                competency={entry.competency}
                count={entry.count}
                maxCount={maxCount}
              />
            ))}
          </div>
        </Surface>

        <Surface>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
                Average grade
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                역량별 평균 등급을 한눈에 볼 수 있어요.
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-600">A=5점, B=4점, C=3점, D=2점, E=1점 기준입니다.</p>
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

      <Surface>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">최근 제출 5개</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              가장 최근에 제출한 기록을 다시 볼 수 있습니다.
            </h2>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            활동 날짜 최신순으로 최대 5개만 보여 드립니다.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {summary.recentRecords.map((record) => (
            <RecentRecordCard key={record.id} record={record} />
          ))}
        </div>
      </Surface>
    </PageFrame>
  );
}
