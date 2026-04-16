import type { WorksheetTemplate } from './template-types';
import type { SupportedLocale } from './template-localization';

export const ACTIVITY_CLUSTERS = [
  'conversational_check_ins',
  'notice_pattern_sort',
  'choice_reason_responsibility',
  'play_based_inquiry',
] as const;

export const FOCUS_ACTIVITY_CLUSTERS = [
  'conversational_check_ins',
  'notice_pattern_sort',
] as const;

export type ActivityCluster = (typeof ACTIVITY_CLUSTERS)[number];
export type FocusActivityCluster = (typeof FOCUS_ACTIVITY_CLUSTERS)[number];
export type TemplateLibraryFilter = 'all' | FocusActivityCluster | 'supporting';
export type TemplateLibrarySectionId = FocusActivityCluster | 'supporting';

export interface TemplateExperienceMeta {
  activityCluster: ActivityCluster;
  familyMoments: string[];
  parentSummary: string;
  quickStart: string;
  recordFocus: string[];
  revisitReason: string;
  libraryOrder: number;
}

export interface EnrichedWorksheetTemplate extends WorksheetTemplate, TemplateExperienceMeta {}

export interface TemplateLibrarySection {
  description: string;
  id: TemplateLibrarySectionId;
  label: string;
  templates: EnrichedWorksheetTemplate[];
}

const ACTIVITY_CLUSTER_LABELS_BY_LOCALE: Record<SupportedLocale, Record<ActivityCluster, string>> = {
  ko: {
    conversational_check_ins: '대화로 시작하기',
    notice_pattern_sort: '알아차리고 분류하기',
    choice_reason_responsibility: '선택과 이유',
    play_based_inquiry: '놀이처럼 탐색하기',
  },
  en: {
    conversational_check_ins: 'Conversational Check-ins',
    notice_pattern_sort: 'Notice, Pattern, Sort',
    choice_reason_responsibility: 'Choice, Reason, Responsibility',
    play_based_inquiry: 'Play-based Inquiry',
  },
};

export function getActivityClusterLabels(locale: SupportedLocale) {
  return ACTIVITY_CLUSTER_LABELS_BY_LOCALE[locale];
}

const SUPPORTING_ACTIVITY_CLUSTERS = new Set<ActivityCluster>([
  'choice_reason_responsibility',
  'play_based_inquiry',
]);

const TEMPLATE_LIBRARY_SECTION_META_BY_LOCALE: Record<
  SupportedLocale,
  Record<TemplateLibrarySectionId, Omit<TemplateLibrarySection, 'id' | 'templates'>>
> = {
  ko: {
    conversational_check_ins: {
      label: '대화로 시작하기',
      description:
        '하루의 장면, 의견, 질문을 짧게 주고받으며 바로 기록으로 이어지기 좋은 활동입니다.',
    },
    notice_pattern_sort: {
      label: '알아차리고 분류하기',
      description:
        '주변에서 보이는 변화, 닮은 점, 반복, 정리 규칙을 가볍게 발견해 보는 활동입니다.',
    },
    supporting: {
      label: '조금 더 넓게 둘러보기',
      description:
        '기본 두 흐름 밖에서 써볼 수 있는 확장 활동입니다. 중심 축은 아니지만 계속 꺼내볼 수 있습니다.',
    },
  },
  en: {
    conversational_check_ins: {
      label: 'Conversational Check-ins',
      description:
        'Short back-and-forth about a day, opinion, or question that can flow straight into a record.',
    },
    notice_pattern_sort: {
      label: 'Notice, Pattern, Sort',
      description:
        'Lightweight activities for spotting changes, similarities, repetition, and organizing rules.',
    },
    supporting: {
      label: 'Broader Explorations',
      description:
        'Extension activities outside the two core flows. Not the center of this phase, but still worth revisiting.',
    },
  },
};

const TEMPLATE_EXPERIENCE_MAP: Record<string, TemplateExperienceMeta> = {
  'ask-better-questions': {
    activityCluster: 'conversational_check_ins',
    familyMoments: [
      '아이가 같은 질문을 반복할 때 질문을 더 크게 바꿔 보고 싶을 때',
      '짧은 답만 오가서 대화를 조금 더 길게 이어 보고 싶을 때',
    ],
    parentSummary:
      '질문을 한 번 더 다듬어 보며 대화의 깊이를 키우는 집안용 체크인 활동입니다.',
    quickStart: '사진 한 장이나 오늘 있었던 장면 하나만 있으면 바로 시작할 수 있습니다.',
    recordFocus: ['처음 질문과 바꾼 질문의 차이', '질문이 길어지게 만든 단어 한두 개'],
    revisitReason:
      '같은 주제를 다시 꺼냈을 때 아이가 어떤 질문을 더 넓게 만들게 되었는지 비교해서 볼 수 있습니다.',
    libraryOrder: 30,
  },
  'compare-two-ideas': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      '두 선택지나 두 장면을 놓고 뭐가 닮았고 다른지 말해 보고 싶을 때',
      '아이 생각이 바뀐 이유를 차분히 듣고 싶을 때',
    ],
    parentSummary:
      '같은 점과 다른 점을 짧게 나눠 보며 생각의 기준을 알아차리게 돕는 활동입니다.',
    quickStart: '서로 다른 사진 두 장이나 의견 두 개만 있으면 됩니다.',
    recordFocus: ['아이가 가장 중요하다고 본 차이 한 가지', '비교 뒤에 바뀐 선택이나 생각'],
    revisitReason:
      '비슷한 상황을 다시 마주했을 때 아이가 어떤 기준으로 비교하는지 흐름을 읽을 수 있습니다.',
    libraryOrder: 60,
  },
  'explain-what-you-noticed': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      '같이 본 물건이나 장면을 아이 말로 다시 풀어내게 하고 싶을 때',
      '아이가 눈에 띈 디테일을 놓치지 않고 기록으로 남기고 싶을 때',
    ],
    parentSummary:
      '눈에 들어온 한 장면을 아이 말로 다시 설명해 보며 관찰 언어를 살리는 활동입니다.',
    quickStart: '집 안 물건 하나나 그림 한 장이면 충분합니다.',
    recordFocus: ['아이가 먼저 짚은 디테일', '다른 사람이 떠올릴 수 있게 만든 설명 표현'],
    revisitReason:
      '나중에 다시 읽으면 아이가 어떤 장면을 중요하게 보고 어떻게 설명을 길게 만드는지 알 수 있습니다.',
    libraryOrder: 20,
  },
  'family-rule-builder': {
    activityCluster: 'choice_reason_responsibility',
    familyMoments: [
      '반복되는 집안 갈등을 아이와 같이 정리해 보고 싶을 때',
      '지시보다 함께 약속을 만들어 보고 싶을 때',
    ],
    parentSummary:
      '가족 규칙을 같이 만들며 왜 그 약속이 필요한지 말로 맞춰 보는 활동입니다.',
    quickStart: '문제가 되는 장면 하나와 종이 한 장이면 됩니다.',
    recordFocus: ['아이 입에서 나온 규칙 문장', '그 규칙이 필요하다고 본 이유'],
    revisitReason:
      '시간이 지난 뒤 다시 읽으면 어떤 약속은 남고 어떤 약속은 바뀌는지 자연스럽게 비교할 수 있습니다.',
    libraryOrder: 10,
  },
  'high-low-next-talk': {
    activityCluster: 'conversational_check_ins',
    familyMoments: [
      '하루를 길게 정리하지 않고 핵심 장면만 짚어 보고 싶을 때',
      '좋았던 점과 힘들었던 점을 같이 말해 보며 다음 걸음을 정하고 싶을 때',
    ],
    parentSummary:
      '좋았던 장면, 어려웠던 장면, 다음에 해 보고 싶은 것을 한 번에 남기는 짧은 체크인 활동입니다.',
    quickStart: '준비물 없이 식탁이나 잠들기 전 몇 분만 확보하면 시작할 수 있습니다.',
    recordFocus: ['아이의 high/low/next 한 문장씩', '다음에 해 보고 싶다고 말한 작은 시도'],
    revisitReason:
      '비슷한 날을 다시 맞았을 때 무엇이 힘을 줬고 무엇을 다시 시도하고 싶어 했는지 이어서 볼 수 있습니다.',
    libraryOrder: 10,
  },
  'my-opinion-matters': {
    activityCluster: 'conversational_check_ins',
    familyMoments: [
      '무엇을 고를지, 어떻게 할지 의견을 먼저 말해 보게 하고 싶을 때',
      '아이 생각을 끊지 않고 이유까지 들어 보고 싶을 때',
    ],
    parentSummary:
      '일상 선택 앞에서 아이 의견과 이유를 차분히 끌어내는 기본 대화 활동입니다.',
    quickStart: '집에서 실제로 고를 일 하나만 있으면 바로 시작할 수 있습니다.',
    recordFocus: ['아이가 먼저 낸 의견 한 문장', '그 의견을 받쳐 준 이유나 근거'],
    revisitReason:
      '반복해서 남기면 아이가 어떤 선택을 자주 하고 이유 표현이 얼마나 또렷해지는지 볼 수 있습니다.',
    libraryOrder: 20,
  },
  'my-small-action-this-week': {
    activityCluster: 'choice_reason_responsibility',
    familyMoments: [
      '이번 주에 해 볼 작은 실천을 같이 정하고 싶을 때',
      '좋은 마음이 실제 행동으로 이어지는지 가볍게 남기고 싶을 때',
    ],
    parentSummary:
      '작은 실천 하나를 정하고 왜 해 보고 싶은지 말해 보게 하는 활동입니다.',
    quickStart: '종이와 연필 없이 말로 먼저 정해도 괜찮습니다.',
    recordFocus: ['아이 스스로 고른 작은 행동', '그 행동을 하고 싶은 이유'],
    revisitReason:
      '며칠 뒤 다시 읽으면 아이가 현실적으로 지키는 약속이 무엇인지 자연스럽게 보입니다.',
    libraryOrder: 20,
  },
  'notice-think-wonder-about-nature': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      '산책이나 창밖 풍경을 그냥 지나치지 않고 한 번 붙잡아 보고 싶을 때',
      '아이가 본 것에서 생각과 질문까지 이어지게 하고 싶을 때',
    ],
    parentSummary:
      '자연 장면 하나를 천천히 보며 알아차림, 생각, 질문을 이어 보는 관찰 활동입니다.',
    quickStart: '밖에 나가지 않아도 창밖 풍경이나 화분 하나면 충분합니다.',
    recordFocus: ['가장 먼저 본 디테일', '그 장면에서 나온 wonder 질문'],
    revisitReason:
      '같은 장소를 다시 볼 때 아이가 무엇을 더 깊게 보고 어떤 질문을 이어 가는지 비교해 볼 수 있습니다.',
    libraryOrder: 50,
  },
  'one-minute-mini-speech': {
    activityCluster: 'conversational_check_ins',
    familyMoments: [
      '아이 이야기를 짧게 정리해서 들려주게 하고 싶을 때',
      '가족 앞에서 말할 자신감을 가볍게 연습해 보고 싶을 때',
    ],
    parentSummary:
      '길게 발표하기보다 핵심 한 가지를 짧게 말해 보는 집안용 공유 활동입니다.',
    quickStart: '주제 하나만 정하고 바로 말로 연습해도 됩니다.',
    recordFocus: ['아이 스스로 고른 핵심 한 문장', '말을 줄이거나 바꾼 부분'],
    revisitReason:
      '다시 읽으면 아이가 어떤 주제에서 더 길게 말하고 무엇을 핵심으로 남기는지 볼 수 있습니다.',
    libraryOrder: 40,
  },
  'pattern-hunt-at-home': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      '집 안이나 길에서 반복되는 모양, 소리, 움직임을 찾아보고 싶을 때',
      '아이가 규칙을 발견하고 다음을 예측하는 장면을 남기고 싶을 때',
    ],
    parentSummary:
      '반복되는 패턴을 찾고 다음을 예상해 보며 주변을 새롭게 읽는 활동입니다.',
    quickStart: '타일, 옷무늬, 식탁 배치, 손뼉 소리처럼 반복되는 것 아무거나 고르면 됩니다.',
    recordFocus: ['아이가 먼저 찾은 반복 규칙', '다음에 올 것이라고 예상한 이유'],
    revisitReason:
      '나중에 다시 보면 아이가 패턴을 찾는 기준과 예측 방식이 어떻게 달라지는지 드러납니다.',
    libraryOrder: 40,
  },
  'sort-what-belongs-together': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      '여러 물건이나 그림을 보고 자기만의 기준으로 묶어 보게 하고 싶을 때',
      '정답 찾기보다 분류 기준을 말로 설명하는 장면을 만들고 싶을 때',
    ],
    parentSummary:
      '같은 것끼리 묶고 다시 다른 기준으로 나눠 보며 생각의 기준을 드러내는 활동입니다.',
    quickStart: '집 안의 작은 물건 네다섯 개만 모아도 충분합니다.',
    recordFocus: ['처음 세운 분류 기준', '기준을 바꿨을 때 생긴 새로운 묶음'],
    revisitReason:
      '반복해서 해 보면 아이가 무엇을 먼저 보고 어떤 기준을 더 자주 떠올리는지 읽을 수 있습니다.',
    libraryOrder: 30,
  },
  'spot-fact-vs-opinion': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      '누가 한 말이나 온라인 문장을 읽고 어떻게 받아들일지 이야기하고 싶을 때',
      '헷갈리는 문장을 같이 분류해 보며 근거를 듣고 싶을 때',
    ],
    parentSummary:
      '짧은 문장을 사실과 의견으로 나눠 보며 판단 기준을 살피는 분류 활동입니다.',
    quickStart: '뉴스 헤드라인이나 짧은 문장 세 개 정도만 있으면 됩니다.',
    recordFocus: ['헷갈렸던 문장과 그 이유', '분류할 때 쓴 단서나 표현'],
    revisitReason:
      '다시 읽으면 아이가 말과 글을 판단할 때 어떤 단서를 먼저 잡는지 확인할 수 있습니다.',
    libraryOrder: 70,
  },
  'waste-flow-map': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      '버린 물건이 어디로 가는지 같이 짚어 보고 싶을 때',
      '집안의 반복 습관을 흐름으로 정리해 보고 싶을 때',
    ],
    parentSummary:
      '하나의 물건이 쓰이고 버려지는 흐름을 따라가며 집안 패턴을 보는 활동입니다.',
    quickStart: '방금 사용한 포장재 하나만 집어 들어도 시작할 수 있습니다.',
    recordFocus: ['버려지는 흐름 중 가장 놀라웠던 단계', '다음에 바꿔 보고 싶은 한 지점'],
    revisitReason:
      '같은 물건을 다시 볼 때 가족의 습관이 실제로 달라졌는지 비교해서 읽을 수 있습니다.',
    libraryOrder: 90,
  },
  'water-use-check': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      '손 씻기, 설거지, 샤워처럼 반복되는 장면을 다시 보고 싶을 때',
      '작은 습관 하나를 바꿔 볼 단서를 찾고 싶을 때',
    ],
    parentSummary:
      '집에서 반복되는 물 사용 장면을 관찰하고 작은 변화를 정해 보는 활동입니다.',
    quickStart: '늘 하는 물 사용 장면 하나를 골라 바로 관찰하면 됩니다.',
    recordFocus: ['처음 눈에 띈 낭비 지점', '이번 주에 해 보기로 한 작은 변화'],
    revisitReason:
      '며칠 뒤 다시 읽으면 작은 행동이 실제로 이어졌는지 자연스럽게 이어서 볼 수 있습니다.',
    libraryOrder: 80,
  },
  'what-changed-in-my-day': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      '하루 중 달라진 장면 하나를 붙잡아 이야기해 보고 싶을 때',
      '전과 후를 비교하며 이유를 짐작해 보게 하고 싶을 때',
    ],
    parentSummary:
      '하루 안에서 달라진 장면을 before/after로 남기며 변화를 읽어 보는 활동입니다.',
    quickStart: '특별한 준비 없이 오늘 달라진 장면 하나를 떠올리면 됩니다.',
    recordFocus: ['전과 후가 가장 다르다고 느낀 부분', '변화가 생겼다고 생각한 이유'],
    revisitReason:
      '비슷한 변화를 다시 겪을 때 아이가 무엇을 먼저 보고 어떤 이유를 붙이는지 비교할 수 있습니다.',
    libraryOrder: 10,
  },
};

const TEMPLATE_EXPERIENCE_MAP_EN: Record<string, TemplateExperienceMeta> = {
  'ask-better-questions': {
    activityCluster: 'conversational_check_ins',
    familyMoments: [
      'When a child keeps repeating the same question and you want to reshape it',
      'When short answers are making the conversation feel too brief',
    ],
    parentSummary: 'A home check-in that sharpens a question and deepens the conversation.',
    quickStart: 'One photo or one recent moment is enough to get started.',
    recordFocus: ['The difference between the first question and the revised one', 'One or two words that made the question expand'],
    revisitReason: 'You can compare how the child widened the question when the topic comes back later.',
    libraryOrder: 30,
  },
  'compare-two-ideas': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      'When you want to compare two choices or two scenes out loud',
      'When you want to hear why the child changed their mind',
    ],
    parentSummary: 'A short compare-and-contrast activity that helps children notice what matters.',
    quickStart: 'Two different photos or two opinions are enough.',
    recordFocus: ['One difference the child thought mattered most', 'A choice or thought that changed after comparing'],
    revisitReason: 'You can see how the child compares things when a similar situation appears again.',
    libraryOrder: 60,
  },
  'explain-what-you-noticed': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      'When you want a child to explain an object or scene in their own words',
      'When you want to preserve the details they noticed in a record',
    ],
    parentSummary: 'An activity that keeps the child’s observational language alive.',
    quickStart: 'One object at home or one picture is enough.',
    recordFocus: ['The detail the child noticed first', 'The wording that helped someone else picture it'],
    revisitReason: 'When you read it again later, you can see what the child considered important and how they expanded the description.',
    libraryOrder: 20,
  },
  'family-rule-builder': {
    activityCluster: 'choice_reason_responsibility',
    familyMoments: [
      'When you want to work through a repeating family conflict together',
      'When you want to build a shared agreement instead of just giving instructions',
    ],
    parentSummary: 'Build a family rule together and talk through why that agreement matters.',
    quickStart: 'One problematic moment and a sheet of paper are enough.',
    recordFocus: ['The rule sentence the child came up with', 'The reason they felt it was needed'],
    revisitReason: 'Re-reading later helps you see which agreements stick and which ones change over time.',
    libraryOrder: 10,
  },
  'high-low-next-talk': {
    activityCluster: 'conversational_check_ins',
    familyMoments: [
      'When you want to summarize the day without making it too long',
      'When you want to name what went well, what felt hard, and what comes next',
    ],
    parentSummary: 'A short check-in that leaves one good moment, one hard moment, and one next step.',
    quickStart: 'No materials needed, just a few minutes at the table or before bed.',
    recordFocus: ['One sentence for the child’s high, low, and next', 'The small next step they want to try'],
    revisitReason: 'On similar days, you can see what gave the child energy and what they wanted to try again.',
    libraryOrder: 10,
  },
  'my-opinion-matters': {
    activityCluster: 'conversational_check_ins',
    familyMoments: [
      'When you want the child to speak first about what they think and why',
      'When you want to hear their reasoning without interrupting',
    ],
    parentSummary: 'A basic conversation activity that draws out a child’s opinion and reason on everyday choices.',
    quickStart: 'One real choice from home is enough to begin.',
    recordFocus: ['One sentence of the child’s opinion', 'The reason or evidence that supported it'],
    revisitReason: 'Repeated notes help you see which choices the child makes often and how clearly they explain why.',
    libraryOrder: 20,
  },
  'my-small-action-this-week': {
    activityCluster: 'choice_reason_responsibility',
    familyMoments: [
      'When you want to choose one small action to try this week together',
      'When you want to see whether a good intention turns into a real action',
    ],
    parentSummary: 'Choose one small action and talk through why it feels worth trying.',
    quickStart: 'It is fine to start by speaking, without paper or pencil.',
    recordFocus: ['The small action the child chose', 'The reason they wanted to do it'],
    revisitReason: 'A few days later, you can see which promises feel realistic and worth keeping.',
    libraryOrder: 20,
  },
  'notice-think-wonder-about-nature': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      'When you want to slow down and notice a nature scene instead of passing by it',
      'When you want a child’s observation to lead into thought and wonder',
    ],
    parentSummary: 'A slow observation activity that moves from noticing to thinking to wondering.',
    quickStart: 'A window view or a plant is enough, even without going outside.',
    recordFocus: ['The first detail the child saw', 'The wonder question that came from the scene'],
    revisitReason: 'When you revisit the same place later, you can compare what the child notices and wonders about.',
    libraryOrder: 50,
  },
  'one-minute-mini-speech': {
    activityCluster: 'conversational_check_ins',
    familyMoments: [
      'When you want to help a child turn a story into a short talk',
      'When you want to practice speaking confidence in front of family',
    ],
    parentSummary: 'A family sharing activity that focuses on one core idea spoken briefly.',
    quickStart: 'Pick one topic and start practicing out loud.',
    recordFocus: ['The one core sentence the child chose', 'What they shortened or changed'],
    revisitReason: 'You can see which topics the child speaks about at length and which ideas they keep as the core.',
    libraryOrder: 40,
  },
  'pattern-hunt-at-home': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      'When you want to look for repeated shapes, sounds, or motions at home or on the way',
      'When you want to capture a child spotting a rule and predicting what comes next',
    ],
    parentSummary: 'A pattern-finding activity that helps children read the world in a new way.',
    quickStart: 'Tiles, clothing patterns, table settings, or clapping sounds all work.',
    recordFocus: ['The repeated rule the child noticed first', 'The reason they predicted what comes next'],
    revisitReason: 'When you read it again later, you can see how the child’s pattern-finding and prediction change over time.',
    libraryOrder: 40,
  },
  'sort-what-belongs-together': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      'When you want a child to group things by their own criteria',
      'When you want them to explain a sorting rule instead of chasing the right answer',
    ],
    parentSummary: 'Group items together and then split them again by a different rule to surface thinking.',
    quickStart: 'Four or five small items from around the house are enough.',
    recordFocus: ['The first sorting rule', 'The new groupings that appeared when the rule changed'],
    revisitReason: 'Doing it again shows what the child notices first and which criteria they return to most often.',
    libraryOrder: 30,
  },
  'spot-fact-vs-opinion': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      'When you want to talk through how to read a spoken or written claim',
      'When you want to sort confusing sentences while hearing the child’s evidence',
    ],
    parentSummary: 'A sorting activity that separates facts from opinions in short statements.',
    quickStart: 'A few news headlines or short sentences are enough.',
    recordFocus: ['The sentence that felt confusing and why', 'The clues used to sort it'],
    revisitReason: 'When you read it again later, you can see which clues the child reaches for first when judging language.',
    libraryOrder: 70,
  },
  'waste-flow-map': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      'When you want to trace where a thrown-away item goes',
      'When you want to map a repeating household habit as a flow',
    ],
    parentSummary: 'Follow a single object through its use-and-discard flow to see household patterns.',
    quickStart: 'Even one used package is enough to start.',
    recordFocus: ['The most surprising step in the flow', 'One place you want to change next time'],
    revisitReason: 'When the same item comes up again, you can compare whether the family habit actually changed.',
    libraryOrder: 90,
  },
  'water-use-check': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      'When you want to look again at repeating water-use moments like washing, dishwashing, or showering',
      'When you want to spot a clue for changing one small habit',
    ],
    parentSummary: 'Observe repeated water-use moments at home and choose a small change to try.',
    quickStart: 'Pick one everyday water-use moment and observe it right away.',
    recordFocus: ['The first waste point that stood out', 'The small change you want to try this week'],
    revisitReason: 'A few days later, you can see whether the small action actually carried through.',
    libraryOrder: 80,
  },
  'what-changed-in-my-day': {
    activityCluster: 'notice_pattern_sort',
    familyMoments: [
      'When you want to hold onto one changed moment from the day',
      'When you want to compare before and after and guess why it changed',
    ],
    parentSummary: 'A before-and-after activity that helps children read change inside a single day.',
    quickStart: 'Just think of one changed moment from today.',
    recordFocus: ['The biggest before/after difference', 'Why the change might have happened'],
    revisitReason: 'When you meet a similar change later, you can compare what the child noticed first and what reason they gave.',
    libraryOrder: 10,
  },
};

const TEMPLATE_EXPERIENCE_MAP_BY_LOCALE: Record<SupportedLocale, Record<string, TemplateExperienceMeta>> = {
  ko: TEMPLATE_EXPERIENCE_MAP,
  en: TEMPLATE_EXPERIENCE_MAP_EN,
};

function isSupportingCluster(cluster: ActivityCluster): boolean {
  return SUPPORTING_ACTIVITY_CLUSTERS.has(cluster);
}

export function enrichTemplate(
  template: WorksheetTemplate,
  locale: SupportedLocale,
): EnrichedWorksheetTemplate {
  const metadata = TEMPLATE_EXPERIENCE_MAP_BY_LOCALE[locale][template.slug];

  if (!metadata) {
    throw new Error(`Missing template experience metadata for template "${template.slug}"`);
  }

  return {
    ...template,
    ...metadata,
  };
}

export function compareTemplatesForLibrary(
  leftTemplate: EnrichedWorksheetTemplate,
  rightTemplate: EnrichedWorksheetTemplate,
  locale: SupportedLocale,
): number {
  if (leftTemplate.libraryOrder !== rightTemplate.libraryOrder) {
    return leftTemplate.libraryOrder - rightTemplate.libraryOrder;
  }

  return leftTemplate.title.localeCompare(rightTemplate.title, locale);
}

export function buildTemplateLibrarySections(
  templates: EnrichedWorksheetTemplate[],
  locale: SupportedLocale,
): TemplateLibrarySection[] {
  const orderedTemplates = templates
    .slice()
    .sort((leftTemplate, rightTemplate) => compareTemplatesForLibrary(leftTemplate, rightTemplate, locale));
  const sections: TemplateLibrarySection[] = [];
  const sectionMeta = TEMPLATE_LIBRARY_SECTION_META_BY_LOCALE[locale];

  for (const sectionId of FOCUS_ACTIVITY_CLUSTERS) {
    const sectionTemplates = orderedTemplates.filter(
      (template) => template.activityCluster === sectionId,
    );

    if (sectionTemplates.length === 0) {
      continue;
    }

    sections.push({
      id: sectionId,
      label: sectionMeta[sectionId].label,
      description: sectionMeta[sectionId].description,
      templates: sectionTemplates,
    });
  }

  const supportingTemplates = orderedTemplates.filter((template) =>
    isSupportingCluster(template.activityCluster),
  );

  if (supportingTemplates.length > 0) {
    sections.push({
      id: 'supporting',
      label: sectionMeta.supporting.label,
      description: sectionMeta.supporting.description,
      templates: supportingTemplates,
    });
  }

  return sections;
}

export function matchesTemplateLibraryFilter(
  template: EnrichedWorksheetTemplate,
  selectedFilter: TemplateLibraryFilter,
): boolean {
  if (selectedFilter === 'all') {
    return true;
  }

  if (selectedFilter === 'supporting') {
    return isSupportingCluster(template.activityCluster);
  }

  return template.activityCluster === selectedFilter;
}
