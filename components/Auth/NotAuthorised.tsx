'use client';

import { Button, Text, Space, Image, Center, Group } from '@mantine/core';
import { signIn } from 'next-auth/react';

export default function NotAuthorised() {
    return (
    <>
        <Center p={20}>
            <Group>
                <Image src="/inseriffox-notfound.png" h={400} w={289} />
                <Text ff="monospace" size="md">up to no good?</Text>
            </Group>
        </Center>
        <Center>
            <Text size="xl" ff="heading">Please log in to access this feature</Text>
            <Space w="md" />
            <Button color="black" onClick={() => signIn('google')}>Sign In</Button>
        </Center>
    </>
    );
}
