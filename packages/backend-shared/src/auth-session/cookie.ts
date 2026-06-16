import { SESSION_HOST_COOKIE_PREFIX } from './constants.js';

export function getSessionCookieName(
  nodeEnv: string,
  sessionCookieName: string,
) {
  return nodeEnv === 'production'
    ? `${SESSION_HOST_COOKIE_PREFIX}${sessionCookieName}`
    : sessionCookieName;
}
