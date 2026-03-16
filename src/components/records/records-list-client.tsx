'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
import type { RecordStatus, WorksheetRecord } from '@/lib/records/record-types';
import type { Competency } from '@/lib/templates/template-types';

const COMPETENCY_LABELS = {
  literacy: '문해',
  thinking: '사고력',
  expression: '표현',
  collaboration: '협력',
  digital_literacy: '디지털 문해',
} satisfies Record<Competency, string>;

const STATUS_LABELS = {
  draft: '초안',
  submitted: '제출 완료',
} satisfies Record<RecordStatus, string>;

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

function formatDateRange(startDate: string, endDate: string) {
  return `${formatDateStamp(startDate)} - ${formatDateStamp(endDate)}`;
}

function getSummaryConnectionState(record: WorksheetRecord, summaryWindow: SummaryWindow) {
  const isInsideSummaryWindow = isRecordInsideSummaryWindow(record, summaryWindow);

  if (record.status === 'submitted' && isInsideSummaryWindow) {
    return {
      badgeClassName:
        'rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-950',
      badgeLabel: '현재 요약에 반영됨',
      description:
        '활동 날짜가 현재 14일 요약 기간 안이고 제출되어 있어 요약 수치에 포함됩니다.',
      title: '현재 요약에 포함된 기록',
    };
  }

  if (record.status === 'draft' && isInsideSummaryWindow) {
    return {
      badgeClassName:
        'rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-950',
      badgeLabel: '제출 시 반영 예정',
      description:
        '요약 기간 안의 활동이지만 아직 초안이라서, 제출 전까지는 요약에 포함되지 않습니다.',
      title: '제출하면 요약에 이어지는 초안',
    };
  }

  return {
    badgeClassName:
      'rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-sm font-medium text-slate-700',
    badgeLabel: '요약 기간 밖 기록',
    description:
      '활동 날짜가 현재 14일 요약 기간 밖이라서, 이번 요약 수치에는 포함되지 않는 보관 기록입니다.',
    title: '이전 요약 기간의 기록',
  };
}

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

function AuthLoadingState() {
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">내 기록</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        기록 목록을 준비하는 중입니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        로그인 상태와 내 기록 목록을 확인한 뒤 가장 최근 기록부터 보여 드릴게요.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50"
          />
        ))}
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
        내 기록은 로그인한 계정에서만 볼 수 있어요. 잠시 후 로그인 화면으로 이동합니다.
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

function RecordsErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <Surface tone="error">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">기록 오류</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
        기록 목록을 불러오지 못했습니다.
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
          href="/templates"
          className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-5 py-3 text-sm font-medium text-rose-900 transition hover:border-rose-300"
        >
          템플릿 보러 가기
        </Link>
      </div>
    </Surface>
  );
}

function Filters({
  onReset,
  onStatusChange,
  onTemplateChange,
  statusFilter,
  templateFilter,
  templateOptions,
  summaryWindow,
}: {
  onReset: () => void;
  onStatusChange: (value: RecordsFilterStatus) => void;
  onTemplateChange: (value: string) => void;
  statusFilter: RecordsFilterStatus;
  templateFilter: string;
  templateOptions: Array<{
    slug: string;
    title: string;
  }>;
  summaryWindow: SummaryWindow;
}) {
  return (
    <section className="grid gap-4 rounded-[1.9rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">내 기록</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          다시 읽거나 이어서 정리할 기록을 한곳에서 확인하세요.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          최근 수정한 기록부터 보여 드립니다. 초안은 이어서 쓰고, 제출한 기록은 다시 읽으며 차분히 정리해 둘 수 있어요.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          현재 요약 기간: {formatDateRange(summaryWindow.startDate, summaryWindow.endDate)}
        </p>
      </div>

      <div className="grid gap-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-800">
          상태 필터
          <select
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value as RecordsFilterStatus)}
            className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500"
          >
            <option value="all">전체 상태</option>
            <option value="draft">초안만</option>
            <option value="submitted">제출 완료만</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-800">
          템플릿 필터
          <select
            value={templateFilter}
            onChange={(event) => onTemplateChange(event.target.value)}
            className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500"
          >
            <option value="all">전체 템플릿</option>
            {templateOptions.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.title}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center self-end rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900 sm:col-span-2"
        >
          필터 초기화
        </button>
      </div>
    </section>
  );
}

function EmptyState({ hasFilters, onReset }: { hasFilters: boolean; onReset: () => void }) {
  return (
    <section className="rounded-[1.9rem] border border-dashed border-stone-300 bg-stone-50 p-8 text-center sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
        {hasFilters ? '선택 결과 없음' : '기록 없음'}
      </p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
        {hasFilters ? '선택한 조건에 맞는 기록이 없습니다.' : '아직 저장된 기록이 없습니다.'}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
        {hasFilters
          ? '필터를 넓히거나 다른 템플릿 기록을 확인해 보세요.'
          : '템플릿에서 활동을 시작하면 이곳에 초안과 제출 기록이 차곡차곡 쌓입니다.'}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {hasFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
          >
            필터 초기화
          </button>
        ) : null}
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          템플릿 보러 가기
        </Link>
      </div>
    </section>
  );
}

function RecordStatusBadge({ status }: { status: RecordStatus }) {
  const className =
    status === 'submitted'
      ? 'rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-950'
      : 'rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-950';

  return <span className={className}>{STATUS_LABELS[status]}</span>;
}

function RevisitOverview({
  filteredRecordsCount,
  hasActiveFilters,
  onReset,
  records,
  summaryWindow,
}: {
  filteredRecordsCount: number;
  hasActiveFilters: boolean;
  onReset: () => void;
  records: WorksheetRecord[];
  summaryWindow: SummaryWindow;
}) {
  const submittedInSummaryWindow = records.filter(
    (record) => record.status === 'submitted' && isRecordInsideSummaryWindow(record, summaryWindow),
  ).length;

  return (
    <section className="grid gap-4 rounded-[1.9rem] border border-stone-200 bg-gradient-to-br from-white to-stone-50 p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">다시 보기 흐름</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          전체 {records.length}개 중 {filteredRecordsCount}개의 기록을 보고 있어요.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          초안은 마지막 메모부터 이어 쓰고, 제출한 기록은 다시 읽으며 흐름을 확인해 보세요.
          현재 내 요약에는 최근 14일간 제출한 기록 {submittedInSummaryWindow}개가 반영되어 있습니다.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/my/summary"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            내 요약으로 이어보기
          </Link>
          <Link
            href="/templates"
            className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
          >
            새 활동 시작하기
          </Link>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
            >
              필터 모두 풀기
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-3 text-sm text-slate-600">
        <div className="rounded-[1.25rem] border border-stone-200 bg-white/80 p-4">
          <p className="font-medium text-slate-900">이어서 보기 (초안)</p>
          <p className="mt-1">저장해 둔 문장과 체크 상태부터 다시 이어서 적을 수 있습니다. 제출 전에는 요약에 포함되지 않아요.</p>
        </div>
        <div className="rounded-[1.25rem] border border-stone-200 bg-white/80 p-4">
          <p className="font-medium text-slate-900">다시 읽기 (제출 완료)</p>
          <p className="mt-1">제출한 기록은 다시 읽고 필요하면 내용을 다듬을 수 있습니다. 요약 기간 안의 기록은 내 요약에도 함께 보입니다.</p>
        </div>
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
  const summaryConnection = getSummaryConnectionState(record, summaryWindow);

  return (
    <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:border-stone-300 hover:shadow-md sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {record.templateTitleSnapshot}
            </h2>
            <RecordStatusBadge status={record.status} />
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            활동 날짜 {record.performedOn ? formatDateStamp(record.performedOn) : '-'} · 마지막 수정{' '}
            {formatRecordDateTime(record.updatedAt)}
          </p>
        </div>

        <Link
          href={`/my/records/${record.id}`}
          className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
        >
          {record.status === 'submitted' ? '기록 다시 보기' : '기록 이어서 입력'}
        </Link>
      </div>

      <div className="mt-5 grid gap-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div>
          <p className="text-sm font-medium text-slate-900">기록 메모</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {record.childReflection.trim() || record.parentMemo.trim()
              ? `${record.childReflection.trim() || record.parentMemo.trim()}`
              : '아직 메모가 비어 있어요. 편집 화면에서 짧은 기록을 남길 수 있습니다.'}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <span className={summaryConnection.badgeClassName}>{summaryConnection.badgeLabel}</span>
            {record.competenciesSnapshot.map((competency) => (
              <span
                key={competency}
                className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-950"
              >
                {COMPETENCY_LABELS[competency]}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 max-w-[200px] text-right leading-relaxed">
            {summaryConnection.description}
          </p>
        </div>
      </div>
    </article>
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

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.replace(buildLoginHref('/my/records'));
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

  if (recordsStatus === 'loading' || recordsStatus === 'idle') {
    return (
      <PageFrame>
        <AuthLoadingState />
      </PageFrame>
    );
  }

  if (recordsStatus === 'error') {
    return (
      <PageFrame>
        <RecordsErrorState
          message={recordsError?.message ?? '기록 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'}
          onRetry={retryRecords}
        />
      </PageFrame>
    );
  }

  const handleResetFilters = () => {
    setStatusFilter('all');
    setTemplateFilter('all');
  };

  return (
    <PageFrame>
      <Filters
        onReset={handleResetFilters}
        onStatusChange={setStatusFilter}
        onTemplateChange={setTemplateFilter}
        statusFilter={statusFilter}
        templateFilter={templateFilter}
        templateOptions={templateOptions}
        summaryWindow={summaryWindow}
      />

      <RevisitOverview
        filteredRecordsCount={filteredRecords.length}
        hasActiveFilters={hasActiveFilters}
        onReset={handleResetFilters}
        records={records}
        summaryWindow={summaryWindow}
      />

      {filteredRecords.length === 0 ? (
        <EmptyState hasFilters={hasActiveFilters} onReset={handleResetFilters} />
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredRecords.map((record) => (
            <RecordCard key={record.id} record={record} summaryWindow={summaryWindow} />
          ))}
        </section>
      )}
    </PageFrame>
  );
}
