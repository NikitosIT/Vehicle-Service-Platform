import type { LoginInput, RegisterInput } from '../schemas/auth.schemas';

export const LOGIN_DEFAULT_VALUES: LoginInput = {
  email: '',
  password: '',
};

export const REGISTER_DEFAULT_VALUES: RegisterInput = {
  fullName: '',
  email: '',
  password: '',
};

export const AUTH_COPY = {
  eyebrow: 'Secure access',
  loginDescription:
    'Sign in to manage your users, register vehicles, and work only with records assigned to your account.',
  registerDescription:
    'Create your operator account and start working with your own protected user and vehicle registry.',
  loginTitle: 'Welcome back',
  registerTitle: 'Create your account',
} as const;

export type AuthMode = 'login' | 'register';

export const AUTH_TABS: Array<{
  description: string;
  label: string;
  mode: AuthMode;
}> = [
  {
    description: 'Use an existing account session.',
    label: 'Login',
    mode: 'login',
  },
  {
    description: 'Create and enter a new account immediately.',
    label: 'Register',
    mode: 'register',
  },
];
