'use client';

import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';

import { getFirebaseAuth } from '@/lib/firebase/auth';

interface PasswordResetRequestFormProps {
  returnToLoginHref: string;
}

function getSubmitLabel(isSubmitting: boolean, hasSubmitted: boolean): string {
  if (isSubmitting) {
    return '안내 메일 준비 중...';
  }

  if (hasSubmitted) {
    return '안내 다시 보내기';
  }

  return '재설정 안내 메일 보내기';
}

function resolveResetError(submissionError: unknown): { tone: 'error' | 'success'; message: string } {
  const errorCode =
    typeof submissionError === 'object' && submissionError !== null && 'code' in submissionError
      ? String(submissionError.code)
      : null;

  if (errorCode === 'auth/user-not-found') {
    return {
      tone: 'success',
      message: '입력한 이메일로 안내를 보낼 수 있는 경우, 곧 메일을 받게 됩니다. 메일함과 스팸함을 함께 확인해 주세요.',
    };
  }

  if (errorCode === 'auth/invalid-email') {
    return {
      tone: 'error',
      message: '이메일 형식을 확인해 주세요.',
    };
  }

  if (errorCode === 'auth/too-many-requests') {
    return {
      tone: 'error',
      message: '요청이 잠시 많습니다. 조금 후 다시 시도해 주세요.',
    };
  }

  if (errorCode === 'auth/network-request-failed') {
    return {
      tone: 'error',
      message: '네트워크 연결을 확인한 뒤 다시 시도해 주세요.',
    };
  }

  return {
    tone: 'error',
    message: '재설정 안내를 보내지 못했습니다. 잠시 후 다시 시도해 주세요.',
  };
}

function isLikelyEmailAddress(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function PasswordResetRequestForm({ returnToLoginHref }: PasswordResetRequestFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusTone, setStatusTone] = useState<'default' | 'error' | 'success'>('default');
  const [statusMessage, setStatusMessage] = useState(
    '로그인에 쓰는 이메일을 입력하면 재설정 안내나 오류 안내를 이 영역에서 확인할 수 있습니다.',
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setStatusTone('error');
      setStatusMessage('이메일을 입력해 주세요.');
      setHasSubmitted(false);
      return;
    }

    if (!isLikelyEmailAddress(normalizedEmail)) {
      setStatusTone('error');
      setStatusMessage('이메일 형식을 확인해 주세요.');
      setHasSubmitted(false);
      return;
    }

    setIsSubmitting(true);
    setStatusTone('default');
    setStatusMessage('재설정 안내를 준비하고 있습니다.');

    try {
      await sendPasswordResetEmail(getFirebaseAuth(), normalizedEmail);
      setStatusTone('success');
      setStatusMessage(
        '입력한 이메일로 안내를 보낼 수 있는 경우, 곧 메일을 받게 됩니다. 메일함과 스팸함을 함께 확인해 주세요.',
      );
      setHasSubmitted(true);
    } catch (submissionError) {
      const resolvedError = resolveResetError(submissionError);
      setStatusTone(resolvedError.tone);
      setStatusMessage(resolvedError.message);
      setHasSubmitted(resolvedError.tone === 'success');
    } finally {
      setIsSubmitting(false);
    }
  }

  const statusClassName =
    statusTone === 'error'
      ? 'border-rose-200 bg-rose-50 text-rose-900'
      : statusTone === 'success'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
        : 'border-stone-300 bg-stone-50 text-slate-500';

  return (
    <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
            비밀번호 재설정
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
            로그인 비밀번호가 기억나지 않으면 이메일로 다시 시작할 수 있어요.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            로그인에 쓰는 이메일을 입력하면 재설정 안내를 보낼 수 있는 경우 메일이 발송됩니다.
            비밀번호를 바꾼 뒤 다시 로그인하면 원래 보려던 흐름으로 돌아갈 수 있습니다.
          </p>

          <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4 text-sm leading-6 text-sky-950">
            <p className="font-medium">안내</p>
            <p className="mt-2">
              보안과 개인정보 보호를 위해, 메일을 보낼 수 없는 경우에도 계정 존재 여부를 구체적으로
              알려드리지 않습니다.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href={returnToLoginHref}
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-stone-400 hover:text-slate-900"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
          <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
                재설정 요청
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                이메일 입력
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                이메일만 입력하면 됩니다. 이 화면에서는 비밀번호를 다시 입력하지 않습니다.
              </p>
            </div>

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

            <div className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${statusClassName}`}>
              {statusMessage}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {getSubmitLabel(isSubmitting, hasSubmitted)}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
