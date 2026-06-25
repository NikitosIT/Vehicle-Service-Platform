import {
  getPaginationParams,
  type PaginationSearchParams,
} from '@/features/pagination';
import { getUsers } from '@/features/users/api/users.server';
import { UsersPage } from '@/features/users/components/users-page';

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
  const usersPage = await getUsers(pagination);

  return (
    <UsersPage searchParams={resolvedSearchParams} usersPage={usersPage} />
  );
}
