import Link from 'next/link';

import {
  PLATFORM_METRICS,
  PLATFORM_PILLARS,
  PLATFORM_STEPS,
} from '../model/constants/home.constants';

import { HeroCarousel } from './hero-carousel';

export function HomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#e2e8f0_42%,#cbd5e1_100%)]">
      <section className="relative overflow-hidden px-6 py-10 lg:px-10 lg:py-14">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.08),transparent_62%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] border border-white/70 bg-white/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:p-10">
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
                    Official transport platform
                  </span>
                  <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    Administrative console
                  </span>
                </div>

                <div className="max-w-3xl space-y-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-slate-500">
                    Vehicle Service Platform
                  </p>
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                    Official registry and notification workflow for users and
                    vehicles.
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                    The platform registers users and their transport vehicles,
                    keeps the registry synchronized, and sends timely
                    notifications about maintenance events, inspections, or
                    fines.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    href="/users"
                  >
                    Open user registry
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
                    href="/vehicles"
                  >
                    Open vehicle registry
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {PLATFORM_METRICS.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-5"
                    >
                      <p className="text-3xl font-semibold text-slate-950">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10 lg:px-10 lg:pb-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/60 bg-white/75 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Platform mission
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">
              Built for official mobility administration.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              This service is designed for disciplined operational handling of
              citizens, drivers, and transport units. It focuses on
              registration, reliable lookup, and structured notifications for
              maintenance or legal obligations.
            </p>

            <div className="mt-8 grid gap-4">
              {PLATFORM_STEPS.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {PLATFORM_PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_16px_42px_rgba(15,23,42,0.05)] backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Platform capability
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                      {pillar.title}
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Active
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
