export type RouteImageAsset = {
  src: string;
  alt: string;
};

export const HOME_ROUTE_IMAGES = {
  hero: {
    src: '/images/phase4/014-p4-home-hero-family-reflection.png',
    alt: '식탁에서 조용히 대화를 나누는 부모와 아이',
  },
  examples: {
    opinionTalk: {
      src: '/images/phase4/014-p4-home-example-opinion-talk.png',
      alt: '의견을 말하는 아이와 경청하는 부모',
    },
    noticingChange: {
      src: '/images/phase4/014-p4-home-example-noticing-change.png',
      alt: '생활 속 작은 변화를 함께 살피는 장면',
    },
    smallAction: {
      src: '/images/phase4/014-p4-home-example-small-action.png',
      alt: '이번 주 실천할 작은 행동을 고르는 장면',
    },
  },
} as const satisfies Record<string, RouteImageAsset | Record<string, RouteImageAsset>>;

const TEMPLATE_ROUTE_IMAGES = {
  'ask-better-questions': {
    src: '/images/phase4/014-p4-template-ask-better-questions.png',
    alt: '질문을 통해 더 깊게 대화하는 부모와 아이',
  },
  'compare-two-ideas': {
    src: '/images/phase4/014-p4-template-compare-two-ideas.png',
    alt: '두 가지 생각이나 선택지를 나란히 두고 비교하는 장면',
  },
  'explain-what-you-noticed': {
    src: '/images/phase4/014-p4-template-explain-what-you-noticed.png',
    alt: '관찰한 것을 설명하는 아이와 경청하는 부모',
  },
  'family-rule-builder': {
    src: '/images/phase4/014-p4-template-family-rule-builder.png',
    alt: '가족의 약속을 함께 정리하는 부모와 아이',
  },
  'high-low-next-talk': {
    src: '/images/phase4/014-p4-template-high-low-next-talk.png',
    alt: '하루를 차분히 돌아보며 대화하는 부모와 아이',
  },
  'my-opinion-matters': {
    src: '/images/phase4/014-p4-template-my-opinion-matters.png',
    alt: '자신의 생각을 또렷하게 말하는 아이',
  },
  'my-small-action-this-week': {
    src: '/images/phase4/014-p4-template-my-small-action-this-week.png',
    alt: '이번 주 작은 실천을 함께 고르는 장면',
  },
  'notice-think-wonder-about-nature': {
    src: '/images/phase4/014-p4-template-notice-think-wonder-about-nature.png',
    alt: '작은 자연의 변화를 차분히 관찰하는 장면',
  },
  'one-minute-mini-speech': {
    src: '/images/phase4/014-p4-template-one-minute-mini-speech.png',
    alt: '짧은 생각을 자신 있게 말해 보는 아이',
  },
  'pattern-hunt-at-home': {
    src: '/images/phase4/014-p4-template-pattern-hunt-at-home.png',
    alt: '집 안의 반복되는 패턴을 살피는 장면',
  },
  'sort-what-belongs-together': {
    src: '/images/phase4/014-p4-template-sort-what-belongs-together.png',
    alt: '사물들을 분류하며 연결을 찾는 장면',
  },
  'spot-fact-vs-opinion': {
    src: '/images/phase4/014-p4-template-spot-fact-vs-opinion.png',
    alt: '사실과 의견을 구분해 생각해 보는 대화 장면',
  },
  'waste-flow-map': {
    src: '/images/phase4/014-p4-template-waste-flow-map.png',
    alt: '생활 속 사용한 물건의 다음 흐름을 살펴보는 장면',
  },
  'water-use-check': {
    src: '/images/phase4/014-p4-template-water-use-check.png',
    alt: '집에서 쓰는 물의 흐름을 관찰하는 장면',
  },
  'what-changed-in-my-day': {
    src: '/images/phase4/014-p4-template-what-changed-in-my-day.png',
    alt: '하루 동안 달라진 점을 함께 살펴보는 장면',
  },
} as const satisfies Record<string, RouteImageAsset>;

export function getTemplatePhase4Asset(slug: string): RouteImageAsset | null {
  return TEMPLATE_ROUTE_IMAGES[slug as keyof typeof TEMPLATE_ROUTE_IMAGES] ?? null;
}
