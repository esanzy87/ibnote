import type { WorksheetTemplate } from '../../../lib/templates/template-types';

const familyRuleBuilder: WorksheetTemplate = {
  slug: 'family-rule-builder',
  version: 1,
  title: 'Family Rule Builder',
  summary: 'Work together to design one family rule that feels fair and clear.',
  gradeBand: 'g3_4',
  durationMinutes: 20,
  subjectTags: ['home', 'discussion'],
  pypTheme: 'how_we_organize_ourselves',
  competencies: ['expression', 'collaboration'],
  bigQuestion: 'What makes a family rule feel fair and helpful?',
  materials: ['Paper', 'Markers'],
  steps: [
    'Choose one family situation that needs a clear rule.',
    'Talk about what feels fair to everyone.',
    'Write one short rule together.',
    'Add one reason the rule can help at home.',
  ],
  thinkingPrompt: 'Which words make the rule clear without sounding too harsh?',
  outputPrompt: 'Create a mini poster with the rule and one reason.',
  reflectionQuestions: [
    'Why did your family choose this rule?',
    'How did you make the rule fair?',
    'What will show that the rule is working?',
  ],
  checklist: ['Chose one home situation', 'Wrote one clear rule', 'Added one helpful reason'],
  rubric: [
    {
      competency: 'expression',
      levels: { A: 'Writes clear, thoughtful rule language.', B: 'Writes clear rule language.', C: 'Writes a simple rule.', D: 'Writes part of a rule.', E: 'Needs help writing a rule.' },
    },
    {
      competency: 'collaboration',
      levels: { A: 'Works respectfully and helps shape shared decisions.', B: 'Works respectfully with others.', C: 'Works with support from others.', D: 'Joins part of the conversation.', E: 'Needs help working with others.' },
    },
  ],
  isPublished: true,
};

export default familyRuleBuilder;
