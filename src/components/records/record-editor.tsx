'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import { useRecord } from '@/lib/records/use-record';
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
  'Please do not enter real names, school names, or other sensitive personal information.';

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
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Record editor</p>
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
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Redirecting</p>
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
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-700">Record error</p>
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
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Record not found</p>
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

function Section({ description, title, children }: { children: React.ReactNode; description?: string; title: string }) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        {description ? <p className="text-sm text-slate-500">{description}</p> : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function HeaderSummary({ record }: { record: WorksheetRecord }) {
  return (
    <Surface>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Record editor</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {record.templateTitleSnapshot}
            </h1>
            <span
              className={
                record.status === 'submitted'
                  ? 'rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-950'
                  : 'rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-950'
              }
            >
              {record.status === 'submitted' ? '제출 완료' : '초안'}
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            활동을 마친 뒤 기억이 생생할 때 짧게 남길 수 있도록 만든 기록입니다. 오늘 본 장면, 말, 반응만 간단하게 적어도 충분합니다.
          </p>
        </div>

        <div className="grid gap-3 rounded-[1.75rem] border border-stone-200 bg-stone-50 p-4 text-sm text-slate-700 sm:min-w-80">
          <p className="font-medium text-slate-900">기록 정보</p>
          <p>원본 템플릿 학년: {GRADE_BAND_LABELS[record.gradeBandSnapshot]}</p>
          <p>PYP 주제: {PYP_THEME_LABELS[record.pypThemeSnapshot]}</p>
          <p>템플릿 버전: {record.templateVersion}</p>
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
    record,
    resetLocalChanges,
    retry: retryRecord,
    setChildGradeBand,
    setChildReflection,
    setCompetencyRating,
    setParentMemo,
    setPerformedOn,
    status: recordStatus,
    toggleChecklistItem,
  } = useRecord({ authStatus, recordId, user });

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.replace(buildLoginHref(`/my/records/${recordId}`));
    }
  }, [authStatus, recordId, router]);

  if (authStatus === 'loading') {
    return (
      <EditorPage>
        <RecordLoadingState />
      </EditorPage>
    );
  }

  if (authStatus === 'error') {
    return (
      <EditorPage>
        <RecordErrorState
          message={authError?.message ?? '인증 상태를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.'}
          onRetry={retryAuth}
        />
      </EditorPage>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <EditorPage>
        <RecordRedirectingState />
      </EditorPage>
    );
  }

  if (recordStatus === 'loading' || recordStatus === 'idle') {
    return (
      <EditorPage>
        <RecordLoadingState />
      </EditorPage>
    );
  }

  if (recordStatus === 'error') {
    return (
      <EditorPage>
        <RecordErrorState
          message={recordError?.message ?? '기록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'}
          onRetry={retryRecord}
        />
      </EditorPage>
    );
  }

  if (recordStatus === 'missing' || !record) {
    return (
      <EditorPage>
        <MissingRecordState recordId={recordId} />
      </EditorPage>
    );
  }

  return (
    <EditorPage>
      <HeaderSummary record={record} />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <Section title="기본 입력" description="먼저 날짜와 간단한 배경을 남겨 주세요.">
          <div className="grid gap-5">
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
                꼭 길게 쓰지 않아도 괜찮아요. 기억나는 문장 하나만 있어도 충분합니다.
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

        <Section title="준비 상태" description="제출 전에 필요한 항목을 한눈에 확인할 수 있어요.">
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

      <Section title="역량 평정" description="이 활동에 포함된 역량만 보여 줍니다.">
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

      <Section title="다음 동작" description="저장과 제출 동작은 이어서 연결됩니다.">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl text-sm leading-6 text-slate-600">
            <p>
              이 단계에서는 기록을 불러오고 입력 구성을 점검할 수 있습니다. 실제 초안 저장과 제출 동작은 다음 작업인
              C-09에서 Firestore와 연결됩니다.
            </p>
            <p className="mt-2 font-medium text-slate-900">
              제출 조건: 활동 날짜와 역량 평정 하나 이상이 필요합니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {record.status === 'draft' ? (
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="초안 저장은 C-09에서 연결됩니다."
                className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-slate-300 px-5 py-3 text-sm font-medium text-white"
              >
                초안 저장 예정
              </button>
            ) : null}
            <button
              type="button"
              disabled
              aria-disabled="true"
              title={
                hasAtLeastOneRating && record.performedOn
                  ? '제출 동작은 C-09에서 연결됩니다.'
                  : '제출하려면 활동 날짜와 역량 평정 하나 이상이 필요합니다.'
              }
              className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-stone-200 bg-stone-100 px-5 py-3 text-sm font-medium text-slate-500"
            >
              제출 예정
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
              disabled={!loadedRecord || !isDirty}
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
