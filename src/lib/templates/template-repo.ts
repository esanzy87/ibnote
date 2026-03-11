import type { WorksheetTemplate } from './template-types';

import { TEMPLATE_LIST } from '../../content/templates/template-list';

export function getAllTemplates(): WorksheetTemplate[] {
  return TEMPLATE_LIST.slice();
}

export function getPublishedTemplates(): WorksheetTemplate[] {
  return TEMPLATE_LIST.filter((template) => template.isPublished);
}

export function getPublishedTemplateSlugs(): string[] {
  return getPublishedTemplates().map((template) => template.slug);
}

export function getTemplateBySlug(slug: string): WorksheetTemplate | null {
  return getPublishedTemplates().find((template) => template.slug === slug) ?? null;
}
