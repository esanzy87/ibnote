'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import { createDraftRecord } from '@/lib/records/record-repo';
import { getTemplateBySlug } from '@/lib/templates/template-repo';

interface CreateRecordTransitionProps {
  templateSlug: string | null;
}

function TransitionCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-[1.9rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
      {children}
    </section>
  );
}

function InvalidTemplateState({ templateSlug }: { templateSlug: string | null }) {
  return (
    <TransitionCard>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Invalid template</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        기록을 시작할 템플릿을 확인할 수 없습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        {templateSlug
          ? `게시된 템플릿 "${templateSlug}"을 찾지 못했습니다. 템플릿 목록에서 다시 선택해 주세요.`
          : '템플릿 정보가 없어서 새 기록을 만들 수 없습니다. 템플릿 목록에서 다시 시작해 주세요.'}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          템플릿 목록으로 돌아가기
        </Link>
      </div>
    </TransitionCard>
  );
}

function TransitionLoadingState({ title, description }: { title: string; description: string }) {
  return (
    <TransitionCard>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Record transition</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
      <div className="mt-8 h-24 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
    </TransitionCard>
  );
}

function TransitionErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <TransitionCard>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">Transition error</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
        새 기록을 만들지 못했습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-rose-900 sm:text-base">{message}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-full bg-rose-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-rose-800"
        >
          다시 시도
        </button>
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
        >
          템플릿 목록 보기
        </Link>
      </div>
    </TransitionCard>
  );
}

export function CreateRecordTransition({ templateSlug }: CreateRecordTransitionProps) {
  const router = useRouter();
  const template = templateSlug ? getTemplateBySlug(templateSlug) : null;
  const { user, status, error, retry } = useAuthUser();
  const [creationStatus, setCreationStatus] = useState<'idle' | 'creating' | 'error'>('idle');
  const [creationError, setCreationError] = useState<string | null>(null);
  const [attemptKey, setAttemptKey] = useState(0);
  const hasStartedCreationRef = useRef(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      const target = templateSlug
        ? `/my/records/new?template=${encodeURIComponent(templateSlug)}`
        : '/my/records/new';

      router.replace(buildLoginHref(target));
    }
  }, [router, status, templateSlug]);

  useEffect(() => {
    if (status !== 'authenticated' || !user || !template || creationStatus === 'creating') {
      return;
    }

    if (hasStartedCreationRef.current) {
      return;
    }

    const currentUser = user;
    const currentTemplate = template;
    hasStartedCreationRef.current = true;

    async function runTransition() {
      setCreationStatus('creating');
      setCreationError(null);

      try {
        const record = await createDraftRecord(currentUser.uid, currentTemplate);

        window.location.replace(`/my/records/${record.id}`);
      } catch (nextError) {
        hasStartedCreationRef.current = false;
        setCreationStatus('error');
        setCreationError(
          nextError instanceof Error
            ? nextError.message
            : '초안 기록을 만드는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        );
      }
    }

    void runTransition();
  }, [attemptKey, creationStatus, router, status, template, user]);

  if (!template) {
    return (
      <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <InvalidTemplateState templateSlug={templateSlug} />
        </div>
      </main>
    );
  }

  if (status === 'loading') {
    return (
      <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <TransitionLoadingState
            title="로그인 상태를 확인하는 중입니다."
            description="선택한 템플릿으로 기록 초안을 만들기 전에 계정 정보를 먼저 확인하고 있습니다."
          />
        </div>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <TransitionErrorState
            message={error?.message ?? '인증 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'}
            onRetry={retry}
          />
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <TransitionLoadingState
            title="로그인 화면으로 이동하고 있습니다."
            description="새 기록은 로그인한 계정에서만 만들 수 있어요. 잠시 후 로그인 화면으로 이동합니다."
          />
        </div>
      </main>
    );
  }

  if (creationStatus === 'error') {
    return (
      <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <TransitionErrorState
            message={creationError ?? '초안 기록을 만드는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'}
            onRetry={() => {
              hasStartedCreationRef.current = false;
              setCreationStatus('idle');
              setAttemptKey((currentValue) => currentValue + 1);
            }}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <TransitionLoadingState
          title="기록 초안을 만드는 중입니다."
          description={`선택한 템플릿 "${template.title}"으로 새 기록을 만들고 있습니다. 곧 편집 화면으로 이동합니다.`}
        />
      </div>
    </main>
  );
}
