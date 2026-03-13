import { getPostLoginPath } from '@/lib/auth/ensure-auth';
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
  const nextTarget = getPostLoginPath(getNextValue(resolvedSearchParams.next));

  return <LoginForm nextTarget={nextTarget} />;
}
