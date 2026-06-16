import { z } from 'zod';

export const updateVehicleSchema = z
  .object({
    make: z
      .string()
      .trim()
      .min(1, 'Make is required')
      .max(25, 'Make must be 25 characters or fewer')
      .optional(),
    model: z
      .string()
      .trim()
      .min(1, 'Model is required')
      .max(25, 'Model must be 25 characters or fewer')
      .optional(),
    year: z.preprocess((value) => {
      if (value === '' || value === null || value === undefined) {
        return undefined;
      }

      return value;
    }, z.coerce.number().int().min(1886).max(2100).optional()),
  })
  .refine(
    (value) =>
      value.make !== undefined ||
      value.model !== undefined ||
      value.year !== undefined,
    {
      message: 'At least one field must be provided for update',
    },
  );
