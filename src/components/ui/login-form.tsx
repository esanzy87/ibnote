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
    ? '기존 계정으로 로그인합니다.'
    : '새 계정을 만들고 바로 서비스로 들어갑니다.';
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
      const resolvedError =
        submissionError instanceof Error
          ? submissionError.message
          : '인증 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';

      setFormError(resolvedError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
            Account access
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
            로그인 후 템플릿과 기록 기능을 사용할 수 있습니다.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            이메일 계정으로 로그인하거나 새 계정을 만들어 서비스로 들어갑니다.
          </p>

          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
            로그인 후 이동 예정 경로: <span className="font-medium">{nextTarget}</span>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm text-slate-500">
            현재 상태: 로그인 또는 계정 생성을 기다리는 중
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
                {formError ?? '오류가 있으면 여기에 표시됩니다.'}
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
