import { getArticle } from "@/lib/article";
import { Article } from "@/lib/definitions";
import ArticleElement from "./ArticleElement";

type Props = {
    articleId: number
};

export default async function ArticlePage(props: Props) {
	const { articleId } = props;
	const article : Article = await getArticle(articleId);

	return (
		<ArticleElement article={article}/>
	);
}