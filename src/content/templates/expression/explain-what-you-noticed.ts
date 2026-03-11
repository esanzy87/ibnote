import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const explainWhatYouNoticed: WorksheetTemplate = {
  slug: 'explain-what-you-noticed',
  version: 1,
  title: 'Explain What You Noticed',
  summary: 'Observe something carefully and explain the most important detail in your own words.',
  gradeBand: 'g1_2',
  durationMinutes: 15,
  subjectTags: ['observation', 'speaking'],
  pypTheme: 'how_we_express_ourselves',
  competencies: ['expression', 'literacy'],
  bigQuestion: 'How can I explain what I notice so another person can picture it?',
  materials: ['Object or picture', 'Paper'],
  steps: [
    'Look closely at one object or image.',
    'Choose the detail that matters most.',
    'Say what you noticed in your own words.',
    'Add one detail to help someone else imagine it.',
  ],
  thinkingPrompt: 'Which detail helped your explanation feel most clear?',
  outputPrompt: 'Write or draw what you noticed and add one strong describing sentence.',
  reflectionQuestions: [
    'What was the most important detail?',
    'What words helped your explanation?',
    'What would you explain differently next time?',
  ],
  checklist: ['Named one clear detail', 'Explained the detail in own words', 'Added one describing detail'],
  rubric: [
    {
      competency: 'expression',
      levels: { A: 'Explains observations vividly and clearly.', B: 'Explains observations clearly.', C: 'Explains a simple observation.', D: 'Explains part of an observation.', E: 'Needs help explaining an observation.' },
    },
    {
      competency: 'literacy',
      levels: { A: 'Uses strong descriptive language and detail.', B: 'Uses clear descriptive language.', C: 'Uses simple descriptive language.', D: 'Uses limited descriptive language.', E: 'Needs help choosing words.' },
    },
  ],
  isPublished: true,
};

export default explainWhatYouNoticed;
