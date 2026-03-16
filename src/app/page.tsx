import Link from 'next/link';

const HOW_IT_WORKS_STEPS = [
  {
    title: '템플릿 고르기',
    description: '지금 아이와 해보기 좋은 템플릿을 고르고 바로 기록을 시작합니다.',
    icon: 'filter_vintage',
  },
  {
    title: '함께 해보기',
    description: '아이와 질문하고 관찰하며 짧고 즐거운 연결의 시간을 보냅니다.',
    icon: 'favorite',
  },
  {
    title: '기록하고 확인하기',
    description: '남겨둔 기록과 최근 요약을 보며 다음에 이어갈 활동 감각을 잡습니다.',
    icon: 'edit_note',
  },
] as const;

const TEMPLATE_EXAMPLES = [
  {
    title: '내 생각 말해 보기',
    summary: '하나의 의견을 말하고 이유를 붙여 보며 대화를 시작하는 템플릿입니다.',
    icon: 'chat',
  },
  {
    title: '오늘 달라진 점 찾기',
    summary: '생활 속 변화를 함께 관찰하고 전후를 설명해 보는 템플릿입니다.',
    icon: 'visibility',
  },
  {
    title: '이번 주 작은 실천 정하기',
    summary: '지금 할 수 있는 작은 행동 하나를 고르고 왜 중요한지 남기는 템플릿입니다.',
    icon: 'assignment',
  },
] as const;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900 antialiased">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-background-light/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <span className="material-symbols-outlined">auto_stories</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">IBNote</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-105"
            >
              로그인
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
            <div className="z-10 flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="material-symbols-outlined text-sm">colors_spark</span>
                부모를 위한 활동 기록
              </div>
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-7xl">
                오늘 해 본 활동을 <span className="italic text-primary">짧게 남기고</span> 다시 이어 보기 쉽게 정리합니다.
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-slate-600 md:text-xl">
                집에서 아이와 해본 활동을 짧게 남기고, 다음에 다시 꺼내 보기 쉽게 정리하는 부모용 기록 서비스입니다.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="rounded-xl bg-primary px-8 py-4 text-center text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:shadow-primary/40"
                >
                  기록 시작하기
                </Link>
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 bg-white px-8 py-4 text-center text-lg font-bold transition-colors hover:bg-slate-50"
                >
                  로그인하기
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="relative rotate-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
                <div className="aspect-video overflow-hidden rounded-xl bg-primary/5">
                  <div className="flex h-full items-center justify-center text-primary/20">
                    <span className="material-symbols-outlined text-8xl">auto_stories</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="material-symbols-outlined text-sm">palette</span>
                  </div>
                  <span className="text-sm font-medium text-slate-500">
                    활동 → 기록 → 흐름 확인의 실질적인 제품 루프
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight">IBNote를 쓰는 기본 흐름</h2>
            <p className="text-slate-600">무엇을 할지 고르고, 짧게 기록하고, 최근 흐름을 다시 확인합니다.</p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div key={step.title} className="flex flex-col items-center gap-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Activity Examples */}
        <section className="bg-primary/5 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 flex items-end justify-between">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight">준비된 활동 템플릿</h2>
                <p className="text-slate-600">아이와 대화를 나누고 기록하기 좋은 간단한 질문들입니다.</p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {TEMPLATE_EXAMPLES.map((example) => (
                <div
                  key={example.title}
                  className="group rounded-xl border border-slate-100 bg-white p-8 shadow-md transition-all hover:shadow-xl"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">{example.icon}</span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">{example.title}</h3>
                  <p className="text-slate-600">{example.summary}</p>
                  <Link
                    href="/login"
                    className="mt-6 flex items-center gap-2 font-bold text-primary transition-all group-hover:gap-3"
                  >
                    지금 시작 <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Prop & Privacy */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">기록은 안전하게 보관됩니다.</h2>
            <p className="text-xl leading-relaxed text-slate-600">
              IBNote는 실제 이름이나 학교 같은 민감한 정보 없이도 아이의 배움을 기록할 수 있도록 설계되었습니다.
              모든 기록은 로그인한 본인 계정으로만 연결됩니다.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 p-6">
            <span className="material-symbols-outlined text-2xl text-primary">lock</span>
            <p className="text-sm font-medium text-slate-700">
              데이터는 안전하게 보호되며, 본인 이외의 다른 사람에게 노출되지 않습니다.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 mb-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="relative overflow-hidden rounded-xl bg-primary p-12 text-center md:p-24">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white opacity-10 via-transparent to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center gap-8">
                <h2 className="text-4xl font-extrabold text-white tracking-tight md:text-6xl">로그인하고 오늘 맞는 템플릿부터 시작해 보세요.</h2>
                <p className="max-w-xl text-lg text-white/80">
                  템플릿을 고르고 기록을 남긴 뒤 최근 흐름을 다시 확인하는 현재 제품 흐름으로 바로 들어갈 수 있습니다.
                </p>
                <Link
                  href="/login"
                  className="rounded-xl bg-white px-10 py-5 text-xl font-black text-primary shadow-2xl transition-transform hover:scale-105"
                >
                  로그인하고 시작하기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
            </div>
            <span className="font-extrabold tracking-tight">IBNote</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 IBNote. 집에서 한 활동을 기록하고 다시 이어 보는 부모용 서비스.</p>
        </div>
      </footer>
    </div>
  );
}
