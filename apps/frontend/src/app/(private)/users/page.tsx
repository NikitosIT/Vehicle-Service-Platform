import { getUsers } from '@/features/users/api/users.server';
import { UsersPage } from '@/features/users/components/users-page';

export default async function Page() {
  const users = await getUsers();

  return <UsersPage users={users} />;
}
