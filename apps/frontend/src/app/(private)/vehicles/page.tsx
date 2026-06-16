import { getVehicles } from '@/features/vehicles/api/vehicles.server';
import { VehiclesPage } from '@/features/vehicles/components/vehicles-page';

export default async function Page() {
  const vehicles = await getVehicles();

  return <VehiclesPage vehicles={vehicles} />;
}
