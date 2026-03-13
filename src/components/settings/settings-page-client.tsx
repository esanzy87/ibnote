'use client';

import type { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
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
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">My settings</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        설정 화면을 준비하는 중입니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        로그인 상태를 확인한 뒤, 이 계정에 연결된 데이터 안내와 다음 단계 버튼을 보여 드릴게요.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="h-40 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
        <div className="h-40 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
      </div>
    </Surface>
  );
}

function RedirectingState() {
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Redirecting</p>
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
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">Auth error</p>
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

  if (providerIds.includes('password')) {
    return '이메일 / 비밀번호';
  }

  return '확인되지 않음';
}

function AccountOwnershipCard({ user }: { user: User }) {
  const email = user.email?.trim() || '이메일 정보를 불러오지 못했습니다.';
  const authType = useMemo(() => getAuthTypeLabel(user), [user]);

  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Account</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        현재 로그인한 계정 정보
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        IBNote 부트스트랩 MVP에서는 이메일/비밀번호 로그인만 지원합니다. 아래 계정에 연결된 기록만 이 설정에서
        안내하고 관리합니다.
      </p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
          <dt className="text-sm font-medium text-slate-500">인증 방식</dt>
          <dd className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{authType}</dd>
        </div>

        <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
          <dt className="text-sm font-medium text-slate-500">로그인 계정</dt>
          <dd className="mt-2 break-all text-xl font-semibold tracking-tight text-slate-900">{email}</dd>
        </div>
      </dl>

      <div className="mt-6 rounded-[1.5rem] border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <p className="font-medium">데이터 소유 안내</p>
        <p className="mt-2">
          현재 저장되는 기록과 요약 데이터는 이 로그인 계정에만 연결됩니다. 다른 계정으로 로그인하면 이 계정의
          기록은 보이지 않으며, 반대로 다른 계정의 기록도 현재 계정에서 열 수 없습니다.
        </p>
      </div>
    </Surface>
  );
}

function SettingsActionCard({
  body,
  buttonLabel,
  buttonTone = 'default',
  confirmationMessage,
  disabled = false,
  helper,
  isWorking = false,
  message,
  messageTone = 'default',
  onClick,
  title,
}: {
  body: string;
  buttonLabel: string;
  buttonTone?: 'default' | 'danger';
  confirmationMessage?: string;
  disabled?: boolean;
  helper: string;
  isWorking?: boolean;
  message: string | null;
  messageTone?: 'default' | 'error' | 'success';
  onClick: () => Promise<void> | void;
  title: string;
}) {
  const buttonClassName =
    buttonTone === 'danger'
      ? 'inline-flex items-center justify-center rounded-full bg-rose-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:bg-rose-300'
      : 'inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400';

  const messageClassName =
    messageTone === 'error'
      ? 'text-rose-700'
      : messageTone === 'success'
        ? 'text-emerald-700'
        : 'text-slate-700';

  return (
    <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{body}</p>
      <button
        type="button"
        disabled={disabled || isWorking}
        onClick={async () => {
          if (confirmationMessage && !window.confirm(confirmationMessage)) {
            return;
          }

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
  const router = useRouter();
  const { error: authError, retry: retryAuth, status: authStatus, user } = useAuthUser();
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'working' | 'success' | 'error'>('idle');
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.replace(buildLoginHref('/my/settings'));
    }
  }, [authStatus, router]);

  async function handleDeleteStoredData() {
    if (!user) {
      return;
    }

    setDeleteStatus('working');
    setDeleteMessage(null);

    try {
      await deleteUserStoredData(user.uid);
      setDeleteStatus('success');
      setDeleteMessage('현재 계정에 저장된 기록 데이터를 삭제했습니다. 이제 내 기록과 최근 요약에서 빈 상태가 보여야 합니다.');
      router.refresh();
    } catch {
      setDeleteStatus('error');
      setDeleteMessage('기록 데이터를 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  if (authStatus === 'loading') {
    return (
      <PageFrame>
        <AuthLoadingState />
      </PageFrame>
    );
  }

  if (authStatus === 'error') {
    return (
      <PageFrame>
        <AuthErrorState
          message={authError?.message ?? '인증 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'}
          onRetry={retryAuth}
        />
      </PageFrame>
    );
  }

  if (authStatus === 'unauthenticated' || !user) {
    return (
      <PageFrame>
        <RedirectingState />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <AccountOwnershipCard user={user} />

      <section className="grid gap-4 lg:grid-cols-2">
        <SettingsActionCard
          title="모든 내 기록 삭제"
          body="현재 로그인한 계정 아래에 저장된 모든 기록을 삭제합니다. 프로필 문서가 존재하면 함께 정리할 수 있으며, 삭제 후에도 설정 화면에는 그대로 머무릅니다."
          buttonLabel="모든 내 기록 삭제"
          confirmationMessage="현재 계정에 저장된 모든 기록을 삭제할까요? 이 작업은 되돌릴 수 없습니다."
          helper="삭제 후에는 내 기록과 최근 요약 화면이 빈 상태로 보여야 합니다."
          isWorking={deleteStatus === 'working'}
          message={deleteMessage}
          messageTone={deleteStatus === 'error' ? 'error' : deleteStatus === 'success' ? 'success' : 'default'}
          onClick={handleDeleteStoredData}
          buttonTone="danger"
        />

        <SettingsActionCard
          title="로그아웃"
          body="현재 세션을 종료하고 공개 첫 화면으로 돌아가는 자리입니다. 실제 로그아웃 실행과 리다이렉트는 다음 작업에서 연결되며, 이 단계에서는 버튼 위치와 계정 안내만 제공합니다."
          buttonLabel="로그아웃"
          helper="D-03 범위: 로그아웃 버튼 위치와 안내만 제공했습니다. 실제 로그아웃 실행은 D-05에서 연결됩니다."
          message={null}
          disabled
          onClick={() => {}}
        />
      </section>

      <Surface>
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Next steps</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          설정에서 바로 이어서 확인할 수 있는 화면
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          기록과 요약 화면은 모두 현재 로그인한 계정 기준으로만 동작합니다. 설정 확인 뒤 아래 화면으로 바로 이동해도
          같은 계정 범위 안에서만 내용을 보게 됩니다.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/my/records"
            className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
          >
            내 기록 보기
          </Link>
          <Link
            href="/my/summary"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            최근 요약 보기
          </Link>
        </div>
      </Surface>
    </PageFrame>
  );
}
