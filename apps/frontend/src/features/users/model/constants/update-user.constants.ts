import type { UpdateUserInput, UserListItem } from '../types/users.types';

export const getUpdateUserDefaultValues = (
  user: UserListItem,
): UpdateUserInput => ({
  name: user.name,
});

export const UPDATE_USER_MESSAGES = {
  description:
    'Review the current record and update the display name if required.',
  submitIdle: 'Save changes',
  submitLoading: 'Saving...',
  success: 'User record updated.',
} as const;
