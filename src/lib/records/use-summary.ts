'use client';

import type { User } from 'firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { collection, getDocsFromServer, orderBy, query, where } from 'firebase/firestore';

import type { AuthUserStatus } from '../auth/use-auth-user';
import { getFirebaseFirestore } from '../firebase/firestore';
import {
  calculateRecordsSummary,
  compareSummaryRecords,
  getSummaryDateRange,
  type RecordsSummary,
} from './summary-utils';
import type { WorksheetRecord } from './record-types';

import { useTranslations } from 'next-intl';

export type SummaryLoadStatus = 'idle' | 'loading' | 'error' | 'ready';

interface UseSummaryOptions {
  authStatus: AuthUserStatus;
  today?: Date;
  user: User | null;
}

export interface UseSummaryResult {
  error: Error | null;
  hasSummaryData: boolean;
  records: WorksheetRecord[];
  retry: () => void;
  status: SummaryLoadStatus;
  summary: RecordsSummary | null;
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

async function loadSummaryRecords(uid: string, today: Date): Promise<WorksheetRecord[]> {
  const window = getSummaryDateRange(today);
  const recordsCollection = collection(getFirebaseFirestore(), 'users', uid, 'records');
  const summaryQuery = query(
    recordsCollection,
    where('status', '==', 'submitted'),
    where('performedOn', '>=', window.startDate),
    where('performedOn', '<=', window.endDate),
    orderBy('performedOn', 'desc'),
    orderBy('updatedAt', 'desc'),
  );
  const snapshot = await getDocsFromServer(summaryQuery);

  return snapshot.docs.map((documentSnapshot) => documentSnapshot.data() as WorksheetRecord);
}

export function useSummary({ authStatus, today, user }: UseSummaryOptions): UseSummaryResult {
  const t = useTranslations('errors');
  const [status, setStatus] = useState<SummaryLoadStatus>('idle');
  const [error, setError] = useState<Error | null>(null);
  const [records, setRecords] = useState<WorksheetRecord[]>([]);
  const [retryKey, setRetryKey] = useState(0);

  const retry = useCallback(() => {
    setRetryKey((currentValue) => currentValue + 1);
  }, []);

  useEffect(() => {
    if (authStatus !== 'authenticated' || !user) {
      setStatus('idle');
      setError(null);
      setRecords([]);
      return;
    }

    const currentUser = user;
    const currentDate = today ?? new Date();
    let isActive = true;

    setStatus('loading');
    setError(null);
    setRecords([]);

    async function fetchSummary() {
      try {
        const nextRecords = await withTimeout(
          loadSummaryRecords(currentUser.uid, currentDate),
          8000,
          t('timeout', { module: '요약' }),
        );

        if (!isActive) {
          return;
        }

        setRecords(nextRecords.sort(compareSummaryRecords));
        setStatus('ready');
      } catch (nextError) {
        if (!isActive) {
          return;
        }

        const resolvedError =
          nextError instanceof Error &&
          nextError.message.includes('지연')
            ? nextError
            : new Error(t('fetch', { module: '요약' }));

        setError(resolvedError);
        setStatus('error');
      }
    }

    void fetchSummary();

    return () => {
      isActive = false;
    };
  }, [authStatus, retryKey, today, user]);

  const summary = useMemo(() => calculateRecordsSummary(records, today), [records, today]);

  return {
    error,
    hasSummaryData: summary !== null,
    records,
    retry,
    status,
    summary,
  };
}
