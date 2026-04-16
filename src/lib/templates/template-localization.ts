import type { WorksheetTemplate } from './template-types';

export type SupportedLocale = 'ko' | 'en';

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return locale === 'ko' || locale === 'en';
}

type LocalizedTemplateFields = Pick<
  WorksheetTemplate,
  | 'title'
  | 'summary'
  | 'bigQuestion'
  | 'materials'
  | 'steps'
  | 'thinkingPrompt'
  | 'outputPrompt'
  | 'reflectionQuestions'
  | 'checklist'
>;

const KO_TEMPLATE_OVERRIDES: Record<string, Partial<LocalizedTemplateFields>> = {
  'ask-better-questions': {
    title: '더 좋은 질문 만들기',
    summary: '단순한 질문을 더 열린 질문으로 바꿔 보며 생각이 더 깊어지게 해 봅니다.',
    bigQuestion: '질문이 어떻게 더 깊은 생각으로 이어질까요?',
    materials: ['노트', '주제 카드나 사진 하나'],
    steps: [
      '탐색하고 싶은 주제를 하나 고릅니다.',
      '그 주제에 대해 쉬운 질문 하나를 적습니다.',
      '더 열린 질문이 되도록 문장을 다시 씁니다.',
      '두 질문을 각각 소리 내어 답해 봅니다.',
    ],
    thinkingPrompt: '어떤 질문이 더 오래 생각하게 만들었나요? 왜 그랬을까요?',
    outputPrompt: '처음 질문, 다듬은 질문, 바꾼 이유를 적어 보세요.',
    reflectionQuestions: [
      '더 나은 질문이 생각에 어떤 변화를 주었나요?',
      '어떤 단어가 질문을 더 열리게 했나요?',
      '이 기술을 어디에 다시 써 볼 수 있을까요?',
    ],
    checklist: ['처음 질문을 적었다', '질문을 더 좋게 바꿨다', '왜 바꿨는지 설명했다'],
  },
  'compare-two-ideas': {
    title: '두 가지 생각 비교하기',
    summary: '두 선택이나 두 장면을 놓고 닮은 점과 다른 점을 말해 봅니다.',
    bigQuestion: '생각을 비교하면 무엇이 더 분명해질까요?',
    materials: ['서로 다른 사진 두 장 또는 의견 두 개'],
    steps: [
      '비교해 보고 싶은 두 가지를 고릅니다.',
      '같은 점과 다른 점을 하나씩 말해 봅니다.',
      '아이가 가장 중요하다고 느끼는 차이를 찾습니다.',
      '비교한 뒤 생각이나 선택이 어떻게 달라졌는지 정리합니다.',
    ],
    thinkingPrompt: '어떤 기준으로 비교했는지 이야기해 보세요.',
    outputPrompt: '같은 점 한 가지, 다른 점 한 가지, 바뀐 생각을 남겨 보세요.',
    reflectionQuestions: [
      '비교하면서 새롭게 본 점은 무엇인가요?',
      '어떤 기준이 가장 중요했나요?',
      '다음에는 무엇을 더 비교해 보고 싶나요?',
    ],
    checklist: ['두 가지를 비교했다', '같은 점과 다른 점을 말했다', '비교 뒤 생각의 변화를 적었다'],
  },
  'explain-what-you-noticed': {
    title: '내가 알아챈 걸 설명하기',
    summary: '눈에 들어온 한 장면을 아이 말로 다시 풀어 보며 관찰 언어를 키웁니다.',
    bigQuestion: '내가 본 것을 다른 사람에게 어떻게 잘 설명할 수 있을까요?',
    materials: ['집 안 물건 하나 또는 그림 한 장'],
    steps: [
      '함께 볼 장면이나 물건을 하나 고릅니다.',
      '먼저 눈에 띈 디테일을 말해 봅니다.',
      '왜 그 부분이 보였는지 아이 말로 설명합니다.',
      '다른 사람도 떠올릴 수 있게 다시 한 번 풀어 말합니다.',
    ],
    thinkingPrompt: '어떤 표현이 가장 또렷하게 들렸나요?',
    outputPrompt: '아이가 본 장면과 설명한 말을 짧게 적어 보세요.',
    reflectionQuestions: [
      '가장 먼저 보인 것은 무엇이었나요?',
      '설명하면서 새로 붙은 말은 무엇이었나요?',
      '다음에는 어떤 장면을 다시 설명해 보고 싶나요?',
    ],
    checklist: ['먼저 본 디테일을 말했다', '설명을 더 풀어 말했다', '장면을 기록으로 남겼다'],
  },
  'family-rule-builder': {
    title: '가족 규칙 함께 만들기',
    summary: '반복되는 집안 장면을 함께 살펴보며 왜 약속이 필요한지 이야기합니다.',
    bigQuestion: '우리 가족 규칙은 왜 필요할까요?',
    materials: ['문제가 되는 장면 하나', '종이 한 장'],
    steps: [
      '반복되는 갈등 장면을 하나 떠올립니다.',
      '그 상황에서 필요한 규칙을 함께 말해 봅니다.',
      '왜 그 규칙이 필요한지 이유를 덧붙입니다.',
      '가족이 모두 읽을 수 있게 규칙 문장을 남깁니다.',
    ],
    thinkingPrompt: '어떤 이유가 규칙을 더 설득력 있게 만들었나요?',
    outputPrompt: '가족 규칙 한 문장과 이유를 적어 보세요.',
    reflectionQuestions: [
      '아이가 만든 규칙 문장은 어땠나요?',
      '어떤 이유가 가장 기억에 남았나요?',
      '다음에 다시 읽으면 무엇을 비교해 볼 수 있을까요?',
    ],
    checklist: ['규칙 문장을 만들었다', '이유를 붙였다', '가족이 함께 읽을 수 있게 남겼다'],
  },
  'high-low-next-talk': {
    title: '하이-로우-넥스트 이야기',
    summary: '하루의 좋은 장면, 힘들었던 장면, 다음에 해 보고 싶은 것을 짧게 남깁니다.',
    bigQuestion: '오늘 하루를 짧게 정리하면 무엇이 남을까요?',
    materials: ['준비물 없음'],
    steps: [
      '오늘 가장 좋았던 장면을 한 문장으로 말합니다.',
      '조금 힘들었던 장면도 한 문장으로 말합니다.',
      '다음에 해 보고 싶은 작은 시도를 하나 고릅니다.',
      '세 문장을 함께 기록합니다.',
    ],
    thinkingPrompt: '어떤 한 문장이 다음 걸음을 가장 잘 보여 주었나요?',
    outputPrompt: 'high, low, next를 각각 한 문장씩 적어 보세요.',
    reflectionQuestions: [
      '어떤 장면이 가장 오래 기억에 남았나요?',
      '다음 시도는 왜 그걸로 정했나요?',
      '비슷한 날에 다시 써 보면 무엇이 달라질까요?',
    ],
    checklist: ['좋았던 장면을 말했다', '힘들었던 장면을 말했다', '다음 시도를 적었다'],
  },
  'my-opinion-matters': {
    title: '내 의견도 중요해요',
    summary: '한 가지 의견을 말하고 이유를 붙이며 다른 관점을 들어 봅니다.',
    bigQuestion: '내 생각을 분명하고 다정하게 어떻게 말할 수 있을까요?',
    materials: ['종이', '연필'],
    steps: [
      '집이나 학교 생활에서 고를 주제를 하나 정합니다.',
      '내 의견을 한 문장으로 말합니다.',
      '그 의견을 뒷받침하는 이유를 한두 개 더합니다.',
      '다른 사람이 어떻게 생각하는지 물어봅니다.',
    ],
    thinkingPrompt: '어떤 이유가 내 의견을 더 잘 이해하게 해 주었나요?',
    outputPrompt: '내 의견과 이유 한 가지를 글이나 그림으로 남겨 보세요.',
    reflectionQuestions: [
      '오늘 어떤 의견을 나눴나요?',
      '어떤 이유가 생각을 또렷하게 해 주었나요?',
      '다른 사람에게서 무엇을 들었나요?',
    ],
    checklist: ['의견을 말했다', '이유를 하나 이상 덧붙였다', '다른 생각을 들었다'],
  },
  'my-small-action-this-week': {
    title: '이번 주 작은 실천 정하기',
    summary: '이번 주에 해 볼 작은 행동을 고르고 왜 중요한지 이야기합니다.',
    bigQuestion: '작은 실천 하나가 왜 의미 있을까요?',
    materials: ['종이와 연필이 없어도 괜찮습니다'],
    steps: [
      '이번 주에 해 볼 작은 행동을 하나 떠올립니다.',
      '그 행동이 왜 하고 싶은지 말해 봅니다.',
      '실제로 할 수 있는지 함께 살펴봅니다.',
      '짧은 약속 문장으로 남깁니다.',
    ],
    thinkingPrompt: '어떤 행동이 가장 현실적으로 느껴졌나요?',
    outputPrompt: '작은 행동 하나와 그 이유를 적어 보세요.',
    reflectionQuestions: [
      '아이가 고른 행동은 무엇이었나요?',
      '왜 그 행동을 하고 싶다고 했나요?',
      '며칠 뒤 다시 보면 무엇을 알 수 있을까요?',
    ],
    checklist: ['작은 행동을 골랐다', '이유를 말했다', '짧은 약속을 남겼다'],
  },
  'notice-think-wonder-about-nature': {
    title: '자연을 보고 생각하고 궁금해하기',
    summary: '자연 장면 하나를 천천히 보며 알아차림, 생각, 질문을 이어 갑니다.',
    bigQuestion: '자연을 천천히 보면 어떤 생각과 질문이 생길까요?',
    materials: ['창밖 풍경', '화분 하나', '산책 중 본 장면'],
    steps: [
      '주변의 자연 장면 하나를 고릅니다.',
      '가장 먼저 보이는 디테일을 말합니다.',
      '그 장면을 보며 떠오른 생각을 나눕니다.',
      '궁금해진 점을 질문으로 남깁니다.',
    ],
    thinkingPrompt: '어떤 관찰이 가장 선명했나요?',
    outputPrompt: '보인 것, 떠오른 생각, 궁금한 질문을 각각 적어 보세요.',
    reflectionQuestions: [
      '가장 먼저 본 것은 무엇인가요?',
      '그 장면에서 어떤 생각이 이어졌나요?',
      '다음에는 어떤 자연 장면을 보고 싶나요?',
    ],
    checklist: ['디테일을 발견했다', '생각을 말했다', '질문을 남겼다'],
  },
  'one-minute-mini-speech': {
    title: '1분 미니 발표하기',
    summary: '핵심 한 가지를 짧게 말해 보며 말하기 자신감을 연습합니다.',
    bigQuestion: '짧게 말해도 핵심이 잘 전해지려면 무엇이 필요할까요?',
    materials: ['주제 하나'],
    steps: [
      '말해 보고 싶은 주제를 하나 고릅니다.',
      '핵심 한 문장을 먼저 정합니다.',
      '덜 중요한 말은 줄이고 문장을 다듬습니다.',
      '1분 안에 말해 보고 다시 들어 봅니다.',
    ],
    thinkingPrompt: '어떤 한 문장이 가장 핵심으로 들렸나요?',
    outputPrompt: '핵심 문장과 줄인 부분을 적어 보세요.',
    reflectionQuestions: [
      '어떤 주제가 가장 말하기 쉬웠나요?',
      '무엇을 줄였을 때 더 또렷해졌나요?',
      '다음에는 어떤 앞에서 말해 보고 싶나요?',
    ],
    checklist: ['주제를 골랐다', '핵심 문장을 정했다', '짧게 말해 봤다'],
  },
  'pattern-hunt-at-home': {
    title: '집안 패턴 찾기',
    summary: '반복되는 모양, 소리, 움직임을 찾아 다음에 올 것을 예상해 봅니다.',
    bigQuestion: '반복되는 패턴을 찾으면 무엇을 더 잘 알 수 있을까요?',
    materials: ['타일', '옷무늬', '식탁 배치', '손뼉 소리'],
    steps: [
      '집 안에서 반복되는 것을 하나 찾습니다.',
      '어떤 규칙이 보이는지 말합니다.',
      '다음에 무엇이 올지 예측해 봅니다.',
      '예측한 이유를 함께 적습니다.',
    ],
    thinkingPrompt: '어떤 반복이 가장 먼저 눈에 들어왔나요?',
    outputPrompt: '찾은 패턴과 다음 예측을 기록해 보세요.',
    reflectionQuestions: [
      '아이의 예측은 어떤 단서를 바탕으로 했나요?',
      '반복을 찾는 기준은 무엇이었나요?',
      '다음에는 어디에서 패턴을 찾아 보고 싶나요?',
    ],
    checklist: ['반복되는 것을 찾았다', '규칙을 말했다', '다음 예측을 적었다'],
  },
  'sort-what-belongs-together': {
    title: '함께 묶이는 것 가려내기',
    summary: '여러 물건을 자기 기준으로 묶고 다시 다른 기준으로 나눠 봅니다.',
    bigQuestion: '같은 것끼리 묶으면 생각이 어떻게 보일까요?',
    materials: ['집 안의 작은 물건 네다섯 개'],
    steps: [
      '작은 물건 몇 개를 모읍니다.',
      '처음 분류 기준을 하나 정합니다.',
      '다른 기준으로 다시 묶어 봅니다.',
      '기준이 바뀌면서 생긴 새 묶음을 기록합니다.',
    ],
    thinkingPrompt: '어떤 기준이 가장 먼저 떠올랐나요?',
    outputPrompt: '처음 기준과 바꾼 기준을 적어 보세요.',
    reflectionQuestions: [
      '아이가 먼저 본 것은 무엇이었나요?',
      '기준을 바꾸자 무엇이 달라졌나요?',
      '다음에는 어떤 물건으로 해 보면 좋을까요?',
    ],
    checklist: ['분류 기준을 정했다', '다른 기준으로 다시 묶었다', '새 묶음을 적었다'],
  },
  'spot-fact-vs-opinion': {
    title: '사실과 의견 구분하기',
    summary: '짧은 문장을 사실과 의견으로 나누며 판단 기준을 살펴봅니다.',
    bigQuestion: '사실과 의견을 구분하면 무엇이 더 분명해질까요?',
    materials: ['뉴스 헤드라인이나 짧은 문장 세 개'],
    steps: [
      '읽어 볼 짧은 문장을 몇 개 고릅니다.',
      '사실인지 의견인지 함께 나눠 봅니다.',
      '헷갈렸던 이유를 말해 봅니다.',
      '어떤 단서를 봤는지 정리합니다.',
    ],
    thinkingPrompt: '어떤 단서가 분류를 도와주었나요?',
    outputPrompt: '사실, 의견, 헷갈린 문장을 각각 적어 보세요.',
    reflectionQuestions: [
      '어떤 문장이 가장 헷갈렸나요?',
      '분류할 때 어떤 말을 근거로 썼나요?',
      '다음에는 어떤 문장을 다시 나눠 보고 싶나요?',
    ],
    checklist: ['문장을 골랐다', '사실과 의견으로 나눴다', '헷갈린 이유를 말했다'],
  },
  'waste-flow-map': {
    title: '쓰레기 흐름 따라가기',
    summary: '쓰고 버린 물건이 어디로 가는지 따라가며 집안의 흐름을 봅니다.',
    bigQuestion: '버린 물건의 흐름을 알면 무엇을 바꿀 수 있을까요?',
    materials: ['방금 사용한 포장재 하나'],
    steps: [
      '최근에 버린 물건 하나를 떠올립니다.',
      '그 물건이 어디로 가는지 흐름을 그려 봅니다.',
      '가장 놀라운 단계를 찾아 봅니다.',
      '다음에 바꿔 보고 싶은 지점을 고릅니다.',
    ],
    thinkingPrompt: '어떤 단계가 가장 의외였나요?',
    outputPrompt: '흐름과 바꿔 보고 싶은 지점을 적어 보세요.',
    reflectionQuestions: [
      '버려지는 흐름에서 무엇을 새롭게 알게 되었나요?',
      '다음에는 어떤 행동을 바꿔 보고 싶나요?',
      '다시 보면 무엇을 비교할 수 있을까요?',
    ],
    checklist: ['흐름을 그렸다', '놀라운 단계를 찾았다', '바꿔 볼 지점을 골랐다'],
  },
  'water-use-check': {
    title: '물 사용 살펴보기',
    summary: '반복되는 물 사용 장면을 관찰하고 작은 변화를 정해 봅니다.',
    bigQuestion: '물 사용을 살펴보면 어떤 습관을 바꿀 수 있을까요?',
    materials: ['자주 하는 물 사용 장면 하나'],
    steps: [
      '물 사용 장면 하나를 고릅니다.',
      '처음 눈에 띈 낭비 지점을 살펴봅니다.',
      '이번 주에 해 볼 작은 변화를 정합니다.',
      '관찰한 내용을 짧게 기록합니다.',
    ],
    thinkingPrompt: '어느 순간에 가장 많이 물이 쓰였나요?',
    outputPrompt: '낭비 지점과 바꿔 볼 행동을 적어 보세요.',
    reflectionQuestions: [
      '어떤 장면이 가장 먼저 떠올랐나요?',
      '작은 변화는 왜 그걸로 정했나요?',
      '며칠 뒤 다시 보면 무엇이 달라질까요?',
    ],
    checklist: ['물 사용 장면을 골랐다', '낭비 지점을 찾았다', '작은 변화를 정했다'],
  },
  'what-changed-in-my-day': {
    title: '오늘 달라진 점 찾기',
    summary: '하루 안에서 달라진 장면을 전후로 남기며 변화를 읽어 봅니다.',
    bigQuestion: '오늘은 무엇이 전과 달라졌을까요?',
    materials: ['특별한 준비 없음'],
    steps: [
      '오늘 달라진 장면 하나를 떠올립니다.',
      '바뀌기 전과 후를 비교해 봅니다.',
      '왜 달라졌는지 이유를 짐작해 봅니다.',
      '전후 차이를 짧게 기록합니다.',
    ],
    thinkingPrompt: '전과 후의 차이를 가장 잘 보여 준 말은 무엇이었나요?',
    outputPrompt: '전과 후, 그리고 달라진 이유를 적어 보세요.',
    reflectionQuestions: [
      '오늘 가장 달라진 장면은 무엇이었나요?',
      '왜 그렇게 달라졌다고 생각했나요?',
      '다음에는 어떤 변화를 다시 보고 싶나요?',
    ],
    checklist: ['달라진 장면을 찾았다', '전후를 비교했다', '이유를 짐작했다'],
  },
};

export function localizeTemplateFields<T extends WorksheetTemplate>(
  template: T,
  locale: SupportedLocale,
): T {
  if (locale === 'en') {
    return template;
  }

  const overrides = KO_TEMPLATE_OVERRIDES[template.slug];

  if (!overrides) {
    return template;
  }

  return {
    ...template,
    ...overrides,
  };
}
