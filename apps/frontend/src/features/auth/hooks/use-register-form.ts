'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { routes } from '@/model/constants/routes';

import { registerClient } from '../api/auth.client';
import { REGISTER_DEFAULT_VALUES } from '../model/constants/auth.constants';
import {
  type RegisterInput,
  registerSchema,
} from '../model/schemas/auth.schemas';

export function useRegisterForm() {
  const router = useRouter();
  const [isPending, startSubmitting] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    defaultValues: REGISTER_DEFAULT_VALUES,
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = form.handleSubmit((values) => {
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
  });

  return {
    form,
    handleSubmit,
    isPending,
    serverError,
  };
}
