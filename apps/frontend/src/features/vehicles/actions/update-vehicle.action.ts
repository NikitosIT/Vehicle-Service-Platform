'use server';

import { revalidatePath } from 'next/cache';

import { ApiError } from '@/api';
import { routes } from '@/model/constants/routes';

import { updateVehicle } from '../api/vehicles.server';
import { updateVehicleSchema } from '../model/schemas/update-vehicle.schema';
import type { UpdateVehicleFormValues } from '../model/types/vehicles.types';

export interface UpdateVehicleActionState {
  error?: string;
  success?: string;
}

export async function updateVehicleAction(
  vehicleId: number,
  userId: string,
  input: UpdateVehicleFormValues,
): Promise<UpdateVehicleActionState> {
  const parsed = updateVehicleSchema.safeParse(input);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];

    return {
      error: issue.message,
    };
  }

  try {
    await updateVehicle(vehicleId, parsed.data);
    revalidatePath(routes.appRoutes.vehicles);
    revalidatePath(`${routes.appRoutes.users}/${userId}`);

    return {
      success: 'Vehicle updated successfully.',
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Unable to update vehicle right now.',
    };
  }
}
