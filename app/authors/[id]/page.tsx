import { Container, Divider, Stack, Text, Image, Group } from '@mantine/core';
import { getAuthor } from '@/lib/author/author';
import { Article } from '@/lib/definitions';
import ArticleCard from '@/components/ArticleCard/ArticleCard';

export default async function AuthorPage({ params }: { params: { id: string } }) {
	const author = await getAuthor(params.id);
	const { articles: articlesJson } = author;

	const articles: Article[] = articlesJson;
	const articleList = articles.map((article) => (
		<ArticleCard article={article} includeAuthor={false} />
	));

	return (
		<>
			<Container>
				<Group>
					<Image src={author.imageUrl} w={128} h={128} />
					<Text ff="heading" fw="700" size="massive">
						{author.name}
					</Text>
				</Group>
				<Divider mt={12} mb={36} />
			</Container>
			<Container>
				<Stack>{articleList}</Stack>
			</Container>
		</>
	);
}
