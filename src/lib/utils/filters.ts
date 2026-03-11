import type { Competency, GradeBand, PypTheme, WorksheetTemplate } from '../templates/template-types';

export type TemplateFilterOption<T extends string> = T | 'all';

export interface TemplateFilters {
  search: string;
  gradeBand: TemplateFilterOption<GradeBand>;
  competency: TemplateFilterOption<Competency>;
  pypTheme: TemplateFilterOption<PypTheme>;
}

export const DEFAULT_TEMPLATE_FILTERS: TemplateFilters = {
  search: '',
  gradeBand: 'all',
  competency: 'all',
  pypTheme: 'all',
};

function normalizeSearchValue(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function matchesTemplateFilters(
  template: WorksheetTemplate,
  filters: TemplateFilters,
): boolean {
  const normalizedSearch = normalizeSearchValue(filters.search);

  if (normalizedSearch && !template.title.toLocaleLowerCase().includes(normalizedSearch)) {
    return false;
  }

  if (filters.gradeBand !== 'all' && template.gradeBand !== filters.gradeBand) {
    return false;
  }

  if (
    filters.competency !== 'all' &&
    !template.competencies.includes(filters.competency)
  ) {
    return false;
  }

  if (filters.pypTheme !== 'all' && template.pypTheme !== filters.pypTheme) {
    return false;
  }

  return true;
}

export function filterTemplates(
  templates: WorksheetTemplate[],
  filters: TemplateFilters,
): WorksheetTemplate[] {
  return templates.filter((template) => matchesTemplateFilters(template, filters));
}
