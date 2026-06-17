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
    <section className="rounded-[2rem] border border-white/70 bg-white/72 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm lg:p-7">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          Vehicle record
        </p>
        <div className="lg:max-w-xl">
          <h2 className="text-2xl font-semibold text-slate-950">
            Register vehicle
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {CREATE_VEHICLE_MESSAGES.description}
          </p>
        </div>
        <div className="grid gap-2 rounded-3xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600 lg:min-w-60">
          <p>Make and model are required.</p>
          <p>Year can be left empty.</p>
        </div>
      </div>

      <form className="grid gap-4 lg:max-w-4xl" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_0.7fr]">
          <FormField
            disabled={isPending}
            error={makeError}
            hint="Brand"
            label="Make"
            placeholder="Toyota"
            type="text"
            {...form.register('make')}
          />

          <FormField
            disabled={isPending}
            error={modelError}
            hint="Model name"
            label="Model"
            placeholder="Corolla"
            type="text"
            {...form.register('model')}
          />

          <FormField
            disabled={isPending}
            error={yearError}
            hint="Optional"
            label="Year"
            placeholder="2024"
            type="number"
            {...form.register('year')}
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
            The vehicle is linked to the current user after saving.
          </p>

          <Button
            className="w-full sm:w-auto"
            isLoading={isPending}
            type="submit"
          >
            {isPending
              ? CREATE_VEHICLE_MESSAGES.submitLoading
              : CREATE_VEHICLE_MESSAGES.submitIdle}
          </Button>
        </div>
      </form>
    </section>
  );
}
