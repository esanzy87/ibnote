'use client';

import type { User } from 'firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { AuthUserStatus } from '../auth/use-auth-user';
import { listUserRecords } from './record-repo';
import type { RecordStatus, WorksheetRecord } from './record-types';

export type RecordsFilterStatus = 'all' | RecordStatus;
export type RecordsLoadStatus = 'idle' | 'loading' | 'error' | 'ready';

export interface RecordsTemplateOption {
  slug: string;
  title: string;
}

interface UseRecordsOptions {
  authStatus: AuthUserStatus;
  user: User | null;
}

export interface UseRecordsResult {
  error: Error | null;
  filteredRecords: WorksheetRecord[];
  hasActiveFilters: boolean;
  records: WorksheetRecord[];
  retry: () => void;
  setStatusFilter: (value: RecordsFilterStatus) => void;
  setTemplateFilter: (value: string) => void;
  status: RecordsLoadStatus;
  statusFilter: RecordsFilterStatus;
  templateFilter: string;
  templateOptions: RecordsTemplateOption[];
}

function clearRecordsState(
  setStatus: (value: RecordsLoadStatus) => void,
  setError: (value: Error | null) => void,
  setRecords: (value: WorksheetRecord[]) => void,
) {
  setStatus('idle');
  setError(null);
  setRecords([]);
}

function sortRecords(records: WorksheetRecord[]): WorksheetRecord[] {
  return [...records].sort((left, right) => right.updatedAt - left.updatedAt);
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

export function useRecords({ authStatus, user }: UseRecordsOptions): UseRecordsResult {
  const [status, setStatus] = useState<RecordsLoadStatus>('idle');
  const [error, setError] = useState<Error | null>(null);
  const [records, setRecords] = useState<WorksheetRecord[]>([]);
  const [retryKey, setRetryKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState<RecordsFilterStatus>('all');
  const [templateFilter, setTemplateFilter] = useState('all');

  const retry = useCallback(() => {
    setRetryKey((currentValue) => currentValue + 1);
  }, []);

  useEffect(() => {
    if (authStatus !== 'authenticated' || !user) {
      clearRecordsState(setStatus, setError, setRecords);
      return;
    }

    const currentUser = user;
    let isActive = true;

    setStatus('loading');
    setError(null);
    setRecords([]);

    async function loadRecords() {
      try {
        const nextRecords = await withTimeout(
          listUserRecords(currentUser.uid),
          8000,
          '기록 목록 응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.',
        );

        if (!isActive) {
          return;
        }

        setRecords(sortRecords(nextRecords));
        setStatus('ready');
      } catch (nextError) {
        if (!isActive) {
          return;
        }

        const resolvedError =
          nextError instanceof Error && nextError.message.startsWith('기록 목록 응답이 지연되고 있습니다.')
            ? nextError
            : new Error('기록 목록을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');

        setError(resolvedError);
        setStatus('error');
      }
    }

    void loadRecords();

    return () => {
      isActive = false;
    };
  }, [authStatus, retryKey, user]);

  const templateOptions = useMemo<RecordsTemplateOption[]>(() => {
    const optionsBySlug = new Map<string, RecordsTemplateOption>();

    for (const record of records) {
      if (!optionsBySlug.has(record.templateSlug)) {
        optionsBySlug.set(record.templateSlug, {
          slug: record.templateSlug,
          title: record.templateTitleSnapshot,
        });
      }
    }

    return Array.from(optionsBySlug.values()).sort((left, right) => left.title.localeCompare(right.title, 'ko'));
  }, [records]);

  useEffect(() => {
    if (templateFilter === 'all') {
      return;
    }

    const hasMatchingTemplate = templateOptions.some((option) => option.slug === templateFilter);

    if (!hasMatchingTemplate) {
      setTemplateFilter('all');
    }
  }, [templateFilter, templateOptions]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      if (statusFilter !== 'all' && record.status !== statusFilter) {
        return false;
      }

      if (templateFilter !== 'all' && record.templateSlug !== templateFilter) {
        return false;
      }

      return true;
    });
  }, [records, statusFilter, templateFilter]);

  const hasActiveFilters = statusFilter !== 'all' || templateFilter !== 'all';

  return {
    error,
    filteredRecords,
    hasActiveFilters,
    records,
    retry,
    setStatusFilter,
    setTemplateFilter,
    status,
    statusFilter,
    templateFilter,
    templateOptions,
  };
}
