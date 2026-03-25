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
import { GlobalTopBar } from '@/components/navigation/global-top-bar';
import { RecordsWorkspaceShell } from '@/components/records/records-workspace-shell';
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
      'rounded-full border border-primary/10 bg-background-light px-3 py-1 text-sm font-medium text-slate-700',
    badgeLabel: '요약 기간 밖 기록',
    description:
      '활동 날짜가 현재 14일 요약 기간 밖이라서, 이번 요약 수치에는 포함되지 않는 보관 기록입니다.',
    title: '이전 요약 기간의 기록',
  };
}

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-light text-slate-800">
      <GlobalTopBar
        active="workspace"
        variant="workspace"
        action={{ href: '/templates', icon: 'filter_vintage', label: '템플릿 둘러보기', tone: 'secondary' }}
      />
      <main className="bg-gradient-to-b from-background-light via-[#fff8ef] to-[#f6ecdf] px-6 py-12 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">{children}</div>
      </main>
    </div>
  );
}

function RecordsWorkspaceFrame({ children }: { children: React.ReactNode }) {
  return (
    <PageFrame>
      <RecordsWorkspaceShell active="records" />
      {children}
    </PageFrame>
  );
}

function Surface({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'error' }) {
  const className =
    tone === 'error'
      ? 'rounded-[1.9rem] border border-rose-200 bg-rose-50 p-8 shadow-sm sm:p-10'
      : 'rounded-[1.9rem] border border-primary/10 bg-white/90 p-8 shadow-[0_24px_60px_-40px_rgba(186,93,28,0.38)] sm:p-10';

  return <section className={className}>{children}</section>;
}

function RecordsHero({
  recordCount,
  summaryWindow,
}: {
  recordCount: number;
  summaryWindow: SummaryWindow;
}) {
  return (
    <section className="rounded-[2rem] border border-primary/10 bg-gradient-to-br from-white via-[#fff5eb] to-[#f8dfca] px-7 py-10 text-slate-900 shadow-[0_28px_80px_-48px_rgba(186,93,28,0.52)] sm:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">내 기록</p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        오늘의 기록이 내일의 다시 보기로 이어지는 곳.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        초안은 이어 쓰기로, 제출 기록은 다시 읽기와 성장 연결로 자연스럽게 넘어갑니다.
        지금은 <strong className="text-slate-900">현재 요약 기간 {formatDateRange(summaryWindow.startDate, summaryWindow.endDate)}</strong> 안의 기록을 중심으로 안내합니다.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90"
        >
          새 기록 시작
        </Link>
        <Link
          href="/my/summary"
          className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white/90 px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-white"
        >
          내 요약 보기
        </Link>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-primary/10 bg-white/75 px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">현재 상태</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{recordCount}개 기록</p>
          <p className="mt-1 text-xs text-slate-600">필터를 바꾸면 바로 이어 보기 흐름이 바뀝니다.</p>
        </div>
        <div className="rounded-2xl border border-primary/10 bg-white/75 px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">기록의 루틴</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">기록 시작 → 이어쓰기 → 복기</p>
          <p className="mt-1 text-xs text-slate-600">핵심은 데이터 정리보다 다시 쓰고 다시 보는 리듬입니다.</p>
        </div>
      </div>
    </section>
  );
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
            className="h-44 animate-pulse rounded-[1.75rem] border border-primary/10 bg-background-light"
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

function FiltersPanel({
  onReset,
  onStatusChange,
  onTemplateChange,
  statusFilter,
  templateFilter,
  templateOptions,
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
}) {
  return (
    <section className="rounded-[1.9rem] border border-primary/10 bg-white/92 p-7 shadow-[0_24px_60px_-40px_rgba(186,93,28,0.38)]">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">기록 찾기와 정리</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            다시 읽고 이어 쓸 기록을 원하는 방식으로 정렬해 보세요.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            최신 수정순으로 정렬된 기록은 초안/제출 상태별로 바로 확인됩니다.
          </p>
        </div>
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
        >
          템플릿 둘러보기
        </Link>
      </div>

      <div className="mt-6 grid gap-4 rounded-[1.5rem] border border-primary/10 bg-background-light p-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-800">
          상태 필터
          <select
            value={statusFilter}
            onChange={(event) => onStatusChange(event.target.value as RecordsFilterStatus)}
            className="rounded-2xl border border-primary/15 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-primary/40"
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
            className="rounded-2xl border border-primary/15 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-primary/40"
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
          className="inline-flex items-center justify-center self-end rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5 sm:col-span-2"
        >
          필터 초기화
        </button>
      </div>
    </section>
  );
}

function EmptyState({ hasFilters, onReset }: { hasFilters: boolean; onReset: () => void }) {
  return (
    <section className="rounded-[1.9rem] border border-dashed border-primary/20 bg-background-light p-8 text-center sm:p-10">
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
            className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
          >
            필터 초기화
          </button>
        ) : null}
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
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
    <section className="grid gap-4 rounded-[1.9rem] border border-primary/10 bg-gradient-to-br from-white via-[#fff9f1] to-[#f8e6d4] p-6 shadow-[0_24px_60px_-40px_rgba(186,93,28,0.38)] sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
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
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
          >
            내 요약으로 이어보기
          </Link>
          <Link
            href="/templates"
            className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
          >
            새 활동 시작하기
          </Link>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
            >
              필터 모두 풀기
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-3 text-sm text-slate-600">
        <div className="rounded-[1.25rem] border border-primary/10 bg-white/85 p-4">
          <p className="font-medium text-slate-900">이어서 보기 (초안)</p>
          <p className="mt-1">저장해 둔 문장과 체크 상태부터 다시 이어서 적을 수 있습니다. 제출 전에는 요약에 포함되지 않아요.</p>
        </div>
        <div className="rounded-[1.25rem] border border-primary/10 bg-white/85 p-4">
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
  const isDraft = record.status === 'draft';

  return (
    <article
      className={`relative overflow-hidden rounded-[1.75rem] border p-6 shadow-[0_22px_56px_-42px_rgba(148,73,22,0.28)] transition hover:border-primary/20 hover:shadow-md sm:p-7 ${
        isDraft ? 'border-amber-200 bg-white/95' : 'border-emerald-200 bg-white/95'
      }`}
    >
      <div
        className={`absolute inset-y-0 left-0 w-1.5 ${isDraft ? 'bg-amber-300' : 'bg-emerald-300'}`}
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
        >
          {record.status === 'submitted' ? '기록 다시 보기' : '기록 이어서 입력'}
        </Link>
      </div>

      <div className="relative mt-5 grid gap-4 rounded-[1.5rem] border border-primary/10 bg-background-light p-4 sm:grid-cols-[minmax(0,1fr)_minmax(220px,auto)] sm:items-start">
        <span className="sm:col-span-full text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
          기록 개요
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-900">기록 메모</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {record.childReflection.trim() || record.parentMemo.trim()
              ? `${record.childReflection.trim() || record.parentMemo.trim()}`
              : '아직 메모가 비어 있어요. 편집 화면에서 짧은 기록을 남길 수 있습니다.'}
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-3 sm:items-end sm:text-right">
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
          <p className="max-w-[220px] text-xs leading-relaxed text-slate-500 sm:text-right">
            {summaryConnection.description}
          </p>
        </div>
      </div>
      <div className="relative mt-5 border-t border-primary/10 pt-4 text-xs text-slate-500">
        <p>연결된 역량 {record.competenciesSnapshot.length}개를 기준으로 다시 읽고 이어서 정리할 수 있습니다.</p>
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
      <RecordsWorkspaceFrame>
        <AuthLoadingState />
      </RecordsWorkspaceFrame>
    );
  }

  if (authStatus === 'error') {
    return (
      <RecordsWorkspaceFrame>
        <AuthErrorState
          message={authError?.message ?? '인증 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'}
          onRetry={retryAuth}
        />
      </RecordsWorkspaceFrame>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <RecordsWorkspaceFrame>
        <RedirectingState />
      </RecordsWorkspaceFrame>
    );
  }

  if (recordsStatus === 'loading' || recordsStatus === 'idle') {
    return (
      <RecordsWorkspaceFrame>
        <AuthLoadingState />
      </RecordsWorkspaceFrame>
    );
  }

  if (recordsStatus === 'error') {
    return (
      <RecordsWorkspaceFrame>
        <RecordsErrorState
          message={recordsError?.message ?? '기록 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'}
          onRetry={retryRecords}
        />
      </RecordsWorkspaceFrame>
    );
  }

  const handleResetFilters = () => {
    setStatusFilter('all');
    setTemplateFilter('all');
  };

  return (
    <PageFrame>
      <RecordsWorkspaceShell active="records" />
      <RecordsHero recordCount={records.length} summaryWindow={summaryWindow} />

      <FiltersPanel
        onReset={handleResetFilters}
        onStatusChange={setStatusFilter}
        onTemplateChange={setTemplateFilter}
        statusFilter={statusFilter}
        templateFilter={templateFilter}
        templateOptions={templateOptions}
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
          <div className="col-span-full">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              기록 목록
            </h2>
          </div>
          {filteredRecords.map((record) => (
            <RecordCard key={record.id} record={record} summaryWindow={summaryWindow} />
          ))}
        </section>
      )}
    </PageFrame>
  );
}
