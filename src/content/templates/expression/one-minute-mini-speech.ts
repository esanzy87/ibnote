import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const oneMinuteMiniSpeech: WorksheetTemplate = {
  slug: 'one-minute-mini-speech',
  version: 1,
  title: 'One-Minute Mini Speech',
  summary: 'Prepare a short speech with one main idea and a few supporting points.',
  gradeBand: 'g5_6',
  durationMinutes: 20,
  subjectTags: ['speaking', 'presentation'],
  pypTheme: 'how_we_express_ourselves',
  competencies: ['expression', 'thinking'],
  bigQuestion: 'How can I say a lot in a short and clear way?',
  materials: ['Timer', 'Note card'],
  steps: [
    'Choose one topic you care about.',
    'Write one main idea and two supporting points.',
    'Practice saying it in about one minute.',
    'Adjust any part that feels too long or unclear.',
  ],
  thinkingPrompt: 'Which part of the speech did you need to shorten or improve?',
  outputPrompt: 'Write a mini speech outline and deliver it aloud.',
  reflectionQuestions: [
    'What was your main idea?',
    'Which supporting point was strongest?',
    'What would you change before speaking again?',
  ],
  checklist: ['Chose one topic', 'Prepared one main idea with supports', 'Practiced the speech aloud'],
  rubric: [
    {
      competency: 'expression',
      levels: { A: 'Speaks clearly with strong structure and confidence.', B: 'Speaks clearly with structure.', C: 'Speaks with a simple structure.', D: 'Speaks part of an idea.', E: 'Needs help organizing speech.' },
    },
    {
      competency: 'thinking',
      levels: { A: 'Chooses strong points and organizes them thoughtfully.', B: 'Chooses clear points and organizes them well.', C: 'Chooses simple points.', D: 'Chooses limited points.', E: 'Needs help choosing points.' },
    },
  ],
  isPublished: true,
};

export default oneMinuteMiniSpeech;
