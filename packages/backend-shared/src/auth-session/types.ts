import type { Request } from 'express';
import type { Session } from 'express-session';

export type SessionWithAccount = Session & {
  accountId?: string;
};

export type RequestWithSession = Request & {
  session: SessionWithAccount;
};
