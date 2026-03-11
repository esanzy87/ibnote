export const COMPETENCIES = [
  'literacy',
  'thinking',
  'expression',
  'collaboration',
  'digital_literacy',
] as const;

export const PYP_THEMES = [
  'who_we_are',
  'where_we_are_in_place_and_time',
  'how_we_express_ourselves',
  'how_the_world_works',
  'how_we_organize_ourselves',
  'sharing_the_planet',
] as const;

export const GRADE_BANDS = ['g1_2', 'g3_4', 'g5_6'] as const;

export type Competency = (typeof COMPETENCIES)[number];
export type PypTheme = (typeof PYP_THEMES)[number];
export type GradeBand = (typeof GRADE_BANDS)[number];

export interface TemplateRubricLevels {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
}

export interface TemplateRubricEntry {
  competency: Competency;
  levels: TemplateRubricLevels;
}

export interface WorksheetTemplate {
  slug: string;
  version: number;
  title: string;
  summary: string;
  gradeBand: GradeBand;
  durationMinutes: number;
  subjectTags: string[];
  pypTheme: PypTheme;
  competencies: Competency[];
  bigQuestion: string;
  materials: string[];
  steps: string[];
  thinkingPrompt: string;
  outputPrompt: string;
  reflectionQuestions: string[];
  checklist: string[];
  rubric: TemplateRubricEntry[];
  isPublished: boolean;
}
