import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const mySmallActionThisWeek: WorksheetTemplate = {
  slug: 'my-small-action-this-week',
  version: 1,
  title: 'My Small Action This Week',
  summary: 'Choose one small action for the week and explain why it matters.',
  gradeBand: 'g1_2',
  durationMinutes: 15,
  subjectTags: ['reflection', 'action'],
  pypTheme: 'sharing_the_planet',
  competencies: ['expression', 'collaboration'],
  bigQuestion: 'What small action can I try this week that helps people or the planet?',
  materials: ['Paper', 'Pencil'],
  steps: [
    'Think of one small helpful action you can do this week.',
    'Choose the action that feels realistic.',
    'Explain why it matters.',
    'Share your plan with someone at home.',
  ],
  thinkingPrompt: 'What makes your action small enough to try but meaningful enough to matter?',
  outputPrompt: 'Write or draw your action plan and one reason it matters.',
  reflectionQuestions: [
    'What action did you choose?',
    'Why is it a good fit for this week?',
    'Who can help you remember it?',
  ],
  checklist: ['Chose one realistic action', 'Explained why it matters', 'Shared the plan with someone'],
  rubric: [
    {
      competency: 'expression',
      levels: { A: 'Explains the action clearly and meaningfully.', B: 'Explains the action clearly.', C: 'Explains a simple action.', D: 'Explains part of an action.', E: 'Needs help explaining the action.' },
    },
    {
      competency: 'collaboration',
      levels: { A: 'Invites others into the plan thoughtfully.', B: 'Shares the plan with others clearly.', C: 'Shares the plan simply.', D: 'Shares part of the plan.', E: 'Needs help sharing the plan.' },
    },
  ],
  isPublished: true,
};

export default mySmallActionThisWeek;
