'use client';

import {
  COMPETENCIES,
  GRADE_BANDS,
  PYP_THEMES,
  type Competency,
  type GradeBand,
  type PypTheme,
} from '@/lib/templates/template-types';
import type { TemplateFilters } from '@/lib/utils/filters';

const GRADE_BAND_LABELS = {
  all: '전체 학년',
  g1_2: '초1-2',
  g3_4: '초3-4',
  g5_6: '초5-6',
} satisfies Record<'all' | GradeBand, string>;

const COMPETENCY_LABELS = {
  all: '전체 역량',
  literacy: '문해',
  thinking: '사고력',
  expression: '표현',
  collaboration: '협력',
  digital_literacy: '디지털 문해',
} satisfies Record<'all' | Competency, string>;

const PYP_THEME_LABELS = {
  all: '전체 PYP 주제',
  who_we_are: '우리는 누구인가',
  where_we_are_in_place_and_time: '우리는 시공간 속에서 어디에 있는가',
  how_we_express_ourselves: '우리는 자신을 어떻게 표현하는가',
  how_the_world_works: '세상은 어떻게 작동하는가',
  how_we_organize_ourselves: '우리는 어떻게 조직하는가',
  sharing_the_planet: '지구를 함께 나누기',
} satisfies Record<'all' | PypTheme, string>;

interface TemplateLibraryFiltersProps {
  filters: TemplateFilters;
  onChange: (nextFilters: TemplateFilters) => void;
  onReset: () => void;
}

export function TemplateLibraryFilters({
  filters,
  onChange,
  onReset,
}: TemplateLibraryFiltersProps) {
  return (
    <section className="rounded-[1.9rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
            Templates
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            지금 우리 아이에게 맞는 활동 템플릿을 찾아보세요.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            로그인한 계정에서만 열 수 있는 템플릿 모음입니다. 제목, 학년, 역량, PYP 주제로
            범위를 좁혀서 바로 기록 시작 화면으로 이동할 수 있어요.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
        >
          필터 초기화
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          제목 검색
          <input
            type="search"
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
            placeholder="예: 의견, 자연"
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-base text-slate-700 outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          학년
          <select
            value={filters.gradeBand}
            onChange={(event) =>
              onChange({ ...filters, gradeBand: event.target.value as TemplateFilters['gradeBand'] })
            }
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-base text-slate-700 outline-none"
          >
            <option value="all">{GRADE_BAND_LABELS.all}</option>
            {GRADE_BANDS.map((gradeBand) => (
              <option key={gradeBand} value={gradeBand}>
                {GRADE_BAND_LABELS[gradeBand]}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          역량
          <select
            value={filters.competency}
            onChange={(event) =>
              onChange({
                ...filters,
                competency: event.target.value as TemplateFilters['competency'],
              })
            }
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-base text-slate-700 outline-none"
          >
            <option value="all">{COMPETENCY_LABELS.all}</option>
            {COMPETENCIES.map((competency) => (
              <option key={competency} value={competency}>
                {COMPETENCY_LABELS[competency]}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          PYP 주제
          <select
            value={filters.pypTheme}
            onChange={(event) =>
              onChange({ ...filters, pypTheme: event.target.value as TemplateFilters['pypTheme'] })
            }
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-base text-slate-700 outline-none"
          >
            <option value="all">{PYP_THEME_LABELS.all}</option>
            {PYP_THEMES.map((pypTheme) => (
              <option key={pypTheme} value={pypTheme}>
                {PYP_THEME_LABELS[pypTheme]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
