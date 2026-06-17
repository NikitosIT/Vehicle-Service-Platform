'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useRegisterForm } from '../hooks/use-register-form';

export function RegisterForm() {
  const { form, handleSubmit, isPending, serverError } = useRegisterForm();

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <FormField
        autoComplete="name"
        disabled={isPending}
        error={form.formState.errors.fullName?.message}
        label="Full name"
        placeholder="Nikita Zavada"
        type="text"
        {...form.register('fullName')}
      />

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
        autoComplete="new-password"
        disabled={isPending}
        error={form.formState.errors.password?.message}
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
