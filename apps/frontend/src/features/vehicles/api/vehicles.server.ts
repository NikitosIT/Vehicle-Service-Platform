import { fetchJson } from '@/api';
import { getRequestCookieHeader } from '@/features/auth/api/get-request-cookie-header';
import { makeVehiclesUrl } from '@/model/constants/server-url';

import 'server-only';

import {
  vehicleListItemSchema,
  vehiclesPageSchema,
} from '../model/schemas/vehicles.schemas';
import type {
  CreateVehicleInput,
  UpdateVehicleInput,
  VehicleListItem,
  VehiclesPageData,
} from '../model/types/vehicles.types';

async function getSessionHeaders(additionalHeaders?: HeadersInit) {
  const cookieHeader = await getRequestCookieHeader();

  return {
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    ...additionalHeaders,
  };
}

interface GetVehiclesParams {
  page: number;
  pageSize: number;
  userId?: string;
}

export async function getVehicles({
  page,
  pageSize,
  userId,
}: GetVehiclesParams): Promise<VehiclesPageData> {
  const url = makeVehiclesUrl();
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', String(pageSize));

  if (userId) {
    url.searchParams.set('userId', userId);
  }

  return fetchJson(url, vehiclesPageSchema, {
    headers: await getSessionHeaders(),
    next: {
      revalidate: 60,
    },
  });
}

export async function getVehiclesByUserId(
  userId: string,
  pagination?: {
    page: number;
    pageSize: number;
  },
) {
  return getVehicles({
    page: pagination?.page ?? 1,
    pageSize: pagination?.pageSize ?? 10,
    userId,
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
