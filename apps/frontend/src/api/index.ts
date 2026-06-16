import type { z } from 'zod';

import {
  type ApiErrorDetails,
  apiErrorSchema,
} from '@/model/schemas/api-error-schema';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RequestJsonOptions = Omit<RequestInit, 'method'> & {
  method?: HttpMethod;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly details?: ApiErrorDetails,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchJson<T>(
  input: string | URL,
  schema: z.ZodType<T>,
  init?: RequestJsonOptions,
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(payload);

    throw new ApiError(
      parsedError.success
        ? formatApiErrorMessage(parsedError.data.message)
        : 'Request failed',
      response.status,
      parsedError.success ? parsedError.data : undefined,
    );
  }

  return schema.parse(payload);
}

function formatApiErrorMessage(message: string | string[]) {
  return Array.isArray(message) ? message.join(', ') : message;
}
