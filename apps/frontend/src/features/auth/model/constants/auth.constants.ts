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

export type AuthMode = 'login' | 'register';

export const AUTH_TABS: Array<{
  label: string;
  mode: AuthMode;
}> = [
  {
    label: 'Login',
    mode: 'login',
  },
  {
    label: 'Register',
    mode: 'register',
  },
];
