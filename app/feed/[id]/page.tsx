import { Suspense } from 'react';
import Loading from '@/app/loading';
import ArticlePage from '@/components/Articles/ArticlePage';

export default function Page({ params }: { params: { id: number } }) {
	const { id } = params;

	return (
		<Suspense fallback={<Loading />}>
			<ArticlePage articleId={id} />
		</Suspense>
	);
}
