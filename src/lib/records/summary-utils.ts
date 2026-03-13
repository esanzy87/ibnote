import type { Competency } from '../templates/template-types';
import { COMPETENCIES } from '../templates/template-types';
import { getLocalDateStamp } from '../utils/dates';
import { absoluteGradeToValue, valueToNearestAbsoluteGrade } from '../utils/grades';
import type { AbsoluteGrade, WorksheetRecord } from './record-types';

export interface SummaryCompetencyCount {
  competency: Competency;
  count: number;
}

export interface SummaryCompetencyAverage {
  competency: Competency;
  averageValue: number;
  roundedAverage: number;
  nearestGrade: AbsoluteGrade;
  ratingCount: number;
}

export interface SummaryWindow {
  endDate: string;
  startDate: string;
}

export interface RecordsSummary {
  averageGradesByCompetency: SummaryCompetencyAverage[];
  countsByCompetency: SummaryCompetencyCount[];
  recentRecords: WorksheetRecord[];
  totalSubmittedRecords: number;
  window: SummaryWindow;
}

interface SummaryDateRange {
  endDate: string;
  startDate: string;
}

const SUMMARY_LOOKBACK_DAYS = 14;
const SUMMARY_RECENT_RECORDS_LIMIT = 5;

function subtractDays(date: Date, dayCount: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() - dayCount);
  return nextDate;
}

export function getSummaryDateRange(today: Date = new Date()): SummaryDateRange {
  return {
    endDate: getLocalDateStamp(today),
    startDate: getLocalDateStamp(subtractDays(today, SUMMARY_LOOKBACK_DAYS - 1)),
  };
}

export function compareSummaryRecords(left: WorksheetRecord, right: WorksheetRecord): number {
  const performedOnComparison = right.performedOn.localeCompare(left.performedOn);

  if (performedOnComparison !== 0) {
    return performedOnComparison;
  }

  return right.updatedAt - left.updatedAt;
}

export function isRecordInsideSummaryWindow(record: WorksheetRecord, window: SummaryDateRange): boolean {
  return record.performedOn >= window.startDate && record.performedOn <= window.endDate;
}

function createEmptyCountMap(): Record<Competency, number> {
  return Object.fromEntries(COMPETENCIES.map((competency) => [competency, 0])) as Record<Competency, number>;
}

function createEmptyAverageSourceMap(): Record<Competency, number[]> {
  return COMPETENCIES.reduce(
    (result, competency) => {
      result[competency] = [];
      return result;
    },
    {} as Record<Competency, number[]>,
  );
}

export function calculateRecordsSummary(
  records: WorksheetRecord[],
  today: Date = new Date(),
): RecordsSummary | null {
  const window = getSummaryDateRange(today);
  const filteredRecords = records
    .filter((record) => record.status === 'submitted' && isRecordInsideSummaryWindow(record, window))
    .sort(compareSummaryRecords);

  if (filteredRecords.length === 0) {
    return null;
  }

  const countsByCompetency = createEmptyCountMap();
  const averageSources = createEmptyAverageSourceMap();

  for (const record of filteredRecords) {
    for (const competency of Object.keys(record.competencyRatings) as Competency[]) {
      const rating = record.competencyRatings[competency];

      if (!rating) {
        continue;
      }

      countsByCompetency[competency] += 1;
      averageSources[competency].push(absoluteGradeToValue(rating));
    }
  }

  return {
    totalSubmittedRecords: filteredRecords.length,
    countsByCompetency: COMPETENCIES.map((competency) => ({
      competency,
      count: countsByCompetency[competency],
    })),
    averageGradesByCompetency: COMPETENCIES.flatMap((competency) => {
      const values = averageSources[competency];

      if (values.length === 0) {
        return [];
      }

      const averageValue = values.reduce((sum, value) => sum + value, 0) / values.length;
      const roundedAverage = Math.round(averageValue * 10) / 10;

      return [
        {
          competency,
          averageValue,
          roundedAverage,
          nearestGrade: valueToNearestAbsoluteGrade(roundedAverage),
          ratingCount: values.length,
        },
      ];
    }),
    recentRecords: filteredRecords.slice(0, SUMMARY_RECENT_RECORDS_LIMIT),
    window,
  };
}
