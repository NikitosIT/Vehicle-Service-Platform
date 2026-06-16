'use server';

import { revalidatePath } from 'next/cache';

import { ApiError } from '@/api';
import { routes } from '@/model/constants/routes';

import { createVehicle } from '../api/vehicles.server';
import { createVehicleSchema } from '../model/schemas/create-vehicle.schema';
import type { CreateVehicleFormValues } from '../model/types/vehicles.types';

export interface CreateVehicleActionState {
  error?: string;
  success?: string;
}

export async function createVehicleAction(
  userId: string,
  input: CreateVehicleFormValues,
): Promise<CreateVehicleActionState> {
  const parsed = createVehicleSchema.safeParse(input);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];

    return {
      error: issue.message,
    };
  }

  try {
    await createVehicle({
      ...parsed.data,
      userId,
    });
    revalidatePath(routes.appRoutes.vehicles);
    revalidatePath(`${routes.appRoutes.users}/${userId}`);

    return {
      success: 'Vehicle added successfully.',
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Unable to create vehicle right now.',
    };
  }
}
