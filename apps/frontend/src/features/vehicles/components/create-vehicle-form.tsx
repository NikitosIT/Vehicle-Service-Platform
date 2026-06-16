'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';

import { useCreateVehicleForm } from '../hooks/use-create-vehicle-form';
import { CREATE_VEHICLE_MESSAGES } from '../model/constants/create-vehicle.constants';

interface CreateVehicleFormProps {
  userId: string;
}

export function CreateVehicleForm({ userId }: CreateVehicleFormProps) {
  const { form, handleSubmit, isPending, serverError, successMessage } =
    useCreateVehicleForm(userId);

  const makeError = form.formState.errors.make?.message;
  const modelError = form.formState.errors.model?.message;
  const yearError = form.formState.errors.year?.message;

  return (
    <section className="rounded-4xl border border-slate-200 bg-white/90 p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          Create vehicle
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">
          Register a transport vehicle
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
          {CREATE_VEHICLE_MESSAGES.description}
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            disabled={isPending}
            error={makeError}
            hint="For example: Toyota, BMW, Audi."
            label="Make"
            placeholder="Toyota"
            type="text"
            {...form.register('make')}
          />

          <FormField
            disabled={isPending}
            error={modelError}
            hint="For example: Corolla, X5, A6."
            label="Model"
            placeholder="Corolla"
            type="text"
            {...form.register('model')}
          />
        </div>

        <FormField
          disabled={isPending}
          error={yearError}
          hint="Optional. Use a valid production year."
          label="Year"
          placeholder="2024"
          type="number"
          {...form.register('year')}
        />

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

        <div className="flex items-center justify-end pt-2">
          <Button isLoading={isPending} type="submit">
            {isPending
              ? CREATE_VEHICLE_MESSAGES.submitLoading
              : CREATE_VEHICLE_MESSAGES.submitIdle}
          </Button>
        </div>
      </form>
    </section>
  );
}
