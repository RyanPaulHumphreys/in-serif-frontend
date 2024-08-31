'use client';

import { Container, Image, Text as TitleText, Divider, Badge, Flex, ActionIcon, Group, Popover, Button, Stack, Text } from '@mantine/core';
import { FaTrashCan } from 'react-icons/fa6';
import React from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDisclosure } from '@mantine/hooks';
import ArticleContent from './ArticleContent';
import { Article } from '@/lib/definitions';
import { deleteArticle } from '@/lib/article';
import NotAuthorised from '../Auth/NotAuthorised';

type Props = {
    article: Article
};

export default function ArticleElement(props: Props) {
	const { article } = props;
	const tagElements = article.tags.map((value : string) => (
		<Badge>{value}</Badge>
	));
	const { status, data: session } = useSession();
	console.log(JSON.stringify(article.userPermissions));
	const readAccessResponse = article.userPermissions.read.split(':');
	const updateAccessResponse = article.userPermissions.update.split(':');
	const deleteAccessResponse = article.userPermissions.delete.split(':');
	const [readAccess, updateAccess, deleteAccess] =
        [readAccessResponse[0] === 'True', updateAccessResponse[0] === 'True', deleteAccessResponse[0] === 'True'];

	if (!readAccess) return NotAuthorised();

	console.log('Update access from role: ', updateAccessResponse[1]);
	console.log('Delete access from role: ', deleteAccessResponse[1]);

	const handleDelete = (formData : FormData) => {
		if (status === 'loading' || !session) return;

		const idString = formData.get('id')?.toString();
		if (idString) {
			console.log('CLICK: ', idString);
			const id : number = parseInt(idString, 10);
			deleteArticle(id, session.userId);
		}

		redirect('/feed');
	};
	const [opened, { close, open }] = useDisclosure(false);
	const contentJSON = JSON.parse(article.content);

	const permissionListItems = () => (
		<Stack>
			<Text ff="monospace" fz="sm">Update Access : {updateAccessResponse[1]}</Text>
			<Text ff="monospace" fz="sm">Delete Access : {deleteAccessResponse[1]}</Text>
		</Stack>
	);
	return (
		<>
			{deleteAccess || updateAccess ?
				<Flex justify="space-between" bg="indigo" px={128} mb={8}>
					<Group>
						<TitleText ff="monospace" color="white">Tools</TitleText>
					</Group>
					<Group>
						{ deleteAccess ?
							<form action={handleDelete}>
								<ActionIcon variant="subtle" color="black" type="submit" name="id" value={article.id}>
									<FaTrashCan color="white" size={16} />
								</ActionIcon>
							</form>
							: null}
						<Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
							<Popover.Target>
								<Button onMouseEnter={open} onMouseLeave={close} variant="subtle" color="white">
									Permissions
								</Button>
							</Popover.Target>
							<Popover.Dropdown style={{ pointerEvents: 'none' }}>
								{permissionListItems()}
							</Popover.Dropdown>
						</Popover>
					</Group>
				</Flex>
				: null
			}
			<Container>
				<Image src={article.imageUrl} height={300} />
				<TitleText fw={600} size="xxl" ff="heading">{article.title}</TitleText>
				<Flex>
					{tagElements}
				</Flex>
			</Container>
			<Divider my="md" />

			<Container>
				<ArticleContent json={contentJSON} />
			</Container>
		</>
	);
}
