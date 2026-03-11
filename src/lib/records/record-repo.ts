import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { getFirebaseFirestore } from '../firebase/firestore';
import type { WorksheetTemplate } from '../templates/template-types';
import { getLocalDateStamp } from '../utils/dates';
import type { WorksheetRecord } from './record-types';

function getUserRecordsCollection(uid: string) {
  return collection(getFirebaseFirestore(), 'users', uid, 'records');
}

function getUserRecordDocument(uid: string, recordId: string) {
  return doc(getUserRecordsCollection(uid), recordId);
}

function buildChecklistState(template: WorksheetTemplate): Record<string, boolean> {
  return Object.fromEntries(template.checklist.map((item) => [item, false]));
}

export function getUserRecordsCollectionPath(uid: string): string {
  return `users/${uid}/records`;
}

export function getUserRecordDocumentPath(uid: string, recordId: string): string {
  return `${getUserRecordsCollectionPath(uid)}/${recordId}`;
}

export function buildDraftRecord(uid: string, template: WorksheetTemplate): WorksheetRecord {
  const recordId = doc(getUserRecordsCollection(uid)).id;
  const timestamp = Date.now();

  return {
    id: recordId,
    uid,
    templateSlug: template.slug,
    templateVersion: template.version,
    templateTitleSnapshot: template.title,
    pypThemeSnapshot: template.pypTheme,
    competenciesSnapshot: template.competencies.slice(),
    gradeBandSnapshot: template.gradeBand,
    performedOn: getLocalDateStamp(),
    status: 'draft',
    childGradeBand: null,
    childReflection: '',
    parentMemo: '',
    competencyRatings: {},
    checklistState: buildChecklistState(template),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export async function createUserRecord(record: WorksheetRecord): Promise<WorksheetRecord> {
  await setDoc(getUserRecordDocument(record.uid, record.id), record);
  return record;
}

export async function createDraftRecord(
  uid: string,
  template: WorksheetTemplate,
): Promise<WorksheetRecord> {
  return createUserRecord(buildDraftRecord(uid, template));
}

export async function getUserRecord(
  uid: string,
  recordId: string,
): Promise<WorksheetRecord | null> {
  const snapshot = await getDoc(getUserRecordDocument(uid, recordId));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as WorksheetRecord;
}

export async function listUserRecords(uid: string): Promise<WorksheetRecord[]> {
  const snapshot = await getDocs(
    query(getUserRecordsCollection(uid), orderBy('updatedAt', 'desc')),
  );

  return snapshot.docs.map((documentSnapshot) => documentSnapshot.data() as WorksheetRecord);
}

export async function updateUserRecord(
  uid: string,
  recordId: string,
  updates: Partial<WorksheetRecord>,
): Promise<void> {
  await updateDoc(getUserRecordDocument(uid, recordId), updates);
}

export async function deleteAllUserRecords(uid: string): Promise<void> {
  const snapshot = await getDocs(getUserRecordsCollection(uid));

  await Promise.all(snapshot.docs.map((documentSnapshot) => deleteDoc(documentSnapshot.ref)));
}
