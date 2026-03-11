'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { TemplateCard } from '@/components/templates/template-card';
import { TemplateLibraryFilters } from '@/components/templates/template-library-filters';
import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import type { WorksheetTemplate } from '@/lib/templates/template-types';
import { DEFAULT_TEMPLATE_FILTERS, filterTemplates, type TemplateFilters } from '@/lib/utils/filters';

interface TemplateLibraryClientProps {
  templates: WorksheetTemplate[];
}

function AuthLoadingState() {
  return (
    <section className="rounded-[1.9rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Templates</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        계정 상태를 확인하는 중입니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        보호된 템플릿 라이브러리를 열기 전에 로그인 상태를 먼저 확인하고 있습니다.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50"
          />
        ))}
      </div>
    </section>
  );
}

function AuthErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <section className="rounded-[1.9rem] border border-rose-200 bg-rose-50 p-8 shadow-sm sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">Auth error</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
        템플릿 라이브러리를 여는 중 문제가 생겼습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-rose-900 sm:text-base">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-rose-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-800"
      >
        다시 시도
      </button>
    </section>
  );
}

function RedirectingState() {
  return (
    <section className="rounded-[1.9rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Redirecting</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        로그인 화면으로 이동하고 있습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        템플릿 라이브러리는 로그인한 계정에서만 사용할 수 있어요. 잠시 후 로그인 화면으로
        이동합니다.
      </p>
    </section>
  );
}

function EmptyState({ hasFilters, onReset }: { hasFilters: boolean; onReset: () => void }) {
  return (
    <section className="rounded-[1.9rem] border border-dashed border-stone-300 bg-stone-50 p-8 text-center sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">No matches</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
        {hasFilters ? '조건에 맞는 템플릿이 아직 없습니다.' : '게시된 템플릿이 아직 없습니다.'}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
        {hasFilters
          ? '검색어나 필터를 조금 넓혀서 다시 찾아보세요.'
          : '템플릿이 게시되면 이곳에서 바로 둘러볼 수 있습니다.'}
      </p>
      {hasFilters ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          전체 템플릿 다시 보기
        </button>
      ) : null}
    </section>
  );
}

export function TemplateLibraryClient({ templates }: TemplateLibraryClientProps) {
  const router = useRouter();
  const { status, error, retry } = useAuthUser();
  const [filters, setFilters] = useState<TemplateFilters>(DEFAULT_TEMPLATE_FILTERS);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(buildLoginHref('/templates'));
    }
  }, [router, status]);

  const filteredTemplates = useMemo(() => filterTemplates(templates, filters), [templates, filters]);
  const hasActiveFilters =
    filters.search.trim().length > 0 ||
    filters.gradeBand !== 'all' ||
    filters.competency !== 'all' ||
    filters.pypTheme !== 'all';

  return (
    <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {status === 'loading' ? <AuthLoadingState /> : null}

        {status === 'error' ? (
          <AuthErrorState
            message={error?.message ?? '인증 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'}
            onRetry={retry}
          />
        ) : null}

        {status === 'unauthenticated' ? <RedirectingState /> : null}

        {status === 'authenticated' ? (
          <>
            <TemplateLibraryFilters
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(DEFAULT_TEMPLATE_FILTERS)}
            />

            <section className="grid gap-4 rounded-[1.9rem] border border-stone-200 bg-gradient-to-br from-white to-stone-50 p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
                  Current view
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                  {filteredTemplates.length}개의 템플릿이 준비되어 있어요.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  지금은 저장된 정적 템플릿만 보여주며, 필터는 페이지 이동 없이 바로 반영됩니다.
                </p>
              </div>

              <div className="grid gap-3 rounded-[1.5rem] border border-stone-200 bg-white/80 p-4 text-sm text-slate-600">
                <p className="font-medium text-slate-900">빠른 확인</p>
                <p>검색: 제목 기준 부분 일치</p>
                <p>학년/역량/PYP 주제: 클라이언트 즉시 필터</p>
                <p>보호 경로: 비로그인 상태면 `/login?next=/templates`로 이동</p>
              </div>
            </section>

            {filteredTemplates.length === 0 ? (
              <EmptyState hasFilters={hasActiveFilters} onReset={() => setFilters(DEFAULT_TEMPLATE_FILTERS)} />
            ) : (
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.slug} template={template} />
                ))}
              </section>
            )}
          </>
        ) : null}
      </div>
    </main>
  );
}
