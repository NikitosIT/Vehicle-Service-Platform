'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { routes } from '@/model/constants/routes';

import { registerClient } from '../api/auth.client';
import type { RegisterInput } from '../model/schemas/auth.schemas';

export function useRegisterForm(form: UseFormReturn<RegisterInput>) {
  const router = useRouter();
  const [isPending, startSubmitting] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegisterInput> = (values) => {
    setServerError(null);

    startSubmitting(async () => {
      try {
        await registerClient(JSON.stringify(values));
        router.replace(routes.appRoutes.home);
        router.refresh();
      } catch (error) {
        setServerError(
          error instanceof Error
            ? error.message
            : 'Unable to create your account right now.',
        );
      }
    });
  };

  return {
    handleSubmit: form.handleSubmit(onSubmit),
    isPending,
    serverError,
  };
}
