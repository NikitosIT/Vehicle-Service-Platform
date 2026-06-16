import { proxyAuthRequest } from '@/features/auth/api/auth-route-proxy';
import { routes } from '@/model/constants/routes';

export async function POST(request: Request) {
  return proxyAuthRequest({
    method: 'POST',
    path: routes.backendEndpoints.auth.register,
    request,
  });
}
