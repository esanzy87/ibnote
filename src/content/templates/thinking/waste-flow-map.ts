import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const wasteFlowMap: WorksheetTemplate = {
  slug: 'waste-flow-map',
  version: 1,
  title: 'Waste Flow Map',
  summary: 'Track one item from use to disposal and think about what happens next.',
  gradeBand: 'g3_4',
  durationMinutes: 20,
  subjectTags: ['science', 'home'],
  pypTheme: 'sharing_the_planet',
  competencies: ['thinking', 'digital_literacy'],
  bigQuestion: 'Where does waste go after I throw something away?',
  materials: ['One used package', 'Paper', 'Pencil'],
  steps: [
    'Choose one item that becomes waste at home.',
    'Draw the steps from using it to throwing it away.',
    'Mark where sorting or recycling may happen.',
    'Think of one better next step for that item.',
  ],
  thinkingPrompt: 'Which part of the waste path is easiest to change at home?',
  outputPrompt: 'Make a flow map with arrows and one suggestion for improvement.',
  reflectionQuestions: [
    'What surprised you about the waste path?',
    'Where could your family make a better choice?',
    'What would you like to learn more about?',
  ],
  checklist: ['Mapped the waste path', 'Marked one sorting point', 'Suggested one improvement'],
  rubric: [
    {
      competency: 'thinking',
      levels: { A: 'Builds a clear map and thoughtful improvement idea.', B: 'Builds a clear map and helpful idea.', C: 'Builds a simple map with one idea.', D: 'Builds part of a map.', E: 'Needs help mapping the process.' },
    },
    {
      competency: 'digital_literacy',
      levels: { A: 'Organizes information clearly and effectively.', B: 'Organizes information clearly.', C: 'Organizes basic information.', D: 'Organizes limited information.', E: 'Needs help organizing information.' },
    },
  ],
  isPublished: true,
};

export default wasteFlowMap;
