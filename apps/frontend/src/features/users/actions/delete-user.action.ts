'use server';

import { revalidatePath } from 'next/cache';

import { ApiError } from '@/api';

import { deleteUser } from '../api/users.server';

export interface DeleteUserActionState {
  error?: string;
  success?: string;
}

export async function deleteUserAction(
  userId: string,
): Promise<DeleteUserActionState> {
  try {
    await deleteUser(userId);
    revalidatePath('/users');
    revalidatePath(`/users/${userId}`);

    return {
      success: 'User deleted successfully.',
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: error.message,
      };
    }

    return {
      error: 'Unable to delete user right now.',
    };
  }
}
