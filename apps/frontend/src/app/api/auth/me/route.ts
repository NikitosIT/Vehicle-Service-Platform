import { proxyAuthRequest } from '@/features/auth/api/auth-route-proxy';
import { routes } from '@/model/constants/routes';

export async function GET(request: Request) {
  return proxyAuthRequest({
    method: 'GET',
    path: routes.backendEndpoints.auth.me,
    request,
  });
}
