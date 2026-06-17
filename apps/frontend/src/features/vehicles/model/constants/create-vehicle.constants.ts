import type { CreateVehicleFormValues } from '../types/vehicles.types';

export const CREATE_VEHICLE_DEFAULT_VALUES: CreateVehicleFormValues = {
  make: '',
  model: '',
  year: undefined,
};

export const CREATE_VEHICLE_MESSAGES = {
  description: 'Enter the vehicle details and link the record to this user.',
  submitIdle: 'Save vehicle',
  submitLoading: 'Saving...',
  success: 'Vehicle record created.',
} as const;
