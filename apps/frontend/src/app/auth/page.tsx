import { ensureGuest } from '@/features/auth/api/auth.server';
import { AuthPanel } from '@/features/auth/components/auth-panel';

export default async function AuthPage() {
  await ensureGuest();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#e2e8f0_0%,#f8fafc_35%,#eef2ff_100%)] px-6 py-10 sm:px-8 lg:px-10">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-8">
          <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
            Vehicle Service Platform
          </div>

          <div className="grid gap-5">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">
              Private operator workspace
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Sign in to manage only the records that belong to your account.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              The platform now works through protected account sessions. After
              authentication, you can create users, assign vehicles to them, and
              see only the records owned by your account.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-[1.5rem] border border-white/70 bg-white/78 p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Account scope
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Each session is isolated to its own users and vehicles.
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-white/70 bg-white/78 p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Backend enforced
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Visibility and ownership are enforced directly by the services.
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-white/70 bg-white/78 p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Instant access
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                New accounts become authenticated immediately after
                registration.
              </p>
            </article>
          </div>
        </div>

        <AuthPanel />
      </section>
    </main>
  );
}
