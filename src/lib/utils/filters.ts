import {
  matchesTemplateLibraryFilter,
  type EnrichedWorksheetTemplate,
  type TemplateLibraryFilter,
} from '../templates/template-experience';

export interface TemplateFilters {
  search: string;
  cluster: TemplateLibraryFilter;
}

export const DEFAULT_TEMPLATE_FILTERS: TemplateFilters = {
  search: '',
  cluster: 'all',
};

function normalizeSearchValue(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function matchesTemplateFilters(
  template: EnrichedWorksheetTemplate,
  filters: TemplateFilters,
): boolean {
  const normalizedSearch = normalizeSearchValue(filters.search);
  const searchableText = [
    template.title,
    template.summary,
    template.parentSummary,
    template.bigQuestion,
    template.quickStart,
    ...template.familyMoments,
    ...template.recordFocus,
  ]
    .join(' ')
    .toLocaleLowerCase();

  if (normalizedSearch && !searchableText.includes(normalizedSearch)) {
    return false;
  }

  if (!matchesTemplateLibraryFilter(template, filters.cluster)) {
    return false;
  }

  return true;
}

export function filterTemplates(
  templates: EnrichedWorksheetTemplate[],
  filters: TemplateFilters,
): EnrichedWorksheetTemplate[] {
  return templates.filter((template) => matchesTemplateFilters(template, filters));
}
