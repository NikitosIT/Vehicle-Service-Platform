import { fetchJson } from '@/api';
import { getRequestCookieHeader } from '@/features/auth/api/get-request-cookie-header';
import { makeUsersUrl } from '@/model/constants/server-url';

import 'server-only';

import {
  userListItemSchema,
  usersPageSchema,
} from '../model/schemas/users.schemas';
import type {
  CreateUserInput,
  UpdateUserInput,
  UserListItem,
  UsersPageData,
} from '../model/types/users.types';

async function getSessionHeaders(additionalHeaders?: HeadersInit) {
  const cookieHeader = await getRequestCookieHeader();

  return {
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    ...additionalHeaders,
  };
}

interface GetUsersParams {
  page: number;
  pageSize: number;
}

export async function getUsers({
  page,
  pageSize,
}: GetUsersParams): Promise<UsersPageData> {
  const url = makeUsersUrl();
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', String(pageSize));

  return fetchJson(url, usersPageSchema, {
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
