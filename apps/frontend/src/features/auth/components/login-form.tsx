'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useLoginForm } from '../hooks/use-login-form';

export function LoginForm() {
  const { form, handleSubmit, isPending, serverError } = useLoginForm();

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
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
