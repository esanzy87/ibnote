'use client';

import type { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import { getFirebaseAuth } from '@/lib/firebase/auth';
import { deleteUserStoredData } from '@/lib/records/record-repo';

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">{children}</div>
    </main>
  );
}

function Surface({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'error' }) {
  const className =
    tone === 'error'
      ? 'rounded-[1.9rem] border border-rose-200 bg-rose-50 p-8 shadow-sm sm:p-10'
      : 'rounded-[1.9rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10';

  return <section className={className}>{children}</section>;
}

function AuthLoadingState() {
  const t = useTranslations('settings');
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">내 설정</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {t('loadingTitle')}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        {t('loadingDesc')}
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="h-40 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
        <div className="h-40 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
      </div>
    </Surface>
  );
}

function RedirectingState() {
  const t = useTranslations('settings');
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">로그인 필요</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        로그인 화면으로 이동하고 있습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        내 설정은 로그인한 계정에서만 볼 수 있어요. 잠시 후 로그인 화면으로 이동합니다.
      </p>
    </Surface>
  );
}

function AuthErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <Surface tone="error">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">인증 오류</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
        로그인 상태를 확인하지 못했습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-rose-900 sm:text-base">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-rose-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-800"
      >
        다시 시도
      </button>
    </Surface>
  );
}

function getAuthTypeLabel(user: User): string {
  const providerIds = user.providerData.map((provider) => provider.providerId);
  if (providerIds.includes('password')) return '이메일 / 비밀번호';
  return '확인되지 않음';
}

function AccountOwnershipCard({ user }: { user: User }) {
  const t = useTranslations('settings');
  const email = user.email?.trim() || '이메일 정보를 불러오지 못했습니다.';
  const authType = useMemo(() => getAuthTypeLabel(user), [user]);

  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">계정 정보</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {t('accountInfoTitle')}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        {t('accountInfoDesc')}
      </p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
          <dt className="text-sm font-medium text-slate-500">{t('authMethod')}</dt>
          <dd className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{authType}</dd>
        </div>

        <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
          <dt className="text-sm font-medium text-slate-500">{t('loginAccount')}</dt>
          <dd className="mt-2 break-all text-xl font-semibold tracking-tight text-slate-900">{email}</dd>
        </div>
      </dl>

      <div className="mt-6 rounded-[1.5rem] border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <p className="font-medium">{t('dataOwnershipTitle')}</p>
        <p className="mt-2">{t('dataOwnershipDesc')}</p>
      </div>
    </Surface>
  );
}

function SettingsActionCard({
  body, buttonLabel, buttonTone = 'default', confirmationMessage, disabled = false, helper, isWorking = false, message, messageTone = 'default', onClick, title,
}: {
  body: string; buttonLabel: string; buttonTone?: 'default' | 'danger'; confirmationMessage?: string; disabled?: boolean; helper: string; isWorking?: boolean; message: string | null; messageTone?: 'default' | 'error' | 'success'; onClick: () => Promise<void> | void; title: string;
}) {
  const buttonClassName = buttonTone === 'danger'
    ? 'inline-flex items-center justify-center rounded-full bg-rose-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:bg-rose-300'
    : 'inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400';
  const messageClassName = messageTone === 'error' ? 'text-rose-700' : messageTone === 'success' ? 'text-emerald-700' : 'text-slate-700';

  return (
    <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{body}</p>
      <button
        type="button"
        disabled={disabled || isWorking}
        onClick={async () => {
          if (confirmationMessage && !window.confirm(confirmationMessage)) return;
          await onClick();
        }}
        className={`mt-6 ${buttonClassName}`}
      >
        {isWorking ? '처리 중…' : buttonLabel}
      </button>
      <p className="mt-3 text-sm leading-6 text-slate-500">{helper}</p>
      {message ? <p className={`mt-2 text-sm font-medium ${messageClassName}`}>{message}</p> : null}
    </article>
  );
}

export function SettingsPageClient() {
  const t = useTranslations('settings');
  const router = useRouter();
  const { error: authError, retry: retryAuth, status: authStatus, user } = useAuthUser();
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'working' | 'success' | 'error'>('idle');
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [signOutStatus, setSignOutStatus] = useState<'idle' | 'working' | 'error'>('idle');
  const [signOutMessage, setSignOutMessage] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (authStatus === 'unauthenticated' && !isSigningOut) {
      router.replace(buildLoginHref('/my/settings') as any);
    }
  }, [authStatus, isSigningOut, router]);

  async function handleDeleteStoredData() {
    if (!user) return;
    setDeleteStatus('working');
    setDeleteMessage(null);
    try {
      await deleteUserStoredData(user.uid);
      setDeleteStatus('success');
      setDeleteMessage(t('deleteRecordsSuccess'));
      router.refresh();
    } catch {
      setDeleteStatus('error');
      setDeleteMessage(t('deleteRecordsError'));
    }
  }

  async function handleSignOut() {
    if (!user) return;
    setSignOutStatus('working');
    setSignOutMessage(null);
    setIsSigningOut(true);
    try {
      await signOut(getFirebaseAuth());
      router.replace('/');
    } catch {
      setIsSigningOut(false);
      setSignOutStatus('error');
      setSignOutMessage(t('logoutError'));
    }
  }

  if (authStatus === 'loading') return <PageFrame><AuthLoadingState /></PageFrame>;
  if (authStatus === 'error') return <PageFrame><AuthErrorState message={authError?.message ?? '인증 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'} onRetry={retryAuth} /></PageFrame>;
  if (authStatus === 'unauthenticated' || !user) return <PageFrame><RedirectingState /></PageFrame>;

  return (
    <PageFrame>
      <AccountOwnershipCard user={user} />
      <section className="grid gap-4 lg:grid-cols-2">
        <SettingsActionCard
          title={t('deleteRecordsTitle')}
          body={t('deleteRecordsDesc')}
          buttonLabel={t('deleteRecordsBtn')}
          confirmationMessage={t('deleteRecordsConfirm')}
          helper={t('deleteRecordsHelper')}
          isWorking={deleteStatus === 'working'}
          message={deleteMessage}
          messageTone={deleteStatus === 'error' ? 'error' : deleteStatus === 'success' ? 'success' : 'default'}
          onClick={handleDeleteStoredData}
          buttonTone="danger"
        />
        <SettingsActionCard
          title={t('logoutTitle')}
          body={t('logoutDesc')}
          buttonLabel={t('logoutBtn')}
          confirmationMessage={t('logoutConfirm')}
          helper={t('logoutHelper')}
          isWorking={signOutStatus === 'working'}
          message={signOutMessage}
          messageTone={signOutStatus === 'error' ? 'error' : 'default'}
          onClick={handleSignOut}
        />
      </section>
      <Surface>
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">다음 이동</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {t('nextMoveTitle')}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          {t('nextMoveDesc')}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/my/records"
            className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
          >
            {t('linkMyRecords')}
          </Link>
          <Link
            href="/my/summary"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            {t('linkMySummary')}
          </Link>
        </div>
      </Surface>
    </PageFrame>
  );
}
