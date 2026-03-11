import Link from 'next/link';

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

interface TemplateCardProps {
  template: WorksheetTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-950">
          {GRADE_BAND_LABELS[template.gradeBand]}
        </span>
        <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1">
          {template.durationMinutes}분
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
        {template.title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-600">{template.summary}</p>

      <dl className="mt-5 grid gap-3 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 text-sm text-slate-600">
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">주제</dt>
          <dd className="mt-1 text-sm font-medium text-slate-800">{PYP_THEME_LABELS[template.pypTheme]}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">핵심 질문</dt>
          <dd className="mt-1 leading-6 text-slate-700">{template.bigQuestion}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {template.competencies.map((competency) => (
          <span
            key={competency}
            className="rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-medium text-slate-700"
          >
            {COMPETENCY_LABELS[competency]}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-stone-200 pt-5">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">IBNote template</p>
        <Link
          href={`/templates/${template.slug}`}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          열어보기
        </Link>
      </div>
    </article>
  );
}
