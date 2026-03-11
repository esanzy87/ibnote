import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const compareTwoIdeas: WorksheetTemplate = {
  slug: 'compare-two-ideas',
  version: 1,
  title: 'Compare Two Ideas',
  summary: 'Look at two ideas side by side and say how they are similar or different.',
  gradeBand: 'g3_4',
  durationMinutes: 20,
  subjectTags: ['reading', 'thinking'],
  pypTheme: 'how_we_express_ourselves',
  competencies: ['literacy', 'thinking'],
  bigQuestion: 'What can I notice when I compare two ideas carefully?',
  materials: ['Two short texts or images', 'Notebook'],
  steps: [
    'Choose two short ideas, pictures, or statements.',
    'Find one thing that is the same.',
    'Find one thing that is different.',
    'Explain which idea feels stronger and why.',
  ],
  thinkingPrompt: 'Which detail helped you decide the biggest difference?',
  outputPrompt: 'Make a simple compare chart with same and different points.',
  reflectionQuestions: [
    'What was the clearest similarity?',
    'What difference mattered most?',
    'Did your first idea change after comparing more carefully?',
  ],
  checklist: ['Found one similarity', 'Found one difference', 'Explained a choice with evidence'],
  rubric: [
    {
      competency: 'literacy',
      levels: { A: 'Uses details accurately and clearly.', B: 'Uses helpful details to compare ideas.', C: 'Uses some details to compare ideas.', D: 'Uses limited details.', E: 'Needs help finding details.' },
    },
    {
      competency: 'thinking',
      levels: { A: 'Makes thoughtful comparisons and strong judgments.', B: 'Makes clear comparisons and judgments.', C: 'Makes simple comparisons.', D: 'Makes partial comparisons.', E: 'Needs help comparing ideas.' },
    },
  ],
  isPublished: true,
};

export default compareTwoIdeas;
