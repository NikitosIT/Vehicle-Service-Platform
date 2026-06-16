'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { deleteVehicleAction } from '../actions/delete-vehicle.action';
import type { VehicleListItem } from '../model/types/vehicles.types';

export function useDeleteVehicle(vehicle: VehicleListItem) {
  const router = useRouter();
  const [isPending, startDeleting] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const openDialog = () => {
    setServerError(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    if (isPending) {
      return;
    }

    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    setServerError(null);

    startDeleting(async () => {
      const result = await deleteVehicleAction(vehicle.id, vehicle.userId);

      if (result.error) {
        setServerError(result.error);
        return;
      }

      setIsDialogOpen(false);
      router.refresh();
    });
  };

  return {
    closeDialog,
    handleDelete,
    isDialogOpen,
    isPending,
    openDialog,
    serverError,
  };
}
