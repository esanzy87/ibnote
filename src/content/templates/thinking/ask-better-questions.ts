import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const askBetterQuestions: WorksheetTemplate = {
  slug: 'ask-better-questions',
  version: 1,
  title: 'Ask Better Questions',
  summary: 'Turn simple questions into stronger questions that open up more thinking.',
  gradeBand: 'g5_6',
  durationMinutes: 20,
  subjectTags: ['inquiry', 'discussion'],
  pypTheme: 'how_we_organize_ourselves',
  competencies: ['thinking', 'expression'],
  bigQuestion: 'What makes a question lead to deeper thinking?',
  materials: ['Notebook', 'A topic card or picture'],
  steps: [
    'Choose a topic you want to explore.',
    'Write one simple question about it.',
    'Rewrite the question to make it more open.',
    'Test both questions by answering them aloud.',
  ],
  thinkingPrompt: 'Which question made you think longer and why?',
  outputPrompt: 'Write your first question, your improved question, and a reason for the change.',
  reflectionQuestions: [
    'How did the stronger question change your thinking?',
    'Which words made the question more open?',
    'Where could you use this skill again?',
  ],
  checklist: ['Wrote a first question', 'Improved the question', 'Explained why the new question is stronger'],
  rubric: [
    {
      competency: 'thinking',
      levels: { A: 'Creates deep questions with strong reasoning.', B: 'Creates thoughtful questions with clear reasoning.', C: 'Creates a better question with some reasoning.', D: 'Creates a partial question improvement.', E: 'Needs help improving questions.' },
    },
    {
      competency: 'expression',
      levels: { A: 'Explains choices clearly and persuasively.', B: 'Explains choices clearly.', C: 'Explains a simple choice.', D: 'Explains part of a choice.', E: 'Needs help explaining choices.' },
    },
  ],
  isPublished: true,
};

export default askBetterQuestions;
