'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { logoutClient } from '@/features/auth/api/auth.client';
import { routes } from '@/model/constants/routes';

export function useLogoutControl() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startSubmitting] = useTransition();

  const open = () => setIsOpen(true);
  const close = () => {
    if (!isPending) {
      setIsOpen(false);
    }
  };

  const confirm = () => {
    startSubmitting(async () => {
      try {
        await logoutClient();
        setIsOpen(false);
        router.replace(routes.appRoutes.auth);
        router.refresh();
      } catch {
        setIsOpen(false);
      }
    });
  };

  return {
    close,
    confirm,
    isOpen,
    isPending,
    open,
  };
}
