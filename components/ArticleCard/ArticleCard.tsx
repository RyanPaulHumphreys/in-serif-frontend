'use client';

import { Image, Card, CardSection, Text, Avatar, Flex, Group, Badge, Spoiler, ScrollArea, MantineSize, StyleProp } from '@mantine/core';
import { Article } from '@/lib/definitions';
import classes from './Article.module.css';

type Props = {
    article : Article,
    includeAuthor? : boolean
    minWidth? : number
	maxWidth? : number
};

export default function ArticleCard(props : Props) {
	const { article, includeAuthor = true, maxWidth = 500, minWidth = 300 } = props;
	const tagsJSON = article.tags;
	const tagElements = tagsJSON.map((value : string) => (
		<Badge key={value} size="sm" color="black" variant="outline">{value}</Badge>
	));
	return (
		<Card withBorder padding={5} w={{ base: minWidth, lg: maxWidth }}>
			<CardSection>
				<Image src={`${article.imageUrl}`} height={200} />
				<Spoiler hideLabel="Show less" showLabel="Show more" maxHeight={32}>
					<ScrollArea scrollbars="x" w={{ base: minWidth, md: minWidth+(maxWidth-minWidth)/2, xl: maxWidth }} h={32} p={5}>
						<Flex gap={5}>{tagElements}</Flex>
					</ScrollArea>
				</Spoiler>
			</CardSection>
			<CardSection className={classes.control} inheritPadding component="a" href={`/feed/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
				<Text size="xl" ff="headings" lineClamp={2}>{article.title}</Text>
			</CardSection>
			{includeAuthor ?
				<CardSection inheritPadding className={classes.control} component="a" href={`/authors/${article.author.id}`}>
					<Flex gap={5} align="center" justify="space-between">
						<Group justify="flex-start" gap={3}>
							<Avatar src={article.author.imageUrl} size={32}></Avatar>
							<Text size="md" ff="text">{article.author.name}</Text>
						</Group>
						<Text ff="text" size="md">{new Date(article.postedAt).toDateString()}</Text>
					</Flex>
				</CardSection>
				:
				<CardSection inheritPadding>
					<Flex gap={5} align="center" justify="space-between">
						<Text ff="text" size="md">{new Date(article.postedAt).toDateString()}</Text>
					</Flex>
				</CardSection>}
		</Card>
	);
}
