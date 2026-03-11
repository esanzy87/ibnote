'use client';

import type { User } from 'firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { AuthUserStatus } from '../auth/use-auth-user';
import type { Competency, GradeBand } from '../templates/template-types';
import { getUserRecord } from './record-repo';
import type { AbsoluteGrade, WorksheetRecord } from './record-types';

export type RecordLoadStatus = 'idle' | 'loading' | 'missing' | 'error' | 'ready';

interface UseRecordOptions {
  authStatus: AuthUserStatus;
  recordId: string;
  user: User | null;
}

export interface UseRecordResult {
  error: Error | null;
  hasAtLeastOneRating: boolean;
  isDirty: boolean;
  loadedRecord: WorksheetRecord | null;
  record: WorksheetRecord | null;
  retry: () => void;
  resetLocalChanges: () => void;
  setChildGradeBand: (value: GradeBand | null) => void;
  setChildReflection: (value: string) => void;
  setCompetencyRating: (competency: Competency, value: AbsoluteGrade | null) => void;
  setParentMemo: (value: string) => void;
  setPerformedOn: (value: string) => void;
  status: RecordLoadStatus;
  toggleChecklistItem: (item: string) => void;
}

function areRecordsEqual(left: WorksheetRecord | null, right: WorksheetRecord | null): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function clearRecordState(
  setStatus: (value: RecordLoadStatus) => void,
  setError: (value: Error | null) => void,
  setLoadedRecord: (value: WorksheetRecord | null) => void,
  setRecord: (value: WorksheetRecord | null) => void,
) {
  setStatus('idle');
  setError(null);
  setLoadedRecord(null);
  setRecord(null);
}

export function useRecord({ authStatus, recordId, user }: UseRecordOptions): UseRecordResult {
  const [status, setStatus] = useState<RecordLoadStatus>('idle');
  const [error, setError] = useState<Error | null>(null);
  const [loadedRecord, setLoadedRecord] = useState<WorksheetRecord | null>(null);
  const [record, setRecord] = useState<WorksheetRecord | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const retry = useCallback(() => {
    setRetryKey((currentValue) => currentValue + 1);
  }, []);

  const resetLocalChanges = useCallback(() => {
    setRecord(loadedRecord);
  }, [loadedRecord]);

  useEffect(() => {
    if (authStatus !== 'authenticated' || !user) {
      clearRecordState(setStatus, setError, setLoadedRecord, setRecord);
      return;
    }

    if (!recordId.trim()) {
      setStatus('missing');
      setError(null);
      setLoadedRecord(null);
      setRecord(null);
      return;
    }

    const currentUser = user;
    let isActive = true;

    setStatus('loading');
    setError(null);
    setLoadedRecord(null);
    setRecord(null);

    async function loadRecord() {
      try {
        const nextRecord = await getUserRecord(currentUser.uid, recordId);

        if (!isActive) {
          return;
        }

        if (!nextRecord) {
          setStatus('missing');
          setLoadedRecord(null);
          setRecord(null);
          return;
        }

        setLoadedRecord(nextRecord);
        setRecord(nextRecord);
        setStatus('ready');
      } catch (nextError) {
        if (!isActive) {
          return;
        }

        const resolvedError =
          nextError instanceof Error
            ? nextError
            : new Error('기록을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        setError(resolvedError);
        setStatus('error');
      }
    }

    void loadRecord();

    return () => {
      isActive = false;
    };
  }, [authStatus, recordId, retryKey, user]);

  const setPerformedOn = useCallback((value: string) => {
    setRecord((currentRecord) =>
      currentRecord
        ? {
            ...currentRecord,
            performedOn: value,
          }
        : currentRecord,
    );
  }, []);

  const setChildGradeBand = useCallback((value: GradeBand | null) => {
    setRecord((currentRecord) =>
      currentRecord
        ? {
            ...currentRecord,
            childGradeBand: value,
          }
        : currentRecord,
    );
  }, []);

  const setChildReflection = useCallback((value: string) => {
    setRecord((currentRecord) =>
      currentRecord
        ? {
            ...currentRecord,
            childReflection: value,
          }
        : currentRecord,
    );
  }, []);

  const setParentMemo = useCallback((value: string) => {
    setRecord((currentRecord) =>
      currentRecord
        ? {
            ...currentRecord,
            parentMemo: value,
          }
        : currentRecord,
    );
  }, []);

  const setCompetencyRating = useCallback((competency: Competency, value: AbsoluteGrade | null) => {
    setRecord((currentRecord) => {
      if (!currentRecord) {
        return currentRecord;
      }

      const nextRatings = { ...currentRecord.competencyRatings };

      if (value) {
        nextRatings[competency] = value;
      } else {
        delete nextRatings[competency];
      }

      return {
        ...currentRecord,
        competencyRatings: nextRatings,
      };
    });
  }, []);

  const toggleChecklistItem = useCallback((item: string) => {
    setRecord((currentRecord) =>
      currentRecord
        ? {
            ...currentRecord,
            checklistState: {
              ...currentRecord.checklistState,
              [item]: !currentRecord.checklistState[item],
            },
          }
        : currentRecord,
    );
  }, []);

  const hasAtLeastOneRating = useMemo(() => {
    if (!record) {
      return false;
    }

    return Object.keys(record.competencyRatings).length > 0;
  }, [record]);

  const isDirty = useMemo(() => !areRecordsEqual(record, loadedRecord), [loadedRecord, record]);

  return {
    error,
    hasAtLeastOneRating,
    isDirty,
    loadedRecord,
    record,
    retry,
    resetLocalChanges,
    setChildGradeBand,
    setChildReflection,
    setCompetencyRating,
    setParentMemo,
    setPerformedOn,
    status,
    toggleChecklistItem,
  };
}
