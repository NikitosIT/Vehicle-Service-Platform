import { cookies } from 'next/headers';

import 'server-only';

export async function getRequestCookieHeader() {
  const cookieStore = await cookies();
  const serialized = cookieStore.toString();

  return serialized.length > 0 ? serialized : undefined;
}
