/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const { auth, handlers, signIn, signOut } = NextAuth({
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			const csrfToken = (await getCsrfToken()) ?? 'NA';
			console.log(`CSRF TOKEN: ${csrfToken.toString()}`);
			const callbackFormData = new FormData();
			callbackFormData.append('Id', profile?.sub ?? 'NA');
			callbackFormData.append('Email', user.email ?? 'NA');
			callbackFormData.append('Name', user.name ?? 'NA');
			callbackFormData.append('ImageUrl', user.image ?? 'NA');
			const response = await fetch(`${process.env.API_AUTH_ENDPOINT}/login-callback`, {
				headers: {
					'X-CSRF-TOKEN': csrfToken.requestToken,
					Cookie: `${authCookieName}=${account?.access_token}; CSRF-TOKEN=${csrfToken.cookieToken}`,
				},
				method: 'POST',
				body: callbackFormData,
			});
			switch (response.status) {
			case 201:
				console.log(`Login callback STATUS 201 :: New user - registering ${user.email}`);
				break;
			case 200:
				console.log(`Login callback STATUS 200 :: Previously registered user ${user.email}`);
				break;
			default:
				console.error(`Login callback STATUS ${response.status} :: Unhandled response`);
			}

			return true;
		},
		async jwt({ token, user, account, profile }) {
			if (account !== undefined) {
				token.access_token = account?.access_token ?? 'NA';
				token.id_token = account?.id_token ?? 'NA';
			}

			if (profile !== undefined) token.userId = profile?.sub ?? 'NA';
			return token;
		},
		async session({ session, token }) {
			if (token !== undefined) session.userId = token.userId as any;

			if (token !== undefined) session.access_token = token?.access_token as any;

			if (token !== undefined) session.id_token = token?.id_token;

			return session;
		},
	},
	...authConfig,
});

export async function getCsrfToken() {
	const response = await fetch(`${process.env.API_AUTH_ENDPOINT}/get-csrf-token`, {
		method: 'GET',
	});

	const csrfToken = await response.json();
	console.log(JSON.stringify(csrfToken));
	//const csrfToken = response.headers.get('X-CSRF-TOKEN');
	return csrfToken;
}

export async function refreshAccessToken() {
	const response = await fetch('/api/auth/refresh-token', {
		method: 'POST',
		credentials: 'include',
	});
	const data = await response.json();
	// Update the session with the new access token
	return data;
}

export const authCookieName : string = `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}auth.session-token`;
export const secureCookie : boolean = process.env.NODE_ENV === 'production';
