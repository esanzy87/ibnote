import { enrichTemplate, type EnrichedWorksheetTemplate } from './template-experience';
import { localizeTemplateFields, type SupportedLocale } from './template-localization';

import { TEMPLATE_LIST } from '../../content/templates/template-list';

export function getAllTemplates(locale: SupportedLocale): EnrichedWorksheetTemplate[] {
  return TEMPLATE_LIST.map((template) => enrichTemplate(localizeTemplateFields(template, locale), locale));
}

export function getPublishedTemplates(locale: SupportedLocale): EnrichedWorksheetTemplate[] {
  return getAllTemplates(locale).filter((template) => template.isPublished);
}

export function getPublishedTemplateSlugs(): string[] {
  return TEMPLATE_LIST.filter((template) => template.isPublished).map((template) => template.slug);
}

export function getTemplateBySlug(slug: string, locale: SupportedLocale): EnrichedWorksheetTemplate | null {
  return getPublishedTemplates(locale).find((template) => template.slug === slug) ?? null;
}
