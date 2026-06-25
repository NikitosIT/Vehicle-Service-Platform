'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import {
  AUTH_TABS,
  type AuthMode,
  LOGIN_DEFAULT_VALUES,
  REGISTER_DEFAULT_VALUES,
} from '../model/constants/auth.constants';
import {
  type LoginInput,
  loginSchema,
  type RegisterInput,
  registerSchema,
} from '../model/schemas/auth.schemas';

import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

export function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>('login');
  const loginForm = useForm<LoginInput>({
    defaultValues: LOGIN_DEFAULT_VALUES,
    resolver: zodResolver(loginSchema),
  });
  const registerForm = useForm<RegisterInput>({
    defaultValues: REGISTER_DEFAULT_VALUES,
    resolver: zodResolver(registerSchema),
  });

  return (
    <section className="grid gap-6 rounded-[1.75rem] border border-white/80 bg-white/92 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:min-h-[38rem] sm:p-7">
      <div className="relative grid h-12 grid-cols-2 rounded-[1rem] border border-slate-200/90 bg-slate-100/75 p-0.5">
        {AUTH_TABS.map((tab) => {
          const isActive = tab.mode === mode;

          return (
            <button
              key={tab.mode}
              className={`relative z-10 h-full rounded-[0.85rem] px-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                isActive ? 'text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
              onClick={() => setMode(tab.mode)}
              type="button"
            >
              {isActive ? (
                <motion.span
                  className="absolute inset-0 -z-10 rounded-[0.85rem] bg-slate-950 shadow-[0_8px_20px_rgba(15,23,42,0.14)]"
                  layoutId="auth-active-tab"
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                />
              ) : null}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="h-[30rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
            exit={{ opacity: 0, y: -6 }}
            initial={false}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {mode === 'login' ? (
              <LoginForm form={loginForm} />
            ) : (
              <RegisterForm form={registerForm} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
