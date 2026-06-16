import { fetchJson } from '@/api';
import { getRequestCookieHeader } from '@/features/auth/api/get-request-cookie-header';
import { makeVehiclesUrl } from '@/model/constants/server-url';

import 'server-only';

import {
  vehicleListItemSchema,
  vehiclesListSchema,
} from '../model/schemas/vehicles.schemas';
import type {
  CreateVehicleInput,
  UpdateVehicleInput,
  VehicleListItem,
} from '../model/types/vehicles.types';

async function getSessionHeaders(additionalHeaders?: HeadersInit) {
  const cookieHeader = await getRequestCookieHeader();

  return {
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    ...additionalHeaders,
  };
}

export async function getVehicles() {
  return fetchJson(makeVehiclesUrl(), vehiclesListSchema, {
    headers: await getSessionHeaders(),
    next: {
      revalidate: 60,
    },
  });
}

export async function getVehiclesByUserId(userId: string) {
  const url = makeVehiclesUrl();
  url.searchParams.set('userId', userId);

  return fetchJson(url, vehiclesListSchema, {
    headers: await getSessionHeaders(),
    next: {
      revalidate: 60,
    },
  });
}

export async function createVehicle(input: CreateVehicleInput) {
  return fetchJson(makeVehiclesUrl(), vehicleListItemSchema, {
    body: JSON.stringify(input),
    cache: 'no-store',
    headers: await getSessionHeaders({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  });
}

export async function updateVehicle(id: number, input: UpdateVehicleInput) {
  return fetchJson(makeVehiclesUrl(`/${id}`), vehicleListItemSchema, {
    body: JSON.stringify(input),
    cache: 'no-store',
    headers: await getSessionHeaders({
      'Content-Type': 'application/json',
    }),
    method: 'PUT',
  });
}

export async function deleteVehicle(id: number) {
  return fetchJson(makeVehiclesUrl(`/${id}`), vehicleListItemSchema, {
    cache: 'no-store',
    headers: await getSessionHeaders(),
    method: 'DELETE',
  });
}

export type { VehicleListItem };
