import {
  getPaginationParams,
  type PaginationSearchParams,
} from '@/features/pagination';
import { getVehicles } from '@/features/vehicles/api/vehicles.server';
import { VehiclesPage } from '@/features/vehicles/components/vehicles-page';

interface PageProps {
  searchParams?: PaginationSearchParams | Promise<PaginationSearchParams>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams
    ? await Promise.resolve(searchParams)
    : undefined;
  const pagination = getPaginationParams(resolvedSearchParams, {
    defaultPageSize: 10,
    maxPageSize: 10,
  });
  const userIdValue = resolvedSearchParams?.userId;
  const userId = Array.isArray(userIdValue) ? userIdValue[0] : userIdValue;
  const vehiclesPage = await getVehicles({
    ...pagination,
    userId,
  });

  return (
    <VehiclesPage
      searchParams={resolvedSearchParams}
      vehiclesPage={vehiclesPage}
    />
  );
}
