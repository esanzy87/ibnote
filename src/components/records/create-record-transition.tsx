'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import { createDraftRecord } from '@/lib/records/record-repo';
import { getTemplateBySlug } from '@/lib/templates/template-repo';
import type { WorksheetTemplate } from '@/lib/templates/template-types';

interface CreateRecordTransitionProps {
  templateSlug: string | null;
}

function TransitionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background-light">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-20 lg:px-40">
        <div className="flex w-full max-w-[520px] flex-col items-center text-center">
          {children}
        </div>
      </main>
    </div>
  );
}

function InvalidTemplateState({ templateSlug }: { templateSlug: string | null }) {
  return (
    <TransitionLayout>
      <div className="mb-10 flex flex-col items-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <span className="material-symbols-outlined text-3xl">error</span>
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">템플릿을 찾을 수 없습니다</h1>
        <p className="font-medium text-slate-600">템플릿 식별자: {templateSlug}</p>
      </div>
      <Link
        href="/templates"
        className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white transition hover:bg-primary/90"
      >
        템플릿 목록으로 돌아가기
      </Link>
    </TransitionLayout>
  );
}

function TransitionLoadingState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <div className="mb-10 flex flex-col items-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute h-24 w-24 animate-pulse rounded-full bg-primary/10 scale-110"></div>
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-3xl">favorite</span>
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{title}</h1>
        <p className="font-medium text-slate-600">{subtitle}</p>
      </div>
      
      {/* Indeterminate Progress Bar */}
      <div className="mb-12 h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
        <div className="h-full w-1/3 animate-[indeterminate_1.5s_infinite_linear] rounded-full bg-primary"></div>
      </div>
    </>
  );
}

function StartGuidance() {
  return (
    <div className="mb-8 w-full rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
      <p className="text-lg leading-relaxed text-slate-800">
        "기록보다 오늘 있었던 장면에 집중해 보세요. 정답은 없습니다. 느낀 그대로를 짧게 남기는 것만으로도 충분합니다."
      </p>
    </div>
  );
}

function TemplatePreview({ template }: { template: WorksheetTemplate }) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch overflow-hidden rounded-xl border border-slate-100 bg-white shadow-md">
        <div className="flex flex-1 flex-col justify-center gap-2 p-6 text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">선택한 템플릿</p>
          <h3 className="text-xl font-bold text-slate-900">{template.title}</h3>
        </div>
      </div>
    </div>
  );
}

function TransitionErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <TransitionLayout>
      <div className="mb-10 flex flex-col items-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <span className="material-symbols-outlined text-3xl">warning</span>
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">오류가 발생했습니다</h1>
        <p className="font-medium text-slate-600">{message}</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white transition hover:bg-primary/90"
        >
          다시 시도하기
        </button>
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          템플릿 목록으로 돌아가기
        </Link>
      </div>
    </TransitionLayout>
  );
}

export function CreateRecordTransition({ templateSlug }: CreateRecordTransitionProps) {
  const router = useRouter();
  const { user, status } = useAuthUser();
  const template = templateSlug ? getTemplateBySlug(templateSlug) : null;

  const [creationStatus, setCreationStatus] = useState<'idle' | 'creating' | 'error'>('idle');
  const [creationError, setCreationError] = useState<string | null>(null);
  const hasStartedCreationRef = useRef(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      const loginHref = buildLoginHref(`/my/records/new?template=${templateSlug}`);
      router.replace(loginHref);
      return;
    }

    if (status === 'authenticated' && user && template && !hasStartedCreationRef.current) {
      hasStartedCreationRef.current = true;
      setCreationStatus('creating');

      const uid = user.uid;
      const currentTemplate = template;

      async function runTransition() {
        try {
          const draftId = await createDraftRecord(uid, currentTemplate);
          // Small delay to let the transition feel intentional
          await new Promise((resolve) => setTimeout(resolve, 800));
          router.replace(`/my/records/${draftId}`);
        } catch (err) {
          console.error('Failed to create draft:', err);
          setCreationStatus('error');
          setCreationError(
            err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.',
          );
        }
      }

      void runTransition();
    }
  }, [creationStatus, status, template, user, templateSlug, router]);

  if (!template) {
    return <InvalidTemplateState templateSlug={templateSlug} />;
  }

  if (creationStatus === 'error') {
    return (
      <TransitionErrorState
        message={creationError ?? '기록 공간을 준비하는 중 오류가 발생했습니다.'}
        onRetry={() => {
          hasStartedCreationRef.current = false;
          setCreationStatus('idle');
        }}
      />
    );
  }

  let title = '기록 공간을 준비하고 있습니다...';
  let subtitle = '기록을 시작할 수 있게 공간을 준비합니다';

  if (status === 'loading') {
    title = '사용자 정보를 확인하고 있습니다...';
    subtitle = '잠시만 기다려 주세요';
  } else if (status === 'unauthenticated') {
    title = '로그인 상태를 확인하고 있습니다...';
    subtitle = '로그인 후 기록 공간으로 이동합니다';
  }

  return (
    <TransitionLayout>
      <TransitionLoadingState title={title} subtitle={subtitle} />
      <StartGuidance />
      <TemplatePreview template={template} />
    </TransitionLayout>
  );
}
