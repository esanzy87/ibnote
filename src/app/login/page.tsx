import { getPostLoginPath, normalizeNextPath } from '@/lib/auth/ensure-auth';
import { LoginForm } from '@/components/ui/login-form';

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string | string[] | undefined;
  }>;
};

type LoginSearchParams = {
  next?: string | string[] | undefined;
};

function getNextValue(nextValue: string | string[] | undefined): string | null {
  if (Array.isArray(nextValue)) {
    return nextValue[0] ?? null;
  }

  return nextValue ?? null;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams: LoginSearchParams = searchParams ? await searchParams : {};
  const requestedNextTarget = normalizeNextPath(getNextValue(resolvedSearchParams.next));
  const nextTarget = getPostLoginPath(requestedNextTarget);

  return <LoginForm nextTarget={nextTarget} requestedNextTarget={requestedNextTarget} />;
}
