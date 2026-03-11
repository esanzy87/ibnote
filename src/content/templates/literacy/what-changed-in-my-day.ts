import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const whatChangedInMyDay: WorksheetTemplate = {
  slug: 'what-changed-in-my-day',
  version: 1,
  title: 'What Changed in My Day?',
  summary: 'Notice one change during the day and describe what happened before and after.',
  gradeBand: 'g1_2',
  durationMinutes: 15,
  subjectTags: ['observation', 'daily life'],
  pypTheme: 'where_we_are_in_place_and_time',
  competencies: ['literacy', 'thinking'],
  bigQuestion: 'How can I explain a change I noticed today?',
  materials: ['Paper', 'Crayons or pencil'],
  steps: [
    'Think about one part of your day that changed.',
    'Describe what it looked like before.',
    'Describe what it looked like after.',
    'Say what may have caused the change.',
  ],
  thinkingPrompt: 'What clue helped you notice the change most clearly?',
  outputPrompt: 'Draw a before-and-after picture and add one sentence for each side.',
  reflectionQuestions: [
    'What change did you notice?',
    'Why do you think the change happened?',
    'What would you watch for next time?',
  ],
  checklist: ['Named one change', 'Described before and after', 'Suggested a possible cause'],
  rubric: [
    {
      competency: 'literacy',
      levels: { A: 'Describes change with rich detail and clarity.', B: 'Describes change clearly with detail.', C: 'Describes a simple change.', D: 'Describes part of the change.', E: 'Needs help describing change.' },
    },
    {
      competency: 'thinking',
      levels: { A: 'Makes strong observations and thoughtful cause ideas.', B: 'Makes clear observations and cause ideas.', C: 'Makes simple observations.', D: 'Makes limited observations.', E: 'Needs help noticing change.' },
    },
  ],
  isPublished: true,
};

export default whatChangedInMyDay;
