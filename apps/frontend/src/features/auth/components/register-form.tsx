'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useRegisterForm } from '../hooks/use-register-form';
import { AUTH_COPY } from '../model/constants/auth.constants';

export function RegisterForm() {
  const { form, handleSubmit, isPending, serverError } = useRegisterForm();

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
          {AUTH_COPY.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          {AUTH_COPY.registerTitle}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {AUTH_COPY.registerDescription}
        </p>
      </div>

      <FormField
        autoComplete="name"
        disabled={isPending}
        error={form.formState.errors.fullName?.message}
        hint="This name will be shown as the account owner across the platform."
        label="Full name"
        placeholder="Nikita Zavada"
        type="text"
        {...form.register('fullName')}
      />

      <FormField
        autoComplete="email"
        disabled={isPending}
        error={form.formState.errors.email?.message}
        hint="Use an email you want to keep associated with your workspace."
        label="Email"
        placeholder="operator@example.com"
        type="email"
        {...form.register('email')}
      />

      <FormField
        autoComplete="new-password"
        disabled={isPending}
        error={form.formState.errors.password?.message}
        hint="Use at least 8 characters for the initial password."
        label="Password"
        placeholder="Create a password"
        type="password"
        {...form.register('password')}
      />

      {serverError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {serverError}
        </div>
      ) : null}

      <Button className="w-full" isLoading={isPending} type="submit">
        {isPending ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  );
}
