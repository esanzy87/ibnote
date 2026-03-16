import { enrichTemplate, type EnrichedWorksheetTemplate } from './template-experience';

import { TEMPLATE_LIST } from '../../content/templates/template-list';

export function getAllTemplates(): EnrichedWorksheetTemplate[] {
  return TEMPLATE_LIST.map((template) => enrichTemplate(template));
}

export function getPublishedTemplates(): EnrichedWorksheetTemplate[] {
  return getAllTemplates().filter((template) => template.isPublished);
}

export function getPublishedTemplateSlugs(): string[] {
  return getPublishedTemplates().map((template) => template.slug);
}

export function getTemplateBySlug(slug: string): EnrichedWorksheetTemplate | null {
  return getPublishedTemplates().find((template) => template.slug === slug) ?? null;
}
