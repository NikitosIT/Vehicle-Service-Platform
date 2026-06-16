'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormField } from '@/components/ui/form-field';

import { useUpdateVehicleForm } from '../hooks/use-update-vehicle-form';
import { UPDATE_VEHICLE_MESSAGES } from '../model/constants/update-vehicle.constants';
import type { VehicleListItem } from '../model/types/vehicles.types';

interface UpdateVehicleDialogProps {
  vehicle: VehicleListItem;
}

export function UpdateVehicleDialog({ vehicle }: UpdateVehicleDialogProps) {
  const {
    closeDialog,
    form,
    handleSubmit,
    isDialogOpen,
    isPending,
    openDialog,
    serverError,
    submitLabel,
  } = useUpdateVehicleForm(vehicle);

  const makeError = form.formState.errors.make?.message;
  const modelError = form.formState.errors.model?.message;
  const yearError = form.formState.errors.year?.message;

  return (
    <>
      <Button onClick={openDialog} size="sm" type="button" variant="outline">
        Edit
      </Button>

      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        open={isDialogOpen}
      >
        <DialogContent className="rounded-4xl p-6 sm:max-w-xl">
          <DialogHeader className="gap-3">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
              Update vehicle
            </p>
            <DialogTitle className="text-2xl font-semibold text-slate-950">
              {vehicle.make} {vehicle.model}
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-slate-600">
              {UPDATE_VEHICLE_MESSAGES.description}
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                disabled={isPending}
                error={makeError}
                hint="Vehicle manufacturer or brand name."
                label="Make"
                placeholder="Toyota"
                type="text"
                {...form.register('make')}
              />

              <FormField
                disabled={isPending}
                error={modelError}
                hint="Commercial or internal model name."
                label="Model"
                placeholder="Corolla"
                type="text"
                {...form.register('model')}
              />
            </div>

            <FormField
              disabled={isPending}
              error={yearError}
              hint="Optional. Leave empty if the year is unknown."
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

            <DialogFooter className="mt-2 flex-col-reverse gap-3 border-0 bg-transparent p-0 sm:flex-row sm:justify-end">
              <Button
                disabled={isPending}
                onClick={closeDialog}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button isLoading={isPending} type="submit">
                {submitLabel}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
