'use client';

import Link from 'next/link';

import {
  ACTIVITY_CLUSTER_LABELS,
  type EnrichedWorksheetTemplate,
} from '@/lib/templates/template-experience';

interface TemplateCardProps {
  template: EnrichedWorksheetTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden bg-primary/5 flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-primary/20 transition-transform duration-500 group-hover:scale-110">
          {template.activityCluster === 'conversational_check_ins' ? 'chat' : 
           template.activityCluster === 'notice_pattern_sort' ? 'visibility' : 'extension'}
        </span>
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
          {template.durationMinutes}분
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            {ACTIVITY_CLUSTER_LABELS[template.activityCluster]}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
          {template.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {template.parentSummary}
        </p>
        <Link 
          href={`/templates/${template.slug}`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary/10 py-2.5 font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white"
        >
          열어보기
        </Link>
      </div>
    </article>
  );
}
