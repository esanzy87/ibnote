import { TemplateLibraryClient } from '@/components/templates/template-library-client';
import { getPublishedTemplates } from '@/lib/templates/template-repo';

export default function TemplatesPage() {
  const publishedTemplates = getPublishedTemplates();

  return <TemplateLibraryClient templates={publishedTemplates} />;
}
