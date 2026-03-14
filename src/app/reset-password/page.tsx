import { buildLoginHref, normalizeNextPath } from '@/lib/auth/ensure-auth';
import { PasswordResetRequestForm } from '@/components/ui/password-reset-request-form';

type ResetPasswordPageProps = {
  searchParams?: Promise<{
    next?: string | string[] | undefined;
  }>;
};

type ResetPasswordSearchParams = {
  next?: string | string[] | undefined;
};

function getNextValue(nextValue: string | string[] | undefined): string | null {
  if (Array.isArray(nextValue)) {
    return nextValue[0] ?? null;
  }

  return nextValue ?? null;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const resolvedSearchParams: ResetPasswordSearchParams = searchParams ? await searchParams : {};
  const requestedNextTarget = normalizeNextPath(getNextValue(resolvedSearchParams.next));
  const returnToLoginHref = buildLoginHref(requestedNextTarget);

  return <PasswordResetRequestForm returnToLoginHref={returnToLoginHref} />;
}
