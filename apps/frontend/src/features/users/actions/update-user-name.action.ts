'use server';

import { revalidatePath } from 'next/cache';

import { ApiError } from '@/api';

import { updateUserName } from '../api/users.server';
import { updateUserSchema } from '../model/schemas/update-user.schema';
import type { UpdateUserInput } from '../model/types/users.types';

interface UpdateUserNameActionState {
  error?: string;
  success?: string;
}

export async function updateUserNameAction(
  userId: string,
  input: UpdateUserInput,
): Promise<UpdateUserNameActionState> {
  const parsed = updateUserSchema.safeParse(input);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];

    return {
      error: issue.message,
    };
  }

  try {
    await updateUserName(userId, parsed.data);
    revalidatePath('/users');
    revalidatePath(`/users/${userId}`);

    return {
      success: 'Name updated successfully.',
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Unable to update user right now.',
    };
  }
}
