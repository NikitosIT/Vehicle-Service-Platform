import Link from 'next/link';

import type { UserListItem } from '../api/users.server';

interface UsersListProps {
  users: UserListItem[];
}

const initialsFromName = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export function UsersList({ users }: UsersListProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          No user records
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Create the first user to start filling the registry.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <Link
          key={user.id}
          href={`/users/${user.id}`}
          className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
          {user.avatar ? (
            <div
              aria-label={`${user.name} avatar`}
              className="h-14 w-14 rounded-2xl bg-slate-200 bg-cover bg-center"
              role="img"
              style={{ backgroundImage: `url(${user.avatar})` }}
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
              {initialsFromName(user.name)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-slate-950">
              {user.name}
            </p>
            <p className="truncate text-sm text-slate-600">{user.email}</p>
          </div>

          <span className="text-sm font-medium text-slate-400 transition group-hover:text-slate-700">
            Open
          </span>
        </Link>
      ))}
    </div>
  );
}
