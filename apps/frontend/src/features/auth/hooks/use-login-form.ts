'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { routes } from '@/model/constants/routes';

import { loginClient } from '../api/auth.client';
import { LOGIN_DEFAULT_VALUES } from '../model/constants/auth.constants';
import { type LoginInput, loginSchema } from '../model/schemas/auth.schemas';

export function useLoginForm() {
  const router = useRouter();
  const [isPending, startSubmitting] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    defaultValues: LOGIN_DEFAULT_VALUES,
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = form.handleSubmit((values) => {
    setServerError(null);

    startSubmitting(async () => {
      try {
        await loginClient(JSON.stringify(values));
        router.replace(routes.appRoutes.home);
        router.refresh();
      } catch (error) {
        setServerError(
          error instanceof Error
            ? error.message
            : 'Unable to sign in right now.',
        );
      }
    });
  });

  return {
    form,
    handleSubmit,
    isPending,
    serverError,
  };
}
