import type { Route } from 'next';

export const routes = {
  backendEndpoints: {
    auth: {
      login: '/login',
      logout: '/logout',
      me: '/me',
      register: '/register',
    },
  },

  appRoutes: {
    home: '/' satisfies Route,
    auth: '/auth' satisfies Route,
    users: '/users' satisfies Route,
    vehicles: '/vehicles' satisfies Route,
  },
} as const;
