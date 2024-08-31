/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';
import { auth, getCsrfToken } from '@/auth';

export async function GET(
	req: NextRequest,
	context: { params: { id: string } },
): Promise<Response> {
	return auth(async (authreq: any) => {
		console.log('ID:', context?.params?.id);
		console.log('AccessToken: ', authreq?.auth?.access_token);

		const articleId = context.params.id;
		const response = await fetch(`${process.env.API_ARTICLE_ENDPOINT}/${articleId}`, {
			headers: {
				UserId: authreq?.auth?.userId ?? 'NA',
				Authorization: `Bearer ${authreq.auth?.id_token ?? 'NA'}`,
				Cookie: authreq.cookies,
			},
			method: 'GET',
		});

		console.log(`GET :: Response from API: ${response.status}`);

		if (response.ok) {
			const data = await response.json();
			return NextResponse.json({ data });
		}

		switch (response.status) {
		default:
			return notFound();
		}
	})(req, context) as Promise<Response>;
}

export async function DELETE(req: NextRequest,
	context: { params: { id: string } }) {
	return auth(async (authreq: any) => {
		const csrfToken : any = await getCsrfToken() ?? null;
		if (csrfToken === null) {
			return new NextResponse('Error', { statusText: 'Couldn\'t get CSRF token', status: 403 });
		}
		console.log(`CSRF TOKEN: ${csrfToken}`);
		const session = await auth();
		const { id } = context.params;
		const formData = await req.formData();
		const userId = formData.get('userId');
		if (userId === null) { return new NextResponse('Error', { status: 403, statusText: 'Unauthenticated user' }); }

		console.log(`DELETE :: Endpoint: ${process.env.API_ARTICLE_ENDPOINT}/${id}`);
		const response = await fetch(`${process.env.API_ARTICLE_ENDPOINT}/${id}`, {
			headers: {
				'X-CSRF-TOKEN': csrfToken.requestToken,
				UserId: session?.userId ?? 'NA',
				Authorization: `Bearer ${session?.id_token}`,
			},
			method: 'DELETE',
			body: formData,
		});
		console.log(`DELETE :: Response from API: ${response.status}`);
		return response;
	})(req, context) as Promise<Response>;
}
