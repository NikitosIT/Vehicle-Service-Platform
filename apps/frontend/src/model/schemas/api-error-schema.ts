import { z } from 'zod';

export const apiErrorSchema = z.object({
  statusCode: z.number().optional(),
  message: z.union([z.string(), z.array(z.string())]),
  error: z.string().optional(),
  path: z.string().optional(),
  timestamp: z.string().optional(),
});

export type ApiErrorDetails = z.infer<typeof apiErrorSchema>;
