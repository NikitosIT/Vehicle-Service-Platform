'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AUTH_TABS, type AuthMode } from '../model/constants/auth.constants';

import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

export function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <section className="grid gap-6 rounded-[1.75rem] border border-white/80 bg-white/92 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-7">
      <div className="relative grid grid-cols-2 rounded-2xl border border-slate-200 bg-slate-100/80 p-1">
        {AUTH_TABS.map((tab) => {
          const isActive = tab.mode === mode;

          return (
            <button
              key={tab.mode}
              className={`relative z-10 rounded-[0.9rem] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                isActive ? 'text-white' : 'text-slate-500 hover:text-slate-950'
              }`}
              onClick={() => setMode(tab.mode)}
              type="button"
            >
              {isActive ? (
                <motion.span
                  className="absolute inset-0 -z-10 rounded-[0.9rem] bg-slate-950 shadow-lg shadow-slate-950/15"
                  layoutId="auth-active-tab"
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                />
              ) : null}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {mode === 'login' ? <LoginForm /> : <RegisterForm />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
