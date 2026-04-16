'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { getTemplatePhase4Asset } from '@/lib/assets/phase4-route-images';
import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import { createDraftRecord } from '@/lib/records/record-repo';
import type { EnrichedWorksheetTemplate } from '@/lib/templates/template-experience';
import { getTemplateBySlug } from '@/lib/templates/template-repo';
import { isSupportedLocale } from '@/lib/templates/template-localization';

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
  const t = useTranslations('transition');
  return (
    <TransitionLayout>
      <div className="mb-10 flex flex-col items-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <span className="material-symbols-outlined text-3xl">error</span>
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{t('invalidTitle')}</h1>
        <p className="font-medium text-slate-600">{t('invalidDesc')}</p>
      </div>
      <Link
        href="/templates"
        className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white transition hover:bg-primary/90"
      >
        {t('backToTemplates')}
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
  const t = useTranslations('transition');
  return (
    <div className="mb-8 w-full rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
      <p className="text-lg leading-relaxed text-slate-800">
        "{t('guidance')}"
      </p>
    </div>
  );
}

function TemplatePreview({ template }: { template: EnrichedWorksheetTemplate }) {
  const t = useTranslations('transition');
  const imageAsset = getTemplatePhase4Asset(template.slug);

  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch overflow-hidden rounded-xl border border-slate-100 bg-white shadow-md md:flex-row">
        {imageAsset && (
          <div className="relative min-h-[140px] bg-slate-50 md:w-1/3">
            <Image
              src={imageAsset.src}
              alt={imageAsset.alt}
              fill
              sizes="(min-width: 768px) 180px, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-center gap-2 p-6 text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{t('previewTag')}</p>
          <h3 className="text-xl font-bold text-slate-900">{template.title}</h3>
          <div className="mt-2 border-t border-slate-100 pt-2">
            <p className="mb-1 text-[10px] font-medium uppercase text-slate-400">{t('previewQ')}</p>
            <p className="text-sm leading-snug text-slate-700">{template.recordFocus[0] || t('previewQFallback')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransitionErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const t = useTranslations('transition');
  return (
    <TransitionLayout>
      <div className="mb-10 flex flex-col items-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <span className="material-symbols-outlined text-3xl">warning</span>
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{t('errorTitle')}</h1>
        <p className="font-medium text-slate-600">{message}</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white transition hover:bg-primary/90"
        >
          {t('btnRetry')}
        </button>
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          {t('backToTemplates')}
        </Link>
      </div>
    </TransitionLayout>
  );
}

export function CreateRecordTransition({ templateSlug }: CreateRecordTransitionProps) {
  const t = useTranslations('transition');
  const locale = useLocale();
  const router = useRouter();
  const { user, status } = useAuthUser();
  const template = templateSlug ? getTemplateBySlug(templateSlug, isSupportedLocale(locale) ? locale : 'ko') : null;

  const [creationStatus, setCreationStatus] = useState<'idle' | 'creating' | 'error'>('idle');
  const [creationError, setCreationError] = useState<string | null>(null);
  const hasStartedCreationRef = useRef(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      const loginHref = buildLoginHref(`/my/records/new?template=${templateSlug}`);
      router.replace(loginHref as any);
      return;
    }

    if (status === 'authenticated' && user && template && !hasStartedCreationRef.current) {
      hasStartedCreationRef.current = true;
      setCreationStatus('creating');

      const uid = user.uid;
      const currentTemplate = template;

      async function runTransition() {
        try {
          const draftRecord = await createDraftRecord(uid, currentTemplate);
          // Small delay to let the transition feel intentional
          await new Promise((resolve) => setTimeout(resolve, 800));
          router.replace(`/my/records/${draftRecord.id}` as any);
        } catch (err) {
          console.error('Failed to create draft:', err);
          setCreationStatus('error');
          setCreationError(
            err instanceof Error ? err.message : t('errorDefault'),
          );
        }
      }

      void runTransition();
    }
  }, [creationStatus, status, template, user, templateSlug, router, t, locale]);

  if (!template) {
    return <InvalidTemplateState templateSlug={templateSlug} />;
  }

  if (creationStatus === 'error') {
    return (
      <TransitionErrorState
        message={creationError ?? t('errorDefault')}
        onRetry={() => {
          hasStartedCreationRef.current = false;
          setCreationStatus('idle');
        }}
      />
    );
  }

  let title = t('prepareSpace');
  let subtitle = t('prepareSpaceDesc');

  if (status === 'loading') {
    title = t('checkAuth');
    subtitle = t('checkAuthDesc');
  } else if (status === 'unauthenticated') {
    title = t('checkLogin');
    subtitle = t('checkLoginDesc');
  }

  return (
    <TransitionLayout>
      <TransitionLoadingState title={title} subtitle={subtitle} />
      <StartGuidance />
      <TemplatePreview template={template} />
    </TransitionLayout>
  );
}
