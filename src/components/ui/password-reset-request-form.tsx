'use client';

import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';

import { getFirebaseAuth } from '@/lib/firebase/auth';

interface PasswordResetRequestFormProps {
  returnToLoginHref: string;
}

function resolveResetError(submissionError: unknown): string {
  const errorCode =
    typeof submissionError === 'object' && submissionError !== null && 'code' in submissionError
      ? String(submissionError.code)
      : null;

  if (errorCode === 'auth/user-not-found') {
    return '입력한 이메일로 안내를 보낼 수 있는 경우, 곧 메일을 받게 됩니다. 메일함과 스팸함을 함께 확인해 주세요.';
  }

  if (errorCode === 'auth/invalid-email') {
    return '이메일 형식을 확인해 주세요.';
  }

  if (errorCode === 'auth/too-many-requests') {
    return '요청이 잠시 많습니다. 조금 후 다시 시도해 주세요.';
  }

  if (errorCode === 'auth/network-request-failed') {
    return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
  }

  return '재설정 안내를 보내지 못했습니다. 잠시 후 다시 시도해 주세요.';
}

function isLikelyEmailAddress(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function PasswordResetRequestForm({ returnToLoginHref }: PasswordResetRequestFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setStatus('error');
      setErrorMessage('이메일을 입력해 주세요.');
      return;
    }

    if (!isLikelyEmailAddress(normalizedEmail)) {
      setStatus('error');
      setErrorMessage('이메일 형식을 확인해 주세요.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage(null);

    try {
      const auth = getFirebaseAuth();
      await sendPasswordResetEmail(auth, normalizedEmail);
      setEmail(normalizedEmail);
      setStatus('success');
    } catch (err) {
      console.error('Password reset error:', err);
      const message = resolveResetError(err);

      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        String(err.code) === 'auth/user-not-found'
      ) {
        setEmail(normalizedEmail);
        setStatus('success');
        setErrorMessage(null);
      } else {
        setStatus('error');
        setErrorMessage(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background-light">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-20 lg:px-40">
        <div className="w-full max-w-[440px]">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-3xl">lock_reset</span>
            </div>
            <h1 className="mb-2 text-3xl font-black tracking-tight text-slate-900">비밀번호 재설정</h1>
            <p className="text-slate-600">가입하신 이메일 주소를 입력하시면<br />다시 로그인하실 수 있게 링크를 보내드립니다.</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
            {status === 'success' ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <span className="material-symbols-outlined text-2xl">check</span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-slate-900">메일이 발송되었습니다</h2>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">
                  입력하신 이메일({email})로 안내 메일을 보냈습니다. 메일함의 링크를 통해 비밀번호를 변경해 주세요.
                </p>
                <Link
                  href={returnToLoginHref}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary py-4 font-bold text-white transition hover:bg-primary/90"
                >
                  로그인 화면으로 이동
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">이메일 주소</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@ibnote.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  {status === 'error' && (
                    <p className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {errorMessage}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white transition-all active:scale-95 disabled:opacity-50 hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <span className="material-symbols-outlined text-xl">send</span>
                  )}
                  {isSubmitting ? '보내는 중...' : '재설정 링크 보내기'}
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400">
              보안을 위해 계정의 존재 여부를 별도로 확인해 드리지 않습니다.<br />
              메일이 오지 않는다면 스팸 메일함을 확인해 주세요.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
