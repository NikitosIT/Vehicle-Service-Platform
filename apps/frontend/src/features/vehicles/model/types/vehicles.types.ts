import type { z } from 'zod';

import type { createVehicleSchema } from '../schemas/create-vehicle.schema';
import type { updateVehicleSchema } from '../schemas/update-vehicle.schema';
import type {
  vehicleListItemSchema,
  vehiclesPageSchema,
} from '../schemas/vehicles.schemas';

export type VehicleListItem = z.infer<typeof vehicleListItemSchema>;
export type VehiclesPageData = z.infer<typeof vehiclesPageSchema>;
export type CreateVehicleFormValues = z.input<typeof createVehicleSchema>;
export type CreateVehiclePayload = z.output<typeof createVehicleSchema>;
export type CreateVehicleInput = CreateVehiclePayload & {
  userId: string;
};
export type UpdateVehicleFormValues = z.input<typeof updateVehicleSchema>;
export type UpdateVehicleInput = z.output<typeof updateVehicleSchema>;
