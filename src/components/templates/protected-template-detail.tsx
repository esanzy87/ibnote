'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { GlobalTopBar } from '@/components/navigation/global-top-bar';
import { getTemplatePhase4Asset } from '@/lib/assets/phase4-route-images';
import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import {
  ACTIVITY_CLUSTER_LABELS,
  type EnrichedWorksheetTemplate,
} from '@/lib/templates/template-experience';

interface ProtectedTemplateDetailProps {
  slug: string;
  template: EnrichedWorksheetTemplate | null;
}

function TemplateDetailFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background-light">
      <GlobalTopBar
        active="templates"
        action={{ href: '/my/records', icon: 'edit_note', label: '내 기록 보기', tone: 'secondary' }}
      />
      <div className="flex-1">{children}</div>
    </div>
  );
}

function DetailLoadingState() {
  return (
    <TemplateDetailFrame>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="animate-pulse text-primary">
          <span className="material-symbols-outlined text-5xl">nest_eco_leaf</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">템플릿을 준비하고 있습니다...</h1>
      </div>
    </TemplateDetailFrame>
  );
}

function DetailRedirectingState() {
  return (
    <TemplateDetailFrame>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="text-primary">
          <span className="material-symbols-outlined text-5xl">lock</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">로그인하고 있습니다...</h1>
        <p className="mt-2 text-slate-600">선택한 활동의 상세 화면으로 돌아옵니다.</p>
      </div>
    </TemplateDetailFrame>
  );
}

function InvalidTemplateState() {
  return (
    <TemplateDetailFrame>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="text-slate-400">
          <span className="material-symbols-outlined text-5xl">error</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">템플릿을 찾을 수 없습니다.</h1>
        <Link
          href="/templates"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
        >
          템플릿 목록으로 돌아가기
        </Link>
      </div>
    </TemplateDetailFrame>
  );
}

function TemplateDetailContent({ template }: { template: EnrichedWorksheetTemplate }) {
  const clusterLabel = ACTIVITY_CLUSTER_LABELS[template.activityCluster];
  const imageAsset = getTemplatePhase4Asset(template.slug);

  return (
    <TemplateDetailFrame>
      <div className="layout-content-container mx-auto flex max-w-[800px] flex-1 flex-col px-4 py-5 pb-32">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="relative mb-6 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-primary/5 md:h-64">
            {imageAsset ? (
              <>
                <Image
                  src={imageAsset.src}
                  alt={imageAsset.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 800px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/15 to-transparent" />
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-7xl text-primary/20">
                  {template.activityCluster === 'conversational_check_ins' ? 'chat' :
                    template.activityCluster === 'notice_pattern_sort' ? 'visibility' : 'extension'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
              </>
            )}
            <div className="absolute bottom-6 left-6">
              <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {clusterLabel}
              </span>
              <h1 className={`text-3xl font-black leading-tight tracking-tighter md:text-4xl ${imageAsset ? 'text-white' : 'text-slate-900'}`}>
                {template.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 px-1">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
              <span className="text-sm font-medium">{clusterLabel}</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-primary/30" />
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
              <span className="text-sm font-medium">{template.durationMinutes}분 내외</span>
            </div>
          </div>
        </div>

        {/* Quick Decision Card */}
        <section className="mb-10">
          <div className="flex flex-col overflow-hidden rounded-xl border border-primary/5 bg-white shadow-sm md:flex-row">
            {imageAsset && (
              <div className="relative min-h-[160px] bg-slate-100 md:w-1/3">
                <Image
                  src={imageAsset.src}
                  alt={imageAsset.alt}
                  fill
                  sizes="(min-width: 768px) 260px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 p-6">
              <h3 className="mb-2 text-lg font-bold text-slate-900">우리에게 맞는 활동일까요?</h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                {template.quickStart}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">집중력</span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">함께 대화</span>
              </div>
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
            <span className="material-symbols-outlined text-primary">shopping_basket</span>
            간단한 준비물
          </h2>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {template.materials.map((material, idx) => (
              <li key={idx} className="flex items-center gap-3 rounded-lg border border-primary/10 bg-primary/5 p-3">
                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                <span className="text-sm font-medium text-slate-700">{material}</span>
              </li>
            ))}
            {template.materials.length === 0 && (
              <li className="flex items-center gap-3 rounded-lg border border-primary/10 bg-primary/5 p-3">
                <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                <span className="text-sm font-medium text-slate-700">특별한 준비물이 필요 없어요</span>
              </li>
            )}
          </ul>
        </section>

        {/* How to do it */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
            <span className="material-symbols-outlined text-primary">footprint</span>
            함께하는 순서
          </h2>
          <div className="relative space-y-6 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-[2px] before:bg-primary/10">
            {template.steps.map((step, idx) => (
              <div key={idx} className="relative flex gap-4">
                <div className="z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What to notice */}
        <section className="mb-10 rounded-xl border-l-4 border-primary bg-primary/5 p-6">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
            <span className="material-symbols-outlined text-primary">visibility</span>
            차분히 관찰해 보세요
          </h2>
          <div className="space-y-3">
            <ul className="space-y-2">
              {template.recordFocus.map((focus, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-primary">•</span>
                  <span>{focus}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why revisit later */}
        <section className="mb-12">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-slate-900">
            <span className="material-symbols-outlined text-primary">history_toggle_off</span>
            나중에 다시 읽어 보면 좋은 점
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            {template.revisitReason}
          </p>
        </section>

        {/* CTAs */}
        <div className="fixed bottom-6 left-1/2 w-full max-w-[400px] -translate-x-1/2 px-4 md:max-w-[600px]">
          <div className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white/90 p-4 shadow-lg backdrop-blur-sm sm:flex-row">
            <Link
              href={`/my/records/new?template=${encodeURIComponent(template.slug)}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white transition-transform active:scale-95 hover:bg-primary/90"
            >
              <span className="material-symbols-outlined">edit_note</span>
              가볍게 기록하기
            </Link>
            <button
              onClick={() => window.print()}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary/20 bg-transparent py-4 font-bold text-primary transition-colors hover:border-primary/40"
            >
              <span className="material-symbols-outlined">print</span>
              활동 인쇄하기
            </button>
          </div>
        </div>
      </div>
    </TemplateDetailFrame>
  );
}

export function ProtectedTemplateDetail({ slug, template }: ProtectedTemplateDetailProps) {
  const { user, status } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      const loginHref = buildLoginHref(`/templates/${slug}`);
      router.replace(loginHref);
    }
  }, [status, slug, router]);

  if (status === 'loading') {
    return <DetailLoadingState />;
  }

  if (status === 'unauthenticated') {
    return <DetailRedirectingState />;
  }

  if (status === 'authenticated' && template) {
    return <TemplateDetailContent template={template} />;
  }

  return <InvalidTemplateState />;
}
