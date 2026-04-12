'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { buildLoginHref } from '@/lib/auth/ensure-auth';
import { useAuthUser } from '@/lib/auth/use-auth-user';
import { useRecord } from '@/lib/records/use-record';
import type { AbsoluteGrade, WorksheetRecord } from '@/lib/records/record-types';
import type { Competency, GradeBand } from '@/lib/templates/template-types';

const COMPETENCY_LABELS = {
  literacy: '문해',
  thinking: '사고력',
  expression: '표현',
  collaboration: '협력',
  digital_literacy: '디지털 문해',
} satisfies Record<Competency, string>;

const GRADE_BAND_LABELS = {
  g1_2: '초1-2 (Early Explorers)',
  g3_4: '초3-4 (Discovery Stage)',
  g5_6: '초5-6 (Junior Mastery)',
} satisfies Record<GradeBand, string>;

const RATING_LABELS = {
  A: 'Watching',
  B: 'Exploring',
  C: 'Connecting',
  D: 'Deepening',
  E: 'Mastering'
} satisfies Record<AbsoluteGrade, string>;

const RECORD_PRIVACY_NOTE =
  '실제 아이 이름, 학교명, 기타 민감한 개인 정보는 입력하지 마세요.';

interface RecordEditorProps {
  recordId: string;
}

function EditorHeader({ record, isDirty }: { record: WorksheetRecord, isDirty: boolean }) {
  const lastSavedFormatted = new Date(record.updatedAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5dfdc] bg-[#fdfcfb]/80 px-4 py-4 backdrop-blur-md md:px-10">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-2 text-sm font-medium text-[#886f63]">
            <Link href="/my/records" className="flex items-center gap-1 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              내 기록
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">에디터</span>
          </nav>
          <h1 className="text-xl font-bold tracking-tight">{record.templateTitleSnapshot}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="mr-2 hidden flex-col items-end md:flex">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#886f63]">상태</span>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${record.status === 'draft' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              <span className="text-xs font-bold">{record.status === 'draft' ? '초안' : '제출 완료'}</span>
            </div>
          </div>
          <div className="rounded-lg border border-[#e5dfdc] bg-[#f4f2f0] px-4 py-2">
            <p className="mb-1 text-[10px] font-bold uppercase leading-none tracking-tight text-[#886f63]">저장 상태</p>
            <p className="text-xs font-bold leading-none">{isDirty ? '저장 필요' : `${lastSavedFormatted} 저장됨`}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionGuidance() {
  return (
    <section className="mb-8">
      <div className="flex items-start gap-4 rounded-xl border border-primary/10 bg-primary/5 p-5">
        <span className="material-symbols-outlined mt-0.5 text-primary">auto_awesome</span>
        <div>
          <h3 className="mb-1 text-sm font-bold text-primary">천천히 적어보세요.</h3>
          <p className="text-sm leading-relaxed text-[#886f63]">
            이 기록은 오직 부모님과 아이를 위한 노트입니다. 완성된 문장이 아니어도 괜찮습니다. 지금 떠오르는 가장 인상 깊은 장면 조각부터 정리해 보세요.
          </p>
        </div>
      </div>
    </section>
  );
}

function SceneCapture({ 
  record, 
  setPerformedOn, 
  setChildGradeBand, 
  setChildReflection, 
  setParentMemo 
}: { 
  record: WorksheetRecord;
  setPerformedOn: (val: string) => void;
  setChildGradeBand: (val: GradeBand | null) => void;
  setChildReflection: (val: string) => void;
  setParentMemo: (val: string) => void;
}) {
  return (
    <section className="mb-10 space-y-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">filter_vintage</span>
        <h2 className="text-lg font-bold">장면 기록</h2>
      </div>
      
      <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-4 text-xs leading-6 text-amber-950 mb-6">
        <p className="font-semibold">{RECORD_PRIVACY_NOTE}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col justify-end">
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#886f63]">활동 날짜</label>
          <div className="relative">
            <input
              type="date"
              value={record.performedOn || ''}
              onChange={(e) => setPerformedOn(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#e5dfdc] bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#886f63]">아이 학년 / 연령대</label>
          <div className="relative">
            <select
              value={record.childGradeBand || ''}
              onChange={(e) => setChildGradeBand((e.target.value as GradeBand) || null)}
              className="w-full appearance-none rounded-xl border border-[#e5dfdc] bg-white px-4 py-3 pr-10 text-sm shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">선택 안 함</option>
              {(Object.keys(GRADE_BAND_LABELS) as GradeBand[]).map(band => (
                <option key={band} value={band}>{GRADE_BAND_LABELS[band]}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#886f63] material-symbols-outlined">unfold_more</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#886f63]">아이 반응 메모</label>
          <textarea
            value={record.childReflection || ''}
            onChange={(e) => setChildReflection(e.target.value)}
            className="min-h-[100px] w-full resize-none rounded-xl border border-[#e5dfdc] bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="아이가 무엇을 처음으로 깨달았나요? (예: 모래의 촉감이 차갑다고 말했어요)"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#886f63]">부모 메모 / 감상</label>
          <textarea
            value={record.parentMemo || ''}
            onChange={(e) => setParentMemo(e.target.value)}
            className="min-h-[100px] w-full resize-none rounded-xl border border-[#e5dfdc] bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="아이를 지켜보며 부모님은 어떤 감정을 느꼈나요?"
          />
        </div>
      </div>
    </section>
  );
}

function ReflectionTips() {
  return (
    <section className="mb-10">
      <div className="rounded-xl border border-[#e5dfdc] bg-[#f4f2f0] p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">lightbulb</span>
          <h3 className="text-sm font-bold">작성 팁 (Reflection Tips)</h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-[#886f63]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
            아이의 시선이 얼마나 오랫동안 머물렀는지 적어보세요. (Focus & Stillness)
          </li>
          <li className="flex items-center gap-3 text-sm text-[#886f63]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
            활동 중 뜻밖의 어려움을 마주했을 때의 반응을 남겨두는 것도 좋습니다.
          </li>
          <li className="flex items-center gap-3 text-sm text-[#886f63]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
            아이가 부모님을 그 순간에 어떻게 초대했는지 떠올려 보세요.
          </li>
        </ul>
      </div>
    </section>
  );
}

function GrowthObservation({ record, setCompetencyRating }: { record: WorksheetRecord, setCompetencyRating: (comp: Competency, val: AbsoluteGrade | null) => void }) {
  if (!record.competenciesSnapshot || record.competenciesSnapshot.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">psychology_alt</span>
        <h2 className="text-lg font-bold">성장 관찰 (Growth Observation)</h2>
      </div>
      <p className="mb-6 text-sm text-[#886f63]">오늘 이 활동에서 아이는 어떤 발달 과정을 거쳤나요? 각 역량마다 가장 알맞은 성취도를 선택하세요.</p>
      
      <div className="grid gap-10">
        {record.competenciesSnapshot.map(comp => (
          <div key={comp} className="border-t border-[#e5dfdc]/60 pt-6 first:border-0 first:pt-0">
            <h3 className="mb-5 font-bold text-sm uppercase text-slate-800 tracking-wider flex items-center justify-between">
              {COMPETENCY_LABELS[comp]}
              {record.competencyRatings[comp] ? (
                <button type="button" onClick={() => setCompetencyRating(comp, null)} className="text-xs text-[#886f63] font-medium hover:text-primary transition-colors">
                  선택 초기화
                </button>
              ) : null}
            </h3>
            <div className="flex flex-wrap gap-4 justify-between">
              {(['A', 'B', 'C', 'D', 'E'] as const).map(grade => {
                const isSelected = record.competencyRatings[comp] === grade;
                return (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setCompetencyRating(comp, grade)}
                    className="group flex min-w-[50px] flex-1 flex-col items-center gap-2 md:min-w-[80px]"
                  >
                    <div className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 transition-all text-base md:text-lg font-bold ${
                      isSelected ? 'border-primary bg-primary/10 text-primary shadow-sm scale-110' : 'border-[#e5dfdc] bg-white text-[#886f63] group-hover:border-primary/40 group-hover:text-primary'
                    }`}>
                      {grade}
                    </div>
                    <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-tight ${isSelected ? 'text-primary' : 'text-[#886f63] group-hover:text-primary'}`}>
                      {RATING_LABELS[grade]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewChecklist({ record, toggleChecklistItem }: { record: WorksheetRecord, toggleChecklistItem: (val: string) => void }) {
  if (!record.checklistState || Object.keys(record.checklistState).length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">task_alt</span>
        <h2 className="text-lg font-bold">Review (점검하기)</h2>
      </div>
      <div className="space-y-3">
        {Object.entries(record.checklistState).map(([item, checked]) => (
          <label key={item} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e5dfdc] bg-white p-4 shadow-sm transition-all hover:border-primary/30">
            <input 
              type="checkbox"
              checked={checked}
              onChange={() => toggleChecklistItem(item)}
              className="h-5 w-5 rounded border-[#e5dfdc] text-primary focus:ring-primary/20"
            />
            <span className="text-sm font-medium">{item}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

function AuthStateDisplay({ message, onRetry, isError }: { message: string; onRetry?: () => void; isError?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fdfcfb] font-sans">
      {isError ? <span className="material-symbols-outlined text-4xl text-rose-400 mb-4">error</span> : <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary mb-4" />}
      <h3 className="text-xl font-bold text-slate-800 mb-2">{isError ? '오류가 발생했습니다' : '기록 편집기를 여는 중...'}</h3>
      <p className="text-slate-500 mb-6">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="rounded-full bg-primary px-6 py-2 text-white font-bold transition-all hover:bg-primary/90">
          다시 실행하기
        </button>
      )}
      {isError && (
        <Link href="/my/records" className="mt-4 text-sm text-[#886f63] hover:text-primary transition-colors">
          목록으로 돌아가기
        </Link>
      )}
    </div>
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

  if (authStatus === 'loading' || (recordStatus === 'loading' && authStatus === 'authenticated')) {
    return <AuthStateDisplay message="로그인 상태와 기록을 확인하고 있습니다." />;
  }

  if (authStatus === 'error') {
    return <AuthStateDisplay message={authError?.message ?? '인증 상태를 확인하지 못했습니다.'} onRetry={retryAuth} isError />;
  }

  if (recordStatus === 'error') {
    return <AuthStateDisplay message={recordError?.message ?? '기록 데이터를 찾을 수 없습니다.'} onRetry={retryRecord} isError />;
  }

  if (authStatus === 'unauthenticated' || recordStatus === 'missing' || !record) {
    return <AuthStateDisplay message={recordStatus === 'missing' ? '해당 기록을 찾을 수 없습니다.' : '로그인 화면으로 이동합니다.'} isError />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfb] font-sans text-slate-900 pb-32">
      <EditorHeader record={record} isDirty={isDirty} />
      
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <SectionGuidance />
        <SceneCapture 
          record={record} 
          setPerformedOn={setPerformedOn}
          setChildGradeBand={setChildGradeBand}
          setChildReflection={setChildReflection}
          setParentMemo={setParentMemo}
        />
        <ReflectionTips />
        <GrowthObservation record={record} setCompetencyRating={setCompetencyRating} />
        <ReviewChecklist record={record} toggleChecklistItem={toggleChecklistItem} />

        {mutationMessage && (
          <div className={`mt-6 rounded-xl border p-4 text-sm font-medium ${mutationStatus === 'error' ? 'border-rose-200 bg-rose-50 text-rose-900' : 'border-emerald-200 bg-emerald-50 text-emerald-950'}`}>
            {mutationMessage}
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#e5dfdc] bg-white/90 px-4 py-4 backdrop-blur-lg md:px-10">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <div className="hidden sm:block text-xs text-[#886f63] font-medium min-w-max mr-auto">
            {isDirty ? (
              <span className="text-amber-600">저장되지 않은 변경사항이 있습니다</span>
            ) : (
              <span>필수 항목: <span className={record.performedOn ? 'text-emerald-600' : 'text-amber-600'}>날짜 {record.performedOn ? '입력됨' : '필요'}</span> / <span className={hasAtLeastOneRating ? 'text-emerald-600' : 'text-amber-600'}>역량 {hasAtLeastOneRating ? '평가됨' : '필요'}</span></span>
            )}
          </div>
          
          <button
            type="button"
            onClick={resetLocalChanges}
            disabled={!loadedRecord || !isDirty || isWritePending}
            className="flex-1 rounded-xl border border-[#e5dfdc] bg-transparent py-3.5 text-sm font-bold tracking-wide text-slate-500 hover:text-slate-900 transition-all disabled:opacity-30 disabled:hover:text-slate-500 sm:flex-none sm:px-6 hidden sm:block"
          >
            되돌리기
          </button>
          
          {record.status === 'draft' && (
            <button
              type="button"
              onClick={() => { void saveDraft(); }}
              disabled={isWritePending}
              className="flex-1 rounded-xl border border-[#e5dfdc] bg-[#f4f2f0] py-3.5 text-sm font-bold tracking-wide text-slate-900 transition-all hover:bg-[#e5dfdc] disabled:opacity-50"
            >
              {mutationStatus === 'saving' ? '저장 중...' : '임시 저장'}
            </button>
          )}

          <button
            type="button"
            onClick={() => { void submitRecord(); }}
            disabled={isWritePending}
            className="flex-[2] sm:flex-[1.5] rounded-xl bg-primary py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:bg-primary/50"
          >
            {mutationStatus === 'submitting' 
              ? (record.status === 'submitted' ? '저장 중...' : '제출 중...') 
              : (record.status === 'submitted' ? '최종 기록 업데이트' : '기록 완료하기')}
          </button>
        </div>
      </footer>
    </div>
  );
}
