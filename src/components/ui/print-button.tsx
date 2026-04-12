import { useTranslations } from 'next-intl';

interface PrintButtonProps {
  className?: string;
}

export function PrintButton({ className }: PrintButtonProps) {
  const t = useTranslations('common');
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
    >
      {t('print')}
    </button>
  );
}
