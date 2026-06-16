'use client';

import { useState } from 'react';

import {
  AUTH_COPY,
  AUTH_TABS,
  type AuthMode,
} from '../model/constants/auth.constants';

import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

export function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <section className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/92 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.10)] backdrop-blur-sm sm:p-8">
      <div className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
        {AUTH_TABS.map((tab) => {
          const isActive = tab.mode === mode;

          return (
            <button
              key={tab.mode}
              className={`grid gap-1 rounded-[1.25rem] px-4 py-4 text-left transition ${
                isActive
                  ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                  : 'bg-transparent text-slate-700 hover:bg-white'
              }`}
              onClick={() => setMode(tab.mode)}
              type="button"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.22em]">
                {tab.label}
              </span>
              <span
                className={`text-sm leading-6 ${
                  isActive ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                {tab.description}
              </span>
            </button>
          );
        })}
      </div>

      {mode === 'login' ? (
        <LoginForm />
      ) : (
        <div className="grid gap-4">
          <RegisterForm />
          <p className="text-xs leading-6 text-slate-500">
            {AUTH_COPY.registerDescription}
          </p>
        </div>
      )}
    </section>
  );
}
