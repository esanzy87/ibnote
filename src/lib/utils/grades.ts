import type { AbsoluteGrade } from '../records/record-types';

const ABSOLUTE_GRADE_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
} satisfies Record<AbsoluteGrade, number>;

export function absoluteGradeToValue(grade: AbsoluteGrade): number {
  return ABSOLUTE_GRADE_VALUES[grade];
}

export function valueToNearestAbsoluteGrade(value: number): AbsoluteGrade {
  if (value >= 4.5) {
    return 'A';
  }

  if (value >= 3.5) {
    return 'B';
  }

  if (value >= 2.5) {
    return 'C';
  }

  if (value >= 1.5) {
    return 'D';
  }

  return 'E';
}
