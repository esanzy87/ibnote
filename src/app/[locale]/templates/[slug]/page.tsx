import { ProtectedTemplateDetail } from '@/components/templates/protected-template-detail';
import { getPublishedTemplateSlugs, getTemplateBySlug } from '@/lib/templates/template-repo';

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
  const template = getTemplateBySlug(slug);

  return <ProtectedTemplateDetail slug={slug} template={template} />;
}
