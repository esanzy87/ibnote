'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import { useRecord } from '@/lib/records/use-record';
import { RecordsWorkspaceShell } from '@/components/records/records-workspace-shell';
import type { AbsoluteGrade, WorksheetRecord } from '@/lib/records/record-types';
import type { Competency, GradeBand, PypTheme } from '@/lib/templates/template-types';

const GRADE_BAND_LABELS = {
  g1_2: '초1-2',
  g3_4: '초3-4',
  g5_6: '초5-6',
} satisfies Record<GradeBand, string>;

const PYP_THEME_LABELS = {
  who_we_are: '우리는 누구인가',
  where_we_are_in_place_and_time: '우리는 시공간 속에서 어디에 있는가',
  how_we_express_ourselves: '우리는 자신을 어떻게 표현하는가',
  how_the_world_works: '세상은 어떻게 작동하는가',
  how_we_organize_ourselves: '우리는 어떻게 조직하는가',
  sharing_the_planet: '지구를 함께 나누기',
} satisfies Record<PypTheme, string>;

const COMPETENCY_LABELS = {
  literacy: '문해',
  thinking: '사고력',
  expression: '표현',
  collaboration: '협력',
  digital_literacy: '디지털 문해',
} satisfies Record<Competency, string>;

const ABSOLUTE_GRADE_LABELS = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
} satisfies Record<AbsoluteGrade, string>;

const RECORD_PRIVACY_NOTE =
  '실제 아이 이름, 학교명, 기타 민감한 개인 정보는 입력하지 마세요.';

interface RecordEditorProps {
  recordId: string;
}

function EditorPage({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">{children}</div>
    </main>
  );
}

function RecordEditorFrame({ children }: { children: React.ReactNode }) {
  return (
    <EditorPage>
      <RecordsWorkspaceShell active="records" />
      {children}
    </EditorPage>
  );
}

function Surface({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'error' }) {
  const className =
    tone === 'error'
      ? 'rounded-[1.9rem] border border-rose-200 bg-rose-50 p-8 shadow-sm sm:p-10'
      : 'rounded-[1.9rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10';

  return <section className={className}>{children}</section>;
}

function RecordLoadingState() {
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">기록 편집</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        기록을 불러오는 중입니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        로그인 상태와 저장된 기록을 확인한 뒤 편집 화면을 준비하고 있습니다.
      </p>
      <div className="mt-8 space-y-4">
        <div className="h-24 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
        <div className="h-56 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
        <div className="h-56 animate-pulse rounded-[1.75rem] border border-stone-200 bg-stone-50" />
      </div>
    </Surface>
  );
}

function RecordRedirectingState() {
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">로그인 이동</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        로그인 화면으로 이동하고 있습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        내 기록은 로그인한 계정에서만 열 수 있어요. 잠시 후 로그인 화면으로 이동합니다.
      </p>
    </Surface>
  );
}

function RecordErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <Surface tone="error">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">기록 오류</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-rose-950 sm:text-4xl">
        기록 편집 화면을 열지 못했습니다.
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
          href="/my/records"
          className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-5 py-3 text-sm font-medium text-rose-900 transition hover:border-rose-300"
        >
          기록 목록으로 가기
        </Link>
      </div>
    </Surface>
  );
}

function MissingRecordState({ recordId }: { recordId: string }) {
  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">기록 없음</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        이 기록을 찾을 수 없습니다.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        `{recordId}` 기록이 없거나 현재 로그인한 계정에서 열 수 없는 기록입니다.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          템플릿 보러 가기
        </Link>
        <Link
          href="/my/records"
          className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
        >
          기록 목록으로 가기
        </Link>
      </div>
    </Surface>
  );
}

function EntryIntro({ record }: { record: WorksheetRecord }) {
  const isSubmitted = record.status === 'submitted';
  const labelClassName =
    'inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white';

  return (
    <section className="rounded-[1.9rem] border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-700 p-7 text-white shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-200">기록 에디터</p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {isSubmitted ? '돌아보며 다듬는 기록' : '지금의 장면부터 이어 적는 기록'}
      </h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-100 sm:text-base">
        초안이든 제출본이든, 기록은 한 번에 완성되지 않아도 괜찮습니다. 지금 필요한 것부터 채워 다음으로 넘어가면 돼요.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className={labelClassName}>현재 단계</span>
        <span className="inline-flex items-center rounded-full border border-stone-200/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-stone-100">
          {isSubmitted ? '제출 후 재정리' : '초안 계속 작성'}
        </span>
      </div>
    </section>
  );
}

function Section({
  description,
  title,
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  description?: string;
  title: string;
  tone?: 'dominant' | 'neutral' | 'quiet';
}) {
  const frameClass =
    tone === 'dominant'
      ? 'rounded-[1.9rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8'
      : tone === 'quiet'
        ? 'rounded-[1.9rem] border border-stone-200 bg-stone-50 p-6 sm:p-7'
        : 'rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8';

  return (
    <section className={frameClass}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">기록 단계</span>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        {description ? <p className="text-sm text-slate-500">{description}</p> : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function HeaderSummary({ record }: { record: WorksheetRecord }) {
  const isSubmitted = record.status === 'submitted';
  const hasWritingStarted = Boolean(
    record.performedOn || record.childReflection.trim() || record.parentMemo.trim() || Object.values(record.competencyRatings).some(Boolean),
  );

  const statusHeadline = isSubmitted ? '이미 제출한 기록을 다시 읽고 다듬는 화면입니다.' : '멈춘 곳에서 바로 다시 적을 수 있는 초안입니다.';
  const statusBody = isSubmitted
    ? '이 기록은 이미 요약에 반영된 제출본입니다. 수정 후 저장하면 제출 상태가 유지되면서 내용만 갱신됩니다.'
    : hasWritingStarted
      ? '이전에 적어 둔 내용이 남아 있습니다. 날짜, 메모, 평정을 차례로 보며 이어서 정리해 보세요.'
      : '아직 비어 있는 초안입니다. 오늘 떠오르는 장면 한 줄부터 가볍게 시작해 보세요.';

  return (
    <Surface>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">기록 편집</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {record.templateTitleSnapshot}
            </h1>
            <span
              className={
                isSubmitted
                  ? 'rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-950'
                  : 'rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-950'
              }
            >
              {isSubmitted ? '제출 완료' : '초안'}
            </span>
          </div>
          <p className="mt-4 text-lg font-medium leading-7 text-slate-900">{statusHeadline}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{statusBody}</p>
        </div>

        <div className="grid gap-3 rounded-[1.75rem] border border-stone-200 bg-stone-50 p-4 text-sm text-slate-700 sm:min-w-80">
          <p className="font-medium text-slate-900">기록 정보</p>
          <p>원본 템플릿 학년: {GRADE_BAND_LABELS[record.gradeBandSnapshot]}</p>
          <p>PYP 주제: {PYP_THEME_LABELS[record.pypThemeSnapshot]}</p>
          <p>활동 날짜: {record.performedOn || '아직 입력 전'}</p>
          <p>마지막 수정: {new Date(record.updatedAt).toLocaleString('ko-KR')}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {record.competenciesSnapshot.map((competency) => (
          <span
            key={competency}
            className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-950"
          >
            {COMPETENCY_LABELS[competency]}
          </span>
        ))}
      </div>
    </Surface>
  );
}

function WritingGuide({ record }: { record: WorksheetRecord }) {
  const isSubmitted = record.status === 'submitted';

  return (
    <Surface>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">기록 가이드</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
        {isSubmitted ? '기억이 더 또렷해졌다면 차분히 다시 다듬어 보세요.' : '길게 쓰기보다, 지금 떠오르는 장면부터 이어 적어 보세요.'}
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-slate-700">
          <p className="font-medium text-slate-900">1. 날짜와 메모</p>
          <p className="mt-1">{record.performedOn ? '날짜를 확인하고,' : '날짜와'} 아이 반응 한두 문장부터 적습니다.</p>
        </div>
        <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-slate-700">
          <p className="font-medium text-slate-900">2. 체크와 평정</p>
          <p className="mt-1">체크리스트를 훑어보고, 역량 평정을 하나 이상 선택합니다.</p>
        </div>
        <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-slate-700">
          <p className="font-medium text-slate-900">3. 저장 또는 제출</p>
          <p className="mt-1">{isSubmitted ? '변경 저장으로 마칩니다.' : '초안으로 저장하거나 제출해 요약에 반영합니다.'}</p>
        </div>
      </div>
    </Surface>
  );
}

function RatingGroup({
  competency,
  selectedGrade,
  onSelect,
}: {
  competency: Competency;
  onSelect: (value: AbsoluteGrade | null) => void;
  selectedGrade: AbsoluteGrade | undefined;
}) {
  return (
    <article className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{COMPETENCY_LABELS[competency]}</h3>
          <p className="mt-1 text-sm text-slate-600">가장 가까운 수준 하나를 선택해 주세요.</p>
        </div>
        {selectedGrade ? (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
          >
            선택 지우기
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-5">
        {(['A', 'B', 'C', 'D', 'E'] as const).map((grade) => {
          const isSelected = selectedGrade === grade;

          return (
            <button
              key={grade}
              type="button"
              onClick={() => onSelect(grade)}
              className={
                isSelected
                  ? 'rounded-2xl border border-slate-900 bg-slate-900 px-4 py-4 text-left text-white shadow-sm'
                  : 'rounded-2xl border border-stone-200 bg-white px-4 py-4 text-left text-slate-800 transition hover:border-slate-300 hover:bg-stone-50'
              }
            >
              <p className="text-xs font-medium uppercase tracking-[0.22em] opacity-80">
                {ABSOLUTE_GRADE_LABELS[grade]}
              </p>
              <p className="mt-2 text-sm font-medium">{grade} 수준</p>
            </button>
          );
        })}
      </div>
    </article>
  );
}

export function RecordEditor({ recordId }: RecordEditorProps) {
  const router = useRouter();
  const { error: authError, retry: retryAuth, status: authStatus, user } = useAuthUser();
  const {
    error: recordError,
    hasAtLeastOneRating,
    isDirty,
    loadedRecord,
    mutationMessage,
    mutationStatus,
    record,
    resetLocalChanges,
    retry: retryRecord,
    saveDraft,
    setChildGradeBand,
    setChildReflection,
    setCompetencyRating,
    setParentMemo,
    setPerformedOn,
    status: recordStatus,
    submitRecord,
    toggleChecklistItem,
  } = useRecord({ authStatus, recordId, user });

  const isWritePending = mutationStatus === 'saving' || mutationStatus === 'submitting';

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.replace(buildLoginHref(`/my/records/${recordId}`));
    }
  }, [authStatus, recordId, router]);

  if (authStatus === 'loading') {
    return (
      <RecordEditorFrame>
        <RecordLoadingState />
      </RecordEditorFrame>
    );
  }

  if (authStatus === 'error') {
    return (
      <RecordEditorFrame>
        <RecordErrorState
          message={authError?.message ?? '인증 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'}
          onRetry={retryAuth}
        />
      </RecordEditorFrame>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <RecordEditorFrame>
        <RecordRedirectingState />
      </RecordEditorFrame>
    );
  }

  if (recordStatus === 'loading' || recordStatus === 'idle') {
    return (
      <RecordEditorFrame>
        <RecordLoadingState />
      </RecordEditorFrame>
    );
  }

  if (recordStatus === 'error') {
    return (
      <RecordEditorFrame>
        <RecordErrorState
          message={recordError?.message ?? '기록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'}
          onRetry={retryRecord}
        />
      </RecordEditorFrame>
    );
  }

  if (recordStatus === 'missing' || !record) {
    return (
      <RecordEditorFrame>
        <MissingRecordState recordId={recordId} />
      </RecordEditorFrame>
    );
  }

  return (
    <EditorPage>
      <RecordsWorkspaceShell active="records" />
      <EntryIntro record={record} />
      <HeaderSummary record={record} />
      <WritingGuide record={record} />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <Section
          tone="dominant"
          title="1) 장면 기록"
          description="짧게 시작해도 괜찮습니다. 필요한 항목부터 채워 주세요."
        >
          <div className="grid gap-5">
            <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 px-4 py-4 text-sm leading-6 text-slate-700">
              <p className="font-semibold text-slate-900">부담 줄이기 안내</p>
              <p className="mt-1">
                완성된 글처럼 쓰지 않아도 됩니다. 아이가 했던 말이나 기억나는 장면 한 줄부터 시작해 보세요.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-950">
              <p className="font-semibold text-amber-950">개인정보 안내</p>
              <p className="mt-1">{RECORD_PRIVACY_NOTE}</p>
            </div>

            <label className="grid gap-2 text-sm font-medium text-slate-800">
              활동한 날짜
              <input
                type="date"
                value={record.performedOn}
                onChange={(event) => setPerformedOn(event.target.value)}
                className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500"
              />
              <span className="text-xs font-normal text-slate-500">제출할 때 꼭 필요한 항목입니다.</span>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-800">
              아이 학년 (선택)
              <select
                value={record.childGradeBand ?? ''}
                onChange={(event) => setChildGradeBand((event.target.value as GradeBand) || null)}
                className="rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-500"
              >
                <option value="">선택 안 함</option>
                <option value="g1_2">초1-2</option>
                <option value="g3_4">초3-4</option>
                <option value="g5_6">초5-6</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-800">
              아이 반응 메모
              <textarea
                value={record.childReflection}
                onChange={(event) => setChildReflection(event.target.value)}
                rows={5}
                placeholder="아이가 한 말, 표정, 다시 해 보고 싶다고 한 장면 등을 짧게 적어 보세요."
                className="rounded-[1.5rem] border border-stone-300 bg-white px-4 py-3 text-base leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500"
              />
              <span className="text-xs font-normal text-slate-500">
                기억나는 문장 하나만 있어도 충분합니다.
              </span>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-800">
              부모 메모
              <textarea
                value={record.parentMemo}
                onChange={(event) => setParentMemo(event.target.value)}
                rows={5}
                placeholder="다음에 다시 해 보고 싶은 점이나 준비물 메모를 남겨 두세요."
                className="rounded-[1.5rem] border border-stone-300 bg-white px-4 py-3 text-base leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500"
              />
            </label>
          </div>
        </Section>

        <Section
          tone="neutral"
          title="2) 제출 전 점검"
          description="현재 상태를 확인하고 필요한 항목을 채워 주세요."
        >
          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-medium text-slate-900">현재 상태</p>
              <div className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                <p>
                  기록 상태: <span className="font-medium text-slate-900">{record.status === 'submitted' ? '제출 완료' : '초안'}</span>
                </p>
                <p>
                  평정 선택: <span className="font-medium text-slate-900">{hasAtLeastOneRating ? '1개 이상 선택됨' : '아직 없음'}</span>
                </p>
                <p>
                  날짜 입력: <span className="font-medium text-slate-900">{record.performedOn ? '완료' : '필요'}</span>
                </p>
                <p>
                  로컬 변경: <span className="font-medium text-slate-900">{isDirty ? '있음' : '없음'}</span>
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-stone-200 bg-white p-4">
              <p className="text-sm font-medium text-slate-900">체크리스트</p>
              <div className="mt-4 grid gap-3">
                {Object.entries(record.checklistState).map(([item, checked]) => (
                  <label
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleChecklistItem(item)}
                      className="mt-1 h-4 w-4 rounded border-stone-300 text-slate-900"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </section>

      <Section tone="dominant" title="3) 역량 체크" description="이 활동과 연결된 역량만 표시됩니다.">
        <div className="grid gap-4">
          {record.competenciesSnapshot.map((competency) => (
            <RatingGroup
              key={competency}
              competency={competency}
              selectedGrade={record.competencyRatings[competency]}
              onSelect={(value) => setCompetencyRating(competency, value)}
            />
          ))}
        </div>
      </Section>

      <Section tone="neutral" title="4) 저장 또는 제출" description="지금 상태에 맞게 저장 또는 제출을 선택하세요.">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl text-sm leading-6 text-slate-600">
            <p>자동 저장은 하지 않습니다. 버튼을 눌렀을 때만 현재 입력값이 저장됩니다.</p>
            <p className="mt-2 font-medium text-slate-900">
              제출 조건: 활동 날짜와 역량 평정 하나 이상이 필요합니다.
            </p>
            {mutationMessage ? (
              <p
                className={
                  mutationStatus === 'error'
                    ? 'mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-900'
                    : 'mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-950'
                }
              >
                {mutationMessage}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            {record.status === 'draft' ? (
              <button
                type="button"
                onClick={() => {
                  void saveDraft();
                }}
                disabled={isWritePending}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {mutationStatus === 'saving' ? '초안 저장 중...' : '초안 저장'}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                void submitRecord();
              }}
              disabled={isWritePending}
              className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-stone-100 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-300 hover:bg-stone-200 disabled:cursor-not-allowed disabled:text-slate-500"
            >
              {mutationStatus === 'submitting'
                ? record.status === 'submitted'
                  ? '변경 저장 중...'
                  : '제출 중...'
                : record.status === 'submitted'
                  ? '제출 상태로 변경 저장'
                  : '제출'}
            </button>
            <Link
              href="/my/records"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
            >
              기록 목록으로 가기
            </Link>
            <button
              type="button"
              onClick={resetLocalChanges}
              disabled={!loadedRecord || !isDirty || isWritePending}
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              입력 되돌리기
            </button>
          </div>
        </div>
      </Section>
    </EditorPage>
  );
}
