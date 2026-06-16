'use server';

import { revalidatePath } from 'next/cache';

import { ApiError } from '@/api';
import { routes } from '@/model/constants/routes';

import { deleteVehicle } from '../api/vehicles.server';

export interface DeleteVehicleActionState {
  error?: string;
  success?: string;
}

export async function deleteVehicleAction(
  vehicleId: number,
  userId: string,
): Promise<DeleteVehicleActionState> {
  try {
    await deleteVehicle(vehicleId);
    revalidatePath(routes.appRoutes.vehicles);
    revalidatePath(`${routes.appRoutes.users}/${userId}`);

    return {
      success: 'Vehicle deleted successfully.',
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Unable to delete vehicle right now.',
    };
  }
}
