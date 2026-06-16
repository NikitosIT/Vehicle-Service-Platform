'use client';

import { startTransition, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateVehicleAction } from '../actions/update-vehicle.action';
import {
  getUpdateVehicleDefaultValues,
  UPDATE_VEHICLE_MESSAGES,
} from '../model/constants/update-vehicle.constants';
import { updateVehicleSchema } from '../model/schemas/update-vehicle.schema';
import type {
  UpdateVehicleFormValues,
  VehicleListItem,
} from '../model/types/vehicles.types';

export function useUpdateVehicleForm(vehicle: VehicleListItem) {
  const router = useRouter();
  const [isPending, startSubmitting] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<UpdateVehicleFormValues>({
    defaultValues: getUpdateVehicleDefaultValues(vehicle),
    resolver: zodResolver(updateVehicleSchema),
  });

  useEffect(() => {
    form.reset(getUpdateVehicleDefaultValues(vehicle));
  }, [form, vehicle]);

  const openDialog = () => {
    setServerError(null);
    form.reset(getUpdateVehicleDefaultValues(vehicle));
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    if (isPending) {
      return;
    }

    setIsDialogOpen(false);
  };

  const handleSubmit = form.handleSubmit((values) => {
    setServerError(null);

    startSubmitting(async () => {
      const result = await updateVehicleAction(
        vehicle.id,
        vehicle.userId,
        values,
      );

      if (result.error) {
        setServerError(result.error);
        return;
      }

      setIsDialogOpen(false);
      startTransition(() => {
        router.refresh();
      });
    });
  });

  return {
    closeDialog,
    form,
    handleSubmit,
    isDialogOpen,
    isPending,
    openDialog,
    serverError,
    submitLabel: isPending
      ? UPDATE_VEHICLE_MESSAGES.submitLoading
      : UPDATE_VEHICLE_MESSAGES.submitIdle,
  };
}
