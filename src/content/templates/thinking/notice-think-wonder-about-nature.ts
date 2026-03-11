import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const noticeThinkWonderAboutNature: WorksheetTemplate = {
  slug: 'notice-think-wonder-about-nature',
  version: 1,
  title: 'Notice-Think-Wonder About Nature',
  summary: 'Look closely at one part of nature and record what you notice, think, and wonder.',
  gradeBand: 'g1_2',
  durationMinutes: 15,
  subjectTags: ['nature', 'observation'],
  pypTheme: 'how_the_world_works',
  competencies: ['thinking', 'expression'],
  bigQuestion: 'What happens when I slow down and observe nature carefully?',
  materials: ['Leaf, flower, or outdoor view', 'Paper'],
  steps: [
    'Choose one natural object or scene.',
    'Say three things you notice.',
    'Share one idea about what you think is happening.',
    'Ask one wonder question.',
  ],
  thinkingPrompt: 'Which detail made you ask the strongest wonder question?',
  outputPrompt: 'Make three boxes labeled notice, think, and wonder.',
  reflectionQuestions: [
    'What did you notice first?',
    'What idea did you have after looking longer?',
    'What do you still wonder about?',
  ],
  checklist: ['Shared at least three notices', 'Shared one thought', 'Asked one wonder question'],
  rubric: [
    {
      competency: 'thinking',
      levels: { A: 'Observes deeply and asks thoughtful questions.', B: 'Observes clearly and asks a helpful question.', C: 'Observes simply and asks a question.', D: 'Observes part of the object.', E: 'Needs help observing carefully.' },
    },
    {
      competency: 'expression',
      levels: { A: 'Expresses observations and ideas with strong clarity.', B: 'Expresses observations and ideas clearly.', C: 'Expresses simple observations and ideas.', D: 'Expresses part of an observation.', E: 'Needs help expressing observations.' },
    },
  ],
  isPublished: true,
};

export default noticeThinkWonderAboutNature;
