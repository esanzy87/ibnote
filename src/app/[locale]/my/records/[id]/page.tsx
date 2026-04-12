import { RecordEditor } from '@/components/records/record-editor';

type RecordEditorPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecordEditorPage({ params }: RecordEditorPageProps) {
  const { id } = await params;

  return <RecordEditor recordId={id} />;
}
