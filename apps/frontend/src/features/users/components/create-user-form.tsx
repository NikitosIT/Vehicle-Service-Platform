'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useCreateUserForm } from '../hooks/use-create-user-form';
import { CREATE_USER_MESSAGES } from '../model/constants/create-user.constants';

export function CreateUserForm() {
  const { form, handleSubmit, isPending, serverError, successMessage } =
    useCreateUserForm();

  const emailError = form.formState.errors.email?.message;
  const nameError = form.formState.errors.name?.message;

  return (
    <section className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
          New record
        </p>
        <div className="lg:max-w-xl">
          <h2 className="text-2xl font-semibold text-slate-950">Create user</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {CREATE_USER_MESSAGES.description}
          </p>
        </div>
        <div className="grid gap-2 rounded-3xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600 lg:min-w-60">
          <p>Email is used as the unique identifier.</p>
          <p>Name accepts letters and spaces only.</p>
        </div>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <FormField
            autoComplete="email"
            disabled={isPending}
            error={emailError}
            hint="Primary identifier"
            label="Email"
            placeholder="jane.doe@example.com"
            type="email"
            {...form.register('email')}
          />

          <FormField
            autoComplete="name"
            disabled={isPending}
            error={nameError}
            hint="Up to 30 characters"
            label="Full name"
            placeholder="Jane Doe"
            type="text"
            {...form.register('name')}
          />
        </div>

        {serverError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {serverError}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            The list updates automatically after saving.
          </p>

          <Button
            className="w-full sm:w-auto"
            isLoading={isPending}
            type="submit"
          >
            {isPending
              ? CREATE_USER_MESSAGES.submitLoading
              : CREATE_USER_MESSAGES.submitIdle}
          </Button>
        </div>
      </form>
    </section>
  );
}
