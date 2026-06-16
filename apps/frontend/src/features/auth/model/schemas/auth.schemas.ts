import { z } from 'zod';

export const publicAccountSchema = z.object({
  id: z.string(),
  email: z.email(),
  fullName: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const loginSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .max(255, 'Password is too long.'),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required.')
    .max(120, 'Full name is too long.'),
  email: z.email('Enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(255, 'Password is too long.'),
});

export type PublicAccount = z.infer<typeof publicAccountSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
