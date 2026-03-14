import Link from 'next/link';

const HOW_IT_WORKS_STEPS = [
  {
    title: '1. 오늘 맞는 활동 고르기',
    description: '로그인 후 지금 아이와 해보기 좋은 템플릿을 고르고 바로 기록을 시작합니다.',
  },
  {
    title: '2. 짧게 함께 해보기',
    description: '질문하고 관찰하며 집에서 부담 없이 활동한 내용을 한 번에 정리합니다.',
  },
  {
    title: '3. 흐름 다시 보기',
    description: '남겨 둔 기록과 최근 요약을 보며 다음에 이어갈 활동 감각을 잡습니다.',
  },
] as const;

const TEMPLATE_EXAMPLES = [
  {
    title: '내 생각 말해 보기',
    summary: '하나의 의견을 말하고 이유를 붙여 보며 대화를 시작하는 템플릿입니다.',
  },
  {
    title: '오늘 달라진 점 찾기',
    summary: '생활 속 변화를 함께 관찰하고 전후를 설명해 보는 템플릿입니다.',
  },
  {
    title: '이번 주 작은 실천 정하기',
    summary: '지금 할 수 있는 작은 행동 하나를 고르고 왜 중요한지 남기는 템플릿입니다.',
  },
] as const;

const VALUE_POINTS = [
  '무엇을 하는 서비스인지 첫 화면에서 바로 이해할 수 있도록 설명합니다.',
  '아이와 한 활동을 길지 않게 남기고 다시 이어 보기 쉽게 돕습니다.',
  '기록과 요약은 로그인한 계정에만 연결되어 다른 사람과 섞이지 않습니다.',
] as const;

export default function HomePage() {
  return (
    <main className="bg-[linear-gradient(180deg,#f6f7fb_0%,#eef2ff_42%,#ffffff_100%)] px-6 py-10 text-slate-800 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:gap-6">
        <section className="overflow-hidden rounded-[2rem] border border-indigo-100 bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.24),_transparent_32%),linear-gradient(135deg,#ffffff_0%,#eef2ff_52%,#f8fafc_100%)] p-8 shadow-[0_20px_80px_rgba(79,70,229,0.10)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
                IBNote
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                집에서 아이와 해 본 활동을 짧게 남기고 다음에 다시 꺼내 보기 쉽게 정리하는 부모용 기록 서비스입니다.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                오늘 해 본 활동을 고르고 짧게 적어 두면, 최근 기록을 보며 다음에 무엇을 이어서 해 볼지 바로 감을 잡을 수 있습니다.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/login"
                  className="inline-flex justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  로그인하고 시작하기
                </Link>
                <p className="text-sm leading-6 text-slate-600">
                  회원가입과 로그인은 같은 화면에서 진행되며, 로그인 후 템플릿으로 바로 이동합니다.
                </p>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                한눈에 보기
              </p>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                <li className="rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3">
                  활동 선택 → 기록 작성 → 최근 흐름 확인의 현재 제품 흐름 그대로 사용합니다.
                </li>
                <li className="rounded-2xl border border-stone-200 bg-white px-4 py-3">
                  긴 보고서보다 부모가 바로 적을 수 있는 짧은 활동 기록에 집중합니다.
                </li>
                <li className="rounded-2xl border border-stone-200 bg-white px-4 py-3">
                  민감한 개인정보는 적지 않도록 안내하며, 기록은 로그인한 계정 기준으로만 보관됩니다.
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <article
              key={step.title}
              className="rounded-[1.75rem] border border-indigo-100 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
            >
              <h2 className="text-lg font-semibold text-slate-900">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">활동 예시</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl">
              바로 시작하기 좋은 활동 예시
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              템플릿은 오늘 아이와 나눌 말거리와 관찰 포인트를 바로 떠올릴 수 있도록 간단한 질문 중심으로 구성했습니다.
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {TEMPLATE_EXAMPLES.map((example) => (
                <article
                  key={example.title}
                  className="rounded-[1.5rem] border border-stone-200 bg-slate-50 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    IBNote 템플릿
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{example.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{example.summary}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-stone-200 bg-slate-950 p-6 text-slate-50 shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">이런 점이 좋아요</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              길게 쓰지 않아도 오늘 아이와 한 활동을 다시 떠올리기 쉽게 정리합니다.
            </h2>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-200 sm:text-base">
              {VALUE_POINTS.map((point) => (
                <li key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">다음 단계</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl">
              로그인 후 오늘 맞는 템플릿을 고르고 바로 기록해 보세요.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              지금 제공하는 템플릿 · 기록 · 최근 요약 흐름 안에서, 첫 사용에도 무엇을 하면 되는지 바로 보이도록 화면 문구를 다듬고 있습니다.
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                계정으로 들어가기
              </Link>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-6 text-sm leading-6 text-emerald-950 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">개인정보 안내</p>
            <p className="mt-3">
              IBNote는 부모가 직접 남긴 기록을 로그인한 계정 기준으로만 보여 줍니다. 실제 이름, 학교 이름,
              자세한 민감정보는 적지 않도록 안내합니다.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
