import { notFound } from 'next/navigation';

import { ApiError } from '@/api';
import { getVehiclesByUserId } from '@/features/vehicles/api/vehicles.server';

import { getUserById } from '../api/users.server';

async function getUserOrNotFound(id: string) {
  try {
    return await getUserById(id);
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      notFound();
    }

    throw error;
  }
}

export async function getUserDetailsPageData(id: string) {
  const [user, vehicles] = await Promise.all([
    getUserOrNotFound(id),
    getVehiclesByUserId(id),
  ]);

  return { user, vehicles };
}
