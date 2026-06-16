'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { routes } from '@/model/constants/routes';

import { deleteUserAction } from '../actions/delete-user.action';

export function useDeleteUser(userId: string) {
  const router = useRouter();
  const [isPending, startDeleting] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    if (isPending) {
      return;
    }

    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    setServerError(null);

    startDeleting(async () => {
      const result = await deleteUserAction(userId);

      if (result.error) {
        setServerError(result.error);
        return;
      }

      setIsDialogOpen(false);
      router.push(routes.appRoutes.users);
      router.refresh();
    });
  };

  return {
    closeDialog,
    handleDelete,
    isDialogOpen,
    isPending,
    openDialog,
    serverError,
  };
}
