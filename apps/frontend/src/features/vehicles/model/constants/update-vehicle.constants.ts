import type {
  UpdateVehicleFormValues,
  VehicleListItem,
} from '../types/vehicles.types';

export const getUpdateVehicleDefaultValues = (
  vehicle: VehicleListItem,
): UpdateVehicleFormValues => ({
  make: vehicle.make,
  model: vehicle.model,
  year: vehicle.year ?? undefined,
});

export const UPDATE_VEHICLE_MESSAGES = {
  description:
    'Adjust the vehicle record without leaving the current page. Update only the fields that should change.',
  submitIdle: 'Save changes',
  submitLoading: 'Saving...',
} as const;
