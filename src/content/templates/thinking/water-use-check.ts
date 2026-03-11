import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const waterUseCheck: WorksheetTemplate = {
  slug: 'water-use-check',
  version: 1,
  title: 'Water Use Check',
  summary: 'Observe water use at home and think about where waste can be reduced.',
  gradeBand: 'g3_4',
  durationMinutes: 15,
  subjectTags: ['science', 'sustainability'],
  pypTheme: 'how_the_world_works',
  competencies: ['thinking', 'collaboration'],
  bigQuestion: 'How can our family use water more carefully?',
  materials: ['Notebook', 'Timer'],
  steps: [
    'Choose one home activity that uses water.',
    'Observe how water is used during that activity.',
    'Talk with a family member about one waste point.',
    'Write one small change to try this week.',
  ],
  thinkingPrompt: 'Which small change feels realistic for your home right now?',
  outputPrompt: 'Write a short water-use check with one problem and one action.',
  reflectionQuestions: [
    'What did you notice first?',
    'Which small action do you want to try?',
    'Who can help you keep it going?',
  ],
  checklist: ['Observed one activity', 'Spotted one waste point', 'Named one small action'],
  rubric: [
    {
      competency: 'thinking',
      levels: { A: 'Makes careful observations and a strong action idea.', B: 'Makes clear observations and a helpful action idea.', C: 'Makes simple observations and an action idea.', D: 'Makes limited observations.', E: 'Needs help noticing water use.' },
    },
    {
      competency: 'collaboration',
      levels: { A: 'Works with others thoughtfully and clearly.', B: 'Works with others well.', C: 'Works with support from others.', D: 'Joins part of the discussion.', E: 'Needs help working with others.' },
    },
  ],
  isPublished: true,
};

export default waterUseCheck;
