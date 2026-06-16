import { requireCurrentAccount } from '@/features/auth/api/auth.server';
import { AppHeader } from '@/features/header/components/app-header';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = await requireCurrentAccount();

  return (
    <div className="min-h-screen bg-slate-100">
      <AppHeader fullName={account.fullName} />
      {children}
    </div>
  );
}
