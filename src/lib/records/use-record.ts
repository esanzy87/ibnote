'use client';

import type { User } from 'firebase/auth';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { AuthUserStatus } from '../auth/use-auth-user';
import type { Competency, GradeBand } from '../templates/template-types';
import { getUserRecord, saveUserRecord } from './record-repo';
import type { AbsoluteGrade, WorksheetRecord } from './record-types';

export type RecordLoadStatus = 'idle' | 'loading' | 'missing' | 'error' | 'ready';
export type RecordMutationStatus = 'idle' | 'saving' | 'submitting' | 'success' | 'error';

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
  mutationMessage: string | null;
  mutationStatus: RecordMutationStatus;
  record: WorksheetRecord | null;
  retry: () => void;
  resetLocalChanges: () => void;
  saveDraft: () => Promise<boolean>;
  setChildGradeBand: (value: GradeBand | null) => void;
  setChildReflection: (value: string) => void;
  setCompetencyRating: (competency: Competency, value: AbsoluteGrade | null) => void;
  setParentMemo: (value: string) => void;
  setPerformedOn: (value: string) => void;
  status: RecordLoadStatus;
  submitRecord: () => Promise<boolean>;
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
  const [mutationStatus, setMutationStatus] = useState<RecordMutationStatus>('idle');
  const [mutationMessage, setMutationMessage] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const retry = useCallback(() => {
    setRetryKey((currentValue) => currentValue + 1);
  }, []);

  const resetLocalChanges = useCallback(() => {
    setRecord(loadedRecord);
    setMutationStatus('idle');
    setMutationMessage(null);
  }, [loadedRecord]);

  useEffect(() => {
    if (authStatus !== 'authenticated' || !user) {
      clearRecordState(setStatus, setError, setLoadedRecord, setRecord);
      setMutationStatus('idle');
      setMutationMessage(null);
      return;
    }

    if (!recordId.trim()) {
      setStatus('missing');
      setError(null);
      setLoadedRecord(null);
      setRecord(null);
      setMutationStatus('idle');
      setMutationMessage(null);
      return;
    }

    const currentUser = user;
    let isActive = true;

    setStatus('loading');
    setError(null);
    setLoadedRecord(null);
    setRecord(null);
    setMutationStatus('idle');
    setMutationMessage(null);

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
    setMutationStatus('idle');
    setMutationMessage(null);
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
    setMutationStatus('idle');
    setMutationMessage(null);
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
    setMutationStatus('idle');
    setMutationMessage(null);
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
    setMutationStatus('idle');
    setMutationMessage(null);
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
    setMutationStatus('idle');
    setMutationMessage(null);
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
    setMutationStatus('idle');
    setMutationMessage(null);
  }, []);

  const persistRecord = useCallback(
    async (nextStatus: 'draft' | 'submitted') => {
      if (authStatus !== 'authenticated' || !user || !record) {
        setMutationStatus('error');
        setMutationMessage('로그인한 계정에서만 기록을 저장할 수 있습니다.');
        return false;
      }

      if (nextStatus === 'draft' && record.status !== 'draft') {
        setMutationStatus('error');
        setMutationMessage('제출 완료 기록은 초안으로 되돌릴 수 없습니다.');
        return false;
      }

      if (nextStatus === 'submitted') {
        if (!record.performedOn) {
          setMutationStatus('error');
          setMutationMessage('제출하려면 활동한 날짜가 필요합니다.');
          return false;
        }

        if (Object.keys(record.competencyRatings).length === 0) {
          setMutationStatus('error');
          setMutationMessage('제출하려면 역량 평정을 1개 이상 선택해 주세요.');
          return false;
        }
      }

      setMutationStatus(nextStatus === 'draft' ? 'saving' : 'submitting');
      setMutationMessage(null);

      try {
        const persistedRecord = await saveUserRecord({
          ...record,
          status: nextStatus === 'submitted' ? 'submitted' : record.status,
        });

        setLoadedRecord(persistedRecord);
        setRecord(persistedRecord);
        setMutationStatus('success');
        setMutationMessage(
          nextStatus === 'draft'
            ? '초안이 저장되었습니다.'
            : record.status === 'submitted'
              ? '제출 완료 상태로 변경 사항이 저장되었습니다.'
              : '기록이 제출되었습니다.',
        );
        return true;
      } catch (nextError) {
        setMutationStatus('error');
        setMutationMessage(
          nextError instanceof Error
            ? nextError.message
            : '기록을 저장하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        );
        return false;
      }
    },
    [authStatus, record, user],
  );

  const saveDraft = useCallback(() => persistRecord('draft'), [persistRecord]);
  const submitRecord = useCallback(() => persistRecord('submitted'), [persistRecord]);

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
    mutationMessage,
    mutationStatus,
    record,
    retry,
    resetLocalChanges,
    saveDraft,
    setChildGradeBand,
    setChildReflection,
    setCompetencyRating,
    setParentMemo,
    setPerformedOn,
    status,
    submitRecord,
    toggleChecklistItem,
  };
}
