'use client';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { buildPasswordResetHref } from '@/lib/auth/ensure-auth';
import { getFirebaseAuth } from '@/lib/firebase/auth';

type AuthMode = 'sign_in' | 'create_account';

interface LoginFormProps {
  nextTarget: string;
  requestedNextTarget: string | null;
}

function getSubmitLabel(mode: AuthMode, isSubmitting: boolean): string {
  if (isSubmitting) {
    return mode === 'sign_in' ? '로그인 중...' : '계정 생성 중...';
  }

  return mode === 'sign_in' ? '로그인하고 기록 보기' : '계정 만들고 시작하기';
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

  return '문제가 생겼습니다. 잠시 후 다시 시도해 주세요.';
}

export function LoginForm({ nextTarget, requestedNextTarget }: LoginFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('sign_in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const passwordResetHref = buildPasswordResetHref(requestedNextTarget);

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
    <div className="flex min-h-screen items-center justify-center bg-background-light p-0 font-display text-slate-900 md:p-6 lg:p-12">
      <main className="flex min-h-[85vh] w-full max-w-6xl flex-col overflow-hidden bg-white shadow-2xl md:flex-row md:rounded-xl">
        {/* Left Panel: Informational */}
        <div className="relative flex w-full flex-col justify-center overflow-hidden bg-primary/10 p-8 md:w-1/2 md:p-16 lg:p-24">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>

          <div className="relative z-10">
            <Link href="/" className="mb-12 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <span className="material-symbols-outlined">auto_stories</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-800">IBNote</span>
            </Link>

            <h1 className="mb-6 text-4xl font-bold leading-[1.15] text-slate-900 lg:text-5xl">
              우리 아이의 기록을 위해 다시 오신 것을 환영합니다.
            </h1>

            <p className="mb-8 max-w-md text-lg leading-relaxed text-slate-600">
              로그인하면 이전에 남긴 기록과 최근 요약을 바로 확인하고, 이어서 새로운 활동을 기록할 수 있습니다.
            </p>

            <div className="border-t border-primary/10 py-6">
              <p className="text-sm font-medium text-slate-500">
                로그인 후 이동: <span className="text-slate-700">{nextTarget}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Form */}
        <div className="flex w-full flex-col items-center justify-center bg-white p-8 md:w-1/2 md:p-16 lg:p-20">
          <div className="w-full max-w-sm">
            {/* Toggle Switch */}
            <div className="mb-10 flex rounded-xl bg-slate-100 p-1.5">
              <button
                type="button"
                onClick={() => {
                  setMode('sign_in');
                  setFormError(null);
                }}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  mode === 'sign_in'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('create_account');
                  setFormError(null);
                }}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  mode === 'create_account'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                계정 만들기
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                  이메일 주소
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </span>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    disabled={isSubmitting}
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                    비밀번호
                  </label>
                  <Link
                    href={passwordResetHref}
                    className="text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'sign_in' ? 'current-password' : 'new-password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-11 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {formError && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                  {formError}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {getSubmitLabel(mode, isSubmitting)}
                </button>
              </div>
            </form>

            <div className="mt-10 text-center">
              <Link href="/" className="text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-700">
                처음 화면으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
