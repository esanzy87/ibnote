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
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      <p className="mt-4 text-sm font-medium text-slate-500">기록을 준비하는 중입니다...</p>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="text-center md:text-left">
      <h1 className="mb-3 text-3xl font-bold text-slate-800 md:text-4xl">Your Reflection Journey</h1>
      <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
        나누었던 대화와 작은 발견들은 모두 아이 성장의 중요한 조각들입니다. 
        저장해둔 장면을 다시 돌아보거나 멈춘 곳에서 바로 이어 작성해보세요.
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
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">초안</span>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">{draftCount}</span>
        </div>
        <p className={`text-xl sm:text-2xl font-bold transition-colors ${statusFilter === 'draft' ? 'text-primary' : 'text-slate-800 group-hover:text-primary'}`}>
          작성 중
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
          <span className={`text-sm font-semibold uppercase tracking-wider ${statusFilter === 'submitted' ? 'text-white/80' : 'text-slate-400'}`}>제출 완료</span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusFilter === 'submitted' ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>{completedCount}</span>
        </div>
        <p className="text-xl sm:text-2xl font-bold">저장된 기록</p>
        {inSummaryCount > 0 && statusFilter === 'submitted' && (
          <p className="mt-2 text-[10px] sm:text-xs font-medium text-white/80">✨ {inSummaryCount}개가 현재 요약 반영됨</p>
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
  return (
    <section className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="relative w-full md:w-96 hidden md:block">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </span>
        <input
          type="text"
          placeholder="기록된 내용을 검색해 보세요 (준비 중)..."
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
          <option value="all">모든 템플릿의 기록 보기</option>
          {templateOptions.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.title}
            </option>
          ))}
        </select>
        {templateFilter !== 'all' && (
          <button type="button" onClick={onReset} className="text-sm font-semibold text-slate-500 hover:text-slate-800 whitespace-nowrap">초기화</button>
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
  const isInsideSummaryWindow = isRecordInsideSummaryWindow(record, summaryWindow);
  const isDraft = record.status === 'draft';
  const memoText = (record.childReflection?.trim() || record.parentMemo?.trim()) || "아직 작성된 메모가 없습니다.";

  if (isDraft) {
    return (
      <div className="flex flex-col gap-6 rounded-[12px] border border-primary/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(207,84,23,0.05)] transition-transform hover:translate-y-[-2px] md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-slate-500">
              Draft
            </span>
            <span className="text-xs italic text-slate-400">
              수정일 {formatRecordDateTime(record.updatedAt)}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-800">{record.templateTitleSnapshot}</h3>
          <p className="line-clamp-1 text-sm italic text-slate-500">&quot;{memoText}&quot;</p>
        </div>
        <Link
          href={`/my/records/${record.id}`}
          className="whitespace-nowrap rounded-[12px] bg-[#f4ece4] px-6 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-200 text-center"
        >
          Continue Writing
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-[12px] border border-primary/10 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(207,84,23,0.05)] transition-transform hover:translate-y-[-2px] md:flex-row md:items-center md:justify-between">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-400">
            {record.performedOn ? formatDateStamp(record.performedOn) : '날짜 미지정'}
          </span>
          {isInsideSummaryWindow && (
            <span className="rounded-full border border-primary/10 bg-primary/5 px-3 py-0.5 mt-0.5 text-[10px] font-bold text-primary">
              ✨ Currently in Summary
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
        Revisit Moment
      </Link>
    </div>
  );
}

function EmptyState({ hasFilters, onReset }: { hasFilters: boolean; onReset: () => void }) {
  return (
    <div className="pt-16 pb-24 text-center">
      <h3 className="mb-2 text-xl font-bold text-slate-800">
        {hasFilters ? '선택한 조건에 맞는 기록이 없습니다.' : '아직 저장된 기록이 없습니다.'}
      </h3>
      <p className="mb-6 text-slate-500">
        {hasFilters ? '필터를 다른 조건으로 변경하거나 초기화해 보세요.' : '새로운 기록으로 첫 페이지를 장식해 보세요.'}
      </p>
      {hasFilters ? (
        <button type="button" onClick={onReset} className="font-semibold text-primary underline-offset-4 hover:underline">
          필터 모두 풀기
        </button>
      ) : (
        <Link href="/templates" className="font-semibold text-primary underline-offset-4 hover:underline">
          새로운 활동 기록하기
        </Link>
      )}
    </div>
  );
}

function AuthRedirectState({ isLoadError, onRetry }: { isLoadError?: boolean, onRetry?: () => void }) {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center text-center px-4">
      <span className="material-symbols-outlined text-4xl text-slate-300 mb-4">error</span>
      <h3 className="text-lg font-bold text-slate-800 mb-2">
        {isLoadError ? '목록을 불러올 수 없습니다' : '로그인 화면으로 이동합니다'}
      </h3>
      <p className="text-slate-500 mb-6 text-sm">
        {isLoadError ? '기록을 가져오는 중 문제가 발생했습니다' : '내 기록을 보려면 로그인이 필요합니다'}
      </p>
      {isLoadError && onRetry && (
        <button type="button" onClick={onRetry} className="rounded-full bg-primary px-6 py-2 text-white font-bold transition-all hover:bg-primary/90">
          다시 불러오기
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

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.replace(buildLoginHref('/my/records'));
    }
  }, [authStatus, router]);

  if (authStatus === 'loading' || (recordsStatus === 'loading' && authStatus === 'authenticated')) {
    return (
      <div className="min-h-screen bg-[#fcfaf7] font-sans antialiased">
        <GlobalTopBar active="workspace" variant="workspace" action={{ href: '/templates', icon: 'filter_vintage', label: '템플릿 둘러보기', tone: 'secondary' }} />
        <RecordsWorkspaceShell active="records" />
        <AuthLoadingState />
      </div>
    );
  }

  if (authStatus === 'error' || recordsStatus === 'error') {
    return (
      <div className="min-h-screen bg-[#fcfaf7] font-sans antialiased">
        <GlobalTopBar active="workspace" variant="workspace" action={{ href: '/templates', icon: 'filter_vintage', label: '템플릿 둘러보기', tone: 'secondary' }} />
        <RecordsWorkspaceShell active="records" />
        <AuthRedirectState isLoadError onRetry={authStatus === 'error' ? retryAuth : retryRecords} />
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#fcfaf7] font-sans antialiased">
        <GlobalTopBar active="workspace" variant="workspace" action={{ href: '/templates', icon: 'filter_vintage', label: '템플릿 둘러보기', tone: 'secondary' }} />
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
      <GlobalTopBar active="workspace" variant="workspace" action={{ href: '/templates', icon: 'filter_vintage', label: '템플릿 둘러보기', tone: 'secondary' }} />
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
                모든 템플릿 활동 둘러보기
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
