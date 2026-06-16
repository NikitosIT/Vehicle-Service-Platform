import { z } from 'zod';

const userNamePattern = /^[\p{L}]+(?:\s+[\p{L}]+)*$/u;

export const createUserSchema = z.object({
  email: z.email('Enter a valid email address'),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(30, 'Name must be 30 characters or fewer')
    .regex(
      userNamePattern,
      'Name can contain only letters and spaces between words',
    ),
});
