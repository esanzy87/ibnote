import { TemplateLibraryClient } from '@/components/templates/template-library-client';
import { getPublishedTemplates } from '@/lib/templates/template-repo';
import { getLocale } from 'next-intl/server';
import { isSupportedLocale } from '@/lib/templates/template-localization';

export default async function TemplatesPage() {
  const locale = await getLocale();
  const publishedTemplates = getPublishedTemplates(isSupportedLocale(locale) ? locale : 'ko');

  return <TemplateLibraryClient templates={publishedTemplates} />;
}
