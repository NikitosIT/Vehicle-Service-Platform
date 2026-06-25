'use client';

import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useLoginForm } from '../hooks/use-login-form';
import type { LoginInput } from '../model/schemas/auth.schemas';

interface LoginFormProps {
  form: UseFormReturn<LoginInput>;
}

export function LoginForm({ form }: LoginFormProps) {
  const { handleSubmit, isPending, serverError } = useLoginForm(form);
  const hasServerError = Boolean(serverError);

  return (
    <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
      <FormField
        autoComplete="email"
        disabled={isPending}
        error={form.formState.errors.email?.message}
        label="Email"
        placeholder="operator@example.com"
        type="email"
        {...form.register('email')}
      />

      <FormField
        autoComplete="current-password"
        disabled={isPending}
        error={form.formState.errors.password?.message}
        label="Password"
        placeholder="Enter your password"
        type="password"
        {...form.register('password')}
      />

      <div className="min-h-18">
        {hasServerError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700 wrap-break-word">
            {serverError}
          </div>
        ) : null}
      </div>

      <Button className="w-full" isLoading={isPending} type="submit">
        {isPending ? 'Signing in...' : 'Sign in'}
      </Button>

      <div className="mt-auto rounded-[1.25rem] border border-slate-200/80 bg-slate-50/85 px-4 py-3">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Secure operator access
        </p>
        <p className="mt-1 text-[0.8rem] leading-5 text-slate-600">
          Sign in to manage registered users, linked vehicles, and official
          service notifications.
        </p>

        <div className="mt-2.5 grid gap-1 text-[0.77rem] leading-5 text-slate-700">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>User registry management</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>Vehicle ownership tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>Maintenance and fine alerts</span>
          </div>
        </div>
      </div>
    </form>
  );
}
