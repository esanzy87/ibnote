export default function HomePage() {
  return (
    <main className="bg-stone-100 px-6 py-12 text-slate-800 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
            IBNote
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            집에서 한 활동을 간단한 기록으로 남기는 학습 노트 도구입니다.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            오늘 해볼 활동을 고르고, 해본 뒤 짧게 남기고, 최근 흐름을 살펴보는 MVP
            랜딩 구조입니다.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ['1. 활동 고르기', '부담 없는 템플릿을 찾아 오늘 바로 시작합니다.'],
            ['2. 함께 해보기', '질문하고 관찰하며 짧은 활동을 진행합니다.'],
            ['3. 기록 남기기', '무엇이 보였는지 간단히 적고 다음 활동으로 이어갑니다.'],
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {[
            {
              title: '의견 말하기',
              summary: '내 생각을 한 문장으로 말하고 이유를 붙이는 활동 자리입니다.',
            },
            {
              title: '관찰 설명하기',
              summary: '눈에 띈 변화를 보고 말하거나 적어보는 활동 자리입니다.',
            },
            {
              title: '작은 실천 정하기',
              summary: '이번 주에 해볼 작은 행동을 정리하는 활동 자리입니다.',
            },
          ].map((example) => (
            <article key={example.title} className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                Example template
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{example.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{example.summary}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">왜 도움이 되나요?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              복잡한 리포트 대신, 오늘 한 활동과 관찰을 짧게 남겨 반복하기 쉽게 만드는
              흐름을 준비하는 자리입니다.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-dashed border-stone-300 bg-stone-50 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">다음 단계</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              로그인 화면과 실제 서비스 진입 흐름은 다음 작업에서 연결됩니다.
            </p>
            <button
              type="button"
              disabled
              className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white opacity-60"
            >
              로그인 화면 준비 중
            </button>
          </article>
        </section>

        <section className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-950 sm:p-8">
          부모가 사용하는 MVP를 기준으로 설계합니다. 실제 이름, 학교 이름, 민감한
          개인정보는 입력하지 않도록 안내할 예정입니다.
        </section>
      </div>
    </main>
  );
}
