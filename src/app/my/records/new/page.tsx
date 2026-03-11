import { CreateRecordTransition } from '@/components/records/create-record-transition';

type NewRecordPageProps = {
  searchParams?:
    | Promise<{
        template?: string | string[] | undefined;
      }>
    | {
        template?: string | string[] | undefined;
      };
};

function getTemplateQueryValue(templateValue: string | string[] | undefined): string | null {
  if (Array.isArray(templateValue)) {
    return templateValue[0] ?? null;
  }

  return templateValue ?? null;
}

export default async function NewRecordPage({ searchParams }: NewRecordPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const templateSlug = getTemplateQueryValue(resolvedSearchParams.template);

  return <CreateRecordTransition templateSlug={templateSlug} />;
}
