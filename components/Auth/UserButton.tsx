import { ActionIcon, Avatar, Flex, Space, Text } from '@mantine/core';
import { signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';

type Props = {
    imageUrl : string,
    name? : string,
};

export default function UserButton(props : Props) {
    const { imageUrl, name } = props;
    console.log(`User profile picture: ${imageUrl}`);
    return (
    <Flex align="center">
        <Text ff="text" size="lg">{name}</Text>
        <Space w="md" />
        <Avatar src={imageUrl}></Avatar>
        <Space w="md" />
        <ActionIcon color="black" variant="subtle" onClick={() => signOut()}>
            <FaSignOutAlt size={32} />
        </ActionIcon>
    </Flex>
);
}
