'use client';

import { signIn } from 'next-auth/react';
import { Skeleton, Button } from '@mantine/core';
import { Session } from 'next-auth';
import UserButton from '../components/Auth/UserButton';

export const useAuthElement = (session : Session | null) => {
  let authElement = <Skeleton />;
  authElement = session?.user ? (
    <UserButton imageUrl={session.user.image ?? ''} name={session.user.name ?? ''} />
  ) : (
    <Button color="black" variant="subtle" onClick={() => signIn('google')}>Sign in</Button>
  );
  return authElement;
};
