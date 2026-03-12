'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
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
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">My records</p>
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
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Redirecting</p>
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
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">Auth error</p>
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
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">Records error</p>
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
    <section className="grid gap-4 rounded-[1.9rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">My records</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          최근에 남긴 기록을 한곳에서 확인하세요.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          가장 최근에 수정한 기록부터 보여 드립니다. 상태나 활동 템플릿 기준으로 빠르게 좁혀 볼 수 있어요.
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

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <section className="rounded-[1.9rem] border border-dashed border-stone-300 bg-stone-50 p-8 text-center sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
        {hasFilters ? 'No matches' : 'No records'}
      </p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
        {hasFilters ? '선택한 조건에 맞는 기록이 없습니다.' : '아직 저장된 기록이 없습니다.'}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
        {hasFilters
          ? '필터를 조금 넓히거나 다른 템플릿 기록을 확인해 보세요.'
          : '템플릿에서 활동을 시작하면 이곳에 초안과 제출 기록이 차곡차곡 쌓입니다.'}
      </p>
      <Link
        href="/templates"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        템플릿 보러 가기
      </Link>
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

function RecordCard({ record }: { record: WorksheetRecord }) {
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
            활동 날짜 {record.performedOn || '-'} · 마지막 수정{' '}
            {new Date(record.updatedAt).toLocaleString('ko-KR')}
          </p>
        </div>

        <Link
          href={`/my/records/${record.id}`}
          className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
        >
          {record.status === 'submitted' ? '기록 보기' : '기록 이어서 입력'}
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

        <div className="flex flex-wrap gap-2 sm:justify-end">
          {record.competenciesSnapshot.map((competency) => (
            <span
              key={competency}
              className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-950"
            >
              {COMPETENCY_LABELS[competency]}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function RecordsListClient() {
  const router = useRouter();
  const { error: authError, retry: retryAuth, status: authStatus, user } = useAuthUser();
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

  return (
    <PageFrame>
      <Filters
        onReset={() => {
          setStatusFilter('all');
          setTemplateFilter('all');
        }}
        onStatusChange={setStatusFilter}
        onTemplateChange={setTemplateFilter}
        statusFilter={statusFilter}
        templateFilter={templateFilter}
        templateOptions={templateOptions}
      />

      <section className="grid gap-4 rounded-[1.9rem] border border-stone-200 bg-gradient-to-br from-white to-stone-50 p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Current view</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
            전체 {records.length}개 중 {filteredRecords.length}개의 기록을 보고 있어요.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            목록은 마지막 수정 시각 기준으로 가장 최근 기록이 먼저 보입니다. 초안과 제출 완료 상태를 한눈에 구분할 수 있어요.
          </p>
        </div>

        <div className="grid gap-3 rounded-[1.5rem] border border-stone-200 bg-white/80 p-4 text-sm text-slate-600">
          <p className="font-medium text-slate-900">빠른 확인</p>
          <p>정렬: `updatedAt desc` 기준</p>
          <p>상태 필터: 초안 / 제출 완료</p>
          <p>템플릿 필터: 저장된 템플릿 제목 기준</p>
        </div>
      </section>

      {filteredRecords.length === 0 ? (
        <EmptyState hasFilters={hasActiveFilters} />
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredRecords.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </section>
      )}
    </PageFrame>
  );
}
