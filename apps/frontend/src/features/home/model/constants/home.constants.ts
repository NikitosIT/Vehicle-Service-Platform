export const HERO_SLIDES = [
  {
    description:
      'Registry-ready management for official user and vehicle records.',
    image: '/bmw-m.png',
    title: 'Unified vehicle oversight',
  },
  {
    description:
      'Track service reminders, ownership details, and upcoming maintenance events.',
    image: '/skoda.png',
    title: 'Maintenance-first operations',
  },
  {
    description:
      'Keep communication clear with service notices, штраф alerts, and follow-ups.',
    image: '/volkswagen.png',
    title: 'Notification workflows',
  },
  {
    description:
      'Administrative-grade visibility across registered drivers and transport assets.',
    image: '/lamborghini.png',
    title: 'Official fleet visibility',
  },
] as const;

export const PLATFORM_PILLARS = [
  {
    description:
      'Register users, keep their profiles current, and connect them to the right transport units.',
    title: 'User registry',
  },
  {
    description:
      'Store transport data in a structured catalog for faster lookup and operational control.',
    title: 'Vehicle records',
  },
  {
    description:
      'Send reminders about maintenance, inspections, fines, and other time-sensitive events.',
    title: 'Notification service',
  },
] as const;

export const PLATFORM_METRICS = [
  { label: 'Core workflows', value: '03' },
  { label: 'Registry view', value: '24/7' },
  { label: 'Operational trace', value: '100%' },
] as const;

export const PLATFORM_STEPS = [
  'Register a user and create a trustworthy administrative profile.',
  'Link one or more vehicles to that user inside the official registry.',
  'Trigger reminders and alerts about maintenance, inspections, or fines.',
] as const;
