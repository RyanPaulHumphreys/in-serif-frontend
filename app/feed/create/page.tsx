'use server';

import NotAuthorised from '@/components/Auth/NotAuthorised';
import ArticleEditor from '@/components/Articles/ArticleEditor';
import { auth } from '@/auth';

export default async function CreateArticlePage() {
	const session = await auth();

	if (session == null) return <NotAuthorised />;

	return (
		<ArticleEditor />
	);
}
