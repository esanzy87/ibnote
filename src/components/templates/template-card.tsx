'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { getTemplatePhase4Asset } from '@/lib/assets/phase4-route-images';
import type { EnrichedWorksheetTemplate } from '@/lib/templates/template-experience';

interface TemplateCardProps {
  template: EnrichedWorksheetTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const t = useTranslations('templates.card');
  const tCluster = useTranslations('activityCluster');
  const imageAsset = getTemplatePhase4Asset(template.slug);

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-primary/5">
        {imageAsset ? (
          <>
            <Image
              src={imageAsset.src}
              alt={imageAsset.alt}
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 40vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent" />
          </>
        ) : (
          <span className="material-symbols-outlined text-4xl text-primary/20 transition-transform duration-500 group-hover:scale-110">
            {template.activityCluster === 'conversational_check_ins' ? 'chat' :
             template.activityCluster === 'notice_pattern_sort' ? 'visibility' : 'extension'}
          </span>
        )}
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
          {t('durationSuffix', { minutes: template.durationMinutes })}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            {tCluster(template.activityCluster as any)}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary">
          {template.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {template.parentSummary}
        </p>
        <Link
          href={`/templates/${template.slug}` as any}
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary/10 py-2.5 font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white"
        >
          {t('btnOpen')}
        </Link>
      </div>
    </article>
  );
}
