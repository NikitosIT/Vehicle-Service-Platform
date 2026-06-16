import { fetchJson } from '@/api';
import { getRequestCookieHeader } from '@/features/auth/api/get-request-cookie-header';
import { makeUsersUrl } from '@/model/constants/server-url';

import 'server-only';

import {
  userListItemSchema,
  usersListSchema,
} from '../model/schemas/users.schemas';
import type {
  CreateUserInput,
  UpdateUserInput,
  UserListItem,
} from '../model/types/users.types';

async function getSessionHeaders(additionalHeaders?: HeadersInit) {
  const cookieHeader = await getRequestCookieHeader();

  return {
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    ...additionalHeaders,
  };
}

export async function getUsers() {
  return fetchJson(makeUsersUrl(), usersListSchema, {
    headers: await getSessionHeaders(),
    next: {
      revalidate: 60,
    },
  });
}

export async function getUserById(id: string) {
  return fetchJson(makeUsersUrl(`/${id}`), userListItemSchema, {
    headers: await getSessionHeaders(),
    next: {
      revalidate: 60,
    },
  });
}

export async function createUser(input: CreateUserInput) {
  return fetchJson(makeUsersUrl(), userListItemSchema, {
    body: JSON.stringify(input),
    cache: 'no-store',
    headers: await getSessionHeaders({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  });
}

export async function updateUserName(id: string, input: UpdateUserInput) {
  return fetchJson(makeUsersUrl(`/${id}`), userListItemSchema, {
    body: JSON.stringify(input),
    cache: 'no-store',
    headers: await getSessionHeaders({
      'Content-Type': 'application/json',
    }),
    method: 'PUT',
  });
}

export async function deleteUser(id: string) {
  return fetchJson(makeUsersUrl(`/${id}`), userListItemSchema, {
    cache: 'no-store',
    headers: await getSessionHeaders(),
    method: 'DELETE',
  });
}

export type { UserListItem };
