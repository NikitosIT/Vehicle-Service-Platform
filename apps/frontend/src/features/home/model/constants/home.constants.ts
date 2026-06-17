export const HERO_SLIDES = [
  {
    description: 'User and vehicle records in one clean operational view.',
    image: '/bmw-m.png',
    title: 'Unified vehicle oversight',
  },
  {
    description: 'Service due dates, ownership details, and follow-up events.',
    image: '/skoda.png',
    title: 'Maintenance-first operations',
  },
  {
    description: 'Notices, fines, and reminders without losing the thread.',
    image: '/volkswagen.png',
    title: 'Notification workflows',
  },
  {
    description:
      'Fast lookup across drivers, vehicles, and account-owned data.',
    image: '/lamborghini.png',
    title: 'Official fleet visibility',
  },
] as const;

export const PLATFORM_PILLARS = [
  {
    description: 'Create, update, and connect operator-owned user profiles.',
    title: 'User registry',
  },
  {
    description: 'Structured vehicle records built for lookup and control.',
    title: 'Vehicle records',
  },
  {
    description:
      'Reminders for maintenance, inspections, fines, and deadlines.',
    title: 'Notification service',
  },
] as const;

export const PLATFORM_METRICS = [
  { label: 'Core modules', value: '03' },
  { label: 'Live registry', value: '24/7' },
  { label: 'Account scope', value: '100%' },
] as const;

export const PLATFORM_STEPS = [
  'Create a user profile.',
  'Attach one or more vehicles.',
  'Send reminders and alerts.',
] as const;
