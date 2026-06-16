import { UserProfile } from '@/features/users/components/user-profile';
import { getUserDetailsPageData } from '@/features/users/server/get-user-details';

interface UserDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const { id } = await params;
  const { user, vehicles } = await getUserDetailsPageData(id);

  return <UserProfile user={user} vehicles={vehicles} />;
}
