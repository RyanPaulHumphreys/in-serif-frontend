/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';
import { auth, getCsrfToken } from '@/auth';

export async function GET(request : NextRequest) {
	const queryParams = request.nextUrl.searchParams;
	console.log(request.body);
	const apiEndpoint = `${process.env.API_ARTICLE_ENDPOINT}${(queryParams ? `?${queryParams.toString()}` : '')}`;
	console.log(`Endpoint: ${apiEndpoint}`);
	const response = await fetch(apiEndpoint, {
		headers: {
			'content-type': 'application/json',
		},
		method: 'GET',
	});
	console.log(`Response from API: ${response.status}`);
	if (response.ok) {
		const data = await response.json();
		return Response.json({ data });
	}

	return Response.json({});
}

export async function POST(request : NextRequest) {
	const session = await auth();
	const formData = await request.formData();
	const csrfToken = await getCsrfToken() ?? 'NO-TOKEN';
	console.log(`CSRF TOKEN: ${csrfToken}`);
	const response = await fetch(`${process.env.API_ARTICLE_ENDPOINT}`, {
		headers: {
			'X-CSRF-TOKEN': csrfToken.requestToken,
			Cookie: `CSRF-TOKEN=${csrfToken.cookieToken}`,
			UserId: session?.userId ?? 'NA',
			Authorization: `Bearer ${session?.id_token ?? 'NA'}`,
		},
		method: 'POST',
		body: formData,
	});
	switch (response.status) {
	case 401:
		return NextResponse.json({ message: 'Not authorized to create posts' }, { status: 401 });
	case 200: {
		const article = (await response.json());
		return NextResponse.json({ message: 'Successfully created post' }, { ...article });
	}
	default:
		return response;
	}
}
