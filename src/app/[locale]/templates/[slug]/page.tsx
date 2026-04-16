import { ProtectedTemplateDetail } from '@/components/templates/protected-template-detail';
import { getPublishedTemplateSlugs, getTemplateBySlug } from '@/lib/templates/template-repo';
import { getLocale } from 'next-intl/server';
import { isSupportedLocale } from '@/lib/templates/template-localization';

type TemplateDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedTemplateSlugs().map((slug) => ({ slug }));
}

export default async function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const template = getTemplateBySlug(slug, isSupportedLocale(locale) ? locale : 'ko');

  return <ProtectedTemplateDetail slug={slug} template={template} />;
}
