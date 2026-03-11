'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { PrintButton } from '@/components/ui/print-button';
import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import type { WorksheetTemplate } from '@/lib/templates/template-types';

const GRADE_BAND_LABELS = {
  g1_2: '초1-2',
  g3_4: '초3-4',
  g5_6: '초5-6',
} satisfies Record<WorksheetTemplate['gradeBand'], string>;

const PYP_THEME_LABELS = {
  who_we_are: '우리는 누구인가',
  where_we_are_in_place_and_time: '우리는 시공간 속에서 어디에 있는가',
  how_we_express_ourselves: '우리는 자신을 어떻게 표현하는가',
  how_the_world_works: '세상은 어떻게 작동하는가',
  how_we_organize_ourselves: '우리는 어떻게 조직하는가',
  sharing_the_planet: '지구를 함께 나누기',
} satisfies Record<WorksheetTemplate['pypTheme'], string>;

const COMPETENCY_LABELS = {
  literacy: '문해',
  thinking: '사고력',
  expression: '표현',
  collaboration: '협력',
  digital_literacy: '디지털 문해',
} satisfies Record<WorksheetTemplate['competencies'][number], string>;

interface ProtectedTemplateDetailProps {
  slug: string;
  template: WorksheetTemplate | null;
}

function DetailLoadingState() {
  return (
    <section className="rounded-[1.9rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Template detail</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        템플릿 내용을 불러오는 중입니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        로그인 상태를 확인한 뒤 선택한 템플릿의 활동 내용을 준비하고 있습니다.
      </p>
      <div className="mt-8 space-y-4">
        <div className="h-14 animate-pulse rounded-3xl border border-stone-200 bg-stone-50" />
        <div className="h-52 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
        <div className="h-52 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
      </div>
    </section>
  );
}

function DetailErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <section className="rounded-[1.9rem] border border-rose-200 bg-rose-50 p-8 shadow-sm sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">Auth error</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
        템플릿 상세 화면을 열지 못했습니다.
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

function DetailRedirectingState() {
  return (
    <section className="rounded-[1.9rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Redirecting</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        로그인 화면으로 이동하고 있습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        선택한 템플릿을 보려면 먼저 로그인해야 합니다. 잠시 후 로그인 화면으로 이동합니다.
      </p>
    </section>
  );
}

function InvalidTemplateState({ slug }: { slug: string }) {
  return (
    <section className="rounded-[1.9rem] border border-dashed border-stone-300 bg-stone-50 p-8 text-center shadow-sm sm:p-10">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Template not found</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        이 템플릿을 찾을 수 없습니다.
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
        `{slug}` 슬러그에 해당하는 게시 템플릿이 없거나 더 이상 공개되지 않았습니다.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          템플릿 목록으로 돌아가기
        </Link>
        <Link
          href="/login?next=/templates"
          className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
        >
          로그인 화면 보기
        </Link>
      </div>
    </section>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="template-print-card rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">{children}</div>
    </section>
  );
}

function TemplateDetailContent({ template }: { template: WorksheetTemplate }) {
  return (
    <>
      <section className="template-print-card rounded-[1.9rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Template detail</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {template.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">{template.summary}</p>
          </div>

          <div className="template-print-card grid gap-3 rounded-[1.75rem] border border-stone-200 bg-stone-50 p-4 text-sm text-slate-700 sm:min-w-72">
            <p className="font-medium text-slate-900">기본 정보</p>
            <p>학년: {GRADE_BAND_LABELS[template.gradeBand]}</p>
            <p>활동 시간: {template.durationMinutes}분</p>
            <p>PYP 주제: {PYP_THEME_LABELS[template.pypTheme]}</p>
            <p>버전: {template.version}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {template.competencies.map((competency) => (
            <span
              key={competency}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-950"
            >
              {COMPETENCY_LABELS[competency]}
            </span>
          ))}
        </div>

        <div className="print-hidden mt-8 flex flex-wrap items-center gap-3 border-t border-stone-200 pt-6">
          <Link
            href={`/my/records/new?template=${encodeURIComponent(template.slug)}`}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            기록 시작
          </Link>
          <PrintButton className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900" />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <DetailSection title="큰 질문">
          <p>{template.bigQuestion}</p>
        </DetailSection>

        <DetailSection title="준비물">
          <ul className="space-y-2 pl-5">
            {template.materials.map((material) => (
              <li key={material} className="list-disc">
                {material}
              </li>
            ))}
          </ul>
        </DetailSection>
      </section>

      <DetailSection title="활동 순서">
        <ol className="space-y-3 pl-5">
          {template.steps.map((step) => (
            <li key={step} className="list-decimal">
              {step}
            </li>
          ))}
        </ol>
      </DetailSection>

      <section className="grid gap-6 xl:grid-cols-2">
        <DetailSection title="생각해 보기">
          <p>{template.thinkingPrompt}</p>
        </DetailSection>

        <DetailSection title="쓰기/그리기/설명하기">
          <p>{template.outputPrompt}</p>
        </DetailSection>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <DetailSection title="되돌아보기 질문">
          <ul className="space-y-2 pl-5">
            {template.reflectionQuestions.map((question) => (
              <li key={question} className="list-disc">
                {question}
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection title="부모 관찰 체크리스트">
          <ul className="space-y-2 pl-5">
            {template.checklist.map((item) => (
              <li key={item} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </DetailSection>
      </section>

      <DetailSection title="간단 루브릭">
        <div className="grid gap-4">
          {template.rubric.map((rubricEntry) => (
            <article
              key={rubricEntry.competency}
              className="template-print-card rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {COMPETENCY_LABELS[rubricEntry.competency]}
              </h3>
              <div className="template-print-rubric mt-4 grid gap-3 md:grid-cols-5">
                {(['A', 'B', 'C', 'D', 'E'] as const).map((level) => (
                  <div
                    key={level}
                    className="template-print-card rounded-2xl border border-stone-200 bg-white p-3"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                      {level}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {rubricEntry.levels[level]}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </DetailSection>
    </>
  );
}

export function ProtectedTemplateDetail({ slug, template }: ProtectedTemplateDetailProps) {
  const router = useRouter();
  const { status, error, retry } = useAuthUser();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(buildLoginHref(`/templates/${slug}`));
    }
  }, [router, slug, status]);

  return (
    <main className="template-print-page bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
      <div className="template-print-root mx-auto flex max-w-6xl flex-col gap-6">
        {status === 'loading' ? <DetailLoadingState /> : null}

        {status === 'error' ? (
          <DetailErrorState
            message={error?.message ?? '인증 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'}
            onRetry={retry}
          />
        ) : null}

        {status === 'unauthenticated' ? <DetailRedirectingState /> : null}

        {status === 'authenticated' && template ? <TemplateDetailContent template={template} /> : null}

        {status === 'authenticated' && !template ? <InvalidTemplateState slug={slug} /> : null}
      </div>
    </main>
  );
}
