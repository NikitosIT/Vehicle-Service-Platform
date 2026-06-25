'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { ApiError } from '@/api';
import { routes } from '@/model/constants/routes';

import { loginClient } from '../api/auth.client';
import type { LoginInput } from '../model/schemas/auth.schemas';

export function useLoginForm(form: UseFormReturn<LoginInput>) {
  const router = useRouter();
  const [isPending, startSubmitting] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginInput> = (values) => {
    setServerError(null);
    form.clearErrors();

    startSubmitting(async () => {
      try {
        await loginClient(JSON.stringify(values));
        router.replace(routes.appRoutes.home);
        router.refresh();
      } catch (error) {
        if (error instanceof ApiError) {
          const messages = Array.isArray(error.details?.message)
            ? error.details.message
            : [error.message];

          const passwordMessage = messages.find((message) =>
            /password/i.test(message),
          );
          const emailMessage = messages.find((message) =>
            /email/i.test(message),
          );

          if (passwordMessage) {
            form.setError('password', {
              message: passwordMessage,
              type: 'server',
            });
          }

          if (emailMessage) {
            form.setError('email', {
              message: emailMessage,
              type: 'server',
            });
          }

          if (passwordMessage || emailMessage) {
            return;
          }
        }

        setServerError(
          error instanceof Error
            ? error.message
            : 'Unable to sign in right now.',
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
