'use server';

import { revalidatePath } from 'next/cache';

import { ApiError } from '@/api';

import { createUser } from '../api/users.server';
import { createUserSchema } from '../model/schemas/create-user.schema';
import type { CreateUserInput } from '../model/types/users.types';

export interface CreateUserActionState {
  error?: string;
  success?: string;
}

export async function createUserAction(
  input: CreateUserInput,
): Promise<CreateUserActionState> {
  const parsed = createUserSchema.safeParse(input);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];

    return {
      error: issue.message,
    };
  }

  try {
    await createUser(parsed.data);
    revalidatePath('/users');

    return {
      success: 'User created successfully.',
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Unable to create user right now.',
    };
  }
}
