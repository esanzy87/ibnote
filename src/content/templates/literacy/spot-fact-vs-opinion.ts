import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const spotFactVsOpinion: WorksheetTemplate = {
  slug: 'spot-fact-vs-opinion',
  version: 1,
  title: 'Spot Fact vs Opinion',
  summary: 'Read short statements and decide whether they are facts or opinions.',
  gradeBand: 'g3_4',
  durationMinutes: 20,
  subjectTags: ['reading', 'media'],
  pypTheme: 'how_we_express_ourselves',
  competencies: ['literacy', 'digital_literacy'],
  bigQuestion: 'How do I know whether something is a fact or an opinion?',
  materials: ['Three short statements', 'Notebook'],
  steps: [
    'Read each statement slowly.',
    'Mark whether each one is fact or opinion.',
    'Circle the word or clue that helped your choice.',
    'Talk about why one statement felt tricky.',
  ],
  thinkingPrompt: 'Which words made a statement sound more like an opinion?',
  outputPrompt: 'Sort the statements into two columns and add a short reason.',
  reflectionQuestions: [
    'Which statement was easiest to sort?',
    'Which one was hardest and why?',
    'How can this help when you read online or in books?',
  ],
  checklist: ['Sorted each statement', 'Explained one clue', 'Talked about a tricky example'],
  rubric: [
    {
      competency: 'literacy',
      levels: { A: 'Identifies facts and opinions accurately with strong reasons.', B: 'Identifies facts and opinions accurately.', C: 'Identifies most statements correctly.', D: 'Identifies some statements correctly.', E: 'Needs help telling fact from opinion.' },
    },
    {
      competency: 'digital_literacy',
      levels: { A: 'Uses source clues thoughtfully and carefully.', B: 'Uses clues carefully.', C: 'Uses simple clues.', D: 'Uses limited clues.', E: 'Needs help checking clues.' },
    },
  ],
  isPublished: true,
};

export default spotFactVsOpinion;
