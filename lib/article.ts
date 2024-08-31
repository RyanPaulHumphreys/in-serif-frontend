'use server';

import { getToken } from 'next-auth/jwt';
import { Article } from './definitions';
import { headers } from 'next/headers';

export const getArticle = async (id: number) : Promise<Article> => {
    'use server';

    console.log(`Article Endpoint: ${process.env.NEXT_APP_BASE_URL}/feed/api/${id}`);
	const response = await fetch(`${process.env.NEXT_APP_BASE_URL}/feed/api/${id}`, {
		headers: headers(),
		method: 'GET',
	});
    const json = await response.json();
    const { data } = json;
    const article : Article = data;
    console.log(article.tags);
    return article;
};

export const deleteArticle = async (id: number, userId: string) => {
    console.log(`Article Endpoint: ${process.env.NEXT_APP_BASE_URL}/feed/api/${id}`);
    const formData : FormData = new FormData();
    formData.append('userId', userId);
    await fetch(`${process.env.NEXT_APP_BASE_URL}/feed/api/${id}`, {
        method: 'DELETE',
        body: formData,
    });
};
