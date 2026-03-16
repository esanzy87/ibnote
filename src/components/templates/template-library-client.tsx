'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

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
import { DEFAULT_TEMPLATE_FILTERS, filterTemplates, type TemplateFilters } from '@/lib/utils/filters';

interface TemplateLibraryClientProps {
  templates: EnrichedWorksheetTemplate[];
}

function AuthLoadingState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="animate-pulse text-primary">
        <span className="material-symbols-outlined text-5xl">auto_stories</span>
      </div>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">템플릿 보관함을 불러오고 있습니다...</h1>
    </div>
  );
}

function RedirectingState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-primary">
        <span className="material-symbols-outlined text-5xl">lock</span>
      </div>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">로그인하고 있습니다...</h1>
      <p className="mt-2 text-slate-600">템플릿 보관함은 로그인한 사용자만 이용할 수 있습니다.</p>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/30 p-12 text-center">
      <span className="material-symbols-outlined mb-4 text-5xl text-slate-300">search_off</span>
      <p className="font-medium text-slate-500">찾으시는 활동이 없습니다.</p>
      <p className="mb-6 text-sm text-slate-400">다른 검색어나 필터를 선택해 보세요.</p>
      <button 
        onClick={onReset}
        className="text-sm font-bold text-primary hover:underline"
      >
        필터 초기화하기
      </button>
    </div>
  );
}

export function TemplateLibraryClient({ templates }: TemplateLibraryClientProps) {
  const router = useRouter();
  const { status } = useAuthUser();
  const [filters, setFilters] = useState<TemplateFilters>(DEFAULT_TEMPLATE_FILTERS);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(buildLoginHref('/templates'));
    }
  }, [router, status]);

  const filteredTemplates = useMemo(() => filterTemplates(templates, filters), [templates, filters]);
  const sections = useMemo(
    () => buildTemplateLibrarySections(filteredTemplates),
    [filteredTemplates],
  );

  if (status === 'loading') return <AuthLoadingState />;
  if (status === 'unauthenticated') return <RedirectingState />;

  return (
    <div className="flex min-h-screen flex-col bg-background-light">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-black text-slate-900 md:text-4xl">아이와의 대화를 시작해 보세요</h1>
          <p className="max-w-2xl text-lg text-slate-600">오늘 해 보기 좋은 활동을 하나 골라 가볍게 기록해 보세요. 차곡차곡 쌓인 기록이 아이의 성장을 더 따뜻하게 보여 줄 거예요.</p>
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
            <p className="text-lg font-semibold text-slate-800">지금 이 순간 하나면 충분합니다.</p>
            <p className="mt-1 text-slate-600">모든 활동을 다 해야 한다는 부담은 내려놓으셔도 좋아요. 오늘 아이와 가장 나누고 싶은 대화 하나에만 집중해 보는 것만으로도 충분합니다.</p>
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
                    {section.label}
                  </h2>
                  <span className="text-sm font-medium text-slate-400">{section.templates.length}개의 활동</span>
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
    </div>
  );
}
