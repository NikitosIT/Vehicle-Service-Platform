import session from 'express-session';

import { getSessionCookieName } from './cookie.js';

type BuildSessionMiddlewareOptions = {
  cookieName: string;
  nodeEnv: string;
  secret: string;
  store: session.Store;
  ttlSeconds: number;
};

export function buildSessionMiddleware({
  cookieName,
  nodeEnv,
  secret,
  store,
  ttlSeconds,
}: BuildSessionMiddlewareOptions) {
  const isProduction = nodeEnv === 'production';

  return session({
    store,
    name: getSessionCookieName(nodeEnv, cookieName),
    secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction,
      maxAge: ttlSeconds * 1000,
    },
  });
}
