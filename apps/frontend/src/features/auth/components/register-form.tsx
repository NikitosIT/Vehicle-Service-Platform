'use client';

import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useRegisterForm } from '../hooks/use-register-form';
import type { RegisterInput } from '../model/schemas/auth.schemas';

interface RegisterFormProps {
  form: UseFormReturn<RegisterInput>;
}

export function RegisterForm({ form }: RegisterFormProps) {
  const { handleSubmit, isPending, serverError } = useRegisterForm(form);
  const hasServerError = Boolean(serverError);

  return (
    <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
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

      <div className="min-h-[4.5rem]">
        {hasServerError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700 break-words">
            {serverError}
          </div>
        ) : null}
      </div>

      <Button className="w-full" isLoading={isPending} type="submit">
        {isPending ? 'Creating account...' : 'Create account'}
      </Button>

      <div className="mt-auto min-h-[8.5rem] rounded-[1.25rem] border border-transparent px-4 py-3" />
    </form>
  );
}
