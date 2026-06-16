'use client';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

import { useDeleteVehicle } from '../hooks/use-delete-vehicle';
import { DELETE_VEHICLE_MESSAGES } from '../model/constants/delete-vehicle.constants';
import type { VehicleListItem } from '../model/types/vehicles.types';

interface DeleteVehicleButtonProps {
  vehicle: VehicleListItem;
}

export function DeleteVehicleButton({ vehicle }: DeleteVehicleButtonProps) {
  const {
    closeDialog,
    handleDelete,
    isDialogOpen,
    isPending,
    openDialog,
    serverError,
  } = useDeleteVehicle(vehicle);

  return (
    <>
      <div className="grid gap-3">
        <Button
          className="border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
          onClick={openDialog}
          size="sm"
          type="button"
          variant="outline"
        >
          Delete
        </Button>

        {serverError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {serverError}
          </div>
        ) : null}
      </div>

      <ConfirmDialog
        confirmLabel={DELETE_VEHICLE_MESSAGES.submitIdle}
        description={DELETE_VEHICLE_MESSAGES.confirm}
        isLoading={isPending}
        isOpen={isDialogOpen}
        onCancel={closeDialog}
        onConfirm={handleDelete}
        title="Delete this vehicle?"
      />
    </>
  );
}
