import { z } from 'zod';

export const paginationMetaSchema = z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  totalItems: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
});
