import type { Competency, GradeBand, PypTheme } from '../templates/template-types';

export type AbsoluteGrade = 'A' | 'B' | 'C' | 'D' | 'E';
export type RecordStatus = 'draft' | 'submitted';

export interface WorksheetRecord {
  id: string;
  uid: string;
  templateSlug: string;
  templateVersion: number;
  templateTitleSnapshot: string;
  pypThemeSnapshot: PypTheme;
  competenciesSnapshot: Competency[];
  gradeBandSnapshot: GradeBand;
  performedOn: string;
  status: RecordStatus;
  childGradeBand?: GradeBand | null;
  childNicknameLocalOnly?: never;
  childReflection: string;
  parentMemo: string;
  competencyRatings: Partial<Record<Competency, AbsoluteGrade>>;
  checklistState: Record<string, boolean>;
  createdAt: number;
  updatedAt: number;
}

export interface UserProfile {
  uid: string;
  authType: 'email_password';
  createdAt: number;
  updatedAt: number;
  lastSeenAt: number;
}
