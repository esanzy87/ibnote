'use client';

import { useTranslations } from 'next-intl';
import type { TemplateLibraryFilter } from '@/lib/templates/template-experience';
import type { TemplateFilters } from '@/lib/utils/filters';

const FILTER_OPTIONS_BASE = [
  { value: 'all', icon: 'auto_awesome' },
  { value: 'conversational_check_ins', icon: 'self_improvement' },
  { value: 'notice_pattern_sort', icon: 'visibility' },
  { value: 'supporting', icon: 'palette' },
] as const;

export function getTemplateLibraryFilterOption(value: TemplateLibraryFilter) {
  return FILTER_OPTIONS_BASE.find((option) => option.value === value) ?? FILTER_OPTIONS_BASE[0];
}

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
  const t = useTranslations('templates.filters');
  const tCluster = useTranslations('activityCluster');

  return (
    <div className="mb-12 space-y-6">
      <div className="relative max-w-2xl">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>
        <input
          type="text"
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          placeholder={t('searchPlaceholder')}
          className="w-full rounded-xl border-none bg-white py-4 pl-12 pr-4 text-slate-900 shadow-sm transition-all focus:ring-2 focus:ring-primary/40"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS_BASE.map((option) => {
          const isSelected = option.value === filters.cluster;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange({ ...filters, cluster: option.value })}
              className={`flex items-center gap-2 rounded-full px-5 py-2 font-medium transition-colors ${
                isSelected
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-primary/50'
              }`}
            >
              {option.value !== 'all' && (
                <span className="material-symbols-outlined text-sm">{option.icon}</span>
              )}
              {tCluster(option.value as any)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
