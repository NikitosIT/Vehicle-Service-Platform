export const HEADER_NAVIGATION = [
  {
    href: '/',
    label: 'Home',
    match: 'exact',
  },
  {
    href: '/users',
    label: 'Users',
    match: 'prefix',
  },
  {
    href: '/vehicles',
    label: 'Vehicles',
    match: 'prefix',
  },
] as const;
