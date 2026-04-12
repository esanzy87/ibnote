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
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background-light font-display">
      {/* Left Panel: Brand & Narrative */}
      <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden bg-primary/5">
        <div className="z-10">
          <Link href="/" className="flex items-center gap-3 text-primary">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <span className="material-symbols-outlined">auto_stories</span>
            </span>
            <span className="text-2xl font-bold tracking-tight text-slate-900">IBNote</span>
          </Link>
        </div>
        
        <div className="z-10 max-w-lg space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
            소중한 연결을 위해<br />다시 안내해 드릴게요.
          </h1>
          <p className="text-lg leading-relaxed text-slate-600">
            비밀번호를 잊으셔도 괜찮습니다. 차분히 이메일을 입력해 주시면 안전하게 다시 로그인할 수 있는 링크를 보내드립니다. 아이와의 순간을 계속해서 기록해 나갈 수 있도록 도와드릴게요.
          </p>
          <div className="pt-8">
            <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm bg-white p-2">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH_lcEr14NagON8yO6aCTKI3-bVzNSErMxkSCNgZ_wrTEjdaePVetYxXt4LV1tT8WS35yngRwMmPAveaxEz-d-bLSy3nCbXtZ-Dvwu9hzkMmYIjJfYAjxTB1jZT5JD3945GsE-Ka1--UO3aRAigyPI_Hqr87BO6n0sYjbKHC2vPdfCLmywQpVtm8I6vRNTIkIguvbpg7SM-ZqwZz_5TgvQWWqV_SpPolEo6veksnQx_W_rvGP1OXlXpVaKL5eY7KKD7H5xehMYRc0" 
                alt="아이와 함께하는 평온한 순간" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        
        <div className="z-10">
          <p className="text-sm text-slate-400">© 2026 IBNote. 모든 가족의 순간을 소중히 여깁니다.</p>
        </div>

        {/* Background soft glow elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 size-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      {/* Right Panel: Password Reset Form */}
      <main className="flex w-full flex-col justify-center items-center p-6 sm:p-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden mb-12 flex items-center gap-3 text-primary">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <span className="material-symbols-outlined">auto_stories</span>
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">IBNote</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">비밀번호 재설정</h2>
            <p className="text-slate-500">가입하신 이메일 주소를 입력해 주세요.</p>
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

          <div className="flex flex-col items-center gap-4 pt-4">
            <Link 
              href={returnToLoginHref}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              로그인 화면으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
