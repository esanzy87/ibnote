'use client';

import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';

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

    setStatus('loading');
    setError(null);

    try {
      const unsubscribe = onAuthStateChanged(
        getFirebaseAuth(),
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
        const resolvedError =
          nextError instanceof Error ? nextError : new Error('Failed to initialize auth state.');

        setUser(null);
        setError(resolvedError);
        setStatus('error');
      }

      return () => {
        isMounted = false;
      };
    }
  }, [reloadKey]);

  return { user, status, error, retry };
}
