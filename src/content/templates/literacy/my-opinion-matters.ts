import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const myOpinionMatters: WorksheetTemplate = {
  slug: 'my-opinion-matters',
  version: 1,
  title: 'My Opinion Matters',
  summary: 'Share one opinion, explain why, and listen to another point of view.',
  gradeBand: 'g1_2',
  durationMinutes: 15,
  subjectTags: ['language', 'discussion'],
  pypTheme: 'who_we_are',
  competencies: ['literacy', 'expression'],
  bigQuestion: 'How can I share what I think in a clear and kind way?',
  materials: ['Paper', 'Pencil'],
  steps: [
    'Choose a simple topic from home or school life.',
    'Say your opinion in one sentence.',
    'Add one or two reasons that support your idea.',
    'Ask another person what they think.',
  ],
  thinkingPrompt: 'Which reason makes your opinion easier for someone else to understand?',
  outputPrompt: 'Write or draw your opinion and at least one reason.',
  reflectionQuestions: [
    'What opinion did you share today?',
    'What reason helped your idea sound clear?',
    'What did you hear from someone else?',
  ],
  checklist: ['Shared one opinion', 'Gave at least one reason', 'Listened to another idea'],
  rubric: [
    {
      competency: 'literacy',
      levels: { A: 'Reads and explains ideas clearly with strong detail.', B: 'Explains ideas clearly with helpful detail.', C: 'Shares a clear idea with some detail.', D: 'Shares an idea with support.', E: 'Needs help to share an idea.' },
    },
    {
      competency: 'expression',
      levels: { A: 'Expresses ideas confidently and thoughtfully.', B: 'Expresses ideas clearly and kindly.', C: 'Expresses a simple idea.', D: 'Expresses part of an idea.', E: 'Needs help to express an idea.' },
    },
  ],
  isPublished: true,
};

export default myOpinionMatters;
