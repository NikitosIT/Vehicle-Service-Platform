'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useUpdateUserForm } from '../hooks/use-update-user-form';
import { UPDATE_USER_MESSAGES } from '../model/constants/update-user.constants';
import type { UserListItem } from '../model/types/users.types';

interface UpdateUserFormProps {
  user: UserListItem;
}

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const { form, handleSubmit, isPending, serverError, successMessage } =
    useUpdateUserForm(user);

  const nameError = form.formState.errors.name?.message;

  return (
    <section className="rounded-[2rem] border border-white/70 bg-white/72 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm lg:p-7">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          User record
        </p>
        <div className="lg:max-w-xl">
          <h2 className="text-2xl font-semibold text-slate-950">
            Edit display name
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {UPDATE_USER_MESSAGES.description}
          </p>
        </div>
        <div className="grid gap-2 rounded-3xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600 lg:min-w-60">
          <p>Email remains read-only.</p>
          <p>Name can contain letters and spaces only.</p>
        </div>
      </div>

      <form className="grid gap-4 lg:max-w-4xl" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <FormField
            autoComplete="email"
            disabled
            hint="Primary identifier"
            label="Email"
            value={user.email}
          />

          <FormField
            autoComplete="name"
            disabled={isPending}
            error={nameError}
            hint="Display name"
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
            Changes are applied to this user record only.
          </p>

          <Button
            className="w-full sm:w-auto"
            isLoading={isPending}
            type="submit"
          >
            {isPending
              ? UPDATE_USER_MESSAGES.submitLoading
              : UPDATE_USER_MESSAGES.submitIdle}
          </Button>
        </div>
      </form>
    </section>
  );
}
