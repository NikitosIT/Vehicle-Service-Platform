'use client';

import { fetchJson } from '@/api';
import { publicAccountSchema } from '@/features/auth/model/schemas/auth.schemas';
import { routes } from '@/model/constants/routes';
import { API_PREFIX, AUTH_PREFIX } from '@/model/constants/server-url';

export async function loginClient(body: string) {
  await fetchJson(
    `${API_PREFIX}${AUTH_PREFIX}${routes.backendEndpoints.auth.login}`,
    publicAccountSchema,
    {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );
}

export async function registerClient(body: string) {
  await fetchJson(
    `${API_PREFIX}${AUTH_PREFIX}${routes.backendEndpoints.auth.register}`,
    publicAccountSchema,
    {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );
}

export async function logoutClient() {
  await fetchJson(
    `${API_PREFIX}${AUTH_PREFIX}${routes.backendEndpoints.auth.logout}`,
    publicAccountSchema.nullish(),
    {
      method: 'POST',
    },
  );
}
