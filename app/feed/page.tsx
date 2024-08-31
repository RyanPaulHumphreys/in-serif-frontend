import { Suspense } from 'react';
import Loading from '../loading';
import { ArticleFeed } from '@/components/Articles/ArticleFeed';

export default async function Feed() {
	return (
		<Suspense fallback={<Loading />}>
			<ArticleFeed />
		</Suspense>
	);
}
