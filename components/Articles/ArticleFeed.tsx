'use client';

import { GridCol, Flex, ActionIcon, Button, Grid, Divider } from '@mantine/core';
import { GiQuillInk } from 'react-icons/gi';
import { useContext, useEffect, useState } from 'react';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
import { AppShellContext } from '@/components/MainAppShell/MainAppShell';
import FilterAndSortOptions from '@/components/Pagination/FilterAndSortOptions';
import { Article } from '../../lib/definitions';

type Props = {

};

export function ArticleFeed(props : Props) {
	const [filterSortOptions, setFilterSortOptions] = useState<FormData>();
	const [articleCards, setArticleCards] = useState<React.JSX.Element[] | undefined>();
	useEffect(() => {
		const fetchData = async () => {
			let uri = 'http://localhost:3000/feed/api';
			const sortBy = filterSortOptions?.get('sort-by') ?? 'date-published_desc';
			const filterTags = filterSortOptions?.get('tags') ?? '';
			uri = `${uri}?sortBy=${sortBy}&tags=${filterTags}`;
			const response = await fetch(uri, {
				headers: {
					'Content-type': 'application/json',
				},
				method: 'GET',
			});
			const articleListResponse = await response.json();
			console.log(`Fetched ${(articleListResponse.data as Article[]).length} articles`);
			setArticleCards(getArticleCards(articleListResponse.data));
		};
		fetchData();
	}, [filterSortOptions]);

	const appContext = useContext(AppShellContext);

	return (
		<>
			<Flex align="center" justify="center" mx="lg" gap={{ base: 10, md: 20, lg: 32 }} style={{ zIndex: 4 }}>
				{appContext.isMobile === true ?
					<ActionIcon size={48} mt="lg" variant="filled" color="black" component="a" href="/feed/create"><GiQuillInk size={20} /></ActionIcon>
					:
					<Button variant="filled" leftSection={<GiQuillInk size={20} />} mt="lg" color="black" component="a" href="/feed/create">Create a Post</Button>
				}
				<Divider mt={20} orientation="vertical" />
				<FilterAndSortOptions submitOnChange formAction={(formData : FormData) => setFilterSortOptions(formData)} defaultSortBy="date-published" />
			</Flex>
			<Grid p={{ sm: 1, md: 4, lg: 5 }} mt={16} columns={16} justify="left" mx={32}>
				{articleCards || null}
			</Grid>
		</>
	);
}

function getArticleCards(articleList : Article[] | undefined) {
	return articleList?.map(
		(article : Article) =>
			<GridCol key={article.id} span={{ base: 16, sm: 8, md: 8, lg: 6, xl: 5 }} w={{ base: '23em' }}>
				<ArticleCard
					key={article.id}
					article={article}
					minWidth={300}
					maxWidth={350} />
			</GridCol>
	);
}
