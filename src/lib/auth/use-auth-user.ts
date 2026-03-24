'use client';

import type { User } from 'firebase/auth';
import {
  inMemoryPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';

import {
  getConfiguredDevAuthBypassEmail,
  getConfiguredDevAuthBypassPassword,
  getDevAuthBypassUid,
} from './dev-auth';
import { getFirebaseAuth } from '../firebase/auth';

export type AuthUserStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'error';

export interface AuthUserState {
  user: User | null;
  status: AuthUserStatus;
  error: Error | null;
  retry: () => void;
}

function resolveAuthError(nextError: unknown): Error {
  if (nextError instanceof Error) {
    return nextError;
  }

  return new Error('Failed to initialize auth state.');
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error(message));
    }, timeoutMs);

    promise.then(
      (value) => {
        window.clearTimeout(timeoutId);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timeoutId);
        reject(error);
      },
    );
  });
}

export function useAuthUser(): AuthUserState {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthUserStatus>('loading');
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const retry = useCallback(() => {
    setReloadKey((currentValue) => currentValue + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let isDevAuthPending = false;

    setStatus('loading');
    setError(null);

    const devAuthBypassUid = getDevAuthBypassUid();
    const auth = getFirebaseAuth();

    if (devAuthBypassUid) {
      isDevAuthPending = true;

      const unsubscribe = onAuthStateChanged(
        auth,
        (nextUser) => {
          if (!isMounted) {
            return;
          }

          setUser(nextUser);

          if (nextUser) {
            isDevAuthPending = false;
            setStatus('authenticated');
            return;
          }

          setStatus(isDevAuthPending ? 'loading' : 'unauthenticated');
        },
        (nextError) => {
          if (!isMounted) {
            return;
          }

          isDevAuthPending = false;
          setUser(null);
          setError(resolveAuthError(nextError));
          setStatus('error');
        },
      );

      async function initializeDevAuth() {
        try {
          if (auth.currentUser?.uid === devAuthBypassUid) {
            if (isMounted) {
              isDevAuthPending = false;
              setUser(auth.currentUser);
              setStatus('authenticated');
              setError(null);
            }

            return;
          }

          await setPersistence(auth, inMemoryPersistence);

          const credential = await withTimeout(
            signInWithEmailAndPassword(
              auth,
              getConfiguredDevAuthBypassEmail(),
              getConfiguredDevAuthBypassPassword(),
            ),
            8000,
            '개발용 자동 로그인이 시간 안에 완료되지 않았습니다. QA 계정 자격 증명과 브라우저 자동화 환경을 확인해 주세요.',
          );

          if (credential.user.uid !== devAuthBypassUid) {
            throw new Error(
              `개발용 자동 로그인 계정 UID가 예상과 다릅니다. expected=${devAuthBypassUid}, actual=${credential.user.uid}`,
            );
          }
        } catch (nextError) {
          if (!isMounted) {
            return;
          }

          isDevAuthPending = false;
          setUser(null);
          setError(resolveAuthError(nextError));
          setStatus('error');
        }
      }

      void initializeDevAuth();

      return () => {
        isMounted = false;
        unsubscribe();
      };
    }

    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (nextUser) => {
          if (!isMounted) {
            return;
          }

          setUser(nextUser);
          setStatus(nextUser ? 'authenticated' : 'unauthenticated');
        },
        (nextError) => {
          if (!isMounted) {
            return;
          }

          setUser(null);
          setError(nextError);
          setStatus('error');
        },
      );

      return () => {
        isMounted = false;
        unsubscribe();
      };
    } catch (nextError) {
      if (isMounted) {
        setUser(null);
        setError(resolveAuthError(nextError));
        setStatus('error');
      }

      return () => {
        isMounted = false;
      };
    }
  }, [reloadKey]);

  return { user, status, error, retry };
}
