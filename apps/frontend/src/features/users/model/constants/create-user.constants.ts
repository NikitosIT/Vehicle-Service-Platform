import type { CreateUserInput } from '../types/users.types';

export const CREATE_USER_DEFAULT_VALUES: CreateUserInput = {
  email: '',
  name: '',
};

export const CREATE_USER_MESSAGES = {
  description: 'Enter the email and full name to create a new user record.',
  submitIdle: 'Save user',
  submitLoading: 'Saving...',
  success: 'User record created.',
} as const;
