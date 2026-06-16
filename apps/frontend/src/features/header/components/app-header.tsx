'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';

import { HEADER_NAVIGATION } from '../model/constants/header.constants';

import { LogoutControl } from './logout-control';

interface AppHeaderProps {
  fullName: string;
}

export function AppHeader({ fullName }: AppHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            className="inline-flex items-center gap-3 text-slate-950 transition hover:text-slate-700"
            href="/"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xs font-semibold uppercase tracking-[0.28em] text-white">
              VSP
            </span>
            <span className="hidden sm:grid">
              <span className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                Vehicle Service Platform
              </span>
              <span className="text-sm text-slate-700">
                Administrative workspace
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {HEADER_NAVIGATION.map((item) => {
              const isActive =
                item.match === 'exact'
                  ? pathname === item.href
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  className={cn(
                    'inline-flex h-7 items-center justify-center rounded-2xl px-4 text-[0.8rem] font-medium transition',
                    isActive
                      ? 'bg-slate-950 text-white hover:bg-slate-900'
                      : 'text-slate-700 hover:bg-white hover:text-slate-950',
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-right sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Signed in
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950">
              {fullName}
            </p>
          </div>

          <LogoutControl />
        </div>
      </div>
    </header>
  );
}
