import { ensureGuest } from '@/features/auth/api/auth.server';
import { AuthPanel } from '@/features/auth/components/auth-panel';

export default async function AuthPage() {
  await ensureGuest();

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,#f8fafc_0%,#eef2ff_42%,#e2e8f0_100%)] px-5 py-8 sm:px-8">
      <section className="grid w-full max-w-[34rem] gap-6">
        <h1 className="text-center text-sm font-semibold uppercase tracking-[0.34em] text-slate-700 sm:text-base">
          Vehicle Service Platform
        </h1>
        <AuthPanel />
      </section>
    </main>
  );
}
