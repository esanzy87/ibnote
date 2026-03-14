'use client';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { getFirebaseAuth } from '@/lib/firebase/auth';

type AuthMode = 'sign_in' | 'create_account';

interface LoginFormProps {
  nextTarget: string;
}

function getSubmitLabel(mode: AuthMode, isSubmitting: boolean): string {
  if (isSubmitting) {
    return mode === 'sign_in' ? '로그인 중...' : '계정 생성 중...';
  }

  return mode === 'sign_in' ? '로그인' : '계정 만들기';
}

function getModeDescription(mode: AuthMode): string {
  return mode === 'sign_in'
    ? '기존 계정으로 로그인하면 저장해 둔 기록과 최근 흐름을 바로 확인할 수 있습니다.'
    : '처음이라면 계정을 만든 뒤 바로 템플릿을 고르고 기록을 시작할 수 있습니다.';
}

function getAuthStateMessage(mode: AuthMode, isSubmitting: boolean, formError: string | null): string {
  if (isSubmitting) {
    return mode === 'sign_in' ? '로그인을 처리하고 있습니다.' : '계정을 만들고 있습니다.';
  }

  if (formError) {
    return '입력 정보를 확인한 뒤 다시 시도해 주세요.';
  }

  return mode === 'sign_in'
    ? '현재 상태: 기존 계정으로 로그인 대기 중'
    : '현재 상태: 새 계정 생성 대기 중';
}

function resolveAuthErrorMessage(submissionError: unknown): string {
  const errorCode =
    typeof submissionError === 'object' && submissionError !== null && 'code' in submissionError
      ? String(submissionError.code)
      : null;

  if (errorCode === 'auth/invalid-email') {
    return '이메일 형식을 확인해 주세요.';
  }

  if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
    return '이메일 또는 비밀번호가 맞지 않습니다. 다시 확인해 주세요.';
  }

  if (errorCode === 'auth/email-already-in-use') {
    return '이미 사용 중인 이메일입니다. 로그인으로 전환하거나 다른 이메일을 입력해 주세요.';
  }

  if (errorCode === 'auth/weak-password') {
    return '비밀번호는 6자 이상으로 입력해 주세요.';
  }

  return '로그인 또는 계정 생성 중 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.';
}

export function LoginForm({ nextTarget }: LoginFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('sign_in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setFormError(null);

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setFormError('이메일과 비밀번호를 모두 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const auth = getFirebaseAuth();

      if (mode === 'sign_in') {
        await signInWithEmailAndPassword(auth, normalizedEmail, password);
      } else {
        await createUserWithEmailAndPassword(auth, normalizedEmail, password);
      }

      router.replace(nextTarget);
    } catch (submissionError) {
      setFormError(resolveAuthErrorMessage(submissionError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
            로그인
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
            로그인하고 아이와 한 활동 기록을 바로 이어 보세요.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            이메일과 비밀번호로 로그인하거나 계정을 만든 뒤, 요청한 화면으로 바로 돌아갑니다.
          </p>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            로그인 후 이동 경로: <span className="font-medium text-slate-700">{nextTarget}</span>
          </p>

          <div className="mt-5 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm text-slate-500">
            {getAuthStateMessage(mode, isSubmitting, formError)}
          </div>
        </section>

        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-5">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setMode('sign_in')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  mode === 'sign_in'
                    ? 'bg-slate-900 text-white'
                    : 'border border-stone-300 bg-white text-slate-700'
                }`}
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => setMode('create_account')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  mode === 'create_account'
                    ? 'bg-slate-900 text-white'
                    : 'border border-stone-300 bg-white text-slate-700'
                }`}
              >
                계정 만들기
              </button>
            </div>

            <p className="text-sm leading-6 text-slate-600">{getModeDescription(mode)}</p>

            <form className="grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                이메일
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-base text-slate-700 outline-none"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                비밀번호
                <input
                  type="password"
                  name="password"
                  autoComplete={mode === 'sign_in' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="비밀번호 입력"
                  className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-base text-slate-700 outline-none"
                />
              </label>

              <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm text-slate-500">
                {formError ?? '이메일과 비밀번호를 입력하면 여기에서 진행 상태나 오류 안내를 확인할 수 있습니다.'}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {getSubmitLabel(mode, isSubmitting)}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
