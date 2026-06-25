import {
  getPaginationParams,
  type PaginationSearchParams,
} from '@/features/pagination';
import { UserProfile } from '@/features/users/components/user-profile';
import { getUserDetailsPageData } from '@/features/users/server/get-user-details';

interface UserDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: PaginationSearchParams | Promise<PaginationSearchParams>;
}

export default async function UserDetailsPage({
  params,
  searchParams,
}: UserDetailsPageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams
    ? await Promise.resolve(searchParams)
    : undefined;
  const pagination = getPaginationParams(resolvedSearchParams, {
    defaultPageSize: 5,
    maxPageSize: 5,
  });
  const { user, vehiclesPage } = await getUserDetailsPageData(id, pagination);

  return (
    <UserProfile
      searchParams={resolvedSearchParams}
      user={user}
      vehiclesPage={vehiclesPage}
    />
  );
}
