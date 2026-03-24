const DEFAULT_DEV_AUTH_UID = 'z4a6HfSVJocK1SeBNSMs7LPHXoi1';
const DEFAULT_DEV_AUTH_EMAIL = 'ibnote.test01@tigsgit.com';
const DEFAULT_DEV_AUTH_PASSWORD = '1q2w3e4r';

export function isLocalDevAuthHostname(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

export function isDevAuthBypassEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS_ENABLED === 'true' &&
    process.env.NODE_ENV === 'development'
  );
}

export function getConfiguredDevAuthBypassUid(): string {
  return process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS_UID?.trim() || DEFAULT_DEV_AUTH_UID;
}

export function getConfiguredDevAuthBypassEmail(): string {
  return process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS_EMAIL?.trim() || DEFAULT_DEV_AUTH_EMAIL;
}

export function getConfiguredDevAuthBypassPassword(): string {
  return process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS_PASSWORD?.trim() || DEFAULT_DEV_AUTH_PASSWORD;
}

export function getDevAuthBypassUid(): string | null {
  if (!isDevAuthBypassEnabled()) {
    return null;
  }

  if (typeof window !== 'undefined' && !isLocalDevAuthHostname(window.location.hostname)) {
    return null;
  }

  return getConfiguredDevAuthBypassUid();
}
