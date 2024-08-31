import { headers } from 'next/headers';
import { Article } from '@/lib/definitions';
import ArticleElement from '@/components/Articles/ArticleElement';
import Loading from '@/app/loading';
import { Suspense } from 'react';
import ArticlePage from '@/components/Articles/ArticlePage';

export default function Page({ params }: { params: { id: number } }) {
	const { id } = params;
	
	return (
		<Suspense fallback={<Loading />}>
			<ArticlePage articleId={id} />
		</Suspense>
	);
}
