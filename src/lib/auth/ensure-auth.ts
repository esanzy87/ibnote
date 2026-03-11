import type { User } from 'firebase/auth';

const DEFAULT_POST_LOGIN_PATH = '/templates';

export function normalizeNextPath(nextPath: string | null | undefined): string | null {
  if (!nextPath || !nextPath.startsWith('/')) {
    return null;
  }

  if (nextPath.startsWith('//')) {
    return null;
  }

  return nextPath;
}

export function buildLoginHref(nextPath: string | null | undefined): string {
  const safeNextPath = normalizeNextPath(nextPath);

  if (!safeNextPath) {
    return '/login';
  }

  return `/login?next=${encodeURIComponent(safeNextPath)}`;
}

export function getPostLoginPath(nextPath: string | null | undefined): string {
  return normalizeNextPath(nextPath) ?? DEFAULT_POST_LOGIN_PATH;
}

export function ensureAuthenticatedUser(
  user: User | null,
  nextPath: string,
  redirectToLogin: (href: string) => never,
): User {
  if (!user) {
    redirectToLogin(buildLoginHref(nextPath));
  }

  return user;
}
