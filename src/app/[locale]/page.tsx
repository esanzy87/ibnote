import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';

import { GlobalTopBar } from '@/components/navigation/global-top-bar';
import { HOME_ROUTE_IMAGES } from '@/lib/assets/phase4-route-images';
import { getTemplateBySlug } from '@/lib/templates/template-repo';
import { isSupportedLocale } from '@/lib/templates/template-localization';

export default async function HomePage() {
  const locale = await getLocale();
  const templateLocale = isSupportedLocale(locale) ? locale : 'ko';
  const t = await getTranslations('home');

  const HOW_IT_WORKS_STEPS = [
    {
      title: t('step1Title'),
      description: t('step1Desc'),
      icon: 'filter_vintage',
    },
    {
      title: t('step2Title'),
      description: t('step2Desc'),
      icon: 'favorite',
    },
    {
      title: t('step3Title'),
      description: t('step3Desc'),
      icon: 'edit_note',
    },
  ] as const;

  const TEMPLATE_EXAMPLES = [
    {
      slug: 'my-opinion-matters',
      icon: 'chat',
      image: HOME_ROUTE_IMAGES.examples.opinionTalk,
    },
    {
      slug: 'what-changed-in-my-day',
      icon: 'visibility',
      image: HOME_ROUTE_IMAGES.examples.noticingChange,
    },
    {
      slug: 'my-small-action-this-week',
      icon: 'assignment',
      image: HOME_ROUTE_IMAGES.examples.smallAction,
    },
  ].flatMap((example) => {
    const template = getTemplateBySlug(example.slug, templateLocale);

    if (!template) {
      return [];
    }

    return [{ ...example, template }];
  });

  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900 antialiased">
      <GlobalTopBar
        active="home"
        action={{ href: '/login', icon: 'login', label: t('loginBtn'), tone: 'primary' }}
      />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
            <div className="z-10 flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                {t('heroBadge')}
              </div>
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-7xl">
                {t.rich('heroTitle', {
                  highlight: (chunks) => <span className="italic text-primary">{chunks}</span>
                })}
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-slate-600 md:text-xl">
                {t('heroDescription')}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="rounded-xl bg-primary px-8 py-4 text-center text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:shadow-primary/40"
                >
                  {t('startNow')}
                </Link>
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 bg-white px-8 py-4 text-center text-lg font-bold transition-colors hover:bg-slate-50"
                >
                  {t('loginBtn')}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="relative rotate-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-primary/5">
                  <Image
                    src={HOME_ROUTE_IMAGES.hero.src}
                    alt={HOME_ROUTE_IMAGES.hero.alt}
                    fill
                    priority
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 via-transparent to-white/10" />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="material-symbols-outlined text-sm">palette</span>
                  </div>
                  <span className="text-sm font-medium text-slate-500">
                    {t('loopBadge')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight">{t('howItWorksTitle')}</h2>
            <p className="text-slate-600">{t('howItWorksSub')}</p>
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
                <h2 className="text-3xl font-extrabold tracking-tight">{t('examplesTitle')}</h2>
                <p className="text-slate-600">{t('examplesSub')}</p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {TEMPLATE_EXAMPLES.map((example) => (
                <div
                  key={example.template.slug}
                  className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-md transition-all hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden bg-primary/5">
                    <Image
                      src={example.image.src}
                      alt={example.image.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/30 to-transparent" />
                  </div>
                  <div className="p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="material-symbols-outlined">{example.icon}</span>
                    </div>
                    <h3 className="mb-3 text-2xl font-bold">{example.template.title}</h3>
                    <p className="text-slate-600">{example.template.summary}</p>
                    <Link
                      href="/login"
                      className="mt-6 flex items-center gap-2 font-bold text-primary transition-all group-hover:gap-3"
                    >
                      {t('startNow')} <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Prop & Privacy */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">{t('privacyTitle')}</h2>
            <p className="text-xl leading-relaxed text-slate-600">
              {t('privacyDesc')}
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 p-6">
            <span className="material-symbols-outlined text-2xl text-primary">lock</span>
            <p className="text-sm font-medium text-slate-700">
              {t('privacyCaption')}
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 mb-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="relative overflow-hidden rounded-xl bg-primary p-12 text-center md:p-24">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white opacity-10 via-transparent to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center gap-8">
                <h2 className="text-4xl font-extrabold text-white tracking-tight md:text-6xl">{t('ctaTitle')}</h2>
                <p className="max-w-xl text-lg text-white/80">
                  {t('ctaDesc')}
                </p>
                <Link
                  href="/login"
                  className="rounded-xl bg-white px-10 py-5 text-xl font-black text-primary shadow-2xl transition-transform hover:scale-105"
                >
                  {t('ctaBtn')}
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
          <p className="text-sm text-slate-500">{t('footer')}</p>
        </div>
      </footer>
    </div>
  );
}
