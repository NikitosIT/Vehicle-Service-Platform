'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useLoginForm } from '../hooks/use-login-form';
import { AUTH_COPY } from '../model/constants/auth.constants';

export function LoginForm() {
  const { form, handleSubmit, isPending, serverError } = useLoginForm();

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
          {AUTH_COPY.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          {AUTH_COPY.loginTitle}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {AUTH_COPY.loginDescription}
        </p>
      </div>

      <FormField
        autoComplete="email"
        disabled={isPending}
        error={form.formState.errors.email?.message}
        hint="Use the same account email you registered with."
        label="Email"
        placeholder="operator@example.com"
        type="email"
        {...form.register('email')}
      />

      <FormField
        autoComplete="current-password"
        disabled={isPending}
        error={form.formState.errors.password?.message}
        hint="Passwords are validated through the backend session flow."
        label="Password"
        placeholder="Enter your password"
        type="password"
        {...form.register('password')}
      />

      {serverError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {serverError}
        </div>
      ) : null}

      <Button className="w-full" isLoading={isPending} type="submit">
        {isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
