'use client';

import { LogOutIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

import { useLogoutControl } from '../hooks/use-logout-control';

export function LogoutControl() {
  const { close, confirm, isOpen, isPending, open } = useLogoutControl();

  return (
    <>
      <Button onClick={open} size="sm" type="button" variant="outline">
        <LogOutIcon className="size-4" />
        Logout
      </Button>

      <ConfirmDialog
        cancelLabel="Stay signed in"
        confirmLabel="Log out"
        description="Your protected session will be closed and you will return to the authentication page."
        isLoading={isPending}
        isOpen={isOpen}
        onCancel={close}
        onConfirm={confirm}
        title="Log out of your account?"
      />
    </>
  );
}
